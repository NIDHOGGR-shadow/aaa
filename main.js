import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyD1PA3tgN39qjwrUbib1jDOBvvyoV31NzQ";
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

let messages = {
    history: [],
}

async function sendMessage() {

    console.log(messages);
    const userMessage = document.querySelector(".chat-window input").value;
    if (userMessage.length) {
        document.querySelector(".chat-window input").value ="";
        document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
            <div class="user">
                <p>${userMessage}</p>
            </div>
            
        `)

const chat = model.startChat(messages);
let result = await chat.sendMessage(userMessage);

document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
    <div class="model">
        <p>${result.response.text()}</p>
    </div>
    
`)

messages.history.push(
    {
        role: "user",
        parts: [{ text: userMessage}],
      }
);
messages.history.push(
    {
        role: "model",
        parts: [{ text: result.response.text() }],
      }
);

    }
    


}


document.querySelector(".chat-window .input-area button")
.addEventListener("click", ()=> sendMessage());
