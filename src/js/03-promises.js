
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

  let delay = Number(form[0].value);
  const step = Number(form[1].value);
  const amount = Number(form[2].value);
  form.reset();

  for (let i = 1; i <= amount; i += 1){
     if (i > 1) {
      delay += step;
    }
    createPromise(i, delay)
      .then(({position, delay}) => {
        iziToast.success({
              message: `✅ Fulfilled promise ${position} in ${delay}ms`,
            });
      })
      .catch(({position, delay}) => {
      iziToast.error({
              message: `❌ Rejected promise ${position} in ${delay}ms`,
            });
    })
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
  })
}