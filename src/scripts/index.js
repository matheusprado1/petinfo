import { login } from "./api.js";

const sendData = () => {
  const emailValue = document.querySelector("#loginEmail").value;
  const passwordValue = document.querySelector("#loginPassword").value;

  return {
    email: `${emailValue}`,
    password: `${passwordValue}`
  }
}

let isLogged = false;

const loginValidator = async () => {
  try {
    const data = sendData();
    const token = await login(data);

    if (token.token) {
      localStorage.setItem("token", JSON.stringify(token))
      isLogged = true;
      window.location.href = "/src/pages/home.html";
      return isLogged;
    }
    console.log("Credenciais inválidas!");
    return isLogged;
  } catch (error) {
    console.error("An error occurred:", error);
    return isLogged;
  }
}

const loginButton = document.querySelector("#loginButton");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  loginValidator();
})

const registerButton = document.querySelector("#registerButton");

registerButton.addEventListener("click", () => {
  window.location.href = "/src/pages/register.html";
})