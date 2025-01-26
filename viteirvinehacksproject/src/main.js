import Groq from 'groq-sdk';

// Create a new instance of the Groq class
const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
  
// function jsonItinerary(json) {
//   const db = mysql.createConnection({
//       host: 'database-irvine.cn2ymqgeihdj.us-east-1.rds.amazonaws.com',
//       user: 'admin',        // your MySQL username
//       password: 'adminpw!', // your MySQL password
//       database: 'irvinedb'        // your database name
//   });

//   db.connect(err => {
//       if (err) {
//       console.log('Error connecting to the database:', err);
//       return;
//       }
//       console.log('Connected to the MySQL database');
//   });

//   const query = 'INSERT INTO users_itinerary (user_id, itinerary) VALUES (?, ?)';
//   const userId = sessionStorage.getItem('userid');

//   // Execute the query
//   db.query(query, [userId, JSON.stringify(json)], (err, results) => {
//       if (err) {
//           console.error('Error inserting data into the database:', err);
//           return;
//       }
//       console.log('Itinerary saved successfully:', results);
//   });

//   // Close the database connection
//   db.end(err => {
//       if (err) {
//           console.error('Error closing the database connection:', err);
//           return;
//       }
//       console.log('Database connection closed');
//   });
// }
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
            const lastBraceIndex = jsonString.lastIndexOf('}');

            // Extract the string up to the last closing brace
            const trimmedString = jsonString.slice(0, lastBraceIndex + 1);
            const endString = jsonString.slice(lastBraceIndex + 1,);
            console.log(jsonString);
            message.content = message.content.split("JSON ITINERARY")[0].trim() + endString;
            
            try {
              // Parse the extracted JSON
              const itineraryData = JSON.parse(trimmedString);
              itineraryData.itinerary.forEach((item, index) => {
                const messageKey = `storedmessage${index}`;
                const messageValue = `${item.activity} (${item.price}): ${item.description}`;
                sessionStorage.setItem(messageKey, messageValue);
              });
              //sessionStorage.setItem('itinerary', JSON.stringify(itinerary));
              // jsonIt.vacation.itinerary.forEach(item => {
              //   console.log(item.activity);  // Print the activity name
              // });
              //jsonItinerary(itinerary);
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
