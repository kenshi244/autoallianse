let loginInputs = document.querySelectorAll(".password-input");
let eyes = document.querySelectorAll(".eye");

for(let i = 0; i < eyes.length; i++) {
    eyes[i].addEventListener("click", function (e) {
    if (e.target.classList.contains("bi-eye")) {
        loginInputs[i].type = "text";
        eyes[i].classList.remove("bi-eye");
        eyes[i].classList.add("bi-eye-slash");
    } else {
        loginInputs[i].type = "password";
        eyes[i].classList.remove("bi-eye-slash");
        eyes[i].classList.add("bi-eye");
    }
})
}