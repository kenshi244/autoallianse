let mainList = ["Привет", "Текст", "Какая-то фигня..."];

let resultsDiv = document.getElementById("resultsDiv");
let resultsContainer = document.querySelector(".search__results-container");
let input = document.getElementById("mainSearch");
let button = document.getElementById("searchDropdownButton");

button.addEventListener("click", function () {
    resultsContainer.classList.add("active");
    resultsDiv.innerHTML = "";
    for (let i = 0; i < mainList.length; i++) {
        resultsDiv.innerHTML += "<li>" + mainList[i] + "</li>";
    }
});

document.addEventListener("click", function (event) {
    if(!button.contains(event.target)) {
        resultsDiv.innerHTML = "";
        resultsContainer.classList.remove("active");
    }
});