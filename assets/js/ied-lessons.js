
const IED_UNITS = {
  "0": {
    "title": "Engineering Design Foundations",
    "project": "Aerospace Rescue Challenge",
    "cert": "Engineering Safety Certification",
    "lessons": [
      "Course Launch & Academy Mindset",
      "Engineering Notebook Setup",
      "Safety Contract & PPE",
      "FabLab Orientation",
      "Engineering Design Process",
      "Measurement & Tools",
      "Team Roles & Collaboration",
      "Research & Requirements",
      "Aerospace Rescue Challenge",
      "Safety Certification & Reflection"
    ]
  },
  "1": {
    "title": "Visual Communication & Sketching",
    "project": "Reverse Engineering Challenge",
    "cert": "Technical Sketching Certification",
    "lessons": [
      "Why Engineers Sketch",
      "Line Conventions",
      "Object Lines & Hidden Lines",
      "Centerlines & Symmetry",
      "Isometric Sketching",
      "Isometric Circles & Arcs",
      "Orthographic Projection",
      "Top, Front & Right Side Views",
      "Dimensioning Basics",
      "Aerospace Bracket Sketch",
      "Reverse Engineering",
      "Sketch Critique",
      "Portfolio Drawing",
      "Technical Sketching Practice",
      "Sketching Certification"
    ]
  },
  "2": {
    "title": "Engineering Documentation & Assemblies",
    "project": "Payload Mount Documentation Project",
    "cert": "Engineering Documentation Certification",
    "lessons": [
      "Why Documentation Matters",
      "Tolerances",
      "Adhesives & Fasteners",
      "Assemblies",
      "Documenting an Assembly",
      "Exploded Views",
      "Bill of Materials",
      "Assembly Notes",
      "Inspection Criteria",
      "Engineering Change Requests",
      "Payload Mount Requirements",
      "Team Documentation Sprint",
      "Peer Review",
      "Documentation Revision",
      "Final Documentation Package",
      "Documentation Certification"
    ]
  },
  "3": {
    "title": "Aerospace CAD Modeling",
    "project": "Aerospace Sensor Mount Challenge",
    "cert": "Fusion CAD Level 1",
    "lessons": [
      "Fusion Workspace",
      "Sketch Constraints",
      "Dimensioned Sketches",
      "Extrude & Cut",
      "Fillets & Chamfers",
      "Holes & Patterns",
      "Construction Geometry",
      "Parameters",
      "Aerospace Bracket Model",
      "Sensor Mount Requirements",
      "CAD Design Sprint",
      "Drawing from Model",
      "Model Review",
      "Portfolio Export",
      "Fusion CAD Level 1 Certification"
    ]
  },
  "4": {
    "title": "Technical Drawings & Manufacturing Documentation",
    "project": "Aerospace Manufacturing Package",
    "cert": "Engineering Drawings Certification",
    "lessons": [
      "Drawing Workspace",
      "Base and Projected Views",
      "Section Views",
      "Detail Views",
      "Dimension Placement",
      "Hole Callouts",
      "Notes & Title Blocks",
      "Inspection Dimensions",
      "Manufacturing Constraints",
      "Drawing Standards",
      "Peer Drawing Check",
      "Revision Control",
      "Manufacturing Package Planning",
      "Final Drawing Package",
      "Presentation of Drawings",
      "Engineering Drawings Certification"
    ]
  },
  "5": {
    "title": "Assemblies & Mechanisms",
    "project": "Aerospace Deployment Mechanism",
    "cert": "Fusion CAD Level 2",
    "lessons": [
      "Components & Bodies",
      "Joints",
      "Rigid Groups",
      "Motion Limits",
      "Linkages",
      "Gears & Pivots",
      "Deployment Mechanisms",
      "Assembly Constraints",
      "Interference Checks",
      "Exploded Assemblies",
      "Animation",
      "Mechanism Testing",
      "Design Revision",
      "Assembly Documentation",
      "Team Design Review",
      "CAD Portfolio Export",
      "Mechanism Presentation",
      "Fusion CAD Level 2 Certification"
    ]
  },
  "6": {
    "title": "Prototyping & Testing",
    "project": "Aerospace Prototype Validation Challenge",
    "cert": "3D Printing + Laser Cutter Certifications",
    "lessons": [
      "Prototype Planning",
      "DFM for 3D Printing",
      "Slicing Basics",
      "Print Orientation",
      "Support Strategy",
      "Laser Cutting Safety",
      "Laser File Prep",
      "Material Selection",
      "Testable Requirements",
      "Test Plan Design",
      "Data Collection",
      "Failure Analysis",
      "Redesign Decisions",
      "Prototype Build Sprint",
      "Inspection",
      "Test Day",
      "Data Visualization",
      "Final Redesign",
      "Manufacturing Reflection",
      "Fabrication Certifications"
    ]
  },
  "7": {
    "title": "Aerospace Systems Design Capstone",
    "project": "Aerospace Launch System Capstone",
    "cert": "Portfolio Completion",
    "lessons": [
      "Capstone Launch",
      "Problem Definition",
      "Research & Benchmarking",
      "Requirements",
      "Concept Generation",
      "Decision Matrix",
      "Preliminary Sketches",
      "System Architecture",
      "CAD Sprint 1",
      "CAD Sprint 2",
      "Drawing Package",
      "BOM & Materials",
      "Manufacturing Planning",
      "Prototype Build 1",
      "Prototype Build 2",
      "Testing Plan",
      "Launch Testing",
      "Data Analysis",
      "Failure Review",
      "Redesign Sprint",
      "Final Build",
      "Final Documentation",
      "Presentation Prep",
      "Showcase",
      "Portfolio Reflection"
    ]
  }
};

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderLesson() {
  const unit = getParam("unit") || "0";
  const lesson = parseInt(getParam("lesson") || "1", 10);
  const data = IED_UNITS[unit];
  if (!data || !data.lessons[lesson - 1]) {
    setText("lesson-title", "Lesson not found");
    setText("lesson-summary", "Return to the IED course hub and select a unit lesson.");
    return;
  }

  const lessonTitle = data.lessons[lesson - 1];
  setText("lesson-eyebrow", `IED Unit ${unit} • Lesson ${unit}.${lesson}`);
  setText("lesson-title", lessonTitle);
  setText("lesson-summary", `This lesson connects ${lessonTitle.toLowerCase()} to aerospace engineering practice through student-facing activities, documentation, and portfolio evidence.`);
  setText("lesson-deliverable", "Engineering notebook entry + student deliverable");
  setText("lesson-cert", `Certification connection: ${data.cert}`);
  setText("lesson-target", `I can apply ${lessonTitle.toLowerCase()} to communicate, model, build, document, or test an aerospace engineering solution.`);
  setText("lesson-notebook", `Create a dated engineering notebook entry for Lesson ${unit}.${lesson}. Include the problem, constraints, key vocabulary, sketches or evidence, and a reflection on how the skill supports aerospace engineering work.`);
  setText("lesson-exit", "Submit or show the required notebook evidence and explain one engineering decision you made today.");

  const agenda = [
    "Launch question and aerospace connection",
    "Mini lesson or demonstration",
    "Guided practice using LockwoodSTEM resources",
    "Independent or team deliverable work",
    "Notebook reflection and exit check"
  ];
  const agendaEl = document.getElementById("lesson-agenda");
  if (agendaEl) {
    agendaEl.innerHTML = agenda.map(item => `<li>${item}</li>`).join("");
  }

  const unitHref = `units/unit-${unit}.html`;
  document.getElementById("unit-link").href = unitHref;
  document.getElementById("unit-link-2").href = unitHref;
}

document.addEventListener("DOMContentLoaded", renderLesson);
