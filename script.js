import { sendMessage } from './firebase.js';
import { MessageBox } from './MessageBox.js';

createMessageBox();

var notificationSound = document.getElementById('notificationSound');

function createMessageBox() {
  MessageBox("Information", "👋 | WELCOME to DZ Inventors |👋 Please give us your 📣 feedback about this Website 🌐. ");
}
var setting_button = document.querySelector('.setting-button');
setting_button.addEventListener('click', createMessageBox);


var delete_messages = document.querySelector('.delete-messages');
delete_messages.addEventListener('click', deleteMessages);

updateMessageCount();

document.getElementById("input").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    send();
  }
});
window.send = function() {
  let message = document.getElementById("input").value;
  if(message === "") {
    return;
  }
  // Clear input
  document.getElementById("input").value = "";
  newMessageSend(message);
  sendMessage(message);
}
export function newMessageSend(message) {
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
    "send-data-container-background"
  );

  let send_data_container = document.createElement("div");
  send_data_container.classList.add("send-data-container");

  let send_message = document.createElement("div");
  send_message.classList.add("send-message");
  send_message.textContent = message;

  var urlRegex = /(https?:\/\/[^\s]+)/g;
  // Replace URLs with anchor tags
  send_message.innerHTML = send_message.innerHTML.replace(
    urlRegex,
    function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    }
  );

  let send_time = document.createElement("div");
  send_time.classList.add("send-time");
  send_time.textContent = formattedTime;

  // Append elements

  send_data_container.appendChild(send_message);

  send_data_container_background.appendChild(send_data_container);
  send_data_container_background.appendChild(send_time);

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
export function newMessageReceived(name, message) {
  if (message === "") {
    return;
  }
  notificationSound.play();
  let currentTime = new Date();
  let formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
  });

  let outputContainer = document.getElementById("output-container");

  // Create elements
  let received_data_container_background = document.createElement("div");
  received_data_container_background.classList.add(
    "received-data-container-background"
  );

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

  var urlRegex = /(https?:\/\/[^\s]+)/g;
  // Replace URLs with anchor tags
  received_message.innerHTML = received_message.innerHTML.replace(
    urlRegex,
    function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    }
  );

  let received_time = document.createElement("div");
  received_time.classList.add("received-time");
  received_time.textContent = formattedTime;

  // Append elements

  received_name_message_container.appendChild(received_name);
  received_name_message_container.appendChild(symbolSpan);
  received_name_message_container.appendChild(received_message);

  received_data_container.appendChild(received_name_message_container);

  received_data_container_background.appendChild(received_data_container);
  received_data_container_background.appendChild(received_time);

  outputContainer.appendChild(received_data_container_background);

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

  if (messageCount === 0) {
    let empty_svg = document.getElementById("empty-svg");
    empty_svg.style.display = "block";
  } else {
    let empty_svg = document.getElementById("empty-svg");
    empty_svg.style.display = "none";
  }
}

function close_Window() {
  let windowContainer = document.querySelector(".window-container");
  let blurBackground = document.querySelector(".blur-background");

  windowContainer.classList.remove("show-window-container");
  blurBackground.classList.remove("show-blur-background");
}
function open_Window() {
  let windowContainer = document.querySelector(".window-container");
  let blurBackground = document.querySelector(".blur-background");
  windowContainer.classList.add("show-window-container");
  blurBackground.classList.add("show-blur-background");
}
