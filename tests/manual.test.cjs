// Run with Node.js and @napi-rs/canvas available on NODE_PATH (see README).
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {createCanvas} = require('@napi-rs/canvas');

const storage = new Map(), blobs = new Map(), downloads = [];
const canvases = new Map();
function element(){return {addEventListener(){},classList:{toggle(){}},setAttribute(){},focus(){},remove(){},click(){downloads.push({name:this.download,url:this.href});},querySelectorAll(){return [];},textContent:''};}
function canvas(){
  const c=createCanvas(1600,2071),ctx=c.getContext('2d'),calls=[];
  const fill=ctx.fillText.bind(ctx);ctx.fillText=(text,x,y)=>{const measuredWidth=ctx.measureText(String(text)).width;const left=ctx.textAlign==='right'?x-measuredWidth:ctx.textAlign==='center'?x-measuredWidth/2:x;calls.push({text:String(text),x:left,y,width:measuredWidth});fill(text,x,y);};
  c.paintCalls=calls;return c;
}
const document={fonts:{ready:Promise.resolve()},querySelector(selector){if(canvases.has(selector))return canvases.get(selector);return element();},querySelectorAll(){return [];},getElementById(id){return this.querySelector('#'+id);},addEventListener(){},createElement(tag){return tag==='canvas'?canvas():element();},body:{append(){},appendChild(){}}};
const context=vm.createContext({console,document,Image:class {addEventListener(){}},structuredClone,crypto:{},Date,Math,TextEncoder,TextDecoder,Uint8Array,Blob,URL:{createObjectURL(blob){const id='blob:'+blobs.size;blobs.set(id,blob);return id;},revokeObjectURL(){}},atob,Promise,localStorage:{getItem(key){return storage.get(key)||null;},setItem(key,val){storage.set(key,val);}},window:{scrollTo(){}},setTimeout(){},navigator:{},FileReader:class {readAsText(file){this.result=file.text;this.onload();}}});
const root=path.resolve(__dirname,'..');
vm.runInContext(fs.readFileSync(path.join(root,'manual-transfer.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'kickoffs.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
const run=code=>vm.runInContext(code,context);
run('render=()=>{}; toast=()=>{};');

// Old profiles retain working location; new fields appear without a reset.
storage.set('tang-manual-of-me-v3',JSON.stringify({profile:{name:'Alexis Johnson',location:'Hybrid',intro:'Hello'}}));
assert.equal(run('loadState().profile.location'),'Hybrid');
assert.equal(run('loadState().profile.preferredName'),'');
assert.equal(run('loadState().profile.reachMethods.length'),0);

// Only the essentials gate the Manual; optional growth and personal details do not.
run(`state=structuredClone(DEFAULT_STATE); state.profile.name='Alexis Johnson';state.profile.intro='A useful introduction';state.profile.strengths=['empathy'];state.profile.communicationStyle='Thoughtful';state.profile.workingStyle='Iterative';state.profile.feedback=['Conversational'];state.profile.helpForm=['Talk it through with me'];`);
assert.equal(run('teamOutputsReady()'),true);
assert.equal(run('anyOnboardingData()'),false);
assert.equal(run('steps[2].complete()'),false);
assert.equal(run('steps[6].complete()'),false);

// Distinct projects keep their own answers, without changing the general profile.
run(`startKickoff();activeKickoff().project='Project A';activeKickoff().role='Research';activeKickoff().hours='Early';persistKickoff(activeKickoff());startKickoff();activeKickoff().project='Project B';activeKickoff().role='Prototyping';activeKickoff().hours='Late';persistKickoff(activeKickoff());`);
assert.equal(run('state.kickoffs.items.length'),2);
assert.equal(run("state.kickoffs.items.find(k=>k.project==='Project A').hours"),'Early');
assert.equal(run('state.profile.workingHours'),'');
run("state.kickoffs.step=2;persistKickoff(activeKickoff());const resumeId=activeKickoff().id;kickoffList();openKickoff(resumeId,'edit');");
assert.equal(run('state.kickoffs.step'),2);
assert.equal(run('activeKickoff().step'),2);
assert.equal(JSON.parse(storage.get('tang-manual-of-me-v3')).kickoffs.items.length,2);
run(`testKickoff=blankKickoff();testKickoff.name=' ';testKickoff.project=' ';testKickoff.role=' ';`);
assert.equal(run('validateKickoff(testKickoff,0).length'),3);
run(`testKickoff.reachOther='Email for questions';testKickoff.discussion='A bit of both';`);
assert.equal(run('validateKickoff(testKickoff,1).length'),0);
assert.equal(run('validateKickoff(testKickoff,2).length'),0);

// A project backup imports without replacing other project records or the profile.
run(`importBackup({target:{files:[{text:JSON.stringify({kickoffs:{items:[{id:'imported-project',name:'Riley Morgan',project:'Imported project',role:'Design',reachMethods:['Slack'],discussion:'A bit of both'}]}})}],value:'x'}});`);
assert.equal(run('state.kickoffs.items.length'),3);
assert.equal(run('state.profile.name'),'Alexis Johnson');
assert.equal(run("state.kickoffs.items.find(k=>k.id==='imported-project').strengths.length"),0);

const long=(length,end)=>'W'.repeat(length-end.length)+end;
context.long=long;
run(`state=structuredClone(DEFAULT_STATE);Object.assign(state.profile,{name:long(80,'NAMEEND'),preferredName:long(50,'NICKEND'),intro:long(360,'INTROEND'),strengths:['collaboration','creativity','communication','adaptability'],growth:['collaboration','creativity','communication','adaptability'],location:long(120,'LOCATIONEND'),workingHours:long(120,'HOURSEND'),reachMethods:['Slack','Email'],reachOther:long(150,'REACHEND'),discussionStyle:'Give me time to process',communicationStyle:long(50,'COMMSEND'),workingStyle:long(50,'STYLEEND'),feedback:['Direct + specific','Conversational','Written first'],feedbackOther:long(80,'FEEDBACKEND'),teamMakesGreat:['Psychological safety','Shared ownership','Momentum'],teamOther:long(80,'TEAMEND'),helpForm:['Talk it through with me','Help me prioritize','Give me context'],helpOther:long(100,'HELPEND'),organize:long(100,'ORGANIZEEND'),stress:long(120,'STRESSEND'),bestWhenOther:long(120,'BESTEND'),idealBuild:long(420,'BUILDEND'),proud:long(280,'PROUDEND'),fun:long(180,'FUNEND'),knowTooMuch:long(180,'KNOWEND'),askMeAbout:long(100,'ASKEND'),archetype:long(120,'ARCHETYPEEND')});`);
function paintedText(c){return c.paintCalls.map(p=>p.text).join('').replace(/\s/g,'');}
function assertInside(c){for(const p of c.paintCalls){assert(p.x>=0&&p.x+p.width<=c.width-25,`Text overflows horizontally: ${p.text}`);assert(p.y>0&&p.y<c.height-25,`Text overflows vertically: ${p.text}`);}}
const manual=canvas();canvases.set('#manualCanvas',manual);run('drawManualCanvas()');assertInside(manual);
for(const token of ['INTROEND','LOCATIONEND','HOURSEND','REACHEND','FEEDBACKEND','TEAMEND','HELPEND','ORGANIZEEND','STRESSEND','BESTEND','BUILDEND','PROUDEND','FUNEND','KNOWEND','ASKEND'])assert(paintedText(manual).includes(token),`Missing ${token}`);
context.pngBytes=new Uint8Array(manual.toBuffer('image/png'));
const recovered=run('readManualFromPNG(embedManualInPNG(pngBytes,manualDocument().restoreData))');
assert.equal(recovered.profile.preferredName,long(50,'NICKEND'));
assert.equal(recovered.profile.intro,long(360,'INTROEND'));
assert(!recovered.kickoffs,'A shared general Manual must not embed unrelated project records');
assert(!recovered.onboarding,'A general Manual must not embed unshown onboarding tool answers');
assert.equal(run('readManualFromPNG(pngBytes)'),null,'Older PNGs take the image-reading route');
assert.equal(run(`readManualFromPNG(embedManualInPNG(pngBytes,{format:'tang-manual',version:1,kind:'profile',profile:{name:'José 李',preferredName:'Jo'}})).profile.name`),'José 李');
run(`photoRestore={photo:'',photoPosition:{x:50,y:50}};mergeRecovered(photoRestore,{photo:'data:image/jpeg;base64,AA==',photoPosition:{x:12,y:93}});`);
assert.equal(run('photoRestore.photoPosition.y'),93,'A recovered photo keeps its framing on a fresh profile');
run(`kept={intro:'Existing answer',bestSpectrum:{direction:0,pace:null}};mergeRecovered(kept,{intro:'Imported answer',bestSpectrum:{direction:4,pace:2}});`);
assert.equal(run('kept.intro'),'Existing answer');assert.equal(run('kept.bestSpectrum.direction'),0);assert.equal(run('kept.bestSpectrum.pace'),2);
const oldText='Alexis Johnson\nCall me Lexi\nMANUAL OF ME · TANG\nTHE 30-SECOND VERSION\nI make complex work useful.\nWHAT I BRING\nEmpathy · Collaboration & Team Mindset\nWORKING WITH ME\nCommunication style: Thoughtful\nWorking style: Collaborative\nFeedback: Conversational\nUsual hours: 7:30 to 4 Eastern\nHELP ME GET UNSTUCK\nHelp me prioritize\nBEYOND THE WORK\nUsually: Reading and hiking';context.oldText=oldText;
const parsedOld=run('parseManualText(oldText)');assert.equal(parsedOld.profile.name,'Alexis Johnson');assert.equal(parsedOld.profile.feedbackOther,'Conversational');assert.equal(parsedOld.profile.fun,'Reading and hiking');assert.equal(parsedOld.profile.strengths.length,2);
const portraitCrop=run('coverPhotoRect({width:200,height:400},0,0,100,100,{x:50,y:100})');assert.equal(portraitCrop.height,200);assert.equal(portraitCrop.y,-100);
const landscapeCrop=run('coverPhotoRect({width:400,height:200},0,0,100,100,{x:100,y:50})');assert.equal(landscapeCrop.width,200);assert.equal(landscapeCrop.x,-100);
const intro=canvas();canvases.set('#introCanvas',intro);intro.width=1080;run('drawIntroCanvas()');assertInside(intro);
assert(intro.height>1350,'Long intro card must grow');
for(const token of ['INTROEND','BUILDEND','KNOWEND','ASKEND','FUNEND','ARCHETYPEEND'])assert(paintedText(intro).includes(token),`Teammate card lost ${token}`);

const pages=run('createFieldGuidePages(manualDocument())');assert(pages.length>1,'Long Manual must paginate');pages.forEach(assertInside);
const combined=pages.map(paintedText).join('');for(const token of ['INTROEND','PROUDEND','BUILDEND','ASKEND'])assert(combined.includes(token));
run(`testKickoff=blankKickoff();Object.assign(testKickoff,{name:long(80,'KNAMEEND'),callMe:long(50,'KCALLEND'),project:long(100,'PROJECTEND'),role:long(240,'ROLEEND'),location:long(120,'KLOCATIONEND'),hours:long(120,'KHOURSEND'),reachMethods:['Slack','Email'],reachOther:long(150,'KREACHEND'),discussion:'Give me time to process',feedback:['Direct + specific','Written first','1:1'],feedbackOther:long(150,'KFEEDBACKEND'),support:long(180,'SUPPORTEND'),need:long(180,'NEEDEND'),lookingForward:long(180,'FORWARDEND'),fun:long(150,'HUMANEND'),energy:'Curious & ready',strengths:['collaboration','creativity','communication']});`);
const kickoffCanvas=canvas();context.kickoffCanvas=kickoffCanvas;run('drawFieldGuideCanvas(kickoffCanvas,kickoffDocument(testKickoff))');assertInside(kickoffCanvas);
for(const token of ['ROLEEND','KHOURSEND','KREACHEND','SUPPORTEND','NEEDEND','FORWARDEND','HUMANEND'])assert(paintedText(kickoffCanvas).includes(token),`Kickoff lost ${token}`);
run("testKickoff.skills=['Data analysis',long(60,'SKILLEND')];testKickoff.growthSkills=['Prototyping'];testKickoff.growthGoal=long(200,'GROWTHEND');testKickoff.spectra={direction:0,collaboration:4,pace:2,startingPoint:1};");
for(const orientation of ['landscape','portrait']){const board=canvas();context.board=board;context.orientation=orientation;run('drawKickoffBoard(board,kickoffDocument(testKickoff),orientation)');assertInside(board);for(const token of ['ROLEEND','GROWTHEND','HUMANEND'])assert(paintedText(board).includes(token),`Board lost ${token}`);assert.equal(board.manualPayload.kind,'kickoff');assert(!board.manualPayload.profile,'Project PNG must not embed the general profile');}
const kickoffPages=run('createFieldGuidePages(kickoffDocument(testKickoff))');kickoffPages.forEach(assertInside);assert(kickoffPages.length>1);
context.pdfTestPages=kickoffPages;
(async()=>{
  await run("downloadCanvasPagesPDF(pdfTestPages,'test-kickoff.pdf')");
  const download=downloads.find(d=>d.name==='test-kickoff.pdf');assert(download,'PDF download created');
  const bytes=Buffer.from(await blobs.get(download.url).arrayBuffer());assert(bytes.subarray(0,8).toString().startsWith('%PDF-1.4'));
  const pdfText=bytes.toString('latin1');assert(pdfText.includes(`/Count ${kickoffPages.length}`));
  if(process.env.MANUAL_QA_OUTPUT){const dir=process.env.MANUAL_QA_OUTPUT;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'max-kickoff.pdf'),bytes);fs.writeFileSync(path.join(dir,'max-manual.png'),manual.toBuffer('image/png'));fs.writeFileSync(path.join(dir,'max-teammate-card.png'),intro.toBuffer('image/png'));fs.writeFileSync(path.join(dir,'max-kickoff.png'),kickoffCanvas.toBuffer('image/png'));const friendly=canvas();context.friendly=friendly;run("state=structuredClone(DEFAULT_STATE);Object.assign(state.profile,{name:'Alexis Johnson',preferredName:'Lexi',intro:'I connect research, people, and prototypes. I enjoy making complex work easier to understand.',communicationStyle:'Thoughtful',workingStyle:'Collaborative',location:'Hybrid',workingHours:'7:30 a.m. to 4 p.m. Eastern',reachMethods:['Slack'],feedback:['Conversational'],helpForm:['Help me prioritize'],strengths:['empathy','collaboration'],fun:'Reading, hiking, and landscape photography'});drawFieldGuideCanvas(friendly,manualDocument());");const raw=new Uint8Array(friendly.toBuffer('image/png'));context.friendlyBytes=raw;fs.writeFileSync(path.join(dir,'legacy-general.png'),raw);fs.writeFileSync(path.join(dir,'recoverable-general.png'),run('embedManualInPNG(friendlyBytes,friendly.manualPayload)'));}
  console.log(`PASS: migration, Manual-only completion, project isolation, resume data, alternate contact, backup import, wrapping, complete PNGs, PNG recovery, photo framing, Miro layouts, and ${kickoffPages.length}-page PDF.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
