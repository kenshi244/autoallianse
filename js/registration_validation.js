let registrationContainer = document.querySelector(".registration");
let firstNextButton = document.querySelectorAll(".registration-button__next-step")[0];
let secondNextButton = document.querySelectorAll(".registration-button__next-step")[1];
let firstPrevButton = document.querySelectorAll(".registration-button__prev-step")[0];
let secondPrevButton = document.querySelectorAll(".registration-button__prev-step")[1];
let registrationStep = -1;
let registrationSteps = document.querySelectorAll(".registration-step");

firstNextButton.addEventListener("click", function (e) {

    let registrationSelects = registrationContainer.querySelectorAll("select");
    let registrationEmail = document.querySelector("#registrationEmailInput");
    let firstCounter = 0;

    // Email validation
    let emailRegEx =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!emailRegEx.test(registrationEmail.value)) {
        registrationEmail.classList.add("error");
        document.querySelector("span.registration-email-error").style.display = "inline-block";
        firstCounter--;
    } else {
        registrationEmail.classList.remove("error");
        document.querySelector("span.registration-email-error").style.display = "none";
        firstCounter++;
    }

    // Inputs validation
    let registrationInputs = document.querySelector(".registration").querySelectorAll("input[type='text'], input[type='password']");
    for (let i = 0; i < registrationInputs.length; i++) {
        if (registrationInputs[i].value.length === 0) {
            registrationInputs[i].classList.add("error");
            document.querySelectorAll("span.registration-input-error")[i].style.display =
                "inline-block";
            firstCounter--;
        } else {
            registrationInputs[i].classList.remove("error");
            document.querySelectorAll("span.registration-input-error")[i].style.display =
                "none";
            firstCounter++;
        }
    }

    // Selects validation
    for (let i = 0; i < registrationSelects.length; i++) {
        for (const option of registrationSelects[i].selectedOptions) {
            if (option.value === "") {
                registrationSelects[i].classList.add("error");
                document.querySelectorAll("span.registration-select-error")[i].style.display =
                    "inline-block";
                firstCounter--;
            } else {
                registrationSelects[i].classList.remove("error");
                document.querySelectorAll("span.registration-select-error")[i].style.display =
                    "none";
                firstCounter++;
            }
        }
    }

    if (registrationInputs[3].value !== registrationInputs[2].value) {
        registrationInputs[2].classList.add("error");

        registrationInputs[3].classList.add("error");
        document.querySelectorAll("span.registration-input-error")[3].style
            .display =
            "inline-block";
        firstCounter--;
    } else {
        if (registrationInputs[3].value.length !== 0) {
            registrationInputs[2].classList.remove("error");

            registrationInputs[3].classList.remove("error");
            document.querySelectorAll("span.registration-input-error")[3].style
                .display = "none";
            firstCounter++;
        }
    }
    firstCounter = 9;
    if (firstCounter === 9) {
        registrationStep++;
        nextStep();
    }
});

secondNextButton.addEventListener("click", function (e) {
    registrationStep++;
    nextStep();
});

firstPrevButton.addEventListener("click", function (e) {
    registrationStep--;
    prevStep();
});

secondPrevButton.addEventListener("click", function (e) {
    registrationStep--;
    prevStep();
});

let fieldsets = document.querySelectorAll("fieldset");

function nextStep() {
    if (registrationStep === 0) {
        fieldsets[0].style.display = "none";
        fieldsets[1].style.display = "block";

        registrationSteps[0].classList.remove("active");
        registrationSteps[1].classList.add("active");
    } else if (registrationStep === 1) {
        fieldsets[1].style.display = "none";
        fieldsets[2].style.display = "block";

        registrationSteps[1].classList.remove("active");
        registrationSteps[2].classList.add("active");
    }
}

function prevStep() {
    if (registrationStep === -1) {
        fieldsets[1].style.display = "none";
        fieldsets[0].style.display = "block";

        registrationSteps[1].classList.remove("active");
        registrationSteps[0].classList.add("active");
    } else if (registrationStep === 0) {
        fieldsets[2].style.display = "none";
        fieldsets[1].style.display = "block";

        registrationSteps[2].classList.remove("active");
        registrationSteps[1].classList.add("active");
    }
}