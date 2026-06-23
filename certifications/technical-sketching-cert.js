(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "What is the main goal of a technical sketch?",
      choices: [
        "To communicate design information clearly",
        "To create a perfect piece of art",
        "To fill space in a notebook",
        "To avoid using notes"
      ],
      correct: "To communicate design information clearly",
      feedback: "Technical sketches are communication tools for engineering ideas."
    },
    {
      id: "p2",
      question: "What axes are used in a basic isometric sketch?",
      choices: [
        "One vertical axis and two receding axes about 30° from horizontal",
        "Only horizontal and vertical lines",
        "Three random diagonal axes",
        "A circle and a center point"
      ],
      correct: "One vertical axis and two receding axes about 30° from horizontal",
      feedback: "Isometric sketches use vertical lines and two 30° receding directions."
    },
    {
      id: "p3",
      question: "What should hidden lines show?",
      choices: [
        "Edges or features behind visible surfaces",
        "The darkest outside edge",
        "Construction planning marks",
        "Notes from the teacher"
      ],
      correct: "Edges or features behind visible surfaces",
      feedback: "Hidden lines use dashes to represent features not directly visible."
    },
    {
      id: "p4",
      question: "Why use light construction lines first?",
      choices: [
        "They help plan the sketch without competing with final object lines",
        "They replace final lines",
        "They make the sketch unreadable",
        "They are used only for notes"
      ],
      correct: "They help plan the sketch without competing with final object lines",
      feedback: "Construction lines help build proportion and layout before finalizing."
    },
    {
      id: "p5",
      question: "What is the purpose of orthographic views?",
      choices: [
        "To show separate front, top, and side views of an object",
        "To make a sketch look like a cartoon",
        "To avoid alignment",
        "To show only one face of the object"
      ],
      correct: "To show separate front, top, and side views of an object",
      feedback: "Orthographic views communicate exact shape information from different directions."
    },
    {
      id: "p6",
      question: "What should notes and labels do?",
      choices: [
        "Identify important features clearly without cluttering the sketch",
        "Cover the object lines",
        "Replace all drawing views",
        "Be written as large as possible over the sketch"
      ],
      correct: "Identify important features clearly without cluttering the sketch",
      feedback: "Good annotations support the sketch without making it hard to read."
    },
    {
      id: "p7",
      question: "What is a common orthographic sketching mistake?",
      choices: [
        "Misaligning views",
        "Using a title",
        "Drawing large enough to read",
        "Labeling key features"
      ],
      correct: "Misaligning views",
      feedback: "Front, top, and side views should align so dimensions relate correctly."
    },
    {
      id: "p8",
      question: "What should happen to failed or revised ideas in an engineering notebook?",
      choices: [
        "Keep them and note what changed",
        "Erase all evidence",
        "Tear the page out",
        "Pretend they were final ideas"
      ],
      correct: "Keep them and note what changed",
      feedback: "Failed or revised ideas show design thinking and iteration."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "Technical sketches are primarily used to:",
      choices: [
        "communicate shape, features, scale relationships, and design intent",
        "make every drawing artistic",
        "replace all prototypes",
        "avoid labels and notes"
      ]
    },
    {
      id: "q2",
      question: "A good engineering sketch should be:",
      choices: [
        "clear, readable, and accurate enough to communicate the idea",
        "tiny and crowded",
        "only decorative",
        "unlabeled"
      ]
    },
    {
      id: "q3",
      question: "Light construction lines are used to:",
      choices: [
        "plan proportions and layout before darkening final object lines",
        "show final visible edges",
        "replace hidden lines",
        "make notes harder to read"
      ]
    },
    {
      id: "q4",
      question: "Line weight helps readers:",
      choices: [
        "distinguish final object edges from planning marks and notes",
        "ignore the sketch",
        "avoid using labels",
        "make all lines look identical"
      ]
    },
    {
      id: "q5",
      question: "An isometric sketch usually shows:",
      choices: [
        "three faces of an object in one pictorial view",
        "only the front view",
        "only section hatching",
        "a wiring diagram"
      ]
    },
    {
      id: "q6",
      question: "Basic isometric axes include:",
      choices: [
        "one vertical axis and two receding axes about 30° from horizontal",
        "only a top and front axis",
        "three horizontal axes",
        "one circle and one diagonal"
      ]
    },
    {
      id: "q7",
      question: "In isometric sketching, parallel edges should:",
      choices: [
        "stay parallel to the matching isometric axis",
        "curve randomly",
        "switch directions every time",
        "always be hidden lines"
      ]
    },
    {
      id: "q8",
      question: "Circles on isometric faces are usually drawn as:",
      choices: [
        "ellipses",
        "true circles",
        "hidden lines only",
        "title blocks"
      ]
    },
    {
      id: "q9",
      question: "Orthographic sketches usually include separate views such as:",
      choices: [
        "front, top, and right side",
        "only one 3D view",
        "only a title page",
        "only a parts list"
      ]
    },
    {
      id: "q10",
      question: "Orthographic views must align so:",
      choices: [
        "width, height, and depth relationships are consistent",
        "each view is unrelated",
        "notes are hidden",
        "all lines are diagonal"
      ]
    },
    {
      id: "q11",
      question: "The front view should usually:",
      choices: [
        "show the object's most descriptive shape when possible",
        "be chosen randomly",
        "show no useful information",
        "be smaller than all other views"
      ]
    },
    {
      id: "q12",
      question: "Visible/object lines represent:",
      choices: [
        "edges that can be seen from the selected view",
        "edges behind the object",
        "temporary planning marks",
        "center axes only"
      ]
    },
    {
      id: "q13",
      question: "Hidden lines represent:",
      choices: [
        "edges or features behind visible surfaces",
        "final outside edges only",
        "notes to the teacher",
        "erased construction lines"
      ]
    },
    {
      id: "q14",
      question: "Centerlines are used for:",
      choices: [
        "axes of symmetry, holes, cylinders, and circular features",
        "all outside edges",
        "random decoration",
        "dimension values only"
      ]
    },
    {
      id: "q15",
      question: "Labels and notes should:",
      choices: [
        "identify important features without cluttering the sketch",
        "cover object lines",
        "replace all views",
        "be written over the whole drawing"
      ]
    },
    {
      id: "q16",
      question: "Leader arrows are useful when:",
      choices: [
        "a note refers to a specific feature",
        "there are no features",
        "all notes are general",
        "the sketch is blank"
      ]
    },
    {
      id: "q17",
      question: "A strong engineering notebook sketch entry should include:",
      choices: [
        "date, title, purpose, sketch, notes, and revision information when needed",
        "only an unlabeled drawing",
        "only a grade",
        "only a final answer"
      ]
    },
    {
      id: "q18",
      question: "Failed ideas or revised sketches should generally be:",
      choices: [
        "kept with notes explaining what changed",
        "erased completely",
        "torn out",
        "hidden from the design record"
      ]
    },
    {
      id: "q19",
      question: "A common sketching mistake is:",
      choices: [
        "drawing too small to read or misaligning orthographic views",
        "using labels clearly",
        "using construction lines lightly",
        "dating the page"
      ]
    },
    {
      id: "q20",
      question: "The Technical Sketching badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student signs in",
        "the student draws any random picture"
      ]
    }
  ];

  function renderQuiz(form, questions, includeFeedback) {
    if (!form) return;
    form.innerHTML = questions.map((q, index) => `
      <fieldset class="cert-question" data-question-id="${q.id}">
        <legend>${index + 1}. ${escapeHtml(q.question)}</legend>
        ${q.choices.map((choice) => `
          <label class="cert-choice">
            <input type="radio" name="${q.id}" value="${escapeHtml(choice)}">
            <span>${escapeHtml(choice)}</span>
          </label>
        `).join("")}
        ${includeFeedback ? `<p class="cert-feedback" data-feedback-for="${q.id}" hidden></p>` : ""}
      </fieldset>
    `).join("");
  }

  function getAnswers(form, questions) {
    const answers = {};
    const missing = [];
    questions.forEach((q) => {
      const selected = form.querySelector(`input[name="${q.id}"]:checked`);
      if (!selected) missing.push(q.id);
      answers[q.id] = selected ? selected.value : "";
    });
    return { answers, missing };
  }

  function setupPractice() {
    const form = document.querySelector("[data-sketching-practice]");
    const button = document.querySelector("[data-check-sketching-practice]");
    const resultBox = document.querySelector("[data-sketching-practice-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, practiceQuestions, true);

    button.addEventListener("click", () => {
      const { answers, missing } = getAnswers(form, practiceQuestions);
      if (missing.length) {
        resultBox.hidden = false;
        resultBox.className = "cert-result-box warning";
        resultBox.innerHTML = `<h3>Answer every question</h3><p>You still have ${missing.length} unanswered question(s).</p>`;
        return;
      }

      let correct = 0;
      practiceQuestions.forEach((q) => {
        const isCorrect = answers[q.id] === q.correct;
        if (isCorrect) correct++;
        const feedback = form.querySelector(`[data-feedback-for="${q.id}"]`);
        if (feedback) {
          feedback.hidden = false;
          feedback.className = "cert-feedback " + (isCorrect ? "correct" : "incorrect");
          feedback.textContent = isCorrect ? "Correct." : `Review: ${q.feedback}`;
        }
      });

      const percent = Math.round((correct / practiceQuestions.length) * 100);
      resultBox.hidden = false;
      resultBox.className = "cert-result-box " + (percent >= 80 ? "passed" : "warning");
      resultBox.innerHTML = `
        <h3>Practice score: ${percent}%</h3>
        <p>You answered ${correct} out of ${practiceQuestions.length} correctly.</p>
        <p>${percent >= 80 ? "You are probably ready for the final test." : "Review the missed topics before taking the final test."}</p>
      `;
    });
  }

  function setupFinal() {
    const form = document.querySelector("[data-sketching-final]");
    const button = document.querySelector("[data-submit-sketching-final]");
    const resultBox = document.querySelector("[data-sketching-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=technical-sketching-final.html";
        return;
      }

      const { answers, missing } = getAnswers(form, finalQuestions);
      if (missing.length) {
        resultBox.hidden = false;
        resultBox.className = "cert-result-box warning";
        resultBox.innerHTML = `<h3>Answer every question</h3><p>You still have ${missing.length} unanswered question(s).</p>`;
        return;
      }

      button.disabled = true;
      button.textContent = "Submitting...";
      resultBox.hidden = false;
      resultBox.className = "cert-result-box";
      resultBox.innerHTML = `<h3>Submitting final test...</h3><p>Please wait while your score is recorded.</p>`;

      try {
        const response = await auth.request("submitCertification", {
          token: session.token,
          certId: "technical-sketching",
          certName: "Technical Sketching",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="technical-sketching.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="technical-sketching-study.html">Review Study Guide</a>`}
          </div>
        `;
      } catch (err) {
        resultBox.className = "cert-result-box failed";
        resultBox.innerHTML = `<h3>Submission failed</h3><p>${escapeHtml(err.message)}</p>`;
        button.disabled = false;
        button.textContent = "Submit Final Test";
      }
    });
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[ch];
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupPractice();
    setupFinal();
  });
})();
