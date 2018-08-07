var attempt = 3; //Variable to count number of attempts

attempt; //Decrementing by one

document.getElementById("username").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
// return false;
// Below function ExecJuan on click of login button.Below function ExecJack on click of login button.2nction Executes onBrianck of login button.
function validate(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if ( (username == "Juan" && password == "geowhite1")||(username == "Jack" && password == "geowhite2")||(username == "Brian" && password == "geowhite3") ){
  alert ("Login successfully");
  window.location = "selectionpage.html"; // Redirecting to other page.
  return false;
  }
else{
  attempt --;// Decrementing by one.
  alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if(attempt == 0){
  document.getElementById("username").disabled = true;
  document.getElementById("password").disabled = true;
  document.getElementById("submit").disabled = true;
return false;
    }
  }
}
