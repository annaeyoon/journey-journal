import Groq from 'groq-sdk';

// Create a new instance of the Groq class
const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
  
// Function to get chat completion
export async function chat(input, conversationContext) {
    if (input.toLowerCase() === "exit") {
      console.log('Goodbye!');
      return conversationContext; // Exit the function
    }
    conversationContext.messages.push({
      "role": "user",
      "content": input,
    });
    try {
      const chatCompletion = await groq.chat.completions.create({
      // Define the request parameter
      "messages": conversationContext.messages,
      "model": 'llama-3.3-70b-versatile',
      "temperature": 1,
      "max_completion_tokens": 1024,
      });
      const assistantMessage = chatCompletion.choices[0]?.message.content || 'No response from assistant.';
      console.log(`Assistant: ${assistantMessage}`);
      conversationContext.messages.push({
        "role": "assistant",
        "content": assistantMessage,
      });

      for (var message of conversationContext.messages) {
        if (message.role === "assistant") {
          if (message.content.includes("JSON ITINERARY")) {
            const jsonString = message.content.split("JSON ITINERARY")[1].trim();
            message.content = message.content.split("JSON ITINERARY")[0].trim();
            
            try {
              // Parse the extracted JSON
              const itinerary = JSON.parse(jsonString);
              console.log("Extracted Itinerary:", itinerary);
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        }
      }

      return conversationContext;

    } catch (error) {
      console.error("Error fetching: ", error);
    }
  }
