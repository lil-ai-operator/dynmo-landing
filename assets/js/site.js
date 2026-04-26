const STORAGE_KEY = "dynmo-assessment-v2";

const branchQuestions = {
    existing_business: [
        {
            id: "businessType",
            modeTitle: "Business scan",
            title: "What kind of business are you running right now?",
            detail: "This helps Dynmo judge where bookings, sales, or customer momentum usually leak first.",
            options: [
                { value: "appointment", label: "Appointment business", hint: "Barber, clinic, beauty, coaching, fitness, consulting." },
                { value: "service", label: "Service business", hint: "Trades, field service, home service, local specialists." },
                { value: "retail", label: "Retail or hospitality", hint: "Shop, takeaway, food, venue, footfall-led business." },
                { value: "agency", label: "Agency or team-led service", hint: "Lead handling, sales follow-up, multiple moving parts." }
            ]
        },
        {
            id: "mainLeak",
            modeTitle: "Leak detection",
            title: "Where are you losing the most energy right now?",
            detail: "Pick the leak that hurts the most today, not the one that sounds clever.",
            options: [
                { value: "missed-enquiries", label: "Missed enquiries or booking requests", hint: "Hot leads cool off before anyone replies." },
                { value: "follow-up", label: "Weak follow-up after the first conversation", hint: "Leads fade, quotes stall, customers vanish." },
                { value: "repeat-revenue", label: "Low repeat bookings, upsells, or reviews", hint: "Customers buy once, then disappear." },
                { value: "complex-ops", label: "Too many channels and manual steps", hint: "The business is growing but the system is messy." }
            ]
        },
        {
            id: "leadVolume",
            modeTitle: "Signal strength",
            title: "How much demand is already touching the business each week?",
            detail: "This tells Dynmo whether the first move is capture, nurture, or scale support.",
            options: [
                { value: "low", label: "Light flow", hint: "A few enquiries or bookings per week." },
                { value: "steady", label: "Steady flow", hint: "Consistent enquiries, but not fully controlled." },
                { value: "busy", label: "Busy already", hint: "Plenty coming in, but the handling is messy." },
                { value: "heavy", label: "Heavy demand", hint: "High volume across multiple channels or team members." }
            ]
        },
        {
            id: "channels",
            modeTitle: "Channel read",
            title: "Where do customers usually hit you first?",
            detail: "Dynmo uses this to frame the fastest deployment angle.",
            options: [
                { value: "phone-dm", label: "Phone calls and DMs", hint: "Fast response matters more than long sales process." },
                { value: "web-google", label: "Website and Google", hint: "Search demand and form replies matter." },
                { value: "social", label: "Instagram, Facebook, or WhatsApp", hint: "Social replies and message speed drive conversions." },
                { value: "multi", label: "A mix of everything", hint: "You need stronger routing and operating logic." }
            ]
        },
        {
            id: "automationReadiness",
            modeTitle: "Build readiness",
            title: "How deep are you ready to go with automation?",
            detail: "Some businesses need a sharp quick win. Others are ready for a full machine.",
            options: [
                { value: "quick-win", label: "Start simple and prove it", hint: "One strong flow first." },
                { value: "growth", label: "Build for revenue growth", hint: "Capture plus follow-up and retention." },
                { value: "scale", label: "Build a serious machine", hint: "Multiple workflows, stronger routing, bigger upside." }
            ]
        },
        {
            id: "urgency",
            modeTitle: "Action pace",
            title: "How fast do you want this moving?",
            detail: "The final 7-day plan changes depending on urgency and capacity.",
            options: [
                { value: "now", label: "This week", hint: "I want something pointed and fast." },
                { value: "month", label: "This month", hint: "I want the right system, not rushed chaos." },
                { value: "plan-first", label: "I need the plan first", hint: "I want clarity before committing." }
            ]
        }
    ],
    side_hustle: [
        {
            id: "offerType",
            modeTitle: "Hustle scan",
            title: "What are you currently selling or trying to sell?",
            detail: "Even a small side hustle can get a real system if the offer is clear enough.",
            options: [
                { value: "appointments", label: "Appointments or personal services", hint: "Coaching, beauty, training, creative services." },
                { value: "done-for-you", label: "Done-for-you service", hint: "Marketing, editing, admin help, freelancing, trades." },
                { value: "product", label: "Product or ecommerce-style offer", hint: "Physical products, digital products, merch." },
                { value: "not-clear", label: "Offer still feels fuzzy", hint: "I know I want something, but it is not sharp yet." }
            ]
        },
        {
            id: "traction",
            modeTitle: "Traction read",
            title: "What proof do you have already?",
            detail: "Dynmo needs to know if this is a demand problem, an offer problem, or an operations problem.",
            options: [
                { value: "paying", label: "I already have paying customers", hint: "Small but real traction." },
                { value: "warm-leads", label: "I have warm leads or audience attention", hint: "People are interested, but sales are patchy." },
                { value: "testing", label: "I am still testing whether people want it", hint: "Early validation mode." },
                { value: "none", label: "No proof yet", hint: "This still needs its first real signal." }
            ]
        },
        {
            id: "mainHustleLeak",
            modeTitle: "Leak detection",
            title: "What is slowing the hustle down most?",
            detail: "Pick the bottleneck that is actually choking momentum.",
            options: [
                { value: "slow-replies", label: "Slow replies and inconsistent follow-up", hint: "Leads are not getting handled properly." },
                { value: "no-system", label: "No system around bookings or sales", hint: "Too much winging it." },
                { value: "not-enough-demand", label: "Not enough demand yet", hint: "Need offer and channel clarity first." },
                { value: "time-pressure", label: "I do not have enough time", hint: "Need leverage, not more manual effort." }
            ]
        },
        {
            id: "timeCapacity",
            modeTitle: "Capacity scan",
            title: "How much time can you realistically put into this each week?",
            detail: "The plan should fit your life, not some fantasy version of your week.",
            options: [
                { value: "under5", label: "Under 5 hours", hint: "Need ruthless focus and easy wins." },
                { value: "5to10", label: "5 to 10 hours", hint: "Enough for one clear growth push." },
                { value: "10plus", label: "10+ hours", hint: "Enough to build real momentum." }
            ]
        },
        {
            id: "growthChannel",
            modeTitle: "Channel read",
            title: "Where do you expect the next customers to come from?",
            detail: "This shapes the first automation angle and the first message lane.",
            options: [
                { value: "social", label: "Social media or DMs", hint: "The hustle lives in fast conversations." },
                { value: "network", label: "Referrals and personal network", hint: "Warm intros, reactivation, trust." },
                { value: "search", label: "Search, website, or local listings", hint: "Intent is there if replies are sharp." },
                { value: "unsure", label: "Not sure yet", hint: "Need a launch path before a full system." }
            ]
        },
        {
            id: "buildIntent",
            modeTitle: "Build intent",
            title: "What do you want Dynmo to help you do first?",
            detail: "This locks the recommendation into a starter lane, growth lane, or machine lane.",
            options: [
                { value: "capture", label: "Capture more leads fast", hint: "Get conversations moving." },
                { value: "grow", label: "Increase repeat sales and follow-up", hint: "More value from every contact." },
                { value: "systemise", label: "Systemise the whole thing", hint: "Start building the machine early." }
            ]
        }
    ],
    idea_not_started: [
        {
            id: "ideaType",
            modeTitle: "Idea scan",
            title: "What kind of business idea are you leaning toward?",
            detail: "Dynmo uses this to shape the starter path and likely first system lane.",
            options: [
                { value: "service", label: "Service business", hint: "A skill, transformation, or useful hands-on service." },
                { value: "appointments", label: "Appointment-led business", hint: "Consulting, fitness, beauty, coaching, care, clinics." },
                { value: "product", label: "Product or ecommerce", hint: "Physical or digital products." },
                { value: "not-sure", label: "Not fully sure yet", hint: "Direction exists, but still blurry." }
            ]
        },
        {
            id: "confidence",
            modeTitle: "Confidence read",
            title: "How clear is the idea right now?",
            detail: "This tells Dynmo whether to recommend validation work or system planning.",
            options: [
                { value: "clear", label: "Very clear", hint: "I know the offer and roughly who it is for." },
                { value: "semi-clear", label: "Half clear", hint: "The idea is there, but parts still feel foggy." },
                { value: "shaky", label: "Still shaky", hint: "I need help shaping the right thing." }
            ]
        },
        {
            id: "validation",
            modeTitle: "Validation stage",
            title: "What proof exists so far?",
            detail: "Proof matters more than hype. Pick the strongest honest answer.",
            options: [
                { value: "people-asked", label: "People have asked for this already", hint: "There is some natural demand signal." },
                { value: "researched", label: "I have only researched it", hint: "No direct market proof yet." },
                { value: "none", label: "No proof yet", hint: "This needs first contact with the market." }
            ]
        },
        {
            id: "launchWindow",
            modeTitle: "Launch pace",
            title: "When do you want this idea in motion?",
            detail: "The 7-day plan changes depending on whether this is urgent or exploratory.",
            options: [
                { value: "now", label: "Immediately", hint: "I want to launch and learn fast." },
                { value: "soon", label: "Within a month", hint: "I want a tighter setup first." },
                { value: "later", label: "Later this year", hint: "I am still shaping the idea." }
            ]
        },
        {
            id: "customerType",
            modeTitle: "Customer mapping",
            title: "Who do you think the first customer is?",
            detail: "The more concrete this is, the more useful the plan becomes.",
            options: [
                { value: "local", label: "Local consumers", hint: "People nearby who need a fast solution." },
                { value: "business", label: "Other businesses", hint: "B2B value, leads, efficiency, or outcomes." },
                { value: "creator", label: "Audience or niche community", hint: "People gathered around a specific interest." },
                { value: "unsure", label: "Not clear yet", hint: "Need to define the buyer first." }
            ]
        },
        {
            id: "starterNeed",
            modeTitle: "Starter lane",
            title: "What would help you most in the next 7 days?",
            detail: "This determines whether Dynmo should push idea clarity, first demand, or first automation later.",
            options: [
                { value: "clarity", label: "Sharpen the idea", hint: "I need the niche and offer to click." },
                { value: "demand", label: "Find the first buyers", hint: "I need market proof." },
                { value: "system", label: "Plan the future system now", hint: "I want the idea shaped around automation from day one." }
            ]
        }
    ],
    no_idea_yet: [
        {
            id: "strengthZone",
            modeTitle: "Direction scan",
            title: "What is your strongest starting advantage?",
            detail: "If there is no idea yet, Dynmo starts from assets, skills, and energy sources.",
            options: [
                { value: "people-skills", label: "Talking to people and building trust", hint: "Sales, care, community, service." },
                { value: "craft-skill", label: "A practical or creative skill", hint: "Making, fixing, designing, coaching, editing." },
                { value: "ops-brain", label: "Organisation and systems", hint: "Process, admin, operations, efficiency." },
                { value: "audience", label: "I already know a niche or audience", hint: "You may not have an offer yet, but you know the people." }
            ]
        },
        {
            id: "interestLane",
            modeTitle: "Interest lane",
            title: "Which business style pulls you most?",
            detail: "This frames your likely starter route before any pack recommendation.",
            options: [
                { value: "service", label: "Simple service business", hint: "Sell a clear outcome fast." },
                { value: "appointments", label: "Appointment-based business", hint: "Consulting, sessions, treatments, training." },
                { value: "product", label: "Product business", hint: "Physical or digital things people buy." },
                { value: "ai-support", label: "AI or automation support for businesses", hint: "More system-led, less traditional service." }
            ]
        },
        {
            id: "customerClarity",
            modeTitle: "Customer clarity",
            title: "How clear is the first customer in your head?",
            detail: "This is the difference between random ideas and something launchable.",
            options: [
                { value: "clear", label: "Pretty clear", hint: "I can picture the buyer." },
                { value: "somewhat", label: "Somewhat clear", hint: "I know the type, not the exact person." },
                { value: "blank", label: "Still blank", hint: "Need help choosing a profitable lane." }
            ]
        },
        {
            id: "timeBudget",
            modeTitle: "Capacity scan",
            title: "What kind of time do you actually have?",
            detail: "The plan should respect reality and still create movement.",
            options: [
                { value: "little", label: "A few hours per week", hint: "Need a very lean entry path." },
                { value: "moderate", label: "A consistent side-hustle block", hint: "Enough to validate an idea properly." },
                { value: "serious", label: "I can go hard", hint: "Enough to test and build quickly." }
            ]
        },
        {
            id: "incomeAim",
            modeTitle: "Goal tension",
            title: "What are you trying to create first?",
            detail: "Dynmo will not confuse quick cash needs with long-term machine building.",
            options: [
                { value: "quick-cash", label: "Quick first income", hint: "Something simple that gets paid soon." },
                { value: "steady-side", label: "A strong side income", hint: "Build something sustainable and repeatable." },
                { value: "big-build", label: "A serious future business", hint: "I want to build a machine over time." }
            ]
        },
        {
            id: "starterPush",
            modeTitle: "Starter path",
            title: "What do you want the plan to help with first?",
            detail: "This decides whether Dynmo pushes idea selection, offer creation, or the first channel.",
            options: [
                { value: "pick-idea", label: "Pick the best idea", hint: "I need the right lane, not more noise." },
                { value: "shape-offer", label: "Shape a sellable first offer", hint: "I need a simple thing people will buy." },
                { value: "find-channel", label: "Figure out where customers come from", hint: "I need the first growth lane." }
            ]
        }
    ]
};

const stageMeta = {
    existing_business: {
        label: "Existing business",
        headline: "You already have motion. Dynmo should attack the leak, not invent a new lane."
    },
    side_hustle: {
        label: "Side hustle",
        headline: "You have enough movement to stop winging it and start systemising the best parts."
    },
    idea_not_started: {
        label: "Business idea not started",
        headline: "You are still pre-launch, so the smartest move is clarity and first proof before heavy automation."
    },
    no_idea_yet: {
        label: "No idea yet",
        headline: "You do not need a pack first. You need a starter route that turns your energy into a real offer."
    }
};

const storedState = loadStoredState();
const stageEl = document.getElementById("assessmentStage");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const modeTitle = document.getElementById("assessmentModeTitle");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");

const state = {
    phase: "questions",
    index: 0,
    selectedValue: "",
    answers: {},
    questionSet: [],
    lead: storedState.lead
};

initSite();

function initSite() {
    bindNav();
    initReveal();
    initHeroChat();
    initDemoTrack();
    initTilt();
    startAssessment();
}

function bindNav() {
    if (!navToggle) return;
    navToggle.addEventListener("click", () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!expanded));
        navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

function initReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealEls.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.setProperty("--reveal-delay", `${delay}ms`);
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    revealEls.forEach((el) => observer.observe(el));
}

function initHeroChat() {
    const heroChat = document.getElementById("heroChat");
    if (!heroChat) return;

    const bubbles = [
        { type: "user", text: "Hey, do you have space tomorrow after 5?" },
        { type: "ai", text: "Yes. I can offer 5:30 or 6:10. Want me to lock one in?" },
        { type: "user", text: "6:10 works." },
        { type: "success", text: "Booked. I have also sent the prep details." }
    ];

    let bubbleIndex = 0;
    const renderNext = () => {
        heroChat.innerHTML = "";
        bubbles.forEach((bubble, index) => {
            window.setTimeout(() => {
                const el = document.createElement("div");
                el.className = `chat-bubble ${bubble.type}`;
                el.textContent = bubble.text;
                heroChat.appendChild(el);
            }, index * 650);
        });
        bubbleIndex += 1;
        window.setTimeout(renderNext, 4200);
    };

    renderNext();
}

function initDemoTrack() {
    const demoTrack = document.getElementById("demoTrack");
    if (!demoTrack) return;

    const sequences = [
        [
            { type: "user", text: "Can you tell me prices and the next free slot?" },
            { type: "ai", text: "Yes. The service starts at £35 and I can offer tomorrow at 11:20 or 12:10." },
            { type: "success", text: "Customer moved to booking step" }
        ],
        [
            { type: "user", text: "I meant to book last week. Anything left Friday?" },
            { type: "ai", text: "Friday still has a late slot. I can hold it for ten minutes while you confirm." },
            { type: "success", text: "Old lead reactivated" }
        ],
        [
            { type: "user", text: "We need help handling leads across email, DMs, and web forms." },
            { type: "ai", text: "That sounds like a Machine Pack case. Dynmo can map the channels and route them cleanly." },
            { type: "success", text: "Advanced system fit detected" }
        ]
    ];

    let sequenceIndex = 0;
    const paintSequence = () => {
        demoTrack.innerHTML = "";
        sequences[sequenceIndex].forEach((bubble, idx) => {
            window.setTimeout(() => {
                const el = document.createElement("div");
                el.className = `demo-bubble ${bubble.type}`;
                el.textContent = bubble.text;
                demoTrack.appendChild(el);
            }, idx * 700);
        });
        sequenceIndex = (sequenceIndex + 1) % sequences.length;
        window.setTimeout(paintSequence, 4600);
    };

    paintSequence();
}

function initTilt() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.querySelectorAll(".tilt-card").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * 8;
            const rotateX = (0.5 - y) * 8;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

function startAssessment() {
    state.answers = {};
    state.phase = "questions";
    state.index = 0;
    state.questionSet = buildQuestionSet("existing_business");
    renderCurrentView();
}

function buildQuestionSet(stage) {
    const stageQuestion = {
        id: "stage",
        modeTitle: "Stage detection",
        title: "Where are you right now?",
        detail: "Dynmo uses this first answer to branch the next questions and shape the output around your actual stage.",
        options: [
            { value: "existing_business", label: "Existing business", hint: "You already trade and want better systems or more growth." },
            { value: "side_hustle", label: "Side hustle", hint: "You have movement already, but it is not a full machine yet." },
            { value: "idea_not_started", label: "Business idea not started", hint: "You have an idea, but it is not in motion yet." },
            { value: "no_idea_yet", label: "No idea yet", hint: "You want a route, but the business itself is not chosen yet." }
        ]
    };

    return [stageQuestion, ...branchQuestions[stage]];
}

function renderCurrentView() {
    updateProgress();
    backButton.hidden = state.index === 0 && state.phase === "questions";
    nextButton.disabled = !state.selectedValue;

    if (state.phase === "questions") {
        renderQuestion();
        return;
    }

    if (state.phase === "teaser") {
        renderTeaser();
        return;
    }

    if (state.phase === "lead") {
        renderLeadCapture();
        return;
    }

    renderResult();
}

function renderQuestion() {
    const question = state.questionSet[state.index];
    state.selectedValue = state.answers[question.id] || "";
    modeTitle.textContent = question.modeTitle;
    nextButton.textContent = state.index === state.questionSet.length - 1 ? "See preview" : "Next";

    const card = document.createElement("section");
    card.className = "question-card";
    card.innerHTML = `
        <div class="question-meta">${question.modeTitle}</div>
        <div class="question-copy">
            <h3>${question.title}</h3>
            <p>${question.detail}</p>
        </div>
        <div class="options-grid">
            ${question.options.map((option) => `
                <button class="option-card${state.selectedValue === option.value ? " selected" : ""}" type="button" data-value="${option.value}">
                    <strong>${option.label}</strong>
                    <span>${option.hint}</span>
                </button>
            `).join("")}
        </div>
    `;

    stageEl.innerHTML = "";
    stageEl.appendChild(card);

    card.querySelectorAll(".option-card").forEach((button) => {
        button.addEventListener("click", () => {
            state.selectedValue = button.dataset.value;
            state.answers[question.id] = state.selectedValue;
            if (question.id === "stage") {
                state.questionSet = buildQuestionSet(state.selectedValue);
                pruneStageAnswers();
            }
            renderCurrentView();
        });
    });
}

function pruneStageAnswers() {
    Object.keys(state.answers).forEach((key) => {
        if (key === "stage") return;
        const existsInSet = state.questionSet.some((question) => question.id === key);
        if (!existsInSet) {
            delete state.answers[key];
        }
    });
}

function updateProgress() {
    const totalQuestionCount = state.questionSet.length;
    let progressCount = state.index + 1;
    let label = `Question ${Math.min(progressCount, totalQuestionCount)} of ${totalQuestionCount}`;

    if (state.phase === "teaser") {
        progressCount = totalQuestionCount + 1;
        label = "Teaser result";
    } else if (state.phase === "lead") {
        progressCount = totalQuestionCount + 2;
        label = "Lead capture";
    } else if (state.phase === "result") {
        progressCount = totalQuestionCount + 3;
        label = "Your plan";
    }

    const totalPhases = totalQuestionCount + 3;
    progressText.textContent = label;
    progressBar.style.width = `${(progressCount / totalPhases) * 100}%`;
}

function nextStep() {
    if (state.phase === "questions") {
        const question = state.questionSet[state.index];
        if (!state.answers[question.id]) return;

        if (state.index < state.questionSet.length - 1) {
            state.index += 1;
            state.selectedValue = "";
            renderCurrentView();
            return;
        }

        state.phase = "teaser";
        state.selectedValue = "continue";
        renderCurrentView();
        return;
    }

    if (state.phase === "teaser") {
        state.phase = "lead";
        state.selectedValue = "lead";
        renderCurrentView();
    }
}

function previousStep() {
    if (state.phase === "questions") {
        if (state.index === 0) return;
        state.index -= 1;
        state.selectedValue = "";
        renderCurrentView();
        return;
    }

    if (state.phase === "teaser") {
        state.phase = "questions";
        state.index = state.questionSet.length - 1;
        state.selectedValue = state.answers[state.questionSet[state.index].id] || "";
        renderCurrentView();
        return;
    }

    if (state.phase === "lead") {
        state.phase = "teaser";
        renderCurrentView();
        return;
    }

    if (state.phase === "result") {
        state.phase = "lead";
        renderCurrentView();
    }
}

function renderTeaser() {
    const result = generatePlan(state.answers);
    modeTitle.textContent = "Personalised preview";
    nextButton.disabled = false;
    nextButton.textContent = "Unlock full plan";

    stageEl.innerHTML = `
        <section class="teaser-card">
            <div class="question-meta">AI-style teaser</div>
            <h3>${result.teaserHeadline}</h3>
            <p>${result.teaserCopy}</p>
            <div class="teaser-highlight">
                <strong>Biggest opportunity</strong>
                <span>${result.biggestOpportunity}</span>
            </div>
            <div class="result-chip-row">
                <span class="chip">${result.stageLabel}</span>
                <span class="chip">${result.recommendedPack}</span>
                <span class="chip">${result.recommendedSystem}</span>
            </div>
            <p class="helper-text">Drop your details on the next screen and Dynmo will reveal the full 7-day plan, recommended lane, and a copyable action summary on this device.</p>
        </section>
    `;
}

function renderLeadCapture() {
    const lead = state.lead || {};
    modeTitle.textContent = "Lead capture";
    nextButton.disabled = true;
    nextButton.textContent = "Next";

    stageEl.innerHTML = `
        <section class="lead-card">
            <div class="question-meta">Unlock the full plan</div>
            <h3>Where should Dynmo send the plan direction?</h3>
            <p>This version is still static, so nothing is pushed to a CRM. Your details and plan stay in browser state on this device unless you copy or mail them out yourself.</p>
            <form id="leadForm" novalidate>
                <div class="lead-grid">
                    <label class="field">
                        <span>Name</span>
                        <input type="text" name="name" value="${escapeAttr(lead.name || "")}" required>
                    </label>
                    <label class="field">
                        <span>Email</span>
                        <input type="email" name="email" value="${escapeAttr(lead.email || "")}" required>
                    </label>
                    <label class="field">
                        <span>Phone or WhatsApp</span>
                        <input type="text" name="phone" value="${escapeAttr(lead.phone || "")}">
                    </label>
                    <label class="field">
                        <span>Build this for me?</span>
                        <input type="text" name="intentText" value="${escapeAttr(lead.intentText || "")}" placeholder="Optional detail on what you want built first">
                    </label>
                    <label class="field-wide">
                        <span>Anything important Dynmo should know?</span>
                        <textarea name="notes" placeholder="Optional context">${escapeText(lead.notes || "")}</textarea>
                    </label>
                </div>
                <label class="intent-row">
                    <input type="checkbox" name="buildIntent" ${lead.buildIntent ? "checked" : ""}>
                    <span>Yes, I want Dynmo to build or map this system with me.</span>
                </label>
                <label class="checkbox-row">
                    <input type="checkbox" name="consent" ${lead.consent ? "checked" : ""} required>
                    <span>I consent to Dynmo using these details to follow up about this assessment and related services.</span>
                </label>
                <div class="lead-actions">
                    <button class="button button-primary" type="submit">Generate my full plan</button>
                </div>
                <p class="privacy-note">No guaranteed income claims. No backend storage claim. This is an on-device static-site fallback until a real pipeline exists.</p>
            </form>
        </section>
    `;

    const leadForm = document.getElementById("leadForm");
    leadForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = new FormData(leadForm);
        const payload = {
            name: String(form.get("name") || "").trim(),
            email: String(form.get("email") || "").trim(),
            phone: String(form.get("phone") || "").trim(),
            notes: String(form.get("notes") || "").trim(),
            intentText: String(form.get("intentText") || "").trim(),
            buildIntent: form.get("buildIntent") === "on",
            consent: form.get("consent") === "on"
        };

        if (!payload.name || !payload.email || !payload.consent) {
            window.alert("Name, email, and consent are required before the full plan can be shown.");
            return;
        }

        state.lead = payload;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers: state.answers, lead: state.lead }));
        state.phase = "result";
        renderCurrentView();
    });
}

function renderResult() {
    const result = generatePlan(state.answers);
    const lead = state.lead || {};
    const summary = buildSummaryText(result, lead, state.answers);
    modeTitle.textContent = "Full plan";
    nextButton.disabled = true;
    nextButton.textContent = "Complete";

    const mailSubject = encodeURIComponent(`Dynmo plan for ${lead.name || "new lead"} - ${result.recommendedPack}`);
    const mailBody = encodeURIComponent(summary);

    stageEl.innerHTML = `
        <section class="result-card">
            <div class="question-meta">Personalised result</div>
            <h3>${result.headline}</h3>
            <p>${result.summary}</p>
            <div class="result-chip-row">
                <span class="chip">${result.stageLabel}</span>
                <span class="chip">${result.recommendedSystem}</span>
                <span class="chip">${result.recommendedPack}</span>
            </div>

            <div class="result-grid">
                <div class="result-block">
                    <strong>Biggest opportunity / leak</strong>
                    <p>${result.biggestOpportunity}</p>
                </div>
                <div class="result-block">
                    <strong>7-day action plan</strong>
                    <ul>${result.sevenDayPlan.map((step) => `<li>${step}</li>`).join("")}</ul>
                </div>
                <div class="result-block">
                    <strong>Why Dynmo is recommending this lane</strong>
                    <p>${result.reasonWhy}</p>
                </div>
                <div class="result-block">
                    <strong>CTA</strong>
                    <p>${result.cta}</p>
                </div>
            </div>

            <div class="result-actions">
                <button class="button button-primary" type="button" id="copyPlanButton">Copy / send this plan</button>
                <a class="button button-secondary" href="mailto:hello@dynmo.ai?subject=${mailSubject}&body=${mailBody}">Email this plan</a>
                <a class="button button-ghost" href="#packs">Compare packs again</a>
            </div>
            <p class="result-note">Static fallback active. The plan is stored only in this browser for now. A real backend or CRM handoff still needs implementing.</p>
        </section>
    `;

    const copyButton = document.getElementById("copyPlanButton");
    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(summary);
            copyButton.textContent = "Plan copied";
        } catch (error) {
            window.alert("Could not access the clipboard. You can still use the email button.");
        }
    });
}

function generatePlan(answers) {
    const stage = answers.stage;
    const meta = stageMeta[stage];
    let recommendedPack = "Booking Pack";
    let recommendedSystem = "Inbound capture lane";
    let biggestOpportunity = "The fastest win is tightening up lead capture and response speed.";
    let headline = meta.headline;
    let summary = "";
    let teaserHeadline = "";
    let teaserCopy = "";
    let reasonWhy = "";
    let cta = "";
    let sevenDayPlan = [];

    if (stage === "existing_business") {
        const mainLeak = answers.mainLeak;
        if (mainLeak === "missed-enquiries" || (answers.businessType === "appointment" && answers.channels === "phone-dm")) {
            recommendedPack = "Booking Pack";
            recommendedSystem = "Instant reply and booking rescue";
            biggestOpportunity = "You already have intent hitting the business. The leak is speed, response consistency, and booking capture.";
        } else if (mainLeak === "follow-up" || mainLeak === "repeat-revenue") {
            recommendedPack = "Revenue Pack";
            recommendedSystem = "Follow-up and customer growth engine";
            biggestOpportunity = "Your customers and leads need stronger follow-up, repeat-booking nudges, and reactivation loops.";
        } else {
            recommendedPack = "Machine Pack";
            recommendedSystem = "Multi-channel automation machine";
            biggestOpportunity = "The business has enough moving parts that routing, handoff, and channel coordination are the real bottlenecks now.";
        }

        if (answers.automationReadiness === "scale" || answers.channels === "multi" || answers.leadVolume === "heavy") {
            recommendedPack = "Machine Pack";
            recommendedSystem = "Scale-ready AI operations machine";
        }

        teaserHeadline = `Dynmo sees a ${recommendedSystem.toLowerCase()} play.`;
        teaserCopy = "You do not need more generic AI noise. You need the first system that stops the current leak and compounds into stronger revenue movement.";
        summary = `For an existing business, the smartest move is to stabilise the current customer path first, then layer extra automation once that path is converting cleanly.`;
        reasonWhy = `Your answers point to ${recommendedPack} because the real issue is ${biggestOpportunity.toLowerCase()}`;
        cta = `Build the ${recommendedPack} lane first, prove the gain, then decide whether to extend into the next Dynmo system.`;
        sevenDayPlan = [
            "Day 1: map the first customer touchpoint and the moment leads currently stall.",
            "Day 2: list the top questions, booking triggers, or follow-up moments Dynmo should handle.",
            "Day 3: define the primary channel and the human handoff rule.",
            "Day 4: script the strongest next-action message for the first workflow.",
            "Day 5: choose one metric to watch, such as replies, booked calls, or repeat bookings.",
            "Day 6: test the flow on a small live slice of enquiries.",
            "Day 7: review the weak point and refine the system instead of adding more complexity."
        ];
    }

    if (stage === "side_hustle") {
        if (answers.mainHustleLeak === "not-enough-demand" || answers.traction === "none" || answers.growthChannel === "unsure") {
            recommendedPack = "Starter path before pack";
            recommendedSystem = "Offer clarity and first demand sprint";
            biggestOpportunity = "The hustle needs a sharper offer and a clearer first demand lane before a bigger automation build makes sense.";
        } else if (answers.buildIntent === "capture" || answers.offerType === "appointments" || answers.mainHustleLeak === "no-system") {
            recommendedPack = "Booking Pack";
            recommendedSystem = "Lead capture starter system";
            biggestOpportunity = "You can create faster momentum by handling enquiries and booking moments cleanly instead of manually.";
        } else if (answers.buildIntent === "grow" || answers.traction === "paying") {
            recommendedPack = "Revenue Pack";
            recommendedSystem = "Side-hustle growth engine";
            biggestOpportunity = "You have enough signal already to benefit from follow-up, nurture, and better customer lifetime value.";
        } else {
            recommendedPack = "Machine Pack";
            recommendedSystem = "Lean automation stack";
            biggestOpportunity = "Your time pressure is strong enough that small workflows and routing logic could create immediate leverage.";
        }

        teaserHeadline = `Dynmo reads this as a ${recommendedSystem.toLowerCase()} move.`;
        teaserCopy = "The side hustle does not need a bloated system. It needs the smallest AI lane that creates proof, speed, and repeatability.";
        summary = "For a side hustle, the right first step is usually the sharpest small system that creates momentum without adding chaos to a busy week.";
        reasonWhy = `Your answers suggest ${recommendedPack} because the real unlock is ${biggestOpportunity.toLowerCase()}`;
        cta = recommendedPack === "Starter path before pack"
            ? "Use Dynmo to shape the starter route first, then move into the first pack once demand is clearer."
            : `Use Dynmo to build the ${recommendedPack} lane around the exact channel you expect the next customers to come from.`;
        sevenDayPlan = [
            "Day 1: define one offer and one customer type, not five versions.",
            "Day 2: choose the single channel most likely to produce the next reply.",
            "Day 3: write the fast-response message or booking prompt you would use every time.",
            "Day 4: build the tiny flow that captures, follows up, or reactivates leads.",
            "Day 5: send or test it with real people, not just drafts.",
            "Day 6: look at which message got movement and remove the fluff.",
            "Day 7: decide whether the hustle now needs Booking, Revenue, or a deeper machine."
        ];
    }

    if (stage === "idea_not_started") {
        recommendedPack = "Starter path before pack";
        recommendedSystem = "Idea validation and launch path";
        biggestOpportunity = "Your next win is not advanced automation. It is turning the idea into a concrete offer with real demand proof.";

        if (answers.ideaType === "appointments") {
            recommendedPack = "Likely first pack: Booking Pack";
            recommendedSystem = "Starter launch path with future booking system";
            biggestOpportunity = "If this launches well, the first automation win will likely be booking capture and fast inbound handling.";
        } else if (answers.ideaType === "service" && answers.validation === "people-asked") {
            recommendedPack = "Likely first pack: Revenue Pack";
            recommendedSystem = "Starter launch path with future follow-up engine";
            biggestOpportunity = "There is enough signal to shape a service offer and then add stronger follow-up and customer growth logic.";
        }

        teaserHeadline = "Dynmo sees a starter path first, pack second.";
        teaserCopy = "You are still pre-launch, so the AI move is to shape the idea into something the market can answer, then map the first pack naturally.";
        summary = "For an unstarted business idea, the job is to narrow the niche, define the offer, and create the first demand signal before building the heavier system.";
        reasonWhy = `This recommendation exists because ${biggestOpportunity.toLowerCase()}`;
        cta = "Use the starter path to get the idea launchable, then move into the likely first Dynmo pack once the offer is live.";
        sevenDayPlan = [
            "Day 1: define the customer, the problem, and the promised outcome in one sentence.",
            "Day 2: write a simple first offer that someone could actually buy.",
            "Day 3: collect or create three proof points that the problem is real.",
            "Day 4: choose the best first channel to test the idea.",
            "Day 5: put the offer in front of real people and watch the reaction.",
            "Day 6: tighten the wording based on what confused or attracted them.",
            "Day 7: decide whether the first Dynmo system should be Booking or Revenue once the idea becomes a real offer."
        ];
    }

    if (stage === "no_idea_yet") {
        recommendedPack = "Starter path before pack";
        recommendedSystem = "Idea selection and first offer sprint";
        biggestOpportunity = "The biggest win is picking a lane that matches your strengths and your time budget instead of chasing random business ideas.";

        if (answers.interestLane === "appointments") {
            recommendedPack = "Likely first pack: Booking Pack";
            recommendedSystem = "Appointment business starter lane";
            biggestOpportunity = "An appointment-style business could get to a first booking system quickly once the offer is defined.";
        } else if (answers.interestLane === "service" && answers.incomeAim !== "quick-cash") {
            recommendedPack = "Likely first pack: Revenue Pack";
            recommendedSystem = "Service offer starter lane";
            biggestOpportunity = "A service business with repeat demand could grow into follow-up and retention systems fast.";
        } else if (answers.interestLane === "ai-support" || answers.incomeAim === "big-build") {
            recommendedPack = "Likely first pack: Machine Pack";
            recommendedSystem = "AI-led operator lane";
            biggestOpportunity = "You seem drawn to a more system-heavy route, which could later justify a Machine Pack build.";
        }

        teaserHeadline = "Dynmo is not forcing a pack on you too early.";
        teaserCopy = "The smartest move is to find the starter route first, then point you toward the first Dynmo system that makes sense once the business exists.";
        summary = "If there is no idea yet, the first plan should reduce confusion, pick a profitable direction, and create a sellable first offer before any bigger automation layer.";
        reasonWhy = `This starter recommendation fits because ${biggestOpportunity.toLowerCase()}`;
        cta = "Use Dynmo to choose the lane, shape the first offer, and only then move into the likely first pack.";
        sevenDayPlan = [
            "Day 1: list your strongest skills, trust assets, and interests.",
            "Day 2: pick one customer type you understand or can reach.",
            "Day 3: generate three simple offer ideas around that customer and choose one.",
            "Day 4: write the first message or pitch that explains the offer clearly.",
            "Day 5: test that pitch with real people or communities.",
            "Day 6: cut the weak ideas and keep the lane that got curiosity.",
            "Day 7: decide the likely first system Dynmo should help build once the idea has shape."
        ];
    }

    return {
        stageLabel: meta.label,
        recommendedPack,
        recommendedSystem,
        biggestOpportunity,
        headline,
        summary,
        teaserHeadline,
        teaserCopy,
        reasonWhy,
        cta,
        sevenDayPlan
    };
}

function buildSummaryText(result, lead, answers) {
    const answerLines = Object.entries(answers)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

    return [
        `Dynmo assessment plan for ${lead.name || "new lead"}`,
        ``,
        `Email: ${lead.email || "n/a"}`,
        `Phone/WhatsApp: ${lead.phone || "n/a"}`,
        `Build intent: ${lead.buildIntent ? "Yes" : "No"}`,
        `Extra notes: ${lead.notes || "n/a"}`,
        ``,
        `Stage: ${result.stageLabel}`,
        `Recommended system: ${result.recommendedSystem}`,
        `Recommended pack: ${result.recommendedPack}`,
        ``,
        `Headline: ${result.headline}`,
        `Biggest opportunity / leak: ${result.biggestOpportunity}`,
        `Reason: ${result.reasonWhy}`,
        ``,
        `7-day action plan:`,
        ...result.sevenDayPlan.map((step, index) => `${index + 1}. ${step}`),
        ``,
        `CTA: ${result.cta}`,
        ``,
        `Structured answers:`,
        answerLines
    ].join("\n");
}

function loadStoredState() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return { lead: null, answers: null };
        const parsed = JSON.parse(raw);
        return {
            lead: parsed.lead || null,
            answers: parsed.answers || null
        };
    } catch (error) {
        return { lead: null, answers: null };
    }
}

function escapeAttr(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeText(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

nextButton.addEventListener("click", nextStep);
backButton.addEventListener("click", previousStep);
