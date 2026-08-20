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
  { id:'humbleHustle', label:'Humble Hustle', core:true, desc:'Rolls up their sleeves and contributes wherever needed.' },
  { id:'empathy', label:'Empathy', core:true, desc:'Values the perspectives, needs, and lived experiences of others.' },
  { id:'creativity', label:'Creativity & Resourcefulness', desc:'Finds inventive, low-resource solutions through creativity and iteration.' },
  { id:'ambiguity', label:'Comfort with Ambiguity', desc:'Makes progress despite uncertainty and shifts direction as needed.' },
  { id:'ownership', label:'Ownership Mentality', desc:'Takes initiative and responsibility beyond formal job duties.' },
  { id:'adaptability', label:'Adaptability & Flexibility', desc:'Adjusts to changing priorities, roles, needs, and environments.' },
  { id:'problemSolving', label:'Proactive Problem Solving', desc:'Addresses problems without waiting to be asked.' },
  { id:'resilience', label:'Resilience & Grit', desc:'Perseveres, rebounds, and stays grounded under stress.' },
  { id:'communication', label:'Clear Communication', desc:'Communicates clearly and concisely with mixed audiences.' },
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
  { id:'navy', label:'Navy + mission context', time:'15–30 min' },
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
const CONNECTION_TYPES = ['APL teammate','TANG partner','Navy / government partner','Other / still figuring it out'];
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
  profile:{
    name:'', pronouns:'', careerStage:'', connectionType:'', organization:'', location:'', photo:'', intro:'', fun:'', knowTooMuch:'', proud:'', askMeAbout:'',
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
  { key:'identity', title:'First things first: who are we welcoming?', help:'A few basics help us introduce you well and avoid assuming you have access to the same things as everyone else.', render:renderIdentity, complete:()=>!!(state.profile.name.trim() && state.profile.careerStage && state.profile.connectionType) },
  { key:'story', title:'Give us the 30-second version of you.', help:'Not a formal bio. Think of what you would actually want a new teammate to know before the first meeting.', render:renderStory, complete:()=>!!state.profile.intro.trim() },
  { key:'human', title:'What should people know beyond your job title?', help:'A few conversation starters make introductions easier and help the team remember the person, not just the role.', render:renderHuman, complete:()=>!!(state.profile.fun.trim() || state.profile.knowTooMuch.trim() || state.profile.askMeAbout.trim()) },
  { key:'strengths', title:'What do you naturally bring to a team?', help:'Pick up to four Power Skills that feel most like you today. This is reflection, not a scorecard.', render:renderStrengths, complete:()=>state.profile.strengths.length>0 },
  { key:'work', title:'How do you tend to show up with a team?', help:'Use a few short signals. Add your own words whenever the options miss something important.', render:renderWorkStyle, complete:()=>!!(state.profile.communicationStyle.trim() && state.profile.workingStyle.trim() && (state.profile.teamMakesGreat.length || state.profile.teamOther.trim()) && (state.profile.feedback.length || state.profile.feedbackOther.trim())) },
  { key:'help', title:'When do you do your best work?', help:'Think in spectra, not boxes. There is no ideal answer here, and the middle is a real answer.', render:renderHelp, complete:()=>Object.values(state.profile.bestSpectrum).filter(v=>v!==null).length>=2 && (state.profile.helpForm.length>0 || state.profile.helpOther.trim()) },
  { key:'growth', title:'What do you want to build while you’re here?', help:'Where would you like more reps, and what past work already says something about you?', render:renderGrowth, complete:()=>state.profile.growth.length>0 || !!state.profile.proud.trim() },
  { key:'support', title:'Where should the onboarding team lean in?', help:'Your answers here are included in the onboarding-team brief so we know where to guide, refresh, or get out of the way.', render:renderSupportMatrix, complete:()=>SUPPORT_TOPICS.every(t=>state.onboarding.support[t.id]!==null) },
  { key:'tools', title:'What about access and tools?', help:'Tell us what you can reach today, then where a demo would remove friction. Access can change over time.', render:renderToolMatrix, complete:()=>TOOL_TOPICS.every(t=>state.onboarding.tools[t.id]!==null) },
  { key:'learn', title:'When you are learning something new, what works best?', help:'Pick more than one. This helps us choose between a reference, demo, pairing session, practice task, or real-world experience.', render:renderLearning, complete:()=>state.onboarding.learningModes.length>0 && !!state.onboarding.pace },
  { key:'hospitality', title:'The important stuff.', help:'Optional. Small details help us welcome and celebrate teammates thoughtfully.', render:renderHospitality, complete:()=>!!(state.profile.birthday || state.profile.snack.trim() || state.profile.drink.trim() || state.profile.celebration) },
];

const MODULES = [
  { id:'meet', title:'Meet Me', start:0, end:2, indices:[0,1,2], output:'intro', accent:'#1282CA', time:'~3 min' },
  { id:'work', title:'How I Work', start:3, end:6, indices:[3,4,5,6], output:'manual', accent:'#F15A22', time:'~5 min' },
  { id:'onboarding', title:'Show Me Around', start:7, end:9, indices:[7,8,9], output:'onboarding', accent:'#fed727', time:'~4 min' },
  { id:'hospitality', title:'The Important Stuff', start:10, end:10, indices:[10], output:null, accent:'#e5018c', time:'~2 min' },
];
function moduleById(id){ return MODULES.find(m=>m.id===id); }
function moduleForStep(i){ return MODULES.find(m=>m.indices.includes(i)); }
function moduleComplete(id){ const m=moduleById(id); return !!m && m.indices.every(i=>steps[i].complete()); }
function moduleStarted(id){ const m=moduleById(id); return !!m && m.indices.some(i=>steps[i].complete()); }
function nextIncompleteModule(excludeId=''){ return MODULES.find(m=>m.id!==excludeId && !moduleComplete(m.id)); }
function startModule(id){ const m=moduleById(id); if(!m)return; state.ui.checkpoint=''; state.route='home'; state.wizard=true; const incomplete=m.indices.find(i=>!steps[i].complete()); state.step=incomplete===undefined?m.start:incomplete; saveState(); render(); window.scrollTo(0,0); }
function anyOnboardingData(){ return state.onboarding.learningModes.length>0 || !!state.onboarding.pace || state.onboarding.access.length>0 || Object.values(state.onboarding.support).some(v=>v!==null) || Object.values(state.onboarding.tools).some(v=>v!==null); }

function loadState(){
  try {
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(saved) return deepMerge(structuredClone(DEFAULT_STATE),saved);
    const legacy=JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    return legacy?deepMerge(structuredClone(DEFAULT_STATE),legacy):structuredClone(DEFAULT_STATE);
  } catch { return structuredClone(DEFAULT_STATE); }
}
function deepMerge(target,source){ for(const [k,v] of Object.entries(source||{})){ if(v&&typeof v==='object'&&!Array.isArray(v)&&target[k]&&typeof target[k]==='object') deepMerge(target[k],v); else target[k]=v; } return target; }
function saveState(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
function announce(msg){ liveRegion.textContent=msg; }
function escapeHTML(str=''){ return String(str).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function initials(name=''){ return name.trim().split(/\s+/).slice(0,2).map(x=>x[0]?.toUpperCase()).join('')||'YOU'; }
function skillLabel(id){ return POWER_SKILLS.find(s=>s.id===id)?.label||id; }
function supportMeta(value){ if(value===null||value===undefined)return {value:null,short:'Not answered',label:'Not answered yet',className:'pending'}; return SUPPORT_LEVELS.find(x=>x.value===Number(value))||SUPPORT_LEVELS[1]; }
function completedSteps(){ return steps.filter(s=>s.complete()).length; }
function completionPercent(){ return Math.round(completedSteps()/steps.length*100); }
function firstIncompleteStep(){ const i=steps.findIndex(s=>!s.complete()); return i===-1?steps.length-1:i; }
function hasAnyProfileData(){ return !!(state.profile.name || state.profile.intro || state.profile.strengths.length || state.onboarding.learningModes.length || Object.values(state.onboarding.support).some(v=>v!==null)); }
function hasManualData(){ const p=state.profile; return !!(p.name || p.intro || p.fun || p.knowTooMuch || p.askMeAbout || p.strengths.length || p.growth.length || p.communicationStyle || p.workingStyle || p.teamMakesGreat.length || p.feedback.length || p.proud); }

function setRoute(route){
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
document.addEventListener('click',e=>{const routeBtn=e.target.closest('[data-route]');if(routeBtn)setRoute(routeBtn.dataset.route);});
backupInput.addEventListener('change',importBackup);
tourButton.addEventListener('click',launchTour);


const WELCOME_FRAMES = [
  {
    kicker:'WELCOME ABOARD',
    title:'You are here. And for good reason.',
    body:'TANG works because different people bring different instincts, experiences, questions, and ways of seeing the mission.',
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
  { selector:'.outputs-section', eyebrow:'6 / 6 · WRAP IT UP', title:'Finish by handing three things back', text:'When your Manual is ready, download your Manual of Me, teammate intro card, and onboarding brief. The final screen tells you exactly what to send to TANG Onboarding by Slack or email.' },
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
          <p class="welcome-line">WELCOME ABOARD · YOU ARE HERE FOR A REASON</p>
          <h1>Build your <span class="scribble">Manual of Me.</span></h1>
          <p class="lede">We don’t just hand you a checklist. Tell us how you work, what you want to learn, and where support would actually help. We’ll use it to make your onboarding more useful from the start.</p>
          <div class="hero-actions">
            <button class="btn primary" id="startWizard">${hasStarted?`Continue my manual · ${pct}%`:'Start my manual'}</button>
            <button class="btn light" data-route="examples">See example outputs</button><button class="btn text" id="importProfileHome">Import saved profile</button>
          </div>
          <div class="notice"><strong>A note before you start:</strong> your answers are saved only in this browser. Enter only information you are comfortable sharing with your team. Do not enter CUI, classified, export-controlled, or sensitive mission information.</div>
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
  document.querySelector('#startWizard').addEventListener('click',()=>{state.wizard=true;state.step=hasStarted?firstIncompleteStep():0;saveState();render();window.scrollTo(0,0);});
  document.querySelector('#importProfileHome').addEventListener('click',()=>backupInput.click());
  document.querySelectorAll('.module-card').forEach((el,i)=>el.addEventListener('click',()=>startModule(MODULES[i].id)));
}
function moduleCard(mark,title,desc,status,accent){ return `<button class="card module-card" style="--accent:${accent};text-align:left" type="button"><span class="graphic-mark">${mark}</span><h3>${title}</h3><p class="muted">${desc}</p><div class="module-meta"><span>~${title==='Meet Me'?'3':title==='How I Work'?'5':title==='Show Me Around'?'4':'2'} min</span><span class="module-state badge ${status==='Done'?'public':''}">${status}</span></div></button>`; }
function stepStatus(indices){ const done=indices.filter(i=>steps[i].complete()).length; return done===indices.length?'Done':done?'In progress':'Start'; }
function manualPreview(){ return `<button class="card output-card" data-route="examples"><div class="mini-manual"><div class="mini-head"><span>JM</span><b>MANUAL OF ME</b></div><div class="mini-line wide"></div><div class="mini-chip-row"><i></i><i></i><i></i></div><div class="mini-grid"><i></i><i></i><i></i><i></i></div></div><h3>Manual of Me</h3><p class="muted">The scan-before-a-kickoff version of how you work, what you bring, and what teammates should know.</p><span class="text-link">Preview manual →</span></button>`; }
function introPreview(){ return `<button class="card output-card" data-route="examples"><div class="mini-intro"><span class="mini-photo">JM</span><b>NEW TEAMMATE<br>UNLOCKED</b><i>BRINGS</i><strong>Curiosity · Empathy</strong><i>ASK ME ABOUT</i><strong>Design + Pokémon</strong></div><h3>Slack intro card</h3><p class="muted">A compact photo card and intro message you can send without writing another bio from scratch.</p><span class="text-link">See the card →</span></button>`; }
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
  document.querySelector('#saveExit').addEventListener('click',()=>{saveState();state.wizard=false;state.route='home';render();toast('Progress saved on this device.');});
  document.querySelector('#backBtn').addEventListener('click',()=>{if(state.step===0){state.wizard=false;state.route='home';saveState();render();window.scrollTo(0,0);}else{state.step--;saveState();render();}});
  document.querySelector('#skipBtn').addEventListener('click',()=>advanceWizard(true));
  document.querySelector('#nextBtn').addEventListener('click',()=>advanceWizard(false));
  app.focus({preventScroll:true});
}
function chapterForStep(i){ if(i<=2)return 'Meet Me'; if(i<=6)return 'How I Work'; if(i<=9)return 'Show Me Around'; return 'The Important Stuff'; }
function advanceWizard(skipped){
  if(!skipped&&state.step===0&&!state.profile.name.trim()){toast('Add your name so we know whose Manual this is.');return;}
  saveState();
  const currentModule=moduleForStep(state.step);
  const reachedModuleEnd=currentModule && state.step===currentModule.end;
  if(state.step<steps.length-1){
    if(reachedModuleEnd && moduleComplete(currentModule.id) && currentModule.id!=='hospitality'){
      state.wizard=false;state.route='checkpoint';state.ui.checkpoint=currentModule.id;saveState();render();window.scrollTo(0,0);return;
    }
    state.step++;render();window.scrollTo(0,0);
  }else{
    state.wizard=false;state.route='outro';state.ui.outroSeen=true;state.ui.checkpoint='';saveState();render();
  }
}

function renderIdentity(root){
  const orgField = state.profile.connectionType==='APL teammate'
    ? `<div class="field"><label for="organization">Which APL area are you joining from?</label><select id="organization"><option value="">Choose one</option>${APL_GROUPS.map(x=>`<option ${state.profile.organization===x?'selected':''}>${x}</option>`).join('')}</select></div>`
    : state.profile.connectionType==='TANG partner'
      ? `<div class="field"><label for="organization">Which TANG partner are you with?</label><select id="organization"><option value="">Choose one</option>${TANG_PARTNERS.map(x=>`<option ${state.profile.organization===x?'selected':''}>${x}</option>`).join('')}</select></div>`
      : state.profile.connectionType
        ? `<div class="field"><label for="organization">Organization / team <span class="muted">optional</span></label><input id="organization" value="${escapeHTML(state.profile.organization)}" placeholder="Whatever will help teammates place you"></div>`:'';
  root.innerHTML=`
    <div class="split"><div class="field"><label for="name">What should we call you?</label><input id="name" type="text" maxlength="80" value="${escapeHTML(state.profile.name)}" placeholder="Your name"></div><div class="field"><label for="pronouns">Pronouns <span class="muted">optional</span></label><input id="pronouns" type="text" maxlength="40" value="${escapeHTML(state.profile.pronouns)}" placeholder="e.g., she/her"></div></div>
    <div class="field"><span class="label">What point in your career are you joining TANG?</span><div class="choice-grid three compact-choices">${CAREER_STAGES.map(x=>`<button type="button" class="choice ${state.profile.careerStage===x?'selected':''}" data-career="${x}"><strong>${x}</strong></button>`).join('')}</div></div>
    <div class="field"><span class="label">How are you connected to TANG?</span><div class="choice-grid two compact-choices">${CONNECTION_TYPES.map(x=>`<button type="button" class="choice ${state.profile.connectionType===x?'selected':''}" data-connection="${x}"><strong>${x}</strong></button>`).join('')}</div><small>This helps us tailor internal links, access expectations, and who can help you get connected.</small></div>
    ${orgField}
    <div class="photo-upload"><div class="photo-preview" id="photoPreview">${state.profile.photo?`<img src="${state.profile.photo}" alt="Your uploaded profile">`:'<span class="photo-mark">PHOTO</span>'}</div><div><strong>Add a photo</strong><p class="muted small">Optional now. It can travel with your Slack intro card, bio, and future team directory profile.</p><input id="photo" type="file" accept="image/*"></div></div>`;
  bindValue('#name',v=>state.profile.name=v);bindValue('#pronouns',v=>state.profile.pronouns=v);
  root.querySelectorAll('[data-career]').forEach(b=>b.addEventListener('click',()=>{state.profile.careerStage=b.dataset.career;saveState();renderWizard();}));
  root.querySelectorAll('[data-connection]').forEach(b=>b.addEventListener('click',()=>{state.profile.connectionType=b.dataset.connection;state.profile.organization='';saveState();renderWizard();}));
  if(document.querySelector('#organization'))bindValue('#organization',v=>state.profile.organization=v,state.profile.connectionType==='APL teammate'||state.profile.connectionType==='TANG partner'?'change':'input');
  document.querySelector('#photo').addEventListener('change',handlePhoto);
}
function handlePhoto(e){const file=e.target.files?.[0];if(!file)return;const r=new FileReader();r.onload=()=>resizeImage(r.result,720,720,.82).then(data=>{state.profile.photo=data;saveState();renderWizard();});r.readAsDataURL(file);}
function resizeImage(src,maxW,maxH,quality=.82){return new Promise(resolve=>{const img=new Image();img.onload=()=>{const scale=Math.min(1,maxW/img.width,maxH/img.height);const c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',quality));};img.src=src;});}

function renderStory(root){
  root.innerHTML=`<div class="prompt-layout"><div><div class="field"><label for="intro">The 30-second version</label><textarea id="intro" maxlength="360" placeholder="A couple sentences that sound like you, not a résumé.">${escapeHTML(state.profile.intro)}</textarea><small>Aim for 2–4 sentences. This can become the starting point for your bio and intro message later.</small></div></div>
  <aside class="prompt-coach"><span class="coach-label">IF YOU’RE STUCK, TRY ONE</span><p>What kind of work do you do?</p><p>What brought you to this team?</p><p>What kinds of problems energize you?</p><p>What should teammates know that your title will never tell them?</p></aside></div>
  <div class="field"><label for="location">Where are you from / what places feel like home?</label><input id="location" maxlength="100" type="text" value="${escapeHTML(state.profile.location)}" placeholder="Louisville → Maryland, or whatever feels right"></div>`;
  bindValue('#intro',v=>state.profile.intro=v);bindValue('#location',v=>state.profile.location=v);
}
function renderHuman(root){
  root.innerHTML=`<div class="split"><div class="field"><label for="fun">Outside of work, I’m usually…</label><textarea id="fun" maxlength="180" placeholder="Hobbies, people, pets, sports, side quests…">${escapeHTML(state.profile.fun)}</textarea></div><div class="field"><label for="know">I know way too much about…</label><textarea id="know" maxlength="180" placeholder="The perfect low-stakes conversation starter">${escapeHTML(state.profile.knowTooMuch)}</textarea></div></div><div class="field"><label for="ask">Ask me about…</label><input id="ask" maxlength="100" type="text" value="${escapeHTML(state.profile.askMeAbout)}" placeholder="A topic you would happily talk about"></div>`;
  bindValue('#fun',v=>state.profile.fun=v);bindValue('#know',v=>state.profile.knowTooMuch=v);bindValue('#ask',v=>state.profile.askMeAbout=v);
}
function renderStrengths(root){
  root.innerHTML=`<div class="chips">${POWER_SKILLS.map(s=>`<button type="button" class="chip ${s.core?'core':''} ${state.profile.strengths.includes(s.id)?'selected':''}" data-skill="${s.id}" title="${escapeHTML(s.desc)}">${s.label}${s.core?' ★':''}</button>`).join('')}</div>
  <div class="inline-callout">★ The first five are core day-to-day TANG Power Skills. You do <strong>not</strong> need to select all of them here; choose what feels most naturally yours right now.</div>
  <div class="card flat side-quest"><div class="card-title-row"><div><strong>Optional side quest: Creativity Archetype</strong><p class="small muted">Take the playful TANG reflection, then paste your result here if you want it to travel with your Manual.</p></div><a class="btn light" href="https://jgmurr09.github.io/creativity-archetype/" target="_blank" rel="noreferrer">Take the quiz ↗</a></div><div class="field" style="margin:15px 0 0"><label for="archetype">My result <span class="muted">optional</span></label><input id="archetype" maxlength="120" type="text" value="${escapeHTML(state.profile.archetype)}" placeholder="e.g., The Human Radar with Possibility Machine energy"></div></div>`;
  root.querySelectorAll('[data-skill]').forEach(b=>b.addEventListener('click',()=>toggleLimited(state.profile.strengths,b.dataset.skill,4,()=>renderWizard())));bindValue('#archetype',v=>state.profile.archetype=v);
}
function renderWorkStyle(root){
  const teamOptions=['Trust','Clarity','Candor','Curiosity','Momentum','Psychological safety','Shared ownership','Humor'];
  const feedbackOpts=['Direct + specific','Conversational','Written first','1:1','In the moment','Give me time to process'];
  root.innerHTML=`<div class="split"><div class="field"><label for="comms">In one word, my communication style is…</label><input id="comms" maxlength="50" value="${escapeHTML(state.profile.communicationStyle)}" placeholder="Direct? Thoughtful? Energetic?"></div><div class="field"><label for="workstyle">In one word, my working style is…</label><input id="workstyle" maxlength="50" value="${escapeHTML(state.profile.workingStyle)}" placeholder="Iterative? Structured? Collaborative?"></div></div>
  <div class="field"><span class="label">An effective team has… <span class="muted">pick up to 3</span></span><div class="chips">${teamOptions.map(x=>chipText(x,state.profile.teamMakesGreat,'team')).join('')}</div><input class="other-input" id="teamOther" maxlength="80" value="${escapeHTML(state.profile.teamOther)}" placeholder="Or add your own…"></div>
  <div class="field"><span class="label">Feedback lands best when it’s… <span class="muted">pick up to 3</span></span><div class="choice-grid three">${feedbackOpts.map(x=>choiceToggle(x,state.profile.feedback,'feedback')).join('')}</div><input class="other-input" id="feedbackOther" maxlength="80" value="${escapeHTML(state.profile.feedbackOther)}" placeholder="Or describe it in your own words…"></div>`;
  bindValue('#comms',v=>state.profile.communicationStyle=v);bindValue('#workstyle',v=>state.profile.workingStyle=v);bindValue('#teamOther',v=>state.profile.teamOther=v);bindValue('#feedbackOther',v=>state.profile.feedbackOther=v);
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
  root.innerHTML=`<div class="field"><span class="label">I want more chances to practice… <span class="muted">pick up to 4</span></span><div class="chips">${POWER_SKILLS.map(s=>`<button type="button" class="chip ${state.profile.growth.includes(s.id)?'selected':''}" data-growth="${s.id}">${s.label}</button>`).join('')}</div></div>
  <div class="field"><label for="proud">Tell us about something you’ve done that you’re proud of.</label><textarea id="proud" maxlength="280" placeholder="A project, moment, role, or tiny win that says something about how you work.">${escapeHTML(state.profile.proud)}</textarea><small>A story is more useful here than a résumé bullet.</small></div>`;
  root.querySelectorAll('[data-growth]').forEach(b=>b.addEventListener('click',()=>toggleLimited(state.profile.growth,b.dataset.growth,4,()=>renderWizard())));bindValue('#proud',v=>state.profile.proud=v);
}
function renderSupportMatrix(root){
  const nameQuick=!state.profile.name.trim()?`<div class="field quick-name"><label for="onboardingQuickName">Whose onboarding brief is this?</label><input id="onboardingQuickName" maxlength="80" value="${escapeHTML(state.profile.name)}" placeholder="Your name"><small>You can build the onboarding section first. This name simply labels the export.</small></div>`:'';
  root.innerHTML=`${nameQuick}<div class="inline-callout"><strong>This travels to the onboarding team.</strong> We’ll use it to decide where to guide, refresh, connect you with someone, or simply let you get moving.</div>${matrixHTML(SUPPORT_TOPICS,state.onboarding.support,'support')}`;
  if(document.querySelector('#onboardingQuickName'))bindValue('#onboardingQuickName',v=>state.profile.name=v);
  bindMatrix(root,'support',state.onboarding.support);
}
function renderToolMatrix(root){root.innerHTML=`<div class="field"><span class="label">What can you access right now? <span class="muted">pick all that apply</span></span><div class="chips">${ACCESS_OPTIONS.map(x=>chipText(x,state.onboarding.access,'access')).join('')}</div></div><div class="inline-callout">Tool mastery is not the goal. This is about knowing when a quick demo removes friction and when you can just get moving.</div>${matrixHTML(TOOL_TOPICS,state.onboarding.tools,'tools')}`;bindMatrix(root,'tools',state.onboarding.tools);root.querySelectorAll('[data-access]').forEach(b=>b.addEventListener('click',()=>toggle(state.onboarding.access,b.dataset.access,()=>renderWizard())));}
function matrixHTML(topics,obj,key){return `<div class="matrix"><div class="matrix-row header"><div class="topic">Topic</div>${SUPPORT_LEVELS.map(l=>`<div>${l.short}</div>`).join('')}</div>${topics.map(t=>`<div class="matrix-row"><div class="topic">${t.label}</div>${SUPPORT_LEVELS.map(l=>`<div><button type="button" data-matrix="${key}" data-topic="${t.id}" data-value="${l.value}" class="${Number(obj[t.id])===l.value&&obj[t.id]!==null?'selected':''}">${Number(obj[t.id])===l.value&&obj[t.id]!==null?'✓':''}<span class="sr-only">${l.label} for ${t.label}</span></button></div>`).join('')}</div>`).join('')}</div>`;}
function bindMatrix(root,key,obj){root.querySelectorAll(`[data-matrix="${key}"]`).forEach(b=>b.addEventListener('click',()=>{obj[b.dataset.topic]=Number(b.dataset.value);saveState();renderWizard();}));}
function renderLearning(root){
  root.innerHTML=`<div class="choice-grid">${LEARNING_MODES.map(m=>`<button type="button" class="choice learning-choice ${state.onboarding.learningModes.includes(m.id)?'selected':''}" data-learn="${m.id}"><span class="learn-mark">${m.mark}</span><strong>${m.title}</strong><small>${m.text}</small></button>`).join('')}</div>
  <div class="field" style="margin-top:22px"><span class="label">What pace sounds best?</span><div class="choice-grid three">${['Give me the essentials now','One useful thing at a time','Let me browse when I need it'].map(x=>`<button type="button" class="choice ${state.onboarding.pace===x?'selected':''}" data-pace="${x}"><strong>${x}</strong></button>`).join('')}</div></div>`;
  root.querySelectorAll('[data-learn]').forEach(b=>b.addEventListener('click',()=>toggle(state.onboarding.learningModes,b.dataset.learn,()=>renderWizard())));root.querySelectorAll('[data-pace]').forEach(b=>b.addEventListener('click',()=>{state.onboarding.pace=b.dataset.pace;saveState();renderWizard();}));
}
function renderHospitality(root){
  const celebrate=['Food / treats','A funny shoutout','Coffee / drink','Team outing','Keep it small + low-key','I’d rather not make it a thing'];
  root.innerHTML=`<div class="split"><div class="field"><label for="birthday">Birthday <span class="muted">optional</span></label><input id="birthday" type="date" value="${escapeHTML(state.profile.birthday)}"><small>Only add it if you want the onboarding team to know.</small></div><div class="field"><label for="snack">Favorite snack / candy</label><input id="snack" maxlength="80" value="${escapeHTML(state.profile.snack)}" placeholder="Useful morale intel"></div></div>
  <div class="field"><label for="drink">Favorite beverage / coffee order</label><input id="drink" maxlength="80" value="${escapeHTML(state.profile.drink)}" placeholder="Coffee, tea, Diet Coke, anything else"></div>
  <div class="field"><span class="label">If there’s a reason to celebrate me, I’d prefer…</span><div class="choice-grid three">${celebrate.map(x=>`<button type="button" class="choice ${state.profile.celebration===x?'selected':''}" data-celebrate="${x}"><strong>${x}</strong></button>`).join('')}</div></div>`;
  bindValue('#birthday',v=>state.profile.birthday=v,'change');bindValue('#snack',v=>state.profile.snack=v);bindValue('#drink',v=>state.profile.drink=v);root.querySelectorAll('[data-celebrate]').forEach(b=>b.addEventListener('click',()=>{state.profile.celebration=b.dataset.celebrate;saveState();renderWizard();}));
}
function bindValue(selector,setter,event='input'){const el=document.querySelector(selector);if(!el)return;el.addEventListener(event,e=>{setter(e.target.value);saveState();});}
function toggle(arr,val,cb){const i=arr.indexOf(val);if(i>=0)arr.splice(i,1);else arr.push(val);saveState();cb?.();}
function toggleLimited(arr,val,max,cb){const i=arr.indexOf(val);if(i>=0)arr.splice(i,1);else if(arr.length<max)arr.push(val);else return toast(`Pick up to ${max}. You can change these anytime.`);saveState();cb?.();}
function chipText(x,arr,key){return `<button type="button" class="chip ${arr.includes(x)?'selected':''}" data-${key}="${x}">${x}</button>`;}
function choiceToggle(x,arr,key){return `<button type="button" class="choice ${arr.includes(x)?'selected':''}" data-${key}="${x}"><strong>${x}</strong></button>`;}

function feedbackText(){return [...state.profile.feedback,state.profile.feedbackOther].filter(Boolean).join(' · ');}
function teamText(){return [...state.profile.teamMakesGreat,state.profile.teamOther].filter(Boolean).join(' · ');}
function helpText(){return [...state.profile.helpForm,state.profile.helpOther].filter(Boolean).join(' · ');}
function connectionText(){return [state.profile.careerStage,state.profile.connectionType,state.profile.organization].filter(Boolean).join(' · ');}
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
    <div class="profile-head"><div class="profile-photo">${p.photo?`<img src="${p.photo}" alt="${escapeHTML(p.name)}">`:escapeHTML(initials(p.name))}</div><div><span class="eyebrow">Manual of Me</span><h1>${escapeHTML(p.name||'Your Manual')}</h1><p class="lede" style="font-size:18px;margin:0">${escapeHTML(p.archetype||connectionText()||p.intro||'A quick guide to working with me.')}</p></div><div class="profile-actions"><button class="btn primary" id="editManual">Edit answers</button><button class="btn light" id="downloadBackup">Download all answers</button></div></div>
    <div class="manual-grid">
      <div class="card manual-section span-2"><h3>The 30-second version</h3><p class="quote">${escapeHTML(p.intro||'Add your short introduction to make this feel like you.')}</p><div class="manual-badges">${p.location?`<span class="badge">FROM · ${escapeHTML(p.location)}</span>`:''}${connectionText()?`<span class="badge">${escapeHTML(connectionText())}</span>`:''}${p.pronouns?`<span class="badge">${escapeHTML(p.pronouns)}</span>`:''}</div></div>
      <div class="card manual-section"><h3>Beyond the work</h3><div class="definition-list"><div class="definition-item"><span>I’m usually</span><strong>${escapeHTML(p.fun||'—')}</strong></div><div class="definition-item"><span>I know way too much about</span><strong>${escapeHTML(p.knowTooMuch||'—')}</strong></div><div class="definition-item"><span>Ask me about</span><strong>${escapeHTML(p.askMeAbout||'—')}</strong></div></div></div>
      <div class="card manual-section"><h3>What I bring</h3><div class="chips">${p.strengths.length?p.strengths.map(s=>`<span class="chip selected">${escapeHTML(skillLabel(s))}</span>`).join(''):'<span class="muted">Choose Power Skills in the Manual.</span>'}</div>${p.proud?`<div class="definition-item top-gap"><span>Something I’m proud of</span><p>${escapeHTML(p.proud)}</p></div>`:''}</div>
      <div class="card manual-section"><h3>Working with me</h3><div class="definition-list"><div class="definition-item"><span>Communication style</span><strong>${escapeHTML(p.communicationStyle||'—')}</strong></div><div class="definition-item"><span>Working style</span><strong>${escapeHTML(p.workingStyle||'—')}</strong></div><div class="definition-item"><span>Feedback works best</span><strong>${escapeHTML(feedbackText()||'—')}</strong></div><div class="definition-item"><span>A good team has</span><strong>${escapeHTML(teamText()||'—')}</strong></div></div></div>
      <div class="card manual-section"><h3>I do my best work when</h3><div class="spectrum-summary">${SPECTRA.map(s=>`<div><span>${s.left}</span><b>${state.profile.bestSpectrum[s.id]===null?'—':state.profile.bestSpectrum[s.id]+1}/5</b><span>${s.right}</span></div>`).join('')}</div>${p.bestWhenOther?`<div class="definition-item top-gap"><span>Also</span><strong>${escapeHTML(p.bestWhenOther)}</strong></div>`:''}</div>
      <div class="card manual-section"><h3>Help me get unstuck</h3><div class="definition-list"><div class="definition-item"><span>Help by</span><strong>${escapeHTML(helpText()||'—')}</strong></div><div class="definition-item"><span>I organize through</span><strong>${escapeHTML(p.organize||'—')}</strong></div>${p.stress?`<div class="definition-item"><span>Under stress you might notice</span><strong>${escapeHTML(p.stress)}</strong></div>`:''}</div></div>
      <div class="card manual-section"><h3>What I’m building</h3><div class="chips">${p.growth.length?p.growth.map(s=>`<span class="chip">${escapeHTML(skillLabel(s))}</span>`).join(''):'<span class="muted">Add growth skills when you are ready.</span>'}</div></div>
      <div class="card manual-section"><h3>Onboarding me</h3><div class="definition-list"><div class="definition-item"><span>Learning preference</span><strong>${escapeHTML(onboardingModes||'—')}</strong></div><div class="definition-item"><span>Pace</span><strong>${escapeHTML(state.onboarding.pace||'—')}</strong></div><div class="definition-item"><span>Where to lean in</span><strong>${escapeHTML(supportSummaryList().filter(x=>x.meta.value<=1).map(x=>x.label).join(' · ')||'—')}</strong></div></div></div>
      <div class="card manual-section"><h3>Good to know</h3><div class="definition-list"><div class="definition-item"><span>Birthday</span><strong>${escapeHTML(p.birthday||'—')}</strong></div><div class="definition-item"><span>Snack</span><strong>${escapeHTML(p.snack||'—')}</strong></div><div class="definition-item"><span>Drink</span><strong>${escapeHTML(p.drink||'—')}</strong></div><div class="definition-item"><span>Celebrations</span><strong>${escapeHTML(p.celebration||'—')}</strong></div></div></div>
    </div>

    <section class="export-section"><div class="section-head"><div><span class="eyebrow">Export</span><h2>Your Manual card</h2><p class="muted">The export automatically adds space, reflows neighboring fields, and scales longer answers so the Manual stays readable.</p></div></div><div class="canvas-wrap"><canvas id="manualCanvas" width="1600" height="2350"></canvas></div><div class="export-toolbar"><button class="btn dark" id="downloadManual">Download Manual PNG</button><button class="btn light" id="printManual">Print / Save as PDF</button></div></section>
    <section class="export-section"><div class="section-head"><div><span class="eyebrow">Slack-ready</span><h2>Your intro card</h2><p class="muted">The facts stay yours; the visual treatment can shuffle.</p></div><button class="btn light" id="shuffleCard">Shuffle design ↻</button></div><div class="canvas-wrap"><canvas id="introCanvas" width="1080" height="1350"></canvas></div><div class="export-toolbar"><button class="btn orange" id="downloadIntro">Download intro PNG</button><button class="btn light" id="copyIntro">Copy Slack intro text</button></div></section>
  </div>`;
  drawManualCanvas();drawIntroCanvas();
  document.querySelector('#editManual').addEventListener('click',()=>{state.wizard=true;state.step=0;saveState();render();});document.querySelector('#downloadBackup').addEventListener('click',downloadBackup);document.querySelector('#downloadManual').addEventListener('click',()=>downloadCanvas('manualCanvas',`${slug(p.name||'tang')}-manual-of-me.png`));document.querySelector('#printManual').addEventListener('click',printManual);document.querySelector('#shuffleCard').addEventListener('click',()=>{state.cardTemplate=(state.cardTemplate+1)%3;saveState();drawIntroCanvas();});document.querySelector('#downloadIntro').addEventListener('click',()=>downloadCanvas('introCanvas',`${slug(p.name||'tang')}-intro-card.png`));document.querySelector('#copyIntro').addEventListener('click',copyIntroText);
}
function emptyManual(){
  const onboardReady=moduleComplete('onboarding');
  app.innerHTML=`<div class="shell"><div class="empty-state"><div class="graphic-mark large">ME</div><h2>Your Manual is waiting for you.</h2><p class="muted">${onboardReady?'Your onboarding brief is already ready. This is the teammate-facing side: a few bite-sized prompts about who you are and how you work.':'Answer a handful of bite-sized prompts and this page will turn into a shareable profile.'}</p><button class="btn primary" id="emptyStart">${onboardReady?'Build Meet Me next':'Start my manual'}</button>${onboardReady?'<button class="btn light" data-route="onboarding">Back to my onboarding brief</button>':''}</div></div>`;
  document.querySelector('#emptyStart').addEventListener('click',()=>startModule('meet'));
}

function drawManualCanvas(){
  const c=document.querySelector('#manualCanvas');if(!c)return;const p=state.profile;
  // Measure first, then resize the export so long answers create more room instead of colliding.
  let measureCtx=c.getContext('2d');
  const beyond=[p.fun&&`Usually: ${p.fun}`,p.knowTooMuch&&`Knows too much about: ${p.knowTooMuch}`,p.askMeAbout&&`Ask me about: ${p.askMeAbout}`].filter(Boolean).join('   •   ');
  const onboard=[state.onboarding.pace, state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean).join(' + '), supportSummaryList().filter(x=>x.meta.value<=1).map(x=>`Lean in: ${x.label}`).join(' · ')].filter(Boolean).join('   •   ');
  const good=[p.birthday&&`Birthday: ${p.birthday}`,p.snack&&`Snack: ${p.snack}`,p.drink&&`Drink: ${p.drink}`,p.celebration&&`Celebrate: ${p.celebration}`].filter(Boolean).join('   •   ');
  let measuredY=335;
  measuredY+=measureCanvasSection(measureCtx,p.intro||'Add a short introduction.',1420,40);
  measuredY+=measureCanvasPills(measureCtx,p.strengths.map(skillLabel),1420);
  measuredY+=measureCanvasTwoCol(measureCtx,[['COMMUNICATION',p.communicationStyle||'—'],['WORKING STYLE',p.workingStyle||'—'],['FEEDBACK',feedbackText()||'—'],['A GOOD TEAM HAS',teamText()||'—']],1420);
  measuredY+=measureCanvasSection(measureCtx,spectrumSummary().join(' · ')||'—',1420,29);
  measuredY+=measureCanvasSection(measureCtx,helpText()||'—',1420,29);
  measuredY+=measureCanvasPills(measureCtx,p.growth.map(skillLabel),1420);
  measuredY+=measureCanvasSection(measureCtx,beyond||'Add a hobby, niche expertise, or conversation starter.',1420,26);
  measuredY+=measureCanvasSection(measureCtx,onboard||'Add onboarding preferences.',1420,26);
  measuredY+=measureCanvasSection(measureCtx,good||'Optional hospitality notes.',1420,24);
  c.width=1600;
  c.height=Math.max(2350,Math.ceil(measuredY+250));
  const ctx=c.getContext('2d');

  ctx.fillStyle='#f5f3ee';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle=COLORS.navy;ctx.fillRect(0,0,c.width,270);
  [COLORS.blue,COLORS.orange,COLORS.yellow,COLORS.pink].forEach((col,i)=>{ctx.fillStyle=col;ctx.fillRect(i*400,260,400,10);});
  drawCanvasPhoto(ctx,p.photo,95,72,150,150,p.name);ctx.fillStyle='white';ctx.font='700 68px Arial';ctx.fillText(p.name||'Your Name',280,130);ctx.font='400 28px Arial';ctx.fillStyle='#c9d2dd';ctx.fillText('MANUAL OF ME · TANG ONBOARDING',282,184);
  drawTangLogo(ctx,1260,72,250);

  let y=335;
  y=canvasSection(ctx,'THE 30-SECOND VERSION',p.intro||'Add a short introduction.',90,y,1420,40);
  y=canvasPills(ctx,'WHAT I BRING',p.strengths.map(skillLabel),90,y,1420);
  y=canvasTwoCol(ctx,y,[['COMMUNICATION',p.communicationStyle||'—'],['WORKING STYLE',p.workingStyle||'—'],['FEEDBACK',feedbackText()||'—'],['A GOOD TEAM HAS',teamText()||'—']],90,1420);
  y=canvasSection(ctx,'I DO MY BEST WORK WHEN',spectrumSummary().join(' · ')||'—',90,y,1420,29);
  y=canvasSection(ctx,'WHEN I’M STUCK, HELP BY',helpText()||'—',90,y,1420,29);
  y=canvasPills(ctx,'I WANT TO BUILD',p.growth.map(skillLabel),90,y,1420);
  y=canvasSection(ctx,'BEYOND THE WORK',beyond||'Add a hobby, niche expertise, or conversation starter.',90,y,1420,26);
  y=canvasSection(ctx,'ONBOARDING ME',onboard||'Add onboarding preferences.',90,y,1420,26);
  y=canvasSection(ctx,'GOOD TO KNOW',good||'Optional hospitality notes.',90,y,1420,24);

  const footerY=Math.max(y+28,c.height-150);
  ctx.fillStyle=COLORS.navy;ctx.fillRect(90,footerY,1420,72);ctx.fillStyle='white';ctx.font='700 27px Arial';ctx.fillText('HUMAN CENTERED. MISSION FOCUSED.',120,footerY+47);ctx.fillStyle=COLORS.gray;ctx.font='400 21px Arial';ctx.fillText('Brought to you by TANG Onboarding · Review before sharing.',90,footerY+112);
}
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
function estimateWrapHeight(ctx,text,w,size,lineHeight){
  ctx.font=`400 ${size}px Arial`;const words=String(text).split(/\s+/).filter(Boolean);if(!words.length)return size*lineHeight;
  let line='',lines=1;
  for(const word of words){const test=line?line+word+' ':word+' ';if(ctx.measureText(test).width>w&&line){lines++;line=word+' ';}else line=test;}
  return lines*size*lineHeight;
}
function drawWrapped(ctx,text,x,y,maxWidth,lineHeight){
  const words=String(text).split(/\s+/).filter(Boolean);if(!words.length)return y;
  let line='';
  for(let n=0;n<words.length;n++){const test=line?line+words[n]+' ':words[n]+' ';if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line.trim(),x,y);line=words[n]+' ';y+=lineHeight;}else line=test;}
  ctx.fillText(line.trim(),x,y);return y;
}

function drawIntroCanvas(){
  const c=document.querySelector('#introCanvas');if(!c)return;const ctx=c.getContext('2d');const p=state.profile,t=state.cardTemplate;const schemes=[{bg:COLORS.navy,accent:COLORS.orange,ink:'#fff',sub:'#ced6df'},{bg:'#f5f3ee',accent:COLORS.blue,ink:COLORS.navy,sub:COLORS.gray},{bg:COLORS.blue,accent:COLORS.yellow,ink:'#fff',sub:'#e5f2fb'}],s=schemes[t];ctx.fillStyle=s.bg;ctx.fillRect(0,0,c.width,c.height);
  if(t===0){ctx.fillStyle=s.accent;ctx.fillRect(0,0,28,c.height);ctx.fillStyle=COLORS.blue;ctx.beginPath();ctx.arc(980,90,190,0,Math.PI*2);ctx.fill();}if(t===1){ctx.fillStyle=s.accent;ctx.fillRect(0,0,c.width,20);ctx.fillStyle=COLORS.orange;ctx.fillRect(760,0,320,20);}if(t===2){ctx.fillStyle=s.accent;ctx.save();ctx.translate(800,120);ctx.rotate(-.08);ctx.fillRect(-260,-55,500,125);ctx.restore();}
  drawCanvasPhoto(ctx,p.photo,72,72,230,230,p.name);ctx.fillStyle=s.ink;ctx.font='700 28px Arial';ctx.fillText(['NEW TEAMMATE UNLOCKED','FIELD GUIDE','TANG STARTER CARD'][t],340,105);ctx.font='700 64px Arial';drawWrapped(ctx,p.name||'Your Name',340,176,650,72);ctx.fillStyle=s.sub;ctx.font='400 24px Arial';ctx.fillText(p.archetype||p.workingStyle||'Ready to join the work',340,260);
  let y=360;const introBlocks=[];
  if(p.strengths.length)introBlocks.push(['BRINGS',p.strengths.slice(0,3).map(skillLabel).join(' · ')]);
  if(p.growth.length)introBlocks.push(['GROWING',p.growth.slice(0,3).map(skillLabel).join(' · ')]);
  if(p.knowTooMuch)introBlocks.push(['KNOWS WAY TOO MUCH ABOUT',p.knowTooMuch]);
  if(p.askMeAbout||p.fun)introBlocks.push(['ASK ME ABOUT',p.askMeAbout||p.fun]);
  const fuel=[p.snack,p.drink].filter(Boolean).join(' + ');if(fuel)introBlocks.push(['GOOD TO KNOW',fuel]);
  if(!introBlocks.length && p.intro)introBlocks.push(['THE 30-SECOND VERSION',p.intro]);
  introBlocks.slice(0,5).forEach(([label,text])=>{y=introBlock(ctx,label,text,72,y,936,s);});
  ctx.fillStyle=s.accent;roundRect(ctx,72,c.height-162,936,82,18,true);ctx.fillStyle=t===2?COLORS.navy:'#fff';ctx.font='700 28px Arial';ctx.fillText('HUMAN CENTERED. MISSION FOCUSED.',105,c.height-111);ctx.fillStyle=s.sub;ctx.font='400 18px Arial';ctx.fillText('Brought to you by TANG Onboarding · Review before sharing.',72,c.height-38);
  drawTangLogo(ctx,810,c.height-156,170,true);
}
function introBlock(ctx,label,text,x,y,w,s){ctx.fillStyle=s.sub;ctx.font='700 18px Arial';ctx.fillText(label,x,y);ctx.fillStyle=s.ink;ctx.font='700 34px Arial';const end=drawWrapped(ctx,text,x,y+42,w,42);return end+76;}
function drawCanvasPhoto(ctx,src,x,y,w,h,name){ctx.save();roundRect(ctx,x,y,w,h,28,false);ctx.clip();if(src){const img=new Image();img.onload=()=>{ctx.save();roundRect(ctx,x,y,w,h,28,false);ctx.clip();const r=Math.max(w/img.width,h/img.height),dw=img.width*r,dh=img.height*r;ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);ctx.restore();};img.src=src;}else{ctx.fillStyle=COLORS.orange;ctx.fillRect(x,y,w,h);ctx.fillStyle='white';ctx.font=`700 ${Math.round(w*.28)}px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(initials(name),x+w/2,y+h/2);ctx.textAlign='start';ctx.textBaseline='alphabetic';}ctx.restore();}
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
function downloadCanvas(id,filename){const c=document.querySelector('#'+id);if(!c)return toast('That export is not on this page yet.');const a=document.createElement('a');a.download=filename;a.href=c.toDataURL('image/png');a.click();toast('Downloaded.');}
function printManual(){const c=document.querySelector('#manualCanvas');const win=window.open('','_blank');if(!win)return toast('Pop-up blocked. Try Download Manual PNG instead.');win.document.write(`<title>Manual of Me</title><style>body{margin:0;display:grid;place-items:center;background:#eee}img{max-width:100%;height:auto}@media print{body{background:white}img{width:100%}}</style><img src="${c.toDataURL('image/png')}"><script>setTimeout(()=>window.print(),400)<\/script>`);win.document.close();}
function copyIntroText(){const p=state.profile;const text=`Meet ${p.name||'our newest teammate'}!\n\n${p.intro||''}\n\nBrings: ${p.strengths.map(skillLabel).join(', ')||'—'}\nWants to grow: ${p.growth.map(skillLabel).join(', ')||'—'}\nKnows way too much about: ${p.knowTooMuch||'—'}\nAsk ${p.name?.split(' ')[0]||'them'} about: ${p.askMeAbout||p.fun||'—'}\nGood to know: ${[p.snack,p.drink].filter(Boolean).join(' + ')||'—'}`;navigator.clipboard?.writeText(text).then(()=>toast('Slack intro copied.')).catch(()=>toast('Could not access clipboard.'));}

function renderOnboarding(){
  const plan=buildPlan();
  const complete=moduleComplete('onboarding');
  const started=anyOnboardingData();
  const next=nextIncompleteModule('onboarding');
  const workflowCard = !complete
    ? `<div class="card workflow-nudge onboarding-nudge"><div><span class="eyebrow">${started?'Keep going':'Start here if this is what you need first'}</span><h3>${started?'Finish your onboarding brief.':'You can build the onboarding piece first.'}</h3><p>${started?'Your answers are saved. Finish the remaining onboarding prompts and you can download this brief without completing the rest of the Manual.':'No need to complete Meet Me or How I Work first. This section stands on its own and takes about four minutes.'}</p></div><button class="btn primary" id="startOnboardingOnly">${started?'Continue onboarding':'Build my onboarding brief'}</button></div>`
    : `<div class="card workflow-nudge ready-nudge"><div><span class="eyebrow">Ready to use</span><h3>Your onboarding brief is ready.</h3><p>Download it now, send it to TANG Onboarding, or keep building the rest of your profile whenever you have bandwidth.${next?` We’ll point you to <strong>${next.title}</strong> next so nothing gets lost.`:''}</p></div><div class="nudge-actions"><button class="btn dark" id="topDownloadOnboarding">Download brief</button>${next?`<button class="btn light" id="continueProfile">Continue with ${next.title}</button>`:''}</div></div>`;
  app.innerHTML=`<div class="shell">
    <div class="section-head"><div><span class="eyebrow">My Onboarding</span><h1 class="page-title">Your flight plan.</h1><p class="lede">A starting route based on what you told us you know, where you want support, and how you prefer to learn.</p></div><button class="btn primary" id="editOnboarding">${started?'Edit preferences':'Build my brief'}</button></div>
    ${workflowCard}
    <div class="card dark flight-hero"><div><span class="badge inverse">YOUR PACE</span><h2>${escapeHTML(state.onboarding.pace||'Tell us how you want to pace it')}</h2><p>${learningSentence()}</p></div><div class="flight-graphic"><span></span><span></span><span></span></div></div>
    <div class="section-head"><div><h2>Recommended route</h2><p class="muted">Skip what you know. Refresh what is rusty. Go deeper where you asked us to lean in.</p></div></div>
    <div class="plan-list">${plan.map(x=>`<div class="plan-item"><span class="plan-dot ${x.meta.className}"></span><div><h4>${x.label}</h4><p>${x.meta.label}${x.resource?` · ${escapeHTML(x.resource.title)}`:''}</p></div><span class="plan-time">${x.time}</span></div>`).join('')}</div>
    <div class="card access-card"><div><span class="eyebrow">Access check</span><h3>What you can reach today</h3><p class="muted">${state.onboarding.access.length?escapeHTML(state.onboarding.access.join(' · ')):'You have not added access details yet.'}</p></div><button class="btn light" id="editAccess">Update</button></div>
    <section class="onboard-section"><div class="section-head"><div><span class="eyebrow">Baseline</span><h2>The onboarding timeline</h2><p class="muted">Your personalized plan sits on top of the Day 1 → Month 3+ expectations rather than replacing them.</p></div></div><div class="timeline">${TIMELINE.map(t=>`<div class="timeline-item"><span class="timeline-marker"></span><span class="badge blue">${t.when}</span><h3>${t.title}</h3><div class="timeline-tasks">${t.tasks.map(x=>`<span class="timeline-task">${x}</span>`).join('')}</div></div>`).join('')}</div></section>
    <section class="onboard-section"><div class="section-head"><div><span class="eyebrow">Next useful thing</span><h2>Explore when it helps.</h2><p class="muted">A resource can wait until the moment it becomes useful. Internal material may not open until your access is in place.</p></div></div><div class="grid cols-3">${plan.filter(x=>x.meta.value!==3).slice(0,6).map(resourceRecommendationCard).join('')}</div></section>
    <section class="onboard-section"><div class="section-head"><div><span class="eyebrow">Share</span><h2>Onboarding-team brief</h2><p class="muted">This export contains whatever you have completed here: support levels, tools, learning preferences, access status, and practical welcome notes.</p></div></div><div class="canvas-wrap"><canvas id="onboardingCanvas" width="1600" height="1900"></canvas></div><div class="export-toolbar"><button class="btn dark" id="downloadOnboarding">Download onboarding brief</button><button class="btn light" id="copyOnboarding">Copy brief as text</button></div></section>
  </div>`;
  drawOnboardingCanvas();
  const startOnboarding=()=>startModule('onboarding');
  document.querySelector('#editOnboarding').addEventListener('click',startOnboarding);
  document.querySelector('#startOnboardingOnly')?.addEventListener('click',startOnboarding);
  document.querySelector('#editAccess').addEventListener('click',()=>{state.wizard=true;state.step=8;render();});
  document.querySelector('#downloadOnboarding').addEventListener('click',()=>downloadCanvas('onboardingCanvas',`${slug(state.profile.name||'tang')}-onboarding-brief.png`));
  document.querySelector('#topDownloadOnboarding')?.addEventListener('click',()=>downloadCanvas('onboardingCanvas',`${slug(state.profile.name||'tang')}-onboarding-brief.png`));
  document.querySelector('#continueProfile')?.addEventListener('click',()=>next&&startModule(next.id));
  document.querySelector('#copyOnboarding').addEventListener('click',copyOnboardingText);
}
function buildPlan(){return SUPPORT_TOPICS.map(t=>{const meta=supportMeta(state.onboarding.support[t.id]),resource=RESOURCES.find(r=>r.topic===t.id&&r.kind!=='media');return {...t,meta,resource};}).concat(TOOL_TOPICS.map(t=>{const meta=supportMeta(state.onboarding.tools[t.id]),resource=RESOURCES.find(r=>r.topic===t.id&&r.kind!=='media');return {...t,time:resource?.duration||'As needed',meta,resource};}));}
function learningSentence(){const names=state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean);return names.length?`When something is new: ${names.join(' + ')}.`:'Add a learning preference and this plan will get more specific.';}
function resourceRecommendationCard(x){const res=x.resource;if(!res)return `<div class="card"><span class="resource-mark">NEXT</span><h3>${x.label}</h3><p class="muted">Ask the onboarding team for the best current resource, person, or experience.</p></div>`;return `<div class="card"><div class="card-title-row"><span class="resource-mark">${res.mark}</span><span class="badge ${res.access==='Public'?'public':'lock'}">${res.access}</span></div><h3 class="resource-rec-title">${res.title}</h3><p class="muted">${res.desc}</p>${res.url?`<a class="btn light" href="${res.url}" target="_blank" rel="noreferrer">Open resource ↗</a>`:`<button class="btn light" disabled>Available after access</button>`}</div>`;}

function drawOnboardingCanvas(){
  const c=document.querySelector('#onboardingCanvas');if(!c)return;const p=state.profile;
  const learn=[state.onboarding.pace,state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean).join(' + ')].filter(Boolean).join('   •   ')||'—';
  const access=state.onboarding.access.join(' · ')||'Not added yet';
  const hospitality=[p.birthday&&`Birthday: ${p.birthday}`,p.snack&&`Snack: ${p.snack}`,p.drink&&`Drink: ${p.drink}`,p.celebration&&`Celebrate: ${p.celebration}`].filter(Boolean).join('   •   ')||'No hospitality notes added.';
  let mctx=c.getContext('2d'),my=360;
  my+=measureCanvasSection(mctx,learn,1420,30);
  my+=measureCanvasSection(mctx,access,1420,28);
  my+=34+([...supportSummaryList(),...toolSummaryList()].length*84);
  my+=10+measureCanvasSection(mctx,hospitality,1420,26);
  c.width=1600;c.height=Math.max(1900,Math.ceil(my+250));
  const ctx=c.getContext('2d');
  ctx.fillStyle='#f5f3ee';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle=COLORS.navy;ctx.fillRect(0,0,c.width,300);drawCanvasPhoto(ctx,p.photo,95,75,150,150,p.name);ctx.fillStyle='white';ctx.font='700 62px Arial';ctx.fillText(p.name||'Your Name',280,135);ctx.font='400 27px Arial';ctx.fillStyle='#c9d2dd';ctx.fillText('TANG ONBOARDING TEAM BRIEF',282,188);ctx.fillStyle=COLORS.yellow;ctx.fillRect(0,290,c.width,10);
  drawTangLogo(ctx,1260,78,250);
  let y=360;y=canvasSection(ctx,'HOW I LEARN',learn,90,y,1420,30);y=canvasSection(ctx,'ACCESS TODAY',access,90,y,1420,28);
  ctx.fillStyle=COLORS.blue;ctx.font='700 22px Arial';ctx.fillText('WHERE TO LEAN IN',90,y);y+=34;
  [...supportSummaryList(),...toolSummaryList()].forEach((x,i)=>{ctx.fillStyle='#fff';roundRect(ctx,90,y,1420,72,14,true);ctx.fillStyle=[COLORS.pink,COLORS.orange,COLORS.yellow,'#0d8a65'][x.meta.value??0];ctx.beginPath();ctx.arc(125,y+36,10,0,Math.PI*2);ctx.fill();ctx.fillStyle=COLORS.navy;ctx.font='700 25px Arial';ctx.fillText(x.label,155,y+33);ctx.fillStyle=COLORS.gray;ctx.font='400 22px Arial';ctx.fillText(x.meta.label,980,y+33);y+=84;});
  y=canvasSection(ctx,'WELCOME NOTES',hospitality,90,y+10,1420,26);
  const footerY=Math.max(y+28,c.height-150);ctx.fillStyle=COLORS.navy;ctx.fillRect(90,footerY,1420,72);ctx.fillStyle='white';ctx.font='700 27px Arial';ctx.fillText('HUMAN-CENTERED ONBOARDING',120,footerY+47);ctx.fillStyle=COLORS.gray;ctx.font='400 21px Arial';ctx.fillText('Brought to you by TANG Onboarding · Review before sharing.',90,footerY+112);
}
function copyOnboardingText(){const p=state.profile;const support=[...supportSummaryList(),...toolSummaryList()].map(x=>`${x.label}: ${x.meta.label}`).join('\n');const text=`TANG Onboarding Brief — ${p.name||'New teammate'}\n\nConnection: ${connectionText()||'—'}\nAccess: ${state.onboarding.access.join(', ')||'—'}\nLearning: ${state.onboarding.learningModes.map(id=>LEARNING_MODES.find(m=>m.id===id)?.title).filter(Boolean).join(', ')||'—'}\nPace: ${state.onboarding.pace||'—'}\n\nSupport preferences\n${support}\n\nWelcome notes: ${[p.birthday&&`Birthday ${p.birthday}`,p.snack&&`Snack ${p.snack}`,p.drink&&`Drink ${p.drink}`,p.celebration].filter(Boolean).join(' · ')||'—'}`;navigator.clipboard?.writeText(text).then(()=>toast('Onboarding brief copied.')).catch(()=>toast('Could not access clipboard.'));}


function renderCheckpoint(){
  const id=state.ui.checkpoint;
  const m=moduleById(id);
  if(!m){state.route='home';saveState();return renderHome();}
  const next=nextIncompleteModule(id);
  const p=state.profile;
  const content={
    meet:{eyebrow:'Meet Me complete',title:'Your teammate intro has a starting point.',body:'You have enough to make a useful first introduction. Download the starter card now, or keep building and it will automatically get richer as you add how you work and what you want to grow.',output:'Starter intro card',detail:'Photo, short story, and conversation starters.',button:'Download intro card',view:'Preview my profile'},
    work:{eyebrow:'How I Work complete',title:'Your Manual has a working draft.',body:'Your strengths, working style, feedback preferences, and growth goals are now in one place. You can use the Manual now—even if you have not touched onboarding yet.',output:'Manual of Me',detail:'A scan-before-a-kickoff guide to working with you.',button:'Download Manual',view:'Review my Manual'},
    onboarding:{eyebrow:'Show Me Around complete',title:'Your onboarding brief is ready.',body:'This can travel to TANG Onboarding right now. You do not need to finish the rest of your Manual first. We’ll keep anything else you add later synced into the experience.',output:'Onboarding brief',detail:'Support, tools, access, pace, and how you prefer to learn.',button:'Download onboarding brief',view:'Review my flight plan'}
  }[id];
  if(!content){state.route='home';saveState();return renderHome();}
  app.innerHTML=`<div class="checkpoint-stage" style="--checkpoint-accent:${m.accent}"><div class="shell checkpoint-shell">
    <div class="checkpoint-mark">✓</div><span class="eyebrow">${content.eyebrow}</span><h1>${content.title}</h1><p class="lede">${content.body}</p>
    <div class="card checkpoint-output"><div class="checkpoint-output-icon">${id==='meet'?'HI':id==='work'?'ME':'GO'}</div><div><span class="small muted">READY WHEN YOU ARE</span><h3>${content.output}</h3><p>${content.detail}</p></div><button class="btn dark" id="checkpointDownload">${content.button}</button></div>
    <div class="checkpoint-next"><div><span class="eyebrow">Nothing else is blocked</span><h3>${next?`Next useful chunk: ${next.title}`:'You have all four chunks.'}</h3><p>${next?`You can stop here, or keep going for ${next.time}. We’ll always bring you back to the next unfinished section.`:'You can head to the final handoff whenever you are ready.'}</p></div><div class="checkpoint-actions">${next?`<button class="btn primary" id="checkpointContinue">Continue with ${next.title}</button>`:`<button class="btn primary" id="checkpointContinue">Open my TANG pack</button>`}<button class="btn light" id="checkpointView">${content.view}</button><button class="btn text" id="checkpointHome">Save & go home</button></div></div>
    <div class="hidden-canvases" aria-hidden="true"><canvas id="manualCanvas" width="1600" height="2350"></canvas><canvas id="introCanvas" width="1080" height="1350"></canvas><canvas id="onboardingCanvas" width="1600" height="1900"></canvas></div>
  </div></div>`;
  drawManualCanvas();drawIntroCanvas();drawOnboardingCanvas();
  document.querySelector('#checkpointDownload').addEventListener('click',()=>{
    if(id==='meet')downloadCanvas('introCanvas',`${slug(p.name||'tang')}-intro-card.png`);
    else if(id==='work')downloadCanvas('manualCanvas',`${slug(p.name||'tang')}-manual-of-me.png`);
    else downloadCanvas('onboardingCanvas',`${slug(p.name||'tang')}-onboarding-brief.png`);
  });
  document.querySelector('#checkpointContinue').addEventListener('click',()=>{state.ui.checkpoint='';if(next)startModule(next.id);else{state.route='outro';state.ui.outroSeen=true;saveState();render();window.scrollTo(0,0);}});
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
    <div class="card deliverable-card deliverable-manual"><h3>Manual of Me</h3><p class="muted">For teammates, kickoffs, and your future profile.</p><button class="btn dark full" id="handoffManual">Download Manual</button></div>
    <div class="card deliverable-card deliverable-intro"><h3>Intro card</h3><p class="muted">For Slack, email, or a team introduction.</p><button class="btn orange full" id="handoffIntro">Download intro card</button></div>
    <div class="card deliverable-card deliverable-brief"><h3>Onboarding brief</h3><p class="muted">For the onboarding team: support, access, pace, and learning style.</p><button class="btn primary full" id="handoffBrief">Download brief</button></div>
  </div>
  <div class="card share-card"><div><h3>One more useful backup</h3><p class="muted">Download all answers as a portable profile file. You can import it later on another copy of this site without redoing the Manual.</p></div><button class="btn light" id="handoffBackup">Download all answers</button></div>
  <div class="handoff-actions"><button class="btn light" data-route="manual">Review my Manual</button><button class="btn light" data-route="onboarding">Review my flight plan</button><button class="btn dark" id="copyShareNote">Copy a note to send with it</button></div>
  <div class="hidden-canvases" aria-hidden="true"><canvas id="manualCanvas" width="1600" height="2350"></canvas><canvas id="introCanvas" width="1080" height="1350"></canvas><canvas id="onboardingCanvas" width="1600" height="1900"></canvas></div>
  </div>`;
  drawManualCanvas();drawIntroCanvas();drawOnboardingCanvas();
  document.querySelector('#handoffManual').addEventListener('click',()=>downloadCanvas('manualCanvas',`${slug(p.name||'tang')}-manual-of-me.png`));document.querySelector('#handoffIntro').addEventListener('click',()=>downloadCanvas('introCanvas',`${slug(p.name||'tang')}-intro-card.png`));document.querySelector('#handoffBrief').addEventListener('click',()=>downloadCanvas('onboardingCanvas',`${slug(p.name||'tang')}-onboarding-brief.png`));document.querySelector('#handoffBackup').addEventListener('click',downloadBackup);document.querySelector('#copyShareNote').addEventListener('click',copyShareNote);
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
      <div class="example-copy"><span class="eyebrow">04 · Onboarding-team handoff</span><h2>Onboarding brief</h2><p>The practical handoff: access, learning preferences, tool familiarity, and where the onboarding team should guide, refresh, or get out of the way.</p><button class="btn primary" id="downloadPatrickBrief">Download Patrick example</button></div>
      <div class="canvas-wrap example-canvas"><canvas id="onboardingCanvas" width="1600" height="1900"></canvas></div>
    </section>

    <section class="examples-cta card"><div><span class="eyebrow">Now make it yours</span><h2>You do not have to build everything at once.</h2><p>Start with the chunk that is useful today. Each completed section creates something you can use or send immediately.</p></div><button class="btn primary" id="examplesStart">Start my Manual</button></section>
  </div>`;
  withPatrickExample(()=>{drawManualCanvas();drawIntroCanvas();drawOnboardingCanvas();});
  document.querySelector('#downloadPatrickManual').addEventListener('click',()=>downloadCanvas('manualCanvas','patrick-alfonzo-example-manual-of-me.png'));
  document.querySelector('#downloadPatrickIntro').addEventListener('click',()=>downloadCanvas('introCanvas','patrick-alfonzo-example-intro-card.png'));
  document.querySelector('#downloadPatrickBrief').addEventListener('click',()=>downloadCanvas('onboardingCanvas','patrick-alfonzo-example-onboarding-brief.png'));
  document.querySelector('#examplesStart').addEventListener('click',()=>startModule(nextIncompleteModule()?.id||'meet'));
}

function renderPeople(){app.innerHTML=`<div class="shell"><div class="section-head"><div><span class="eyebrow">People</span><h1 class="page-title">Meet your onboarding crew.</h1><p class="lede">Need something? Start with the reason you are reaching out. The goal is a useful first connection—not a wall of biographies.</p></div></div><div class="grid cols-2 team-grid">${TEAM.map(person=>`<article class="card person-card"><div class="person-top"><div class="person-avatar ${person.image?'has-photo':''}">${person.image?`<img src="${person.image}" alt="${person.name}" style="object-position:${person.position||'50% 35%'}">`:person.initials}</div><div class="person-heading"><h3>${person.name}</h3><div class="person-role">${person.role}</div></div></div><p class="person-summary">${person.summary}</p><div class="person-mini"><div><strong>BACKGROUND</strong><span>${person.background}</span></div>${person.outside?`<div><strong>OFF THE CLOCK</strong><span>${person.outside}</span></div>`:''}</div><div class="ask"><strong>Reach out for</strong>${person.ask}</div><footer><span class="badge lock">TANG onboarding</span>${person.link?`<a class="btn text" href="${person.link}">Slack →</a>`:`<span class="small muted">Slack link can be added</span>`}</footer></article>`).join('')}</div><div class="card directory-note"><span class="eyebrow">Living directory</span><h3>This can grow with the team.</h3><p>Over time, the same profiles can hold photos, short bios, Power Skills, “ask me about” topics, onboarding preferences, and searchable experience—without turning the People tab into LinkedIn.</p></div></div>`;}

function renderResources(){
  const cats=['All',...new Set(RESOURCES.map(r=>r.category))],filtered=state.resourceFilter==='All'?RESOURCES:RESOURCES.filter(r=>r.category===state.resourceFilter);
  app.innerHTML=`<div class="shell wide"><div class="section-head"><div><span class="eyebrow">Resources</span><h1 class="page-title">Explore when it is useful.</h1><p class="lede">You do not need to memorize onboarding. Know where to go when context, a tool, or a little TANG translation would help.</p></div></div><div class="resource-layout"><aside class="resource-filter" aria-label="Resource filters">${cats.map(c=>`<button class="filter-btn ${state.resourceFilter===c?'active':''}" data-filter="${c}">${c}</button>`).join('')}</aside><div><div class="grid cols-2 resource-grid">${filtered.map(resourceCard).join('')}</div></div></div></div>`;
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.resourceFilter=b.dataset.filter;saveState();renderResources();}));
}
function resourceCard(r){if(r.kind==='media')return `<article class="resource-media"><img src="${r.image}" alt="${r.title}"><div class="overlay"><span class="badge inverse">RP1</span><h3>${r.title}</h3><p>${r.desc}</p></div></article>`;const badge=r.access==='Public'?'public':'lock';const link=r.url?(r.openInEdge?`<a class="btn light" href="microsoft-edge:${r.url}" title="Open in Microsoft Edge">Open in Edge ↗</a>`:`<a class="btn light" href="${r.url}" target="_blank" rel="noreferrer">Open ↗</a>`):`<button class="btn light" disabled title="Add the approved internal URL in app.js">Available after access</button>`;return `<article class="card resource-card"><span class="resource-mark">${r.mark}</span><div><div class="card-title-row"><h3>${r.title}</h3></div><p>${r.desc}</p><div class="resource-meta"><span class="badge ${badge}">${r.access}</span><span class="badge">${r.duration}</span></div></div>${link}</article>`;}

function downloadBackup(){const blob=new Blob([JSON.stringify({version:2,exportedAt:new Date().toISOString(),profile:state.profile,onboarding:state.onboarding},null,2)],{type:'application/json'});const a=document.createElement('a');a.download=`${slug(state.profile.name||'tang')}-manual-profile.json`;a.href=URL.createObjectURL(blob);a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('All answers downloaded.');}
function importBackup(e){const file=e.target.files?.[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);state.profile=deepMerge(state.profile,data.profile||{});state.onboarding=deepMerge(state.onboarding,data.onboarding||{});saveState();render();toast('Profile imported.');}catch{toast('That profile file could not be read.');}};r.readAsText(file);e.target.value='';}
function slug(s){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'tang';}
function toast(msg){document.querySelector('.toast')?.remove();const d=document.createElement('div');d.className='toast';d.textContent=msg;document.body.appendChild(d);announce(msg);setTimeout(()=>d.remove(),2400);}
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){e.preventDefault();downloadBackup();}});

render();
