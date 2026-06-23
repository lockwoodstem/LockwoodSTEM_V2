(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "What should you confirm before slicing or submitting a print?",
      choices: [
        "That the model looks interesting",
        "That the correct printer and material profile are selected",
        "That the file name is short",
        "That the printer is the closest one"
      ],
      correct: "That the correct printer and material profile are selected",
      feedback: "Printer and material profiles control important slicing assumptions."
    },
    {
      id: "p2",
      question: "What is the default student filament unless otherwise approved?",
      choices: ["PLA", "Unknown plastic", "Metal wire", "Any flexible material"],
      correct: "PLA",
      feedback: "PLA is the default student material unless another material is approved."
    },
    {
      id: "p3",
      question: "What should you do if the first layer curls, detaches, or begins dragging filament?",
      choices: [
        "Let it continue and check later",
        "Stop or ask for help",
        "Increase speed",
        "Pull on the filament"
      ],
      correct: "Stop or ask for help",
      feedback: "First-layer problems often lead to failed prints and should be addressed early."
    },
    {
      id: "p4",
      question: "Why should you preview the sliced model before printing?",
      choices: [
        "To check layers, supports, orientation, and first-layer behavior",
        "To make the file smaller",
        "To skip teacher approval",
        "To remove all supports automatically"
      ],
      correct: "To check layers, supports, orientation, and first-layer behavior",
      feedback: "Previewing helps catch problems before material and time are wasted."
    },
    {
      id: "p5",
      question: "Which is the best removal practice?",
      choices: [
        "Pry aggressively while the bed is hot",
        "Wait when needed, use approved removal methods, and avoid damaging the build surface",
        "Use any sharp tool nearby",
        "Pull the part off while the printer is moving"
      ],
      correct: "Wait when needed, use approved removal methods, and avoid damaging the build surface",
      feedback: "Safe removal protects the student, part, and build surface."
    },
    {
      id: "p6",
      question: "What should you do after a failed print?",
      choices: [
        "Immediately reprint with no changes",
        "Throw it away and hide it",
        "Identify the cause, document changes, and ask for help if needed",
        "Switch printers without telling anyone"
      ],
      correct: "Identify the cause, document changes, and ask for help if needed",
      feedback: "Failures are design data and should lead to an adjustment."
    },
    {
      id: "p7",
      question: "Which item belongs in the printer area?",
      choices: ["Food and drinks", "Loose backpacks", "Approved print tools/materials", "Random scrap paper"],
      correct: "Approved print tools/materials",
      feedback: "Printer areas should stay clear and organized."
    },
    {
      id: "p8",
      question: "What does more infill usually do?",
      choices: [
        "Always makes the print better",
        "Can increase strength but also uses more time and material",
        "Makes supports unnecessary",
        "Fixes wrong units"
      ],
      correct: "Can increase strength but also uses more time and material",
      feedback: "Infill should be chosen based on function, not automatically maximized."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "Before submitting a print, a student should verify:",
      choices: [
        "printer profile, filament/material profile, model scale, and estimated print time",
        "only the file name",
        "only the color of filament",
        "only that the model is centered on the screen"
      ]
    },
    {
      id: "q2",
      question: "The default student material for classroom 3D printing is:",
      choices: ["PLA unless another material is approved", "any unknown plastic", "metal", "resin"]
    },
    {
      id: "q3",
      question: "Students should use Bambu P1S/A1 Mini and Robo E3/E4 printers:",
      choices: [
        "only after instruction, certification requirements, and permission",
        "whenever the printer is idle",
        "only when another student says it is fine",
        "without teacher approval if using PLA"
      ]
    },
    {
      id: "q4",
      question: "A printer profile matters because it:",
      choices: [
        "matches slicing assumptions to the printer being used",
        "only changes the color of the model",
        "automatically makes every part stronger",
        "removes the need to inspect the print"
      ]
    },
    {
      id: "q5",
      question: "If a model appears much too large or too small in the slicer, the student should:",
      choices: [
        "check units and scale before printing",
        "print it anyway",
        "add more infill",
        "change filament color"
      ]
    },
    {
      id: "q6",
      question: "Part orientation should be chosen to:",
      choices: [
        "improve bed contact, reduce unnecessary supports, and support the part's function",
        "make the part look largest on screen",
        "use the most material possible",
        "avoid previewing layers"
      ]
    },
    {
      id: "q7",
      question: "Supports should be used:",
      choices: [
        "when the model has unsupported overhangs or features that need them",
        "on every print no matter what",
        "never, under any conditions",
        "only to change color"
      ]
    },
    {
      id: "q8",
      question: "Infill should be selected based on:",
      choices: [
        "the part's function, time, material use, and required strength",
        "the highest number available",
        "the printer name only",
        "the student's favorite pattern"
      ]
    },
    {
      id: "q9",
      question: "The sliced preview should be checked because it can reveal:",
      choices: [
        "layer, support, orientation, and first-layer problems before printing",
        "the student's grade automatically",
        "whether the room is clean",
        "which backpack belongs to the student"
      ]
    },
    {
      id: "q10",
      question: "Before a print starts, the build plate/bed should be:",
      choices: [
        "clear, installed correctly, and ready for the selected printer",
        "covered with scraps",
        "removed from the printer",
        "touched repeatedly with bare hands"
      ]
    },
    {
      id: "q11",
      question: "The first layer is important because:",
      choices: [
        "poor first-layer adhesion often causes print failure",
        "it decides the filament color",
        "it replaces all other settings",
        "it is never visible"
      ]
    },
    {
      id: "q12",
      question: "If the print becomes spaghetti, detaches, blobs around the nozzle, or makes unusual sounds, the student should:",
      choices: [
        "stop or ask for help immediately",
        "wait until the end of class",
        "pull material by hand while it prints",
        "ignore it and start another printer"
      ]
    },
    {
      id: "q13",
      question: "Students should avoid reaching into the printer while:",
      choices: [
        "parts are moving or hot surfaces may be present",
        "the screen is on",
        "a teacher is nearby",
        "the model is small"
      ]
    },
    {
      id: "q14",
      question: "Filament should be:",
      choices: [
        "teacher-approved, clean, dry, untangled, and properly supported",
        "left loose on the floor",
        "cut randomly during printing",
        "shared between printers without checking compatibility"
      ]
    },
    {
      id: "q15",
      question: "A filament jam, tangle, snapping filament, or failed loading should be:",
      choices: [
        "reported instead of forced",
        "hidden",
        "fixed by pulling as hard as possible",
        "ignored if the printer is still warm"
      ]
    },
    {
      id: "q16",
      question: "After printing, students should remove the part:",
      choices: [
        "using approved methods after cooling when required",
        "with aggressive prying on any build surface",
        "while the printer is still moving",
        "by hitting the printer frame"
      ]
    },
    {
      id: "q17",
      question: "Support material and failed print scraps should be:",
      choices: [
        "cleaned up and disposed of in the correct location",
        "left for the next class",
        "stored inside the printer",
        "placed with unused filament"
      ]
    },
    {
      id: "q18",
      question: "A failed print should usually lead to:",
      choices: [
        "identifying the cause and changing the design, orientation, or settings before reprinting",
        "reprinting repeatedly without changes",
        "switching printers secretly",
        "deleting the file and blaming the machine"
      ]
    },
    {
      id: "q19",
      question: "The hands-on portion of the certification proves that the student can:",
      choices: [
        "complete a safe supervised print workflow from setup through cleanup",
        "memorize all brand names",
        "print without checking settings",
        "skip the online test"
      ]
    },
    {
      id: "q20",
      question: "The 3D Printing badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student prints anything once",
        "the student signs in"
      ]
    }
  ];

  const finalKey = {
    q1: "printer profile, filament/material profile, model scale, and estimated print time",
    q2: "PLA unless another material is approved",
    q3: "only after instruction, certification requirements, and permission",
    q4: "matches slicing assumptions to the printer being used",
    q5: "check units and scale before printing",
    q6: "improve bed contact, reduce unnecessary supports, and support the part's function",
    q7: "when the model has unsupported overhangs or features that need them",
    q8: "the part's function, time, material use, and required strength",
    q9: "layer, support, orientation, and first-layer problems before printing",
    q10: "clear, installed correctly, and ready for the selected printer",
    q11: "poor first-layer adhesion often causes print failure",
    q12: "stop or ask for help immediately",
    q13: "parts are moving or hot surfaces may be present",
    q14: "teacher-approved, clean, dry, untangled, and properly supported",
    q15: "reported instead of forced",
    q16: "using approved methods after cooling when required",
    q17: "cleaned up and disposed of in the correct location",
    q18: "identifying the cause and changing the design, orientation, or settings before reprinting",
    q19: "complete a safe supervised print workflow from setup through cleanup",
    q20: "the online test is passed and the teacher marks the hands-on portion complete"
  };

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
    const form = document.querySelector("[data-printing-practice]");
    const button = document.querySelector("[data-check-printing-practice]");
    const resultBox = document.querySelector("[data-printing-practice-result]");
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
    const form = document.querySelector("[data-printing-final]");
    const button = document.querySelector("[data-submit-printing-final]");
    const resultBox = document.querySelector("[data-printing-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=3d-printing-final.html";
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
          certId: "3d-printing",
          certName: "3D Printing",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="3d-printing.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="3d-printing-study.html">Review Study Guide</a>`}
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
