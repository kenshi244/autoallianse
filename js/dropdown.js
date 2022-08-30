let resultsContainer = document.querySelector(".search__results-container");
let button = document.getElementById("searchDropdownButton");

let isClosed = true;

document.addEventListener("click", function (e) {
    if (isClosed === true) {
        if(button.contains(e.target)) {
            resultsContainer.classList.add("active");
            isClosed = false;
        }
    } else {
        resultsContainer.classList.remove("active");
        isClosed = true;
    }
});