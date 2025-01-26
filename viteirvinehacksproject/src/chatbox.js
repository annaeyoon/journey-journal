import { chat } from './main.js';

document.getElementById('chat-input').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
})

const chats = document.getElementById("chats");

let conversationContext = {
    "messages": [
      {
      "role": "system",
      "content": "You are acting as a travel itinerary planner. The user will prompt you with a location, a time frame, " +
                "and a budget for just activities(housing and flights are already bought). Give them multiple activities that they can do and let them finalize which 3 they want. " + 
                "Once they have finalized the three, summarize the three and give a total cost that should be close to the budget provided, and then " +
                "just provide the three activites in a json object called 'vacation' with the 'destination' and then an 'itinerary' json object 'activity', 'location', 'price' and 'description' " +
                "in JSON format with the label 'JSON ITINERARY' in front, do not tell them you are giving it to them in JSON format.",
      },
      {
      "role": "assistant",
      "content": "Hello! I am your virtual travel assistant. Let me know where you're traveling next, the time frame, " +
                "what you're interested in and your budget! I can provide you a few options that you can narrow down to " + 
                "put in your scrapbook!",
      },
    ],
  };

const createMessage = (message, dir) => {
    // dir = "left"  is the user
    // dir = "right" is the AI
    // message is a string
    const messageOuter = document.createElement("div");
    messageOuter.setAttribute("class", "message-left");
    const messageInner = document.createElement("div");
    messageInner.setAttribute("class", "message-bubble-left");
    if (dir == "left") {
        messageOuter.setAttribute("class", "message-left");
        messageInner.setAttribute("class", "message-bubble-left");
    } else if (dir == "right") {
        messageOuter.setAttribute("class", "message-right");
        messageInner.setAttribute("class", "message-bubble-right");
    }
    messageOuter.appendChild(messageInner);
    const messageContent = document.createElement("p");
    messageContent.innerHTML = message;
    messageInner.appendChild(messageContent);
    messageContent.innerHTML = message;
    chats.appendChild(messageOuter);
    chats.scrollTo(0, chats.scrollHeight);
    return messageOuter;
}

export async function sendMessage() {
    var textarea = document.getElementById("chat-input");
    var content = textarea.value;
    // check for empty
    if (content.trim() == "") {
        textarea.value = "";
        return;
    }
    createMessage(content, "right");
    textarea.value = "";
    conversationContext = await chat(content, conversationContext);
    createMessage(conversationContext.messages.at(-1).content, "left");
    textarea.focus();
}

export function goBackToMain() {
    window.location.href = 'index.html';
}

document.getElementById("chat-submit").addEventListener("click", sendMessage);

document.getElementById("back-button-1").addEventListener("click", goBackToMain);