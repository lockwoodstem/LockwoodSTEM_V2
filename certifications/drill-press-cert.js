(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "Why are gloves unsafe when operating a drill press?",
      choices: [
        "They make the table dirty",
        "They can catch in rotating parts and pull a hand toward the bit",
        "They make holes too large",
        "They slow down cleanup"
      ],
      correct: "They can catch in rotating parts and pull a hand toward the bit",
      feedback: "Gloves can become entangled in rotating equipment."
    },
    {
      id: "p2",
      question: "What must happen to the chuck key before the drill press is turned on?",
      choices: [
        "It must be removed from the chuck",
        "It must stay in place",
        "It should be taped to the workpiece",
        "It should be held by another student"
      ],
      correct: "It must be removed from the chuck",
      feedback: "A chuck key left in the chuck can be thrown from the machine."
    },
    {
      id: "p3",
      question: "How should a small workpiece be held while drilling?",
      choices: [
        "By hand only",
        "With a clamp, vise, or approved fixture",
        "With a pencil",
        "With gloves"
      ],
      correct: "With a clamp, vise, or approved fixture",
      feedback: "Workholding prevents spinning parts and keeps hands away from the bit."
    },
    {
      id: "p4",
      question: "When should chips be cleared?",
      choices: [
        "While the bit is spinning",
        "After the spindle fully stops, using a brush or approved tool",
        "With fingers during drilling",
        "Only at the end of the year"
      ],
      correct: "After the spindle fully stops, using a brush or approved tool",
      feedback: "Never clear chips with fingers or near moving parts."
    },
    {
      id: "p5",
      question: "What should you do if the bit binds or the workpiece shifts?",
      choices: [
        "Hold it tighter by hand",
        "Stop the machine and ask for help",
        "Push harder",
        "Increase speed"
      ],
      correct: "Stop the machine and ask for help",
      feedback: "Binding and shifting are stop-and-check conditions."
    },
    {
      id: "p6",
      question: "What is peck drilling?",
      choices: [
        "Drilling a little, backing out to clear chips, then continuing",
        "Using the largest bit first",
        "Drilling without clamps",
        "Turning the drill press on and off rapidly"
      ],
      correct: "Drilling a little, backing out to clear chips, then continuing",
      feedback: "Peck drilling helps clear chips and reduce heat."
    },
    {
      id: "p7",
      question: "What PPE is required during drill press use?",
      choices: [
        "Safety glasses",
        "Headphones only",
        "Gloves only",
        "No PPE is needed"
      ],
      correct: "Safety glasses",
      feedback: "Eye protection is required around drilling and flying chips."
    },
    {
      id: "p8",
      question: "What should you do before measuring or adjusting the workpiece?",
      choices: [
        "Wait for the spindle and bit to fully stop",
        "Reach around the spinning bit carefully",
        "Ask a partner to hold the power switch",
        "Keep the bit moving slowly"
      ],
      correct: "Wait for the spindle and bit to fully stop",
      feedback: "Adjustments happen only after the machine fully stops."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "A student may operate the drill press only after:",
      choices: [
        "instruction, certification requirements, teacher permission, and supervision expectations are met",
        "watching another student once",
        "the machine is plugged in",
        "finding a drill bit"
      ]
    },
    {
      id: "q2",
      question: "The major hazards of a drill press include:",
      choices: [
        "rotating parts, entanglement, flying chips, and spinning workpieces",
        "paper cuts only",
        "laser fumes",
        "wet paint"
      ]
    },
    {
      id: "q3",
      question: "Safety glasses are required:",
      choices: [
        "whenever drilling or standing near active drilling",
        "only when drilling metal",
        "only during demonstrations",
        "only if the bit is large"
      ]
    },
    {
      id: "q4",
      question: "Long hair, hoodie strings, jewelry, lanyards, and loose clothing should be:",
      choices: [
        "secured before operating the drill press",
        "left alone if the job is short",
        "held by another student",
        "covered with gloves"
      ]
    },
    {
      id: "q5",
      question: "Gloves should not be worn while operating a drill press because they can:",
      choices: [
        "catch in rotating parts and pull a hand toward the bit",
        "make the hole smaller",
        "damage the ruler",
        "make the bit dull instantly"
      ]
    },
    {
      id: "q6",
      question: "The chuck key must be:",
      choices: [
        "removed immediately after tightening and before turning on the machine",
        "left in the chuck while drilling",
        "held against the spinning chuck",
        "stored on the drill table during drilling"
      ]
    },
    {
      id: "q7",
      question: "Before use, the drill bit should be:",
      choices: [
        "correct for the material and hole size, straight, undamaged, and seated properly",
        "the largest bit available",
        "selected only by color",
        "covered in tape"
      ]
    },
    {
      id: "q8",
      question: "A small or narrow workpiece should be:",
      choices: [
        "clamped or held in an approved vise/fixture",
        "held firmly by hand",
        "balanced on scrap",
        "supported by a pencil"
      ]
    },
    {
      id: "q9",
      question: "The purpose of workholding is to:",
      choices: [
        "prevent the workpiece from spinning or shifting and keep hands away from the bit",
        "make the table look cleaner only",
        "make the drill press louder",
        "avoid measuring"
      ]
    },
    {
      id: "q10",
      question: "Scrap backing material may be used to:",
      choices: [
        "reduce tear-out and protect the drill press table",
        "replace the need for clamps",
        "make the bit spin faster",
        "hold the chuck key"
      ]
    },
    {
      id: "q11",
      question: "Speed should be selected based on:",
      choices: [
        "material, bit size, and teacher-approved settings",
        "the student's favorite number",
        "how many people are watching",
        "the color of the clamp"
      ]
    },
    {
      id: "q12",
      question: "Larger bits and harder materials often require:",
      choices: [
        "slower speeds",
        "no clamping",
        "gloves",
        "faster speeds always"
      ]
    },
    {
      id: "q13",
      question: "A correct drilling technique is to:",
      choices: [
        "start the machine, lower the bit with controlled pressure, and avoid forcing the cut",
        "force the bit as hard as possible",
        "start drilling before securing the part",
        "adjust the table while the bit is spinning"
      ]
    },
    {
      id: "q14",
      question: "Peck drilling means:",
      choices: [
        "drill a little, back out to clear chips, then continue",
        "drill without stopping until smoke appears",
        "tap the table with the chuck key",
        "use every bit in sequence"
      ]
    },
    {
      id: "q15",
      question: "Chips should be cleared:",
      choices: [
        "after the spindle fully stops, using a brush or approved tool",
        "with fingers while drilling",
        "by blowing into the bit",
        "with gloves near the spinning bit"
      ]
    },
    {
      id: "q16",
      question: "Before measuring, adjusting, cleaning, or removing the workpiece, the student must:",
      choices: [
        "turn off the machine and wait for the spindle and bit to fully stop",
        "slow the machine by hand",
        "reach carefully around the bit",
        "ask a partner to hold the workpiece"
      ]
    },
    {
      id: "q17",
      question: "Chattering, vibration, smoke, burning smell, or unusual sound usually means:",
      choices: [
        "stop and check the setup or ask for help",
        "push harder",
        "ignore it",
        "remove the clamp"
      ]
    },
    {
      id: "q18",
      question: "If a bit binds, breaks, or the workpiece shifts, the student should:",
      choices: [
        "stop the machine and ask for teacher assistance",
        "hold the part tighter by hand",
        "increase speed",
        "keep drilling"
      ]
    },
    {
      id: "q19",
      question: "Cleanup after drill press use includes:",
      choices: [
        "removing chips safely, returning bits/clamps/tools, and leaving the station ready",
        "leaving chips on the table",
        "leaving the bit in the chuck for the next group",
        "storing scrap on the floor"
      ]
    },
    {
      id: "q20",
      question: "The Drill Press badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student drills one hole without permission",
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
    const form = document.querySelector("[data-drill-practice]");
    const button = document.querySelector("[data-check-drill-practice]");
    const resultBox = document.querySelector("[data-drill-practice-result]");
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
    const form = document.querySelector("[data-drill-final]");
    const button = document.querySelector("[data-submit-drill-final]");
    const resultBox = document.querySelector("[data-drill-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=drill-press-final.html";
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
          certId: "drill-press",
          certName: "Drill Press",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="drill-press.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="drill-press-study.html">Review Study Guide</a>`}
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
