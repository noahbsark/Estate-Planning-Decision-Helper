(() => {
  "use strict";

  const questions = [
    {
      id: "minorChildren",
      text: "Do you have minor children?",
      hint: "A will is commonly used to nominate guardians. Trust planning can also help manage assets for children over time.",
      yes: { will: 3, both: 3 },
      no: { simple: 1 },
      unsure: { attorney: 1 }
    },
    {
      id: "realEstate",
      text: "Do you own a home or other real estate?",
      hint: "Real estate is one of the most common reasons people explore trust-based planning or probate-avoidance strategies.",
      yes: { trust: 3, both: 1 },
      no: { simple: 1 },
      unsure: { trust: 1, attorney: 1 }
    },
    {
      id: "multiState",
      text: "Do you own real estate in more than one state?",
      hint: "Multi-state real estate can add complexity because probate and property rules may differ by state.",
      yes: { trust: 2, attorney: 5 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "avoidProbate",
      text: "Is avoiding probate important to you?",
      hint: "A properly funded trust can often reduce or avoid probate for assets held in the trust, depending on state law and asset type.",
      yes: { trust: 4, both: 1 },
      no: { simple: 1, will: 1 },
      unsure: { trust: 1, attorney: 1 }
    },
    {
      id: "privacy",
      text: "Is privacy important to you?",
      hint: "Probate filings can become part of public court records. Trust administration is often more private.",
      yes: { trust: 3 },
      no: { simple: 1 },
      unsure: { trust: 1 }
    },
    {
      id: "blendedFamily",
      text: "Do you have a blended family or children from a prior relationship?",
      hint: "Blended-family planning often benefits from careful drafting to balance spouse, child, and beneficiary expectations.",
      yes: { attorney: 5, both: 1 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "specialNeeds",
      text: "Do you have a beneficiary with special needs?",
      hint: "Special-needs planning can affect benefit eligibility and should generally be handled with personalized legal guidance.",
      yes: { attorney: 6 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "business",
      text: "Do you own a business?",
      hint: "Business ownership may require succession planning, buy-sell agreements, tax review, and continuity planning.",
      yes: { attorney: 5, trust: 1 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "significantAssets",
      text: "Do you have significant or complex assets, investments, life insurance, or possible tax-planning concerns?",
      hint: "You do not need to estimate exact values here. The goal is to flag whether your plan may require more tailoring.",
      yes: { trust: 3, attorney: 3 },
      no: { simple: 1 },
      unsure: { attorney: 2 }
    },
    {
      id: "incapacity",
      text: "Do you want someone to manage assets if you become incapacitated?",
      hint: "Trusts, powers of attorney, and health care directives can work together to support incapacity planning.",
      yes: { trust: 4, both: 1 },
      no: { simple: 1 },
      unsure: { trust: 1, attorney: 1 }
    },
    {
      id: "simpleLowCost",
      text: "Are you mainly looking for a simple, low-cost starting point?",
      hint: "A will may be a common starting point for simpler situations, but it may not address privacy, probate, or incapacity goals.",
      yes: { simple: 3, will: 3 },
      no: { trust: 1, both: 1 },
      unsure: { attorney: 1 }
    },
    {
      id: "existingDocuments",
      text: "Do you already have estate-planning documents?",
      hint: "Existing documents may still need review if your family, assets, fiduciaries, or state law have changed.",
      yes: { review: 1 },
      no: { will: 1, simple: 1 },
      unsure: { attorney: 1, review: 1 }
    },
    {
      id: "changedRecently",
      text: "Have your family, assets, or state of residence changed recently?",
      hint: "Major life changes are a common reason to review or update an estate plan.",
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
    significantAssets: "significant or complex assets, investments, insurance, or tax-planning concerns",
    incapacity: "incapacity-management goals",
    simpleLowCost: "a preference for a simple, lower-cost starting point",
    existingDocuments: "existing estate-planning documents that may need review",
    changedRecently: "recent changes to family, assets, or state of residence"
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
      <form class="question-panel" novalidate tabindex="-1">
        <span class="question-label">Question ${questionNumber}</span>
        <h3 class="question-title" id="active-question">${escapeHtml(question.text)}</h3>
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
      return;
    }

    renderResult(calculateOutcome());
  }

  function goBack() {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  }

  function restartQuiz() {
    state.currentIndex = 0;
    state.answers = {};
    state.inferredAnswers = {};
    renderQuestion();
    const quizSection = document.querySelector("#quiz");
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
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

          <section class="details-card consultation-cta" aria-labelledby="cta-heading">
            <div>
              <p class="cta-kicker">Optional next step</p>
              <h4 id="cta-heading">Want a professional review?</h4>
              <p>
                Bring this summary to a licensed estate-planning attorney so they can apply your state’s law and your individual facts.
              </p>
            </div>
            <a class="btn btn-gold" href="mailto:hello@example.com?subject=Estate%20Planning%20Consultation%20Request">Book a consultation</a>
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
      return "No (skipped because you said you do not own real estate)";
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
      question: question.text,
      answer: formatAnswerPlain(state.answers[question.id], question.id)
    }));

    const pdf = createPdfWriter();

    pdf.addPage();
    pdf.drawText("Estate Planning Decision Helper", 54, 48, 10, "bold", [11, 31, 54]);
    pdf.drawText("Educational Summary", 54, 75, 26, "bold", [7, 22, 38]);
    pdf.drawText(`Generated ${generatedOn}. This summary is educational information only, not legal advice.`, 54, 98, 9.5, "regular", [83, 101, 125]);
    pdf.drawRule(54, 116, 504, [211, 179, 108]);

    pdf.addCard(54, 138, 504, 178, [255, 250, 240], [229, 215, 190]);
    pdf.drawPill(`Outcome ${content.key}`, 74, 162, 94, 22, [247, 239, 225], [185, 145, 72], [7, 22, 38]);
    pdf.drawPill(content.confidence, 460, 162, 78, 22, [220, 235, 228], [188, 207, 198], [63, 112, 95]);
    let y = pdf.addWrappedText(content.title, 74, 208, 440, 26, 32, "bold", [7, 22, 38]);
    y = pdf.addWrappedText(content.summary, 74, y + 10, 438, 12.5, 18, "regular", [52, 70, 95]);
    pdf.y = Math.max(y + 22, 338);

    pdf.addNoteBox(
      "Important disclaimer",
      "This PDF is a browser-generated educational summary. It does not provide legal advice, does not create an attorney-client relationship, and does not replace counsel from a licensed attorney. Estate-planning laws vary by state and individual facts matter.",
      54,
      pdf.y,
      504
    );

    pdf.addSection("Why this result appeared", reasonList);
    pdf.addSection("What this usually means", content.usuallyMeans);
    pdf.addSection("Questions to ask an attorney", content.attorneyQuestions);
    pdf.addSection("Next steps", [
      ...content.nextSteps,
      "Remember: this is educational information, not legal advice. Laws vary by state."
    ]);

    pdf.addAnswerSummary("Your answer summary", answerItems);

    pdf.addFooterToAllPages();
    return pdf.toString();
  }

  function createPdfWriter() {
    const pageWidth = 612;
    const pageHeight = 792;
    const margin = 54;
    const bottomMargin = 68;
    const contentWidth = pageWidth - margin * 2;
    const pages = [];

    const writer = {
      pageWidth,
      pageHeight,
      margin,
      y: margin,
      addPage() {
        pages.push([]);
        this.y = margin;
      },
      current() {
        if (pages.length === 0) this.addPage();
        return pages[pages.length - 1];
      },
      ensureSpace(height) {
        if (this.y + height > pageHeight - bottomMargin) {
          this.addPage();
        }
      },
      drawText(text, x, yTop, size = 11, weight = "regular", color = [7, 22, 38]) {
        const [r, g, b] = color.map((value) => (value / 255).toFixed(4));
        const font = weight === "bold" ? "F2" : "F1";
        const y = pageHeight - yTop;
        this.current().push(`BT /${font} ${size} Tf ${r} ${g} ${b} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapePdfText(text)}) Tj ET`);
      },
      drawRule(x, yTop, width, color = [229, 235, 239]) {
        const [r, g, b] = color.map((value) => (value / 255).toFixed(4));
        const y = pageHeight - yTop;
        this.current().push(`q ${r} ${g} ${b} RG 1.2 w ${x.toFixed(2)} ${y.toFixed(2)} m ${(x + width).toFixed(2)} ${y.toFixed(2)} l S Q`);
      },
      addCard(x, yTop, width, height, fill = [255, 255, 255], stroke = [229, 235, 239]) {
        const [fr, fg, fb] = fill.map((value) => (value / 255).toFixed(4));
        const [sr, sg, sb] = stroke.map((value) => (value / 255).toFixed(4));
        const y = pageHeight - yTop - height;
        this.current().push(`q ${fr} ${fg} ${fb} rg ${sr} ${sg} ${sb} RG 1 w ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re B Q`);
      },
      drawPill(text, x, yTop, width, height, fill, stroke, color) {
        this.addCard(x, yTop, width, height, fill, stroke);
        this.drawText(text.toUpperCase(), x + 11, yTop + 15, 8, "bold", color);
      },
      addWrappedText(text, x, yTop, width, size = 11, lineHeight = 16, weight = "regular", color = [52, 70, 95]) {
        let y = yTop;
        const lines = wrapPdfText(text, width, size, weight);
        lines.forEach((line) => {
          this.ensureSpace(lineHeight + 8);
          this.drawText(line, x, y, size, weight, color);
          y += lineHeight;
          this.y = y;
        });
        return y;
      },
      addNoteBox(title, body, x, yTop, width) {
        const bodyLines = wrapPdfText(body, width - 36, 10.5, "regular");
        const height = 44 + bodyLines.length * 14;
        this.ensureSpace(height + 18);
        yTop = this.y;
        this.addCard(x, yTop, width, height, [250, 247, 239], [229, 215, 190]);
        this.drawText(title, x + 18, yTop + 22, 11, "bold", [7, 22, 38]);
        let y = yTop + 42;
        bodyLines.forEach((line) => {
          this.drawText(line, x + 18, y, 10.5, "regular", [52, 70, 95]);
          y += 14;
        });
        this.y = yTop + height + 24;
      },
      addSection(title, items) {
        const estimated = 42 + items.reduce((sum, item) => sum + wrapPdfText(item, contentWidth - 22, 11.2, "regular").length * 15 + 7, 0);
        this.ensureSpace(Math.min(estimated, 250));
        this.drawText(title, margin, this.y, 15, "bold", [7, 22, 38]);
        this.y += 24;
        items.forEach((item) => {
          const lines = wrapPdfText(item, contentWidth - 22, 11.2, "regular");
          this.ensureSpace(lines.length * 15 + 12);
          this.drawText("-", margin + 4, this.y, 11.2, "bold", [185, 145, 72]);
          let lineY = this.y;
          lines.forEach((line) => {
            this.drawText(line, margin + 22, lineY, 11.2, "regular", [52, 70, 95]);
            lineY += 15;
          });
          this.y = lineY + 7;
        });
        this.y += 12;
      },
      addAnswerSummary(title, items) {
        this.ensureSpace(120);
        this.drawText(title, margin, this.y, 15, "bold", [7, 22, 38]);
        this.y += 25;
        items.forEach((item) => {
          const answerLine = `${item.question} — ${item.answer}`;
          const lines = wrapPdfText(answerLine, contentWidth - 22, 10.5, "regular");
          this.ensureSpace(lines.length * 14 + 10);
          this.drawText("-", margin + 4, this.y, 10.5, "bold", [185, 145, 72]);
          let lineY = this.y;
          lines.forEach((line, index) => {
            this.drawText(line, margin + 22, lineY, 10.5, index === 0 ? "bold" : "regular", [52, 70, 95]);
            lineY += 14;
          });
          this.y = lineY + 6;
        });
      },
      addFooterToAllPages() {
        const total = pages.length;
        pages.forEach((commands, index) => {
          const pageNum = index + 1;
          const footerText = `Educational only. Not legal advice. Laws vary by state. Page ${pageNum} of ${total}`;
          const yTop = pageHeight - 34;
          const [r, g, b] = [83, 101, 125].map((value) => (value / 255).toFixed(4));
          commands.push(`BT /F1 8.5 Tf ${r} ${g} ${b} rg ${margin.toFixed(2)} ${(pageHeight - yTop).toFixed(2)} Td (${escapePdfText(footerText)}) Tj ET`);
        });
      },
      toString() {
        const objects = [];
        objects.push("<< /Type /Catalog /Pages 2 0 R >>");
        const pageObjectNumbers = pages.map((_, index) => 5 + index * 2);
        objects.push(`<< /Type /Pages /Count ${pages.length} /Kids [${pageObjectNumbers.map((num) => `${num} 0 R`).join(" ")}] >>`);
        objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
        objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

        pages.forEach((commands, index) => {
          const pageObjectNumber = 5 + index * 2;
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
    const averageWidth = weight === "bold" ? 0.55 : 0.5;
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
