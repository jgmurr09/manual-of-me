/* PNG recovery data contains only the answers associated with that shared output. */
const MANUAL_PNG_KEY = 'tang.manual.v1';
const PROFILE_TRANSFER_FIELDS = ['name','preferredName','photo','photoPosition','careerStage','connectionType','location','workingHours','reachMethods','reachOther','discussionStyle','intro','fun','knowTooMuch','proud','idealBuild','askMeAbout','communicationStyle','workingStyle','teamMakesGreat','teamOther','feedback','feedbackOther','bestSpectrum','bestWhenOther','helpForm','helpOther','organize','stress','strengths','growth','archetype','snack','drink','celebration','militaryExperience','militaryBranches','domains'];
const CARD_TRANSFER_FIELDS = ['name','preferredName','photo','photoPosition','intro','archetype','workingStyle','strengths','idealBuild','growth','knowTooMuch','askMeAbout','fun','snack','drink'];
const RESTORE_LABELS = {name:'Full name',preferredName:'Call me',callMe:'Call me',photo:'Profile photo',photoPosition:'Photo framing',careerStage:'Career stage',connectionType:'Connection to TANG',location:'Work location',workingHours:'Usual hours + time zone',hours:'Usual hours + time zone',reachMethods:'Contact methods',reachOther:'Contact notes',discussionStyle:'Discussion preference',discussion:'Discussion preference',intro:'The 30-second version',fun:'Off the clock',knowTooMuch:'I know way too much about',proud:'Something I’m proud of',idealBuild:'Ideal project or experience',askMeAbout:'Ask me about',communicationStyle:'Communication style',workingStyle:'Working style',teamMakesGreat:'A good team has',teamOther:'Other team preferences',feedback:'Feedback preferences',feedbackOther:'Feedback notes',bestSpectrum:'Work preferences',spectra:'Work preferences for this effort',bestWhenOther:'At my best',bestNote:'At my best on this effort',helpForm:'Help me get unstuck',helpOther:'Other support notes',support:'Help me contribute',organize:'How I organize',stress:'Stress signals',strengths:'Power Skills I bring',growth:'Power Skills to build',growthSkills:'Skills to grow on this effort',skills:'Other skills I bring',growthGoal:'Where I want to grow on this effort',archetype:'Creativity Archetype',snack:'Snack',drink:'Drink',celebration:'Recognition',militaryExperience:'Military experience',militaryBranches:'Military branches',domains:'Domain experience',project:'Project or effort',role:'Count on me for',need:'What I need from this team',lookingForward:'Looking forward to',energy:'Kickoff energy'};
let restoreSession = null;
let restoreWorker = null;
let ocrLoadPromise = null;

function pickTransferFields(source,fields){
  const out={};for(const key of fields){if(source[key]!==undefined)out[key]=structuredClone(source[key]);}
  if(!out.photo)delete out.photoPosition;
  if(out.militaryExperience!=='Prior / current service'){delete out.militaryExperience;delete out.militaryBranches;}
  return out;
}
function profilePNGData(p,fields=PROFILE_TRANSFER_FIELDS){return {format:'tang-manual',version:1,kind:'profile',profile:pickTransferFields(p,fields)};}
function kickoffPNGData(k){const copy=structuredClone(k);delete copy.ready;delete copy.step;delete copy.baselineCount;if(!copy.photo)delete copy.photoPosition;return {format:'tang-manual',version:1,kind:'kickoff',kickoff:copy};}
function pngCRC32(bytes){let crc=0xffffffff;for(const value of bytes){crc^=value;for(let j=0;j<8;j++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
function pngChunk(type,data){const enc=new TextEncoder(),typeBytes=enc.encode(type),chunk=new Uint8Array(data.length+12),view=new DataView(chunk.buffer);view.setUint32(0,data.length);chunk.set(typeBytes,4);chunk.set(data,8);view.setUint32(data.length+8,pngCRC32(chunk.subarray(4,data.length+8)));return chunk;}
function embedManualInPNG(bytes,payload){
  if(!payload)return bytes;
  const enc=new TextEncoder(),key=enc.encode(MANUAL_PNG_KEY),json=enc.encode(JSON.stringify(payload));
  const data=new Uint8Array(key.length+5+json.length);data.set(key);data.set(json,key.length+5);const recovery=pngChunk('iTXt',data);
  let iend=bytes.length,offset=8;while(offset+12<=bytes.length){const n=new DataView(bytes.buffer,bytes.byteOffset+offset,4).getUint32(0);const type=String.fromCharCode(...bytes.subarray(offset+4,offset+8));if(type==='IEND'){iend=offset;break;}offset+=n+12;}
  const out=new Uint8Array(bytes.length+recovery.length);out.set(bytes.subarray(0,iend));out.set(recovery,iend);out.set(bytes.subarray(iend),iend+recovery.length);return out;
}
function readManualFromPNG(bytes){
  if(bytes.length<8||!([137,80,78,71,13,10,26,10].every((v,i)=>bytes[i]===v)))return null;
  const decoder=new TextDecoder();let offset=8;
  while(offset+12<=bytes.length){
    const view=new DataView(bytes.buffer,bytes.byteOffset+offset,bytes.length-offset),length=view.getUint32(0);if(length>bytes.length-offset-12)throw new Error('The image is incomplete.');
    const type=decoder.decode(bytes.subarray(offset+4,offset+8));
    if(type==='iTXt'){
      const data=bytes.subarray(offset+8,offset+8+length),zero=data.indexOf(0);
      if(zero>=0&&decoder.decode(data.subarray(0,zero))===MANUAL_PNG_KEY){
        if(pngCRC32(bytes.subarray(offset+4,offset+8+length))!==view.getUint32(length+8))throw new Error('The saved answers in this image are damaged.');
        if(data[zero+1]!==0)throw new Error('This saved answers format is not supported.');
        const payload=JSON.parse(decoder.decode(data.subarray(zero+5)));if(payload.format!=='tang-manual'||payload.version!==1)throw new Error('This image uses a different saved answers format.');return payload;
      }
    }
    offset+=length+12;
  }
  return null;
}
async function pngExportBlob(canvas){
  await waitForCanvasAssets(canvas);const raw=await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not create this image.')),'image/png'));
  return new Blob([embedManualInPNG(new Uint8Array(await raw.arrayBuffer()),canvas.manualPayload)],{type:'image/png'});
}
function downloadBlob(blob,filename){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),10000);}
function safePhotoSource(value){return typeof value==='string'&&(/^(data:image\/(png|jpeg|webp);base64,)/.test(value)||/^assets\/[a-z0-9_./-]+\.(png|jpe?g|webp)$/i.test(value))?value:'';}
function safeTransferValues(source,fields){
  const out={};for(const key of fields){const value=source?.[key];if(value===undefined)continue;
    if(key==='photo'){const photo=safePhotoSource(value);if(photo)out.photo=photo;}
    else if(['photoPosition','bestSpectrum','spectra'].includes(key)&&value&&typeof value==='object'){
      const allowed=key==='photoPosition'?['x','y']:SPECTRA.map(s=>s.id),obj={};for(const child of allowed){const v=value[child];if(v===null&&key!=='photoPosition')obj[child]=null;else if(Number.isFinite(Number(v)))obj[child]=Math.max(0,Math.min(key==='photoPosition'?100:4,Number(v)));}out[key]=obj;
    }else if(Array.isArray(value))out[key]=value.filter(v=>typeof v==='string').slice(0,100);
    else if(typeof value==='string')out[key]=value;
  }return out;
}
function emptyTransferValue(value){return value===null||value===undefined||value===''||(typeof value==='string'&&!value.trim())||(Array.isArray(value)&&!value.length)||(value&&typeof value==='object'&&!Array.isArray(value)&&Object.values(value).every(emptyTransferValue));}
function mergeRecovered(target,source,replace=false){
  const acceptingPhoto=!!source.photo&&(replace||emptyTransferValue(target.photo));
  for(const [key,value] of Object.entries(source)){
    if(['__proto__','constructor','prototype'].includes(key))continue;
    if(key==='photoPosition'){if(acceptingPhoto||replace||emptyTransferValue(target[key]))target[key]=structuredClone(value);}
    else if(value&&typeof value==='object'&&!Array.isArray(value)){if(!target[key]||typeof target[key]!=='object')target[key]={};mergeRecovered(target[key],value,replace);}
    else if(replace||emptyTransferValue(target[key]))target[key]=structuredClone(value);
  }
  return target;
}
function launchRestore(){
  restoreSession={origin:{route:state.route==='restore'?'home':state.route,wizard:state.wizard,step:state.step},filename:'',source:'',payload:null,target:'general',mode:'fill',selected:new Set(),candidates:{},imageURL:'',text:'',busy:false};
  state.ui.introSeen=true;state.wizard=false;state.route='restore';mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');render();window.scrollTo(0,0);
}
async function restoreManualFile(file){
  if(!restoreSession||state.route!=='restore')launchRestore();
  if(file.size>30*1024*1024){toast('Choose an image or backup under 30 MB.');return;}
  if(restoreSession.imageURL)URL.revokeObjectURL(restoreSession.imageURL);
  restoreSession.filename=file.name;restoreSession.file=file;restoreSession.error='';restoreSession.text='';restoreSession.payload=null;restoreSession.imageURL='';
  try{
    if(/\.json$/i.test(file.name)||file.type==='application/json'){
      const data=JSON.parse(await file.text());if(!data||typeof data!=='object'||(!data.profile&&!data.onboarding&&!data.kickoffs&&!data.kickoff))throw new Error('This is not a Manual saved answers file.');
      restoreSession.payload=data.kind==='kickoff'?data:{...data,kind:data.kickoffs?.items?.length?'backup':'profile'};restoreSession.source='backup';
    }else {
      restoreSession.imageURL=URL.createObjectURL(file);restoreSession.source='image';restoreSession.payload=readManualFromPNG(new Uint8Array(await file.arrayBuffer()));restoreSession.source=restoreSession.payload?'exact':'image';
    }
    if(restoreSession.payload)prepareRestoreCandidates();renderRestore();
  }catch(error){restoreSession.error=error.message;renderRestore();}
}
function projectToProfile(k){return {name:k.name,preferredName:k.callMe,photo:k.photo,photoPosition:k.photoPosition,location:k.location,workingHours:k.hours,reachMethods:k.reachMethods,reachOther:k.reachOther,discussionStyle:k.discussion,feedback:k.feedback,feedbackOther:k.feedbackOther,helpOther:k.support,strengths:k.strengths,bestSpectrum:k.spectra,bestWhenOther:k.bestNote};}
function profileToProject(p){return {name:p.name,callMe:p.preferredName,photo:p.photo,photoPosition:p.photoPosition,location:p.location,hours:p.workingHours,reachMethods:p.reachMethods,reachOther:p.reachOther,discussion:p.discussionStyle,feedback:p.feedback,feedbackOther:p.feedbackOther,support:[...(p.helpForm||[]),p.helpOther].filter(Boolean).join(' · '),strengths:p.strengths,spectra:p.bestSpectrum,bestNote:p.bestWhenOther,growthSkills:(p.growth||[]).map(skillLabel)};}
function prepareRestoreCandidates(keepTarget=false){
  const session=restoreSession,payload=session.payload;if(!payload)return;
  if(!keepTarget)session.target=payload.kind==='backup'?'backup':payload.kind==='kickoff'?'kickoff-new':payload.kind==='ocr'&&payload.kickoff?.project?'kickoff-new':'general';
  let values={};
  if(session.target==='backup'){
    if(payload.profile)values.profile=payload.profile;if(payload.onboarding)values.onboarding=payload.onboarding;if(payload.kickoffs?.items?.length)values.kickoffs=payload.kickoffs.items;
  }else if(session.target==='general')values=safeTransferValues(payload.profile||projectToProfile(payload.kickoff||{}),PROFILE_TRANSFER_FIELDS);
  else values=safeTransferValues(payload.kickoff||profileToProject(payload.profile||{}),Object.keys(blankKickoff()));
  if(session.target==='general'&&payload.onboarding)values.onboarding=payload.onboarding;
  session.candidates=Object.fromEntries(Object.entries(values).filter(([key,value])=>!['id','createdAt','updatedAt','step','ready','layout'].includes(key)&&!emptyTransferValue(value)));
  session.selected=new Set(Object.keys(session.candidates));
}
function recoveryValueText(key,value){if(key==='photo')return 'Profile photo included';if(key==='profile')return 'Saved general Manual answers';if(key==='onboarding')return 'Saved support, tools, and learning preferences';if(key==='kickoffs')return value.map(k=>k.project||'Untitled project').join(' · ');if(Array.isArray(value))return value.map(v=>POWER_SKILLS.find(s=>s.id===v)?.label||v).join(' · ');if(value&&typeof value==='object')return Object.entries(value).filter(([,v])=>v!==null).map(([k,v])=>`${k}: ${Number(v)+(['photoPosition'].includes(key)?0:1)}`).join(' · ');return String(value);}
function renderRestore(){
  if(!restoreSession)return launchRestore();const session=restoreSession;
  const isOCR=session.source==='ocr',hasPayload=!!session.payload;
  app.innerHTML=`<div class="shell restore-shell"><button class="btn text" id="cancelRestore">← Back</button><div class="section-head"><div><span class="eyebrow">PICK UP WHERE YOU LEFT OFF</span><h1 class="page-title">Bring your Manual back</h1><p class="lede">Upload a Manual PNG or saved answers file. New PNG exports can restore editable answers directly. For older images, read the text here and review what was recovered.</p></div></div><div class="restore-upload card"><div><strong>${session.filename?escapeHTML(session.filename):'Choose your Manual'}</strong><p class="small muted">PNG, JPG, WebP, or a JSON backup. Image reading happens in this browser.</p></div><button class="btn primary" id="chooseRestoreFile">${session.filename?'Choose another file':'Upload my Manual'}</button></div>
    ${session.error?`<p class="wizard-validation" role="alert">${escapeHTML(session.error)}</p>`:''}
    ${session.source==='image'&&!hasPayload?`<section class="card restore-read"><h2>Let’s read this image.</h2><p>This image does not contain saved answers. We can try reading its visible text. Review the result before adding anything to your Manual. Photos and slider positions may need to be added again.</p><button class="btn dark" id="readManualImage" ${session.busy?'disabled':''}>Read the image</button></section>`:''}
    <div id="restoreProgress" class="restore-progress" ${session.busy?'':'hidden'} role="status"><progress id="ocrProgress" max="1" value="0"></progress><p id="ocrStatus">Getting ready to read the image…</p><button class="btn text" id="cancelOCR">Cancel reading</button></div>
    ${hasPayload?`<section class="card restore-review"><span class="eyebrow">${isOCR?'REVIEW THE RECOVERED TEXT':'SAVED ANSWERS FOUND'}</span><h2>${isOCR?'Check the details':'Ready to restore.'}</h2><p class="muted">${isOCR?'Text recognition can mix up columns, labels, or names. Edit the recovered fields below, select what you want, and leave uncertain fields out.':'Choose where these answers belong and which ones to use. Other Manuals keep their own answers.'}</p><div class="split"><div class="field"><label for="restoreDestination">Use these answers in</label><select id="restoreDestination">${session.payload.kind==='backup'?'<option value="backup">My full saved backup</option>':`<option value="general" ${session.target==='general'?'selected':''}>My general Manual of Me</option><option value="kickoff-new" ${session.target==='kickoff-new'?'selected':''}>A new project kickoff</option>${activeKickoff()?`<option value="kickoff-current" ${session.target==='kickoff-current'?'selected':''}>${escapeHTML(activeKickoff().project||'My current kickoff')}</option>`:''}`}</select></div><div class="field"><label for="restoreMode">When an answer is already filled in</label><select id="restoreMode"><option value="fill" ${session.mode==='fill'?'selected':''}>Keep it; fill empty answers</option><option value="replace" ${session.mode==='replace'?'selected':''}>Replace it with my selected answer</option></select></div></div>
      <div class="restore-fields">${Object.entries(session.candidates).map(([key,value])=>`<div class="restore-field"><label class="restore-check"><input type="checkbox" data-restore-select="${key}" ${session.selected.has(key)?'checked':''}><strong>${RESTORE_LABELS[key]||({profile:'General Manual',onboarding:'Onboarding answers',kickoffs:'Project kickoffs'}[key])||key}</strong></label>${isOCR&&typeof value==='string'&&key!=='photo'?`<textarea data-restore-edit="${key}" aria-label="Recovered ${escapeHTML(RESTORE_LABELS[key]||key)}">${escapeHTML(value)}</textarea>`:`<p>${escapeHTML(recoveryValueText(key,value))}</p>`}</div>`).join('')||'<p>No fields have been matched yet. Use the recovered text below to add the parts you recognize.</p>'}</div>
      ${isOCR?`<div class="restore-add"><label for="restoreAddField">Add a field to fill from the recovered text</label><select id="restoreAddField">${(session.target==='general'?PROFILE_TRANSFER_FIELDS:Object.keys(blankKickoff())).filter(key=>typeof (session.target==='general'?DEFAULT_STATE.profile:blankKickoff())[key]==='string'&&!['photo','id','createdAt','updatedAt','layout'].includes(key)&&!Object.hasOwn(session.candidates,key)).map(key=>`<option value="${key}">${RESTORE_LABELS[key]||key}</option>`).join('')}</select><button class="btn light" id="restoreAdd">Add field</button></div>`:''}
      <div class="actions"><button class="btn primary" id="applyRestore">Use selected answers</button><button class="btn text" id="restoreSkip">Cancel</button></div><p class="small muted">${session.target.startsWith('kickoff')?'Project answers stay with that effort. You can update them as the team learns.':'Project kickoff answers and onboarding answers are changed only when you select them here.'}</p></section>`:''}
      ${session.text?`<details class="optional-details"><summary>Recovered text from the image</summary><textarea class="restore-raw" readonly aria-label="All recovered text">${escapeHTML(session.text)}</textarea></details>`:''}
      ${session.imageURL?`<details class="optional-details"><summary>View the original image</summary><img class="restore-original" src="${session.imageURL}" alt="The Manual you uploaded"></details>`:''}
  </div>`;
  document.querySelector('#chooseRestoreFile').addEventListener('click',()=>backupInput.click());
  document.querySelector('#cancelRestore').addEventListener('click',cancelRestore);
  document.querySelector('#restoreSkip')?.addEventListener('click',cancelRestore);
  document.querySelector('#readManualImage')?.addEventListener('click',readOlderManual);
  document.querySelector('#cancelOCR')?.addEventListener('click',cancelImageReading);
  document.querySelector('#restoreDestination')?.addEventListener('change',e=>{session.target=e.target.value;prepareRestoreCandidates(true);renderRestore();});
  document.querySelector('#restoreMode')?.addEventListener('change',e=>session.mode=e.target.value);
  app.querySelectorAll('[data-restore-select]').forEach(input=>input.addEventListener('change',()=>{if(input.checked)session.selected.add(input.dataset.restoreSelect);else session.selected.delete(input.dataset.restoreSelect);}));
  app.querySelectorAll('[data-restore-edit]').forEach(input=>input.addEventListener('input',()=>session.candidates[input.dataset.restoreEdit]=input.value));
  document.querySelector('#restoreAdd')?.addEventListener('click',()=>{const key=document.querySelector('#restoreAddField').value;if(!key)return;session.candidates[key]='';session.selected.add(key);renderRestore();app.querySelector(`[data-restore-edit="${key}"]`)?.focus();});
  document.querySelector('#applyRestore')?.addEventListener('click',applyRecoveredManual);
}
function cancelRestore(){
  cancelImageReading(false);const origin=restoreSession?.origin||{route:'home',wizard:false,step:0};if(restoreSession?.imageURL)URL.revokeObjectURL(restoreSession.imageURL);restoreSession=null;Object.assign(state,origin);saveState();render();window.scrollTo(0,0);
}
function applyRecoveredManual(){
  const session=restoreSession;if(!session?.payload)return;const values=Object.fromEntries(Object.entries(session.candidates).filter(([key])=>session.selected.has(key)));
  if(!Object.keys(values).length)return toast('Select at least one answer to use.');const replace=session.mode==='replace';
  if(session.target==='general'){
    mergeRecovered(state.profile,safeTransferValues(values,PROFILE_TRANSFER_FIELDS),replace);if(values.onboarding)mergeRecovered(state.onboarding,safeOnboardingTransfer(values.onboarding),replace);state.route='manual';state.wizard=false;
  }else if(session.target==='backup'){
    if(values.profile)mergeRecovered(state.profile,safeTransferValues(values.profile,PROFILE_TRANSFER_FIELDS),replace);
    if(values.onboarding)mergeRecovered(state.onboarding,safeOnboardingTransfer(values.onboarding),replace);
    for(const item of values.kickoffs||[]){const restored=normalizeKickoff(item),existing=state.kickoffs.items.find(k=>k.id===restored.id);if(existing)mergeRecovered(existing,restored,replace);else state.kickoffs.items.push(restored);}
    state.route='home';state.wizard=false;
  }else {
    let k=session.target==='kickoff-current'?activeKickoff():null;if(!k){k=blankKickoff();state.kickoffs.items.unshift(k);}
    mergeRecovered(k,safeTransferValues(values,Object.keys(blankKickoff())),replace);k.updatedAt=new Date().toISOString();k.ready=!validateKickoff(k,0).length;const normalized=normalizeKickoff(k);Object.assign(k,normalized);state.kickoffs.activeId=k.id;state.kickoffs.view=k.ready?'manual':'edit';state.kickoffs.step=k.ready?0:0;state.route='kickoffs';state.wizard=false;
  }
  if(session.imageURL)URL.revokeObjectURL(session.imageURL);restoreSession=null;saveState();render();window.scrollTo(0,0);toast('Selected answers restored. You can keep editing.');
}
function safeOnboardingTransfer(source){const out={};for(const key of ['support','tools']){if(source[key]&&typeof source[key]==='object')out[key]=Object.fromEntries((key==='support'?SUPPORT_TOPICS:TOOL_TOPICS).filter(t=>source[key][t.id]===null||[0,1,2,3].includes(Number(source[key][t.id]))).map(t=>[t.id,source[key][t.id]===null?null:Number(source[key][t.id])]));}for(const key of ['access','learningModes'])if(Array.isArray(source[key]))out[key]=source[key].filter(v=>typeof v==='string');if(typeof source.pace==='string')out.pace=source.pace;return out;}
function loadLocalOCR(){
  if(typeof Tesseract!=='undefined')return Promise.resolve();if(ocrLoadPromise)return ocrLoadPromise;
  ocrLoadPromise=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='assets/vendor/ocr/tesseract.min.js';script.onload=resolve;script.onerror=()=>{ocrLoadPromise=null;reject(new Error('The image-reading files could not be loaded. Keep the assets folder beside index.html.'));};document.head.append(script);});return ocrLoadPromise;
}
async function cancelImageReading(renderNow=true){if(restoreSession)restoreSession.busy=false;const worker=restoreWorker;restoreWorker=null;if(worker)await worker.terminate();if(renderNow&&state.route==='restore')renderRestore();}
async function readOlderManual(){
  const session=restoreSession;if(!session?.file||session.busy)return;
  if(location.protocol==='file:'){session.error='To read an older image, open this tool through a local web server or the hosted website. New Manual PNGs and JSON backups restore directly. See START_HERE.txt in the ZIP.';renderRestore();return;}
  session.busy=true;session.error='';renderRestore();let worker;
  try{
    await loadLocalOCR();if(!session.busy)return;
    const base=new URL('assets/vendor/ocr/',document.baseURI).href;
    worker=await Tesseract.createWorker('eng',1,{workerPath:base+'worker.min.js',corePath:base+'core',langPath:base.slice(0,-1),workerBlobURL:false,cacheMethod:'none',logger:message=>{if(restoreSession!==session||!session.busy)return;const progress=document.querySelector('#ocrProgress'),status=document.querySelector('#ocrStatus');if(progress)progress.value=Number(message.progress)||0;if(status)status.textContent=message.status==='recognizing text'?`Reading the image · ${Math.round((message.progress||0)*100)}%`:'Preparing the image reader…';}});restoreWorker=worker;
    if(!session.busy){await worker.terminate();return;}
    const result=await worker.recognize(await prepareImageForReading(session.file));
    if(restoreSession!==session||!session.busy)return;session.text=result.data.text;session.payload=parseManualText(result.data.text);session.source='ocr';session.busy=false;prepareRestoreCandidates();renderRestore();
  }catch(error){if(restoreSession===session&&session.busy){session.busy=false;session.error='This browser could not read the image. Try a clearer export, an original PNG or JSON backup, or add the answers by hand.';renderRestore();}}
  finally {if(worker)await worker.terminate();if(restoreWorker===worker)restoreWorker=null;}
}
function prepareImageForReading(file){return new Promise((resolve,reject)=>{const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{const scale=Math.min(img.width<1100?1.7:1,2200/img.width,7000/img.height,Math.sqrt(12000000/(img.width*img.height)));const canvas=document.createElement('canvas');canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);URL.revokeObjectURL(url);resolve(canvas);};img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('This image could not be opened.'));};img.src=url;});}
function parseManualText(text){
  const lines=String(text).split(/\r?\n/).map(line=>line.trim()).filter(Boolean);const profile={},kickoff={};
  const clean=line=>line.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g,' ').trim();
  const headings=[['intro',/^the (30 second|30 sec) version$/],['role',/^on this (project|effort) count on me for$/],['role',/^count on me for$/],['skills',/^(other |practical )?skills i bring$/],['strengths',/^(what i bring|power skills i bring|brings)$/],['idealBuild',/^(ideal project or experience|what i m building|hoping to build)$/],['growthGoal',/^(where i want to grow|what i want to grow|growth on this effort)$/],['growth',/^(skills i want to build|growing)$/],['fun',/^beyond the work$/],['fun',/^a little human$/],['support',/^(help me get unstuck|feedback support|help me contribute|when i m stuck help by)$/],['work',/^working with me$/],['bestWhenOther',/^i do my best work when$/],['proud',/^something i m proud of$/],['stop',/^(onboarding me|good to know|human centered mission focused|manual of me tang).*$/]];
  const sections={};let current='';
  for(const line of lines){const normalized=clean(line),hit=headings.find(([,pattern])=>pattern.test(normalized));if(hit){current=hit[0];if(!sections[current])sections[current]=[];continue;}if(current&&current!=='stop')sections[current].push(line);}
  for(const key of ['intro','idealBuild','proud','bestWhenOther'])if(sections[key])profile[key]=sections[key].join(' ');
  for(const [key,pattern] of Object.entries({communicationStyle:/^communication(?: style)?\s*[:;]\s*(.+)$/i,workingStyle:/^working style\s*[:;]\s*(.+)$/i,location:/^(?:work )?location\s*[:;]\s*(.+)$/i,workingHours:/^(?:usual |work(?:ing)? )?hours(?: \+ time zone)?\s*[:;]\s*(.+)$/i,feedbackOther:/^feedback(?: works best)?\s*[:;]\s*(.+)$/i,reachOther:/^(?:reach me|how to reach me|communication method)\s*[:;]\s*(.+)$/i,preferredName:/^call me\s*[:;]?\s+(.+)$/i,askMeAbout:/^(?:off the clock )?ask me about\s*[:;]\s*(.+)$/i,organize:/^(?:i )?organize(?: through)?\s*[:;]\s*(.+)$/i,stress:/^(?:under stress you might notice|under stress)\s*[:;]\s*(.+)$/i}))for(const line of lines){const match=line.match(pattern);if(match){profile[key]=match[1];break;}}
  // Older exports put labels and values on separate lines.
  const labels={communication:'communicationStyle',communicationstyle:'communicationStyle',workingstyle:'workingStyle',workhours:'workingHours',usualhours:'workingHours',communicationmethod:'reachOther',howtoreachme:'reachOther',feedbackworksbest:'feedbackOther',feedback:'feedbackOther',agoodteamhas:'teamOther',imusually:'fun',iknowwaytoomuchabout:'knowTooMuch',askmeabout:'askMeAbout',helpby:'helpOther',iorganizethrough:'organize',understressyoumightnotice:'stress'};
  lines.forEach((line,i)=>{const key=labels[clean(line).replace(/ /g,'')];if(key&&lines[i+1]&&!headings.some(([,pattern])=>pattern.test(clean(lines[i+1]))))profile[key]=lines[i+1];});
  const sourceSkills=sections.strengths?.join(' ')||'',sourceGrowth=sections.growth?.join(' ')||'';
  const matchSkills=source=>POWER_SKILLS.filter(s=>clean(source).includes(clean(s.label))).map(s=>s.id);
  if(sourceSkills)profile.strengths=matchSkills(sourceSkills);if(sourceGrowth)profile.growth=matchSkills(sourceGrowth);
  if(!profile.fun&&sections.fun)profile.fun=sections.fun.join(' ').replace(/^usually:\s*/i,'');if(sections.support&&!profile.helpOther)profile.helpOther=sections.support.join(' ');
  // Names are suggested only from a short standalone heading, never from prose.
  const header=lines.slice(0,6).find(line=>/^[A-Z][a-z]+(?:[-'][A-Z]?[a-z]+)?(?: [A-Z][a-z]+(?:[-'][A-Z]?[a-z]+)?){1,3}$/.test(line)&&!/(Manual|Team|Project|Welcome|Feedback|Skills|Working)/.test(line));if(header)profile.name=header;
  const projectLine=lines.find(line=>/^PROJECT KICKOFF\s*[·:|-]/i.test(line));if(projectLine){const name=projectLine.replace(/^PROJECT KICKOFF\s*[·:|-]\s*/i,'').trim();if(!/personal field guide|today|meet the people/i.test(name))kickoff.project=name;}
  Object.assign(kickoff,profileToProject(profile));if(sections.role)kickoff.role=sections.role.join(' ');if(sections.skills)kickoff.skills=sections.skills.join(' ').split(/[·,;]/).map(v=>v.trim()).filter(Boolean);if(sections.growthGoal)kickoff.growthGoal=sections.growthGoal.join(' ');
  return {kind:'ocr',profile,kickoff,text};
}

function photoEditorHTML(holder,id){const position=holder.photoPosition||{x:50,y:50};return `<div class="photo-editor"><div class="photo-editor-preview">${holder.photo?`<img src="${safePhotoSource(holder.photo)}" alt="Your photo crop preview" style="object-position:${position.x}% ${position.y}%">`:'<span>PHOTO</span>'}</div><div><label for="${id}Input">Choose a photo <span class="field-tag">Optional</span></label><input id="${id}Input" type="file" accept="image/png,image/jpeg,image/webp"><p class="small muted">Portrait or landscape works. Your photo is cropped to fill the frame, with room to adjust the framing.</p>${holder.photo?`<button type="button" class="btn text" id="${id}Remove">Remove photo</button>`:''}</div></div>${holder.photo?photoPositionHTML(position,id):''}`;}
function photoPositionHTML(position,id){return `<div class="photo-position"><div class="field"><label for="${id}X">Photo framing: left / right</label><input id="${id}X" type="range" min="0" max="100" value="${position.x}" data-photo-axis="x"></div><div class="field"><label for="${id}Y">Photo framing: up / down</label><input id="${id}Y" type="range" min="0" max="100" value="${position.y}" data-photo-axis="y"></div></div>`;}
function bindPhotoEditor(root,holder,id,refresh){
  root.querySelector('#'+id+'Input')?.addEventListener('change',async event=>{const file=event.target.files?.[0];if(!file)return;if(!/^image\/(jpeg|png|webp)$/.test(file.type))return toast('Choose a PNG, JPG, or WebP photo.');const reader=new FileReader();reader.onload=async()=>{holder.photo=await resizeImage(reader.result,720,720,.82);holder.photoPosition={x:50,y:50};refresh();};reader.readAsDataURL(file);});
  root.querySelector('#'+id+'Remove')?.addEventListener('click',()=>{holder.photo='';holder.photoPosition={x:50,y:50};refresh();});
  root.querySelectorAll('[data-photo-axis]').forEach(input=>input.addEventListener('input',()=>{holder.photoPosition[input.dataset.photoAxis]=Number(input.value);root.querySelectorAll('.photo-editor-preview img,.photo-preview img').forEach(img=>img.style.objectPosition=`${holder.photoPosition.x}% ${holder.photoPosition.y}%`);saveState();}));
}
function coverPhotoRect(image,x,y,width,height,position={x:50,y:50}){const scale=Math.max(width/image.width,height/image.height),drawWidth=image.width*scale,drawHeight=image.height*scale;return {x:x-(drawWidth-width)*(position.x??50)/100,y:y-(drawHeight-height)*(position.y??50)/100,width:drawWidth,height:drawHeight};}
