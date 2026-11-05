const app = document.querySelector('#app');
const liveRegion = document.querySelector('#liveRegion');
const brandButton = document.querySelector('#brandButton');
const menuButton = document.querySelector('#menuButton');
const mobileNav = document.querySelector('#mobileNav');
const backupInput = document.querySelector('#backupInput');
const tourButton = document.querySelector('#tourButton');

const STORAGE_KEY = 'tang-manual-of-me-v3';
const LEGACY_STORAGE_KEY = 'tang-manual-of-me-v2';
const COLORS = {
  navy:'#242A38', blue:'#1282CA', orange:'#F15A22', gray:'#595A5A',
  pink:'#e5018c', yellow:'#fed727', sky:'#7bc7e5', ice:'#d5e3e9', purple:'#7d6b9d'
};

const TANG_LOGO = new Image();
TANG_LOGO.src = 'assets/tang-logo-white.png';

const POWER_SKILLS = [
  { id:'collaboration', label:'Collaboration & Team Mindset', core:true, desc:'Invites input and builds shared ownership across disciplines.' },
  { id:'givingFeedback', label:'Giving Feedback', core:true, desc:'Shares constructive input kindly to help others grow.' },
  { id:'receivingFeedback', label:'Receiving Feedback', core:true, desc:'Receives feedback with curiosity, not defensiveness.' },
  { id:'humbleHustle', label:'Humble Hustle', core:true, desc:'Rolls up their sleeves, does unglamorous work, and contributes wherever needed, regardless of title.' },
  { id:'empathy', label:'Empathy', core:true, desc:'Values the perspectives, needs, and lived experiences of others.' },
  { id:'creativity', label:'Creativity & Resourcefulness', desc:'Finds inventive, low-resource solutions through creativity and iteration.' },
  { id:'ambiguity', label:'Comfort with Ambiguity', desc:'Makes progress despite uncertainty and shifts direction as needed.' },
  { id:'ownership', label:'Ownership Mentality', desc:'Takes initiative and responsibility beyond formal job duties.' },
  { id:'adaptability', label:'Adaptability & Flexibility', desc:'Adjusts to changing priorities, roles, needs, and environments.' },
  { id:'problemSolving', label:'Proactive Problem Solving', desc:'Addresses problems without waiting to be asked.' },
  { id:'resilience', label:'Resilience & Grit', desc:'Perseveres, rebounds, and stays grounded under stress.' },
  { id:'communication', label:'Clear Communication', desc:'Communicates clearly and concisely, even under pressure or with mixed audiences.' },
  { id:'socialAwareness', label:'Social Awareness', desc:'Reads the room and adjusts tone, language, and formality.' },
];

const SUPPORT_LEVELS = [
  { value:3, short:'I’m good', label:'Skip the basics', className:'skip' },
  { value:2, short:'Quick refresh', label:'Quick refresher', className:'quick' },
  { value:1, short:'Show me', label:'Guided walkthrough', className:'guided' },
  { value:0, short:'Start at zero', label:'Build the foundation', className:'deep' },
];

const SUPPORT_TOPICS = [
  { id:'hcd', label:'Human-Centered Design', time:'10–30 min' },
  { id:'navy', label:'Navy + mission context', time:'15–30 min', desc:'The people, missions, organizations, and operating environments behind the work. This can include learning a new domain, such as submarines, surface ships, or naval aviation, even if you already know another one well.' },
  { id:'culture', label:'TANG history, lingo + culture', time:'10–20 min' },
  { id:'impact', label:'Deliverables + how we create impact', time:'15–30 min' },
  { id:'people', label:'Who’s who + getting connected', time:'10–20 min' },
  { id:'experiences', label:'Experiences, events + getting into the field', time:'As available' },
];

const TOOL_TOPICS = [
  { id:'miro', label:'Miro' },
  { id:'slack', label:'Slack' },
  { id:'box', label:'Box / Box Canvas' },
  { id:'flankspeed', label:'Flank Speed / NVD' },
  { id:'meetings', label:'Zoom / Teams' },
];

const ACCESS_OPTIONS = [
  'APL / NVD access', 'TANG Slack', 'Box', 'CAC', 'Flank Speed', 'Still waiting / not sure'
];

const LEARNING_MODES = [
  { id:'cheatsheet', mark:'SKIM', title:'Give me the cheat sheet', text:'Let me scan the essentials and keep a reference nearby.' },
  { id:'show', mark:'SEE', title:'Show me once', text:'A short demo or walkthrough goes a long way.' },
  { id:'try', mark:'TRY', title:'Let me try it', text:'Give me something real to practice with.' },
  { id:'pair', mark:'PAIR', title:'Pair me up', text:'I learn fastest alongside another teammate.' },
  { id:'experience', mark:'GO', title:'Let me experience it', text:'I want to see the work, environment, or mission firsthand.' },
];

const SPECTRA = [
  { id:'direction', left:'Room to explore', right:'Clear destination' },
  { id:'collaboration', left:'Heads-down focus', right:'Bounce ideas together' },
  { id:'pace', left:'Time to think', right:'Move + iterate' },
  { id:'startingPoint', left:'Big picture first', right:'Concrete example first' },
];

const CAREER_STAGES = ['Student / intern','Early career','Mid-career','Senior / experienced','Other / varies'];
// Set to false after the initial leadership rollout. Saved answers are retained.
const SHOW_TANG_LEADERSHIP = true;
const CONNECTION_TYPES = ['APL Teammate','TANG Teammate',...(SHOW_TANG_LEADERSHIP?['TANG Leadership']:[]),'Navy / Government Teammate','Other / still figuring it out'];
const REACH_METHODS = ['Slack','Email','Call','In person','Teams / Zoom'];
const DISCUSSION_STYLES = ['I think out loud','Give me time to process','A bit of both'];
const MILITARY_BRANCHES = ['Navy','Marine Corps','Army','Air Force','Space Force','Coast Guard','Other'];
const EXPERIENCE_DOMAINS = ['Undersea / submarines','Surface ships','Naval aviation','Space','Cyber','Expeditionary / land','Other / cross-domain'];
const APL_GROUPS = ['FPS','AMDS','AOS','COMM','REDD','ITSD','NSAD','SES','Other'];
const TANG_PARTNERS = ['2Mi','Evans Consulting','RL Leaders','Rockwood Company','Informed XP','Other'];

const TEAM = [
  {
    name:'Jackson Murray',
    role:'HCD Strategist · Onboarding Lead',
    initials:'JM',
    ask:'Onboarding, HCD, systems thinking, prototyping, and emerging tech',
    summary:'Helps teams make sense of gnarly, high-stakes systems and turn human needs into useful changes across products, processes, spaces, and strategy.',
    background:'UX + psychology · published research · emerging technology',
    outside:'Camera in hand · strategy games · softball · sports',
    link:'',
    image:'assets/jackson-murray.jpg',
    position:'50% 38%'
  },
  {
    name:'Patrick Alfonzo',
    role:'Human-Centered Design Strategist',
    initials:'PA',
    ask:'Navy and submarine context, complex patterns, HCD, and team questions',
    summary:'Brings history, submarine, acquisition, and uncrewed-undersea experience to messy problems—spotting patterns, asking sharp questions, and helping teams move complexity toward action.',
    background:'Historian · retired submariner · Navy acquisition + undersea',
    outside:'San Diego · father of three · reflection + uncommon inspiration',
    link:'',
    image:'assets/patrick-alfonzo.jpg',
    position:'50% 32%'
  },
  {
    name:'Amy Niewoehner',
    role:'Program Operations Manager',
    initials:'AN',
    ask:'Program ops, milestones, process, coordination, and Miro onboarding',
    summary:'Keeps complex work moving by bringing structure to plans, processes, deliverables, and sponsor commitments—while staying close to TANG’s prototype-and-learn mindset.',
    background:'Digital marketing + account management · MBA · project delivery',
    outside:'Rock climbing · painting · outdoors · Cassian the Portuguese Water Dog',
    link:'',
    image:'assets/amy-niewoehner.jpg',
    position:'50% 28%'
  },
  {
    name:'Maria Smith',
    role:'Sponsor Experience Manager',
    initials:'MS',
    ask:'Sponsor experience, events and workshops, team connections, and Beverage Co-Op',
    summary:'Designs and delivers welcoming, high-quality experiences for sponsors and teammates, especially around mission-critical events, workshops, and the everyday TANG experience.',
    background:'Maritime program support · event planning from small teams to 500+',
    outside:'Boating · crabbing · beach days · reading · fitness · coffee shops',
    link:'',
    image:'assets/maria-smith.jpg',
    position:'50% 30%'
  },
  {
    name:'Moriah Graham',
    role:'Onboarding Teammate',
    initials:'MG',
    ask:'Flank Speed / access questions and getting connected',
    summary:'A go-to teammate when access, Flank Speed, or getting connected is the thing standing between you and the work.',
    background:'Access + teammate support',
    outside:'',
    link:'',
    image:''
  },
];

const RESOURCES = [
  { category:'Start Here', mark:'TANG', title:'Official TANG Website', desc:'A public starting point for the TANG program and its mission.', access:'Public', url:'https://www.navsea.navy.mil/Resources/TANG/', openInEdge:true, topic:'culture', duration:'5 min' },
  { category:'Start Here', mark:'306', title:'The TANG Way', desc:'Who we are, how we roll, and the change we make: curious Subject Matter Explorers, good teammateship, humble hustle, prototyping, and learning by doing.', access:'Internal', url:'', topic:'culture', duration:'5–10 min' },
  { category:'HCD', mark:'HCD', title:'IDEO: Design Thinking', desc:'A fast public introduction to design thinking and the mindset behind the practice.', access:'Public', url:'https://www.youtube.com/watch?v=McTh-xzxfRE', topic:'hcd', duration:'4 min' },
  { category:'HCD', mark:'HCD', title:'Design Thinking Frameworks: Quick Overview', desc:'A lightweight overview of common frameworks. Use it as orientation, not a rigid recipe.', access:'Public', url:'https://ixdf.org/literature/article/design-thinking-a-quick-overview', topic:'hcd', duration:'10 min' },
  { category:'HCD', mark:'LUMA', title:'APL LUMA Courses', desc:'Three deeper learning options: Fundamentals of Innovation through HCD, HCD Mini-Trainings, and Innovative Techniques to Think Differently.', access:'Internal', url:'', topic:'hcd', duration:'Up to 16 hrs' },
  { category:'Tools', mark:'MIRO', title:'Miro Essentials', desc:'Get comfortable collaborating in the team’s UNCLASS whiteboarding environment.', access:'Public', url:'https://academy.miro.com/path/miro-essentials', topic:'miro', duration:'Self-paced' },
  { category:'Tools', mark:'SLACK', title:'Slack Quick Start', desc:'Learn the basics of the team’s main messaging and collaboration environment.', access:'Public', url:'https://slack.com/help/articles/360059928654-How-to-use-Slack--your-quick-start-guide', topic:'slack', duration:'10–20 min' },
  { category:'Tools', mark:'LIST', title:'Slack Lists', desc:'A quick guide to using Slack’s built-in lists for lightweight task tracking.', access:'Public', url:'https://slack.com/help/articles/27588021944339-Slack-lists--Track-project-tasks', topic:'slack', duration:'5–10 min' },
  { category:'Tools', mark:'BOX', title:'Box Canvas', desc:'A collaborative canvas option that can support workflows when Miro is not the right environment.', access:'Public', url:'https://support.box.com/hc/en-us/articles/48218095373971-Getting-Started-with-Box-Canvas', topic:'box', duration:'10 min' },
  { category:'Tools', mark:'FS', title:'Flank Speed via NVD', desc:'Access depends on your role, CAC, and required paperwork. The onboarding team can help you understand what you need.', access:'Gated', url:'', topic:'flankspeed', duration:'As needed' },
  { category:'Culture', mark:'LNGO', title:'TANG Lingo Cheat Code', desc:'Yes, and. How might we. What would have to be true. Likes, Wishes & Wonders. Prototype it. Learn the phrases by using them.', access:'Internal', url:'', topic:'culture', duration:'5 min' },
  { category:'Culture', mark:'6×', title:'Six Principles', desc:'Respect complexity. Find the right questions. Look anywhere for inspiration. Work together. Deliver with discipline. Learn and evolve.', access:'Internal', url:'', topic:'culture', duration:'3 min' },
  { category:'Culture', mark:'RIT', title:'TANG Rituals', desc:'TANG Tuesday, TANG Labs, Summer/Winter Stand-Down, Curiosity Club, and TANG in the Field.', access:'Internal', url:'', topic:'culture', duration:'Explore over time' },
  { category:'Impact', mark:'WHY', title:'See How We Create Impact', desc:'Project stories and examples of how the team moves from messy challenges to useful outcomes. Some source material requires approved access.', access:'Internal', url:'', topic:'impact', duration:'15–30 min' },
  { category:'Navy 101', mark:'USN', title:'Navy 101', desc:'A starting point for mission context, structures, language, and the environment our work operates within.', access:'Internal', url:'', topic:'navy', duration:'15–30 min' },
  { category:'RP1', kind:'media', image:'assets/culture-beverage.jpg', title:'TANG Beverage Co-Op', desc:'A monthly co-op for RP1 teammates who want access to the fridge of drinks. Maria can help you get connected.', access:'RP1', topic:'people' },
  { category:'RP1', kind:'media', image:'assets/culture-library.jpg', title:'TANG Little Library', desc:'Borrow a book from D130, swap a recommendation, or discover a new rabbit hole.', access:'RP1', topic:'culture' },
  { category:'RP1', kind:'media', image:'assets/culture-advice.jpg', title:'Letters to a Teammate', desc:'Advice from teammates to the next TANGster generation: ask questions, assume good intent, stay flexible, and enjoy the ride.', access:'RP1', topic:'culture' },
];

const TIMELINE = [
  { when:'Day 1', title:'Welcome to TANG', tasks:['TANG overview','RP1 tour','Meet & greet with leadership','1:1 with project lead'] },
  { when:'Week 1', title:'Introduction to TANG', tasks:['How TANG uses Slack','Introduce yourself','Box basics','Miro basics','Tour the Miro TANG Hub','TANG Tuesday calendar'] },
  { when:'Month 1', title:'Discover TANG', tasks:['Explore APL campuses','Learn team rituals','CAC as applicable','Navy 101','Book 306','TANG one-sheeter'] },
  { when:'Months 2–3+', title:'Engage with TANG', tasks:['Take a headshot','Build your bio','Attend a Shop / Build Day','Attend TANG events','Attend a Restock Day'] },
];

const DEFAULT_STATE = {
  route:'home', wizard:false, step:0, cardTemplate:0, resourceFilter:'All',
  ui:{ introSeen:false, tourSeen:false, outroSeen:false, checkpoint:'' },
  kickoffs:{ activeId:'', view:'list', step:0, items:[] },
  profile:{
    photoPosition:{x:50,y:50}, name:'', preferredName:'', pronouns:'', careerStage:'', connectionType:'', organization:'', location:'', workingHours:'', reachMethods:[], reachOther:'', discussionStyle:'', militaryExperience:'', militaryBranches:[], domains:[], photo:'', intro:'', fun:'', knowTooMuch:'', proud:'', idealBuild:'', askMeAbout:'',
    communicationStyle:'', workingStyle:'', teamMakesGreat:[], teamOther:'', feedback:[], feedbackOther:'',
    bestSpectrum:Object.fromEntries(SPECTRA.map(s=>[s.id,null])), bestWhenOther:'', helpForm:[], helpOther:'', organize:'', stress:'',
    strengths:[], growth:[], archetype:'', birthday:'', snack:'', drink:'', celebration:'',
  },
  onboarding:{
    support:Object.fromEntries(SUPPORT_TOPICS.map(t=>[t.id,null])),
    tools:Object.fromEntries(TOOL_TOPICS.map(t=>[t.id,null])),
    access:[], learningModes:[], pace:'',
  },
};


const PATRICK_EXAMPLE = {
  profile:{
    name:'Patrick Alfonzo', pronouns:'', careerStage:'Senior / experienced', connectionType:'APL teammate', organization:'TANG', location:'San Diego, CA', photo:'assets/patrick-alfonzo.jpg',
    intro:'Patrick is an HCD strategist who brings together history, submarine operations, Navy acquisition, and undersea experience. He gravitates toward hard problems where people, culture, technology, history, and the future collide.',
    fun:'Stillness, solitude, family time, and looking for inspiration in uncommon places.',
    knowTooMuch:'Submarines, Navy acquisition, undersea systems, and history.',
    proud:'Building a career that bridges academia, the submarine community, Navy acquisition, and HCD and using that range to help teams move complexity toward action.',
    idealBuild:'A project where I can combine HCD, Navy context, emerging technology, and future-oriented thinking to help a team make a hard decision or build something tangible.',
    askMeAbout:'Submarines, Navy context, history, or a hard problem worth unpacking.',
    communicationStyle:'Thoughtful + curious', workingStyle:'Reflective + collaborative',
    teamMakesGreat:['Curiosity','Shared ownership','Trust'], teamOther:'',
    feedback:['Conversational','Direct + specific','Give me time to process'], feedbackOther:'',
    bestSpectrum:{direction:1,collaboration:3,pace:1,startingPoint:1},
    bestWhenOther:'Give me enough context to see the pattern, then room to ask a better question.',
    helpForm:['Give me context','Talk it through with me','Give me space to work it out'], helpOther:'',
    organize:'Notes, patterns, conversations, and a clear next question',
    stress:'I may get quieter and more reflective while I work the problem.',
    strengths:['collaboration','ambiguity','creativity','socialAwareness'],
    growth:['communication','givingFeedback'], archetype:'', birthday:'', snack:'', drink:'', celebration:'',
  },
  onboarding:{
    support:{hcd:3,navy:3,culture:2,impact:2,people:2,experiences:1},
    tools:{miro:2,slack:2,box:2,flankspeed:3,meetings:3},
    access:['APL / NVD access','TANG Slack','Box','CAC','Flank Speed'],
    learningModes:['experience','pair','cheatsheet'], pace:'One useful thing at a time',
  },
  cardTemplate:0,
};

function patrickExampleState(){
  const example=deepMerge(structuredClone(DEFAULT_STATE),structuredClone(PATRICK_EXAMPLE));
  example.ui.introSeen=true;
  return example;
}
function withPatrickExample(fn){
  const live=state;
  state=patrickExampleState();
  try { return fn(); } finally { state=live; }
}

let state = loadState();

const steps = [
  { key:'identity', title:'First things first: who are we welcoming?', help:'Your name is required. Your nickname, photo, and background details are optional.', render:renderIdentity, complete:()=>!!state.profile.name.trim() },
  { key:'story', title:'Give us the 30-second version of you.', help:'Not a formal bio. Think of what you would actually want a new teammate to know before the first meeting.', render:renderStory, complete:()=>!!state.profile.intro.trim() },
  { key:'human', optional:true, title:'What should people know beyond your job title?', help:'Optional conversation starters. Share one, share a few, or skip this section.', render:renderHuman, complete:()=>!!(state.profile.fun.trim() || state.profile.knowTooMuch.trim() || state.profile.askMeAbout.trim()) },
  { key:'strengths', title:'What do you naturally bring to a team?', help:'Pick up to four Power Skills that feel most like you today. This is reflection, not a scorecard.', render:renderStrengths, complete:()=>state.profile.strengths.length>0 },
  { key:'work', title:'How do you tend to show up with a team?', help:'Communication style, working style, and feedback preferences are required. Everything else adds useful context when you want to share it.', render:renderWorkStyle, complete:()=>!!(state.profile.communicationStyle.trim() && state.profile.workingStyle.trim() && (state.profile.feedback.length || state.profile.feedbackOther.trim())) },
  { key:'help', title:'When do you do your best work?', help:'Choose at least one way teammates can help when you are stuck. The spectra and other details are optional.', render:renderHelp, complete:()=>state.profile.helpForm.length>0 || !!state.profile.helpOther.trim() },
  { key:'growth', optional:true, title:'What do you want to build while you’re here?', help:'Optional: share a project, skill, or experience you would enjoy building toward. You can come back to this later.', render:renderGrowth, complete:()=>state.profile.growth.length>0 || !!state.profile.idealBuild.trim() || !!state.profile.proud.trim() },
  { key:'support', title:'Where should the onboarding team lean in?', help:'Choose one level per topic for your optional onboarding brief. You can request a new domain even when you already know another one well.', render:renderSupportMatrix, complete:()=>SUPPORT_TOPICS.every(t=>state.onboarding.support[t.id]!==null) },
  { key:'tools', title:'What about access and tools?', help:'Tell us what you can reach today, then where a demo would remove friction. Access can change over time.', render:renderToolMatrix, complete:()=>TOOL_TOPICS.every(t=>state.onboarding.tools[t.id]!==null) },
  { key:'learn', title:'When you are learning something new, what works best?', help:'Pick more than one. This helps us choose between a reference, demo, pairing session, practice task, or real-world experience.', render:renderLearning, complete:()=>state.onboarding.learningModes.length>0 && !!state.onboarding.pace },
  { key:'hospitality', optional:true, title:'The important stuff.', help:'Optional, non-sensitive preferences that can help teammates make everyday welcomes feel thoughtful.', render:renderHospitality, complete:()=>!!(state.profile.snack.trim() || state.profile.drink.trim() || state.profile.celebration) },
];

const MODULES = [
  { id:'meet', title:'Meet Me', start:0, end:2, indices:[0,1,2], output:'intro', accent:'#1282CA', time:'~3 min' },
  { id:'work', title:'How I Work', start:3, end:6, indices:[3,4,5,6], output:'manual', accent:'#F15A22', time:'~5 min' },
  { id:'onboarding', title:'Show Me Around', start:7, end:9, indices:[7,8,9], output:'onboarding', accent:'#fed727', time:'~4 min' },
  { id:'hospitality', title:'The Important Stuff', start:10, end:10, indices:[10], output:null, accent:'#e5018c', time:'~2 min' },
];
function moduleById(id){ return MODULES.find(m=>m.id===id); }
function moduleForStep(i){ return MODULES.find(m=>m.indices.includes(i)); }
function moduleComplete(id){ const m=moduleById(id); if(!m)return false; const required=m.indices.filter(i=>!steps[i].optional); return (required.length?required:m.indices).every(i=>steps[i].complete()); }
function moduleStarted(id){ const m=moduleById(id); return !!m && m.indices.some(i=>steps[i].complete()); }
function nextIncompleteModule(excludeId=''){ return MODULES.find(m=>m.id!==excludeId && !moduleComplete(m.id)); }
function startModule(id){ const m=moduleById(id); if(!m)return; state.ui.checkpoint=''; state.route='home'; state.wizard=true; const incomplete=m.indices.find(i=>!steps[i].complete()); state.step=incomplete===undefined?m.start:incomplete; saveState(); render(); window.scrollTo(0,0); }
function anyOnboardingData(){ return state.onboarding.learningModes.length>0 || !!state.onboarding.pace || state.onboarding.access.length>0 || Object.values(state.onboarding.support).some(v=>v!==null) || Object.values(state.onboarding.tools).some(v=>v!==null); }

function loadState(){
  try {
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(saved){const merged=deepMerge(structuredClone(DEFAULT_STATE),saved);merged.profile.pronouns='';merged.profile.organization='';merged.profile.birthday='';merged.kickoffs.items=(merged.kickoffs.items||[]).map(normalizeKickoff);if(merged.route==='photos')merged.route='home';return merged;}
    const legacy=JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    const merged=legacy?deepMerge(structuredClone(DEFAULT_STATE),legacy):structuredClone(DEFAULT_STATE);merged.profile.pronouns='';merged.profile.organization='';merged.profile.birthday='';merged.kickoffs.items=(merged.kickoffs.items||[]).map(normalizeKickoff);if(merged.route==='photos')merged.route='home';return merged;
  } catch { return structuredClone(DEFAULT_STATE); }
}
function deepMerge(target,source){ for(const [k,v] of Object.entries(source||{})){ if(['__proto__','constructor','prototype'].includes(k))continue; if(v&&typeof v==='object'&&!Array.isArray(v)&&target[k]&&typeof target[k]==='object') deepMerge(target[k],v); else target[k]=v; } return target; }
function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch{toast('This browser could not save more answers. Download an editable backup before leaving.');return false;}}
function announce(msg){ liveRegion.textContent=msg; }
function escapeHTML(str=''){ return String(str).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function initials(name=''){ return name.trim().split(/\s+/).slice(0,2).map(x=>x[0]?.toUpperCase()).join('')||'YOU'; }
function skillLabel(id){ return POWER_SKILLS.find(s=>s.id===id)?.label||id; }
function supportMeta(value){ if(value===null||value===undefined)return {value:null,short:'Not answered',label:'Not answered yet',className:'pending'}; return SUPPORT_LEVELS.find(x=>x.value===Number(value))||SUPPORT_LEVELS[1]; }
function completedSteps(){ return steps.filter(s=>s.complete()).length; }
function completionPercent(){ return Math.round(completedSteps()/steps.length*100); }
function firstIncompleteStep(){ const i=steps.findIndex((s,i)=>i<=6&&!s.optional&&!s.complete()); return i===-1?0:i; }
function hasAnyProfileData(){ return !!(state.profile.name || state.profile.intro || state.profile.strengths.length || state.onboarding.learningModes.length || Object.values(state.onboarding.support).some(v=>v!==null)); }
function hasManualData(){ const p=state.profile; return !!(p.name || p.intro || p.fun || p.knowTooMuch || p.askMeAbout || p.strengths.length || p.growth.length || p.communicationStyle || p.workingStyle || p.teamMakesGreat.length || p.feedback.length || p.proud || p.idealBuild); }
function teamOutputsReady(){return moduleComplete('meet')&&moduleComplete('work');}
function onboardingOutputReady(){return moduleComplete('onboarding');}

function setRoute(route){
  if(route==='kickoffs'||route==='restore')state.ui.introSeen=true;
  state.route=route; state.wizard=false; saveState();
  document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===route));
  mobileNav.hidden=true; menuButton.setAttribute('aria-expanded','false'); render();
  window.scrollTo({top:0,behavior:'smooth'}); app.focus({preventScroll:true});
}
function render(){
  document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===state.route));
  if(!state.ui.introSeen)return renderWelcomeIntro();
  if(state.wizard)return renderWizard();
  if(state.route==='manual')return renderManual();
  if(state.route==='kickoffs')return renderKickoffs();
  if(state.route==='restore')return renderRestore();
  if(state.route==='onboarding')return renderOnboarding();
  if(state.route==='examples')return renderExamples();
  if(state.route==='people')return renderPeople();
  if(state.route==='resources')return renderResources();
  if(state.route==='outro')return renderOutro();
  if(state.route==='handoff')return renderHandoff();
  if(state.route==='checkpoint')return renderCheckpoint();
  renderHome();
}

brandButton.addEventListener('click',()=>setRoute('home'));
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));mobileNav.hidden=open;});
document.addEventListener('click',e=>{const routeBtn=e.target.closest('[data-route]');if(routeBtn)setRoute(routeBtn.dataset.route);if(e.target.closest('[data-restore]'))launchRestore();});
backupInput.addEventListener('change',importBackup);
tourButton.addEventListener('click',launchTour);


const WELCOME_FRAMES = [
  {
    kicker:'WELCOME ABOARD',
    title:'We’re glad you’re joining us.',
    body:'You bring experience, instincts, questions, and perspective that make the team better. We’re excited to see what you add to the work.',
    mark:'01'
  },
  {
    kicker:'THE TANG WAY',
    title:'The work can get gnarly.',
    body:'You do not need to know everything on day one. Bring curiosity, humility, and a willingness to make something before you have every answer.',
    mark:'02'
  },
  {
    kicker:'HUMAN-CENTERED ONBOARDING',
    title:'We will meet you where you are.',
    body:'Tell us what you already know, where you want a hand, and how you learn best. Your onboarding should adapt to you, not the other way around.',
    mark:'03'
  },
  {
    kicker:'MANUAL OF ME',
    title:'Bring your perspective. Make your mark.',
    body:'Build this in a few short bursts. At the end you will have a Manual of Me, a teammate intro card, and a practical onboarding brief to send back to us.',
    mark:'GO'
  }
];
let welcomeFrame = 0;

function renderWelcomeIntro(){
  const frame=WELCOME_FRAMES[welcomeFrame];
  app.innerHTML=`<section class="welcome-intro" aria-label="Welcome to TANG">
    <div class="welcome-stripes" aria-hidden="true"></div>
    <div class="welcome-orbit orbit-one" aria-hidden="true"></div><div class="welcome-orbit orbit-two" aria-hidden="true"></div>
    <div class="welcome-shell">
      <div class="welcome-top"><img src="assets/tang-logo-white.png" alt="TANG"><button class="welcome-skip" id="welcomeSkip">Skip intro</button></div>
      <div class="welcome-content" key="${welcomeFrame}">
        <span class="welcome-count">${frame.mark}</span>
        <p class="welcome-kicker">${frame.kicker}</p>
        <h1>${frame.title}</h1>
        <p>${frame.body}</p>
      </div>
      <div class="welcome-entry-options"><button data-route="kickoffs">Here for a project kickoff?</button><button data-restore>Restore a saved Manual</button></div>
      <div class="welcome-bottom">
        <div class="welcome-dots">${WELCOME_FRAMES.map((_,i)=>`<span class="${i===welcomeFrame?'active':''}"></span>`).join('')}</div>
        ${welcomeFrame<WELCOME_FRAMES.length-1
          ? `<button class="welcome-next" id="welcomeNext">Continue <span>→</span></button>`
          : `<div class="welcome-final-actions"><button class="btn light" id="welcomeExplore">Explore on my own</button><button class="btn orange" id="welcomeTour">Show me around · 60 sec</button></div>`}
      </div>
    </div>
  </section>`;
  document.querySelector('#welcomeSkip').addEventListener('click',finishWelcome);
  document.querySelector('#welcomeNext')?.addEventListener('click',()=>{welcomeFrame++;renderWelcomeIntro();});
  document.querySelector('#welcomeExplore')?.addEventListener('click',finishWelcome);
  document.querySelector('#welcomeTour')?.addEventListener('click',()=>{finishWelcome(false);setTimeout(()=>launchTour(),80);});
}
function finishWelcome(renderNow=true){ state.ui.introSeen=true; saveState(); if(renderNow)render(); }

const TOUR_STEPS = [
  { selector:'.hero-copy', eyebrow:'1 / 6 · START HERE', title:'Build your Manual in small bites', text:'This is not another onboarding form. The Manual uses short prompts and quick choices so you can make progress without doing everything at once.' },
  { selector:'.home-section', eyebrow:'2 / 6 · COME BACK ANYTIME', title:'Your progress saves as you go', text:'Work in chunks. The home screen shows what is done, what is in progress, and where you can pick back up later.' },
  { selector:'button[data-route="onboarding"]', eyebrow:'3 / 6 · PERSONALIZE THE RAMP', title:'Tell us where to lean in', text:'Your answers create an onboarding flight plan: what to skip, what deserves a refresher, and where a demo, pairing session, or firsthand experience would help.' },
  { selector:'button[data-route="people"]', eyebrow:'4 / 6 · FIND YOUR PEOPLE', title:'Know who to reach out to', text:'The People tab is your growing “who can help me with…?” map. It is organized around useful reasons to connect, not just job titles.' },
  { selector:'button[data-route="resources"]', eyebrow:'5 / 6 · PULL, DON’T PUSH', title:'Use resources when they become useful', text:'HCD, Navy context, tools, culture, RP1, and internal links live here. You do not need to absorb them all now.' },
  { selector:'.outputs-section', eyebrow:'6 / 6 · WRAP IT UP', title:'Finish by handing three things back', text:'Meet Me + How I Work unlock the Manual and teammate card together. Show Me Around unlocks the onboarding brief. The final screen tells you exactly what to send to TANG Onboarding by Slack or email.' },
];
let activeTourStep=0;
function launchTour(){
  state.ui.introSeen=true; state.route='home'; state.wizard=false; saveState(); render();
  requestAnimationFrame(()=>requestAnimationFrame(()=>showTourStep(0)));
}
function showTourStep(index){
  removeTour(); activeTourStep=Math.max(0,Math.min(index,TOUR_STEPS.length-1));
  const step=TOUR_STEPS[activeTourStep],target=document.querySelector(step.selector);
  if(!target){ if(activeTourStep<TOUR_STEPS.length-1)return showTourStep(activeTourStep+1); return; }
  target.scrollIntoView({behavior:'smooth',block:'center'});
  setTimeout(()=>{
    const r=target.getBoundingClientRect(),pad=10;
    const overlay=document.createElement('div'); overlay.className='tour-overlay'; overlay.id='tourOverlay';
    overlay.innerHTML=`<div class="tour-hole" style="left:${Math.max(8,r.left-pad)}px;top:${Math.max(8,r.top-pad)}px;width:${Math.min(innerWidth-16,r.width+pad*2)}px;height:${Math.min(innerHeight-16,r.height+pad*2)}px"></div>
      <div class="tour-card" role="dialog" aria-modal="true" aria-label="Tool tour">
        <button class="tour-close" id="tourClose" aria-label="Close tour">×</button>
        <span class="tour-eyebrow">${step.eyebrow}</span><h3>${step.title}</h3><p>${step.text}</p>
        <div class="tour-card-footer"><button class="btn text" id="tourBack" ${activeTourStep===0?'disabled':''}>← Back</button><span>${activeTourStep+1} / ${TOUR_STEPS.length}</span><button class="btn dark" id="tourNext">${activeTourStep===TOUR_STEPS.length-1?'Start my Manual →':'Next →'}</button></div>
      </div>`;
    document.body.appendChild(overlay);
    positionTourCard(overlay.querySelector('.tour-card'),r);
    overlay.querySelector('#tourClose').addEventListener('click',finishTour);
    overlay.querySelector('#tourBack').addEventListener('click',()=>showTourStep(activeTourStep-1));
    overlay.querySelector('#tourNext').addEventListener('click',()=>activeTourStep===TOUR_STEPS.length-1?finishTour(true):showTourStep(activeTourStep+1));
  },260);
}
function positionTourCard(card,r){
  const margin=18,w=Math.min(390,innerWidth-36); card.style.width=`${w}px`;
  const below=r.bottom+18,above=r.top-250; let top=below+250<innerHeight?below:Math.max(18,above);
  let left=Math.min(Math.max(18,r.left),innerWidth-w-18);
  card.style.left=`${left}px`;card.style.top=`${top}px`;
}
function removeTour(){document.querySelector('#tourOverlay')?.remove();}
function finishTour(startManual=false){removeTour();state.ui.tourSeen=true;saveState();if(startManual){state.wizard=true;state.step=firstIncompleteStep();render();window.scrollTo(0,0);}}

function renderHome(){
  const pct=completionPercent(); const hasStarted=hasAnyProfileData();
  app.innerHTML=`
  <div class="home-stage">
    <div class="shell home-shell">
      <section class="hero hero-v2">
        <div class="hero-copy">
          <span class="hero-kicker">Human-Centered Onboarding</span>
          <p class="welcome-line">WELCOME ABOARD · GLAD YOU’RE WITH US</p>
          <h1>Build your <span class="scribble">Manual of Me.</span></h1>
          <p class="lede">Help teammates get to know you and how you work. Finish your Manual, save it, and stop there. The Slack introduction and onboarding flight plan are available whenever you need them.</p>
          <div class="hero-actions">
            <button class="btn primary" id="startWizard">${teamOutputsReady()?'Open my Manual':hasStarted?'Continue my Manual':'Start my Manual'}</button>
            <button class="btn light" data-route="examples">See example outputs</button><button class="btn text" id="importProfileHome">Import saved profile</button>
          </div>
          <div class="notice"><strong>Privacy by design:</strong> we only ask for information that helps create your onboarding outputs. Skip optional personal details you do not want to share. Your answers stay in this browser until you choose to export or share them. Do not enter CUI, classified, export-controlled, or sensitive mission information.</div>
        </div>
        <div class="hero-board book-board" aria-label="Example of Jackson's Manual of Me">
          <div class="board-label">EXAMPLE · JACKSON’S MANUAL</div>
          <div class="fake-profile">
            <div class="fake-top"><div class="fake-avatar"><img src="assets/jackson-murray.jpg" alt=""></div><div class="fake-title"><strong>Jackson Murray</strong><span>Curious · collaborative · systems-minded</span></div></div>
            <div class="fake-card"><h4>WHAT I BRING</h4><div class="fake-chips"><span class="fake-chip">Empathy</span><span class="fake-chip">Creativity</span><span class="fake-chip">Collaboration</span></div></div>
            <div class="fake-card"><h4>ONBOARDING ME</h4><p>Hands-on. Let me experience things firsthand, pair with someone once, then give me a quick reference. Go deeper on Navy context and TANG history; skip the basic Miro tour.</p></div>
            <div class="fake-sticky">Ask good questions. Make something. Learn from it.</div>
          </div>
        </div>
      </section>

      <section class="principle-ribbon" aria-label="TANG principles">
        <span>Respect complexity</span><span>Seek the right question</span><span>Inspiration can come from anywhere</span><span>Problems this hard can’t be solved alone</span><span>Discipline delivers impact</span><span>Learn · iterate · evolve</span>
      </section>

      <section class="home-section">
        <div class="section-head"><div><span class="eyebrow">Your home base</span><h2>Do it in chunks.</h2><p class="muted">The Manual becomes useful before it becomes complete. Come back when you have bandwidth.</p></div></div>
        <div class="progress-wrap"><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><span class="progress-label">${pct}% complete</span></div>
        <div class="grid cols-4">
          ${moduleCard('ME','Meet Me','A short story, photo, and the details that make introductions easier.',stepStatus([0,1,2]),'#1282CA')}
          ${moduleCard('WORK','How I Work','Power Skills, communication, feedback, and what helps when things get gnarly.',stepStatus([3,4,5,6]),'#F15A22')}
          ${moduleCard('GO','Show Me Around','Tell us what you know, what you want help with, and how you learn best.',stepStatus([7,8,9]),'#fed727')}
          ${moduleCard('RP1','The Important Stuff','A few optional notes that help the team welcome and celebrate you well.',stepStatus([10]),'#e5018c')}
        </div>
      </section>

      <section class="home-section kickoff-home-card">
        <div><span class="eyebrow">Starting something together?</span><h2>New project. Same humans.<br>A fresh way to work together.</h2><p>A short, project-specific Manual in about 4 minutes. Bring the useful stuff, add a little personality, and get back to the kickoff.</p></div><button class="btn dark" data-route="kickoffs">Try Project Kickoffs →</button>
      </section>

      <section class="home-section outputs-section">
        <div class="section-head"><div><span class="eyebrow">What you get</span><h2>Three things worth sharing.</h2><p class="muted">Your answers turn into a teammate profile, a quick introduction, and a practical onboarding brief.</p></div></div>
        <div class="grid cols-3 output-previews">
          ${manualPreview()}
          ${introPreview()}
          ${flightPreview()}
        </div>
      </section>

      <section class="home-section tang-way">
        <div class="section-head"><div><span class="eyebrow">The TANG Way</span><h2>Human-centered. Mission-focused.</h2><p class="muted">Good onboarding should feel like the culture it is inviting you into.</p></div></div>
        <div class="grid cols-3">
          <div class="card way-card"><span class="way-number">01</span><h3>Who we are</h3><p>Subject Matter Explorers. Curious people who connect dots, stretch across domains, and choose team wins over hero moves.</p></div>
          <div class="card way-card"><span class="way-number">02</span><h3>How we roll</h3><p>Humble hustle, sleeves rolled up. Prototype early, learn by doing, and stay ready to pivot when the problem changes.</p></div>
          <div class="card way-card"><span class="way-number">03</span><h3>The change we make</h3><p>Build with people, not just for them. Turn hard problems into tangible progress that lasts beyond the workshop.</p></div>
        </div>
      </section>
    </div>
  </div>`;
  document.querySelector('#startWizard').addEventListener('click',()=>{if(teamOutputsReady())return setRoute('manual');startModule(moduleComplete('meet')?'work':'meet');});
  document.querySelector('#importProfileHome').addEventListener('click',()=>backupInput.click());
  document.querySelectorAll('.module-card').forEach((el,i)=>el.addEventListener('click',()=>startModule(MODULES[i].id)));
}
function moduleCard(mark,title,desc,status,accent){ return `<button class="card module-card" style="--accent:${accent};text-align:left" type="button"><span class="graphic-mark">${mark}</span><h3>${title}</h3><p class="muted">${desc}</p><div class="module-meta"><span>~${title==='Meet Me'?'3':title==='How I Work'?'5':title==='Show Me Around'?'4':'2'} min</span><span class="module-state badge ${status==='Done'?'public':''}">${status}</span></div></button>`; }
function stepStatus(indices){ const required=indices.filter(i=>!steps[i].optional); const check=required.length?required:indices; return check.every(i=>steps[i].complete())?'Done':indices.some(i=>steps[i].complete())?'In progress':'Start'; }
function manualPreview(){ return `<button class="card output-card" data-route="examples"><div class="mini-manual"><div class="mini-head"><span>JM</span><b>MANUAL OF ME</b></div><div class="mini-line wide"></div><div class="mini-chip-row"><i></i><i></i><i></i></div><div class="mini-grid"><i></i><i></i><i></i><i></i></div></div><h3>Manual of Me</h3><p class="muted">The scan-before-a-kickoff version of how you work, what you bring, and what teammates should know.</p><span class="text-link">Preview manual →</span></button>`; }
function introPreview(){ return `<button class="card output-card" data-route="examples"><div class="mini-intro"><span class="mini-photo">JM</span><b>MEET YOUR NEW<br>TEAMMATE</b><i>BRINGS</i><strong>Curiosity · Empathy</strong><i>ASK ME ABOUT</i><strong>Design + Pokémon</strong></div><h3>Slack intro card</h3><p class="muted">A compact photo card and intro message you can send without writing another bio from scratch.</p><span class="text-link">See the card →</span></button>`; }
function flightPreview(){ return `<button class="card output-card" data-route="examples"><div class="mini-flight"><b>YOUR FLIGHT PLAN</b><div><span class="dot deep"></span><p><strong>Navy context</strong><small>Go deeper</small></p></div><div><span class="dot guided"></span><p><strong>TANG history</strong><small>Show me</small></p></div><div><span class="dot skip"></span><p><strong>Miro</strong><small>Skip basics</small></p></div></div><h3>Onboarding brief</h3><p class="muted">The useful handoff for the onboarding team: what to teach, what to skip, how you learn, and what access you have.</p><span class="text-link">See my plan →</span></button>`; }

function renderWizard(){
  const step=steps[state.step]; const pct=completionPercent();
  app.innerHTML=`<div class="wizard-shell">
    <div class="wizard-top"><div class="logo-mini"><img src="assets/tang-t-source.png" alt=""><span>MANUAL OF ME</span></div><button class="btn text" id="saveExit">Save & exit</button></div>
    <div class="wizard-progress-meta"><span>Question ${state.step+1} of ${steps.length}</span><span>${completedSteps()} answered</span></div>
    <div class="progress-wrap"><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><span class="progress-label">${pct}%</span></div>
    <section class="question-card">
      <div class="q-overline">${chapterForStep(state.step)}</div><h2>${step.title}</h2><p class="q-help">${step.help}</p>
      <div class="question-body" id="questionBody"></div>
      <div class="wizard-actions">
        <button class="btn text" id="backBtn">${state.step===0?'← Home':'← Back'}</button>
        <div class="right"><button class="btn ghost" id="skipBtn">Skip for now</button><button class="btn primary" id="nextBtn">${state.step===steps.length-1?'Finish':'Next →'}</button></div>
      </div>
    </section>
  </div>`;
  step.render(document.querySelector('#questionBody'));
  markManualRequirements(document.querySelector('#questionBody'),step.key);
  document.querySelector('#saveExit').addEventListener('click',()=>{state.wizard=false;state.route='home';saveState();render();toast('Progress saved on this device.');});
  document.querySelector('#backBtn').addEventListener('click',()=>{if(state.step===0){state.wizard=false;state.route='home';saveState();render();window.scrollTo(0,0);}else{state.step--;saveState();render();}});
  document.querySelector('#skipBtn').addEventListener('click',()=>advanceWizard(true));
  document.querySelector('#nextBtn').addEventListener('click',()=>advanceWizard(false));
  app.focus({preventScroll:true});
}
function chapterForStep(i){ if(i<=2)return 'Meet Me'; if(i<=6)return 'How I Work'; if(i<=9)return 'Show Me Around'; return 'The Important Stuff'; }
function advanceWizard(skipped){
  if(!skipped && !steps[state.step].optional && !steps[state.step].complete()){
    const messages={identity:'Add your full name.',story:'Add your short introduction.',strengths:'Choose at least one Power Skill.',work:'Add a communication style, working style, and feedback preference.',help:'Choose a way teammates can help you get unstuck.',support:'Choose a support level for each topic.',tools:'Choose a support level for each tool.',learn:'Choose how you like to learn and a pace.'};
    const msg=messages[steps[state.step].key]||'Complete the required fields, or save and skip for now.';
    document.querySelector('.wizard-validation')?.remove();
    const error=document.createElement('p');error.className='wizard-validation';error.setAttribute('role','alert');error.textContent=msg;
    document.querySelector('.wizard-actions').before(error);
    document.querySelector('#questionBody [required]:invalid')?.focus();
    return;
  }

  saveState();

  const currentModule = moduleForStep(state.step);
  const reachedModuleEnd = currentModule && state.step === currentModule.end;

  // Never accidentally spill from one module into another.
  if(reachedModuleEnd){
    // If the current module still has unanswered items, save progress and
    // return home instead of advancing into another module. This prevents
    // completed modules from being re-entered through the wizard flow.
    if(!moduleComplete(currentModule.id) && currentModule.id!=='hospitality'){
      state.wizard = false;
      state.route = 'home';
      state.ui.checkpoint = '';
      saveState();
      render();
      window.scrollTo(0,0);
      toast(`${currentModule.title} is saved as in progress. You can finish the remaining item when you're ready.`);
      return;
    }

    // Meet Me intentionally flows directly into How I Work.
    if(currentModule.id === 'meet'){
      startModule('work');
      return;
    }

    // Completed modules get their proper checkpoint screen.
    if(currentModule.id !== 'hospitality'){
      state.wizard = false;
      state.route = 'checkpoint';
      state.ui.checkpoint = currentModule.id;
      saveState();
      render();
      window.scrollTo(0,0);
      return;
    }

    // Final module is complete.
    state.wizard = false;
    state.route = 'outro';
    state.ui.outroSeen = true;
    state.ui.checkpoint = '';
    saveState();
    render();
    window.scrollTo(0,0);
    return;
  }

  // Normal movement within a module.
  if(state.step < steps.length - 1){
    state.step++;
    saveState();
    render();
    window.scrollTo(0,0);
    return;
  }

  state.wizard = false;
  state.route = 'outro';
  state.ui.outroSeen = true;
  state.ui.checkpoint = '';
  saveState();
  render();
  window.scrollTo(0,0);
}

function preferredName(p=state.profile){return p.preferredName.trim()||p.name;}
function experienceText(p=state.profile){return [p.militaryExperience==='Prior / current service'?['Military experience',...p.militaryBranches].join(': '):'',p.domains.length?`Domains: ${p.domains.join(' · ')}`:''].filter(Boolean).join('\n');}
function reachText(p=state.profile){return [...p.reachMethods,p.reachOther].filter(Boolean).join(' · ');}
function skillChoice(s,selected,key){return `<button type="button" class="skill-option ${selected?'selected':''}" data-${key}="${s.id}" aria-pressed="${selected}"><strong>${s.label}${s.core?' ★':''}</strong><span>${s.desc}</span></button>`;}
function renderIdentity(root){
  const p=state.profile;
  root.innerHTML=`
    <div class="split"><div class="field"><label for="name">Full name teammates know</label><input id="name" type="text" autocomplete="name" maxlength="80" value="${escapeHTML(p.name)}" placeholder="e.g., Alexis Johnson"><small>Use your first and last name, rather than an email address.</small></div>
    <div class="field"><label for="preferredName">What do you go by?</label><input id="preferredName" type="text" maxlength="50" value="${escapeHTML(p.preferredName)}" placeholder="e.g., Lexi"><small>A nickname or preferred name helps teammates connect the dots. Your full name stays on your Manual.</small></div></div>
    <div class="field"><span class="label">What point in your career are you joining TANG?</span><div class="choice-grid three compact-choices">${CAREER_STAGES.map(x=>`<button type="button" class="choice ${p.careerStage===x?'selected':''}" data-career="${x}" aria-pressed="${p.careerStage===x}"><strong>${x}</strong></button>`).join('')}</div></div>
    <div class="field"><span class="label">How are you connected to TANG?</span><div class="choice-grid two compact-choices">${CONNECTION_TYPES.map(x=>`<button type="button" class="choice ${p.connectionType===x?'selected':''}" data-connection="${x}" aria-pressed="${p.connectionType===x}"><strong>${x}</strong></button>`).join('')}</div></div>
    <details class="optional-details"><summary>Experience tags <span class="field-tag">Optional</span></summary><p class="muted small">Share only the background that would help teammates learn from you. Leave this blank if you prefer.</p>
    <div class="field"><span class="label">Military experience</span><div class="chips">${['No military service','Prior / current service','Prefer not to say'].map(x=>`<button type="button" class="chip ${p.militaryExperience===x?'selected':''}" data-military="${x}" aria-pressed="${p.militaryExperience===x}">${x}</button>`).join('')}</div></div>
    ${p.militaryExperience==='Prior / current service'?`<div class="field"><span class="label">Branch or branches</span><div class="chips">${MILITARY_BRANCHES.map(x=>chipText(x,p.militaryBranches,'branch')).join('')}</div></div>`:''}
    <div class="field"><span class="label">Domains I have worked in</span><div class="chips">${EXPERIENCE_DOMAINS.map(x=>chipText(x,p.domains,'domain')).join('')}</div></div></details>
    <div class="photo-upload"><div class="photo-preview" id="photoPreview">${p.photo?`<img src="${p.photo}" style="object-position:${p.photoPosition.x}% ${p.photoPosition.y}%" alt="Your uploaded profile">`:'<span class="photo-mark">PHOTO</span>'}</div><div><strong>Add a professional photo <span class="field-tag">Optional</span></strong><p class="muted small">Stored in this browser until you export or share an output.</p><input id="photo" type="file" accept="image/*"></div></div>`;
  bindValue('#name',v=>p.name=v);bindValue('#preferredName',v=>p.preferredName=v);
  const rerender=()=>{renderWizard();document.querySelector('.optional-details')?.setAttribute('open','');};
  root.querySelectorAll('[data-career]').forEach(b=>b.addEventListener('click',()=>{p.careerStage=b.dataset.career;saveState();renderWizard();}));
  root.querySelectorAll('[data-connection]').forEach(b=>b.addEventListener('click',()=>{p.connectionType=b.dataset.connection;saveState();renderWizard();}));
  root.querySelectorAll('[data-military]').forEach(b=>b.addEventListener('click',()=>{p.militaryExperience=p.militaryExperience===b.dataset.military?'':b.dataset.military;if(p.militaryExperience!=='Prior / current service')p.militaryBranches=[];saveState();rerender();}));
  root.querySelectorAll('[data-branch]').forEach(b=>b.addEventListener('click',()=>toggle(p.militaryBranches,b.dataset.branch,rerender)));
  root.querySelectorAll('[data-domain]').forEach(b=>b.addEventListener('click',()=>toggle(p.domains,b.dataset.domain,rerender)));
  document.querySelector('#photo').addEventListener('change',handlePhoto);
  if(p.photo){root.insertAdjacentHTML('beforeend',photoPositionHTML(p.photoPosition,'profilePhoto')+'<button class="btn text" type="button" id="profilePhotoRemove">Remove photo</button>');bindPhotoEditor(root,p,'profilePhoto',()=>{saveState();renderWizard();});}
}
function markManualRequirements(root,key){
  const requiredInputs={identity:['name'],story:['intro'],work:['comms','workstyle']};
  root.querySelectorAll('.field > label,.field > .label').forEach(label=>{
    label.querySelectorAll('.muted').forEach(span=>{if(span.textContent.trim().toLowerCase()==='optional')span.remove();});
    const required=(requiredInputs[key]||[]).includes(label.htmlFor)||(key==='work'&&label.textContent.startsWith('Feedback lands'))||(key==='help'&&label.textContent.startsWith('When I’m stuck'))||key==='learn';
    label.insertAdjacentHTML('beforeend',` <span class="field-tag ${required?'required':''}">${required?'Required':'Optional'}</span>`);
    if(label.htmlFor&&required)root.querySelector('#'+label.htmlFor)?.setAttribute('required','');
  });
  root.querySelectorAll('input.other-input').forEach(input=>{if(!input.labels.length)input.setAttribute('aria-label',input.placeholder);});
  root.querySelectorAll('textarea').forEach(addCharacterCount);
}
function addCharacterCount(el){
  if(!el.maxLength||el.maxLength<0)return;
  const counter=document.createElement('small');counter.className='character-count';counter.id=el.id+'-count';el.after(counter);
  el.setAttribute('aria-describedby',[el.getAttribute('aria-describedby'),counter.id].filter(Boolean).join(' '));
  const update=()=>{counter.textContent=`${el.value.length} / ${el.maxLength} characters`;};update();el.addEventListener('input',update);
}
function handlePhoto(e){const file=e.target.files?.[0];if(!file)return;const r=new FileReader();r.onload=()=>resizeImage(r.result,720,720,.82).then(data=>{state.profile.photo=data;state.profile.photoPosition={x:50,y:50};saveState();renderWizard();});r.readAsDataURL(file);}
function resizeImage(src,maxW,maxH,quality=.82){return new Promise(resolve=>{const img=new Image();img.onload=()=>{const scale=Math.min(1,maxW/img.width,maxH/img.height);const c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',quality));};img.src=src;});}

function renderStory(root){
  root.innerHTML=`<div class="prompt-layout"><div><div class="field"><label for="intro">The 30-second version</label><textarea id="intro" maxlength="360" placeholder="A couple sentences that sound like you, not a résumé.">${escapeHTML(state.profile.intro)}</textarea><small>Aim for 2–4 sentences. Focus on the work, perspective, or interests you actually want teammates to know; avoid personal details that are not useful for onboarding.</small></div></div>
  <aside class="prompt-coach"><span class="coach-label">IF YOU’RE STUCK, TRY ONE</span><p>What kind of work do you do?</p><p>What brought you to this team?</p><p>What kinds of problems energize you?</p><p>What should teammates know that your title will never tell them?</p></aside></div>`;
  bindValue('#intro',v=>state.profile.intro=v);
}
function renderHuman(root){
  root.innerHTML=`<div class="split"><div class="field"><label for="fun">Outside of work, I’m usually…</label><textarea id="fun" maxlength="180" placeholder="Hobbies, people, pets, sports, side quests…">${escapeHTML(state.profile.fun)}</textarea></div><div class="field"><label for="know">I know way too much about…</label><textarea id="know" maxlength="180" placeholder="The perfect low-stakes conversation starter">${escapeHTML(state.profile.knowTooMuch)}</textarea></div></div><div class="field"><label for="ask">Ask me about…</label><input id="ask" maxlength="100" type="text" value="${escapeHTML(state.profile.askMeAbout)}" placeholder="A topic you would happily talk about"></div>`;
  bindValue('#fun',v=>state.profile.fun=v);bindValue('#know',v=>state.profile.knowTooMuch=v);bindValue('#ask',v=>state.profile.askMeAbout=v);
}
function renderStrengths(root){
  root.innerHTML=`<p class="small"><strong>Choose 1–4 skills</strong> <span class="field-tag required">Required</span></p><div class="skill-grid">${POWER_SKILLS.map(s=>skillChoice(s,state.profile.strengths.includes(s.id),'skill')).join('')}</div>
  <div class="inline-callout">★ The first five are core day-to-day TANG Power Skills. You do <strong>not</strong> need to select all of them here; choose what feels most naturally yours right now.</div>
  <div class="card flat side-quest"><div class="card-title-row"><div><strong>Optional side quest: Creativity Archetype</strong><p class="small muted">Take the playful TANG reflection, then paste your result here if you want it to travel with your Manual.</p></div><a class="btn light" href="https://jgmurr09.github.io/creativity-archetype/" target="_blank" rel="noreferrer">Take the quiz ↗</a></div><div class="field" style="margin:15px 0 0"><label for="archetype">My result <span class="muted">optional</span></label><input id="archetype" maxlength="120" type="text" value="${escapeHTML(state.profile.archetype)}" placeholder="e.g., The Human Radar with Possibility Machine energy"></div></div>`;
  root.querySelectorAll('[data-skill]').forEach(b=>b.addEventListener('click',()=>toggleLimited(state.profile.strengths,b.dataset.skill,4,()=>renderWizard())));bindValue('#archetype',v=>state.profile.archetype=v);
}
function renderWorkStyle(root){
  const teamOptions=['Trust','Clarity','Candor','Curiosity','Momentum','Psychological safety','Shared ownership','Humor'];
  const feedbackOpts=['Direct + specific','Conversational','Written first','1:1','In the moment','Give me time to process'];
  root.innerHTML=`<div class="split"><div class="field"><label for="comms">In one word, my communication style is…</label><input id="comms" maxlength="50" value="${escapeHTML(state.profile.communicationStyle)}" placeholder="Direct? Thoughtful? Energetic?"></div><div class="field"><label for="workstyle">In one word, my working style is…</label><input id="workstyle" maxlength="50" value="${escapeHTML(state.profile.workingStyle)}" placeholder="Iterative? Structured? Collaborative?"></div></div>
  <div class="split"><div class="field"><label for="location">Where do you usually work?</label><input id="location" type="text" maxlength="120" value="${escapeHTML(state.profile.location)}" placeholder="e.g., Laurel / RP1, remote, or hybrid"><small>A general work location is enough.</small></div><div class="field"><label for="workingHours">My usual working hours</label><input id="workingHours" type="text" maxlength="120" value="${escapeHTML(state.profile.workingHours)}" placeholder="e.g., 7:30 a.m.–4 p.m. Eastern, with flex"><small>Include your time zone. This is a guide, not a promise of constant availability.</small></div></div>
  <div class="field"><span class="label">How to reach me</span><div class="chips">${REACH_METHODS.map(x=>chipText(x,state.profile.reachMethods,'reach')).join('')}</div><input class="other-input" type="text" id="reachOther" maxlength="150" value="${escapeHTML(state.profile.reachOther)}" placeholder="Other method, handle, or useful context (optional)"></div>
  <div class="field"><span class="label">In a discussion, I usually…</span><div class="choice-grid three">${DISCUSSION_STYLES.map(x=>`<button type="button" class="choice ${state.profile.discussionStyle===x?'selected':''}" data-discussion="${x}" aria-pressed="${state.profile.discussionStyle===x}"><strong>${x}</strong></button>`).join('')}</div><small>Thinking quietly does not mean someone has nothing to contribute.</small></div>
  <div class="field"><span class="label">An effective team has… <span class="muted">pick up to 3</span></span><div class="chips">${teamOptions.map(x=>chipText(x,state.profile.teamMakesGreat,'team')).join('')}</div><input class="other-input" id="teamOther" maxlength="80" value="${escapeHTML(state.profile.teamOther)}" placeholder="Or add your own…"></div>
  <div class="field"><span class="label">Feedback lands best when it’s… <span class="muted">pick up to 3</span></span><div class="choice-grid three">${feedbackOpts.map(x=>choiceToggle(x,state.profile.feedback,'feedback')).join('')}</div><input class="other-input" id="feedbackOther" maxlength="80" value="${escapeHTML(state.profile.feedbackOther)}" placeholder="Or describe it in your own words…"></div>`;
  bindValue('#comms',v=>state.profile.communicationStyle=v);bindValue('#workstyle',v=>state.profile.workingStyle=v);bindValue('#teamOther',v=>state.profile.teamOther=v);bindValue('#feedbackOther',v=>state.profile.feedbackOther=v);
  bindValue('#location',v=>state.profile.location=v);bindValue('#workingHours',v=>state.profile.workingHours=v);bindValue('#reachOther',v=>state.profile.reachOther=v);
  root.querySelectorAll('[data-reach]').forEach(b=>b.addEventListener('click',()=>toggle(state.profile.reachMethods,b.dataset.reach,()=>renderWizard())));
  root.querySelectorAll('[data-discussion]').forEach(b=>b.addEventListener('click',()=>{state.profile.discussionStyle=state.profile.discussionStyle===b.dataset.discussion?'':b.dataset.discussion;saveState();renderWizard();}));
  root.querySelectorAll('[data-team]').forEach(b=>b.addEventListener('click',()=>toggleLimited(state.profile.teamMakesGreat,b.dataset.team,3,()=>renderWizard())));
  root.querySelectorAll('[data-feedback]').forEach(b=>b.addEventListener('click',()=>toggleLimited(state.profile.feedback,b.dataset.feedback,3,()=>renderWizard())));
}
function renderHelp(root){
  const help=['Talk it through with me','Give me context','Help me prioritize','Show me an example','Pair with me','Give me space to work it out'];
  root.innerHTML=`<div class="spectrum-list">${SPECTRA.map(s=>spectrumRow(s)).join('')}</div>
  <div class="field"><label for="bestOther">At my best, you’ll also notice… <span class="muted">optional</span></label><input id="bestOther" maxlength="120" value="${escapeHTML(state.profile.bestWhenOther)}" placeholder="Anything the spectra miss"></div>
  <div class="field"><span class="label">When I’m stuck, the best thing you can do is… <span class="muted">pick up to 3</span></span><div class="choice-grid three">${help.map(x=>choiceToggle(x,state.profile.helpForm,'help')).join('')}</div><input class="other-input" id="helpOther" maxlength="100" value="${escapeHTML(state.profile.helpOther)}" placeholder="Or add your own…"></div>
  <div class="split"><div class="field"><label for="organize">I usually organize my work through…</label><input id="organize" maxlength="100" value="${escapeHTML(state.profile.organize)}" placeholder="Lists, calendar, Miro, notes, controlled chaos…"></div><div class="field"><label for="stress">When I’m under stress, you might notice… <span class="muted">optional</span></label><input id="stress" maxlength="120" value="${escapeHTML(state.profile.stress)}" placeholder="A useful signal for teammates"></div></div>`;
  root.querySelectorAll('[data-spectrum]').forEach(b=>b.addEventListener('click',()=>{state.profile.bestSpectrum[b.dataset.spectrum]=Number(b.dataset.value);saveState();renderWizard();}));
  root.querySelectorAll('[data-help]').forEach(b=>b.addEventListener('click',()=>toggleLimited(state.profile.helpForm,b.dataset.help,3,()=>renderWizard())));
  bindValue('#bestOther',v=>state.profile.bestWhenOther=v);bindValue('#helpOther',v=>state.profile.helpOther=v);bindValue('#organize',v=>state.profile.organize=v);bindValue('#stress',v=>state.profile.stress=v);
}
function spectrumRow(s){const current=state.profile.bestSpectrum[s.id];return `<div class="spectrum-row"><div class="spectrum-labels"><span>${s.left}</span><span>${s.right}</span></div><div class="spectrum-points" role="group" aria-label="${s.left} to ${s.right}">${[0,1,2,3,4].map(v=>`<button type="button" data-spectrum="${s.id}" data-value="${v}" class="${current===v?'selected':''}" aria-label="${s.left} to ${s.right}: position ${v+1} of 5"><span></span></button>`).join('')}</div><div class="spectrum-mid">${current===2?'A bit of both':''}</div></div>`;}
function renderGrowth(root){
  root.innerHTML=`<div class="field"><label for="idealBuild">If you could shape an ideal project or experience here, what would it look like?</label><textarea id="idealBuild" maxlength="420" placeholder="A type of project, mission, problem, role, technology, team experience, field opportunity, or challenge you would be excited to take on.">${escapeHTML(state.profile.idealBuild)}</textarea><small>This is not a promise or staffing request. It gives teammates a clearer signal about the kinds of opportunities that would help you thrive.</small></div>
  <div class="field"><span class="label">I also want more chances to practice… <span class="muted">pick up to 4</span></span><div class="skill-grid">${POWER_SKILLS.map(s=>skillChoice(s,state.profile.growth.includes(s.id),'growth')).join('')}</div></div>
  <div class="field"><label for="proud">What have you done before that you would love to build on?</label><textarea id="proud" maxlength="280" placeholder="A project, moment, role, or tiny win that says something about the work you want more of.">${escapeHTML(state.profile.proud)}</textarea><small>A story is more useful here than a résumé bullet.</small></div>`;
  root.querySelectorAll('[data-growth]').forEach(b=>b.addEventListener('click',()=>toggleLimited(state.profile.growth,b.dataset.growth,4,()=>renderWizard())));bindValue('#idealBuild',v=>state.profile.idealBuild=v);bindValue('#proud',v=>state.profile.proud=v);
}
function renderSupportMatrix(root){
  const nameQuick=!state.profile.name.trim()?`<div class="field quick-name"><label for="onboardingQuickName">Whose onboarding brief is this?</label><input id="onboardingQuickName" maxlength="80" value="${escapeHTML(state.profile.name)}" placeholder="Your name"><small>You can build the onboarding section first. This name simply labels the export.</small></div>`:'';
  root.innerHTML=`${nameQuick}<div class="inline-callout"><strong>This travels to the onboarding team.</strong> We’ll use it to decide where to guide, refresh, connect you with someone, or simply let you get moving.</div>${matrixHTML(SUPPORT_TOPICS,state.onboarding.support,'support')}`;
  if(document.querySelector('#onboardingQuickName'))bindValue('#onboardingQuickName',v=>state.profile.name=v);
  bindMatrix(root,'support',state.onboarding.support);
}
function renderToolMatrix(root){root.innerHTML=`<div class="field"><span class="label">What can you access right now? <span class="muted">pick all that apply</span></span><div class="chips">${ACCESS_OPTIONS.map(x=>chipText(x,state.onboarding.access,'access')).join('')}</div></div><div class="inline-callout">Choose one support level per tool for the onboarding brief. Your access selections above are optional.</div>${matrixHTML(TOOL_TOPICS,state.onboarding.tools,'tools')}`;bindMatrix(root,'tools',state.onboarding.tools);root.querySelectorAll('[data-access]').forEach(b=>b.addEventListener('click',()=>toggle(state.onboarding.access,b.dataset.access,()=>renderWizard())));}
function matrixHTML(topics,obj,key){return `<div class="matrix"><div class="matrix-row header"><div class="topic">Topic</div>${SUPPORT_LEVELS.map(l=>`<div>${l.short}</div>`).join('')}</div>${topics.map(t=>`<div class="matrix-row"><div class="topic"><div>${t.label}${t.desc?`<details class="topic-help"><summary title="${escapeHTML(t.desc)}">What does this mean?</summary><p>${escapeHTML(t.desc)}</p></details>`:''}</div></div>${SUPPORT_LEVELS.map(l=>`<div><button type="button" data-matrix="${key}" data-topic="${t.id}" data-value="${l.value}" class="${Number(obj[t.id])===l.value&&obj[t.id]!==null?'selected':''}" aria-pressed="${Number(obj[t.id])===l.value&&obj[t.id]!==null}">${Number(obj[t.id])===l.value&&obj[t.id]!==null?'✓':''}<span class="sr-only">${l.label} for ${t.label}</span></button></div>`).join('')}</div>`).join('')}</div>`;}
function bindMatrix(root,key,obj){root.querySelectorAll(`[data-matrix="${key}"]`).forEach(b=>b.addEventListener('click',()=>{obj[b.dataset.topic]=Number(b.dataset.value);saveState();renderWizard();}));}
function renderLearning(root){
  root.innerHTML=`<p class="small"><strong>How I like to learn</strong> <span class="field-tag required">Required · choose at least one</span></p><div class="choice-grid">${LEARNING_MODES.map(m=>`<button type="button" class="choice learning-choice ${state.onboarding.learningModes.includes(m.id)?'selected':''}" data-learn="${m.id}"><span class="learn-mark">${m.mark}</span><strong>${m.title}</strong><small>${m.text}</small></button>`).join('')}</div>
  <div class="field" style="margin-top:22px"><span class="label">What pace sounds best?</span><div class="choice-grid three">${['Give me the essentials now','One useful thing at a time','Let me browse when I need it'].map(x=>`<button type="button" class="choice ${state.onboarding.pace===x?'selected':''}" data-pace="${x}"><strong>${x}</strong></button>`).join('')}</div></div>`;
  root.querySelectorAll('[data-learn]').forEach(b=>b.addEventListener('click',()=>toggle(state.onboarding.learningModes,b.dataset.learn,()=>renderWizard())));root.querySelectorAll('[data-pace]').forEach(b=>b.addEventListener('click',()=>{state.onboarding.pace=b.dataset.pace;saveState();renderWizard();}));
}
function renderHospitality(root){
  const celebrate=['A quick team shoutout','Food / treats','Coffee / drink','Team outing','Keep it small + low-key','I’d rather not make it a thing'];
  root.innerHTML=`<div class="inline-callout"><strong>Keep this lightweight.</strong> No birthdays, addresses, or other identifying details needed. These optional preferences are only here to help teammates make everyday welcomes feel more thoughtful.</div>
  <div class="split"><div class="field"><label for="snack">If the team is grabbing snacks, a favorite is… <span class="muted">optional</span></label><input id="snack" maxlength="80" value="${escapeHTML(state.profile.snack)}" placeholder="Only if you want to share"></div><div class="field"><label for="drink">Go-to non-alcoholic drink <span class="muted">optional</span></label><input id="drink" maxlength="80" value="${escapeHTML(state.profile.drink)}" placeholder="Coffee, tea, seltzer…"></div></div>
  <div class="field"><span class="label">If the team wants to recognize a win, I’d prefer… <span class="muted">optional</span></span><div class="choice-grid three">${celebrate.map(x=>`<button type="button" class="choice ${state.profile.celebration===x?'selected':''}" data-celebrate="${x}"><strong>${x}</strong></button>`).join('')}</div></div>`;
  bindValue('#snack',v=>state.profile.snack=v);bindValue('#drink',v=>state.profile.drink=v);root.querySelectorAll('[data-celebrate]').forEach(b=>b.addEventListener('click',()=>{state.profile.celebration=b.dataset.celebrate;saveState();renderWizard();}));
}
function bindValue(selector,setter,event='input'){const el=document.querySelector(selector);if(!el)return;el.addEventListener(event,e=>{setter(e.target.value);saveState();});}
function toggle(arr,val,cb){const i=arr.indexOf(val);if(i>=0)arr.splice(i,1);else arr.push(val);saveState();cb?.();}
function toggleLimited(arr,val,max,cb){const i=arr.indexOf(val);if(i>=0)arr.splice(i,1);else if(arr.length<max)arr.push(val);else return toast(`Pick up to ${max}. You can change these anytime.`);saveState();cb?.();}
function chipText(x,arr,key){return `<button type="button" class="chip ${arr.includes(x)?'selected':''}" data-${key}="${x}" aria-pressed="${arr.includes(x)}">${x}</button>`;}
function choiceToggle(x,arr,key){return `<button type="button" class="choice ${arr.includes(x)?'selected':''}" data-${key}="${x}" aria-pressed="${arr.includes(x)}"><strong>${x}</strong></button>`;}

function feedbackText(){return [...state.profile.feedback,state.profile.feedbackOther].filter(Boolean).join(' · ');}
function teamText(){return [...state.profile.teamMakesGreat,state.profile.teamOther].filter(Boolean).join(' · ');}
function helpText(){return [...state.profile.helpForm,state.profile.helpOther].filter(Boolean).join(' · ');}
function connectionText(){return [state.profile.careerStage,state.profile.connectionType].filter(Boolean).join(' · ');}
function spectrumPhrase(s){const v=state.profile.bestSpectrum[s.id];if(v===null)return '';if(v===0)return s.left;if(v===1)return `Lean ${s.left.toLowerCase()}`;if(v===2)return `${s.left} + ${s.right}`;if(v===3)return `Lean ${s.right.toLowerCase()}`;return s.right;}
function spectrumSummary(){return SPECTRA.map(s=>spectrumPhrase(s)).filter(Boolean);}
function onboardingSummarySentence(){
  const modes=state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean);
  const deep=SUPPORT_TOPICS.filter(t=>state.onboarding.support[t.id]!==null&&state.onboarding.support[t.id]<=1).map(t=>t.label);
  if(modes.length||deep.length){const a=modes.length?`${modes.slice(0,2).join(' + ')}`:'a practical walkthrough';const b=deep.length?` Lean in on ${deep.slice(0,2).join(' + ')}.`:'';return `${a}.${b}`.replace('..','.');}
  return 'Hands-on. Let me experience things firsthand, then give me something simple I can come back to.';
}
function supportSummaryList(){return SUPPORT_TOPICS.map(t=>({label:t.label,meta:supportMeta(state.onboarding.support[t.id])})).filter(x=>x.meta.value!==null);}
function toolSummaryList(){return TOOL_TOPICS.map(t=>({label:t.label,meta:supportMeta(state.onboarding.tools[t.id])})).filter(x=>x.meta.value!==null);}

function renderManual(){
  const p=state.profile;if(!hasManualData())return emptyManual();
  const onboardingModes=state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean).join(' · ');
  app.innerHTML=`<div class="shell wide">
    <div class="profile-head"><div class="profile-photo">${p.photo?`<img src="${p.photo}" style="object-position:${p.photoPosition.x}% ${p.photoPosition.y}%" alt="${escapeHTML(p.name)}">`:escapeHTML(initials(p.name))}</div><div><span class="eyebrow">Manual of Me</span><h1>${escapeHTML(p.name||'Your Manual')}</h1><p class="lede" style="font-size:18px;margin:0">${escapeHTML([p.preferredName&&`Call me ${p.preferredName}`,p.archetype||connectionText()].filter(Boolean).join(' · ')||'A quick guide to working with me.')}</p></div><div class="profile-actions"><button class="btn primary" id="editManual">Edit answers</button><button class="btn light" id="downloadBackup">Download all answers</button></div></div>
    <div class="manual-grid">
      <div class="card manual-section span-2"><h3>The 30-second version</h3><p class="quote">${escapeHTML(p.intro||'Add your short introduction to make this feel like you.')}</p><div class="manual-badges">${experienceText(p)?`<span class="badge answer-text">${escapeHTML(experienceText(p))}</span>`:''}${connectionText()?`<span class="badge">${escapeHTML(connectionText())}</span>`:''}</div></div>
      ${p.fun||p.knowTooMuch||p.askMeAbout?`<div class="card manual-section"><h3>Beyond the work</h3><div class="definition-list"><div class="definition-item"><span>I’m usually</span><strong>${escapeHTML(p.fun||'—')}</strong></div><div class="definition-item"><span>I know way too much about</span><strong>${escapeHTML(p.knowTooMuch||'—')}</strong></div><div class="definition-item"><span>Ask me about</span><strong>${escapeHTML(p.askMeAbout||'—')}</strong></div></div></div>`:''}
      <div class="card manual-section"><h3>What I bring</h3><div class="chips">${p.strengths.length?p.strengths.map(s=>`<span class="chip selected">${escapeHTML(skillLabel(s))}</span>`).join(''):'<span class="muted">Choose Power Skills in the Manual.</span>'}</div>${p.proud?`<div class="definition-item top-gap"><span>Something I’m proud of</span><p>${escapeHTML(p.proud)}</p></div>`:''}</div>
      <div class="card manual-section"><h3>Working with me</h3><div class="definition-list">${[['Work location',p.location],['Usual hours + time zone',p.workingHours],['How to reach me',reachText()],['In a discussion',p.discussionStyle]].filter(([,value])=>value).map(([label,value])=>`<div class="definition-item"><span>${label}</span><strong>${escapeHTML(value)}</strong></div>`).join('')}<div class="definition-item"><span>Communication style</span><strong>${escapeHTML(p.communicationStyle||'—')}</strong></div><div class="definition-item"><span>Working style</span><strong>${escapeHTML(p.workingStyle||'—')}</strong></div><div class="definition-item"><span>Feedback works best</span><strong>${escapeHTML(feedbackText()||'—')}</strong></div>${teamText()?`<div class="definition-item"><span>A good team has</span><strong>${escapeHTML(teamText())}</strong></div>`:''}</div></div>
      ${Object.values(p.bestSpectrum).some(v=>v!==null)||p.bestWhenOther?`<div class="card manual-section"><h3>I do my best work when</h3><div class="spectrum-summary">${SPECTRA.map(s=>`<div><span>${s.left}</span><b>${state.profile.bestSpectrum[s.id]===null?'—':state.profile.bestSpectrum[s.id]+1}/5</b><span>${s.right}</span></div>`).join('')}</div>${p.bestWhenOther?`<div class="definition-item top-gap"><span>Also</span><strong>${escapeHTML(p.bestWhenOther)}</strong></div>`:''}</div>`:''}
      <div class="card manual-section"><h3>Help me get unstuck</h3><div class="definition-list"><div class="definition-item"><span>Help by</span><strong>${escapeHTML(helpText()||'—')}</strong></div>${p.organize?`<div class="definition-item"><span>I organize through</span><strong>${escapeHTML(p.organize)}</strong></div>`:''}${p.stress?`<div class="definition-item"><span>Under stress you might notice</span><strong>${escapeHTML(p.stress)}</strong></div>`:''}</div></div>
      ${p.idealBuild||p.growth.length?`<div class="card manual-section"><h3>What I’m building</h3>${p.idealBuild?`<div class="definition-item"><span>Ideal project or experience</span><p>${escapeHTML(p.idealBuild)}</p></div>`:''}<div class="chips top-gap">${p.growth.length?p.growth.map(s=>`<span class="chip">${escapeHTML(skillLabel(s))}</span>`).join(''):''}</div></div>`:''}
      ${anyOnboardingData()?`<div class="card manual-section"><h3>Onboarding me</h3><div class="definition-list"><div class="definition-item"><span>Learning preference</span><strong>${escapeHTML(onboardingModes||'—')}</strong></div><div class="definition-item"><span>Pace</span><strong>${escapeHTML(state.onboarding.pace||'—')}</strong></div><div class="definition-item"><span>Where to lean in</span><strong>${escapeHTML(supportSummaryList().filter(x=>x.meta.value<=1).map(x=>x.label).join(' · ')||'—')}</strong></div></div></div>`:''}
      ${p.snack||p.drink||p.celebration?`<div class="card manual-section"><h3>Good to know</h3><div class="definition-list"><div class="definition-item"><span>Snack</span><strong>${escapeHTML(p.snack||'—')}</strong></div><div class="definition-item"><span>Drink</span><strong>${escapeHTML(p.drink||'—')}</strong></div><div class="definition-item"><span>Recognition</span><strong>${escapeHTML(p.celebration||'—')}</strong></div></div></div>`:''}
    </div>

    ${teamOutputsReady()?`<section class="export-section"><div class="section-head"><div><span class="eyebrow">Team-facing outputs · ready together</span><h2>Your Manual of Me</h2><p class="muted">Your Manual is ready. You can stop here and add onboarding later. Every answer is included in full.</p></div></div><div class="canvas-wrap"><canvas id="manualCanvas" width="1600" height="2350"></canvas></div><div class="export-toolbar"><button class="btn dark" id="downloadManual">Download Manual PNG</button><button class="btn light" id="printManual">Download Manual PDF</button></div></section>
    <section class="export-section"><div class="section-head"><div><span class="eyebrow">Team-facing outputs · ready together</span><h2>Your teammate card</h2><p class="muted">An optional introduction. The card grows to fit your answers.</p></div><button class="btn light" id="shuffleCard">Shuffle design ↻</button></div><div class="canvas-wrap"><canvas id="introCanvas" width="1080" height="1350"></canvas></div><div class="export-toolbar"><button class="btn orange" id="downloadIntro">Download teammate PNG</button><button class="btn light" id="copyIntro">Copy Slack intro text</button></div></section>`:`<section class="card export-lock"><span class="eyebrow">Downloads unlock together</span><h2>Finish the essentials.</h2><p class="muted">Your answers are saved. Complete the required fields in Meet Me + How I Work to download your Manual. Personal stories, growth prompts, and onboarding are optional.</p><button class="btn primary" id="finishTeamOutputs">${moduleComplete('meet')?'Finish How I Work':'Finish Meet Me first'}</button></section>`}
  </div>`;
  if(teamOutputsReady()){drawManualCanvas();drawIntroCanvas();}
  document.querySelector('#editManual').addEventListener('click',()=>{state.wizard=true;state.step=0;saveState();render();});document.querySelector('#downloadBackup').addEventListener('click',downloadBackup);
  document.querySelector('#finishTeamOutputs')?.addEventListener('click',()=>startModule(moduleComplete('meet')?'work':'meet'));
  document.querySelector('#downloadManual')?.addEventListener('click',()=>downloadCanvas('manualCanvas',`${slug(p.name||'tang')}-manual-of-me.png`));document.querySelector('#printManual')?.addEventListener('click',printManual);document.querySelector('#shuffleCard')?.addEventListener('click',()=>{state.cardTemplate=(state.cardTemplate+1)%3;saveState();drawIntroCanvas();});document.querySelector('#downloadIntro')?.addEventListener('click',()=>downloadCanvas('introCanvas',`${slug(p.name||'tang')}-teammate-card.png`));document.querySelector('#copyIntro')?.addEventListener('click',copyIntroText);
}
function emptyManual(){
  const onboardReady=moduleComplete('onboarding');
  app.innerHTML=`<div class="shell"><div class="empty-state"><div class="graphic-mark large">ME</div><h2>Your Manual is waiting for you.</h2><p class="muted">${onboardReady?'Your onboarding brief is already ready. This is the teammate-facing side: a few bite-sized prompts about who you are and how you work.':'Answer a handful of bite-sized prompts and this page will turn into a shareable profile.'}</p><button class="btn primary" id="emptyStart">${onboardReady?'Build Meet Me next':'Start my manual'}</button>${onboardReady?'<button class="btn light" data-route="onboarding">Back to my onboarding brief</button>':''}</div></div>`;
  document.querySelector('#emptyStart').addEventListener('click',()=>startModule('meet'));
}

function manualDocument(){
  const p=state.profile;
  const work=[p.communicationStyle&&`Communication style: ${p.communicationStyle}`,p.workingStyle&&`Working style: ${p.workingStyle}`,p.location&&`Work location: ${p.location}`,p.workingHours&&`Usual hours + time zone: ${p.workingHours}`,reachText()&&`Reach me: ${reachText()}`,p.discussionStyle&&`In a discussion: ${p.discussionStyle}`,feedbackText()&&`Feedback: ${feedbackText()}`,teamText()&&`A good team has: ${teamText()}`].filter(Boolean).join('\n');
  return {title:p.name||'Your Manual',callMe:p.preferredName,photo:p.photo,photoPosition:p.photoPosition,restoreData:profilePNGData(p),subtitle:'MANUAL OF ME · TANG',sections:[
    {label:'The 30-second version',text:p.intro},
    {label:'My background',text:[connectionText(),experienceText()].filter(Boolean).join('\n')},
    {label:'What I bring',text:p.strengths.map(skillLabel).join(' · ')},
    {label:'Creativity Archetype',text:p.archetype},
    {label:'Working with me',text:work},
    {label:'I do my best work when',text:[...spectrumSummary(),p.bestWhenOther].filter(Boolean).join('\n')},
    {label:'Help me get unstuck',text:[helpText(),p.organize&&`I organize through: ${p.organize}`,p.stress&&`Under stress you might notice: ${p.stress}`].filter(Boolean).join('\n')},
    {label:'Something I’m proud of',text:p.proud},
    {label:'What I’m building',text:p.idealBuild},
    {label:'Skills I want to build',text:p.growth.map(skillLabel).join(' · ')},
    {label:'Beyond the work',text:[p.fun&&`Usually: ${p.fun}`,p.knowTooMuch&&`I know way too much about: ${p.knowTooMuch}`,p.askMeAbout&&`Ask me about: ${p.askMeAbout}`].filter(Boolean).join('\n')},
    {label:'Onboarding me',text:[state.onboarding.pace,state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean).join(' · '),supportSummaryList().filter(x=>x.meta.value<=1).map(x=>`Lean in: ${x.label}`).join(' · ')].filter(Boolean).join('\n')},
    {label:'Good to know',text:[p.snack&&`Snack: ${p.snack}`,p.drink&&`Drink: ${p.drink}`,p.celebration&&`Recognition: ${p.celebration}`].filter(Boolean).join('\n')}
  ].filter(section=>section.text)};
}
function drawManualCanvas(){const canvas=document.querySelector('#manualCanvas');if(canvas)drawFieldGuideCanvas(canvas,manualDocument());}
function responsiveCanvasFont(text,size){
  const len=String(text||'').length;
  if(len>420)return Math.max(22,size-7);
  if(len>280)return Math.max(23,size-5);
  if(len>180)return Math.max(24,size-3);
  return size;
}
function canvasSection(ctx,label,text,x,y,w,size=34){
  const fontSize=responsiveCanvasFont(text,size),lineHeight=fontSize*1.38;
  ctx.fillStyle=COLORS.blue;ctx.font='700 22px Arial';ctx.fillText(label,x,y);
  const boxY=y+36;
  const textHeight=estimateWrapHeight(ctx,text,w-64,fontSize,1.38);
  const h=Math.max(122,textHeight+70);
  ctx.fillStyle='#fff';roundRect(ctx,x,boxY,w,h,22,true);
  ctx.fillStyle=COLORS.navy;ctx.font=`400 ${fontSize}px Arial`;
  drawWrapped(ctx,text,x+32,boxY+48,w-64,lineHeight);
  return boxY+h+42;
}
function measureCanvasSection(ctx,text,w,size=34){
  const fontSize=responsiveCanvasFont(text,size);
  const textHeight=estimateWrapHeight(ctx,text,w-64,fontSize,1.38);
  return 36+Math.max(122,textHeight+70)+42;
}
function canvasPills(ctx,label,items,x,y,w){
  ctx.fillStyle=COLORS.blue;ctx.font='700 22px Arial';ctx.fillText(label,x,y);y+=40;
  const vals=items.length?items:['—'];let px=x,py=y;ctx.font='700 23px Arial';
  vals.forEach((item,i)=>{const tw=Math.min(w,ctx.measureText(item).width+44);if(px+tw>x+w){px=x;py+=60;}ctx.fillStyle=[COLORS.navy,COLORS.blue,COLORS.orange,COLORS.purple][i%4];roundRect(ctx,px,py,tw,46,23,true);ctx.fillStyle='white';ctx.fillText(item,px+22,py+30);px+=tw+12;});
  return py+94;
}
function measureCanvasPills(ctx,items,w){
  const vals=items.length?items:['—'];let px=0,rows=1;ctx.font='700 23px Arial';
  vals.forEach(item=>{const tw=Math.min(w,ctx.measureText(item).width+44);if(px&&px+tw>w){rows++;px=0;}px+=tw+12;});
  return 40+(rows-1)*60+94;
}
function canvasTwoCol(ctx,y,items,x,w){
  const gap=22,col=(w-gap)/2;
  for(let i=0;i<items.length;i+=2){
    const pair=items.slice(i,i+2);
    ctx.font='700 25px Arial';
    const heights=pair.map(item=>estimateWrapHeight(ctx,item[1],col-52,25,1.34));
    const needsWide=heights.some(h=>h>104)||pair.some(item=>String(item[1]).length>145);
    if(needsWide){
      pair.forEach(item=>{
        const fontSize=responsiveCanvasFont(item[1],27),lineHeight=fontSize*1.36;
        const textH=estimateWrapHeight(ctx,item[1],w-52,fontSize,1.36);
        const cardH=Math.max(132,textH+84);
        ctx.fillStyle='#fff';roundRect(ctx,x,y,w,cardH,18,true);
        ctx.fillStyle=COLORS.blue;ctx.font='700 19px Arial';ctx.fillText(item[0],x+26,y+36);
        ctx.fillStyle=COLORS.navy;ctx.font=`700 ${fontSize}px Arial`;drawWrapped(ctx,item[1],x+26,y+78,w-52,lineHeight);
        y+=cardH+24;
      });
    }else{
      const rowH=Math.max(150,Math.max(...heights)+88);
      pair.forEach((item,j)=>{
        const tx=x+j*(col+gap);
        ctx.fillStyle='#fff';roundRect(ctx,tx,y,col,rowH,18,true);
        ctx.fillStyle=COLORS.blue;ctx.font='700 19px Arial';ctx.fillText(item[0],tx+24,y+36);
        ctx.fillStyle=COLORS.navy;ctx.font='700 25px Arial';drawWrapped(ctx,item[1],tx+24,y+78,col-48,34);
      });
      y+=rowH+24;
    }
  }
  return y+18;
}
function measureCanvasTwoCol(ctx,items,w){
  const gap=22,col=(w-gap)/2;let total=18;
  for(let i=0;i<items.length;i+=2){
    const pair=items.slice(i,i+2);ctx.font='700 25px Arial';
    const heights=pair.map(item=>estimateWrapHeight(ctx,item[1],col-52,25,1.34));
    const needsWide=heights.some(h=>h>104)||pair.some(item=>String(item[1]).length>145);
    if(needsWide){
      pair.forEach(item=>{const fontSize=responsiveCanvasFont(item[1],27);const textH=estimateWrapHeight(ctx,item[1],w-52,fontSize,1.36);total+=Math.max(132,textH+84)+24;});
    }else{
      total+=Math.max(150,Math.max(...heights)+88)+24;
    }
  }
  return total;
}
function estimateWrapHeight(ctx,text,w,size,lineHeight,weight='400'){
  ctx.font=`${weight} ${size}px Arial`;return wrapCanvasLines(ctx,text,w).length*size*lineHeight;
}
function drawWrapped(ctx,text,x,y,maxWidth,lineHeight){
  const lines=wrapCanvasLines(ctx,text,maxWidth);lines.forEach((line,i)=>ctx.fillText(line,x,y+i*lineHeight));return y+(lines.length-1)*lineHeight;
}

function drawIntroCanvas(){
  const c=document.querySelector('#introCanvas');if(!c)return;const p=state.profile,t=state.cardTemplate;
  const schemes=[{bg:COLORS.navy,accent:COLORS.orange,ink:'#fff',sub:'#ced6df'},{bg:'#f5f3ee',accent:COLORS.blue,ink:COLORS.navy,sub:COLORS.gray},{bg:COLORS.blue,accent:COLORS.yellow,ink:'#fff',sub:'#e5f2fb'}],s=schemes[t];
  c.width=1080;let ctx=c.getContext('2d');ctx.font='700 60px Arial';const nameLines=wrapCanvasLines(ctx,p.name||'Your Name',640);
  const sub=[p.preferredName&&`Call me ${p.preferredName}`,p.archetype||p.workingStyle].filter(Boolean).join(' · ');ctx.font='400 26px Arial';const subLines=sub?wrapCanvasLines(ctx,sub,640):[];
  const headerHeight=Math.max(330,178+nameLines.length*68+subLines.length*36);
  const blocks=[];
  if(p.intro)blocks.push(['THE 30-SECOND VERSION',p.intro]);
  if(p.strengths.length)blocks.push(['BRINGS',p.strengths.map(skillLabel).join(' · ')]);
  if(p.idealBuild)blocks.push(['HOPING TO BUILD',p.idealBuild]);
  if(p.growth.length)blocks.push(['GROWING',p.growth.map(skillLabel).join(' · ')]);
  if(p.knowTooMuch)blocks.push(['KNOWS WAY TOO MUCH ABOUT',p.knowTooMuch]);
  if(p.askMeAbout||p.fun)blocks.push(['ASK ME ABOUT',[p.askMeAbout,p.fun].filter(Boolean).join(' · ')]);
  const fuel=[p.snack,p.drink].filter(Boolean).join(' + ');if(fuel)blocks.push(['GOOD TO KNOW',fuel]);
  ctx.font='700 34px Arial';const blocksHeight=blocks.reduce((sum,[,text])=>sum+wrapCanvasLines(ctx,text,936).length*42+76,0);
  c.height=Math.max(1350,headerHeight+blocksHeight+220);c.manualPayload=profilePNGData(p,p.archetype?CARD_TRANSFER_FIELDS.filter(key=>key!=='workingStyle'):CARD_TRANSFER_FIELDS);ctx=c.getContext('2d');ctx.fillStyle=s.bg;ctx.fillRect(0,0,c.width,c.height);
  if(t===0){ctx.fillStyle=s.accent;ctx.fillRect(0,0,28,c.height);ctx.fillStyle=COLORS.blue;ctx.beginPath();ctx.arc(980,90,190,0,Math.PI*2);ctx.fill();}
  if(t===1){ctx.fillStyle=s.accent;ctx.fillRect(0,0,c.width,20);ctx.fillStyle=COLORS.orange;ctx.fillRect(760,0,320,20);}
  if(t===2){ctx.fillStyle=s.accent;ctx.fillRect(0,0,c.width,20);}
  drawCanvasPhoto(ctx,p.photo,72,72,230,230,p.name,p.photoPosition);ctx.fillStyle=s.ink;ctx.font='700 26px Arial';ctx.fillText(['MEET YOUR NEW TEAMMATE','TEAMMATE FIELD GUIDE','WELCOME TO TANG'][t],340,105);
  ctx.font='700 60px Arial';let nameY=176;nameLines.forEach(line=>{ctx.fillText(line,340,nameY);nameY+=68;});ctx.font='400 26px Arial';ctx.fillStyle=s.sub;subLines.forEach(line=>{ctx.fillText(line,340,nameY+2);nameY+=36;});
  let y=headerHeight;blocks.forEach(([label,text])=>{y=introBlock(ctx,label,text,72,y,936,s);});
  ctx.fillStyle=s.accent;roundRect(ctx,72,c.height-162,936,82,18,true);ctx.fillStyle=t===2?COLORS.navy:'#fff';ctx.font='700 28px Arial';ctx.fillText('HUMAN CENTERED. MISSION FOCUSED.',105,c.height-111);ctx.fillStyle=s.sub;ctx.font='400 18px Arial';ctx.fillText('Brought to you by TANG Onboarding · Review before sharing.',72,c.height-38);
}
function introBlock(ctx,label,text,x,y,w,s){ctx.fillStyle=s.sub;ctx.font='700 18px Arial';ctx.fillText(label,x,y);ctx.fillStyle=s.ink;ctx.font='700 34px Arial';const end=drawWrapped(ctx,text,x,y+42,w,42);return end+76;}
function drawCanvasPhoto(ctx,src,x,y,w,h,name,position={x:50,y:50}){
  if(src){
    const job=new Promise(resolve=>{const img=new Image();img.onload=()=>{ctx.save();roundRect(ctx,x,y,w,h,28,false);ctx.clip();const rect=coverPhotoRect(img,x,y,w,h,position);ctx.drawImage(img,rect.x,rect.y,rect.width,rect.height);ctx.restore();resolve();};img.onerror=()=>{drawCanvasPhoto(ctx,'',x,y,w,h,name);resolve();};img.src=src;});
    trackCanvasAsset(ctx.canvas,job);
  }else {ctx.save();roundRect(ctx,x,y,w,h,28,false);ctx.clip();ctx.fillStyle=COLORS.orange;ctx.fillRect(x,y,w,h);ctx.fillStyle='white';ctx.font=`700 ${Math.round(w*.28)}px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(initials(name),x+w/2,y+h/2);ctx.restore();}
}
function roundRect(ctx,x,y,w,h,r,fill=false,stroke=false){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill)ctx.fill();if(stroke)ctx.stroke();}
function drawTangLogo(ctx,x,y,w,badge=false){
  const h=w*.4;
  const paint=()=>{
    if(badge){ctx.fillStyle=COLORS.navy;roundRect(ctx,x-16,y-8,w+32,h+16,14,true);}
    ctx.drawImage(TANG_LOGO,x,y,w,h);
  };
  if(TANG_LOGO.complete&&TANG_LOGO.naturalWidth)paint();
  else TANG_LOGO.addEventListener('load',paint,{once:true});
}
async function downloadCanvas(id,filename){const canvas=document.getElementById(id);if(!canvas)return toast('That export is not on this page yet.');try{downloadBlob(await pngExportBlob(canvas),filename);toast('Downloaded. Keep this original PNG to restore your answers later.');}catch{toast('The image could not be created. Try the editable answers download.');}}
function printManual(){return downloadFieldGuidePDF(manualDocument(),`${slug(state.profile.name||'tang')}-manual-of-me.pdf`);}
function copyIntroText(){const p=state.profile;const text=`Meet ${p.name||'our newest teammate'}!\n\n${p.intro||''}\n\nBrings: ${p.strengths.map(skillLabel).join(', ')||'—'}\nIdeal project / experience: ${p.idealBuild||'—'}\nWants to grow: ${p.growth.map(skillLabel).join(', ')||'—'}\nKnows way too much about: ${p.knowTooMuch||'—'}\nAsk ${preferredName(p)?.split(' ')[0]||'them'} about: ${p.askMeAbout||p.fun||'—'}\nGood to know: ${[p.snack,p.drink].filter(Boolean).join(' + ')||'—'}`;navigator.clipboard?.writeText(text).then(()=>toast('Slack intro copied.')).catch(()=>toast('Could not access clipboard.'));}

function renderOnboarding(){
  const plan=buildPlan();
  const complete=moduleComplete('onboarding');
  const started=anyOnboardingData();
  const next=nextIncompleteModule('onboarding');
  const workflowCard = !complete
    ? `<div class="card workflow-nudge onboarding-nudge"><div><span class="eyebrow">${started?'Keep going':'Start here if this is what you need first'}</span><h3>${started?'Finish your onboarding brief.':'You can build the onboarding piece first.'}</h3><p>${started?'Your answers are saved. Finish the remaining onboarding prompts and you can download this brief without completing the rest of the Manual.':'No need to complete Meet Me or How I Work first. This section stands on its own and takes about four minutes.'}</p></div><button class="btn primary" id="startOnboardingOnly">${started?'Continue onboarding':'Build my onboarding brief'}</button></div>`
    : `<div class="card workflow-nudge ready-nudge"><div><span class="eyebrow">Ready to use</span><h3>Your onboarding brief is ready.</h3><p>Download it now, send it to TANG Onboarding, or keep building the rest of your profile whenever you have bandwidth.${next?` We’ll point you to <strong>${next.title}</strong> next so nothing gets lost.`:''}</p></div><div class="nudge-actions"><button class="btn dark" id="topDownloadOnboarding">Download 2-page PDF</button>${next?`<button class="btn light" id="continueProfile">Continue with ${next.title}</button>`:''}</div></div>`;
  app.innerHTML=`<div class="shell">
    <div class="section-head"><div><span class="eyebrow">My Onboarding</span><h1 class="page-title">Your flight plan.</h1><p class="lede">A starting route based on what you told us you know, where you want support, and how you prefer to learn.</p></div><button class="btn primary" id="editOnboarding">${started?'Edit preferences':'Build my brief'}</button></div>
    ${workflowCard}
    <div class="card dark flight-hero"><div><span class="badge inverse">YOUR PACE</span><h2>${escapeHTML(state.onboarding.pace||'Tell us how you want to pace it')}</h2><p>${learningSentence()}</p></div><div class="flight-graphic"><span></span><span></span><span></span></div></div>
    <div class="section-head"><div><span class="eyebrow">For the onboarding team</span><h2>Turn preferences into actions.</h2><p class="muted">Each answer now translates into a clear team behavior: what to schedule, what to send, who to pair them with, and when to stay out of the way.</p></div></div>
    <div class="plan-list action-plan-list">${plan.map(x=>`<div class="plan-item action-plan-item"><span class="plan-dot ${x.meta.className}"></span><div><div class="plan-title-row"><h4>${x.label}</h4><span class="badge">${x.meta.label}</span></div><p class="team-action"><strong>Team action:</strong> ${escapeHTML(teamActionFor(x))}</p></div><span class="plan-time">${x.time}</span></div>`).join('')}</div>
    <div class="card access-card"><div><span class="eyebrow">Access check</span><h3>What you can reach today</h3><p class="muted">${state.onboarding.access.length?escapeHTML(state.onboarding.access.join(' · ')):'You have not added access details yet.'}</p></div><button class="btn light" id="editAccess">Update</button></div>
    <section class="onboard-section"><div class="section-head"><div><span class="eyebrow">Baseline</span><h2>The onboarding timeline</h2><p class="muted">Your personalized plan sits on top of the Day 1 → Month 3+ expectations rather than replacing them.</p></div></div><div class="timeline">${TIMELINE.map(t=>`<div class="timeline-item"><span class="timeline-marker"></span><span class="badge blue">${t.when}</span><h3>${t.title}</h3><div class="timeline-tasks">${t.tasks.map(x=>`<span class="timeline-task">${x}</span>`).join('')}</div></div>`).join('')}</div></section>
    <section class="onboard-section"><div class="section-head"><div><span class="eyebrow">Next useful thing</span><h2>Explore when it helps.</h2><p class="muted">A resource can wait until the moment it becomes useful. Internal material may not open until your access is in place.</p></div></div><div class="grid cols-3">${plan.filter(x=>x.meta.value!==3).slice(0,6).map(resourceRecommendationCard).join('')}</div></section>
    <section class="onboard-section"><div class="section-head"><div><span class="eyebrow">Share</span><h2>Two-page onboarding-team brief</h2><p class="muted">${complete?'Page 1 captures their choices. Page 2 translates those choices into clear team actions.':'Finish the onboarding prompts before exporting so the team does not act on a partial picture.'}</p></div></div>${complete?`<div class="brief-pages"><div><span class="page-preview-label">PAGE 1 · THEIR CHOICES</span><div class="canvas-wrap"><canvas id="onboardingChoicesCanvas" width="1600" height="2071"></canvas></div></div><div><span class="page-preview-label">PAGE 2 · TEAM ACTIONS</span><div class="canvas-wrap"><canvas id="onboardingActionsCanvas" width="1600" height="2071"></canvas></div></div></div><div class="export-toolbar"><button class="btn dark" id="downloadOnboarding">Download 2-page PDF</button><button class="btn light" id="copyOnboarding">Copy brief as text</button></div>`:`<div class="card export-lock compact"><strong>Export locked until Show Me Around is complete.</strong><p class="muted">Your draft is still saved here while you finish.</p></div>`}</section>
  </div>`;
  if(complete)drawOnboardingCanvas();
  const startOnboarding=()=>startModule('onboarding');
  document.querySelector('#editOnboarding').addEventListener('click',startOnboarding);
  document.querySelector('#startOnboardingOnly')?.addEventListener('click',startOnboarding);
  document.querySelector('#editAccess').addEventListener('click',()=>{state.wizard=true;state.step=8;render();});
  document.querySelector('#downloadOnboarding')?.addEventListener('click',downloadOnboardingPDF);
  document.querySelector('#topDownloadOnboarding')?.addEventListener('click',downloadOnboardingPDF);
  document.querySelector('#continueProfile')?.addEventListener('click',()=>next&&startModule(next.id));
  document.querySelector('#copyOnboarding')?.addEventListener('click',copyOnboardingText);
  document.querySelectorAll('[data-ask-resource]').forEach(b=>b.addEventListener('click',()=>{const r=RESOURCES.find(x=>x.title===b.dataset.askResource);if(!r)return;navigator.clipboard?.writeText(internalAskPrompt(r)).then(()=>toast('Question copied — paste it to a TANGmate or onboarding teammate.')).catch(()=>toast('Could not access clipboard.'));}));
}
function buildPlan(){return SUPPORT_TOPICS.map(t=>{const meta=supportMeta(state.onboarding.support[t.id]),resource=RESOURCES.find(r=>r.topic===t.id&&r.kind!=='media');return {...t,meta,resource};}).concat(TOOL_TOPICS.map(t=>{const meta=supportMeta(state.onboarding.tools[t.id]),resource=RESOURCES.find(r=>r.topic===t.id&&r.kind!=='media');return {...t,time:resource?.duration||'As needed',meta,resource};}));}
function preferredLearningActions(){
  const ids=state.onboarding.learningModes;
  const actions=[];
  if(ids.includes('cheatsheet'))actions.push('send a short reference');
  if(ids.includes('show'))actions.push('demo it once');
  if(ids.includes('try'))actions.push('give them a real practice task');
  if(ids.includes('pair'))actions.push('pair them with a TANGmate');
  if(ids.includes('experience'))actions.push('create a firsthand experience when possible');
  return actions.slice(0,2);
}
function teamActionFor(x){
  const v=x.meta.value;
  const learns=preferredLearningActions();
  const learningTail=learns.length?` Best fit: ${learns.join(' + ')}.`:'';
  if(v===3)return `Do not schedule training. Confirm they can get moving, then stay available if a question comes up.`;
  if(v===2)return `Offer a 5–10 minute refresher or current cheat sheet; avoid a full walkthrough unless they ask.${learningTail}`;
  if(v===1)return `Assign a TANGmate and give a short guided walkthrough tied to a real task.${learningTail}`;
  if(v===0)return `Build the foundation deliberately: start with context, walk through the basics, then follow with a hands-on rep and a check-in.${learningTail}`;
  return `No action yet. Confirm this preference before assigning training or resources.`;
}
function teamActionList(){return buildPlan().filter(x=>x.meta.value!==null).map(x=>({...x,action:teamActionFor(x)}));}
function learningSentence(){const names=state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean);return names.length?`When something is new: ${names.join(' + ')}.`:'Add a learning preference and this plan will get more specific.';}
function resourceRecommendationCard(x){const res=x.resource;if(!res)return `<div class="card"><span class="resource-mark">NEXT</span><h3>${x.label}</h3><p class="muted">Ask the onboarding team for the best current resource, person, or experience.</p></div>`;return `<div class="card"><div class="card-title-row"><span class="resource-mark">${res.mark}</span><span class="badge ${res.access==='Public'?'public':'lock'}">${res.access}</span></div><h3 class="resource-rec-title">${res.title}</h3><p class="muted">${res.desc}</p>${res.url?`<a class="btn light" href="${res.url}" target="_blank" rel="noreferrer">Open resource ↗</a>`:`<button class="btn light ask-resource" data-ask-resource="${escapeHTML(res.title)}">Ask a TANGmate ↗</button>`}</div>`;}

function drawOnboardingHeader(ctx,p,pageLabel,pageTitle){
  ctx.fillStyle='#f5f3ee';ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.fillStyle=COLORS.navy;ctx.fillRect(0,0,ctx.canvas.width,300);
  drawCanvasPhoto(ctx,p.photo,95,75,150,150,p.name);
  ctx.fillStyle='white';ctx.font='700 62px Arial';ctx.fillText(p.name||'Your Name',280,135);
  ctx.font='400 26px Arial';ctx.fillStyle='#c9d2dd';ctx.fillText('TANG ONBOARDING TEAM BRIEF',282,188);
  ctx.fillStyle=COLORS.yellow;ctx.fillRect(0,290,ctx.canvas.width,10);
  drawTangLogo(ctx,1260,78,250);
  ctx.fillStyle=COLORS.blue;ctx.font='700 20px Arial';ctx.fillText(pageLabel,90,350);
  ctx.fillStyle=COLORS.navy;ctx.font='700 38px Arial';ctx.fillText(pageTitle,90,398);
}
function drawOnboardingFooter(ctx,pageNumber){
  const footerY=ctx.canvas.height-142;
  ctx.fillStyle=COLORS.navy;ctx.fillRect(90,footerY,1420,72);
  ctx.fillStyle='white';ctx.font='700 27px Arial';ctx.fillText('HUMAN-CENTERED ONBOARDING',120,footerY+47);
  ctx.textAlign='right';ctx.fillText(`${pageNumber} / 2`,1478,footerY+47);ctx.textAlign='start';
  ctx.fillStyle=COLORS.gray;ctx.font='400 21px Arial';ctx.fillText('Brought to you by TANG Onboarding · Review before sharing.',90,footerY+112);
}
function drawChoiceCards(ctx,items,x,y,w){
  const gap=22,col=(w-gap)/2,rowH=126;
  for(let i=0;i<items.length;i+=2){
    items.slice(i,i+2).forEach((item,j)=>{
      const tx=x+j*(col+gap);ctx.fillStyle='#fff';roundRect(ctx,tx,y,col,rowH,18,true);
      const color=[COLORS.pink,COLORS.orange,COLORS.yellow,'#0d8a65'][item.meta.value??0];
      ctx.fillStyle=color;ctx.beginPath();ctx.arc(tx+30,y+31,9,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=COLORS.navy;ctx.font='700 22px Arial';drawWrapped(ctx,item.label,tx+52,y+37,col-76,28);
      ctx.fillStyle=COLORS.gray;ctx.font='400 20px Arial';ctx.fillText(item.meta.label,tx+30,y+94);
    });
    y+=rowH+18;
  }
  return y;
}
function drawActionCards(ctx,items,x,y,w){
  const gap=22,col=(w-gap)/2,rowH=186;
  for(let i=0;i<items.length;i+=2){
    items.slice(i,i+2).forEach((item,j)=>{
      const tx=x+j*(col+gap);ctx.fillStyle='#fff';roundRect(ctx,tx,y,col,rowH,18,true);
      ctx.fillStyle=COLORS.blue;ctx.font='700 18px Arial';ctx.fillText(item.label.toUpperCase(),tx+26,y+35);
      ctx.fillStyle=COLORS.navy;ctx.font='700 21px Arial';drawWrapped(ctx,item.action,tx+26,y+72,col-52,28);
    });
    y+=rowH+18;
  }
  return y;
}
function drawOnboardingCanvas(){
  const choices=document.querySelector('#onboardingChoicesCanvas');
  const actions=document.querySelector('#onboardingActionsCanvas');
  if(!choices&&!actions)return;
  const p=state.profile;
  const recovery={format:'tang-manual',version:1,kind:'profile',profile:pickTransferFields(p,['name','preferredName','careerStage','connectionType','snack','drink','celebration']),onboarding:structuredClone(state.onboarding)};if(choices)choices.manualPayload=recovery;if(actions)actions.manualPayload=recovery;
  const learn=[state.onboarding.pace,state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean).join(' + ')].filter(Boolean).join('   •   ')||'—';
  const access=state.onboarding.access.join(' · ')||'Not added yet';
  const hospitality=[p.snack&&`Snack: ${p.snack}`,p.drink&&`Drink: ${p.drink}`,p.celebration&&`Recognition: ${p.celebration}`].filter(Boolean).join('   •   ')||'No optional welcome preferences added.';
  const choicesList=[...supportSummaryList(),...toolSummaryList()];
  if(choices){
    choices.width=1600;choices.height=2071;const ctx=choices.getContext('2d');
    drawOnboardingHeader(ctx,p,'PAGE 1 · THEIR CHOICES','What they told us');
    let y=448;y=canvasSection(ctx,'HOW I LEARN',learn,90,y,1420,29);y=canvasSection(ctx,'ACCESS TODAY',access,90,y,1420,27);
    ctx.fillStyle=COLORS.blue;ctx.font='700 22px Arial';ctx.fillText('SUPPORT + TOOL CHOICES',90,y);y+=34;
    y=drawChoiceCards(ctx,choicesList,90,y,1420);
    ctx.fillStyle=COLORS.blue;ctx.font='700 20px Arial';ctx.fillText('OPTIONAL WELCOME PREFERENCES',90,y+8);
    ctx.fillStyle='#fff';roundRect(ctx,90,y+28,1420,100,16,true);ctx.fillStyle=COLORS.navy;ctx.font='400 20px Arial';drawWrapped(ctx,hospitality,118,y+69,1364,27);
    drawOnboardingFooter(ctx,1);
  }
  if(actions){
    actions.width=1600;actions.height=2071;const ctx=actions.getContext('2d');
    drawOnboardingHeader(ctx,p,'PAGE 2 · TEAM ACTIONS','What we should do next');
    ctx.fillStyle='#fff';roundRect(ctx,90,445,1420,112,18,true);ctx.fillStyle=COLORS.navy;ctx.font='700 25px Arial';ctx.fillText('USE THEIR PREFERENCES TO CHANGE THE ONBOARDING EXPERIENCE',120,488);ctx.fillStyle=COLORS.gray;ctx.font='400 22px Arial';drawWrapped(ctx,`${learningSentence()} These are recommended team behaviors, not extra tasks for the new teammate.`,120,527,1360,29);
    ctx.fillStyle=COLORS.blue;ctx.font='700 22px Arial';ctx.fillText('ACTIONABLE RESULTS',90,610);
    drawActionCards(ctx,teamActionList(),90,642,1420);
    drawOnboardingFooter(ctx,2);
  }
}
function canvasJPEGBytes(canvas){
  const data=canvas.toDataURL('image/jpeg',0.94).split(',')[1];
  const raw=atob(data),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);return bytes;
}
async function downloadCanvasPagesPDF(ids,filename){
  const canvases=ids.map(id=>typeof id==='string'?document.getElementById(id):id).filter(Boolean);
  if(!canvases.length)return toast('The export is not available yet.');
  await Promise.all(canvases.map(waitForCanvasAssets));
  const enc=new TextEncoder(),chunks=[];let length=0;const offsets=[];
  const pushText=t=>{const b=enc.encode(t);chunks.push(b);length+=b.length;};
  const pushBytes=b=>{chunks.push(b);length+=b.length;};
  const addObj=(n,parts)=>{offsets[n]=length;pushText(`${n} 0 obj\n`);parts();pushText(`\nendobj\n`);};
  const images=canvases.map(canvas=>({canvas,bytes:canvasJPEGBytes(canvas)}));
  pushText('%PDF-1.4\n%TANG\n');
  addObj(1,()=>pushText('<< /Type /Catalog /Pages 2 0 R >>'));
  addObj(2,()=>pushText(`<< /Type /Pages /Kids [${images.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] /Count ${images.length} >>`));
  images.forEach((img,index)=>{
    const pageObj=3+index*3,imageObj=4+index*3,contentObj=5+index*3,imName=`Im${index}`;
    addObj(pageObj,()=>pushText(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /${imName} ${imageObj} 0 R >> >> /Contents ${contentObj} 0 R >>`));
    addObj(imageObj,()=>{pushText(`<< /Type /XObject /Subtype /Image /Width ${img.canvas.width} /Height ${img.canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.bytes.length} >>\nstream\n`);pushBytes(img.bytes);pushText('\nendstream');});
    const stream=`q\n612 0 0 792 0 0 cm\n/${imName} Do\nQ\n`;
    addObj(contentObj,()=>pushText(`<< /Length ${enc.encode(stream).length} >>\nstream\n${stream}endstream`));
  });
  const objectCount=3+images.length*3;const xref=length;pushText(`xref\n0 ${objectCount}\n0000000000 65535 f \n`);for(let i=1;i<objectCount;i++)pushText(String(offsets[i]).padStart(10,'0')+' 00000 n \n');pushText(`trailer\n<< /Size ${objectCount} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  const blob=new Blob(chunks,{type:'application/pdf'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast(`Downloaded ${canvases.length}-page PDF.`);
}
function downloadOnboardingPDF(){downloadCanvasPagesPDF(['onboardingChoicesCanvas','onboardingActionsCanvas'],`${slug(state.profile.name||'tang')}-onboarding-brief.pdf`);}
function copyOnboardingText(){const p=state.profile;const support=[...supportSummaryList(),...toolSummaryList()].map(x=>`${x.label}: ${x.meta.label}`).join('\n');const actions=teamActionList().map(x=>`${x.label}: ${x.action}`).join('\n');const text=`TANG Onboarding Brief — ${p.name||'New teammate'}\n\nConnection: ${connectionText()||'—'}\nAccess: ${state.onboarding.access.join(', ')||'—'}\nLearning: ${state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean).join(', ')||'—'}\nPace: ${state.onboarding.pace||'—'}\n\nSupport preferences\n${support}\n\nTeam actions\n${actions}\n\nWelcome preferences: ${[p.snack&&`Snack ${p.snack}`,p.drink&&`Drink ${p.drink}`,p.celebration].filter(Boolean).join(' · ')||'—'}`;navigator.clipboard?.writeText(text).then(()=>toast('Onboarding brief copied.')).catch(()=>toast('Could not access clipboard.'));}


function renderCheckpoint(){
  const id=state.ui.checkpoint;
  const m=moduleById(id);
  if(!m){state.route='home';saveState();return renderHome();}
  const next=nextIncompleteModule(id);
  const p=state.profile;
  const content={
    meet:{eyebrow:'Meet Me complete',title:'Keep going.',body:'Your introduction is taking shape. How I Work adds the team context needed to make both shareable outputs complete.',output:'Team-facing outputs',detail:'Finish How I Work to unlock both downloads together.',button:'Continue',view:'Preview my profile'},
    work:{eyebrow:'Manual complete',title:'Your Manual is ready. You can stop here.',body:'You have what you need to introduce yourself and start working together. Save your Manual now. The Slack intro and onboarding flight plan are optional, and you can add them later.',output:'Manual of Me + teammate card',detail:'Two complete, shareable views of who you are and how you work.',button:'Download both',view:'Review my Manual'},
    onboarding:{eyebrow:'Show Me Around complete',title:'Your onboarding brief is ready.',body:'This can travel to TANG Onboarding right now. You do not need to finish the rest of your Manual first. We’ll keep anything else you add later synced into the experience.',output:'Onboarding brief',detail:'Support, tools, access, pace, and how you prefer to learn.',button:'Download 2-page PDF',view:'Review my flight plan'}
  }[id];
  if(!content){state.route='home';saveState();return renderHome();}
  app.innerHTML=`<div class="checkpoint-stage" style="--checkpoint-accent:${m.accent}"><div class="shell checkpoint-shell">
    <div class="checkpoint-mark">✓</div><span class="eyebrow">${content.eyebrow}</span><h1>${content.title}</h1><p class="lede">${content.body}</p>
    ${id==='work'?`<div class="checkpoint-dual"><div class="card checkpoint-output"><div class="checkpoint-output-icon">ME</div><div><span class="small muted">READY TO SHARE</span><h3>Manual of Me</h3><p>How you work, what you bring, and what teammates should know.</p></div><button class="btn dark" id="checkpointManual">Download Manual</button></div><div class="card checkpoint-output"><div class="checkpoint-output-icon">HI</div><div><span class="small muted">READY TO SHARE</span><h3>Teammate card</h3><p>A compact introduction for Slack, email, or a kickoff.</p></div><button class="btn orange" id="checkpointIntro">Download card</button></div></div>`:`<div class="card checkpoint-output"><div class="checkpoint-output-icon">GO</div><div><span class="small muted">READY WHEN YOU ARE</span><h3>${content.output}</h3><p>${content.detail}</p></div><button class="btn dark" id="checkpointDownload">${content.button}</button></div>`}
    <div class="checkpoint-next"><div><span class="eyebrow">Nothing else is blocked</span><h3>${next?`Next useful chunk: ${next.title}`:'You have all four chunks.'}</h3><p>${next?`You can stop here, or keep going for ${next.time}. We’ll always bring you back to the next unfinished section.`:'You can head to the final handoff whenever you are ready.'}</p></div><div class="checkpoint-actions">${id==='work'?'<button class="btn primary" data-route="manual">View & download my Manual</button>':''}${next?`<button class="btn ${id==='work'?'light':'primary'}" id="checkpointContinue">${id==='work'?'Optional: ':'Continue with '}${next.title}</button>`:`<button class="btn primary" id="checkpointContinue">Open my TANG pack</button>`}<button class="btn light" id="checkpointView">${content.view}</button><button class="btn text" id="checkpointHome">Save & go home</button></div></div>
    <div class="hidden-canvases" aria-hidden="true"><canvas id="manualCanvas" width="1600" height="2350"></canvas><canvas id="introCanvas" width="1080" height="1350"></canvas><canvas id="onboardingChoicesCanvas" width="1600" height="2071"></canvas><canvas id="onboardingActionsCanvas" width="1600" height="2071"></canvas></div>
  </div></div>`;
  drawManualCanvas();drawIntroCanvas();drawOnboardingCanvas();
  if(id==='work'){
    document.querySelector('#checkpointManual').addEventListener('click',()=>downloadCanvas('manualCanvas',`${slug(p.name||'tang')}-manual-of-me.png`));
    document.querySelector('#checkpointIntro').addEventListener('click',()=>downloadCanvas('introCanvas',`${slug(p.name||'tang')}-teammate-card.png`));
  }else{
    document.querySelector('#checkpointDownload').addEventListener('click',downloadOnboardingPDF);
  }
  document.querySelector('#checkpointContinue').addEventListener('click',()=>{
    state.ui.checkpoint='';

    // Re-check progress at click time so this always opens the first
    // unfinished module, even if completion state changed after render.
    const destination=nextIncompleteModule(id);

    if(destination){
      startModule(destination.id);
      return;
    }

    state.wizard=false;
    state.route='outro';
    state.ui.outroSeen=true;
    saveState();
    render();
    window.scrollTo(0,0);
  });
  document.querySelector('#checkpointView').addEventListener('click',()=>{state.ui.checkpoint='';saveState();setRoute(id==='onboarding'?'onboarding':'manual');});
  document.querySelector('#checkpointHome').addEventListener('click',()=>{state.ui.checkpoint='';state.route='home';saveState();render();window.scrollTo(0,0);toast('Saved. Come back whenever you are ready.');});
}

function renderOutro(){
  const p=state.profile;
  const learning=state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title.replace('Give me the ','').replace('Let me ','')).filter(Boolean).slice(0,2).join(' + ') || 'Learn by doing';
  const topSkills=(p.strengths||[]).slice(0,2).map(skillLabel).join(' + ') || 'Your strengths';
  app.innerHTML=`<section class="pack-stage">
    <div class="pack-noise" aria-hidden="true"></div><div class="pack-rays" aria-hidden="true"></div>
    <div class="pack-shell">
      <div class="pack-kicker">YOUR TANG STARTER PACK</div>
      <h1>${escapeHTML(p.name||'Teammate')}, you’re ready to make your mark.</h1>
      <p class="pack-lede">You gave us enough to stop onboarding you like everybody else. Here is what you unlocked.</p>
      <div class="pack-cards">
        <article class="reveal-card reveal-one"><span>01</span><small>HOW YOU SHOW UP</small><strong>${escapeHTML(topSkills)}</strong><em>Manual of Me</em></article>
        <article class="reveal-card reveal-two"><span>02</span><small>HOW TO RAMP YOU IN</small><strong>${escapeHTML(learning)}</strong><em>Onboarding flight plan</em></article>
        <article class="reveal-card reveal-three"><span>03</span><small>HOW TO INTRODUCE YOU</small><strong>${escapeHTML(p.askMeAbout?`Ask me about ${p.askMeAbout}`:'Ready to meet the team')}</strong><em>Teammate intro card</em></article>
      </div>
      <div class="pack-line"><span>WELCOME ABOARD</span><i></i><span>NOW MAKE IT YOURS</span></div>
      <div class="pack-actions"><button class="btn light" id="outroReview">Review my Manual</button><button class="btn orange" id="openPack">Open my starter pack →</button></div>
      <p class="pack-note">Next: download the three shareable outputs and send them to TANG Onboarding in Slack or email.</p>
    </div>
  </section>`;
  document.querySelector('#outroReview').addEventListener('click',()=>setRoute('manual'));
  document.querySelector('#openPack').addEventListener('click',()=>{state.route='handoff';saveState();render();window.scrollTo({top:0,behavior:'smooth'});});
}

function renderHandoff(){
  const p=state.profile;
  app.innerHTML=`<div class="shell handoff-shell"><div class="handoff-hero"><span class="eyebrow">Ready to share</span><h1>Hand it off.</h1><p class="lede">Review what you want teammates to see, download the useful pieces, then send them to the TANG onboarding team in Slack or email.</p></div>
  <div class="handoff-steps"><div><span>1</span><strong>Review</strong><p>Open your Manual and make any last edits.</p></div><div><span>2</span><strong>Download</strong><p>Grab your Manual, intro card, and onboarding brief.</p></div><div><span>3</span><strong>Send</strong><p>Share the files with your onboarding contact so we can tailor the next steps.</p></div></div>
  <div class="grid cols-3 handoff-cards">
    <div class="card deliverable-card deliverable-manual"><h3>Manual of Me</h3><p class="muted">For teammates, kickoffs, and your future profile.</p>${teamOutputsReady()?'<button class="btn dark full" id="handoffManual">Download Manual</button>':'<span class="badge lock">Finish Meet Me + How I Work</span>'}</div>
    <div class="card deliverable-card deliverable-intro"><h3>Teammate card</h3><p class="muted">For Slack, email, or a team introduction.</p>${teamOutputsReady()?'<button class="btn orange full" id="handoffIntro">Download teammate card</button>':'<span class="badge lock">Unlocks with Manual</span>'}</div>
    <div class="card deliverable-card deliverable-brief"><h3>Onboarding brief</h3><p class="muted">For the onboarding team: support, access, pace, learning style, and clear team actions.</p>${onboardingOutputReady()?'<button class="btn primary full" id="handoffBrief">Download 2-page PDF</button>':'<span class="badge lock">Finish Show Me Around</span>'}</div>
  </div>
  <div class="card share-card"><div><h3>One more useful backup</h3><p class="muted">Download all answers as a portable profile file. You can import it later on another copy of this site without redoing the Manual.</p></div><button class="btn light" id="handoffBackup">Download all answers</button></div>
  <div class="handoff-actions"><button class="btn light" data-route="manual">Review my Manual</button><button class="btn light" data-route="onboarding">Review my flight plan</button><button class="btn dark" id="copyShareNote">Copy a note to send with it</button></div>
  <div class="hidden-canvases" aria-hidden="true"><canvas id="manualCanvas" width="1600" height="2350"></canvas><canvas id="introCanvas" width="1080" height="1350"></canvas><canvas id="onboardingChoicesCanvas" width="1600" height="2071"></canvas><canvas id="onboardingActionsCanvas" width="1600" height="2071"></canvas></div>
  </div>`;
  if(teamOutputsReady()){drawManualCanvas();drawIntroCanvas();}if(onboardingOutputReady())drawOnboardingCanvas();
  document.querySelector('#handoffManual')?.addEventListener('click',()=>downloadCanvas('manualCanvas',`${slug(p.name||'tang')}-manual-of-me.png`));document.querySelector('#handoffIntro')?.addEventListener('click',()=>downloadCanvas('introCanvas',`${slug(p.name||'tang')}-teammate-card.png`));document.querySelector('#handoffBrief')?.addEventListener('click',downloadOnboardingPDF);document.querySelector('#handoffBackup').addEventListener('click',downloadBackup);document.querySelector('#copyShareNote').addEventListener('click',copyShareNote);
}
function copyShareNote(){const text=`Hi TANG Onboarding — I finished my Manual of Me and opened my TANG starter pack. I’m sending my Manual, intro card, and onboarding brief so you can see how I like to work and where I’d like more or less support as I get up to speed. Thanks!`;navigator.clipboard?.writeText(text).then(()=>toast('Share note copied.')).catch(()=>toast('Could not access clipboard.'));}


function renderExamples(){
  const ex=patrickExampleState();
  const p=ex.profile;
  const plan=withPatrickExample(()=>buildPlan());
  app.innerHTML=`<div class="shell wide examples-shell">
    <div class="examples-hero">
      <div><span class="eyebrow">Output examples</span><h1 class="page-title">See where this heads.</h1><p class="lede">Here is a completed example using Patrick so you can see what each chunk becomes before you answer a single question.</p></div>
      <div class="examples-person"><img src="assets/patrick-alfonzo.jpg" alt="Patrick Alfonzo"><div><strong>Patrick Alfonzo</strong><span>Example teammate profile</span></div></div>
    </div>
    <div class="card example-note"><strong>Illustrative example.</strong><span>Bio details come from Patrick’s provided bio. Working-style, growth, tool, and onboarding preferences are sample responses added only to demonstrate the full experience—not statements Patrick has personally confirmed.</span></div>

    <nav class="example-jump" aria-label="Example outputs">
      <a href="#example-manual">Manual of Me</a><a href="#example-intro">Teammate intro</a><a href="#example-flight">Flight plan</a><a href="#example-brief">Onboarding brief</a>
    </nav>

    <section class="example-output" id="example-manual">
      <div class="example-copy"><span class="eyebrow">01 · Team-facing</span><h2>Manual of Me</h2><p>The scan-before-a-kickoff version: who Patrick is, what he brings, how he works, and the context teammates can use immediately.</p><button class="btn dark" id="downloadPatrickManual">Download Patrick example</button></div>
      <div class="canvas-wrap example-canvas"><canvas id="manualCanvas" width="1600" height="2350"></canvas></div>
    </section>

    <section class="example-output reverse" id="example-intro">
      <div class="example-copy"><span class="eyebrow">02 · Slack / email</span><h2>New Teammate card</h2><p>A smaller, friendlier introduction that is easy to drop into Slack, an email, or the beginning of a team kickoff.</p><button class="btn orange" id="downloadPatrickIntro">Download Patrick example</button></div>
      <div class="canvas-wrap example-canvas intro-example"><canvas id="introCanvas" width="1080" height="1350"></canvas></div>
    </section>

    <section class="example-output" id="example-flight">
      <div class="example-copy"><span class="eyebrow">03 · Personalized experience</span><h2>Onboarding flight plan</h2><p>This is the part that changes what happens next. Skip what someone already knows, refresh what is rusty, and lean in where support would actually help.</p></div>
      <div class="example-flight card dark">
        <div class="example-flight-head"><span class="badge inverse">PATRICK’S EXAMPLE PACE</span><h3>${escapeHTML(ex.onboarding.pace)}</h3><p>When something is new: experience it firsthand, pair with someone, then keep a cheat sheet nearby.</p></div>
        <div class="example-plan-list">${plan.map(x=>`<div class="example-plan-item"><span class="plan-dot ${x.meta.className}"></span><div><strong>${escapeHTML(x.label)}</strong><small>${escapeHTML(x.meta.label)}</small></div></div>`).join('')}</div>
      </div>
    </section>

    <section class="example-output reverse" id="example-brief">
      <div class="example-copy"><span class="eyebrow">04 · Onboarding-team handoff</span><h2>Onboarding brief</h2><p>The practical handoff: access, learning preferences, tool familiarity, and where the onboarding team should guide, refresh, or get out of the way.</p><button class="btn primary" id="downloadPatrickBrief">Download 2-page example PDF</button></div>
      <div class="brief-pages example-brief-pages"><div><span class="page-preview-label">PAGE 1 · THEIR CHOICES</span><div class="canvas-wrap example-canvas"><canvas id="onboardingChoicesCanvas" width="1600" height="2071"></canvas></div></div><div><span class="page-preview-label">PAGE 2 · TEAM ACTIONS</span><div class="canvas-wrap example-canvas"><canvas id="onboardingActionsCanvas" width="1600" height="2071"></canvas></div></div></div>
    </section>

    <section class="examples-cta card"><div><span class="eyebrow">Now make it yours</span><h2>You do not have to build everything at once.</h2><p>Start with the chunk that is useful today. Each completed section creates something you can use or send immediately.</p></div><button class="btn primary" id="examplesStart">Start my Manual</button></section>
  </div>`;
  withPatrickExample(()=>{drawManualCanvas();drawIntroCanvas();drawOnboardingCanvas();});
  document.querySelector('#downloadPatrickManual').addEventListener('click',()=>downloadCanvas('manualCanvas','patrick-alfonzo-example-manual-of-me.png'));
  document.querySelector('#downloadPatrickIntro').addEventListener('click',()=>downloadCanvas('introCanvas','patrick-alfonzo-example-intro-card.png'));
  document.querySelector('#downloadPatrickBrief').addEventListener('click',()=>downloadCanvasPagesPDF(['onboardingChoicesCanvas','onboardingActionsCanvas'],'patrick-alfonzo-example-onboarding-brief.pdf'));
  document.querySelector('#examplesStart').addEventListener('click',()=>startModule(nextIncompleteModule()?.id||'meet'));
}

function renderPeople(){app.innerHTML=`<div class="shell"><div class="section-head"><div><span class="eyebrow">People</span><h1 class="page-title">Meet your onboarding crew.</h1><p class="lede">Need something? Start with the reason you are reaching out. The goal is a useful first connection—not a wall of biographies.</p></div></div><div class="grid cols-2 team-grid">${TEAM.map(person=>`<article class="card person-card"><div class="person-top"><div class="person-avatar ${person.image?'has-photo':''}">${person.image?`<img src="${person.image}" alt="${person.name}" style="object-position:${person.position||'50% 35%'}">`:person.initials}</div><div class="person-heading"><h3>${person.name}</h3><div class="person-role">${person.role}</div></div></div><p class="person-summary">${person.summary}</p><div class="person-mini"><div><strong>BACKGROUND</strong><span>${person.background}</span></div>${person.outside?`<div><strong>OFF THE CLOCK</strong><span>${person.outside}</span></div>`:''}</div><div class="ask"><strong>Reach out for</strong>${person.ask}</div><footer><span class="badge lock">TANG onboarding</span>${person.link?`<a class="btn text" href="${person.link}">Slack →</a>`:`<span class="small muted">Slack link can be added</span>`}</footer></article>`).join('')}</div><div class="card directory-note"><span class="eyebrow">Living directory</span><h3>This can grow with the team.</h3><p>Over time, the same profiles can hold photos, short bios, Power Skills, “ask me about” topics, onboarding preferences, and searchable experience—without turning the People tab into LinkedIn.</p></div></div>`;}

function renderResources(){
  const cats=['All',...new Set(RESOURCES.map(r=>r.category))],filtered=state.resourceFilter==='All'?RESOURCES:RESOURCES.filter(r=>r.category===state.resourceFilter);
  app.innerHTML=`<div class="shell wide"><div class="section-head"><div><span class="eyebrow">Resources</span><h1 class="page-title">Explore when it is useful.</h1><p class="lede">You do not need to memorize onboarding. Know where to go when context, a tool, or a little TANG translation would help.</p></div></div><div class="resource-layout"><aside class="resource-filter" aria-label="Resource filters">${cats.map(c=>`<button class="filter-btn ${state.resourceFilter===c?'active':''}" data-filter="${c}">${c}</button>`).join('')}</aside><div><div class="grid cols-2 resource-grid">${filtered.map(resourceCard).join('')}</div></div></div></div>`;
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.resourceFilter=b.dataset.filter;saveState();renderResources();}));
  document.querySelectorAll('[data-ask-resource]').forEach(b=>b.addEventListener('click',()=>{const r=RESOURCES.find(x=>x.title===b.dataset.askResource);if(!r)return;navigator.clipboard?.writeText(internalAskPrompt(r)).then(()=>toast('Question copied — paste it to a TANGmate or onboarding teammate.')).catch(()=>toast('Could not access clipboard.'));}));
}
function internalAskPrompt(r){return `I’m getting oriented to ${r.title}. Can you point me to the current approved resource or show me where it lives, and let me know what access I need?`;}
function resourceCard(r){if(r.kind==='media')return `<article class="resource-media"><img src="${r.image}" alt="${r.title}"><div class="overlay"><span class="badge inverse">RP1</span><h3>${r.title}</h3><p>${r.desc}</p></div></article>`;const badge=r.access==='Public'?'public':'lock';const link=r.url?(r.openInEdge?`<a class="btn light" href="microsoft-edge:${r.url}" title="Open in Microsoft Edge">Open in Edge ↗</a>`:`<a class="btn light" href="${r.url}" target="_blank" rel="noreferrer">Open ↗</a>`):`<button class="btn light ask-resource" data-ask-resource="${escapeHTML(r.title)}">Ask a TANGmate ↗</button>`;const guidance=r.url?'':`<div class="resource-human-path"><strong>Best path:</strong> Ask a TANGmate or the onboarding team for the current approved location once your access is in place.</div>`;return `<article class="card resource-card"><span class="resource-mark">${r.mark}</span><div><div class="card-title-row"><h3>${r.title}</h3></div><p>${r.desc}</p>${guidance}<div class="resource-meta"><span class="badge ${badge}">${r.access}</span><span class="badge">${r.duration}</span></div></div>${link}</article>`;}

function downloadBackup(){downloadJSON({version:3,exportedAt:new Date().toISOString(),profile:state.profile,onboarding:state.onboarding,kickoffs:state.kickoffs},`${slug(state.profile.name||'tang')}-manual-profile.json`);}
function importBackup(e){
  const file=e.target.files?.[0];if(!file)return;
  if(typeof file.text==='function'&&typeof file.arrayBuffer==='function'){restoreManualFile(file);e.target.value='';return;}
  const reader=new FileReader();reader.onload=()=>{try{
    const data=JSON.parse(reader.result);
    if(!data||typeof data!=='object'||(!data.profile&&!data.onboarding&&!data.kickoffs))throw new Error('Not a Manual backup');
    if(data.profile)state.profile=deepMerge(state.profile,data.profile);
    if(data.onboarding)state.onboarding=deepMerge(state.onboarding,data.onboarding);
    if(Array.isArray(data.kickoffs?.items)){
      data.kickoffs.items.forEach(item=>{const k=normalizeKickoff(item);const i=state.kickoffs.items.findIndex(old=>old.id===k.id);if(i>=0)state.kickoffs.items[i]=k;else state.kickoffs.items.push(k);});
      state.kickoffs.view='list';
    }
    saveState();render();toast('Saved answers imported.');
  }catch{toast('That saved-answers file could not be read.');}};
  reader.readAsText(file);e.target.value='';
}
function slug(s){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'tang';}
function toast(msg){document.querySelector('.toast')?.remove();const d=document.createElement('div');d.className='toast';d.textContent=msg;document.body.appendChild(d);announce(msg);setTimeout(()=>d.remove(),2400);}
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){e.preventDefault();downloadBackup();}});

const entryRoute=typeof location!=='undefined'?location.hash.slice(1):'';
if(['kickoffs','restore'].includes(entryRoute)){state.route=entryRoute;state.wizard=false;state.ui.introSeen=true;}
render();
