// const eded = +prompt("eded daxil edin");
// const operator = prompt("+", "-", "/", "*", "!");
// const eded2 = +prompt("2ci ededi daxil edin");
// console.log(eded);
// console.log(operator);
// console.log(eded2);

// let result = 0;
// const hesabla = () => {
//   if (operator == "+") {
//     result = eded + eded2;
//   } else if (operator == "-") {
//     result = eded - eded2;
//   } else if (operator == "/" && eded!==0) {
//     result = eded / eded2;
//   } else {
//     result = eded * eded2;
//   }
//   return result;
// };
// console.log(hesabla());

// const fact = (eded) => {
//   if (eded == 0) return 1;
//   else if (eded > 0) {
//     let result = eded * fact(eded - 1);
//     return result;
//   }
// };
// console.log(fact(eded));

// Səhifədəki bütün button elementlərini bir paket halında tutur
const buttons = document.querySelectorAll("button");
const nums = document.querySelectorAll(".num");
const result = document.getElementById("result");
nums.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (result.innerText === "0") {
      result.innerText = btn.innerText;
    } else {
      result.innerText += btn.innerText;
    }
  });
});
const clear = document.getElementById("clear");
clear.onclick = () => {
  result.innerText = "0";
};
const DEL = document.getElementById("DEL"); // DEL
const equals = document.getElementById("equals"); // =
DEL.onclick = () => {
  // Əgər ekranda tək rəqəm qalıbsa, siləndə "0" olsun
  if (result.innerText.length === 1) {
    result.innerText = "0";
  } else {
    // Sonuncu xarakteri kəsib atır
    result.innerText = result.innerText.slice(0, -1);
  }
};

const operators = document.querySelectorAll(".operator");

operators.forEach((op) => {
  op.addEventListener("click", () => {
    // AC, DEL və = düymələrinin ekrana yazılmasını istəmirik
    if (op.id !== "clear" && op.id !== "DEL" && op.id !== "equals") {
      result.innerText += op.innerText;
    }
  });
});

equals.onclick = () => {
  try {
    let hesablama = eval(result.innerText);

    result.innerText = hesablama;
  } catch (error) {
    result.innerText = "Error";

    setTimeout(() => {
      result.innerText = "0";
    }, 2000);
  }
};
