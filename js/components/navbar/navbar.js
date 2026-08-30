export function navbar () {
    let clickMenu = document.getElementById("menu")
    let navbarDisplay = document.getElementById("navbar")

    clickMenu.addEventListener("click", function() {
        clickMenu.classList.toggle("change");
        if (navbarDisplay.style.display === "block") {
            navbarDisplay.style.display = "none";
        } else {
            navbarDisplay.style.display = "block";
        }
    })
}