
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"


iziToast.settings({
  timeout: 5000,
  position: 'topRight',
  icon: "",
  transitionIn: "fadeInRight",
  transitionOut: "fadeOutLeft",
  close: false,
});


const form = document.querySelector(".form");
form[3].addEventListener("click", onClick)

function onClick(evt) {
  evt.preventDefault();

  let delayStart = Number(form[0].value);
  const step = Number(form[1].value);
  const amount = Number(form[2].value);
  const promises = [];

  for (let i = 1; i <= amount; i += 1){
     if (i > 1) {
      delayStart += step;
    }
    promises.push(createPromise(i, delayStart))
  }
  
  Promise.allSettled(promises)
    .then((items) => {
      items.forEach((item) => {
        let delayPromise = item.value ? item.value.delay : item.reason.delay;
        setTimeout(() => {
          if (item.status === "fulfilled") {
            iziToast.success({
              message: `✅ Fulfilled promise ${item.value.position} in ${delayPromise}ms`,
            });
          } else {
            iziToast.error({
              message: `❌ Rejected promise ${item.reason.position} in ${delayPromise}ms`,
            });
          }
        }, delayPromise);
      })
    })
    .catch((err) => {
    console.log(err);
  })
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject({position, delay})
  }
  })
}