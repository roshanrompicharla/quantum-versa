const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

$("#year").textContent = new Date().getFullYear();

// Mobile navigation
const menuButton = $("#menuButton");
const navigation = $("#navigation");
menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.innerHTML = open ? "✕ <span>Close</span>" : "☰ <span>Menu</span>";
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "☰ <span>Menu</span>";
}));

// Theme toggle; preference is saved locally in this browser.
const themeButton = $("#themeButton");
const savedTheme = localStorage.getItem("qv-theme");
if (savedTheme === "light") document.documentElement.dataset.theme = "light";
themeButton.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  if (next === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  localStorage.setItem("qv-theme", next);
  themeButton.textContent = next === "light" ? "☾" : "☼";
});
themeButton.textContent = document.documentElement.dataset.theme === "light" ? "☾" : "☼";

// Lesson and project detail dialogs
const lessons = {
  qubits: ["CONCEPT 01", "What is a qubit?", "<p>A classical bit is either 0 or 1. A qubit is described by a quantum state that can be a superposition of basis states. When measured in the computational basis, the result is 0 or 1.</p><ul><li>Notation: |0⟩ and |1⟩ are basis states.</li><li>Probabilities come from the state's amplitudes.</li><li>A qubit is not simply a normal bit storing both values at once.</li></ul>"],
  superposition: ["CONCEPT 02", "Superposition", "<p>A quantum state can combine basis states. For a balanced single-qubit superposition, measurement in the computational basis gives 0 or 1 with equal probability.</p><p>Think of the state as a mathematical description used to calculate possible measurement outcomes—not as a hidden classical answer.</p>"],
  gates: ["CONCEPT 03", "Quantum gates", "<p>Quantum gates are operations on quantum states. The Hadamard gate transforms |0⟩ into an equal superposition of |0⟩ and |1⟩. Other gates change phase or rotate states.</p><ul><li>Start with a state.</li><li>Apply one or more gates.</li><li>Measure the result.</li></ul>"],
  measurement: ["CONCEPT 04", "Measurement", "<p>Measurement turns a quantum state into a classical outcome. The possible results and their probabilities depend on the state and the measurement basis.</p><p>Individual results can vary, while many repeated measurements can reveal the probability distribution.</p>"],
  entanglement: ["CONCEPT 05", "Entanglement", "<p>Entanglement is a quantum correlation between parts of a joint state that cannot be represented as independent states for each part.</p><p>It is important in quantum information, but it does not allow faster-than-light messaging.</p>"],
  circuits: ["CONCEPT 06", "Quantum circuits", "<p>A quantum circuit is a sequence of operations on qubits, usually shown as wires and gates. Measurements at the end produce classical data that can be analysed.</p><p>A useful next step is to reproduce a small circuit in a simulator and compare repeated results with its expected distribution.</p>"]
};
const projects = {
  visualizer: ["PROJECT PLAN", "Quantum gate visualizer", "<p><b>Goal:</b> Make a visual explanation of how X, Z, and H gates affect a single-qubit state.</p><ul><li>Draw a circuit wire and selectable gates.</li><li>Show a conceptual state and expected measurement probabilities.</li><li>Add a reset button and example circuits.</li><li>Test each explanation against a trusted quantum computing reference.</li></ul>"],
  quiz: ["PROJECT PLAN", "Quantum quiz platform", "<p><b>Goal:</b> Turn beginner lessons into short, friendly practice sessions.</p><ul><li>Organize questions by topic and difficulty.</li><li>Explain why each answer is correct.</li><li>Track the current session score.</li><li>Add persistent accounts only if you later create a secure backend.</li></ul>"],
  circuit: ["PROJECT PLAN", "First quantum circuit", "<p><b>Goal:</b> Build a small circuit with a real quantum SDK.</p><ul><li>Learn basic Python and set up a virtual environment.</li><li>Install a supported version of Qiskit using its current official instructions.</li><li>Run a simple circuit in a local simulator.</li><li>Record dependencies, output counts, and expected results.</li></ul><p>This website does not currently execute Qiskit code; that integration is a future development task.</p>"]
};
const dialog = $("#infoDialog");
function showDialog(item) {
  $("#dialogEyebrow").textContent = item[0];
  $("#dialogTitle").textContent = item[1];
  $("#dialogBody").innerHTML = item[2];
  dialog.showModal();
}
$$(".lesson-open").forEach(button => button.addEventListener("click", () => showDialog(lessons[button.dataset.lesson])));
$$(".project-plan").forEach(button => button.addEventListener("click", () => showDialog(projects[button.dataset.project])));
$("#closeDialog").addEventListener("click", () => dialog.close());
$("#dialogDone").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

// Simplified teaching model for measurement probabilities, not a full quantum simulator.
const hadamard = $("#hadamard");
let runs = 0, zeroes = 0, ones = 0;
function updateProbability() {
  const balanced = hadamard.checked;
  const p0 = balanced ? 50 : 100, p1 = balanced ? 50 : 0;
  $("#operationName").textContent = balanced ? "H gate" : "No gate";
  $("#zeroBar").style.width = `${p0}%`;
  $("#oneBar").style.width = `${p1}%`;
  $("#zeroPercent").textContent = `${p0}%`;
  $("#onePercent").textContent = `${p1}%`;
  $("#probSummary").textContent = `${p0}% / ${p1}%`;
  $("#outcome").textContent = "?";
  $("#labOutput").textContent = "Ready. Run one measurement or a batch of 100 samples.";
  $("#readyLabel").textContent = "READY";
}
function recordSample() {
  return hadamard.checked ? (Math.random() < 0.5 ? 0 : 1) : 0;
}
function updateCounts() {
  $("#totalRuns").textContent = String(runs).padStart(3, "0");
  $("#zeroCount").textContent = zeroes;
  $("#oneCount").textContent = ones;
  $("#runLabel").textContent = `RUNS: ${String(runs).padStart(3, "0")}`;
}
hadamard.addEventListener("change", updateProbability);
$("#measure").addEventListener("click", () => {
  const result = recordSample();
  runs++;
  if (result === 0) zeroes++; else ones++;
  $("#outcome").textContent = `|${result}⟩`;
  $("#readyLabel").textContent = "MEASURED";
  $("#labOutput").innerHTML = `Measured outcome: <strong>|${result}⟩</strong>. ` +
    (hadamard.checked ? "The simplified model samples a balanced 50/50 distribution." : "Without the operation, this model returns |0⟩.");
  updateCounts();
});
$("#batchMeasure").addEventListener("click", () => {
  let batchZeroes = 0, batchOnes = 0;
  for (let i = 0; i < 100; i++) {
    if (recordSample() === 0) { zeroes++; batchZeroes++; }
    else { ones++; batchOnes++; }
  }
  runs += 100;
  $("#outcome").textContent = "100×";
  $("#readyLabel").textContent = "COMPLETE";
  $("#labOutput").innerHTML = `Batch complete: <strong>${batchZeroes}</strong> outcomes of |0⟩ and <strong>${batchOnes}</strong> outcomes of |1⟩. Random samples vary between runs.`;
  updateCounts();
});
$("#resetLab").addEventListener("click", () => {
  runs = zeroes = ones = 0;
  updateCounts();
  updateProbability();
});
updateCounts(); updateProbability();

// Five-question quiz with feedback and session-only scoring.
const questions = [
  {q:"What is the basic unit of quantum information?", options:["Pixel","Qubit","Byte","Transistor"], answer:1, why:"A qubit is the quantum counterpart of a classical bit."},
  {q:"What does a measurement of a single qubit in the computational basis return?", options:["Always both 0 and 1","A continuous colour","A classical outcome such as 0 or 1","A source-code file"], answer:2, why:"That measurement produces a classical result; probabilities depend on the quantum state."},
  {q:"What does a Hadamard gate do to |0⟩ in the ideal model?", options:["Creates a balanced superposition","Deletes the qubit","Always measures 1","Turns it into a classical byte"], answer:0, why:"The Hadamard gate maps |0⟩ to an equal superposition with 50/50 computational-basis outcomes."},
  {q:"What is a quantum circuit?", options:["A website theme","A sequence of quantum operations and measurements","A battery charger","A type of browser"], answer:1, why:"Quantum circuits represent operations on qubits followed by measurements."},
  {q:"Does entanglement allow messages to travel faster than light?", options:["Yes, always","Only with a website","No","Only on laptops"], answer:2, why:"Entanglement produces distinctive correlations, but it cannot be used for faster-than-light communication."}
];
let questionIndex = 0, selectedAnswer = null, checkedAnswer = false, score = 0;
function renderQuestion() {
  const item = questions[questionIndex];
  $("#questionNumber").textContent = `QUESTION ${questionIndex + 1} / ${questions.length}`;
  $("#quizProgressText").textContent = `${Math.round(questionIndex / questions.length * 100)}% COMPLETE`;
  $("#quizProgress").style.width = `${questionIndex / questions.length * 100}%`;
  $("#quizFeedback").textContent = "";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent = "Check answer / Next →";
  $("#quizContent").innerHTML = `<h3 class="quiz-question">${item.q}</h3><div class="quiz-options">${item.options.map((option, i) => `<button class="quiz-option" data-option="${i}"><span class="option-key">${String.fromCharCode(65+i)}</span><span>${option}</span></button>`).join("")}</div>`;
  $$(".quiz-option").forEach(button => button.addEventListener("click", () => {
    if (checkedAnswer) return;
    selectedAnswer = Number(button.dataset.option);
    $$(".quiz-option").forEach(option => option.classList.toggle("selected", option === button));
    $("#nextQuestion").disabled = false;
    $("#nextQuestion").textContent = "Submit answer →";
  }));
}
function submitAnswer() {
  const item = questions[questionIndex];
  if (!checkedAnswer) {
    if (selectedAnswer === null) return;
    checkedAnswer = true;
    const correct = selectedAnswer === item.answer;
    if (correct) score++;
    $$(".quiz-option").forEach((button, i) => {
      button.disabled = true;
      if (i === item.answer) button.classList.add("correct");
      else if (i === selectedAnswer) button.classList.add("incorrect");
    });
    $("#quizFeedback").innerHTML = `${correct ? "<b>Correct!</b>" : "<b>Not quite.</b>"} ${item.why}`;
    $("#nextQuestion").textContent = questionIndex === questions.length - 1 ? "See results →" : "Next question →";
  } else if (questionIndex < questions.length - 1) {
    questionIndex++; selectedAnswer = null; checkedAnswer = false; renderQuestion();
  } else {
    $("#quizProgress").style.width = "100%";
    $("#quizProgressText").textContent = "100% COMPLETE";
    $("#questionNumber").textContent = "QUIZ COMPLETE";
    $("#quizContent").innerHTML = `<div class="quiz-question">You scored ${score} out of ${questions.length}.</div><p style="color:var(--muted);font-size:12px">Review the concepts above and try again to strengthen your understanding.</p>`;
    $("#quizFeedback").textContent = score === questions.length ? "Excellent work — perfect score!" : "Keep learning. Repetition is part of the process.";
    $("#nextQuestion").disabled = true;
    $("#nextQuestion").textContent = "Completed";
  }
}
$("#nextQuestion").addEventListener("click", submitAnswer);
$("#restartQuiz").addEventListener("click", () => { questionIndex = 0; selectedAnswer = null; checkedAnswer = false; score = 0; renderQuestion(); });
renderQuestion();
