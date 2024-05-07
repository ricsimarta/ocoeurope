function createCaptcha() {
  let firstNumber = Math.floor((Math.random() * 10) + 1);
  let secondNumber = Math.floor((Math.random() * 10) + 1);

  if (secondNumber > firstNumber) {
    const temp = firstNumber;
    firstNumber = secondNumber;
    secondNumber = temp;
  }

  const operationNumber = Math.floor((Math.random() * 2) + 1);

  let operation = null;
  let result = null;

  switch (operationNumber) {
    case 1:
      operation = "+";
      result = firstNumber + secondNumber;
      break;
    case 2:
      operation = "-";
      result = firstNumber - secondNumber;
      break;
  }

  return {
    text: `${firstNumber} ${operation} ${secondNumber}`,
    result: result
  }
}

function insertCaptcha() {
  const captchaData = createCaptcha();
  const captchaContainer = document.querySelector(".captcha");
  let error = false;

  captchaContainer.innerHTML = `
    ${captchaData.text} = 
    <input type="text" name="captcha-result" class="result"/> 
    <button class="solve">Küld</button>
    <span class="material-symbols-outlined new">refresh</span>
  `;

  const resultInputElement = document.querySelector("input.result");
  resultInputElement.addEventListener("input", e => {
    if (!e.data?.match(/[0-9]/) || e.target.value.length > 2) e.target.value = e.target.value.slice(0, -1);
  })

  captchaContainer.querySelector("button.solve").addEventListener("click", () => {
    const userResult = document.querySelector("input.result").value;
    if (Number(userResult) === captchaData.result) {
      captchaContainer.remove();
      document.querySelector("p.error")?.remove();

      document.querySelector(".contact-text").innerText = "Mellékhatásbejelentéshez kérjük, vegye fel velünk a kapcsolatot:";

      document.querySelector(".contact").insertAdjacentHTML("beforeend", `
        <p class="contact-data">
          <a href="mailto:radmedpharma@radmedpharma.hu">
            <span class="material-symbols-outlined">mail</span>
            radmedpharma@radmedpharma.hu</a>
        </p>
      `);
    }

    else {
      if (!error) {
        captchaContainer.insertAdjacentHTML("afterend", `<p class="error">Rossz eredmény!</p>`);
        error = true;
      }

      document.querySelector("input.result").value = null;
    }
  })

  captchaContainer.querySelector("span.new").addEventListener("click", () => {
    insertCaptcha();
    error = false;
    document.querySelector("p.error")?.remove();
  });
}

insertCaptcha();