// alert("")

document.querySelector("button").addEventListener("click", gradeQuiz);

shufflechoices();
let q2 = document.querySelector("#q2")
// this is to shuffle the options.
function shufflechoices() {
    let q1Choices = ["font-color", "color", "text-color", "color-text"];

    for (let i of q1Choices) {
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;

        labelElement.prepend(radioElement);
        labelElement.prepend(" ");
        // label element is parent and radio is child

        document.querySelector("#q1ChoicesDiv").append(labelElement);
        console.log(labelElement);
    }


}

function gradeQuiz() {
    let q1Selected = document.querySelector("input[name=q1]:checked"); // only for radio
    let q1Answer = "";

    if (q1Selected != null) {
        q1Answer = q1Selected.value;
    }

    let q2Answer = Number(document.querySelector("#q2").value);

    let q3Answer = document.querySelector("#q3").value;

    let q4Answer = document.querySelector("#q4").value;


    let q5Answer = false;
    if (document.querySelector("#q5a").checked && document.querySelector("#q5c").checked) {
        q5Answer = true;
    }

    // console.log(q1Answer, q2Answer, q3Answer, q4Answer, q5Answer);

    set_feedback("q1_feedback", q1Answer === "color", "color");
    set_feedback("q2_feedback", q2Answer === 8, "8");
    set_feedback("q3_feedback", q3Answer === "Mars", "Mars");
    set_feedback("q4_feedback", q4Answer.trim() === "10", "10");

    let dolphin_checked = document.querySelector("#q5c").checked;
    let shark_checked = document.querySelector("#q5a").checked;
    let frog_checked = document.querySelector("#q5b").checked;
    let lizard_checked = document.querySelector("#q5d").checked;

    let q5Correct = dolphin_checked && !shark_checked && !frog_checked && !lizard_checked;
    set_feedback("q5_feedback", q5Correct, "Dolphin");

    let score = 0;

    if (q1Answer === "color") {
        score += 20;
    }

    if (q2Answer === 8) {
        score += 20;
    }

    if (q3Answer === "Mars") {
        score += 20;
    }

    if (q4Answer.trim() === "10") {
        score += 20;
    }

    if (dolphin_checked && !shark_checked && !frog_checked && !lizard_checked) {
        score += 20;
    }

    document.querySelector("#final_score").textContent = "Score: " + score + " / 100";

    // message if score > 80
    let congratsDiv = document.querySelector("#congrats_message");
    if (score > 80) {
        congratsDiv.textContent = "Congratulations! Great job!";
    } else {
        congratsDiv.textContent = "";
    }

    let attempts = localStorage.getItem("quiz_attempts");

    if (attempts == null) {
        attempts = 0;
    }

    // every time the submit button is hits thr attempts increase. 
    attempts = Number(attempts) + 1;

    localStorage.setItem("quiz_attempts", attempts);

    document.querySelector("#attempts_display").textContent = "Total times quiz taken: " + attempts;

}

function set_feedback(id, isCorrect, correctAnswer) {
    let divName = document.querySelector("#" + id);
    let img = document.querySelector("#" + id + "_icon");

    if (isCorrect) {
        divName.textContent = "Correct";
        divName.className = "correct";
        img.src = "img/green.png";
    } else {
        divName.textContent = "Incorrect. Correct answer: " + correctAnswer;
        divName.className = "incorrect";
        img.src = "img/red.png";
    }

}
