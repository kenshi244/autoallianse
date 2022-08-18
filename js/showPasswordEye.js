let loginInput = document.getElementById("passwordInput");
let eye = document.getElementById("eye");
eye.addEventListener("click", function (e) {
    if (e.target.classList.contains("bi-eye")) {
        loginInput.type = "text";
        eye.classList.remove("bi-eye");
        eye.classList.add("bi-eye-slash");
    } else {
        loginInput.type = "password";
        eye.classList.remove("bi-eye-slash");
        eye.classList.add("bi-eye");
    }
})