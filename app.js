const app = document.querySelector("#app");
const liveRegion = document.querySelector("#liveRegion");
const brandButton = document.querySelector("#brandButton");

const COLORS = ["#80d7bd", "#ffcb66", "#8c63d8", "#ef8e77", "#71b8dc", "#b8dc8a"];

const archetypeImages = {
  empathizer: "./assets/archetypes/empathizer_human-radar_storyset-people-talking.webp",
  researcher: "./assets/archetypes/researcher_evidence-hunter_storyset-research-paper.webp",
  synthesizer: "./assets/archetypes/synthesizer_dot-connector_storyset-mind-map.webp",
  ideaGenerator: "./assets/archetypes/idea-generator_possibility-machine_storyset-creative-thinking.webp",
  prototyper: "./assets/archetypes/prototyper_make-it-real_storyset-prototyping-process.webp",
  artist: "./assets/archetypes/artist_craft-alchemist_storyset-create.webp",
  tester: "./assets/archetypes/tester_friendly-skeptic_storyset-usability-testing.webp",
  facilitator: "./assets/archetypes/facilitator_room-conductor_storyset-standup-meeting.webp",
  leader: "./assets/archetypes/leader_north-star_storyset-team-goals.webp",
  documenter: "./assets/archetypes/documenter_keeper-of-receipts_storyset-taking-notes.webp",
};


const modeMeta = {
  explore: { label: "Explore", color: "#80d7bd" },
  interpret: { label: "Interpret", color: "#8c63d8" },
  imagine: { label: "Imagine", color: "#ffcb66" },
  make: { label: "Make", color: "#ef8e77" },
  validate: { label: "Validate", color: "#71b8dc" },
  align: { label: "Align", color: "#b8dc8a" },
};

const skillLabels = {
  collaboration: "Collaboration & Team Mindset",
  givingFeedback: "Giving Feedback",
  receivingFeedback: "Receiving Feedback",
  humbleHustle: "Humble Hustle",
  empathy: "Empathy",
  adaptability: "Adaptability & Flexibility",
  proactiveProblemSolving: "Proactive Problem Solving",
  resilience: "Resilience & Grit",
  clearCommunication: "Clear Communication",
  creativity: "Creativity & Resourcefulness",
  ambiguity: "Comfort with Ambiguity",
  ownership: "Ownership Mentality",
  socialAwareness: "Social Awareness",
};

const powerSkillImages = {
  collaboration: "./assets/power-skills/collaboration-team-mindset.webp",
  givingFeedback: "./assets/power-skills/giving-feedback.webp",
  receivingFeedback: "./assets/power-skills/receiving-feedback.webp",
  humbleHustle: "./assets/power-skills/humble-hustle.webp",
  empathy: "./assets/power-skills/empathy.webp",
  adaptability: "./assets/power-skills/adaptability-flexibility.webp",
  proactiveProblemSolving: "./assets/power-skills/proactive-problem-solving.webp",
  resilience: "./assets/power-skills/resilience-grit.webp",
  clearCommunication: "./assets/power-skills/clear-communication.webp",
  creativity: "./assets/power-skills/creativity-resourcefulness.webp",
  ambiguity: "./assets/power-skills/comfort-with-ambiguity.webp",
  ownership: "./assets/power-skills/ownership-mentality.webp",
  socialAwareness: "./assets/power-skills/social-awareness.webp",
};

const archetypes = {
  empathizer: {
    official: "The Empathizer",
    playful: "The Human Radar",
    glyph: "🫶",
    color: "#ffcb66",
    modes: ["explore", "align"],
    description:
      "You tune into people, context, and the needs that are easy to miss. You help teams remember that good work has to make sense in a human life, not only on a slide.",
    callWhen: [
      "The team has data but not yet a human story",
      "A stakeholder feels unheard or misunderstood",
      "A decision needs a grounded view of real needs",
    ],
    watchOut:
      "You may hold space for every perspective so carefully that choosing a direction takes longer than it needs to.",
    intro:
      "I help teams understand the people, context, and needs behind the work. Bring me in when the human story is unclear or a perspective is missing.",
    skills: ["empathy", "socialAwareness", "collaboration"],
  },
  researcher: {
    official: "The Researcher",
    playful: "The Evidence Hunter",
    glyph: "🔎",
    color: "#80d7bd",
    modes: ["explore", "validate"],
    description:
      "You build confidence through evidence. You ask what the team knows, how it knows it, and what still needs to be investigated before a claim becomes a decision.",
    callWhen: [
      "An assumption is being treated like a fact",
      "The team needs a trustworthy research path",
      "A complex domain needs to be understood quickly",
    ],
    watchOut:
      "You may keep gathering information after the team has enough evidence to take a responsible next step.",
    intro:
      "I help teams replace assumptions with useful evidence. Bring me in when we need to understand what is true, uncertain, or worth investigating next.",
    skills: ["proactiveProblemSolving", "ambiguity", "ownership"],
  },
  synthesizer: {
    official: "The Synthesizer",
    playful: "The Dot Connector",
    glyph: "🧩",
    color: "#8c63d8",
    modes: ["interpret", "explore"],
    description:
      "You turn scattered information into patterns, frames, and stories people can use. Where others see fragments, you start seeing the shape of the whole.",
    callWhen: [
      "Research feels fragmented or contradictory",
      "The team cannot explain what it has learned",
      "Multiple disciplines need a shared frame",
    ],
    watchOut:
      "You may keep refining the framework after the team has enough clarity to begin making something.",
    intro:
      "I help teams turn complicated information into patterns, stories, and decisions. Bring me in when the work feels fragmented or difficult to explain.",
    skills: ["clearCommunication", "ambiguity", "socialAwareness"],
  },
  ideaGenerator: {
    official: "The Idea Generator",
    playful: "The Possibility Machine",
    glyph: "💡",
    color: "#ffcb66",
    modes: ["imagine", "explore"],
    description:
      "You create movement by opening new doors. You reframe, connect unlikely ideas, and help the team escape the first answer that arrived wearing a business-casual outfit.",
    callWhen: [
      "Every option looks suspiciously familiar",
      "The team needs a fresh frame or future possibility",
      "Constraints are being treated as creative dead ends",
    ],
    watchOut:
      "You may generate more promising directions than the team has time, evidence, or emotional stamina to pursue.",
    intro:
      "I help teams see possibilities beyond the obvious answer. Bring me in when the work needs a new frame, an unexpected connection, or more imaginative range.",
    skills: ["creativity", "adaptability", "ambiguity"],
  },
  prototyper: {
    official: "The Prototyper",
    playful: "The Make-It-Real Person",
    glyph: "🛠️",
    color: "#ef8e77",
    modes: ["make", "imagine"],
    description:
      "You learn by making. You turn discussion into something visible, testable, and imperfect enough to teach the team what another meeting cannot.",
    callWhen: [
      "The team has talked long enough to qualify for a podcast",
      "An abstract idea needs a concrete form",
      "A small experiment can answer a big question",
    ],
    watchOut:
      "You may start building before the problem, audience, or intended learning has been made clear enough.",
    intro:
      "I help teams learn by making ideas tangible early. Bring me in when we need a draft, prototype, or experiment that creates real feedback.",
    skills: ["proactiveProblemSolving", "ownership", "adaptability"],
  },
  artist: {
    official: "The Artist",
    playful: "The Craft Alchemist",
    glyph: "🎨",
    color: "#71b8dc",
    modes: ["make", "imagine"],
    description:
      "You give ideas form, tone, and emotional presence. You notice when the concept technically exists but has not yet become clear, intentional, or memorable.",
    callWhen: [
      "The idea is correct but emotionally invisible",
      "A complex story needs a compelling visual form",
      "The final experience needs coherence and craft",
    ],
    watchOut:
      "You may invest in refinement before the team has validated whether the underlying direction deserves that level of care.",
    intro:
      "I help teams turn ideas into clear, intentional, and compelling experiences. Bring me in when the work needs craft, expression, or emotional resonance.",
    skills: ["creativity", "empathy", "clearCommunication"],
  },
  tester: {
    official: "The Tester",
    playful: "The Friendly Skeptic",
    glyph: "🧪",
    color: "#71b8dc",
    modes: ["validate", "interpret"],
    description:
      "You make ideas stronger by pressure-checking them. You notice assumptions, risks, edge cases, and the suspiciously quiet failure mode hiding in the corner.",
    callWhen: [
      "Everyone loves the idea a little too quickly",
      "A decision carries meaningful risk",
      "The team needs to learn what will break first",
    ],
    watchOut:
      "You may surface weaknesses so quickly that unfinished ideas do not get enough room to develop before being judged.",
    intro:
      "I help teams strengthen ideas by finding assumptions, risks, and edge cases early. Bring me in when a concept needs constructive pressure before it becomes expensive.",
    skills: ["givingFeedback", "proactiveProblemSolving", "ownership"],
  },
  facilitator: {
    official: "The Facilitator",
    playful: "The Room Conductor",
    glyph: "🎛️",
    color: "#b8dc8a",
    modes: ["align", "interpret"],
    description:
      "You pay attention to how the group is thinking together. You adjust the room, the process, and the conversation so useful participation becomes more likely.",
    callWhen: [
      "The room has more opinions than forward motion",
      "A difficult conversation needs structure",
      "The team needs genuine participation, not polite silence",
    ],
    watchOut:
      "You may prioritize shared agreement when the work actually needs productive tension or a firm decision.",
    intro:
      "I help groups think, disagree, and move forward together. Bring me in when the room needs structure, participation, or a clearer path to alignment.",
    skills: ["collaboration", "socialAwareness", "adaptability"],
  },
  leader: {
    official: "The Leader",
    playful: "The North Star",
    glyph: "🧭",
    color: "#ef8e77",
    modes: ["align", "make"],
    description:
      "You create direction and movement. You clarify what matters, make decisions when needed, and help the team turn good intentions into coordinated action.",
    callWhen: [
      "The team is circling the runway",
      "Priorities or ownership are unclear",
      "A decision needs a responsible owner and next step",
    ],
    watchOut:
      "You may create momentum before the team has explored enough uncertainty or heard from the people most affected.",
    intro:
      "I help teams establish direction, priorities, and momentum. Bring me in when we need to make a decision, clarify ownership, or move from discussion to action.",
    skills: ["ownership", "clearCommunication", "resilience"],
  },
  documenter: {
    official: "The Documenter",
    playful: "The Keeper of Receipts",
    glyph: "🗂️",
    color: "#8c63d8",
    modes: ["interpret", "validate"],
    description:
      "You create continuity. You preserve the decisions, rationale, language, and practical detail that keep good work from evaporating after the meeting ends.",
    callWhen: [
      "The project has important history but no shared memory",
      "A handoff needs to survive contact with reality",
      "Decisions and rationale need to remain traceable",
    ],
    watchOut:
      "You may capture everything with equal care instead of distinguishing what people will actually need later.",
    intro:
      "I help teams preserve decisions, rationale, and useful context. Bring me in when the work needs continuity, traceability, or a handoff people can actually use.",
    skills: ["clearCommunication", "humbleHustle", "ownership"],
  },
};


const growthSkillPrompts = {
  collaboration: "Invite a teammate into a decision earlier than usual.",
  givingFeedback: "Offer one specific observation, its impact, and one useful next step.",
  receivingFeedback: "Ask for one piece of feedback before the work feels finished.",
  humbleHustle: "Take ownership of one useful task that sits outside the spotlight.",
  empathy: "Pause to ask whose experience has not shaped the work yet.",
  adaptability: "Name what changed, what still holds, and what you will adjust.",
  proactiveProblemSolving: "Turn one recurring frustration into a small experiment.",
  resilience: "After a setback, capture the lesson and define the smallest next move.",
  clearCommunication: "Reduce one complex idea to a sentence and a simple visual.",
  creativity: "Generate three deliberately different options before refining one.",
  ambiguity: "State what is known, unknown, and safe to test next.",
  ownership: "Clarify the owner, deadline, and definition of done.",
  socialAwareness: "Notice who has not spoken and create a lower-risk way to contribute.",
};

const modeGrowthSkills = {
  explore: ["empathy", "socialAwareness", "receivingFeedback"],
  interpret: ["clearCommunication", "ambiguity", "receivingFeedback"],
  imagine: ["creativity", "adaptability", "resilience"],
  make: ["proactiveProblemSolving", "ownership", "humbleHustle"],
  validate: ["givingFeedback", "receivingFeedback", "resilience"],
  align: ["collaboration", "socialAwareness", "clearCommunication"],
};

const modeArchetypeOptions = {
  explore: ["empathizer", "researcher", "synthesizer", "ideaGenerator"],
  interpret: ["synthesizer", "documenter", "tester", "facilitator"],
  imagine: ["ideaGenerator", "artist", "prototyper"],
  make: ["prototyper", "artist", "leader"],
  validate: ["tester", "researcher", "documenter"],
  align: ["facilitator", "leader", "empathizer"],
};

const counterbalanceMap = {
  empathizer: ["tester", "leader", "documenter"],
  researcher: ["ideaGenerator", "prototyper", "facilitator"],
  synthesizer: ["prototyper", "tester", "leader"],
  ideaGenerator: ["tester", "documenter", "facilitator"],
  prototyper: ["researcher", "tester", "facilitator"],
  artist: ["researcher", "tester", "leader"],
  tester: ["ideaGenerator", "empathizer", "prototyper"],
  facilitator: ["leader", "tester", "ideaGenerator"],
  leader: ["empathizer", "researcher", "facilitator"],
  documenter: ["ideaGenerator", "leader", "artist"],
};

const questions = [
  {
    stem: "My attention goes first to...",
    kicker: "Attention",
    options: [
      {
        word: "People",
        symbol: "◉",
        archetype: "empathizer",
        secondary: "facilitator",
        skills: ["empathy", "socialAwareness"],
        color: "#ffcb66",
      },
      {
        word: "Patterns",
        symbol: "⌁",
        archetype: "synthesizer",
        secondary: "researcher",
        skills: ["ambiguity", "clearCommunication"],
        color: "#8c63d8",
      },
    ],
  },
  {
    stem: "I put more faith in...",
    kicker: "Belief",
    options: [
      {
        word: "Evidence",
        symbol: "⌕",
        archetype: "researcher",
        secondary: "tester",
        skills: ["proactiveProblemSolving", "ownership"],
        color: "#80d7bd",
      },
      {
        word: "Possibility",
        symbol: "✦",
        archetype: "ideaGenerator",
        secondary: "artist",
        skills: ["creativity", "ambiguity"],
        color: "#ffcb66",
      },
    ],
  },
  {
    stem: "My default practice is to...",
    kicker: "Practice",
    options: [
      {
        word: "Prototype",
        symbol: "▱",
        archetype: "prototyper",
        secondary: "leader",
        skills: ["proactiveProblemSolving", "adaptability"],
        color: "#ef8e77",
      },
      {
        word: "Refine",
        symbol: "✎",
        archetype: "artist",
        secondary: "documenter",
        skills: ["creativity", "clearCommunication"],
        color: "#71b8dc",
      },
    ],
  },
  {
    stem: "I help teams through...",
    kicker: "Contribution",
    options: [
      {
        word: "Challenge",
        symbol: "△",
        archetype: "tester",
        secondary: "researcher",
        skills: ["givingFeedback", "proactiveProblemSolving"],
        color: "#71b8dc",
      },
      {
        word: "Alignment",
        symbol: "◎",
        archetype: "facilitator",
        secondary: "empathizer",
        skills: ["collaboration", "socialAwareness"],
        color: "#b8dc8a",
      },
    ],
  },
  {
    stem: "Others rely on me for...",
    kicker: "Role",
    options: [
      {
        word: "Direction",
        symbol: "↗",
        archetype: "leader",
        secondary: "facilitator",
        skills: ["ownership", "clearCommunication"],
        color: "#ef8e77",
      },
      {
        word: "Continuity",
        symbol: "∞",
        archetype: "documenter",
        secondary: "synthesizer",
        skills: ["humbleHustle", "ownership"],
        color: "#8c63d8",
      },
    ],
  },
  {
    stem: "When something feels off, I...",
    kicker: "Instinct",
    options: [
      {
        word: "Listen",
        symbol: "◡",
        archetype: "empathizer",
        secondary: "synthesizer",
        skills: ["empathy", "receivingFeedback"],
        color: "#ffcb66",
      },
      {
        word: "Investigate",
        symbol: "⌖",
        archetype: "researcher",
        secondary: "tester",
        skills: ["proactiveProblemSolving", "ambiguity"],
        color: "#80d7bd",
      },
    ],
  },
  {
    stem: "Momentum begins with…",
    kicker: "Energy",
    options: [
      {
        word: "Imagination",
        symbol: "☄",
        archetype: "ideaGenerator",
        secondary: "artist",
        skills: ["creativity", "adaptability"],
        color: "#ffcb66",
      },
      {
        word: "Action",
        symbol: "▶",
        archetype: "prototyper",
        secondary: "leader",
        skills: ["ownership", "humbleHustle"],
        color: "#ef8e77",
      },
    ],
  },
  {
    stem: "Clarity comes from…",
    kicker: "Sensemaking",
    options: [
      {
        word: "Framing",
        symbol: "▣",
        archetype: "synthesizer",
        secondary: "ideaGenerator",
        skills: ["clearCommunication", "ambiguity"],
        color: "#8c63d8",
      },
      {
        word: "Recording",
        symbol: "≡",
        archetype: "documenter",
        secondary: "empathizer",
        skills: ["clearCommunication", "ownership"],
        color: "#80d7bd",
      },
    ],
  },
  {
    stem: "I care most about…",
    kicker: "Standard",
    options: [
      {
        word: "Meaning",
        symbol: "♡",
        archetype: "artist",
        secondary: "ideaGenerator",
        skills: ["empathy", "creativity"],
        color: "#71b8dc",
      },
      {
        word: "Rigor",
        symbol: "✓",
        archetype: "tester",
        secondary: "documenter",
        skills: ["givingFeedback", "resilience"],
        color: "#80d7bd",
      },
    ],
  },
  {
    stem: "Under pressure, I...",
    kicker: "Pressure",
    options: [
      {
        word: "Adapt",
        symbol: "↝",
        archetype: "facilitator",
        secondary: "prototyper",
        skills: ["adaptability", "socialAwareness"],
        color: "#b8dc8a",
      },
      {
        word: "Decide",
        symbol: "◆",
        archetype: "leader",
        secondary: "prototyper",
        skills: ["ownership", "resilience"],
        color: "#ef8e77",
      },
    ],
  },
];

const state = {
  screen: "intro",
  currentQuestion: 0,
  answers: [],
  result: null,
  selectedSkills: [],
  growthSkills: [],
  editingAnswers: false,
  name: "",
  introText: "",
};

brandButton.addEventListener("click", () => {
  if (state.screen === "intro") return;
  const shouldReset = window.confirm("Return to the beginning and clear this result?");
  if (shouldReset) resetAssessment();
});

document.addEventListener("keydown", (event) => {
  if (state.screen !== "quiz") return;
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    event.preventDefault();
    selectOption(0);
  }
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "b") {
    event.preventDefault();
    selectOption(1);
  }
});

function announce(message) {
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 40);
}

function render() {
  if (state.screen === "intro") renderIntro();
  if (state.screen === "quiz") renderQuiz();
  if (state.screen === "reveal") renderReveal();
  if (state.screen === "results") renderResults();
  app.focus({ preventScroll: true });
}

function renderIntro() {
  app.innerHTML = `
    <section class="screen intro-layout" aria-labelledby="introTitle">
      <div>
        <p class="eyebrow">A tiny quiz about your working instincts</p>
        <h1 class="hero-title" id="introTitle">How do you<br><span>show up?</span></h1>
        <p class="hero-copy">
          Choose between ten pairs to reveal the beliefs, tendencies, and practices you naturally bring to a team.
        </p>
        <div class="meta-row" aria-label="Assessment details">
          <span class="meta-pill">10 quick choices</span>
          <span class="meta-pill">About 60 to 90 seconds</span>
          <span class="meta-pill">No wrong answers</span>
        </div>
        <button class="primary-button" id="startButton" type="button">Discover Your Creativity Archetype <span aria-hidden="true">→</span>
        </button>
        <p class="intro-note">
          Pick what feels more like you most of the time. Do not choose what your title expects or what sounds most impressive. This is a reflection tool, not a personality diagnosis or performance rating.
        </p>
      </div>
      <div class="intro-art" aria-hidden="true">
        <div class="poster"><span class="doodle">🧩</span><span class="poster-word">Connect the dots</span></div>
        <div class="poster"><span class="doodle">🫶</span><span class="poster-word">Read the room</span></div>
        <div class="poster"><span class="doodle">🛠️</span><span class="poster-word">Make it real</span></div>
      </div>
    </section>
  `;
  document.querySelector("#startButton").addEventListener("click", startAssessment);
}

function startAssessment() {
  state.screen = "quiz";
  state.currentQuestion = 0;
  state.answers = [];
  state.result = null;
  state.selectedSkills = [];
  state.growthSkills = [];
  state.editingAnswers = false;
  state.introText = "";
  render();
  announce("Assessment started. Question 1 of 10.");
}

function renderQuiz() {
  const question = questions[state.currentQuestion];
  const number = state.currentQuestion + 1;
  const progress = (number / questions.length) * 100;
  const selectedIndex = state.answers[state.currentQuestion];
  const timeText = state.editingAnswers
    ? "Reviewing your answers"
    : number <= 3
      ? "About a minute left"
      : number <= 7
        ? "Less than a minute left"
        : number === 10
          ? "Final choice"
          : "Almost there";

  app.innerHTML = `
    <section class="screen quiz-card" aria-labelledby="questionTitle">
      <div class="quiz-topline">
        <span>Choice ${number} of ${questions.length}</span>
        <span>${timeText}</span>
      </div>
      <div class="progress-track" aria-label="Assessment progress">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      ${
        state.editingAnswers
          ? '<div class="edit-banner"><strong>Edit mode:</strong> Your current answer is highlighted. Change it or continue to the next choice.</div>'
          : ""
      }
      <p class="question-kicker">${question.kicker}</p>
      <h2 class="question-title" id="questionTitle">${question.stem}</h2>
      <p class="question-help">Go with the option that feels more automatic, especially when nobody assigns you the role.</p>
      <div class="choice-grid">
        ${question.options
          .map(
            (option, index) => `
          <button
            class="choice-card ${selectedIndex === index ? "is-selected" : ""}"
            type="button"
            data-option-index="${index}"
            style="--choice-color: ${option.color}; --tilt: ${index === 0 ? "-0.4deg" : "0.4deg"}"
            aria-label="Choose ${option.word}"
            aria-pressed="${selectedIndex === index}"
          >
            <span class="choice-shortcut" aria-hidden="true">${index === 0 ? "A" : "B"}</span>
            <span class="choice-symbol" aria-hidden="true">${option.symbol}</span>
            <span class="choice-word">${option.word}</span>
            ${selectedIndex === index ? '<span class="choice-selected-label">Your choice</span>' : ""}
          </button>
        `,
          )
          .join("")}
      </div>
      <div class="quiz-actions">
        <div class="quiz-nav">
          ${
            state.currentQuestion > 0
              ? '<button class="ghost-button" id="backButton" type="button">← Previous</button>'
              : ""
          }
          ${
            state.editingAnswers && selectedIndex !== undefined
              ? `<button class="secondary-button" id="nextButton" type="button">${
                  state.currentQuestion === questions.length - 1 ? "Update result" : "Next choice →"
                }</button>`
              : ""
          }
        </div>
        ${
          state.editingAnswers
            ? '<button class="ghost-button" id="saveAndReturnButton" type="button">Save and return to results</button>'
            : '<p class="microcopy">Use ← / → or A / B</p>'
        }
      </div>
    </section>
  `;

  document.querySelectorAll("[data-option-index]").forEach((button) => {
    button.addEventListener("click", () => selectOption(Number(button.dataset.optionIndex)));
  });

  const backButton = document.querySelector("#backButton");
  if (backButton) backButton.addEventListener("click", previousQuestion);

  const nextButton = document.querySelector("#nextButton");
  if (nextButton) nextButton.addEventListener("click", nextQuestion);

  const saveAndReturnButton = document.querySelector("#saveAndReturnButton");
  if (saveAndReturnButton) saveAndReturnButton.addEventListener("click", finishEditingAnswers);
}

function selectOption(optionIndex) {
  if (state.screen !== "quiz") return;
  state.answers[state.currentQuestion] = optionIndex;

  if (state.editingAnswers) {
    render();
    announce(`${questions[state.currentQuestion].options[optionIndex].word} selected.`);
    return;
  }

  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion += 1;
    render();
    announce(`Question ${state.currentQuestion + 1} of ${questions.length}.`);
    return;
  }

  state.result = calculateResult();
  state.selectedSkills = [...state.result.suggestedSkills];
  state.growthSkills = getSuggestedGrowthSkills(state.result, state.selectedSkills);
  state.introText = state.result.primary.intro;
  state.screen = "reveal";
  render();
  announce("All choices complete. Calculating your result.");

  window.setTimeout(() => {
    if (state.screen !== "reveal") return;
    state.screen = "results";
    render();
    announce(`Your strongest signal is ${stripLeadingThe(state.result.primary.official)}.`);
  }, 1350);
}

function previousQuestion() {
  if (state.currentQuestion === 0) return;
  state.currentQuestion -= 1;
  render();
  announce(`Returned to question ${state.currentQuestion + 1}.`);
}

function nextQuestion() {
  if (state.answers[state.currentQuestion] === undefined) {
    announce("Choose an option before continuing.");
    return;
  }

  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion += 1;
    render();
    announce(`Question ${state.currentQuestion + 1} of ${questions.length}.`);
    return;
  }

  finishEditingAnswers();
}

function editAnswers() {
  state.editingAnswers = true;
  state.screen = "quiz";
  state.currentQuestion = 0;
  render();
  announce("Reviewing your answers. Your current choice is highlighted.");
}

function finishEditingAnswers() {
  const previousSuggestions = state.result?.suggestedSkills || [];
  const wasUsingSuggestions = arraysHaveSameItems(state.selectedSkills, previousSuggestions);

  state.result = calculateResult();

  if (wasUsingSuggestions || state.selectedSkills.length === 0) {
    state.selectedSkills = [...state.result.suggestedSkills];
  }

  state.growthSkills = getSuggestedGrowthSkills(state.result, state.selectedSkills);
  state.introText = state.result.primary.intro;
  state.editingAnswers = false;
  state.screen = "results";
  render();
  announce("Your updated result is ready.");
}

function calculateResult() {
  const archetypeScores = Object.fromEntries(Object.keys(archetypes).map((key) => [key, 0]));
  const modeScores = Object.fromEntries(Object.keys(modeMeta).map((key) => [key, 0]));
  const skillScores = Object.fromEntries(Object.keys(skillLabels).map((key) => [key, 0]));

  state.answers.forEach((selectedIndex, questionIndex) => {
    const option = questions[questionIndex].options[selectedIndex];
    archetypeScores[option.archetype] += 3;
    archetypeScores[option.secondary] += 1;

    const primaryArchetype = archetypes[option.archetype];
    const secondaryArchetype = archetypes[option.secondary];
    modeScores[primaryArchetype.modes[0]] += 2;
    modeScores[primaryArchetype.modes[1]] += 1;
    modeScores[secondaryArchetype.modes[0]] += 0.6;
    modeScores[secondaryArchetype.modes[1]] += 0.3;

    option.skills.forEach((skill, index) => {
      skillScores[skill] += index === 0 ? 2 : 1;
    });
  });

  const rankedArchetypes = Object.entries(archetypeScores).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    const aModeFit = archetypes[a[0]].modes.reduce((sum, mode) => sum + modeScores[mode], 0);
    const bModeFit = archetypes[b[0]].modes.reduce((sum, mode) => sum + modeScores[mode], 0);
    return bModeFit - aModeFit;
  });

  const maxModeScore = Math.max(...Object.values(modeScores));
  const normalizedModes = Object.fromEntries(
    Object.entries(modeScores).map(([mode, score]) => [mode, Math.max(18, Math.round((score / maxModeScore) * 100))]),
  );

  const rankedSkills = Object.entries(skillScores).sort((a, b) => b[1] - a[1]);
  const suggestedSkills = rankedSkills.slice(0, 3).map(([skill]) => skill);

  const [first, second, third] = rankedArchetypes;
  return {
    archetypeScores,
    skillScores,
    modeScores: normalizedModes,
    primaryKey: first[0],
    primary: archetypes[first[0]],
    supportingKeys: [second[0], third[0]],
    supporting: [archetypes[second[0]], archetypes[third[0]]],
    isBlend: first[1] - second[1] <= 1,
    suggestedSkills,
    stretchMode: Object.entries(normalizedModes).sort((a, b) => a[1] - b[1])[0][0],
  };
}

function arraysHaveSameItems(first = [], second = []) {
  if (first.length !== second.length) return false;
  const a = [...first].sort();
  const b = [...second].sort();
  return a.every((item, index) => item === b[index]);
}

function getSuggestedGrowthSkills(result, excludedSkills = []) {
  const excluded = new Set(excludedSkills);
  const rankedLowSignals = Object.entries(result.skillScores || {})
    .sort((a, b) => a[1] - b[1])
    .map(([skill]) => skill);

  const candidates = [
    ...(modeGrowthSkills[result.stretchMode] || []),
    ...rankedLowSignals,
    ...Object.keys(skillLabels),
  ];

  const suggestions = [];
  candidates.forEach((skill) => {
    if (suggestions.length >= 2) return;
    if (!suggestions.includes(skill) && !excluded.has(skill)) suggestions.push(skill);
  });

  if (suggestions.length < 2) {
    candidates.forEach((skill) => {
      if (suggestions.length >= 2) return;
      if (!suggestions.includes(skill)) suggestions.push(skill);
    });
  }

  return suggestions;
}

function getBalancedCrew(result) {
  const chosen = new Set([result.primaryKey]);
  const crew = [
    {
      key: result.primaryKey,
      label: "Your natural anchor",
      reason: `${stripLeadingThe(result.primary.official)} brings ${result.primary.modes.map((mode) => modeMeta[mode].label).join(" and ")} energy to the crew.`,
    },
  ];

  const pickFirstAvailable = (candidates) => candidates.find((key) => !chosen.has(key));

  const stretchKey = pickFirstAvailable(modeArchetypeOptions[result.stretchMode] || []);
  if (stretchKey) {
    chosen.add(stretchKey);
    crew.push({
      key: stretchKey,
      label: `Activate more ${modeMeta[result.stretchMode].label}`,
      reason: `${stripLeadingThe(archetypes[stretchKey].official)} adds energy in your lightest contribution mode and helps the team avoid leaning only on your default style.`,
    });
  }

  const counterKey = pickFirstAvailable(counterbalanceMap[result.primaryKey] || []);
  if (counterKey) {
    chosen.add(counterKey);
    crew.push({
      key: counterKey,
      label: "Create a productive counterweight",
      reason: `${stripLeadingThe(archetypes[counterKey].official)} introduces a different instinct that can question, focus, or ground the direction without canceling your strengths.`,
    });
  }

  const coveredModes = new Set();
  chosen.forEach((key) => archetypes[key].modes.forEach((mode) => coveredModes.add(mode)));

  const finalKey = Object.keys(archetypes)
    .filter((key) => !chosen.has(key))
    .sort((a, b) => {
      const aNew = archetypes[a].modes.filter((mode) => !coveredModes.has(mode)).length;
      const bNew = archetypes[b].modes.filter((mode) => !coveredModes.has(mode)).length;
      if (bNew !== aNew) return bNew - aNew;
      const bridgePriority = ["facilitator", "synthesizer", "empathizer", "documenter"];
      return bridgePriority.indexOf(a) - bridgePriority.indexOf(b);
    })[0];

  if (finalKey) {
    crew.push({
      key: finalKey,
      label: "Round out the project cycle",
      reason: `${stripLeadingThe(archetypes[finalKey].official)} adds ${archetypes[finalKey].modes.map((mode) => modeMeta[mode].label).join(" and ")} coverage so the crew can move from understanding to action with fewer blind spots.`,
    });
  }

  return crew;
}

function renderArchetypeLibrary(currentKey) {
  return Object.entries(archetypes)
    .map(
      ([key, item]) => `
        <details class="archetype-card ${key === currentKey ? "is-current" : ""}">
          <summary>
            <span class="archetype-swatch" aria-hidden="true">
              <img src="${archetypeImages[key]}" alt="" />
            </span>
            <span class="archetype-summary-copy">
              <strong>${stripLeadingThe(item.official)}</strong>
              <small>${item.playful}</small>
            </span>
            <span class="archetype-expand" aria-hidden="true">+</span>
          </summary>
          <div class="archetype-detail">
            <p>${item.description}</p>
            <div class="mode-chip-row">
              ${item.modes.map((mode) => `<span class="mode-chip">${modeMeta[mode].label}</span>`).join("")}
            </div>
            <p><strong>Bring them in when:</strong> ${item.callWhen[0]}.</p>
          </div>
        </details>
      `,
    )
    .join("");
}

function renderReveal() {
  app.innerHTML = `
    <section class="screen reveal-card" aria-label="Calculating result">
      <div class="reveal-orbit" aria-hidden="true"><span>✦</span></div>
      <h2>Connecting your dots...</h2>
      <p>Calculating your preferred ratio of questions, craft, momentum, and constructive skepticism.</p>
    </section>
  `;
}


function stripLeadingThe(value) {
  return value.replace(/^The\s+/i, "");
}

function renderResults() {
  const result = state.result;
  const primary = result.primary;
  const supportNames = result.supporting.map((item) => stripLeadingThe(item.official));
  const energyLine = result.isBlend
    ? `With strong ${supportNames[0]} energy`
    : `A clear ${stripLeadingThe(primary.official)} signal`;
  const balancedCrew = getBalancedCrew(result);

  app.innerHTML = `
    <section class="screen results-layout" aria-labelledby="resultTitle">
      <div class="result-toolbar">
        <aside class="result-snapshot-note" aria-label="Result context">
          <strong>A snapshot, not a verdict.</strong> This result is subjective and reflects where your answers land in this moment. It can shift with your context, role, team, and experience.
        </aside>
        <button
          class="ghost-button refresh-button"
          id="refreshButton"
          type="button"
          aria-label="Start over and clear all answers"
          title="Start over and clear all answers"
        >
          <span class="refresh-icon" aria-hidden="true">↻</span>
          <span>Start over</span>
        </button>
      </div>
      <article class="result-hero" style="--archetype-color: ${primary.color}">
        <div>
          <p class="result-label">Your creativity archetype</p>
          <h1 class="result-title" id="resultTitle">${stripLeadingThe(primary.official)}</h1>
          <p class="result-playful">${primary.playful}</p>
          <p class="result-energy">${energyLine}</p>
          <p class="result-description">${primary.description}</p>
          <div class="supporting-row" aria-label="Supporting archetypes">
            ${result.supporting
              .map((item) => `<span class="chip">${stripLeadingThe(item.official)}</span>`)
              .join("")}
          </div>
          <div class="result-actions compact">
            <button class="secondary-button" id="editAnswersButton" type="button">Edit my answers</button>
          </div>
        </div>
        <div class="result-portrait">
          <img src="${archetypeImages[result.primaryKey]}" alt="${stripLeadingThe(primary.official)} — ${primary.playful} archetype illustration" />
        </div>
      </article>

      <div class="result-grid">
        <article class="panel">
          <h3>Your contribution profile</h3>
          <div class="mode-list">
            ${Object.entries(result.modeScores)
              .sort((a, b) => b[1] - a[1])
              .map(
                ([mode, score]) => `
                <div class="mode-row">
                  <span class="mode-name">${modeMeta[mode].label}</span>
                  <div class="mode-track" aria-hidden="true">
                    <div class="mode-fill" style="width: ${score}%; --mode-color: ${modeMeta[mode].color}"></div>
                  </div>
                  <span class="mode-score">${score}</span>
                </div>
              `,
              )
              .join("")}
          </div>
          <p class="microcopy" style="margin-top:18px">These are relative signals from ten quick choices. They are not ability ratings.</p>
        </article>

        <article class="panel">
          <h3>Bring me in when</h3>
          <ul class="clean-list">
            ${primary.callWhen.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <div class="watchout" style="margin-top:22px">
            <strong>Watch-out:</strong> ${primary.watchOut}
          </div>
        </article>

        <article class="panel wide">
          <h3>A balanced crew around your style</h3>
          <p>
            Good team composition does not mean collecting four people who think alike. It means pairing your natural contribution with people who cover lighter modes, create useful tension, and help the work move across the full project cycle.
          </p>
          <div class="crew-grid">
            ${balancedCrew
              .map((member, index) => {
                const item = archetypes[member.key];
                return `
                  <article class="crew-card ${member.key === result.primaryKey ? "is-you" : ""}" style="--crew-color:${item.color}">
                    <span class="crew-number">${String(index + 1).padStart(2, "0")}</span>
                    <p class="crew-label">${member.label}</p>
                    <h4>${stripLeadingThe(item.official)}</h4>
                    <p class="crew-role">${item.playful}</p>
                    <div class="mode-chip-row">
                      ${item.modes.map((mode) => `<span class="mode-chip">${modeMeta[mode].label}</span>`).join("")}
                    </div>
                    <p>${member.reason}</p>
                  </article>
                `;
              })
              .join("")}
          </div>
          <p class="composition-note">Use this as a conversation starter when forming a team, not as a staffing rule or a claim that one person can only play one role.</p>
        </article>

        <article class="panel wide growth-panel">
          <h3>Choose two areas to grow</h3>
          <p>
            Your lighter signals are not weaknesses. Choose up to two power skills you want to practice more intentionally in your next project.
          </p>
          <div class="skill-picker" id="growthSkillPicker">
            ${Object.entries(skillLabels)
              .map(
                ([key, label]) => `
                <button
                  class="skill-toggle growth-toggle"
                  type="button"
                  data-growth-skill="${key}"
                  aria-pressed="${state.growthSkills.includes(key)}"
                >${label}</button>
              `,
              )
              .join("")}
          </div>
          <p class="skill-count" id="growthSkillCount">${state.growthSkills.length} of 2 selected</p>
          <div class="growth-practice-grid" id="growthPracticeGrid">
            ${renderGrowthPractices()}
          </div>
        </article>

        <article class="panel wide">
          <h3>What should teammates rely on you for?</h3>
          <p>
            We suggested three power skills from your choices. Keep them or select the three you most want to bring to the team.
          </p>
          <div class="skill-picker" id="skillPicker">
            ${Object.entries(skillLabels)
              .map(
                ([key, label]) => `
                <button
                  class="skill-toggle"
                  type="button"
                  data-skill="${key}"
                  aria-pressed="${state.selectedSkills.includes(key)}"
                >${label}</button>
              `,
              )
              .join("")}
          </div>
          <p class="skill-count" id="skillCount">${state.selectedSkills.length} of 3 selected</p>
        </article>

        <article class="panel wide">
          <h3>Explore all archetypes</h3>
          <p>
            Your result is a strongest signal, not a box. Open any archetype below to understand the other ways people may contribute and where each style can help a team.
          </p>
          <div class="archetype-library">
            ${renderArchetypeLibrary(result.primaryKey)}
          </div>
        </article>

        <article class="panel wide">
          <h3>Your team introduction</h3>
          <div class="profile-builder">
            <div class="field">
              <label for="nameInput">Name <span style="font-weight:500;color:var(--muted)">(optional)</span></label>
              <input id="nameInput" value="${escapeHtml(state.name)}" placeholder="Your name" autocomplete="name" />
            </div>
            <div class="field">
              <label for="introText">Edit this before sharing</label>
              <textarea id="introText">${escapeHtml(state.introText || primary.intro)}</textarea>
            </div>
          </div>
          <div class="result-actions">
            <button class="primary-button" id="copyButton" type="button">Copy introduction</button>
            <button class="secondary-button" id="downloadButton" type="button">Download result card</button>
            <button class="ghost-button" id="editAnswersBottomButton" type="button">Edit answers</button>
            <button class="ghost-button" id="retakeButton" type="button">Start over</button>
          </div>
        </article>

        <aside class="disclaimer panel wide">
          <strong>About this result:</strong> This lightweight reflection describes preferences and attention patterns. It should support conversation and onboarding. It should not be used for hiring, performance evaluation, promotion decisions, or permanent role assignment. Your less-selected modes are still valuable and can be developed or activated intentionally.
        </aside>
      </div>
    </section>
  `;

  bindResultInteractions();
}

function renderGrowthPractices() {
  if (!state.growthSkills.length) {
    return '<p class="growth-empty">Choose one or two skills to see a small practice you can try.</p>';
  }

  return state.growthSkills
    .map(
      (skill) => `
        <article class="growth-practice-card">
          <span>Practice</span>
          <h4>${skillLabels[skill]}</h4>
          <p>${growthSkillPrompts[skill]}</p>
        </article>
      `,
    )
    .join("");
}

function bindResultInteractions() {
  document.querySelectorAll("[data-skill]").forEach((button) => {
    button.addEventListener("click", () => {
      const skill = button.dataset.skill;
      const selected = state.selectedSkills.includes(skill);

      if (selected) {
        state.selectedSkills = state.selectedSkills.filter((item) => item !== skill);
      } else if (state.selectedSkills.length < 3) {
        state.selectedSkills.push(skill);
      } else {
        announce("Choose up to three power skills. Remove one before adding another.");
        return;
      }

      button.setAttribute("aria-pressed", String(!selected));
      document.querySelector("#skillCount").textContent = `${state.selectedSkills.length} of 3 selected`;
    });
  });

  document.querySelectorAll("[data-growth-skill]").forEach((button) => {
    button.addEventListener("click", () => {
      const skill = button.dataset.growthSkill;
      const selected = state.growthSkills.includes(skill);

      if (selected) {
        state.growthSkills = state.growthSkills.filter((item) => item !== skill);
      } else if (state.growthSkills.length < 2) {
        state.growthSkills.push(skill);
      } else {
        announce("Choose up to two growth skills. Remove one before adding another.");
        return;
      }

      button.setAttribute("aria-pressed", String(!selected));
      document.querySelector("#growthSkillCount").textContent = `${state.growthSkills.length} of 2 selected`;
      document.querySelector("#growthPracticeGrid").innerHTML = renderGrowthPractices();
    });
  });

  document.querySelector("#nameInput").addEventListener("input", (event) => {
    state.name = event.target.value;
  });

  document.querySelector("#introText").addEventListener("input", (event) => {
    state.introText = event.target.value;
  });

  document.querySelector("#copyButton").addEventListener("click", copyIntroduction);
  document.querySelector("#downloadButton").addEventListener("click", downloadResultCard);
  document.querySelector("#editAnswersButton").addEventListener("click", editAnswers);
  document.querySelector("#editAnswersBottomButton").addEventListener("click", editAnswers);
  document.querySelector("#refreshButton").addEventListener("click", resetAssessment);
  document.querySelector("#retakeButton").addEventListener("click", resetAssessment);
}

async function copyIntroduction() {
  const text = (state.introText || document.querySelector("#introText").value).trim();
  const prefix = state.name.trim() ? `${state.name.trim()}: ` : "";
  try {
    await navigator.clipboard.writeText(prefix + text);
    announce("Team introduction copied.");
    const button = document.querySelector("#copyButton");
    const original = button.textContent;
    button.textContent = "Copied!";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  } catch {
    window.prompt("Copy your introduction:", prefix + text);
  }
}

async function downloadResultCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1200;

  const ctx = canvas.getContext("2d");
  const result = state.result;
  const primary = result.primary;
  const supportingType = stripLeadingThe(result.supporting[0].official);
  const topModes = Object.entries(result.modeScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const skillKeys = (state.selectedSkills.length ? state.selectedSkills : primary.skills).slice(0, 3);
  const shareLine = (state.introText || primary.intro).split(" Bring me in")[0];

  const [archetypeImage, tangLogo, ...skillImages] = await Promise.all([
    loadImage(archetypeImages[result.primaryKey]),
    loadImage("./tang-t.png"),
    ...skillKeys.map((skill) => loadImage(powerSkillImages[skill])),
  ]);

  ctx.fillStyle = "#f7f3eb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const blueGlow = ctx.createRadialGradient(1100, 70, 10, 1100, 70, 430);
  blueGlow.addColorStop(0, "rgba(18, 130, 202, 0.22)");
  blueGlow.addColorStop(1, "rgba(18, 130, 202, 0)");
  ctx.fillStyle = blueGlow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.shadowColor = "rgba(23, 21, 31, 0.14)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 14;
  roundedRect(ctx, 55, 55, 1090, 1090, 48);
  ctx.fillStyle = "#fffdf8";
  ctx.fill();
  ctx.restore();

  roundedRect(ctx, 55, 55, 1090, 1090, 48);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#17151f";
  ctx.stroke();

  // Header
  ctx.save();
  roundedRect(ctx, 96, 88, 62, 62, 14);
  ctx.clip();
  drawContainedImage(ctx, tangLogo, 104, 96, 46, 46);
  ctx.restore();
  roundedRect(ctx, 96, 88, 62, 62, 14);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#17151f";
  ctx.stroke();

  ctx.fillStyle = "#17151f";
  ctx.font = "800 24px system-ui, sans-serif";
  ctx.fillText("Creativity Archetype", 176, 118);
  ctx.fillStyle = "#65616f";
  ctx.font = "700 16px system-ui, sans-serif";
  ctx.fillText("TANG Onboarding", 176, 142);

  ctx.textAlign = "right";
  roundedRect(ctx, 895, 94, 206, 42, 21);
  ctx.fillStyle = "#edf6fb";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#1282ca";
  ctx.stroke();
  ctx.fillStyle = "#17151f";
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.fillText("Snapshot for now", 1080, 121);
  ctx.textAlign = "left";

  const leftX = 105;
  const leftWidth = 560;
  const artX = 730;
  const artY = 170;
  const artWidth = 375;
  const artHeight = 300;

  // Left content
  ctx.fillStyle = "#65616f";
  ctx.font = "800 18px system-ui, sans-serif";
  ctx.fillText("YOUR CREATIVITY ARCHETYPE", leftX, 204);

  ctx.fillStyle = "#17151f";
  const primaryRole = stripLeadingThe(primary.official);
  ctx.font = fitCanvasFont(ctx, primaryRole, leftWidth, 76, 50, "Georgia, serif", 800);
  const titleBottom = wrapTextWithLimit(ctx, primaryRole, leftX, 286, leftWidth, 72, 2);

  const nicknameY = Math.max(372, titleBottom + 34);
  ctx.font = "800 20px system-ui, sans-serif";
  const nicknameWidth = Math.min(leftWidth, Math.max(240, ctx.measureText(primary.playful.toUpperCase()).width + 44));
  roundedRect(ctx, leftX, nicknameY, nicknameWidth, 50, 25);
  ctx.fillStyle = primary.color;
  ctx.fill();
  ctx.fillStyle = "#17151f";
  ctx.fillText(primary.playful.toUpperCase(), leftX + 22, nicknameY + 33);

  ctx.fillStyle = "#17151f";
  ctx.font = "500 28px system-ui, sans-serif";
  const descriptionBottom = wrapTextWithLimit(ctx, shareLine, leftX, nicknameY + 102, leftWidth, 40, 4);

  // Supporting energy and best-use cards
  const infoY = descriptionBottom + 44;
  drawMiniInfoCard(ctx, {
    x: leftX,
    y: infoY,
    width: 255,
    height: 126,
    eyebrow: "ALSO SHOWING",
    value: `${supportingType} energy`,
    fill: "#edf6fb",
    accent: "#1282ca",
  });

  drawMiniInfoCard(ctx, {
    x: leftX + 285,
    y: infoY,
    width: 275,
    height: 126,
    eyebrow: "BRING ME IN WHEN",
    value: primary.callWhen[0],
    fill: "#f7f3eb",
    accent: primary.color,
    bodySize: 20,
    lineHeight: 28,
  });

  // Art panel
  roundedRect(ctx, artX, artY, artWidth, artHeight, 34);
  ctx.fillStyle = "#fffdf8";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#17151f";
  ctx.stroke();

  ctx.save();
  roundedRect(ctx, artX + 8, artY + 8, artWidth - 16, artHeight - 16, 26);
  ctx.clip();
  drawContainedImage(ctx, archetypeImage, artX + 14, artY + 14, artWidth - 28, artHeight - 28);
  ctx.restore();

  ctx.fillStyle = "#65616f";
  ctx.font = "800 18px system-ui, sans-serif";
  ctx.fillText("TOP CONTRIBUTION MODES", artX, 516);

  topModes.forEach(([mode, score], index) => {
    drawModeCard(ctx, modeMeta[mode].label, score, artX, 545 + index * 96, artWidth, modeMeta[mode].color);
  });

  // Bottom power skills section
  ctx.strokeStyle = "rgba(23, 21, 31, 0.14)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(105, 825);
  ctx.lineTo(1095, 825);
  ctx.stroke();

  ctx.fillStyle = "#65616f";
  ctx.font = "800 18px system-ui, sans-serif";
  ctx.fillText("POWER SKILLS TEAMMATES CAN RELY ON", 105, 870);

  const gap = 22;
  const cardWidth = (990 - gap * 2) / 3;
  skillKeys.forEach((skill, index) => {
    const x = 105 + index * (cardWidth + gap);
    drawPowerSkillCard(ctx, {
      image: skillImages[index],
      label: skillLabels[skill],
      x,
      y: 895,
      width: cardWidth,
      height: 170,
      fill: index === 1 ? "#edf6fb" : "#f7f3eb",
    });
  });

  ctx.fillStyle = "#65616f";
  ctx.font = "700 18px system-ui, sans-serif";
  const footerName = state.name.trim() ? state.name.trim().toUpperCase() : "SHARE YOUR TYPE";
  ctx.fillText(footerName, 105, 1108);
  ctx.textAlign = "right";
  ctx.fillText("Reflection, not evaluation", 1095, 1108);
  ctx.textAlign = "left";

  const link = document.createElement("a");
  const safeName =
    state.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "my";

  link.download = `${safeName}-creativity-archetype.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  announce("Result card downloaded.");
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image: ${src}`));
    image.src = src;
  });
}

function drawContainedImage(ctx, image, x, y, width, height) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function drawCoverImage(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function fitCanvasFont(
  ctx,
  text,
  maxWidth,
  startSize,
  minimumSize,
  family,
  weight = 700,
) {
  let size = startSize;

  while (size > minimumSize) {
    ctx.font = `${weight} ${size}px ${family}`;

    if (ctx.measureText(text).width <= maxWidth) {
      break;
    }

    size -= 2;
  }

  return `${weight} ${size}px ${family}`;
}

function drawPowerSkillCard(ctx, { image, label, x, y, width, height, fill }) {
  roundedRect(ctx, x, y, width, height, 24);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#17151f";
  ctx.stroke();

  const imageSize = 88;
  roundedRect(ctx, x + 18, y + 18, imageSize, imageSize, 18);
  ctx.save();
  ctx.clip();
  drawCoverImage(ctx, image, x + 18, y + 18, imageSize, imageSize);
  ctx.restore();

  ctx.fillStyle = "#17151f";
  ctx.font = "700 20px system-ui, sans-serif";
  wrapTextWithLimit(ctx, label, x + 124, y + 45, width - 146, 26, 3);
}

function drawMiniInfoCard(
  ctx,
  { x, y, width, height, eyebrow, value, fill, accent, bodySize = 24, lineHeight = 32 },
) {
  roundedRect(ctx, x, y, width, height, 22);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = accent;
  ctx.stroke();

  ctx.fillStyle = "#65616f";
  ctx.font = "800 15px system-ui, sans-serif";
  ctx.fillText(eyebrow, x + 18, y + 28);

  ctx.fillStyle = "#17151f";
  ctx.font = `700 ${bodySize}px system-ui, sans-serif`;
  wrapTextWithLimit(ctx, value, x + 18, y + 66, width - 36, lineHeight, 3);
}

function drawModeCard(ctx, label, score, x, y, width, accent) {
  roundedRect(ctx, x, y, width, 78, 22);
  ctx.fillStyle = "#f7f3eb";
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = "#17151f";
  ctx.stroke();

  ctx.fillStyle = "#17151f";
  ctx.font = "700 21px system-ui, sans-serif";
  ctx.fillText(label, x + 18, y + 29);

  ctx.textAlign = "right";
  ctx.fillStyle = "#65616f";
  ctx.font = "700 16px system-ui, sans-serif";
  ctx.fillText(`${Math.round(score)}%`, x + width - 18, y + 29);
  ctx.textAlign = "left";

  roundedRect(ctx, x + 18, y + 44, width - 36, 14, 7);
  ctx.fillStyle = "#e8e4dc";
  ctx.fill();

  roundedRect(ctx, x + 18, y + 44, Math.max(36, (width - 36) * (score / 100)), 14, 7);
  ctx.fillStyle = accent;
  ctx.fill();
}

function wrapTextWithLimit(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });

  if (line) lines.push(line);

  const visible = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    let finalLine = visible[maxLines - 1];
    while (ctx.measureText(`${finalLine}…`).width > maxWidth && finalLine.includes(" ")) {
      finalLine = finalLine.slice(0, finalLine.lastIndexOf(" "));
    }
    visible[maxLines - 1] = `${finalLine}…`;
  }

  visible.forEach((lineText, index) => {
    ctx.fillText(lineText, x, y + index * lineHeight);
  });

  return y + (visible.length - 1) * lineHeight;
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  words.forEach((word) => {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, currentY);
      line = `${word} `;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line.trim(), x, currentY);
}

function resetAssessment() {
  state.screen = "intro";
  state.currentQuestion = 0;
  state.answers = [];
  state.result = null;
  state.selectedSkills = [];
  state.growthSkills = [];
  state.editingAnswers = false;
  state.name = "";
  state.introText = "";
  render();
  announce("Assessment reset.");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
