const STORAGE_KEY = "dynmo-assessment-v3";

const branches = {
    existing_business: [
        question("businessType", "Business type", "What kind of business is this?", "Pick the closest fit so the recommendation feels real.", [
            option("appointments", "Appointments and bookings", "Salon, barber, clinic, beauty, coaching, fitness."),
            option("services", "Service business", "Trades, home services, repair, local specialists."),
            option("hospitality", "Retail or hospitality", "Restaurant, takeaway, venue, shop, footfall business."),
            option("team", "Agency or busy team", "Leads, admin, and customer messages across multiple people.")
        ]),
        question("mainLeak", "Main bottleneck", "Where are you losing people or time right now?", "Choose the one that hurts most today.", [
            option("missed-enquiries", "Missed enquiries", "Calls, DMs, or forms are not handled fast enough."),
            option("slow-follow-up", "Slow follow-up", "Warm leads go cold after the first conversation."),
            option("repeat-revenue", "Past customers do not come back enough", "Reviews, rebooking, and repeat sales are weak."),
            option("admin-chaos", "Too much admin and too many moving parts", "Everything feels scattered.")
        ]),
        question("demandLevel", "Demand check", "How busy are you right now?", "This helps decide whether the first win is capture, nurture, or calm.", [
            option("light", "Light flow", "A few enquiries or bookings each week."),
            option("steady", "Steady flow", "You get regular demand but it is not controlled."),
            option("busy", "Busy already", "Plenty comes in. The handling is the issue."),
            option("heavy", "Heavy and messy", "High volume across channels or team members.")
        ]),
        question("firstTouch", "First touch", "Where do customers usually contact you first?", "The first contact point often shapes the helper.", [
            option("phone-dm", "Phone calls and DMs", "Fast replies matter most."),
            option("website", "Website or Google", "Forms and web enquiries matter most."),
            option("social", "Instagram, Facebook, or WhatsApp", "Social message speed matters most."),
            option("mixed", "A mix of everything", "You need calmer routing and handoff.")
        ]),
        question("buildReadiness", "Build depth", "How big a first build do you want?", "Some businesses need one sharp fix. Others want a broader setup.", [
            option("simple", "Start simple", "One strong flow first."),
            option("growth", "Build for growth", "Booking plus follow-up."),
            option("system", "Build a broader system", "More channels, more routing, more admin support.")
        ])
    ],
    side_hustle: [
        question("offerState", "Offer check", "What are you trying to sell right now?", "Even a small hustle gets a better plan when the offer is clear.", [
            option("appointments", "Appointments or sessions", "Coaching, beauty, training, consulting."),
            option("service", "Done-for-you service", "Freelance, marketing, editing, admin, local help."),
            option("product", "Product or ecommerce", "Physical or digital products."),
            option("fuzzy", "Still a bit fuzzy", "You know you want something, but the offer is not sharp.")
        ]),
        question("traction", "Traction check", "How much proof do you already have?", "This helps Dynmo avoid recommending too much too early.", [
            option("paying", "I already have paying customers", "Small but real proof."),
            option("warm", "I have warm leads or audience interest", "People are interested, but it is patchy."),
            option("testing", "I am still testing the idea", "Early validation mode."),
            option("none", "No real proof yet", "The first signal still needs creating.")
        ]),
        question("hustleLeak", "Main bottleneck", "What slows the hustle down most?", "Pick the thing that is really choking momentum.", [
            option("slow-replies", "Slow replies and weak follow-up", "People are not getting handled properly."),
            option("no-system", "No booking or sales system", "Too much winging it."),
            option("not-enough-demand", "Not enough demand", "Offer and audience clarity come first."),
            option("time-pressure", "Not enough time", "You need leverage more than more tasks.")
        ]),
        question("timeCapacity", "Capacity check", "How much time can you actually put in each week?", "The plan should fit reality.", [
            option("under5", "Under 5 hours", "Needs ruthless focus."),
            option("5to10", "5 to 10 hours", "Enough for one clear push."),
            option("10plus", "10+ hours", "Enough to build real momentum.")
        ]),
        question("channel", "Next customers", "Where do you think the next customers come from?", "That shapes the first helper move.", [
            option("social", "Social media or DMs", "The conversation lane matters most."),
            option("referrals", "Referrals or word of mouth", "Follow-up matters most."),
            option("search", "Search or website", "Booking and response flow matter."),
            option("unsure", "Not clear yet", "Need sharper direction first.")
        ])
    ],
    no_idea_yet: [
        question("strengthZone", "Starting point", "What is your strongest starting advantage?", "If there is no idea yet, start from what is already there.", [
            option("people", "Talking to people and building trust", "Sales, care, service, community."),
            option("craft", "A practical or creative skill", "Making, fixing, teaching, designing."),
            option("systems", "Organisation and systems", "Admin, operations, process."),
            option("audience", "I know a niche or audience", "You know the people before the offer.")
        ]),
        question("interestLane", "Business style", "What kind of business style pulls you most?", "This helps Dynmo shape the first route.", [
            option("service", "Simple service business", "Sell a clear outcome."),
            option("appointments", "Appointment-based", "Sessions, treatments, consulting."),
            option("product", "Product business", "Physical or digital."),
            option("ai-support", "Helping businesses with AI support", "More system-led.")
        ]),
        question("customerClarity", "Customer clarity", "How clear is the first customer in your head?", "This changes whether the next step is idea clarity or outreach.", [
            option("clear", "Pretty clear", "You can picture the buyer."),
            option("somewhat", "Somewhat clear", "You know the type, not the exact person."),
            option("blank", "Still blank", "Need help picking a lane.")
        ]),
        question("timeBudget", "Time reality", "What kind of time do you really have?", "The plan should suit your life.", [
            option("little", "A few hours a week", "Need a lean first move."),
            option("moderate", "A solid side-hustle block", "Enough to validate properly."),
            option("serious", "I can go hard", "Enough to test and build quickly.")
        ]),
        question("firstNeed", "What helps most", "What would help most in the next 7 days?", "This points to the simplest useful next step.", [
            option("pick-idea", "Pick the best idea", "Narrow the lane."),
            option("shape-offer", "Shape a sellable offer", "Make the idea clearer."),
            option("find-channel", "Figure out where customers come from", "Find the first path to demand.")
        ])
    ]
};

const adaptive = {
    existing_business: [
        {
            after: "mainLeak",
            when: (answers) => answers.mainLeak === "missed-enquiries",
            question: question("missedMoment", "Adaptive check", "When do those enquiries usually get missed?", "This only appears because missed enquiries look like the main leak.", [
                option("after-hours", "After hours", "People message when nobody is watching."),
                option("busy-day", "During busy periods", "The team is busy serving customers."),
                option("no-next-step", "They get a reply but no clear next step", "The conversation starts but stalls.")
            ])
        },
        {
            after: "mainLeak",
            when: (answers) => answers.mainLeak === "slow-follow-up" || answers.mainLeak === "repeat-revenue",
            question: question("followGap", "Adaptive check", "What kind of follow-up slips most?", "This helps separate follow-up help from a broader admin issue.", [
                option("quotes", "Quotes and warm leads go cold", "The next message does not happen."),
                option("reviews", "Reviews and referrals never get asked for", "Proof and repeat business are being missed."),
                option("rebook", "Repeat bookings are not prompted", "People would come back with the right nudge.")
            ])
        },
        {
            after: "firstTouch",
            when: (answers) => answers.firstTouch === "mixed" || answers.buildReadiness === "system" || answers.demandLevel === "heavy",
            question: question("handoffMess", "Adaptive check", "What makes the current handoff messy?", "This appears when the pattern looks more operational.", [
                option("people", "Multiple people handle leads", "Ownership gets blurry."),
                option("tools", "Too many tools or inboxes", "Information is scattered."),
                option("priority", "No clear priority system", "Hot leads look like normal admin.")
            ])
        }
    ],
    side_hustle: [
        {
            after: "traction",
            when: (answers) => answers.traction === "testing" || answers.traction === "none" || answers.offerState === "fuzzy",
            question: question("validationBlocker", "Adaptive check", "What blocks the first real proof?", "This appears because the hustle still needs validation.", [
                option("offer", "The offer is not clear enough", "People do not get the value fast."),
                option("audience", "I am not sure who to sell to", "The buyer needs sharpening."),
                option("asked", "I have not properly asked the market yet", "The next move is direct testing.")
            ])
        },
        {
            after: "hustleLeak",
            when: (answers) => answers.hustleLeak === "time-pressure",
            question: question("timeDrain", "Adaptive check", "Where is time leaking hardest?", "This shows up because you said time is the issue.", [
                option("replying", "Replying and chasing people", "Messages eat the week."),
                option("admin", "Admin and organising work", "Ops steal selling time."),
                option("content", "Posting without enough sales", "Attention is not converting.")
            ])
        }
    ],
    no_idea_yet: [
        {
            after: "interestLane",
            when: (answers) => answers.interestLane === "ai-support" || answers.strengthZone === "systems",
            question: question("operatorFit", "Adaptive check", "Do you want to sell outcomes or build systems for others?", "This helps decide whether your first move is practical or more technical.", [
                option("service", "Sell a simple service outcome", "Start practical and paid."),
                option("systems", "Build systems for businesses", "More operator-led."),
                option("unsure", "Not sure yet", "Need a low-risk test first.")
            ])
        },
        {
            after: "customerClarity",
            when: (answers) => answers.customerClarity === "blank",
            question: question("audienceAccess", "Adaptive check", "Who can you realistically reach first?", "When the customer is blank, access beats random ideas.", [
                option("local", "People locally or in my network", "Fastest first conversations."),
                option("online", "An online niche or community", "Specific audience with shared problems."),
                option("owners", "Business owners", "B2B route with clearer money problems.")
            ])
        }
    ]
};

const stageMeta = {
    existing_business: {
        label: "Existing business",
        line: "You already have demand somewhere. The job is stopping the leak."
    },
    side_hustle: {
        label: "Side hustle",
        line: "You need a smarter first system without overbuilding too early."
    },
    no_idea_yet: {
        label: "No idea yet",
        line: "You need a clearer first move before any bigger build."
    }
};

const pricingTiers = {
    Starter: "£97 setup + £20/mo",
    Growth: "£150 setup + £30/mo",
    Agency: "£297 setup + £50/mo"
};

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");
const stageEl = document.getElementById("assessmentStage");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const modeTitle = document.getElementById("assessmentModeTitle");
const hasAssessment = Boolean(stageEl && nextButton && backButton && progressText && progressBar && modeTitle);

const state = {
    phase: "questions",
    index: 0,
    stage: "existing_business",
    answers: {},
    selectedValue: "",
    questionSet: [],
    lead: loadStoredState().lead || null
};

initSite();

function initSite() {
    bindNav();
    initReveal();
    initTextReveal();
    initPreviewLoops();
    if (hasAssessment) {
        startAssessment();
    }
}

function option(value, label, hint) {
    return { value, label, hint };
}

function question(id, modeTitle, title, detail, options) {
    return { id, modeTitle, title, detail, options };
}

function bindNav() {
    if (!navToggle || !navMenu) {
        return;
    }

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
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
}

function initTextReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    document.querySelectorAll("[data-reveal-text]").forEach((heading) => {
        const text = heading.textContent.trim().split(/\s+/);
        heading.innerHTML = text.map((word, index) => `<span class="word" style="animation-delay:${index * 80}ms">${escapeHtml(word)}&nbsp;</span>`).join("");
    });
}

function initPreviewLoops() {
    paintLoop("heroPreviewChat", [
        [
            { type: "user", text: "We keep missing calls when the team is busy." },
            { type: "ai", text: "That sounds like a Booking Helper job." },
            { type: "result", text: "Fast reply. Clear next step. More bookings." }
        ],
        [
            { type: "user", text: "Leads go cold after the first quote." },
            { type: "ai", text: "That points to a Follow-Up Helper." },
            { type: "result", text: "More nudges. More replies. More return business." }
        ]
    ], "preview-bubble");

    paintLoop("demoTrack", [
        [
            { type: "ai", text: "What kind of business is this?" },
            { type: "user", text: "Existing business" },
            { type: "ai", text: "Where are you losing people?" },
            { type: "user", text: "Missed enquiries" },
            { type: "result", text: "Best fit: Booking Helper" }
        ],
        [
            { type: "ai", text: "What slows the business down most?" },
            { type: "user", text: "Too much admin" },
            { type: "ai", text: "How broad does the fix need to be?" },
            { type: "user", text: "Broader system" },
            { type: "result", text: "Best fit: Admin Helper" }
        ],
        [
            { type: "ai", text: "What would help most in the next 7 days?" },
            { type: "user", text: "Shape a sellable offer" },
            { type: "ai", text: "That points to a simpler first-move path." },
            { type: "result", text: "Best fit: Idea Helper" }
        ]
    ], "device-bubble");
}

function paintLoop(targetId, sequences, classPrefix) {
    const target = document.getElementById(targetId);
    if (!target) {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let sequenceIndex = 0;

    const run = () => {
        target.innerHTML = "";
        const active = sequences[sequenceIndex];
        active.forEach((item, idx) => {
            const delay = reduceMotion ? 0 : idx * 650;
            window.setTimeout(() => {
                const el = document.createElement("div");
                el.className = `${classPrefix} ${item.type}`;
                el.textContent = item.text;
                target.appendChild(el);
            }, delay);
        });
        sequenceIndex = (sequenceIndex + 1) % sequences.length;
        if (!reduceMotion) {
            window.setTimeout(run, 4700);
        }
    };

    run();
}

function startAssessment() {
    state.phase = "questions";
    state.index = 0;
    state.answers = {};
    state.stage = "existing_business";
    state.questionSet = buildQuestionSet(state.stage, state.answers);
    state.selectedValue = "";
    renderCurrentView();

    nextButton.addEventListener("click", nextStep);
    backButton.addEventListener("click", previousStep);
}

function buildQuestionSet(stage, answers) {
    const stageQuestion = question("stage", "Starting point", "Which of these sounds most like you right now?", "This first answer changes the route that follows.", [
        option("existing_business", "Existing business", "You are already trading and want to fix a bottleneck."),
        option("side_hustle", "Side hustle", "There is some movement already, but it is not a full machine yet."),
        option("no_idea_yet", "No clear idea yet", "You want a smart first move before building anything.")
    ]);

    const questions = [stageQuestion];
    const base = branches[stage] || [];
    const extras = adaptive[stage] || [];

    base.forEach((entry) => {
        questions.push(entry);
        extras.filter((extra) => extra.after === entry.id && extra.when(answers)).forEach((extra) => {
            questions.push(extra.question);
        });
    });

    return questions;
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
    const current = state.questionSet[state.index];
    state.selectedValue = state.answers[current.id] || "";
    modeTitle.textContent = current.modeTitle;
    nextButton.textContent = state.index === state.questionSet.length - 1 ? "See preview" : "Next";

    const transcript = buildTranscript(current.id);
    const card = document.createElement("section");
    card.className = "chat-card";
    card.innerHTML = `
        <div class="chat-transcript">
            ${transcript}
        </div>
        <div class="chat-question">
            <strong>${escapeHtml(current.title)}</strong>
            <span>${escapeHtml(current.detail)}</span>
        </div>
        <div class="options-grid">
            ${current.options.map((item) => `
                <button class="option-card${state.selectedValue === item.value ? " selected" : ""}" type="button" data-value="${escapeAttr(item.value)}">
                    <strong>${escapeHtml(item.label)}</strong>
                    <span>${escapeHtml(item.hint)}</span>
                </button>
            `).join("")}
        </div>
    `;

    stageEl.innerHTML = "";
    stageEl.appendChild(card);
    card.querySelectorAll(".option-card").forEach((button) => {
        button.addEventListener("click", () => {
            state.selectedValue = button.dataset.value || "";
            state.answers[current.id] = state.selectedValue;
            if (current.id === "stage") {
                state.stage = state.selectedValue;
            }
            state.questionSet = buildQuestionSet(state.stage, state.answers);
            pruneAnswers();
            const newIndex = state.questionSet.findIndex((entry) => entry.id === current.id);
            if (newIndex >= 0) {
                state.index = newIndex;
            }
            renderCurrentView();
        });
    });
}

function buildTranscript(currentId) {
    const answered = state.questionSet.slice(0, state.index).filter((item) => state.answers[item.id]);
    return answered.slice(-3).map((item) => `
        <div class="chat-message ai">
            <small>Dynmo</small>
            <span>${escapeHtml(item.title)}</span>
        </div>
        <div class="chat-message user">
            <small>You</small>
            <span>${escapeHtml(getOptionLabel(item, state.answers[item.id]))}</span>
        </div>
    `).join("") + `
        <div class="chat-message ai">
            <small>Dynmo</small>
            <span>${escapeHtml(stageMeta[state.stage].line)}</span>
        </div>
    `;
}

function pruneAnswers() {
    const validIds = new Set(state.questionSet.map((entry) => entry.id));
    Object.keys(state.answers).forEach((key) => {
        if (!validIds.has(key)) {
            delete state.answers[key];
        }
    });
}

function updateProgress() {
    const total = state.questionSet.length + 3;
    let current = state.index + 1;
    let label = `Question ${Math.min(current, state.questionSet.length)} of ${state.questionSet.length}`;

    if (state.phase === "teaser") {
        current = state.questionSet.length + 1;
        label = "Preview";
    } else if (state.phase === "lead") {
        current = state.questionSet.length + 2;
        label = "Your details";
    } else if (state.phase === "result") {
        current = state.questionSet.length + 3;
        label = "Your result";
    }

    progressText.textContent = label;
    progressBar.style.width = `${(current / total) * 100}%`;
}

function nextStep() {
    if (state.phase === "questions") {
        const current = state.questionSet[state.index];
        if (!state.answers[current.id]) {
            return;
        }
        if (state.index < state.questionSet.length - 1) {
            state.index += 1;
            state.selectedValue = state.answers[state.questionSet[state.index].id] || "";
            renderCurrentView();
            return;
        }
        state.phase = "teaser";
        state.selectedValue = "ready";
        renderCurrentView();
        return;
    }

    if (state.phase === "teaser") {
        state.phase = "lead";
        state.selectedValue = "";
        renderCurrentView();
    }
}

function previousStep() {
    if (state.phase === "questions") {
        if (state.index === 0) return;
        state.index -= 1;
        state.selectedValue = state.answers[state.questionSet[state.index].id] || "";
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
        state.selectedValue = "ready";
        renderCurrentView();
        return;
    }

    state.phase = "lead";
    renderCurrentView();
}

function renderTeaser() {
    const result = generatePlan(state.answers);
    modeTitle.textContent = "Narrowing it down";
    nextButton.disabled = false;
    nextButton.textContent = "Unlock full result";

    stageEl.innerHTML = `
        <section class="result-card">
            <div class="result-head">
                <span class="section-kicker">Preview</span>
                <h3>${escapeHtml(result.teaserHeadline)}</h3>
                <p>${escapeHtml(result.teaserCopy)}</p>
            </div>
            <div class="result-block">
                <strong>Biggest opportunity</strong>
                <p>${escapeHtml(result.biggestOpportunity)}</p>
            </div>
            <div class="result-actions">
                <span class="chip">${escapeHtml(result.helper)}</span>
                <span class="chip">${escapeHtml(result.tier)}</span>
                <span class="chip">${escapeHtml(stageMeta[state.stage].label)}</span>
            </div>
            <p style="margin-top:1rem;">Your fuller result is ready. Add your details on the next step and this static preview will show the best-fit helper, why it fits, first wins, and the build tier to consider.</p>
        </section>
    `;
}

function renderLeadCapture() {
    const lead = state.lead || {};
    modeTitle.textContent = "Where should we send the plan?";
    nextButton.disabled = true;
    nextButton.textContent = "Next";

    stageEl.innerHTML = `
        <section class="chat-card">
            <div class="result-head">
                <span class="section-kicker">Plan ready</span>
                <h3>Your plan is ready. Where should we send it?</h3>
                <p>This public version stays honest: no hidden CRM save, no fake backend, no pretend live model.</p>
            </div>
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
                        <span>Would you want this built?</span>
                        <input type="text" name="intent" value="${escapeAttr(lead.intent || "")}" placeholder="For example: yes, soon / maybe later">
                    </label>
                    <label class="field-wide">
                        <span>Anything else we should know?</span>
                        <textarea name="notes" placeholder="Short note about the business, the problem, or urgency.">${escapeHtml(lead.notes || "")}</textarea>
                    </label>
                </div>
                <label class="checkbox-row">
                    <input type="checkbox" name="consent" ${lead.consent ? "checked" : ""} required>
                    <span>I understand this static preview stores details only on this device unless I copy or email the result.</span>
                </label>
                <div class="result-actions">
                    <button class="button button-primary button-sweep" type="submit">Show my result</button>
                </div>
            </form>
        </section>
    `;

    document.getElementById("leadForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const payload = {
            name: String(form.get("name") || "").trim(),
            email: String(form.get("email") || "").trim(),
            phone: String(form.get("phone") || "").trim(),
            intent: String(form.get("intent") || "").trim(),
            notes: String(form.get("notes") || "").trim(),
            consent: form.get("consent") === "on"
        };

        if (!payload.name || !payload.email || !payload.consent) {
            window.alert("Name, email, and consent are required before the full result can be shown.");
            return;
        }

        state.lead = payload;
        persistState();
        state.phase = "result";
        renderCurrentView();
    });
}

function renderResult() {
    const lead = state.lead || {};
    const result = generatePlan(state.answers);
    const summary = buildSummaryText(result, lead, state.answers);
    const mailSubject = encodeURIComponent(`Dynmo result for ${lead.name || "new lead"} - ${result.helper}`);
    const mailBody = encodeURIComponent(summary);

    modeTitle.textContent = "Best fit ready";
    nextButton.disabled = true;
    nextButton.textContent = "Complete";

    stageEl.innerHTML = `
        <section class="result-card">
            <div class="result-head">
                <span class="section-kicker">Best fit</span>
                <h3>${escapeHtml(result.helper)}</h3>
                <p>${escapeHtml(result.summary)}</p>
            </div>
            <div class="result-actions">
                <span class="chip">${escapeHtml(stageMeta[state.stage].label)}</span>
                <span class="chip">${escapeHtml(result.tier)}</span>
                <span class="chip">${escapeHtml(pricingTiers[result.tier])}</span>
            </div>
            <div class="result-grid">
                <div class="result-block">
                    <strong>Why it fits</strong>
                    <p>${escapeHtml(result.why)}</p>
                </div>
                <div class="result-block">
                    <strong>First wins</strong>
                    <ul>${result.firstWins.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                </div>
                <div class="result-block">
                    <strong>Best path to build</strong>
                    <p>${escapeHtml(result.tier)}: ${escapeHtml(pricingTiers[result.tier])}</p>
                    <p style="margin-top:0.5rem;">${escapeHtml(result.tierReason)}</p>
                </div>
                <div class="result-block">
                    <strong>Pick your next move</strong>
                    <div class="pricing-mini-grid">
                        ${Object.entries(pricingTiers).map(([tier, price]) => `
                            <div class="pricing-mini-card">
                                <strong>${escapeHtml(tier)}</strong>
                                <p>${escapeHtml(price)}</p>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
            <div class="result-actions">
                <button class="button button-primary button-sweep" type="button" id="copyPlanButton">Copy plan</button>
                <a class="button button-secondary" href="mailto:hello@dynmo.ai?subject=${mailSubject}&body=${mailBody}">Email plan</a>
                <a class="button button-secondary" href="build-lanes.html">Compare tiers</a>
                <a class="button button-secondary" href="#assessmentPricing">See pricing below</a>
            </div>
            <p style="margin-top:1rem;">Static fallback active. This result is guided by your answers and saved only in this browser for now.</p>
        </section>
    `;

    document.getElementById("copyPlanButton").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(summary);
            document.getElementById("copyPlanButton").textContent = "Copied";
        } catch (error) {
            window.alert("Clipboard access failed. You can still email the plan.");
        }
    });
}

function generatePlan(answers) {
    const stage = answers.stage || "existing_business";
    const result = {
        helper: "Booking Helper",
        tier: "Growth",
        biggestOpportunity: "The fastest win is stopping warm enquiries from fading out.",
        teaserHeadline: "A stronger reply-and-follow-through system looks like the right move.",
        teaserCopy: "Dynmo sees a clear customer path problem that can be tightened quickly.",
        summary: "This helper is designed to stop customers slipping away while you are busy.",
        why: "Your answers point to slow or inconsistent response being the main leak.",
        firstWins: [
            "Reply faster to incoming interest.",
            "Make the next step obvious.",
            "Reduce the number of leads that quietly disappear."
        ],
        tierReason: "Growth is the best fit when you want a stronger customer path without jumping straight into a broad admin build."
    };

    if (stage === "existing_business") {
        if (answers.mainLeak === "admin-chaos" || answers.firstTouch === "mixed" || answers.buildReadiness === "system" || answers.demandLevel === "heavy") {
            result.helper = "Admin Helper";
            result.tier = "Agency";
            result.biggestOpportunity = "The business is busy enough that routing, admin, and handoff are creating the real drag.";
            result.teaserHeadline = "This looks like an Admin Helper build.";
            result.teaserCopy = "The issue is not just volume. It is the mess created by volume.";
            result.summary = "An Admin Helper would calm the handoff, sort the routing, and stop hot work getting buried in normal admin.";
            result.why = "Your answers suggest customers and tasks are spread across channels or people, so clearer routing matters most.";
            result.firstWins = [
                "Create one calmer lead path.",
                "Reduce messy handoffs across people or inboxes.",
                "Prioritise hot work before it gets buried."
            ];
            result.tierReason = "Agency fits when the fix needs broader routing, admin support, and a calmer operating rhythm.";
            return result;
        }

        if (answers.mainLeak === "slow-follow-up" || answers.mainLeak === "repeat-revenue" || answers.followGap) {
            result.helper = "Follow-Up Helper";
            result.tier = answers.buildReadiness === "simple" ? "Starter" : "Growth";
            result.biggestOpportunity = "You already have people showing interest. The money leak is what happens after first contact.";
            result.teaserHeadline = "This looks like a Follow-Up Helper play.";
            result.teaserCopy = "Dynmo sees value in better nudges, reminders, and repeat-business prompts.";
            result.summary = "A Follow-Up Helper would keep warm leads warm and bring more past customers back.";
            result.why = "Your answers point to people going cold after the first touch or not returning often enough.";
            result.firstWins = [
                "Nudge quotes and warm leads faster.",
                "Prompt repeat bookings at the right time.",
                "Ask for reviews and referrals more consistently."
            ];
            result.tierReason = result.tier === "Starter"
                ? "Starter works when one clean follow-up flow would solve the biggest problem first."
                : "Growth works when the follow-up path needs stronger coverage across more than one moment.";
            return result;
        }

        result.helper = "Booking Helper";
        result.tier = answers.buildReadiness === "simple" ? "Starter" : "Growth";
        result.biggestOpportunity = "People are already reaching out. The win is capturing them faster and guiding them to book.";
        result.teaserHeadline = "This looks like a Booking Helper play.";
        result.teaserCopy = "Missed calls, slow replies, and vague next steps are costing you warm demand.";
        result.summary = "A Booking Helper would respond faster, rescue missed interest, and make booking easier.";
        result.why = "Your answers point to lost demand before the booking or before the next clear step.";
        result.firstWins = [
            "Rescue missed calls or messages.",
            "Reply while the lead is still warm.",
            "Turn more conversations into booked action."
        ];
        result.tierReason = result.tier === "Starter"
            ? "Starter fits when one focused booking fix can create the first measurable win."
            : "Growth fits when you want booking help plus stronger follow-through.";
        return result;
    }

    if (stage === "side_hustle") {
        if (answers.hustleLeak === "not-enough-demand" || answers.traction === "none" || answers.channel === "unsure" || answers.offerState === "fuzzy") {
            result.helper = "Idea Helper";
            result.tier = "Starter";
            result.biggestOpportunity = "The hustle needs a clearer offer or first demand path before heavier automation makes sense.";
            result.teaserHeadline = "This looks like an Idea Helper play.";
            result.teaserCopy = "The best next step is clarity and proof, not a bigger build.";
            result.summary = "An Idea Helper would help sharpen the offer and point you at the first useful customer path.";
            result.why = "Your answers suggest the hustle still needs market clarity more than automation depth.";
            result.firstWins = [
                "Sharpen the offer in plain English.",
                "Pick the first realistic customer lane.",
                "Test demand without overcomplicating it."
            ];
            result.tierReason = "Starter fits because the next job is a smart first move, not a broad system.";
            return result;
        }

        if (answers.hustleLeak === "time-pressure") {
            result.helper = "Admin Helper";
            result.tier = "Starter";
            result.biggestOpportunity = "The hustle is losing momentum because basic organisation and handoff are eating time.";
            result.teaserHeadline = "This looks like a lighter Admin Helper move.";
            result.teaserCopy = "You need a calmer setup before you need a bigger system.";
            result.summary = "A lighter Admin Helper would free up time and keep messages, tasks, and next steps tighter.";
            result.why = "Your answers suggest time is leaking into admin instead of sales or delivery.";
            result.firstWins = [
                "Reduce admin drag.",
                "Tighten message handling.",
                "Create a clearer weekly rhythm."
            ];
            result.tierReason = "Starter fits because the first goal is reclaiming time, not building a full machine.";
            return result;
        }

        result.helper = "Booking Helper";
        result.tier = "Growth";
        result.biggestOpportunity = "The hustle can grow faster by handling enquiries and booking moments more cleanly.";
        result.teaserHeadline = "This looks like a Booking Helper play.";
        result.teaserCopy = "There is enough signal here to justify a cleaner customer path.";
        result.summary = "A Booking Helper would help turn interest into booked action with less chasing.";
        result.why = "Your answers show that demand exists, but the handling still needs tightening.";
        result.firstWins = [
            "Respond faster to warm interest.",
            "Make the booking path simpler.",
            "Stop leads drifting between messages."
        ];
        result.tierReason = "Growth fits when the hustle has enough movement to benefit from a stronger booking and follow-through path.";
        return result;
    }

    result.helper = "Idea Helper";
    result.tier = "Starter";
    result.biggestOpportunity = "The clearest win is picking a lane and turning it into a simple plan.";
    result.teaserHeadline = "This looks like an Idea Helper route.";
    result.teaserCopy = "Before building anything bigger, the next step is making the idea and audience clearer.";
    result.summary = "An Idea Helper would help you narrow the lane, shape the offer, and find the first useful move.";
    result.why = "Your answers suggest clarity matters more than automation depth right now.";
    result.firstWins = [
        "Pick the strongest starting idea.",
        "Shape a simple offer people understand.",
        "Figure out the first realistic customer route."
    ];
    result.tierReason = "Starter fits because this is about getting moving with clarity, not building a broad system yet.";
    return result;
}

function buildSummaryText(result, lead, answers) {
    return [
        `Dynmo result for ${lead.name || "new lead"}`,
        `Email: ${lead.email || "not provided"}`,
        lead.phone ? `Phone: ${lead.phone}` : "",
        `Stage: ${stageMeta[answers.stage || "existing_business"].label}`,
        `Best-fit helper: ${result.helper}`,
        `Best build tier: ${result.tier} (${pricingTiers[result.tier]})`,
        `Why it fits: ${result.why}`,
        "First wins:",
        ...result.firstWins.map((item) => `- ${item}`),
        lead.notes ? `Notes: ${lead.notes}` : ""
    ].filter(Boolean).join("\n");
}

function getOptionLabel(questionEntry, value) {
    const found = questionEntry.options.find((item) => item.value === value);
    return found ? found.label : value;
}

function persistState() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers: state.answers,
        lead: state.lead
    }));
}

function loadStoredState() {
    try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (error) {
        return {};
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
    return escapeHtml(value);
}
