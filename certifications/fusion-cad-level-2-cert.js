(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "When should you use a component instead of only a body?",
      choices: [
        "When the part moves, repeats, appears in a BOM, or needs assembly behavior",
        "Only when changing colors",
        "Never in Level 2",
        "Only for screenshots"
      ],
      correct: "When the part moves, repeats, appears in a BOM, or needs assembly behavior",
      feedback: "Components represent organized parts that can be assembled, joined, and documented."
    },
    {
      id: "p2",
      question: "What does a revolute joint allow?",
      choices: [
        "Rotation around an axis",
        "Motion along a straight line only",
        "No motion at all",
        "File export only"
      ],
      correct: "Rotation around an axis",
      feedback: "A revolute joint is used for hinge-like rotation."
    },
    {
      id: "p3",
      question: "Why use construction geometry?",
      choices: [
        "To control symmetry, alignment, offsets, and feature placement",
        "To make the model harder to understand",
        "To replace saving",
        "To hide broken sketches"
      ],
      correct: "To control symmetry, alignment, offsets, and feature placement",
      feedback: "Construction geometry supports design intent and revision control."
    },
    {
      id: "p4",
      question: "What is a good use of a pattern tool?",
      choices: [
        "Repeating features with controlled count and spacing",
        "Manually copying random geometry",
        "Deleting timeline history",
        "Saving a screenshot"
      ],
      correct: "Repeating features with controlled count and spacing",
      feedback: "Patterns help repeated features update predictably."
    },
    {
      id: "p5",
      question: "What is the value of user parameters?",
      choices: [
        "They store important editable values like thickness, clearance, or hole spacing",
        "They permanently lock the model",
        "They replace all sketches",
        "They are only for appearances"
      ],
      correct: "They store important editable values like thickness, clearance, or hole spacing",
      feedback: "Named parameters make important design values easier to understand and revise."
    },
    {
      id: "p6",
      question: "What should you do after a model changes if it has a linked drawing?",
      choices: [
        "Check and update the drawing views, dimensions, and notes",
        "Assume the drawing is always correct",
        "Delete the title block",
        "Ignore outdated dimensions"
      ],
      correct: "Check and update the drawing views, dimensions, and notes",
      feedback: "Linked drawings still need verification after model revisions."
    },
    {
      id: "p7",
      question: "What should be checked before exporting manufacturing files?",
      choices: [
        "Units, scale, orientation, part selection, and file type",
        "Only the screen brightness",
        "Only the browser item color",
        "Nothing if the model looks close"
      ],
      correct: "Units, scale, orientation, part selection, and file type",
      feedback: "Export readiness depends on correct setup and process-specific file types."
    },
    {
      id: "p8",
      question: "What makes a model design-review ready?",
      choices: [
        "Named components, clear structure, working relationships, current drawings, and organized exports",
        "Only a pretty screenshot",
        "No notes or filenames",
        "One camera angle that looks good"
      ],
      correct: "Named components, clear structure, working relationships, current drawings, and organized exports",
      feedback: "Reviewers need to inspect structure, intent, motion, drawings, and exports."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "Fusion CAD Level 2 focuses on models that are:",
      choices: [
        "organized, editable, reviewable, and assembly or fabrication ready",
        "only visually decorative",
        "impossible to revise",
        "stored only as screenshots"
      ]
    },
    {
      id: "q2",
      question: "Design intent should guide:",
      choices: [
        "how sketches, features, components, and joints are structured",
        "only the model color",
        "only the file thumbnail",
        "only the screenshot angle"
      ]
    },
    {
      id: "q3",
      question: "A body is best described as:",
      choices: [
        "a piece of geometry",
        "a full assembly part with its own joint behavior by default",
        "a drawing title block",
        "an export folder"
      ]
    },
    {
      id: "q4",
      question: "A component is best used for a part that:",
      choices: [
        "moves, repeats, appears in a BOM, or needs its own organization",
        "is only a temporary line",
        "will never be assembled",
        "is only a sketch dimension"
      ]
    },
    {
      id: "q5",
      question: "Component names should be:",
      choices: [
        "clear enough that the browser communicates the design structure",
        "left as default names forever",
        "random letters only",
        "deleted after modeling"
      ]
    },
    {
      id: "q6",
      question: "Joints define:",
      choices: [
        "how components are positioned or allowed to move relative to each other",
        "only file names",
        "only drawing scale",
        "only material color"
      ]
    },
    {
      id: "q7",
      question: "A rigid joint:",
      choices: [
        "locks components together",
        "allows rotation around an axis",
        "allows sliding only",
        "exports STL files"
      ]
    },
    {
      id: "q8",
      question: "A revolute joint:",
      choices: [
        "allows rotation around an axis",
        "locks all motion",
        "only changes color",
        "only creates drawings"
      ]
    },
    {
      id: "q9",
      question: "A slider joint:",
      choices: [
        "allows motion along a line",
        "only creates a component name",
        "locks all parts permanently",
        "changes the file type"
      ]
    },
    {
      id: "q10",
      question: "Construction geometry is useful for:",
      choices: [
        "symmetry, alignment, offsets, hole placement, and angled features",
        "hiding design intent",
        "removing all constraints",
        "exporting screenshots only"
      ]
    },
    {
      id: "q11",
      question: "Pattern tools are used to:",
      choices: [
        "repeat features, bodies, or components using controlled spacing and count",
        "delete repeated features",
        "replace all components",
        "make files invisible"
      ]
    },
    {
      id: "q12",
      question: "Mirror tools are used to:",
      choices: [
        "reflect geometry across a plane or line of symmetry",
        "randomly duplicate parts",
        "rename sketches",
        "change material color only"
      ]
    },
    {
      id: "q13",
      question: "User parameters can store important values such as:",
      choices: [
        "thickness, clearance, hole spacing, or tab width",
        "student attendance",
        "monitor brightness",
        "browser font size"
      ]
    },
    {
      id: "q14",
      question: "Named parameters make a model:",
      choices: [
        "easier to update and understand",
        "harder to revise",
        "impossible to edit",
        "unrelated to design intent"
      ]
    },
    {
      id: "q15",
      question: "Linked drawings should be checked after model changes because:",
      choices: [
        "views, dimensions, notes, or title block information may need updates",
        "linked drawings never update",
        "drawings should be deleted after edits",
        "drawing checks are only decorative"
      ]
    },
    {
      id: "q16",
      question: "Exported manufacturing files should be checked for:",
      choices: [
        "units, scale, orientation, part selection, and correct file type",
        "only file color",
        "only student initials",
        "only thumbnail size"
      ]
    },
    {
      id: "q17",
      question: "Editable CAD files should generally be:",
      choices: [
        "kept separate from exported manufacturing files",
        "deleted after export",
        "renamed finalfinal every time",
        "stored only as images"
      ]
    },
    {
      id: "q18",
      question: "A design review should show:",
      choices: [
        "model structure, intended motion, key dimensions, fabrication plan, and revision readiness",
        "only a glamour screenshot",
        "only a single body with no names",
        "only a file download"
      ]
    },
    {
      id: "q19",
      question: "Before submitting a Level 2 model, students should check for:",
      choices: [
        "timeline errors, broken references, missing joints, wrong materials, and outdated drawings",
        "only background color",
        "only the number of screenshots",
        "only the model name"
      ]
    },
    {
      id: "q20",
      question: "The Fusion CAD Level 2 badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student changes a material color",
        "the student signs in"
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
    const form = document.querySelector("[data-fusion2-practice]");
    const button = document.querySelector("[data-check-fusion2-practice]");
    const resultBox = document.querySelector("[data-fusion2-practice-result]");
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
    const form = document.querySelector("[data-fusion2-final]");
    const button = document.querySelector("[data-submit-fusion2-final]");
    const resultBox = document.querySelector("[data-fusion2-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=fusion-cad-level-2-final.html";
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
          certId: "fusion-cad-level-2",
          certName: "Fusion CAD Level 2",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="fusion-cad-level-2.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="fusion-cad-level-2-study.html">Review Study Guide</a>`}
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
