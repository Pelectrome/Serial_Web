updateMessageCount();

document.getElementById("input").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    send();
  }
});
function send() {
  message = document.getElementById("input").value;
  // Clear input
  document.getElementById("input").value = "";
  newMessageSend(message);
  newMessageReceived("Sohaib", message);
}
function newMessageSend(message) {
  if (message === "") {
    return;
  }
  let currentTime = new Date();
  let formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
  });

  let outputContainer = document.getElementById("output-container");

  // Create elements
  let send_data_container_background = document.createElement("div");
  send_data_container_background.classList.add(
    "send-data-container_background"
  );

  let send_data_container = document.createElement("div");
  send_data_container.classList.add("send-data-container");

  let send_message = document.createElement("div");
  send_message.classList.add("send-message");
  send_message.textContent = message;

  let timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.textContent = formattedTime;

  // Append elements

  send_data_container.appendChild(send_message);
  send_data_container.appendChild(timeDiv);

  send_data_container_background.appendChild(send_data_container);

  outputContainer.appendChild(send_data_container_background);

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

let autoScroll = true;
const enableScrollConst = 100;
function newMessageReceived(name, message) {
  if (message === "") {
    return;
  }
  let currentTime = new Date();
  let formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
  });

  let outputContainer = document.getElementById("output-container");

  // Create elements
  let received_data_container = document.createElement("div");
  received_data_container.classList.add("received-data-container");

  let received_name_message_container = document.createElement("div");
  received_name_message_container.classList.add(
    "received-name-message-container"
  );

  let received_name = document.createElement("div");
  received_name.classList.add("received-name");

  let symbolSpan = document.createElement("span");
  symbolSpan.classList.add("symbol");
  symbolSpan.textContent = ":";

  received_name.textContent = name;

  let received_message = document.createElement("div");
  received_message.classList.add("received-message");
  received_message.textContent = message;

  let timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.textContent = formattedTime;

  // Append elements

  received_name_message_container.appendChild(received_name);
  received_name_message_container.appendChild(symbolSpan);
  received_name_message_container.appendChild(received_message);

  received_data_container.appendChild(received_name_message_container);
  received_data_container.appendChild(timeDiv);

  outputContainer.appendChild(received_data_container);

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

function updateMessageCount() {
  let outputContainer = document.getElementById("output-container");
  let messageCount = outputContainer.children.length; // Get the number of child elements
  let messageCountDiv = document.getElementById("message-count-number");
  messageCountDiv.textContent = messageCount;
}
