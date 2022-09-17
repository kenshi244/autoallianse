let buttons = document.querySelectorAll(".cart-counter__counter span");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
        if(buttons[i].innerHTML === "-") {
            buttons[i].closest(".cart-counter__counter").querySelector("input").value = +buttons[i].closest(".cart-counter__counter").querySelector("input").value - 1; 
        }
        else if (buttons[i].innerHTML === "+") {
            buttons[i].closest(".cart-counter__counter").querySelector("input").value = +buttons[i].closest(".cart-counter__counter").querySelector("input").value + 1;
        }
    });
}