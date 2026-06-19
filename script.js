(() => {
  "use strict";

  // Replace these with your real Stripe Payment Links after creating products in Stripe.
  // Example: https://buy.stripe.com/abc123...
  const PACKAGE_CONFIG = {
    will: {
      title: "Attorney-Drafted Will Plan",
      price: "$750",
      href: "#replace-with-will-payment-link",
      note: "For simpler estates that need attorney-prepared will documents, guardianship language, and core fiduciary choices.",
      bullets: ["Attorney-drafted will", "Basic document coordination", "Designed for lower-complexity plans"]
    },
    trust: {
      title: "Attorney-Drafted Trust Plan",
      price: "$2,500",
      href: "#replace-with-trust-payment-link",
      note: "For people who want trust-centered planning for privacy, probate reduction, real estate, and incapacity continuity.",
      bullets: ["Revocable trust package", "Pour-over will coordination", "Funding guidance checklist"]
    },
    consultation: {
      title: "Attorney Consultation",
      price: "$250",
      href: "mailto:hello@example.com?subject=Estate%20Planning%20Consultation%20Request",
      note: "Best when your answers suggest special-needs, business, tax, blended-family, or multi-state complexity.",
      bullets: ["Attorney issue-spotting", "State-specific review", "Plan recommendation"]
    }
  };

  const questions = [
    {
      id: "minorChildren",
      text: "Minor children?",
      hint: "A will can nominate guardians. A trust can help manage assets for children over time.",
      yes: { will: 3, both: 3 },
      no: { simple: 1 },
      unsure: { attorney: 1 }
    },
    {
      id: "realEstate",
      text: "Own real estate?",
      hint: "This includes a home, land, rental property, or other real estate that may need probate or trust planning.",
      yes: { trust: 3, both: 1 },
      no: { simple: 1 },
      unsure: { trust: 1, attorney: 1 }
    },
    {
      id: "multiState",
      text: "Real estate in more than one state?",
      hint: "Property in multiple states can add probate and title-transfer complexity.",
      yes: { trust: 2, attorney: 5 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "avoidProbate",
      text: "Want to avoid probate?",
      hint: "Trusts can often reduce probate for funded assets, depending on state law and asset type.",
      yes: { trust: 4, both: 1 },
      no: { simple: 1, will: 1 },
      unsure: { trust: 1, attorney: 1 }
    },
    {
      id: "privacy",
      text: "Is privacy a priority?",
      hint: "Probate can become part of public court records. Trust administration is often more private.",
      yes: { trust: 3 },
      no: { simple: 1 },
      unsure: { trust: 1 }
    },
    {
      id: "blendedFamily",
      text: "Blended family?",
      hint: "This can include children from a prior relationship or family dynamics that may need careful drafting.",
      yes: { attorney: 5, both: 1 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "specialNeeds",
      text: "Special-needs beneficiary?",
      hint: "Special-needs planning can affect benefit eligibility and usually needs personalized legal guidance.",
      yes: { attorney: 6 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "business",
      text: "Business owner?",
      hint: "Business interests can raise succession, tax, ownership-transfer, or continuity issues.",
      yes: { attorney: 5, trust: 1 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "significantAssets",
      text: "Complex assets or tax concerns?",
      hint: "Examples include investments, life insurance, business interests, larger estates, or tax-planning goals. No exact values needed.",
      yes: { trust: 3, attorney: 3 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "incapacity",
      text: "Want incapacity planning?",
      hint: "This means naming trusted people and tools to help if you cannot act for yourself.",
      yes: { trust: 4, both: 1 },
      no: { simple: 1 },
      unsure: { trust: 1, attorney: 1 }
    },
    {
      id: "simpleLowCost",
      text: "Prefer a simpler starting point?",
      hint: "A will-based plan can be a lower-complexity start, but may not address privacy, probate, or incapacity goals.",
      yes: { simple: 3, will: 3 },
      no: { trust: 1, both: 1 },
      unsure: { attorney: 1 }
    },
    {
      id: "existingDocuments",
      text: "Have estate documents?",
      hint: "Existing documents may need review if family, assets, fiduciaries, or state law have changed.",
      yes: { review: 1 },
      no: { will: 1, simple: 1 },
      unsure: { attorney: 1, review: 1 }
    },
    {
      id: "changedRecently",
      text: "Recent major life changes?",
      hint: "Examples include marriage, divorce, moving states, a new child, a death, or major asset changes.",
      yes: { attorney: 3, review: 2 },
      no: { simple: 1 },
      unsure: { attorney: 2, review: 1 }
    }
  ];

  const answerChoices = [
    {
      value: "yes",
      label: "Yes",
      microcopy: "This applies to me."
    },
    {
      value: "no",
      label: "No",
      microcopy: "This probably does not apply."
    },
    {
      value: "unsure",
      label: "Not sure",
      microcopy: "I would like to flag this."
    }
  ];

  const outcomeContent = {
    will: {
      key: "A",
      title: "A will may be a good starting point",
      confidence: "Simple",
      summary:
        "Based on your answers, this may be a useful starting point for basic inheritance directions, naming someone to handle your estate, and possibly nominating guardians for minor children.",
      usuallyMeans: [
        "You may be focused on a clear, lower-complexity plan rather than privacy or probate avoidance.",
        "A will often gives basic instructions for property after death, but it generally does not avoid probate by itself.",
        "You may still need related documents, such as powers of attorney and health care directives."
      ],
      attorneyQuestions: [
        "Does my state have special signing, witness, or notarization requirements?",
        "Who should serve as executor, guardian, or backup fiduciary?",
        "Would beneficiary designations or payable-on-death options fit my situation?"
      ],
      nextSteps: [
        "List the people or organizations you would want to receive property.",
        "Think through backup choices for executor and guardian roles.",
        "Review beneficiary designations on retirement accounts, insurance, and bank accounts."
      ]
    },
    trust: {
      key: "B",
      title: "You may want to consider a trust",
      confidence: "Moderate",
      summary:
        "Based on your answers, this may be a useful starting point if you care about probate avoidance, privacy, incapacity planning, real estate, or smoother asset transfer.",
      usuallyMeans: [
        "A trust can often help assets move outside probate when it is properly created and funded.",
        "A trust may provide more continuity if someone needs to manage assets during incapacity.",
        "A trust usually works alongside other documents, not as a complete plan by itself."
      ],
      attorneyQuestions: [
        "Which assets should be transferred into the trust and which should stay outside it?",
        "Who should serve as trustee and successor trustee?",
        "How would my state treat trust administration, probate, and creditor claims?"
      ],
      nextSteps: [
        "Make a general inventory of asset types without listing sensitive account details here.",
        "Identify privacy, probate, and incapacity goals you want to prioritize.",
        "Ask an attorney about funding the trust and coordinating beneficiary designations."
      ]
    },
    both: {
      key: "C",
      title: "You may need both a will and a trust",
      confidence: "Moderate",
      summary:
        "Based on your answers, this may be a useful starting point for comprehensive planning that combines guardianship directions, trust-based asset management, probate planning, and incapacity support.",
      usuallyMeans: [
        "Many trust-based plans still include a pour-over will to capture assets not transferred to the trust.",
        "A will may be important for nominating guardians for minor children.",
        "A trust may help manage real estate, privacy, probate, and incapacity concerns."
      ],
      attorneyQuestions: [
        "Should my plan include a revocable living trust and a pour-over will?",
        "How should assets be managed for children or younger beneficiaries?",
        "What documents should coordinate with the trust, such as powers of attorney and health care directives?"
      ],
      nextSteps: [
        "Clarify who you would trust to raise children, manage assets, and make backup decisions.",
        "Gather a broad list of asset categories, real estate, insurance, and retirement accounts.",
        "Schedule a review to coordinate guardianship, trust funding, and incapacity documents."
      ]
    },
    attorney: {
      key: "D",
      title: "Talk with an estate-planning attorney",
      confidence: "More complex",
      summary:
        "Based on your answers, this may be a useful starting point because one or more factors may require personalized legal analysis rather than a generic will-or-trust answer.",
      usuallyMeans: [
        "Your situation may involve family, tax, business, benefit-eligibility, or multi-state issues that can change the right planning strategy.",
        "An attorney can explain state-specific rules and draft documents that work together.",
        "The goal may still be a will, a trust, or both—but the details matter more here."
      ],
      attorneyQuestions: [
        "What state-specific rules or tax issues should I consider?",
        "How should my plan handle blended-family, special-needs, business, or multi-state property concerns?",
        "Which documents should be coordinated so there are no gaps or conflicts?"
      ],
      nextSteps: [
        "Prepare a non-sensitive outline of your family structure, asset categories, and planning goals.",
        "Write down recent life changes and any areas where you answered ‘Not sure.’",
        "Use the printed summary as a conversation guide during a consultation."
      ]
    }
  };

  const reasonLabels = {
    minorChildren: "minor children or guardianship considerations",
    realEstate: "home or real-estate ownership",
    multiState: "property in more than one state",
    avoidProbate: "a desire to reduce or avoid probate",
    privacy: "privacy concerns",
    blendedFamily: "blended-family or prior-relationship considerations",
    specialNeeds: "a beneficiary with special-needs planning considerations",
    business: "business ownership",
    significantAssets: "complex assets, insurance, business interests, or tax-planning concerns",
    incapacity: "incapacity-management goals",
    simpleLowCost: "a preference for a simple, lower-cost starting point",
    existingDocuments: "existing estate-planning documents that may need review",
    changedRecently: "recent changes to family, assets, or state of residence"
  };


  const pdfQuestionLabels = {
    minorChildren: "Minor children / guardianship",
    realEstate: "Home or real estate",
    multiState: "Multi-state real estate",
    avoidProbate: "Avoiding probate matters",
    privacy: "Privacy matters",
    blendedFamily: "Blended family",
    specialNeeds: "Special-needs beneficiary",
    business: "Business ownership",
    significantAssets: "Complex assets / tax concerns",
    incapacity: "Incapacity planning",
    simpleLowCost: "Low-cost starting point",
    existingDocuments: "Existing estate documents",
    changedRecently: "Recent major changes"
  };

  const state = {
    currentIndex: 0,
    answers: {},
    inferredAnswers: {}
  };

  const quizContent = document.querySelector("#quiz-content");
  const questionCount = document.querySelector("#question-count");
  const progressPercent = document.querySelector("#progress-percent");
  const progressBar = document.querySelector("#progress-bar");
  const statusRegion = document.querySelector("#quiz-status");
  const year = document.querySelector("#year");

  function init() {
    if (year) {
      year.textContent = new Date().getFullYear().toString();
    }

    renderQuestion();
    bindGlobalActions();
  }

  function bindGlobalActions() {
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const placeholderPaymentLink = target.closest(".package-button.is-placeholder");
      if (placeholderPaymentLink) {
        event.preventDefault();
        statusRegion.textContent = "Payment link placeholder. Replace the package URL in script.js with your Stripe Payment Link.";
        return;
      }

      if (target.matches("[data-action='next']")) {
        goNext();
      }

      if (target.matches("[data-action='back']")) {
        goBack();
      }

      if (target.matches("[data-action='restart']")) {
        restartQuiz();
      }

      if (target.matches("[data-action='print']")) {
        statusRegion.textContent = "Print dialog opened.";
        window.print();
      }

      if (target.matches("[data-action='download-pdf']")) {
        downloadPdfSummary();
      }
    });

    document.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.name === "quiz-answer") {
        const question = getCurrentQuestion();
        if (!question) return;

        state.answers[question.id] = target.value;

        if (question.id === "realEstate") {
          handleRealEstateDependency(target.value);
        }

        const error = document.querySelector("#quiz-error");
        if (error) error.textContent = "";
      }
    });
  }

  function getVisibleQuestions() {
    return questions.filter((question) => {
      if (question.id !== "multiState") return true;
      return state.answers.realEstate !== "no";
    });
  }

  function getCurrentQuestion() {
    return getVisibleQuestions()[state.currentIndex];
  }

  function handleRealEstateDependency(answer) {
    if (answer === "no") {
      state.answers.multiState = "no";
      state.inferredAnswers.multiState = true;
      return;
    }

    if (state.inferredAnswers.multiState) {
      delete state.answers.multiState;
      delete state.inferredAnswers.multiState;
    }
  }

  function renderQuestion() {
    document.body.classList.remove("result-open");
    const visibleQuestions = getVisibleQuestions();

    if (state.currentIndex >= visibleQuestions.length) {
      state.currentIndex = visibleQuestions.length - 1;
    }

    const question = visibleQuestions[state.currentIndex];
    const selectedAnswer = state.answers[question.id] || "";
    const questionNumber = state.currentIndex + 1;
    const percent = Math.round((questionNumber / visibleQuestions.length) * 100);

    updateProgress(questionNumber, percent, visibleQuestions.length);

    quizContent.innerHTML = `
      <form class="question-panel" data-question-id="${escapeHtml(question.id)}" novalidate tabindex="-1">
        <span class="question-label">Question ${questionNumber}</span>
        <h3 class="question-title ${question.text.length > 42 ? "question-title-compact" : ""}" id="active-question">${escapeHtml(question.text)}</h3>
        <p class="question-hint">${escapeHtml(question.hint)}</p>

        <fieldset class="answer-group" aria-labelledby="active-question">
          <legend class="sr-only">Choose one answer</legend>
          ${answerChoices
            .map(
              (choice) => `
                <label class="answer-option">
                  <input
                    type="radio"
                    name="quiz-answer"
                    value="${choice.value}"
                    ${selectedAnswer === choice.value ? "checked" : ""}
                  />
                  <span class="answer-copy">
                    <strong>${choice.label}</strong>
                  </span>
                </label>
              `
            )
            .join("")}
        </fieldset>

        <p id="quiz-error" class="quiz-error" role="alert"></p>

        <div class="quiz-actions" aria-label="Quiz navigation">
          <button class="btn btn-secondary" type="button" data-action="back" ${state.currentIndex === 0 ? "disabled" : ""}>
            Back
          </button>
          <button class="btn btn-primary" type="button" data-action="next">
            ${state.currentIndex === visibleQuestions.length - 1 ? "See my starting point" : "Next question"}
          </button>
          <button class="btn btn-text" type="button" data-action="restart">
            Restart
          </button>
        </div>
      </form>
    `;

    statusRegion.textContent = `Question ${questionNumber} of ${visibleQuestions.length}: ${question.text}`;
    focusFirstAvailableControl();
  }

  function updateProgress(label, percent, totalQuestions) {
    if (typeof label === "number") {
      questionCount.textContent = `Question ${label} of ${totalQuestions || getVisibleQuestions().length}`;
    } else {
      questionCount.textContent = label;
    }

    progressPercent.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
  }

  function focusFirstAvailableControl() {
    window.requestAnimationFrame(() => {
      const panel = quizContent.querySelector(".question-panel");
      if (panel instanceof HTMLElement) {
        panel.focus({ preventScroll: true });
      }
    });
  }

  function scrollQuizCardIntoView() {
    window.requestAnimationFrame(() => {
      const card = document.querySelector("#quiz .quiz-card");
      if (!(card instanceof HTMLElement)) return;

      const header = document.querySelector(".site-header");
      const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 78;
      const targetTop = window.scrollY + card.getBoundingClientRect().top - headerHeight - 14;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      });
    });
  }

  function goNext() {
    const selected = document.querySelector("input[name='quiz-answer']:checked");
    const error = document.querySelector("#quiz-error");

    if (!(selected instanceof HTMLInputElement)) {
      if (error) {
        error.textContent = "Please choose an answer before continuing.";
      }
      statusRegion.textContent = "Please choose an answer before continuing.";
      return;
    }

    const question = getCurrentQuestion();
    if (!question) return;

    state.answers[question.id] = selected.value;

    if (question.id === "realEstate") {
      handleRealEstateDependency(selected.value);
    }

    const visibleQuestions = getVisibleQuestions();

    if (state.currentIndex < visibleQuestions.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
      scrollQuizCardIntoView();
      return;
    }

    renderResult(calculateOutcome());
    scrollQuizCardIntoView();
  }

  function goBack() {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
      scrollQuizCardIntoView();
    }
  }

  function restartQuiz() {
    state.currentIndex = 0;
    state.answers = {};
    state.inferredAnswers = {};
    renderQuestion();
    scrollQuizCardIntoView();
  }

  function calculateOutcome() {
    const scores = {
      will: 0,
      trust: 0,
      both: 0,
      attorney: 0,
      simple: 0,
      review: 0
    };

    let unsureCount = 0;
    const yesAnswers = [];
    const unsureAnswers = [];

    questions.forEach((question) => {
      const answer = state.answers[question.id];
      if (!answer) return;

      if (answer === "unsure") {
        unsureCount += 1;
        unsureAnswers.push(question.id);
      }

      if (answer === "yes") {
        yesAnswers.push(question.id);
      }

      const weightMap = answer === "yes" ? question.yes : answer === "no" ? question.no : question.unsure;
      Object.entries(weightMap || {}).forEach(([key, value]) => {
        scores[key] += value;
      });
    });

    const directAttorneyFlags = ["specialNeeds", "blendedFamily", "business", "multiState"].some(
      (id) => state.answers[id] === "yes"
    );
    const compoundComplexity =
      state.answers.significantAssets === "yes" &&
      ["realEstate", "minorChildren", "incapacity", "changedRecently"].some((id) => state.answers[id] === "yes");
    const reviewConcern = scores.review >= 2 && (scores.attorney >= 3 || unsureCount >= 2);
    const comprehensivePattern =
      state.answers.minorChildren === "yes" &&
      state.answers.realEstate === "yes" &&
      (state.answers.avoidProbate === "yes" || state.answers.privacy === "yes") &&
      state.answers.incapacity === "yes";

    let outcome = "will";

    if (directAttorneyFlags || unsureCount >= 4 || scores.attorney >= 7 || compoundComplexity || reviewConcern) {
      outcome = "attorney";
    } else if (comprehensivePattern || scores.both >= 5) {
      outcome = "both";
    } else if (scores.trust >= 5 && scores.trust >= scores.will) {
      outcome = "trust";
    } else {
      outcome = "will";
    }

    return {
      outcome,
      scores,
      unsureCount,
      yesAnswers,
      unsureAnswers
    };
  }

  function getRecommendedPackage(outcome) {
    if (outcome === "will") return "will";
    if (outcome === "trust" || outcome === "both") return "trust";
    return "consultation";
  }

  function renderPackageCard(key, recommendedKey) {
    const config = PACKAGE_CONFIG[key];
    const isRecommended = key === recommendedKey;
    const label = key === "consultation" ? "Request consultation" : "Start secure checkout";
    const href = config.href;
    const isPlaceholder = href.startsWith("#replace-with");
    const bulletList = (config.bullets || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    return `
      <article class="package-card ${isRecommended ? "recommended" : ""}" aria-label="${escapeHtml(config.title)}">
        <div class="package-card-accent" aria-hidden="true"></div>
        <div class="package-card-top">
          <div>
            ${isRecommended ? `<span class="recommended-pill">Suggested by your answers</span>` : `<span class="recommended-pill neutral-pill">Available option</span>`}
            <h4>${escapeHtml(config.title)}</h4>
          </div>
          <div class="package-price">${escapeHtml(config.price)}</div>
        </div>
        <p>${escapeHtml(config.note)}</p>
        <ul class="package-includes">${bulletList}</ul>
        <a
          class="btn ${isRecommended ? "btn-gold" : "btn-secondary"} package-button ${isPlaceholder ? "is-placeholder" : ""}"
          href="${escapeHtml(href)}"
          ${isPlaceholder ? 'aria-disabled="true"' : ""}
        >
          ${isPlaceholder ? "Add payment link" : label}
        </a>
      </article>
    `;
  }

  function renderResult(resultData) {
    document.body.classList.add("result-open");
    updateProgress("Summary ready", 100);

    const content = outcomeContent[resultData.outcome];
    const reasonList = getReasonList(resultData);
    const answerSummary = questions
      .map((question) => {
        const value = state.answers[question.id] || "not answered";
        return `<li><strong>${escapeHtml(question.text)}</strong> ${formatAnswer(value, question.id)}</li>`;
      })
      .join("");

    quizContent.innerHTML = `
      <article class="result-card" tabindex="-1" aria-labelledby="result-title">
        <div class="result-topline">
          <span class="result-badge">Outcome ${content.key}</span>
          <span class="confidence-badge">${content.confidence}</span>
        </div>
        <h3 id="result-title">${content.title}</h3>
        <p class="result-lead">${content.summary}</p>

        <div class="result-details-grid">
          <section class="details-card" aria-labelledby="why-heading">
            <h4 id="why-heading">Why this result appeared</h4>
            <ul class="clean-list">
              ${reasonList.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
            </ul>
          </section>

          <section class="details-card" aria-labelledby="usually-heading">
            <h4 id="usually-heading">What this usually means</h4>
            <ul class="clean-list">
              ${content.usuallyMeans.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </section>

          <section class="details-card" aria-labelledby="attorney-heading">
            <h4 id="attorney-heading">Questions to ask an attorney</h4>
            <ul class="clean-list">
              ${content.attorneyQuestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </section>

          <section class="details-card" aria-labelledby="next-heading">
            <h4 id="next-heading">Next steps</h4>
            <ul class="clean-list">
              ${content.nextSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              <li>Remember: this is educational information, not legal advice. Laws vary by state.</li>
            </ul>
          </section>

          <section class="details-card answer-summary-card" aria-labelledby="answers-heading">
            <h4 id="answers-heading">Your answer summary</h4>
            <ul class="clean-list answer-summary-list">
              ${answerSummary}
            </ul>
          </section>

          <section class="details-card package-options" aria-labelledby="packages-heading">
            <div class="package-options-heading">
              <p class="cta-kicker">Optional next step</p>
              <h4 id="packages-heading">Attorney-drafted next steps</h4>
              <p>
                The highlighted option is the closest fit based on your answers. Every purchase should begin with eligibility review, conflict checks, and state-specific attorney confirmation.
              </p>
            </div>
            <div class="package-grid">
              ${renderPackageCard("will", getRecommendedPackage(resultData.outcome))}
              ${renderPackageCard("trust", getRecommendedPackage(resultData.outcome))}
              ${renderPackageCard("consultation", getRecommendedPackage(resultData.outcome))}
            </div>
            <p class="package-disclaimer">
              Educational only. Payment does not by itself create legal advice or an attorney-client relationship. Use real payment links only after attorney availability, state coverage, and engagement terms are in place.
            </p>
          </section>
        </div>

        <div class="result-actions" aria-label="Result actions">
          <div class="summary-actions" aria-label="Summary actions">
            <button class="btn btn-secondary" type="button" data-action="restart">Restart quiz</button>
            <button class="btn btn-primary" type="button" data-action="download-pdf">Download PDF summary</button>
          </div>
        </div>
      </article>
    `;

    statusRegion.textContent = `Summary ready. ${content.title}. ${content.summary}`;

    window.requestAnimationFrame(() => {
      const resultCard = quizContent.querySelector(".result-card");
      if (resultCard instanceof HTMLElement) {
        resultCard.focus({ preventScroll: true });
      }
    });
  }

  function getReasonList(resultData) {
    const positiveReasons = resultData.yesAnswers
      .map((id) => reasonLabels[id])
      .filter(Boolean)
      .slice(0, 6);

    const unsureReasons = resultData.unsureAnswers
      .map((id) => reasonLabels[id])
      .filter(Boolean)
      .slice(0, 4);

    const reasons = [];

    if (positiveReasons.length > 0) {
      reasons.push(`You flagged: ${joinHumanList(positiveReasons)}.`);
    }

    if (unsureReasons.length > 0) {
      reasons.push(`You were not sure about: ${joinHumanList(unsureReasons)}. Uncertainty can be a good reason to get personalized guidance.`);
    }

    if (resultData.outcome === "will") {
      reasons.push("Your answers suggest fewer probate, privacy, real-estate, business, and family-complexity concerns than the other paths.");
    }

    if (resultData.outcome === "trust") {
      reasons.push("Your answers point toward goals that trusts are often designed to support, such as privacy, probate avoidance, real estate, or incapacity planning.");
    }

    if (resultData.outcome === "both") {
      reasons.push("Your answers combine family-planning needs with trust-friendly goals such as real estate, probate planning, privacy, or incapacity support.");
    }

    if (resultData.outcome === "attorney") {
      reasons.push("At least one answer suggests a situation where state-specific legal guidance and careful drafting may matter more than a generic recommendation.");
    }

    if (reasons.length === 0) {
      reasons.push("Your answers suggest a simpler planning profile, but an attorney can still confirm what fits your state and goals.");
    }

    return reasons;
  }

  function joinHumanList(items) {
    if (items.length <= 1) return items[0] || "";
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
  }

  function formatAnswer(value, questionId) {
    if (state.inferredAnswers[questionId]) {
      return "— No (skipped because you said you do not own real estate)";
    }

    const labels = {
      yes: "— Yes",
      no: "— No",
      unsure: "— Not sure"
    };
    return labels[value] || "— Not answered";
  }


  function formatAnswerPlain(value, questionId) {
    if (state.inferredAnswers[questionId]) {
      return "No (skipped)";
    }

    const labels = {
      yes: "Yes",
      no: "No",
      unsure: "Not sure"
    };
    return labels[value] || "Not answered";
  }

  function downloadPdfSummary() {
    const resultData = calculateOutcome();
    const pdf = createSummaryPdf(resultData);
    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const today = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `estate-planning-decision-helper-summary-${today}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 500);
    statusRegion.textContent = "PDF summary downloaded. Review it with a licensed estate-planning attorney if you need legal guidance.";
  }

  function createSummaryPdf(resultData) {
    const content = outcomeContent[resultData.outcome];
    const reasonList = getReasonList(resultData);
    const generatedOn = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const answerItems = questions.map((question) => ({
      question: pdfQuestionLabels[question.id] || question.text,
      answer: formatAnswerPlain(state.answers[question.id], question.id)
    }));

    const pdf = createPdfWriter();
    const disclaimer = "This downloadable summary is educational information only. It does not provide legal advice, does not create an attorney-client relationship, and does not replace counsel from a licensed attorney. Estate-planning laws vary by state and individual facts matter.";

    pdf.addPage();
    pdf.addDocumentHeader(generatedOn);
    pdf.addResultHero(content);
    pdf.addSectionGrid([
      { title: "Why this result appeared", items: reasonList, accent: "gold" },
      { title: "What this usually means", items: content.usuallyMeans, accent: "green" }
    ], { compact: true });
    pdf.addSectionGrid([
      { title: "Questions to ask an attorney", items: content.attorneyQuestions, accent: "gold" },
      {
        title: "Next steps",
        accent: "green",
        items: [
          ...content.nextSteps,
          "Remember: this is educational information, not legal advice. Laws vary by state."
        ]
      }
    ], { compact: true });

    pdf.addAnswerSummary("Your answer summary", answerItems);
    pdf.addUseSummaryCard();
    pdf.addDisclaimer(disclaimer);

    pdf.addFooterToAllPages();
    return pdf.toString();
  }

  function createPdfWriter() {
    const pageWidth = 612;
    const pageHeight = 792;
    const margin = 42;
    const bottomMargin = 36;
    const contentWidth = pageWidth - margin * 2;
    const pages = [];

    const colors = {
      navy: [7, 22, 38],
      navy2: [10, 30, 52],
      navy3: [20, 48, 76],
      ink: [7, 22, 38],
      slate: [45, 62, 86],
      muted: [82, 100, 124],
      gold: [185, 145, 72],
      gold2: [211, 179, 108],
      goldDeep: [158, 119, 54],
      goldSoft: [249, 239, 217],
      green: [63, 112, 95],
      green2: [88, 129, 111],
      greenSoft: [223, 237, 230],
      ivory: [255, 250, 240],
      page: [253, 249, 241],
      paper: [255, 253, 248],
      white: [255, 255, 255],
      border: [229, 218, 198],
      softBorder: [222, 228, 232],
      faint: [248, 243, 234],
      blueGray: [232, 238, 241]
    };

    function rgb(color) {
      return color.map((value) => (value / 255).toFixed(4)).join(" ");
    }

    const writer = {
      pageWidth,
      pageHeight,
      margin,
      bottomMargin,
      contentWidth,
      y: margin,
      addPage() {
        pages.push([]);
        this.y = margin;
        this.drawRect(0, 0, pageWidth, pageHeight, colors.page);
        this.drawRect(0, 0, 5, pageHeight, colors.goldSoft);
        this.drawRect(5, 0, 1.8, pageHeight, colors.gold2);
        this.drawRect(pageWidth - 6.8, 0, 1.8, pageHeight, colors.gold2);
        this.drawRect(pageWidth - 5, 0, 5, pageHeight, colors.goldSoft);
      },
      current() {
        if (pages.length === 0) this.addPage();
        return pages[pages.length - 1];
      },
      ensureSpace(height) {
        if (this.y + height > pageHeight - bottomMargin) {
          this.addPage();
          this.y = 42;
        }
      },
      drawRect(x, yTop, width, height, fill) {
        const y = pageHeight - yTop - height;
        this.current().push(`q ${rgb(fill)} rg ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re f Q`);
      },
      drawStrokeRect(x, yTop, width, height, stroke = colors.softBorder, lineWidth = 1) {
        const y = pageHeight - yTop - height;
        this.current().push(`q ${rgb(stroke)} RG ${lineWidth.toFixed(2)} w ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re S Q`);
      },
      addCard(x, yTop, width, height, fill = colors.white, stroke = colors.softBorder, lineWidth = 0.9) {
        this.drawRect(x, yTop, width, height, fill);
        this.drawStrokeRect(x, yTop, width, height, stroke, lineWidth);
      },
      drawText(text, x, yTop, size = 11, weight = "regular", color = colors.navy) {
        const font = weight === "bold" ? "F2" : "F1";
        const y = pageHeight - yTop;
        this.current().push(`BT /${font} ${size} Tf ${rgb(color)} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapePdfText(text)}) Tj ET`);
      },
      drawCenteredText(text, x, yTop, width, size = 8, weight = "bold", color = colors.navy) {
        const textWidth = estimatePdfTextWidth(text, size, weight);
        this.drawText(text, x + Math.max(0, (width - textWidth) / 2), yTop, size, weight, color);
      },
      drawRule(x, yTop, width, color = colors.gold2, lineWidth = 1) {
        const y = pageHeight - yTop;
        this.current().push(`q ${rgb(color)} RG ${lineWidth.toFixed(2)} w ${x.toFixed(2)} ${y.toFixed(2)} m ${(x + width).toFixed(2)} ${y.toFixed(2)} l S Q`);
      },
      drawPill(text, x, yTop, width, height, fill, stroke, color, size = 7.5) {
        this.addCard(x, yTop, width, height, fill, stroke, 0.75);
        this.drawCenteredText(text.toUpperCase(), x, yTop + height / 2 + size / 2 - 1.1, width, size, "bold", color);
      },
      drawWrapped(text, x, yTop, width, size, weight, color, lineHeight) {
        const lines = wrapPdfText(text, width, size, weight);
        let y = yTop;
        lines.forEach((line) => {
          this.drawText(line, x, y, size, weight, color);
          y += lineHeight;
        });
        return y;
      },
      addDocumentHeader(generatedOn) {
        const x = margin;
        this.drawText("ESTATE PLANNING DECISION HELPER", x, 27, 8, "bold", colors.green);
        this.drawText("Educational Summary", x, 55, 28, "bold", colors.ink);
        this.drawText(`Generated ${generatedOn}   |   Educational information only - not legal advice`, x, 82, 9.1, "regular", colors.muted);
        this.drawRule(x, 104, contentWidth, colors.gold2, 1.1);

        const chipY = 119;
        const chips = [
          { label: "Browser-generated", width: 104 },
          { label: "Private by design", width: 101 },
          { label: "Attorney-ready notes", width: 124 }
        ];
        let chipX = x;
        chips.forEach((chip) => {
          this.drawPill(chip.label, chipX, chipY, chip.width, 18, colors.white, colors.softBorder, colors.slate, 6.3);
          chipX += chip.width + 10;
        });

        this.y = 153;
      },
      addResultHero(content) {
        const x = margin;
        const yTop = this.y;
        const width = contentWidth;
        const innerX = x + 24;
        const innerWidth = width - 48;
        const titleSize = content.title.length > 48 ? 22 : 25;
        const titleLineHeight = titleSize + 4.2;
        const titleLines = wrapPdfText(content.title, innerWidth, titleSize, "bold");
        const summaryLines = wrapPdfText(content.summary, innerWidth, 9.8, "regular");
        const cardHeight = Math.max(150, 55 + titleLines.length * titleLineHeight + 15 + summaryLines.length * 12.6 + 26);

        this.ensureSpace(cardHeight + 20);
        this.addCard(x, yTop, width, cardHeight, colors.navy, colors.navy3, 0.8);
        this.drawRect(x, yTop, width, 7, colors.gold2);
        this.drawPill(`Outcome ${content.key}`, innerX, yTop + 28, 92, 23, colors.goldSoft, colors.gold2, colors.ink, 7.1);
        this.drawPill(content.confidence, x + width - 112, yTop + 28, 88, 23, colors.greenSoft, [183, 203, 194], colors.green, 7.1);

        let y = yTop + 69;
        titleLines.forEach((line) => {
          this.drawText(line, innerX, y, titleSize, "bold", colors.white);
          y += titleLineHeight;
        });

        y += 9;
        summaryLines.forEach((line) => {
          this.drawText(line, innerX, y, 9.8, "regular", [232, 238, 241]);
          y += 12.6;
        });

        this.y = yTop + cardHeight + 18;
      },
      measureCardSection(section, width, compact = false) {
        const bulletWidth = width - 44;
        const size = compact ? 8.0 : 8.4;
        const lineHeight = compact ? 9.7 : 10.4;
        const listHeight = section.items.reduce((sum, item) => {
          const lines = wrapPdfText(item, bulletWidth, size, "regular");
          return sum + lines.length * lineHeight + (compact ? 6 : 7);
        }, 0);
        return Math.max(compact ? 102 : 116, 44 + listHeight + 12);
      },
      drawCardSection(section, x, yTop, width, height, compact = false) {
        const accent = section.accent === "green" ? colors.green : colors.gold2;
        this.addCard(x, yTop, width, height, colors.white, colors.softBorder, 0.9);
        this.drawRect(x, yTop, 5, height, accent);
        this.drawText(section.title, x + 17, yTop + 24, 11.2, "bold", colors.ink);
        this.drawRule(x + 17, yTop + 34, width - 34, [238, 231, 217], 0.65);
        let y = yTop + 50;
        const size = compact ? 8.0 : 8.4;
        const lineHeight = compact ? 9.7 : 10.4;
        section.items.forEach((item) => {
          const lines = wrapPdfText(item, width - 46, size, "regular");
          this.drawText("-", x + 18, y, size, "bold", colors.gold);
          lines.forEach((line, index) => {
            this.drawText(line, x + 30, y + index * lineHeight, size, "regular", colors.slate);
          });
          y += lines.length * lineHeight + (compact ? 6 : 7);
        });
      },
      addSectionGrid(sections, options = {}) {
        const compact = Boolean(options.compact);
        const gap = 16;
        const colWidth = (contentWidth - gap) / 2;
        const heights = sections.map((section) => this.measureCardSection(section, colWidth, compact));
        const rowHeight = Math.max(...heights);
        this.ensureSpace(rowHeight + 16);
        const yTop = this.y;
        sections.forEach((section, index) => {
          const x = margin + index * (colWidth + gap);
          this.drawCardSection(section, x, yTop, colWidth, rowHeight, compact);
        });
        this.y = yTop + rowHeight + 18;
      },
      addAnswerSummary(title, items) {
        const cardX = margin;
        const cardWidth = contentWidth;
        const innerX = cardX + 18;
        const innerWidth = cardWidth - 36;
        const gap = 22;
        const colWidth = (innerWidth - gap) / 2;
        const splitIndex = Math.ceil(items.length / 2);
        const columns = [items.slice(0, splitIndex), items.slice(splitIndex)];

        const measureColumn = (column) => column.reduce((height, item) => {
          const answerLine = `${item.question} - ${item.answer}`;
          return height + wrapPdfText(answerLine, colWidth - 18, 7.9, "regular").length * 10 + 5.2;
        }, 0);

        const cardHeight = 50 + Math.max(...columns.map(measureColumn));
        this.ensureSpace(cardHeight + 16);
        const startY = this.y;
        this.addCard(cardX, startY, cardWidth, cardHeight, colors.white, colors.softBorder, 0.9);
        this.drawRect(cardX, startY, cardWidth, 5, colors.green);
        this.drawText(title, innerX, startY + 27, 13.2, "bold", colors.ink);
        this.drawText("Non-sensitive answers only", cardX + cardWidth - 133, startY + 27, 8, "bold", colors.green);

        columns.forEach((column, columnIndex) => {
          const x = innerX + columnIndex * (colWidth + gap);
          let y = startY + 50;
          column.forEach((item) => {
            const answerLine = `${item.question} - ${item.answer}`;
            const lines = wrapPdfText(answerLine, colWidth - 17, 7.9, "regular");
            this.drawText("-", x, y, 7.9, "bold", colors.gold);
            lines.forEach((line, lineIndex) => {
              this.drawText(line, x + 14, y + lineIndex * 10, 7.9, lineIndex === 0 ? "bold" : "regular", colors.slate);
            });
            y += lines.length * 10 + 5.2;
          });
        });

        this.y = startY + cardHeight + 18;
      },
      addUseSummaryCard() {
        const x = margin;
        const yTop = this.y;
        const width = contentWidth;
        const height = 88;
        this.ensureSpace(height + 16);
        this.addCard(x, yTop, width, height, colors.faint, colors.border, 0.9);
        this.drawRect(x, yTop, 5, height, colors.gold2);
        this.drawText("How to use this summary", x + 19, yTop + 24, 12.2, "bold", colors.ink);
        const notes = [
          "Use this as a conversation guide, not a legal conclusion.",
          "Bring it to a licensed estate-planning attorney for state-specific review.",
          "Do not add account numbers, Social Security numbers, or exact asset values."
        ];
        let y = yTop + 45;
        notes.forEach((note, index) => {
          this.drawPill(String(index + 1), x + 19, y - 10, 18, 18, colors.goldSoft, colors.gold2, colors.ink, 7.2);
          this.drawText(note, x + 47, y + 1, 8.5, "regular", colors.slate);
          y += 19;
        });
        this.y = yTop + height + 16;
      },
      addDisclaimer(body) {
        const bodyLines = wrapPdfText(body, contentWidth - 36, 8.1, "regular");
        const height = 32 + bodyLines.length * 10.4;
        this.ensureSpace(height + 8);
        const yTop = this.y;
        this.addCard(margin, yTop, contentWidth, height, colors.white, colors.border, 0.9);
        this.drawText("Important educational disclaimer", margin + 18, yTop + 19, 10.3, "bold", colors.ink);
        let y = yTop + 33;
        bodyLines.forEach((line) => {
          this.drawText(line, margin + 18, y, 8.1, "regular", colors.slate);
          y += 10.4;
        });
        this.y = yTop + height + 12;
      },
      addFooterToAllPages() {
        const total = pages.length;
        pages.forEach((commands, index) => {
          const pageNum = index + 1;
          const footerText = `Educational only. Not legal advice. Laws vary by state. Page ${pageNum} of ${total}`;
          const yTop = pageHeight - 29;
          commands.push(`BT /F1 8 Tf ${rgb(colors.muted)} rg ${margin.toFixed(2)} ${(pageHeight - yTop).toFixed(2)} Td (${escapePdfText(footerText)}) Tj ET`);
        });
      },
      toString() {
        const objects = [];
        objects.push("<< /Type /Catalog /Pages 2 0 R >>");
        const pageObjectNumbers = pages.map((_, index) => 5 + index * 2);
        objects.push(`<< /Type /Pages /Count ${pages.length} /Kids [${pageObjectNumbers.map((num) => `${num} 0 R`).join(" ")}] >>`);
        objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
        objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

        pages.forEach((commands) => {
          const pageObjectNumber = 5 + (objects.length - 4);
          const contentObjectNumber = pageObjectNumber + 1;
          const stream = commands.join("\n");
          objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`);
          objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
        });

        let pdf = "%PDF-1.4\n";
        const offsets = [0];
        objects.forEach((object, index) => {
          offsets.push(pdf.length);
          pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
        });
        const xrefOffset = pdf.length;
        pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
        offsets.slice(1).forEach((offset) => {
          pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
        });
        pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
        return pdf;
      }
    };

    return writer;
  }

  function wrapPdfText(text, maxWidth, fontSize, weight) {
    const words = normalizePdfText(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";

    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (estimatePdfTextWidth(candidate, fontSize, weight) <= maxWidth) {
        line = candidate;
        return;
      }

      if (line) lines.push(line);

      if (estimatePdfTextWidth(word, fontSize, weight) <= maxWidth) {
        line = word;
        return;
      }

      const pieces = breakLongPdfWord(word, maxWidth, fontSize, weight);
      lines.push(...pieces.slice(0, -1));
      line = pieces[pieces.length - 1] || "";
    });

    if (line) lines.push(line);
    return lines.length ? lines : [""];
  }

  function breakLongPdfWord(word, maxWidth, fontSize, weight) {
    const pieces = [];
    let current = "";
    [...word].forEach((char) => {
      const candidate = `${current}${char}`;
      if (estimatePdfTextWidth(candidate, fontSize, weight) <= maxWidth) {
        current = candidate;
      } else {
        if (current) pieces.push(current);
        current = char;
      }
    });
    if (current) pieces.push(current);
    return pieces;
  }

  function estimatePdfTextWidth(text, fontSize, weight) {
    const averageWidth = weight === "bold" ? 0.58 : 0.535;
    return normalizePdfText(text).length * fontSize * averageWidth;
  }

  function normalizePdfText(value) {
    return String(value)
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/•/g, "-")
      .replace(/\u00a0/g, " ")
      .replace(/[^\x20-\x7E]/g, " ");
  }

  function escapePdfText(value) {
    return normalizePdfText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  document.addEventListener("DOMContentLoaded", init);

  window.__estatePlanningDecisionHelper = {
    questions,
    calculateForTest: (answers) => {
      const previous = { ...state.answers };
      const previousInferred = { ...state.inferredAnswers };
      state.answers = { ...answers };
      state.inferredAnswers = {};
      if (state.answers.realEstate === "no") {
        state.answers.multiState = "no";
        state.inferredAnswers.multiState = true;
      }
      const result = calculateOutcome();
      state.answers = previous;
      state.inferredAnswers = previousInferred;
      return result;
    },
    createPdfSummaryForTest: (answers) => {
      const previous = { ...state.answers };
      const previousInferred = { ...state.inferredAnswers };
      state.answers = { ...answers };
      state.inferredAnswers = {};
      if (state.answers.realEstate === "no") {
        state.answers.multiState = "no";
        state.inferredAnswers.multiState = true;
      }
      const pdf = createSummaryPdf(calculateOutcome());
      state.answers = previous;
      state.inferredAnswers = previousInferred;
      return pdf;
    }
  };
})();
