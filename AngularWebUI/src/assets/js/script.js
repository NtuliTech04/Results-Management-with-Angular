//Makes password visible when checkbox is selected
showPassword = function() {
  var x = document.getElementById("passTxt");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

//Regex to validate student form
const numericsRegex = /^[0-9]+$/;
// const fullnameRegex = /^\p{Lu}\p{L}*\s((\p{Lu}\p{L}*)+\s)*\p{Lu}\p{L}*$/gu;
const fullnameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;



//Real Date & Time
function realDateTime() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const now = new Date();
  const timeFormat = now.toLocaleTimeString();
  const dateFormat = now.toLocaleDateString('en-US', options);

  const display = document.getElementById("date-now");
  display.textContent = `${dateFormat} ${timeFormat}`;
}

//Update the display every second
setInterval(realDateTime, 1000);

//Invokes this function for immediate display
realDateTime();


