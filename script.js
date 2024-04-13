document.getElementById("input").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    message = document.getElementById("input").value;
    newMessage("Sohaib", message);
  }
});
function send() {
  message = document.getElementById("input").value;
  newMessage("Sohaib", message);
}
let autoScroll = true;
const enableScrollConst = 60;
function newMessage(name, message) {
  if (message === "") {
    return;
  }
  var currentTime = new Date();
  var formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
  });

  // Clear input
  document.getElementById("input").value = "";

  var outputContainer = document.getElementById("output-container");

  // Create elements
  var outputDiv = document.createElement("div");
  outputDiv.classList.add("output");

  var sideDiv = document.createElement("div");
  sideDiv.classList.add("side-by-side");

  var nameDiv = document.createElement("div");
  nameDiv.classList.add("name");

  var symbolSpan = document.createElement("span");
  symbolSpan.classList.add("symbol");
  symbolSpan.textContent = ":";

  nameDiv.textContent = name;

  var messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.textContent = message;

  var timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.textContent = formattedTime;

  // Append elements

  sideDiv.appendChild(nameDiv);
  sideDiv.appendChild(symbolSpan);
  sideDiv.appendChild(messageDiv);

  outputDiv.appendChild(sideDiv);
  outputDiv.appendChild(timeDiv);

  outputContainer.appendChild(outputDiv);

  let scrollTopValue =
    outputContainer.scrollHeight - outputContainer.clientHeight;

  if (outputContainer.scrollTop < scrollTopValue - enableScrollConst) {
    autoScroll = false;
  } else {
    autoScroll = true;
  }

  if (autoScroll) {
    // Scroll to bottom
    outputContainer.scrollTop = scrollTopValue;
  }
}

// let a = 0;
// function myFunction() {
//   newMessage("Sohaib", "Hello World : "+a);
//   a++;
// }

// // Call myFunction every 1000 milliseconds (1 second)
// setInterval(myFunction, 1000);
