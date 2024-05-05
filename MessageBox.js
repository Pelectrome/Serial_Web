export function MessageBox(messageTile, message) {
  blurBackground();

  const messageBox = document.createElement("div");
  messageBox.id = "messageBox";

  const messageBoxContent = document.createElement("div");
  messageBoxContent.id = "messageBoxContent";
  messageBoxContent.textContent = message;

  const messageBoxBar = document.createElement("div");
  messageBoxBar.id = "messageBoxBar";

  const messageBoxTitle = document.createElement("div");
  messageBoxTitle.id = "messageBoxTitle";
  messageBoxTitle.textContent = messageTile;

  const closeButton = document.createElement("div");
  closeButton.id = "closeButton";
  closeButton.innerHTML = `
  <svg
  id="closeButton"
  xmlns="http://www.w3.org/2000/svg"
  width="25"
  height="25"
  fill="currentColor"
  class="bi bi-x"
  viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>
`;

  messageBoxBar.appendChild(messageBoxTitle);
  messageBoxBar.appendChild(closeButton);
  messageBox.appendChild(messageBoxBar);
  messageBox.appendChild(messageBoxContent);

  document.body.appendChild(messageBox);

  requestAnimationFrame(() => {
    messageBox.style.visibility = "visible";
    messageBox.style.height = "auto";
  });

  closeButton.addEventListener("click", () => {
    messageBox.style.visibility = "hidden";
    messageBox.style.height = "0";
    unBlurBackground();
  });

  messageBox.addEventListener("transitionend", function (event) {
    // Check if the transition property that ended is height
    if (messageBox.clientHeight === 0) {
      // Once the height transition ends, remove the element
      messageBox.remove();
      messageBoxBar.remove();
      messageBoxContent.remove();
      closeButton.remove();
      messageBoxTitle.remove();
    }
  });
}

function blurBackground() {
  const blurBackground = document.createElement("div");
  blurBackground.id = "blurBackground"; // Add an id to the element
  document.body.appendChild(blurBackground);

  blurBackground.addEventListener("click", () => {
    const messageBox = document.getElementById("messageBox");
    messageBox.style.visibility = "hidden";
    messageBox.style.height = "0";
    unBlurBackground();
  });
}
function unBlurBackground() {
  const blurBackground = document.getElementById("blurBackground");
  if (blurBackground) {
    blurBackground.parentNode.removeChild(blurBackground); // Remove the element from its parent
  }
}
