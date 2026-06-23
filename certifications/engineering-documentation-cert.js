(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "What is the main purpose of engineering documentation?",
      choices: [
        "To record what was designed, tested, changed, and learned",
        "To make the notebook look full",
        "To avoid testing",
        "To replace teamwork"
      ],
      correct: "To record what was designed, tested, changed, and learned",
      feedback: "Documentation is an evidence record of design process and decisions."
    },
    {
      id: "p2",
      question: "Which item belongs in a strong notebook entry?",
      choices: [
        "Date, title, purpose, evidence, and notes",
        "Only a final answer",
        "Only a picture with no label",
        "Only a team name"
      ],
      correct: "Date, title, purpose, evidence, and notes",
      feedback: "Notebook entries should be understandable later."
    },
    {
      id: "p3",
      question: "What should a design decision record explain?",
      choices: [
        "Why a choice was made using criteria, constraints, or evidence",
        "Only who liked the idea",
        "Only the final color",
        "Nothing if the team agrees"
      ],
      correct: "Why a choice was made using criteria, constraints, or evidence",
      feedback: "Good rationale connects decisions to requirements and evidence."
    },
    {
      id: "p4",
      question: "Why should units be included in data tables?",
      choices: [
        "Measurements are unclear without units",
        "Units make the table decorative",
        "Units are only for math class",
        "Units replace the data"
      ],
      correct: "Measurements are unclear without units",
      feedback: "Measured values need units to be meaningful."
    },
    {
      id: "p5",
      question: "What should be done with failed tests or unexpected results?",
      choices: [
        "Record them honestly and explain what was learned",
        "Hide them",
        "Delete the evidence",
        "Only mention successful tests"
      ],
      correct: "Record them honestly and explain what was learned",
      feedback: "Failures are valuable design evidence."
    },
    {
      id: "p6",
      question: "Which file name is most useful?",
      choices: [
        "Glider_WingBracket_v03_2026-02-14",
        "final",
        "new new final final",
        "thing"
      ],
      correct: "Glider_WingBracket_v03_2026-02-14",
      feedback: "Descriptive names with version/date context are easier to manage."
    },
    {
      id: "p7",
      question: "What should a revision note include?",
      choices: [
        "What changed and why it changed",
        "Only the word revised",
        "Only the student initials",
        "Only the final grade"
      ],
      correct: "What changed and why it changed",
      feedback: "Revision notes should show the reason for the change."
    },
    {
      id: "p8",
      question: "What should final documentation connect?",
      choices: [
        "Problem, constraints, design process, testing, revisions, and final outcome",
        "Only a photo of the final product",
        "Only the materials list",
        "Only the presentation title"
      ],
      correct: "Problem, constraints, design process, testing, revisions, and final outcome",
      feedback: "Final documentation should tell the full evidence-based design story."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "Engineering documentation records:",
      choices: [
        "what was designed, tested, changed, and learned",
        "only the final grade",
        "only who was absent",
        "only decoration for a notebook"
      ]
    },
    {
      id: "q2",
      question: "Good documentation helps a team:",
      choices: [
        "communicate, defend decisions, repeat tests, and improve designs",
        "avoid explaining choices",
        "hide failures",
        "skip prototypes"
      ]
    },
    {
      id: "q3",
      question: "A strong engineering notebook entry should include:",
      choices: [
        "date, title, project/task, and purpose",
        "only a sketch",
        "only the student's name",
        "only a final answer"
      ]
    },
    {
      id: "q4",
      question: "Sketches, tables, calculations, and photos in a notebook should be:",
      choices: [
        "labeled clearly",
        "left unexplained",
        "used only as decoration",
        "removed after grading"
      ]
    },
    {
      id: "q5",
      question: "Mistakes or failed ideas should generally be:",
      choices: [
        "kept with notes explaining changes and lessons learned",
        "erased or hidden",
        "deleted from the record",
        "ignored in final reflection"
      ]
    },
    {
      id: "q6",
      question: "A design decision record should explain:",
      choices: [
        "why a decision was made using constraints, criteria, evidence, or test results",
        "only which idea looked coolest",
        "only who voted for it",
        "nothing if the team agrees"
      ]
    },
    {
      id: "q7",
      question: "A decision matrix should include:",
      choices: [
        "criteria, weights when used, scores, and a short interpretation",
        "only one final score",
        "only color choices",
        "only a team signature"
      ]
    },
    {
      id: "q8",
      question: "When documenting testing, students should record:",
      choices: [
        "what was tested, how it was tested, and what variables were controlled or changed",
        "only the best trial",
        "only the final result with no setup",
        "only opinions"
      ]
    },
    {
      id: "q9",
      question: "Measured values should include:",
      choices: [
        "units",
        "emojis",
        "only labels",
        "file names only"
      ]
    },
    {
      id: "q10",
      question: "Unexpected test results should be:",
      choices: [
        "recorded honestly and interpreted",
        "hidden from the notebook",
        "changed to match expectations",
        "ignored"
      ]
    },
    {
      id: "q11",
      question: "Photos and screenshots should:",
      choices: [
        "show useful evidence and include labels or captions",
        "be unlabeled",
        "only show the final product",
        "replace all written notes"
      ]
    },
    {
      id: "q12",
      question: "A useful image caption explains:",
      choices: [
        "what the image shows and why it matters",
        "only the camera type",
        "only the date",
        "nothing"
      ]
    },
    {
      id: "q13",
      question: "Revision notes should track:",
      choices: [
        "what changed, when it changed, and why it changed",
        "only the final version",
        "only the student's favorite part",
        "only the material color"
      ]
    },
    {
      id: "q14",
      question: "Keeping old versions can be useful when they:",
      choices: [
        "provide comparison or evidence",
        "make the folder confusing",
        "replace the final version",
        "hide the design path"
      ]
    },
    {
      id: "q15",
      question: "A strong file name is:",
      choices: [
        "descriptive and includes project, part, version, or date when helpful",
        "finalfinal2",
        "thing",
        "untitled"
      ]
    },
    {
      id: "q16",
      question: "Related CAD files, images, data sheets, and presentations should be:",
      choices: [
        "organized by project",
        "scattered anywhere",
        "stored only on one student's device with no access",
        "renamed randomly"
      ]
    },
    {
      id: "q17",
      question: "Final documentation should connect:",
      choices: [
        "problem, constraints, design process, testing, revisions, and final outcome",
        "only the final photo",
        "only the title slide",
        "only a list of names"
      ]
    },
    {
      id: "q18",
      question: "Claims in documentation should be supported by:",
      choices: [
        "evidence from sketches, tests, calculations, or observations",
        "opinions only",
        "nothing if the claim sounds good",
        "the longest paragraph"
      ]
    },
    {
      id: "q19",
      question: "Presentation slides should:",
      choices: [
        "summarize the design story, not replace the full notebook record",
        "replace all documentation",
        "avoid evidence",
        "only show animations"
      ]
    },
    {
      id: "q20",
      question: "The Engineering Documentation badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student creates any file",
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
    const form = document.querySelector("[data-documentation-practice]");
    const button = document.querySelector("[data-check-documentation-practice]");
    const resultBox = document.querySelector("[data-documentation-practice-result]");
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
    const form = document.querySelector("[data-documentation-final]");
    const button = document.querySelector("[data-submit-documentation-final]");
    const resultBox = document.querySelector("[data-documentation-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=engineering-documentation-final.html";
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
          certId: "engineering-documentation",
          certName: "Engineering Documentation",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="engineering-documentation.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="engineering-documentation-study.html">Review Study Guide</a>`}
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
