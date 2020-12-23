var tab = document.getElementsByClassName("tab");
for (let i = 0; i < tab.length; i++) {
    var current = document.getElementsByClassName("active");
    tab[i].addEventListener('click', function () {
        tab[i].classList.add("active");
        tab[i ^ 1].classList.remove("active");
        // i == 0 ? tab[0].classList.add("active") & tab[1].classList.remove("active") : tab[1].classList.add("active") & tab[0].classList.remove("active");
    });
}