(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "What does parametric modeling allow you to do?",
      choices: [
        "Change dimensions and features later",
        "Only make decorative screenshots",
        "Avoid saving files",
        "Prevent sketches from being edited"
      ],
      correct: "Change dimensions and features later",
      feedback: "Parametric models are built so dimensions/features can be changed."
    },
    {
      id: "p2",
      question: "What is needed before many solid features like Extrude can be created?",
      choices: [
        "A closed sketch profile",
        "An empty project",
        "A screenshot",
        "A presentation slide"
      ],
      correct: "A closed sketch profile",
      feedback: "Extrude commonly uses a closed profile to make or cut solid geometry."
    },
    {
      id: "p3",
      question: "What do sketch constraints control?",
      choices: [
        "Relationships between sketch entities",
        "Only file names",
        "Only material color",
        "Only screenshots"
      ],
      correct: "Relationships between sketch entities",
      feedback: "Constraints control relationships such as parallel, perpendicular, equal, and concentric."
    },
    {
      id: "p4",
      question: "What should you do instead of dragging geometry until it looks close?",
      choices: [
        "Use dimensions and constraints",
        "Export immediately",
        "Delete the file",
        "Use a random plane"
      ],
      correct: "Use dimensions and constraints",
      feedback: "Dimensions and constraints make the model controlled and repeatable."
    },
    {
      id: "p5",
      question: "Why is the timeline useful?",
      choices: [
        "It shows the order of features and helps with edits",
        "It replaces saving",
        "It changes the file type",
        "It hides errors"
      ],
      correct: "It shows the order of features and helps with edits",
      feedback: "The timeline helps you understand and revise feature history."
    },
    {
      id: "p6",
      question: "What should you verify before exporting a manufacturing file?",
      choices: [
        "Units, orientation, file type, and model correctness",
        "Only the file color",
        "Only that the model is pretty",
        "Only the project title"
      ],
      correct: "Units, orientation, file type, and model correctness",
      feedback: "Exported files should match the manufacturing task."
    },
    {
      id: "p7",
      question: "Which file name is best for a Fusion design?",
      choices: [
        "Rover_BatteryClip_v02",
        "part",
        "final final",
        "new thing"
      ],
      correct: "Rover_BatteryClip_v02",
      feedback: "Descriptive names with part/project/version context are easier to manage."
    },
    {
      id: "p8",
      question: "What is the best way to change the length of a controlled part?",
      choices: [
        "Edit the sketch dimension or feature setting",
        "Drag a face randomly",
        "Start a brand-new file every time",
        "Take a screenshot"
      ],
      correct: "Edit the sketch dimension or feature setting",
      feedback: "Controlled CAD models should be revised by editing dimensions/features."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "A parametric CAD model is designed so:",
      choices: [
        "dimensions and features can be changed later",
        "the model cannot be edited",
        "the file does not need to be saved",
        "sketches are never used"
      ]
    },
    {
      id: "q2",
      question: "Good Fusion file organization includes:",
      choices: [
        "saving in the correct project folder with a descriptive name",
        "using only the name final",
        "saving all class files in one random location",
        "avoiding version context"
      ]
    },
    {
      id: "q3",
      question: "A strong CAD file name should include:",
      choices: [
        "project, part, version, or assignment context when helpful",
        "only the word part",
        "only a single letter",
        "no useful context"
      ]
    },
    {
      id: "q4",
      question: "A sketch should begin on:",
      choices: [
        "an appropriate plane or face based on the part orientation",
        "a random surface every time",
        "only the browser panel",
        "the timeline"
      ]
    },
    {
      id: "q5",
      question: "Using the origin and axes intentionally helps with:",
      choices: [
        "symmetry, alignment, and future edits",
        "changing the screen color",
        "hiding constraints",
        "preventing saves"
      ]
    },
    {
      id: "q6",
      question: "A closed sketch profile is often required for:",
      choices: [
        "extrude features",
        "renaming a file",
        "opening the data panel",
        "orbiting the camera"
      ]
    },
    {
      id: "q7",
      question: "Sketch dimensions control:",
      choices: [
        "size and location",
        "only project folders",
        "only browser zoom",
        "only material appearance"
      ]
    },
    {
      id: "q8",
      question: "Sketch constraints control:",
      choices: [
        "relationships such as horizontal, vertical, parallel, perpendicular, and concentric",
        "file export format only",
        "the student account only",
        "the final grade only"
      ]
    },
    {
      id: "q9",
      question: "A fully defined sketch is usually:",
      choices: [
        "more predictable and easier to revise",
        "impossible to edit",
        "unusable for extrude",
        "always worse than an underdefined sketch"
      ]
    },
    {
      id: "q10",
      question: "If sketch geometry turns red or errors appear, the student should:",
      choices: [
        "stop and fix the constraint or dimension issue",
        "export immediately",
        "ignore the warning",
        "delete all work without checking"
      ]
    },
    {
      id: "q11",
      question: "Extrude is used to:",
      choices: [
        "turn a closed sketch profile into a 3D solid or cut",
        "rename a project",
        "make a screenshot",
        "measure a finished part only"
      ]
    },
    {
      id: "q12",
      question: "Join, cut, new body, and new component options should be used:",
      choices: [
        "intentionally based on the design task",
        "randomly",
        "only to change color",
        "only after exporting"
      ]
    },
    {
      id: "q13",
      question: "Fillets and chamfers are used to:",
      choices: [
        "modify edges based on design intent",
        "replace all sketches",
        "save a file",
        "create project folders"
      ]
    },
    {
      id: "q14",
      question: "The timeline helps students:",
      choices: [
        "understand and edit the order of features",
        "avoid modeling carefully",
        "hide errors permanently",
        "skip sketches"
      ]
    },
    {
      id: "q15",
      question: "A good way to revise a controlled model is to:",
      choices: [
        "edit sketch dimensions or feature settings when possible",
        "delete and rebuild the whole design for every small change",
        "drag geometry randomly",
        "export the model as a screenshot"
      ]
    },
    {
      id: "q16",
      question: "The inspect/measure tools are used to verify:",
      choices: [
        "size, distance, diameter, and clearance",
        "student attendance",
        "only the file name",
        "only the background color"
      ]
    },
    {
      id: "q17",
      question: "Before exporting, students should check:",
      choices: [
        "units, orientation, model correctness, and required file type",
        "only the image preview",
        "only that the file opens",
        "nothing if the model looks close"
      ]
    },
    {
      id: "q18",
      question: "STL or 3MF files are commonly used for:",
      choices: [
        "3D printing workflows",
        "teacher attendance",
        "laser-only vector engraving",
        "handwritten notebook entries"
      ]
    },
    {
      id: "q19",
      question: "Editable CAD files should be:",
      choices: [
        "kept separate from exported manufacturing files when appropriate",
        "deleted after export",
        "renamed untitled",
        "stored only as screenshots"
      ]
    },
    {
      id: "q20",
      question: "The Fusion CAD Level 1 badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student takes any screenshot",
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
    const form = document.querySelector("[data-fusion1-practice]");
    const button = document.querySelector("[data-check-fusion1-practice]");
    const resultBox = document.querySelector("[data-fusion1-practice-result]");
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
    const form = document.querySelector("[data-fusion1-final]");
    const button = document.querySelector("[data-submit-fusion1-final]");
    const resultBox = document.querySelector("[data-fusion1-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=fusion-cad-level-1-final.html";
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
          certId: "fusion-cad-level-1",
          certName: "Fusion CAD Level 1",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="fusion-cad-level-1.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="fusion-cad-level-1-study.html">Review Study Guide</a>`}
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
