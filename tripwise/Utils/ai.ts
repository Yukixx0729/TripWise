import OpenAI from "openai";
require("dotenv").config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generatePlan = async (
  destination: string,
  arrivalDate: string,
  departDate: string
) => {
  const plan = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Could you please make me a trip plan , the location is ${destination}, and arrive date is ${arrivalDate}, depart date is ${departDate}. And format your response to starting with 'Day 1 ' and please only generate the trip plan without the travel time, no matter what!`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(plan.choices[0].message.content);
  return plan.choices[0].message.content;
};
