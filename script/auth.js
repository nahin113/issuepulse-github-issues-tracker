const btn = document.querySelector("#sign-in-btn");
const userNameInp = document.querySelector("#username-inp");
const passwordInp = document.querySelector("#password-inp");

btn.addEventListener("click", () => {
  let username = userNameInp.value;
  let password = passwordInp.value;

  if (username === "admin" && password === "admin123") {
    window.location.assign("./home.html");
  } else {
    alert("Incorrect Username or Password");
    return;
  }
});
