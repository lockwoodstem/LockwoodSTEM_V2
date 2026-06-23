(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "What is the main purpose of an engineering drawing?",
      choices: [
        "To communicate exact part shape, size, features, and requirements",
        "To make the page look full",
        "To replace all dimensions with opinions",
        "To hide design changes"
      ],
      correct: "To communicate exact part shape, size, features, and requirements",
      feedback: "Engineering drawings communicate the information needed to inspect, fabricate, or model a part."
    },
    {
      id: "p2",
      question: "Which views are common in an orthographic drawing?",
      choices: [
        "Front, top, and right side",
        "Only one 3D view",
        "Only a title block",
        "Only a material list"
      ],
      correct: "Front, top, and right side",
      feedback: "Orthographic drawings commonly use front, top, and right side views."
    },
    {
      id: "p3",
      question: "What do hidden lines show?",
      choices: [
        "Edges or features behind visible surfaces",
        "The outside visible edge",
        "A revision note",
        "The scale"
      ],
      correct: "Edges or features behind visible surfaces",
      feedback: "Hidden lines use dashes to show features not directly visible in that view."
    },
    {
      id: "p4",
      question: "What should dimensions communicate?",
      choices: [
        "Size and location clearly",
        "Only decoration",
        "Only student names",
        "Only the project title"
      ],
      correct: "Size and location clearly",
      feedback: "Dimensions define the part's size and feature locations."
    },
    {
      id: "p5",
      question: "Why should duplicate dimensions be avoided?",
      choices: [
        "They can clutter the drawing and create conflicting information",
        "They make the drawing more accurate automatically",
        "They replace the title block",
        "They remove the need for views"
      ],
      correct: "They can clutter the drawing and create conflicting information",
      feedback: "Duplicate dimensions can confuse the reader and create conflict."
    },
    {
      id: "p6",
      question: "What does a title block identify?",
      choices: [
        "Part/project information such as title, name/team, date, scale, units, and revision",
        "Only the front view",
        "Only hidden lines",
        "Only section hatching"
      ],
      correct: "Part/project information such as title, name/team, date, scale, units, and revision",
      feedback: "The title block gives essential drawing identity and control information."
    },
    {
      id: "p7",
      question: "What does a section view show?",
      choices: [
        "Interior features by imagining the part cut open",
        "Only a decorative border",
        "Only the outside front face",
        "Only the title block"
      ],
      correct: "Interior features by imagining the part cut open",
      feedback: "Section views reveal interior details that may be hard to show otherwise."
    },
    {
      id: "p8",
      question: "What should happen when the CAD model changes?",
      choices: [
        "The drawing should be checked and updated",
        "The drawing should stay outdated",
        "The title block should be deleted",
        "All dimensions should be removed"
      ],
      correct: "The drawing should be checked and updated",
      feedback: "Drawings must match the current part revision."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "Engineering drawings communicate:",
      choices: [
        "exact part shape, size, features, and production requirements",
        "only artistic style",
        "only team opinions",
        "only project grades"
      ]
    },
    {
      id: "q2",
      question: "A good drawing should allow someone else to:",
      choices: [
        "inspect, fabricate, or model the part accurately",
        "guess the missing dimensions",
        "ignore hidden features",
        "avoid reading the title block"
      ]
    },
    {
      id: "q3",
      question: "Common orthographic views include:",
      choices: [
        "front, top, and right side",
        "only one pictorial view",
        "only a parts list",
        "only a revision table"
      ]
    },
    {
      id: "q4",
      question: "Orthographic views must be aligned so:",
      choices: [
        "width, height, and depth match correctly",
        "each view is unrelated",
        "notes are hidden",
        "all dimensions are duplicated"
      ]
    },
    {
      id: "q5",
      question: "The front view should generally:",
      choices: [
        "show the most descriptive shape when possible",
        "be chosen randomly",
        "show no important features",
        "be left blank"
      ]
    },
    {
      id: "q6",
      question: "Visible/object lines show:",
      choices: [
        "edges that can be seen",
        "edges behind visible surfaces",
        "only revision notes",
        "only title block borders"
      ]
    },
    {
      id: "q7",
      question: "Hidden lines show:",
      choices: [
        "edges or features behind visible surfaces",
        "final outside edges only",
        "dimension values",
        "student names"
      ]
    },
    {
      id: "q8",
      question: "Centerlines show:",
      choices: [
        "axes of symmetry, holes, cylinders, and circular features",
        "all visible edges",
        "only material notes",
        "only title block information"
      ]
    },
    {
      id: "q9",
      question: "Dimension and extension lines are used to:",
      choices: [
        "communicate measurements",
        "show only hidden features",
        "replace object lines",
        "decorate the border"
      ]
    },
    {
      id: "q10",
      question: "Dimensions should describe:",
      choices: [
        "size and location clearly",
        "only the part color",
        "only the project title",
        "only material cost"
      ]
    },
    {
      id: "q11",
      question: "A good drawing should avoid:",
      choices: [
        "duplicate or conflicting dimensions",
        "clear title blocks",
        "appropriate units",
        "aligned views"
      ]
    },
    {
      id: "q12",
      question: "Dimensions should be placed:",
      choices: [
        "where they are easy to read and relate to the correct feature",
        "randomly across the page",
        "only inside the title block",
        "only on hidden lines"
      ]
    },
    {
      id: "q13",
      question: "Hole centers are commonly located using:",
      choices: [
        "centerlines and dimensions",
        "only color",
        "only hatching",
        "only a student note saying hole"
      ]
    },
    {
      id: "q14",
      question: "A title block identifies:",
      choices: [
        "part, project, student/team, date, scale, units, and revision when required",
        "only the drawing border",
        "only the front view",
        "only the hidden lines"
      ]
    },
    {
      id: "q15",
      question: "Scale tells:",
      choices: [
        "how the drawing view size relates to real part size",
        "who made the part",
        "the material hardness",
        "the number of hidden lines"
      ]
    },
    {
      id: "q16",
      question: "Section views are used to:",
      choices: [
        "show interior features by imagining the part cut open",
        "make every drawing more complicated",
        "replace all dimensions",
        "show only the title block"
      ]
    },
    {
      id: "q17",
      question: "Hatching in a section view shows:",
      choices: [
        "the cut material surface",
        "every visible edge",
        "the drawing scale",
        "a file name"
      ]
    },
    {
      id: "q18",
      question: "Detail views are used to:",
      choices: [
        "enlarge small or complex areas that are hard to read at normal scale",
        "hide missing dimensions",
        "replace the title block",
        "show only hidden lines"
      ]
    },
    {
      id: "q19",
      question: "Revision notes should explain:",
      choices: [
        "what changed and why",
        "only who opened the file",
        "only the paper size",
        "nothing"
      ]
    },
    {
      id: "q20",
      question: "The Engineering Drawings badge is earned when:",
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
    const form = document.querySelector("[data-drawings-practice]");
    const button = document.querySelector("[data-check-drawings-practice]");
    const resultBox = document.querySelector("[data-drawings-practice-result]");
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
    const form = document.querySelector("[data-drawings-final]");
    const button = document.querySelector("[data-submit-drawings-final]");
    const resultBox = document.querySelector("[data-drawings-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=engineering-drawings-final.html";
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
          certId: "engineering-drawings",
          certName: "Engineering Drawings",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="engineering-drawings.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="engineering-drawings-study.html">Review Study Guide</a>`}
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
