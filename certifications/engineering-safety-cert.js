(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "What should you do before using a tool for the first time?",
      choices: [
        "Try it carefully and ask questions afterward",
        "Use it only after instruction, certification, and permission",
        "Ask another student to show you quickly",
        "Watch a video and begin"
      ],
      correct: "Use it only after instruction, certification, and permission",
      feedback: "Tools require instruction, certification, and permission before use."
    },
    {
      id: "p2",
      question: "When are safety glasses required?",
      choices: [
        "Only when the teacher is watching",
        "Only when using the laser cutter",
        "Whenever cutting, drilling, sanding, soldering, or using powered equipment",
        "Only during tests"
      ],
      correct: "Whenever cutting, drilling, sanding, soldering, or using powered equipment",
      feedback: "Eye protection is required during fabrication and powered-tool work."
    },
    {
      id: "p3",
      question: "What is the safest response to a damaged tool?",
      choices: [
        "Use it slowly",
        "Hide it so no one gets blamed",
        "Report it immediately and do not use it",
        "Let the next group decide"
      ],
      correct: "Report it immediately and do not use it",
      feedback: "Damaged tools must be reported and taken out of use."
    },
    {
      id: "p4",
      question: "Why can gloves be dangerous around rotating machinery?",
      choices: [
        "They make your hands too warm",
        "They can catch and pull your hand into the machine",
        "They scratch the material",
        "They reduce cleanup time"
      ],
      correct: "They can catch and pull your hand into the machine",
      feedback: "Gloves can become entangled in rotating equipment."
    },
    {
      id: "p5",
      question: "What should you do if you see smoke, sparks, or hear an unusual sound?",
      choices: [
        "Keep going until the part is finished",
        "Ask your group to watch it",
        "Stop work and alert the teacher immediately",
        "Move to another table"
      ],
      correct: "Stop work and alert the teacher immediately",
      feedback: "Unexpected smoke, sparks, or sounds are immediate stop-and-report issues."
    },
    {
      id: "p6",
      question: "Which behavior is never acceptable in the FabLab?",
      choices: [
        "Using clamps",
        "Cleaning your work area",
        "Horseplay or distracting someone using a tool",
        "Asking for help"
      ],
      correct: "Horseplay or distracting someone using a tool",
      feedback: "Horseplay and distraction create serious safety risks."
    },
    {
      id: "p7",
      question: "Why should walkways and machine areas stay clear?",
      choices: [
        "It makes the room look better only",
        "It reduces trip hazards and keeps emergency access open",
        "It helps students finish faster",
        "It keeps projects secret"
      ],
      correct: "It reduces trip hazards and keeps emergency access open",
      feedback: "Clear areas reduce hazards and improve emergency response."
    },
    {
      id: "p8",
      question: "What should you do if you are unsure whether a material is safe for a tool?",
      choices: [
        "Test a small piece",
        "Use it if it fits",
        "Ask the teacher before using it",
        "Let a classmate try first"
      ],
      correct: "Ask the teacher before using it",
      feedback: "Unknown materials require teacher approval."
    },
    {
      id: "p9",
      question: "When should you remove scraps or parts from a machine?",
      choices: [
        "While it is still moving if you are careful",
        "Only after the machine has fully stopped",
        "As soon as the part looks finished",
        "Whenever your group tells you"
      ],
      correct: "Only after the machine has fully stopped",
      feedback: "Wait for full stop before reaching into a machine area."
    },
    {
      id: "p10",
      question: "What is the purpose of reporting near misses?",
      choices: [
        "To get someone in trouble",
        "To prevent future accidents",
        "To avoid cleanup",
        "To skip certification"
      ],
      correct: "To prevent future accidents",
      feedback: "Near misses reveal hazards before they become injuries."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "Before operating any FabLab tool, a student must first:",
      choices: ["watch someone else use it", "complete instruction/certification and receive permission", "read one poster", "practice without material"]
    },
    {
      id: "q2",
      question: "Safety glasses are required when:",
      choices: ["fabricating, cutting, drilling, sanding, soldering, or using powered equipment", "only using hand tools", "only during demonstrations", "only when using metal"]
    },
    {
      id: "q3",
      question: "The best response to a tool that looks damaged is to:",
      choices: ["use it for a quick job", "report it and do not use it", "place it back in the drawer", "fix it without telling anyone"]
    },
    {
      id: "q4",
      question: "Loose clothing, hoodie strings, long hair, and lanyards are hazards because they can:",
      choices: ["make the room messy", "get caught in moving equipment", "slow down measuring", "block the labels on tools"]
    },
    {
      id: "q5",
      question: "Gloves should be avoided around rotating machinery because they can:",
      choices: ["make parts dirty", "catch and pull a hand toward moving parts", "damage safety glasses", "make the machine louder"]
    },
    {
      id: "q6",
      question: "If you see smoke, sparks, or hear an unusual sound, you should:",
      choices: ["finish the current step", "stop work and alert the teacher immediately", "ask a friend to record it", "move the project to another table"]
    },
    {
      id: "q7",
      question: "Horseplay in the FabLab is:",
      choices: ["allowed if no tools are running", "acceptable during cleanup", "never acceptable", "allowed with hand tools only"]
    },
    {
      id: "q8",
      question: "Unknown or unapproved materials should:",
      choices: ["be tested on the smallest setting", "be used only by experienced students", "not be used until approved by the teacher", "be cut quickly before they heat up"]
    },
    {
      id: "q9",
      question: "A machine area should be cleared of scraps:",
      choices: ["while the tool is still moving", "only after the machine fully stops", "with your fingers during cutting", "whenever someone walks by"]
    },
    {
      id: "q10",
      question: "The main purpose of clamps, fixtures, or workholding is to:",
      choices: ["make the project look professional", "keep materials secure and hands away from danger", "save labels", "avoid measuring"]
    },
    {
      id: "q11",
      question: "If a student is not certified for a tool, they should:",
      choices: ["use it with a certified friend", "use it only at low speed", "not operate it", "operate it if the teacher is busy"]
    },
    {
      id: "q12",
      question: "Fire exits, walkways, and emergency equipment must stay clear because:",
      choices: ["it keeps the room photo-ready", "it allows safe movement and emergency access", "it makes tables easier to decorate", "it prevents students from changing groups"]
    },
    {
      id: "q13",
      question: "Which item should be reported immediately?",
      choices: ["a broken bit, damaged cord, missing guard, or unusual machine behavior", "a finished sketch", "a clean table", "a labeled storage bin"]
    },
    {
      id: "q14",
      question: "Near misses should be reported because they:",
      choices: ["help identify hazards before someone gets hurt", "always result in punishment", "replace cleanup", "count as extra credit"]
    },
    {
      id: "q15",
      question: "When leaving a work area, students should:",
      choices: ["leave scraps for the next class", "return tools, clean the area, and secure materials", "hide unfinished parts", "leave machines on standby"]
    },
    {
      id: "q16",
      question: "Emergency stop controls should be used:",
      choices: ["for immediate safety concerns", "to end class faster", "to pause a print for fun", "when a measurement is wrong"]
    },
    {
      id: "q17",
      question: "A safe student should stop and ask for help when:",
      choices: ["they are unsure about a tool, material, setup, or procedure", "their partner is watching", "the project is almost finished", "the tool looks new"]
    },
    {
      id: "q18",
      question: "Hot parts, sharp edges, and freshly cut materials should be:",
      choices: ["handled carefully and allowed to cool or be deburred when needed", "passed quickly to another student", "placed directly in a backpack", "ignored if small"]
    },
    {
      id: "q19",
      question: "Good FabLab safety protects:",
      choices: ["only the person using the tool", "the student, classmates, equipment, and workspace", "only the project grade", "only expensive tools"]
    },
    {
      id: "q20",
      question: "The safest mindset is to:",
      choices: ["work fast so the tool is on for less time", "pause when unsure, communicate concerns, and follow the approved process", "copy what another group does", "avoid asking questions"]
    }
  ];

  function renderQuiz(form, questions, includeFeedback) {
    if (!form) return;
    form.innerHTML = questions.map((q, index) => `
      <fieldset class="cert-question" data-question-id="${q.id}">
        <legend>${index + 1}. ${escapeHtml(q.question)}</legend>
        ${q.choices.map((choice, cIndex) => `
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
    const form = document.querySelector("[data-safety-practice]");
    const button = document.querySelector("[data-check-practice]");
    const resultBox = document.querySelector("[data-practice-result]");
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
    const form = document.querySelector("[data-safety-final]");
    const button = document.querySelector("[data-submit-final]");
    const resultBox = document.querySelector("[data-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=engineering-safety-final.html";
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
          certId: "engineering-safety",
          certName: "Engineering Safety",
          answers
        });

        const passed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (passed ? "passed" : "failed");
        resultBox.innerHTML = `
          <h3>${passed ? (response.badgeEarned ? "Badge earned" : "Online test passed") : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${passed ? (response.badgeEarned ? "Your Engineering Safety badge has been earned." : "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks.") : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="engineering-safety.html">Return to Certification Home</a>
            ${passed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="engineering-safety-study.html">Review Study Guide</a>`}
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
