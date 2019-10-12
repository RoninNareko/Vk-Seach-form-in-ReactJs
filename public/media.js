//Подключение media
let style_script = document.querySelector('link');

function changeMegia(x) {
    if (x.matches) {
        style_script.href = "/css/media.css";
    } else {
        style_script.href = "/css/form.css";
    }
}

let x = window.matchMedia("(max-width: 600px)");
changeMegia(x)
x.addListener(changeMegia)
//