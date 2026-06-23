(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "What is the main purpose of a design review?",
      choices: [
        "To improve a design using evidence, feedback, and next steps",
        "To prove the first idea is perfect",
        "To avoid testing",
        "To replace documentation"
      ],
      correct: "To improve a design using evidence, feedback, and next steps",
      feedback: "A design review is an engineering checkpoint for improving the design."
    },
    {
      id: "p2",
      question: "What should a review connect the design back to?",
      choices: [
        "Problem, users, criteria, and constraints",
        "Only the team name",
        "Only the final color",
        "Only the slide template"
      ],
      correct: "Problem, users, criteria, and constraints",
      feedback: "Design choices should be connected to the problem and requirements."
    },
    {
      id: "p3",
      question: "Which is the strongest support for a design claim?",
      choices: [
        "Evidence from tests, calculations, sketches, CAD, or prototypes",
        "A statement that it looks cool",
        "A longer paragraph with no data",
        "A guess"
      ],
      correct: "Evidence from tests, calculations, sketches, CAD, or prototypes",
      feedback: "Engineering claims should be supported by evidence."
    },
    {
      id: "p4",
      question: "Why should risks and unknowns be discussed?",
      choices: [
        "They help reviewers give useful feedback and help the team plan tests",
        "They make the team look bad",
        "They should always be hidden",
        "They replace action items"
      ],
      correct: "They help reviewers give useful feedback and help the team plan tests",
      feedback: "Honest risk discussion improves the design process."
    },
    {
      id: "p5",
      question: "How should students respond to unclear feedback?",
      choices: [
        "Ask clarifying questions",
        "Ignore it",
        "Argue immediately",
        "Delete the review notes"
      ],
      correct: "Ask clarifying questions",
      feedback: "Clarifying questions help turn feedback into useful action."
    },
    {
      id: "p6",
      question: "What should an action item include?",
      choices: [
        "Task, owner, due date, and reason it matters",
        "Only a vague idea",
        "Only a color choice",
        "Only the project title"
      ],
      correct: "Task, owner, due date, and reason it matters",
      feedback: "Action items should be specific enough to complete and track."
    },
    {
      id: "p7",
      question: "What should happen after a design review?",
      choices: [
        "Documentation should be updated with feedback, decisions, and revisions",
        "All feedback should be forgotten",
        "The team should restart without notes",
        "The review slides should replace the notebook"
      ],
      correct: "Documentation should be updated with feedback, decisions, and revisions",
      feedback: "Review outcomes should become part of the design record."
    },
    {
      id: "p8",
      question: "What makes a visual useful in a design review?",
      choices: [
        "It clearly explains the design, evidence, or problem being discussed",
        "It is tiny and unlabeled",
        "It has as much text as possible",
        "It hides failures"
      ],
      correct: "It clearly explains the design, evidence, or problem being discussed",
      feedback: "Visuals should improve understanding quickly."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "A design review is best described as:",
      choices: [
        "a structured checkpoint used to improve a design before more time or material is committed",
        "a final celebration only",
        "a replacement for testing",
        "a way to avoid feedback"
      ]
    },
    {
      id: "q2",
      question: "The goal of a design review is to expose:",
      choices: [
        "reasoning, evidence, risks, and next steps",
        "only the final color",
        "only the team name",
        "only the grade"
      ]
    },
    {
      id: "q3",
      question: "The design problem should be connected to:",
      choices: [
        "the intended user or mission",
        "only the title slide",
        "only the team logo",
        "nothing once the prototype exists"
      ]
    },
    {
      id: "q4",
      question: "Criteria describe:",
      choices: [
        "what success looks like",
        "only the tools available",
        "only what the team dislikes",
        "random design ideas"
      ]
    },
    {
      id: "q5",
      question: "Constraints are:",
      choices: [
        "limits such as material, time, size, tools, cost, safety, or performance requirements",
        "unimportant decorations",
        "always optional",
        "only student opinions"
      ]
    },
    {
      id: "q6",
      question: "Strong design rationale connects decisions to:",
      choices: [
        "constraints, criteria, data, or observed performance",
        "only team preference",
        "only slide design",
        "only color"
      ]
    },
    {
      id: "q7",
      question: "A design claim should be supported by:",
      choices: [
        "evidence such as sketches, CAD, prototypes, calculations, measurements, or test data",
        "confidence only",
        "a guess",
        "nothing if the claim sounds good"
      ]
    },
    {
      id: "q8",
      question: "A decision matrix can support:",
      choices: [
        "tradeoff discussions when multiple options are compared",
        "hiding design choices",
        "avoiding criteria",
        "deleting evidence"
      ]
    },
    {
      id: "q9",
      question: "Useful review visuals should:",
      choices: [
        "make the design easier to understand quickly",
        "be tiny and unlabeled",
        "replace all discussion",
        "hide test results"
      ]
    },
    {
      id: "q10",
      question: "A risk is something that could:",
      choices: [
        "cause the design to fail, become unsafe, or miss a requirement",
        "only improve the design",
        "replace constraints",
        "be ignored in every review"
      ]
    },
    {
      id: "q11",
      question: "A tradeoff occurs when:",
      choices: [
        "improving one criterion may weaken another",
        "all criteria improve equally",
        "there are no constraints",
        "a team skips testing"
      ]
    },
    {
      id: "q12",
      question: "Unresolved questions should be:",
      choices: [
        "named clearly instead of hidden",
        "deleted",
        "ignored",
        "covered with images"
      ]
    },
    {
      id: "q13",
      question: "Professional response to feedback includes:",
      choices: [
        "listening fully, asking clarifying questions, and recording feedback",
        "arguing before listening",
        "taking critique personally",
        "refusing to document feedback"
      ]
    },
    {
      id: "q14",
      question: "Action items should include:",
      choices: [
        "task, owner, due date, and reason it matters",
        "only a vague phrase",
        "only the word revise",
        "only the review date"
      ]
    },
    {
      id: "q15",
      question: "Action items should be prioritized based on:",
      choices: [
        "safety, feasibility, major risks, and project deadlines",
        "only what is easiest",
        "only what looks best",
        "random order"
      ]
    },
    {
      id: "q16",
      question: "A review without action items is:",
      choices: [
        "only a conversation, not a complete engineering checkpoint",
        "always complete",
        "better than a documented review",
        "a final prototype"
      ]
    },
    {
      id: "q17",
      question: "After the review, documentation should record:",
      choices: [
        "decisions, feedback, action items, and planned revisions",
        "only the final score",
        "only the team name",
        "nothing because the review is over"
      ]
    },
    {
      id: "q18",
      question: "Revision notes should make the design path:",
      choices: [
        "traceable",
        "hidden",
        "unreadable",
        "unrelated to feedback"
      ]
    },
    {
      id: "q19",
      question: "Good design review behavior includes:",
      choices: [
        "separating critique of the design from personal identity",
        "taking every question personally",
        "refusing to revise",
        "hiding weaknesses"
      ]
    },
    {
      id: "q20",
      question: "The Design Review badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student signs in",
        "the student makes any slide deck"
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
    const form = document.querySelector("[data-review-practice]");
    const button = document.querySelector("[data-check-review-practice]");
    const resultBox = document.querySelector("[data-review-practice-result]");
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
    const form = document.querySelector("[data-review-final]");
    const button = document.querySelector("[data-submit-review-final]");
    const resultBox = document.querySelector("[data-review-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=design-review-final.html";
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
          certId: "design-review",
          certName: "Design Review",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="design-review.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="design-review-study.html">Review Study Guide</a>`}
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
