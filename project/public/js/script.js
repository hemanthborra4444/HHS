
const formOpenBtn = document.querySelector("#form-open"),
  loginBtnn=document.querySelector("#loginnbtn"),
  slid = document.querySelector(".slid"),
  slidd=document.querySelector(".slidd"),
  sliddd = document.querySelector(".sliddd"),
  formContainer = document.querySelector(".profession-form_container"),
  customerFormContainer= document.querySelector(".customer-form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  formCloseBtn2 = document.querySelector(".form_closee"),
  formCloseBtn3 = document.querySelector(".form_closeee"),
  signupBtn = document.querySelector("#signup"),
  signBtn=document.querySelector("#cus-signup"),
  loginBtn = document.querySelector("#login"),
  logBtn = document.querySelector("#cus-login"),
  pwShowHide = document.querySelectorAll(".pw_hide");
  formOpenBtn.addEventListener("click", () => sliddd.classList.remove("showw"));
formOpenBtn.addEventListener("click", () => slid.classList.add("show"));
formCloseBtn2.addEventListener("click", () => slidd.classList.remove("show"));
formCloseBtn.addEventListener("click", () => slid.classList.remove("show"));
formCloseBtn3.addEventListener("click", () => sliddd.classList.remove("showw"));
loginBtnn.addEventListener("click", () => customerFormContainer.classList.remove("active"));
loginBtnn.addEventListener("click", () => slid.classList.remove("show"));
loginBtnn.addEventListener("click", () => slidd.classList.remove("show"));
loginBtnn.addEventListener("click", () => sliddd.classList.add("showw"));
signBtn.addEventListener("click", (e) => {
  e.preventDefault();
  customerFormContainer.classList.add("active");
});
logBtn.addEventListener("click", (e) => {
  e.preventDefault();
  customerFormContainer.classList.remove("active");
});
pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  slidd.classList.add("show");
  slid.classList.remove("show");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  slid.classList.add("show");
  slidd.classList.remove("show");
});
reg1.addEventListener("click", (e) => {
  e.preventDefault();
  slidd.classList.add("show");
  slid.classList.remove("show");
});
log1.addEventListener("click", (e) => {
  e.preventDefault();
  slid.classList.add("show");
  slidd.classList.remove("show");
});



const formWrapper = document.querySelector(".formbold-form-wrapper");
const formActionButton = document.querySelector(".formbold-action-btn");
function chatboxToogleHandler() {
  formWrapper.classList.toggle("active");
  formActionButton.classList.toggle("active");
}
