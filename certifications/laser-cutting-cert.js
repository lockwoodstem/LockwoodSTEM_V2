(function () {
  const practiceQuestions = [
    {
      id: "p1",
      question: "What is the most important rule while a laser job is running?",
      choices: [
        "Leave and check back later",
        "Stay with the machine and maintain active fire watch",
        "Open the lid to watch more closely",
        "Turn off ventilation to reduce noise"
      ],
      correct: "Stay with the machine and maintain active fire watch",
      feedback: "Laser jobs require active fire watch from start to finish."
    },
    {
      id: "p2",
      question: "What should you do with an unknown plastic or mystery coated material?",
      choices: [
        "Cut it at low power",
        "Engrave it only",
        "Do not laser it until it is identified and approved",
        "Ask another student to try it first"
      ],
      correct: "Do not laser it until it is identified and approved",
      feedback: "Unknown materials can create toxic fumes, fire hazards, or damage the machine."
    },
    {
      id: "p3",
      question: "Why should duplicate vector lines be removed?",
      choices: [
        "They can cause the laser to cut the same path more than once",
        "They make the file name too long",
        "They automatically turn engraving into cutting",
        "They reduce the need for ventilation"
      ],
      correct: "They can cause the laser to cut the same path more than once",
      feedback: "Duplicate lines can overburn material and create unnecessary fire risk."
    },
    {
      id: "p4",
      question: "What should be checked before starting a job?",
      choices: [
        "Material approval, focus/origin, ventilation, job preview, and boundary/frame",
        "Only the color of the file",
        "Only the table number",
        "Only whether the material fits through the door"
      ],
      correct: "Material approval, focus/origin, ventilation, job preview, and boundary/frame",
      feedback: "Laser setup includes material, machine, ventilation, and file checks."
    },
    {
      id: "p5",
      question: "What is the correct response to sustained flame?",
      choices: [
        "Keep cutting because flame means it is working",
        "Pause/stop the job and alert the teacher",
        "Blow into the machine",
        "Walk away until it burns out"
      ],
      correct: "Pause/stop the job and alert the teacher",
      feedback: "Sustained flame requires stopping and teacher support."
    },
    {
      id: "p6",
      question: "Which material rule is safest?",
      choices: [
        "Laser any material that looks thin",
        "Only use teacher-approved materials with known composition",
        "Laser any plastic if it is clear",
        "Use coated mystery materials for testing"
      ],
      correct: "Only use teacher-approved materials with known composition",
      feedback: "Material identity matters for fumes, fire risk, and machine safety."
    },
    {
      id: "p7",
      question: "Why is ventilation required?",
      choices: [
        "It removes smoke/fumes and supports safe laser operation",
        "It makes the laser cut faster automatically",
        "It replaces the need for fire watch",
        "It keeps the computer cool only"
      ],
      correct: "It removes smoke/fumes and supports safe laser operation",
      feedback: "Ventilation is a core safety system, not optional."
    },
    {
      id: "p8",
      question: "When should parts and scrap be removed?",
      choices: [
        "While the laser is still moving",
        "Only when the machine has stopped and it is safe",
        "As soon as the material separates",
        "Before fumes clear"
      ],
      correct: "Only when the machine has stopped and it is safe",
      feedback: "Wait for safe stop and conditions before removing material."
    }
  ];

  const finalQuestions = [
    {
      id: "q1",
      question: "A student may operate the laser cutter only after:",
      choices: [
        "instruction, certification requirements, teacher permission, and supervision expectations are met",
        "watching a short video once",
        "another student says the machine is ready",
        "the file is already designed"
      ]
    },
    {
      id: "q2",
      question: "Active fire watch means:",
      choices: [
        "staying with the laser and watching the job for smoke, flame, material movement, and unsafe behavior",
        "checking the job once after it starts",
        "watching from another room",
        "leaving the lid open"
      ]
    },
    {
      id: "q3",
      question: "Unknown plastics, PVC, vinyl, chlorinated plastics, and mystery coated materials should be:",
      choices: [
        "not lasered unless identified and approved",
        "cut only at low power",
        "engraved but not cut",
        "used for practice tests"
      ]
    },
    {
      id: "q4",
      question: "Ventilation should be:",
      choices: [
        "on and functioning before cutting or engraving",
        "off unless smoke is visible",
        "used only for acrylic",
        "ignored during short jobs"
      ]
    },
    {
      id: "q5",
      question: "If smoke is not clearing normally, the student should:",
      choices: [
        "stop or pause the job and ask for help",
        "increase speed and continue",
        "open the lid while cutting",
        "leave the room"
      ]
    },
    {
      id: "q6",
      question: "A small brief flare-up may occur, but sustained flame requires the student to:",
      choices: [
        "pause/stop the job and alert the teacher",
        "keep cutting until the file finishes",
        "fan the flame by hand",
        "cover the lid"
      ]
    },
    {
      id: "q7",
      question: "Before running a laser job, the student should confirm:",
      choices: [
        "material approval, file scale, operation settings, focus/origin, ventilation, and job boundary",
        "only the design name",
        "only the material color",
        "only that the computer is on"
      ]
    },
    {
      id: "q8",
      question: "Vector paths are generally used for:",
      choices: [
        "cutting or scoring",
        "making the room ventilate",
        "checking student attendance",
        "removing all raster data"
      ]
    },
    {
      id: "q9",
      question: "Raster/image data is generally used for:",
      choices: [
        "engraving",
        "emergency stopping",
        "focusing the laser automatically",
        "material approval"
      ]
    },
    {
      id: "q10",
      question: "Duplicate vector lines should be removed because they can:",
      choices: [
        "cause the same path to cut more than once and overburn material",
        "make the laser run cooler",
        "reduce the need for fire watch",
        "turn plywood into acrylic"
      ]
    },
    {
      id: "q11",
      question: "A frame or boundary check helps confirm:",
      choices: [
        "the job fits on the material and is positioned correctly",
        "the design is graded automatically",
        "the room lights are working",
        "the file has no spelling errors"
      ]
    },
    {
      id: "q12",
      question: "Material should be placed:",
      choices: [
        "flat and secure on the bed so it will not shift during the job",
        "on top of loose scraps",
        "partly outside the bed",
        "wherever there is open space"
      ]
    },
    {
      id: "q13",
      question: "The lid should be opened:",
      choices: [
        "only after motion stops and it is safe to do so",
        "during cutting to remove parts",
        "whenever smoke appears",
        "to speed up the job"
      ]
    },
    {
      id: "q14",
      question: "Air assist can help:",
      choices: [
        "reduce flare-ups and improve cut quality when required",
        "replace ventilation",
        "make unsafe materials safe",
        "remove the need for teacher supervision"
      ]
    },
    {
      id: "q15",
      question: "If the laser follows the wrong path or the material shifts, the student should:",
      choices: [
        "pause/stop the job and ask for help",
        "hold the material with a hand",
        "let it continue",
        "open the lid while the head is moving"
      ]
    },
    {
      id: "q16",
      question: "After a job finishes, the student should check for:",
      choices: [
        "hot edges, smoldering pieces, scrap, and machine/material issues",
        "only whether the part looks cool",
        "only the file name",
        "nothing, because the laser is automatic"
      ]
    },
    {
      id: "q17",
      question: "Cleanup after laser use includes:",
      choices: [
        "removing parts/scrap safely, cleaning the bed, and returning tools/materials",
        "leaving scrap for the next group",
        "turning off safety systems without permission",
        "storing scraps inside the machine"
      ]
    },
    {
      id: "q18",
      question: "If a material produces a strong unusual odor or excessive smoke, the student should:",
      choices: [
        "stop and ask for help",
        "keep running to finish quickly",
        "lower the room lights",
        "add more vector lines"
      ]
    },
    {
      id: "q19",
      question: "The hands-on portion of the laser certification proves the student can:",
      choices: [
        "complete a safe supervised laser workflow from material approval through cleanup",
        "memorize the name of the machine",
        "run a job without watching it",
        "skip material checks"
      ]
    },
    {
      id: "q20",
      question: "The Laser Cutter badge is earned when:",
      choices: [
        "the online test is passed and the teacher marks the hands-on portion complete",
        "the student opens the study guide",
        "the student cuts any material once",
        "the student logs in"
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
    const form = document.querySelector("[data-laser-practice]");
    const button = document.querySelector("[data-check-laser-practice]");
    const resultBox = document.querySelector("[data-laser-practice-result]");
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
    const form = document.querySelector("[data-laser-final]");
    const button = document.querySelector("[data-submit-laser-final]");
    const resultBox = document.querySelector("[data-laser-final-result]");
    if (!form || !button || !resultBox) return;

    renderQuiz(form, finalQuestions, false);

    button.addEventListener("click", async () => {
      const auth = window.LockwoodCertAuth;
      const session = auth && auth.getSession ? auth.getSession() : null;
      if (!session || !session.token) {
        window.location.href = "login.html?next=laser-cutting-final.html";
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
          certId: "laser-cutting",
          certName: "Laser Cutter",
          answers
        });

        const onlinePassed = response.onlinePassed || response.passed;
        resultBox.className = "cert-result-box " + (onlinePassed ? "warning" : "failed");
        resultBox.innerHTML = `
          <h3>${onlinePassed ? "Online test passed" : "Certification not passed yet"}</h3>
          <p><strong>Score:</strong> ${response.percent}% (${response.correct} / ${response.total})</p>
          <p>${onlinePassed ? "Your online test is passed. Your teacher still needs to mark the hands-on portion complete before the badge unlocks." : "Review the study guide and try again when ready."}</p>
          <div class="hero-actions">
            <a class="btn dark" href="laser-cutting.html">Return to Certification Home</a>
            ${onlinePassed ? `<a class="btn secondary" href="account.html">View Account</a>` : `<a class="btn secondary" href="laser-cutting-study.html">Review Study Guide</a>`}
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
