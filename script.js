updateMessageCount();

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
function deleteMessages() {
  let result = window.confirm("Are you sure you want to delete all messages?");
  if (result) {
    // User clicked OK, perform the action
    let outputContainer = document.getElementById("output-container");
    while (outputContainer.firstChild) {
      // Loop while there are still child nodes
      outputContainer.removeChild(outputContainer.firstChild); // Remove the first child node
    }
    updateMessageCount();
  }
}
let autoScroll = true;
const enableScrollConst = 100;
function newMessage(name, message) {
  if (message === "") {
    return;
  }
  let currentTime = new Date();
  let formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
  });

  // Clear input
  document.getElementById("input").value = "";

  let outputContainer = document.getElementById("output-container");

  // Create elements
  let outputDiv = document.createElement("div");
  outputDiv.classList.add("output");

  let sideDiv = document.createElement("div");
  sideDiv.classList.add("side-by-side");

  let nameDiv = document.createElement("div");
  nameDiv.classList.add("name");

  let symbolSpan = document.createElement("span");
  symbolSpan.classList.add("symbol");
  symbolSpan.textContent = ":";

  nameDiv.textContent = name;

  let messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.textContent = message;

  let timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.textContent = formattedTime;

  // Append elements

  sideDiv.appendChild(nameDiv);
  sideDiv.appendChild(symbolSpan);
  sideDiv.appendChild(messageDiv);

  outputDiv.appendChild(sideDiv);
  outputDiv.appendChild(timeDiv);

  outputContainer.appendChild(outputDiv);

  updateMessageCount();

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

function updateMessageCount() {
  let outputContainer = document.getElementById("output-container");
  let messageCount = outputContainer.children.length; // Get the number of child elements
  let messageCountDiv = document.getElementById("message-count-number");
  messageCountDiv.textContent = messageCount;
}
// let a = 0;
// function myFunction() {
//   newMessage("Sohaib", "Hello World : "+a);
//   a++;
// }

// // Call myFunction every 1000 milliseconds (1 second)
// setInterval(myFunction, 1000);
