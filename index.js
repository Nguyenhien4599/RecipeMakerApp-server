
import express from 'express';   
import OpenAI from "openai";
import 'dotenv/config'


const app = express();
const port = 3000;

app.use(express.json());

  const openai = new OpenAI({ apiKey: process.env.API_KEY });


  async function callOpenAIAPI(text) {
      try {
          const completion = await openai.chat.completions.create({
              model: 'gpt-4o-mini',
              messages: [
                  { role: 'system', content: 'You are a helpful assistant.' },
                  {
                      role: 'user',
                      content: text,
                  },
              ],
          });
         return completion
      } catch (error) {
          console.error('Error:...', error);
      }
}

app.post('/api', async (req, res) => {
  try {
    const openAIResponse = await callOpenAIAPI(req.body.question); 
    res.status(200).json(openAIResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server start !`);
});
