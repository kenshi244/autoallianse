let resultsContainer = document.querySelector(".search__results-container");
let button = document.getElementById("searchDropdownButton");

let isClosed = true;

button.addEventListener("click", function () {
    if(isClosed === true) {
        resultsContainer.classList.add("active");
        isClosed = false;
    }
    else {
        resultsContainer.classList.remove("active");
        isClosed = true;
    }
});