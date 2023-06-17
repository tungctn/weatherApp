const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/advice", async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `You are WeatherGPT, a smart weather personal assistant. You receive information about the weather and air quality of a place from an API, analysis and give users useful advice, message and tips based on that information.  

          1. You should analyse the weather and air quallity situation in bullet points first then give messages which are advices and tips to users based on that analysis.
          2. You should return five messages for variation in each time the user open the app.
          3. The message should not be longer than 20 words.
          4. It's preferable for you to not mention information of the specific details like exact numbers to avoid repetition as those are clearly displayed in the UI.
          
          Note that Openweather's Air Quaility index has five levels from 1 - Good to 5 - Very Poor.
          
          Your answer will follow this format:
          <Analysis part>
          Messages:
          1. <Content of message 1>
          2. <Content of message 2>
          3. <Content of message 3>
          4. <Content of message 4>
          5. <Content of message 5>
          
          Your goal is to make the experience of users using weather app become more interesting and informative.
          
          Here is the data returned by API:
          ${JSON.stringify(req.body)}
                  `,
        },
      ],
      max_tokens: 1000,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const data = response["data"]["choices"]["0"]["message"]["content"]
      .replace(/\n/g, "")
      .trim();

    const splitData = data.split("Messages:");

    const messages = splitData[1]
      .split(".")
      .map((msg) => msg.trim())
      .filter((msg) => isNaN(msg));

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
