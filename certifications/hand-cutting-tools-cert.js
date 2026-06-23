(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "What is the safest cutting direction?",
      choices: [
        "Toward your body for control",
        "Away from your body, hands, and classmates",
        "Toward your non-cutting hand",
        "Any direction if the cut is short"
      ],
      correct: "Away from your body, hands, and classmates",
      feedback: "Cutting away from yourself and others reduces injury risk."
    },
    {
      id: "p2",
      question: "What should you do before cutting material?",
      choices: [
        "Measure, mark, support, and secure the material",
        "Guess the line and cut quickly",
        "Hold the part loosely by hand",
        "Start with the sharpest tool nearby"
      ],
      correct: "Measure, mark, support, and secure the material",
      feedback: "Accurate and safe cutting begins with setup."
    },
    {
      id: "p3",
      question: "Why should you use light repeated passes with a utility knife?",
      choices: [
        "It is safer and gives better control than forcing one deep cut",
        "It makes the blade dull instantly",
        "It removes the need for a cutting mat",
        "It lets you cut toward your hand"
      ],
      correct: "It is safer and gives better control than forcing one deep cut",
      feedback: "Forcing a blade increases slip risk and reduces control."
    },
    {
      id: "p4",
      question: "How should sharp tools be passed to another person?",
      choices: [
        "Handle-first, closed or protected when possible",
        "Blade-first to save time",
        "Thrown gently",
        "Left hanging off the table"
      ],
      correct: "Handle-first, closed or protected when possible",
      feedback: "Passing handle-first protects both people."
    },
    {
      id: "p5",
      question: "What should you do with a dull, chipped, loose, or broken blade?",
      choices: [
        "Use more force",
        "Report it and do not use it",
        "Hide it in the drawer",
        "Use it only on cardboard"
      ],
      correct: "Report it and do not use it",
      feedback: "Damaged blades are unsafe and should be reported."
    },
    {
      id: "p6",
      question: "Why are clamps and vises useful?",
      choices: [
        "They secure material and keep hands away from the cutting path",
        "They replace measurement",
        "They make all tools safe automatically",
        "They are only for decoration"
      ],
      correct: "They secure material and keep hands away from the cutting path",
      feedback: "Workholding improves control and keeps hands out of danger."
    },
    {
      id: "p7",
      question: "What should you do after filing, sanding, or deburring?",
      choices: [
        "Check edges and clean up dust/chips using approved methods",
        "Blow dust into the air",
        "Leave sharp scraps on the table",
        "Put dusty tools anywhere"
      ],
      correct: "Check edges and clean up dust/chips using approved methods",
      feedback: "Finishing and cleanup are part of safe tool use."
    },
    {
      id: "p8",
      question: "What is the safest response when a tool is being used for the wrong material?",
      choices: [
        "Stop and choose an approved tool or ask for help",
        "Push harder",
        "Use two tools at the same time",
        "Let the tool break"
      ],
      correct: "Stop and choose an approved tool or ask for help",
      feedback: "Wrong tool/material combinations cause damage and injuries."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "A student should use hand and cutting tools only after:",
      choices: [
        "instruction and teacher permission",
        "watching a friend use them",
        "finding them on a table",
        "finishing another certification"
      ]
    },
    {
      id: "q2",
      question: "Before cutting, the student should:",
      choices: [
        "measure, mark, support, and secure the material",
        "cut first and measure later",
        "hold the material loosely",
        "choose the largest tool"
      ]
    },
    {
      id: "q3",
      question: "The correct cutting direction is:",
      choices: [
        "away from the body, hands, and classmates",
        "toward the body",
        "toward the non-cutting hand",
        "wherever the tool slips easiest"
      ]
    },
    {
      id: "q4",
      question: "The non-cutting hand should be:",
      choices: [
        "behind or away from the blade path",
        "directly in front of the blade",
        "used as a cutting guide",
        "holding the blade"
      ]
    },
    {
      id: "q5",
      question: "A utility knife should usually be used with:",
      choices: [
        "light repeated passes instead of one forced deep cut",
        "one hard push",
        "a loose blade",
        "a twisting motion"
      ]
    },
    {
      id: "q6",
      question: "When a blade is not actively being used, it should be:",
      choices: [
        "retracted, covered, or stored safely",
        "left open on the table",
        "placed in a pocket with the blade exposed",
        "handed blade-first"
      ]
    },
    {
      id: "q7",
      question: "Dull, chipped, loose, or broken blades should be:",
      choices: [
        "reported and not used",
        "used with more pressure",
        "hidden in the drawer",
        "reserved for thicker material"
      ]
    },
    {
      id: "q8",
      question: "Clamps, vises, fixtures, or approved workholding are used to:",
      choices: [
        "secure material and keep hands out of the tool path",
        "avoid measuring",
        "make tools sharper",
        "replace PPE"
      ]
    },
    {
      id: "q9",
      question: "Small or flexible materials should not be held in a way that:",
      choices: [
        "puts fingers in the blade path",
        "keeps the cut line visible",
        "supports the material",
        "uses approved workholding"
      ]
    },
    {
      id: "q10",
      question: "A cutting mat, scrap backing, or protected surface may be used to:",
      choices: [
        "protect the table and support the cut",
        "make damaged blades safe",
        "replace safety glasses",
        "hide scraps"
      ]
    },
    {
      id: "q11",
      question: "Scissors, shears, snips, and cutters should be used:",
      choices: [
        "only on approved materials and thicknesses",
        "on any material if enough force is used",
        "with fingers in the closing path",
        "as prying tools"
      ]
    },
    {
      id: "q12",
      question: "Sharp tools should be carried or passed:",
      choices: [
        "closed or point-down, and passed handle-first",
        "blade-first",
        "open and swinging",
        "by tossing them"
      ]
    },
    {
      id: "q13",
      question: "When filing, sanding, or deburring, the workpiece should be:",
      choices: [
        "secured when needed and handled with controlled strokes",
        "balanced on the edge of the table",
        "held near sharp edges without looking",
        "covered with loose paper"
      ]
    },
    {
      id: "q14",
      question: "Sharp edges on finished parts should be:",
      choices: [
        "deburred, sanded, or handled carefully when appropriate",
        "ignored",
        "handed immediately to another student",
        "made sharper"
      ]
    },
    {
      id: "q15",
      question: "Dust, chips, and scraps should be cleaned by:",
      choices: [
        "approved cleanup methods, not by blowing them into the air",
        "blowing hard across the table",
        "sweeping them onto the floor",
        "leaving them for the next class"
      ]
    },
    {
      id: "q16",
      question: "A tool should not be used if it:",
      choices: [
        "feels dull, damaged, loose, or unsafe",
        "is stored correctly",
        "matches the material",
        "has a handle"
      ]
    },
    {
      id: "q17",
      question: "The safest action when the tool, material, or setup feels wrong is to:",
      choices: [
        "stop and ask for help",
        "force the tool through",
        "keep cutting quickly",
        "switch to a sharper tool without permission"
      ]
    },
    {
      id: "q18",
      question: "Cleanup after hand and cutting tool use includes:",
      choices: [
        "returning tools, disposing of scrap correctly, and leaving the station ready",
        "leaving tools out",
        "putting sharp scraps in project bins",
        "hiding broken tools"
      ]
    },
    {
      id: "q19",
      question: "The hands-on portion of the certification proves the student can:",
      choices: [
        "safely measure, support, cut, finish, and clean up under teacher observation",
        "memorize every tool name",
        "use blades without permission",
        "skip PPE"
      ]
    },
    {
      id: "q20",
      question: "The Hand & Cutting Tools badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student cuts one piece of material",
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
    const form = document.querySelector("[data-hand-practice]");
    const button = document.querySelector("[data-check-hand-practice]");
    const resultBox = document.querySelector("[data-hand-practice-result]");
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
    const form = document.querySelector("[data-hand-final]");
    const button = document.querySelector("[data-submit-hand-final]");
    const resultBox = document.querySelector("[data-hand-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=hand-cutting-tools-final.html";
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
          certId: "hand-cutting-tools",
          certName: "Hand & Cutting Tools",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="hand-cutting-tools.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="hand-cutting-tools-study.html">Review Study Guide</a>`}
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
