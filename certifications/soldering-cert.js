(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "Where should the soldering iron be placed when it is not actively being used?",
      choices: [
        "On the table",
        "In its stand",
        "On top of the project",
        "Held by another student"
      ],
      correct: "In its stand",
      feedback: "The iron belongs in its stand whenever it is not actively being used."
    },
    {
      id: "p2",
      question: "What should you avoid breathing directly?",
      choices: [
        "Solder fumes",
        "Room air",
        "Clean desk air",
        "Pencil dust"
      ],
      correct: "Solder fumes",
      feedback: "Use ventilation/fume extraction and keep your face out of the smoke path."
    },
    {
      id: "p3",
      question: "Which best describes a good solder joint?",
      choices: [
        "Shiny/smooth, properly wetted, and not excessive",
        "Large, dull, and blobbed",
        "Cracked and grainy",
        "Connecting every nearby pad"
      ],
      correct: "Shiny/smooth, properly wetted, and not excessive",
      feedback: "Good joints are smooth, wetted to the surfaces, and use the right amount of solder."
    },
    {
      id: "p4",
      question: "What is a solder bridge?",
      choices: [
        "Accidental solder connecting points that should be separate",
        "A tool stand",
        "A type of wire cutter",
        "A safe way to hold the iron"
      ],
      correct: "Accidental solder connecting points that should be separate",
      feedback: "Solder bridges can create electrical shorts."
    },
    {
      id: "p5",
      question: "What should be heated first when making a joint?",
      choices: [
        "The pad/component lead or wire being joined",
        "Only the solder spool",
        "The plastic insulation",
        "The table"
      ],
      correct: "The pad/component lead or wire being joined",
      feedback: "Heat the joint surfaces, then feed solder into the heated joint."
    },
    {
      id: "p6",
      question: "Why should you avoid heating one pad for too long?",
      choices: [
        "It can damage components or the circuit board",
        "It makes the solder safer",
        "It makes the station clean itself",
        "It prevents fumes"
      ],
      correct: "It can damage components or the circuit board",
      feedback: "Too much heat can lift pads, damage parts, and melt insulation."
    },
    {
      id: "p7",
      question: "What should you do after soldering and cleanup?",
      choices: [
        "Wash your hands",
        "Touch your face",
        "Eat at the station",
        "Leave clipped leads on the table"
      ],
      correct: "Wash your hands",
      feedback: "Wash hands after handling soldering materials and cleanup."
    },
    {
      id: "p8",
      question: "What should you do if the iron cord is loose, damaged, or unsafe?",
      choices: [
        "Report it and do not use the station",
        "Tape it quickly",
        "Ignore it",
        "Wrap it around the hot iron"
      ],
      correct: "Report it and do not use the station",
      feedback: "Unsafe electrical or tool conditions must be reported immediately."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "A student may use soldering equipment only after:",
      choices: [
        "instruction, certification requirements, teacher permission, and supervision expectations are met",
        "watching another student once",
        "finding solder on the table",
        "turning on the station"
      ]
    },
    {
      id: "q2",
      question: "The soldering iron should be treated as hot:",
      choices: [
        "whenever the station is active or recently used",
        "only when it glows red",
        "only during the first minute",
        "only when solder is melting"
      ]
    },
    {
      id: "q3",
      question: "When not actively soldering, the iron should be:",
      choices: [
        "returned to its stand",
        "laid flat on the table",
        "placed on paper",
        "held by a partner"
      ]
    },
    {
      id: "q4",
      question: "Safety glasses are required when soldering because:",
      choices: [
        "hot solder, clipped leads, and small parts can injure eyes",
        "they make solder flow faster",
        "they replace fume extraction",
        "they keep the iron cool"
      ]
    },
    {
      id: "q5",
      question: "Fume extraction or ventilation should be used to:",
      choices: [
        "reduce direct exposure to solder fumes",
        "increase solder temperature",
        "make damaged wires safe",
        "replace hand washing"
      ]
    },
    {
      id: "q6",
      question: "Food and drinks should be:",
      choices: [
        "kept away from soldering stations",
        "placed beside the solder spool",
        "used to cool components",
        "allowed if the project is small"
      ]
    },
    {
      id: "q7",
      question: "A safe station setup includes:",
      choices: [
        "iron stand, fume control, tip cleaner, solder, secured work, and clear workspace",
        "loose paper under the iron",
        "food, drink, and backpacks",
        "an iron lying directly on the table"
      ]
    },
    {
      id: "q8",
      question: "A clean, lightly tinned soldering tip:",
      choices: [
        "transfers heat better",
        "should be filed before every use",
        "does not get hot",
        "replaces the need for solder"
      ]
    },
    {
      id: "q9",
      question: "The tip should be cleaned using:",
      choices: [
        "approved sponge or brass wool methods",
        "a file or sandpaper",
        "bare fingers",
        "paper towels only"
      ]
    },
    {
      id: "q10",
      question: "A correct soldering process is to:",
      choices: [
        "heat the joint surfaces, then feed solder into the heated joint",
        "melt solder on the iron and drip it onto the joint",
        "heat the plastic insulation first",
        "use solder as glue without heat transfer"
      ]
    },
    {
      id: "q11",
      question: "A good solder joint is usually:",
      choices: [
        "shiny/smooth, properly wetted, and not excessive",
        "dull, cracked, and grainy",
        "a large blob hiding the connection",
        "touching every nearby pad"
      ]
    },
    {
      id: "q12",
      question: "A cold joint may appear:",
      choices: [
        "dull, grainy, cracked, balled-up, or poorly bonded",
        "perfectly smooth and wetted",
        "invisible",
        "like a clean component lead"
      ]
    },
    {
      id: "q13",
      question: "A solder bridge is:",
      choices: [
        "accidental solder connecting points that should be separate",
        "a safe way to hold a board",
        "a type of soldering stand",
        "a wire stripping tool"
      ]
    },
    {
      id: "q14",
      question: "Too much solder can:",
      choices: [
        "hide problems or create shorts",
        "always make the joint stronger",
        "replace inspection",
        "cool the iron"
      ]
    },
    {
      id: "q15",
      question: "Too little solder can:",
      choices: [
        "create weak or intermittent electrical connections",
        "make every joint safer",
        "prevent cold joints",
        "remove the need for component leads"
      ]
    },
    {
      id: "q16",
      question: "Clipped leads should be controlled because:",
      choices: [
        "small pieces can fly and injure eyes or create debris",
        "they make the iron colder",
        "they are always reusable",
        "they replace wire stripping"
      ]
    },
    {
      id: "q17",
      question: "Overheating the same pad for too long can:",
      choices: [
        "damage components, insulation, or the circuit board",
        "improve every joint",
        "eliminate fumes",
        "make solder unnecessary"
      ]
    },
    {
      id: "q18",
      question: "Before powering or submitting soldered work, students should:",
      choices: [
        "inspect for bridges, cold joints, loose wires, and clipped leads",
        "assume it is correct",
        "hide the underside",
        "touch the hot joint"
      ]
    },
    {
      id: "q19",
      question: "Shutdown and cleanup includes:",
      choices: [
        "turning off/unplugging as instructed, returning tools, disposing scraps, and washing hands",
        "leaving the iron on",
        "leaving clipped leads on the table",
        "wrapping cords around the hot iron"
      ]
    },
    {
      id: "q20",
      question: "The Soldering badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student melts solder once",
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
    const form = document.querySelector("[data-soldering-practice]");
    const button = document.querySelector("[data-check-soldering-practice]");
    const resultBox = document.querySelector("[data-soldering-practice-result]");
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
    const form = document.querySelector("[data-soldering-final]");
    const button = document.querySelector("[data-submit-soldering-final]");
    const resultBox = document.querySelector("[data-soldering-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=soldering-final.html";
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
          certId: "soldering",
          certName: "Soldering",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="soldering.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="soldering-study.html">Review Study Guide</a>`}
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
