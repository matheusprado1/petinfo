import { createUser } from "./api.js";
import { tolTip } from "./toltip.js";

const sendUserData = () => {
  const username = document.querySelector("#registerUser").value;
  const email = document.querySelector("#registerEmail").value;
  const password = document.querySelector("#registerPassword").value;
  const avatar = document.querySelector("#registerAvatar").value;

  return {
    username: `${username}`,
    email: `${email}`,
    password: `${password}`,
    avatar: `${avatar}`,
  }
}

const registerValidator = async () => {
  try {
    const userData = sendUserData();
    const user = await createUser(userData)

    if (user.username) {
      tolTip();
    }

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const registerButton = document.querySelector("#registerButton");

registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  registerValidator();

})

const loginButton = document.querySelector("#loginButton");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "/index.html";
})
