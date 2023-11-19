
const elements = {
    "btnStart" : document.querySelector("[data-start]"),
    "btnStop": document.querySelector("[data-stop]"),
    "body": document.querySelector("body"),
}
let intervalId;

btnDisabled(elements.btnStop, elements.btnStart)

elements.btnStart.addEventListener("click", handlerStar)
elements.btnStop.addEventListener("click", handlerStop)


function handlerStop() {
    btnDisabled(elements.btnStop, elements.btnStart);
    clearInterval(intervalId);
}


function handlerStar() {
    btnDisabled(elements.btnStart, elements.btnStop);
    let color;

    const timerId = setInterval(() => {
        color = getRandomHexColor();
        console.log(color);
        elements.body.style.backgroundColor = color;
    }, 1000)
    
    intervalId = timerId;
}



function btnDisabled(btnDis, btnAct) {
    btnDis.disabled = true;
    btnAct.disabled = false;
}


function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}