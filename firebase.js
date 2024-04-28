// Import the functions you need from the SDKs you need
import { newMessageReceived, newMessageSend } from "./script.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  ref,
  orderByChild,
  limitToLast,
  onValue,
  query,
  orderByKey,
  push,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDrqvVsc0zJlKA1vr-CWFFHuAmo7SondM",
  authDomain: "web-js-message.firebaseapp.com",
  databaseURL: "https://web-js-message-default-rtdb.firebaseio.com",
  projectId: "web-js-message",
  storageBucket: "web-js-message.appspot.com",
  messagingSenderId: "612670991207",
  appId: "1:612670991207:web:bee492de80de6b75b5ddc2",
  measurementId: "G-Q3MV19X8FR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the messages node
const messagesRef = ref(database, "messages");

let firstPageLoaded = false;

//localStorage.clear();
var userID = localStorage.getItem("user");
if (userID === null) {
  function generateUniqueID() {
    // Generate a timestamp (in milliseconds since Jan 1, 1970 midnight UTC)
    var timestamp = new Date().getTime();

    // Construct a unique ID using the timestamp and a random number
    var uniqueID = timestamp;

    return uniqueID;
  }
  localStorage.setItem("user", generateUniqueID());
  console.log("No data"); // Output: 'value'
} else {
  console.log(userID); // Output: 'value'
}
function handleNewData(snapshot) {
  if (snapshot.exists()) {
    var dataArray = Object.values(snapshot.val());
    if (firstPageLoaded == false) {
      dataArray.forEach((element, index, dataArray) => {
        if (userID === element.id) {
          newMessageSend(element.message);
        } else {
          if (index != dataArray.length - 1)
            newMessageReceived(element.user, element.message);
        }
      });
      firstPageLoaded = true;
    }
    let lastMessage = dataArray[dataArray.length - 1];
    if (userID != lastMessage.id) {
      newMessageReceived(lastMessage.user, lastMessage.message);
    }

    console.log("New data received:", dataArray[dataArray.length - 1]);
  }
  // Update your UI or do something with the received data
}
onValue(messagesRef, handleNewData);

export function sendMessage(user, messageText) {
  let currentTime = new Date();
  let formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
  });
  // Push the new message to the database
  push(messagesRef, {
    user: user,
    id: userID,
    message: messageText,
    timestamp: formattedTime, // Example timestamp
  });
}
