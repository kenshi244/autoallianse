let registrationContainer = document.querySelector(".registration");
let firstNextButton = document.querySelectorAll(".registration-button__next-step")[0];
let secondNextButton = document.querySelectorAll(".registration-button__next-step")[1];
let thirdNextButton = document.querySelectorAll(".registration-button__next-step")[2];
let firstPrevButton = document.querySelectorAll(".registration-button__prev-step")[0];
let secondPrevButton = document.querySelectorAll(".registration-button__prev-step")[1];
let thirdPrevButton = document.querySelectorAll(".registration-button__prev-step")[2];
let registrationStep = -1;
let registrationSteps = document.querySelectorAll(".registration-step");

firstNextButton.addEventListener("click", function (e) {

    let registrationSelects = document.querySelector("fieldset#first").querySelectorAll("select");
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
    let registrationInputs = document.querySelector("fieldset#first").querySelectorAll("input[type='text'], input[type='password']");
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
    if (firstCounter === 9) {
        registrationStep++;
        nextStep();
    }
});

secondNextButton.addEventListener("click", function (e) {
    let registrationSecondStepInputs = document.querySelector("fieldset#second").querySelectorAll("input[type='text'], input[type='tel'], input[type='email'], textarea");
    let secondCounter = 0;
    for (let i = 0; i < registrationSecondStepInputs.length; i++) {
        if (registrationSecondStepInputs[i].value.length === 0 && registrationSecondStepInputs[i].disabled === false) {
            registrationSecondStepInputs[i].classList.add("error");
            registrationSecondStepInputs[i].closest("div").querySelector(".registration-input-error").style.display = "block";
            secondCounter++;
        } else {
            registrationSecondStepInputs[i].classList.remove("error");
            registrationSecondStepInputs[i].closest("div").querySelector(".registration-input-error").style.display = "none";
            secondCounter--;
        }
    }
    if (secondCounter === -28) {
        registrationStep++;
        nextStep();
    }
});

thirdNextButton.addEventListener("click", function (e) {
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

thirdPrevButton.addEventListener("click", function (e) {
    registrationStep--;
    prevStep();
});

let fieldsets = document.querySelectorAll("fieldset");

function nextStep() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
    } else if (registrationStep === 2) {
        fieldsets[2].style.display = "none";
        fieldsets[3].style.display = "block";

        registrationSteps[2].classList.remove("active");
        registrationSteps[3].classList.add("active");
    }
}

function prevStep() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
    } else if (registrationStep === 1) {
        fieldsets[3].style.display = "none";
        fieldsets[2].style.display = "block";

        registrationSteps[3].classList.remove("active");
        registrationSteps[2].classList.add("active");
    }
}

let lastStepButton = document.querySelector(".last-step-button");
lastStepButton.addEventListener("click", function (e) {
    let radios = document.querySelectorAll("input[name='yurLico']");
    let selectedRadioOutput = radios[0].selected ? "юридическое лицо (ООО, ОАО, ЗАО)" : "индивидуальный предприниматель (ИП)";

    let checkedCheckboxValue = document.querySelector("#nalogooblajenieCheckbox").checked ? "Является плательщиком НДС" : "Не является плательщиком НДС";
    let inputValues = {
        "username": document.querySelector("#registrationLogin").value,
        "userEmail": document.querySelector("#registrationEmailInput").value,
        "opf": selectedRadioOutput,
        "country": document.querySelector("#country").innerHTML,
        "region": document.querySelector("#registrationRegionSelect").options[document.querySelector("#registrationRegionSelect").selectedIndex].text,
        "okrug": document.querySelector("#registrationOkrug").value,
        "sfera": document.querySelector("#registrationSphereSelect").options[document.querySelector("#registrationSphereSelect").selectedIndex].text,
        "source": document.querySelector("#registrationSourceSelect").options[document.querySelector("#registrationSourceSelect").selectedIndex].text,
        "post": document.querySelector("#postInput").value,
        "surname": document.querySelector("#surnameInput").value,
        "name": document.querySelector("#nameInput").value,
        "patronymic": document.querySelector("#patronymicInput").value,
        "mainTelephone": document.querySelector("#mainTelephone").value,
        "secondaryTelephone": document.querySelector("#secondaryTelephone").value,
        "fax": document.querySelector("#fax").value,
        "officeRoutine": document.querySelector("#officeRoutineInput").value,
        "storageRoutine": document.querySelector("#storageRoutineInput").value,
        "organizationName": document.querySelector("#organizationNameInput").value,
        "inn": document.querySelector("#innInput").value,
        "kpp": document.querySelector("#kppInput").value,
        "ogrn": document.querySelector("#ogrnInput").value,
        "nalogooblajenie": checkedCheckboxValue,
        "yurAdres": document.querySelector("#yurAdresInput").value,
        "faktAdres": document.querySelector("#faktAdresInput").value,
        "rs": document.querySelector("#rsInput").value,
        "bik": document.querySelector("#bikInput").value,
        "kor": document.querySelector("#korInput").value,
        "naimenovanie": document.querySelector("#naimenovanieInput").value,
        "headPosition": document.querySelector("#headPositionSelect").options[document.querySelector("#headPositionSelect").selectedIndex].text,
        "headSurname": document.querySelector("#headSurnameInput").value,
        "headName": document.querySelector("#headNameInput").value,
        "headPatronymic": document.querySelector("#headPatronymicInput").value,
        "kontaktDoljnost": document.querySelector("#kontaktDoljnostInput").value,
        "kontaktSurname": document.querySelector("#kontaktSurnameInput").value,
        "kontaktName": document.querySelector("#kontaktNameInput").value,
        "kontaktPatronymic": document.querySelector("#kontaktPatronymicInput").value,
        "kontaktTelephone": document.querySelector("#kontaktTelephone").value,
        "kontaktEmail": document.querySelector("#kontaktEmail").value,
    };

    let registrationResults = document.querySelectorAll(".registration-result");
    for (let i = 0; i < registrationResults.length; i++) {
        for (const [index, [, value]] of Object.entries(Object.entries(inputValues))) {
            if (+index === i) {
                registrationResults[i].innerHTML = value;
                break;
            }
        }
    }

});

let submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", () => {

});