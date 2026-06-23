(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "Why is Z-zero especially important on a CNC machine?",
      choices: [
        "Incorrect Z-zero can drive the bit into the stock or machine bed",
        "It changes the material color",
        "It replaces workholding",
        "It makes clamps optional"
      ],
      correct: "Incorrect Z-zero can drive the bit into the stock or machine bed",
      feedback: "Z-zero controls cutting depth and can cause crashes if set incorrectly."
    },
    {
      id: "p2",
      question: "What should be checked before running a CNC job?",
      choices: [
        "Units, stock size, origin, toolpath preview, bit, workholding, and zero",
        "Only the file name",
        "Only the material color",
        "Only that the computer is on"
      ],
      correct: "Units, stock size, origin, toolpath preview, bit, workholding, and zero",
      feedback: "A CNC job requires both digital and physical setup checks."
    },
    {
      id: "p3",
      question: "Where should clamps be located?",
      choices: [
        "Outside the toolpath",
        "Directly under the bit path",
        "On top of the design area",
        "Anywhere the student wants"
      ],
      correct: "Outside the toolpath",
      feedback: "Toolpaths must not collide with clamps or fixtures."
    },
    {
      id: "p4",
      question: "What should you do if the stock moves during a cut?",
      choices: [
        "Stop the job and ask for help",
        "Hold it by hand",
        "Increase the feed rate",
        "Ignore it until the pass ends"
      ],
      correct: "Stop the job and ask for help",
      feedback: "Moving stock is dangerous and can damage the machine, tool, and project."
    },
    {
      id: "p5",
      question: "Why should a toolpath simulation or preview be reviewed?",
      choices: [
        "To check depth, collisions, clamp hits, and tool motion before cutting",
        "To make the machine quieter",
        "To sharpen the bit",
        "To clean chips automatically"
      ],
      correct: "To check depth, collisions, clamp hits, and tool motion before cutting",
      feedback: "Simulation helps catch errors before the machine moves."
    },
    {
      id: "p6",
      question: "What PPE is required during CNC setup/cutting/cleanup?",
      choices: [
        "Safety glasses",
        "Gloves around the spindle",
        "No PPE",
        "Open-toe shoes"
      ],
      correct: "Safety glasses",
      feedback: "Eye protection is required because chips and dust can be ejected."
    },
    {
      id: "p7",
      question: "When is it safe to remove parts or clean chips?",
      choices: [
        "After the spindle and all motion fully stop",
        "While the bit is still spinning",
        "During a light pass",
        "Whenever the part looks finished"
      ],
      correct: "After the spindle and all motion fully stop",
      feedback: "Wait for full stop before reaching into the machine."
    },
    {
      id: "p8",
      question: "What should you do before the cut begins?",
      choices: [
        "Know how to pause, stop, and use emergency stop",
        "Put on gloves and reach near the spindle",
        "Move clamps into the toolpath",
        "Disable supervision"
      ],
      correct: "Know how to pause, stop, and use emergency stop",
      feedback: "Students must know stop procedures before machine motion begins."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "A student may use the CNC only after:",
      choices: [
        "instruction, certification requirements, teacher permission, and supervision expectations are met",
        "watching another student once",
        "opening a CAD file",
        "finding a piece of material"
      ]
    },
    {
      id: "q2",
      question: "The major hazards of CNC work include:",
      choices: [
        "automatic machine motion, rotating tools, flying chips, dust, and loose stock",
        "paper cuts only",
        "laser fumes only",
        "cold solder joints"
      ]
    },
    {
      id: "q3",
      question: "Safety glasses are required:",
      choices: [
        "during CNC setup, cutting, chip clearing, and cleanup",
        "only during the final pass",
        "only when cutting metal",
        "only if the tool breaks"
      ]
    },
    {
      id: "q4",
      question: "Gloves should not be worn near the rotating spindle because they can:",
      choices: [
        "catch in rotating parts and pull a hand toward the tool",
        "make the bit sharper",
        "clean chips automatically",
        "replace clamps"
      ]
    },
    {
      id: "q5",
      question: "Approved CNC material means:",
      choices: [
        "the teacher has approved the material for the machine, bit, and project",
        "it fits in the room",
        "it looks like wood",
        "it was found in a scrap bin"
      ]
    },
    {
      id: "q6",
      question: "Incorrect stock thickness can:",
      choices: [
        "cause a crash, wrong depth, incomplete cut, or damage",
        "make the machine safer",
        "replace toolpath preview",
        "automatically improve accuracy"
      ]
    },
    {
      id: "q7",
      question: "The cutting bit should be:",
      choices: [
        "correct for the material and operation, undamaged, and secured properly",
        "selected only by color",
        "as large as possible every time",
        "installed without inspection"
      ]
    },
    {
      id: "q8",
      question: "Before running toolpaths, students should verify:",
      choices: [
        "units, scale, stock size, origin, setup orientation, tool, and toolpath preview",
        "only the file name",
        "only the project title",
        "only that the machine is plugged in"
      ]
    },
    {
      id: "q9",
      question: "A simulation or preview should be used to check for:",
      choices: [
        "wrong depth, collisions, clamp hits, and toolpaths outside the stock",
        "student attendance",
        "filament tangles",
        "solder fumes"
      ]
    },
    {
      id: "q10",
      question: "A CNC toolpath should be run only after:",
      choices: [
        "review and approval according to the class workflow",
        "the student guesses the zero point",
        "the clamps are hidden",
        "the tool is moving"
      ]
    },
    {
      id: "q11",
      question: "Workholding should:",
      choices: [
        "secure stock so it cannot shift or spin during cutting",
        "be optional for small parts",
        "be placed directly in the toolpath",
        "be adjusted while cutting"
      ]
    },
    {
      id: "q12",
      question: "Clamps and fixtures must be:",
      choices: [
        "outside the toolpath",
        "under the cutting path",
        "touching the bit",
        "removed before cutting starts"
      ]
    },
    {
      id: "q13",
      question: "Z-zero is critical because it controls:",
      choices: [
        "cutting depth relative to the stock or machine bed",
        "the color of the part",
        "which student is logged in",
        "the room lights"
      ]
    },
    {
      id: "q14",
      question: "A dry run, air cut, boundary check, or preview helps confirm:",
      choices: [
        "machine motion and setup before the real cut",
        "that cleanup is already complete",
        "that clamps are unnecessary",
        "that the bit is new"
      ]
    },
    {
      id: "q15",
      question: "During a CNC cut, the student should monitor:",
      choices: [
        "sound, chips, dust, tool motion, and stock movement",
        "only the clock",
        "only the final part color",
        "nothing, because CNC is automatic"
      ]
    },
    {
      id: "q16",
      question: "The job should be stopped if:",
      choices: [
        "the stock moves, the bit breaks, unusual sounds occur, or the toolpath looks wrong",
        "the part is almost done",
        "the teacher walks by",
        "the computer screen dims"
      ]
    },
    {
      id: "q17",
      question: "Before reaching into the CNC area, the student must:",
      choices: [
        "wait for the spindle and all motion to fully stop",
        "slow the spindle by hand",
        "hold the stock while cutting",
        "remove chips during motion"
      ]
    },
    {
      id: "q18",
      question: "Chips and dust should be cleared:",
      choices: [
        "with approved brushes or vacuum methods after motion stops",
        "with fingers near the bit",
        "by blowing hard into the machine",
        "while the spindle is moving"
      ]
    },
    {
      id: "q19",
      question: "The hands-on portion of the CNC certification proves the student can:",
      choices: [
        "safely set up, review, monitor, stop, and clean up a supervised CNC workflow",
        "memorize every CNC brand",
        "run unapproved toolpaths",
        "skip workholding"
      ]
    },
    {
      id: "q20",
      question: "The CNC badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student loads any file",
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
    const form = document.querySelector("[data-cnc-practice]");
    const button = document.querySelector("[data-check-cnc-practice]");
    const resultBox = document.querySelector("[data-cnc-practice-result]");
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
    const form = document.querySelector("[data-cnc-final]");
    const button = document.querySelector("[data-submit-cnc-final]");
    const resultBox = document.querySelector("[data-cnc-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=cnc-final.html";
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
          certId: "cnc",
          certName: "CNC Mill",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="cnc.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="cnc-study.html">Review Study Guide</a>`}
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
