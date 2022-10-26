var rangeSlider = document.getElementsByClassName("range-slider");
var fill = document.getElementsByClassName("fill");
var textValue = document.getElementsByClassName("range-value__textbox");
for (let i = 0; i < rangeSlider.length; i++) {
    rangeSlider[i].addEventListener('mousemove', function () {
        fill[i].style.width = this.value / 46.6666666667 + 'px';
        textValue[i].value = '$' + this.value;
    });
}