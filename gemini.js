// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
// // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// const safeJSON = (text) => {
//   try {
//     const clean = text.replace(/```json|```/g, "").trim();
//     return JSON.parse(clean);
//   } catch {
//     return null;
//   }
// };

// const ask = async (prompt) => {
//   const res = await model.generateContent(prompt);
//   return safeJSON(res.response.text());
// };

// const askWithPDF = async (prompt, base64Data) => {
//   const res = await model.generateContent([
//     prompt,
//     { inlineData: { mimeType: "application/pdf", data: base64Data } },
//   ]);
//   return safeJSON(res.response.text());
// };

// module.exports = { ask, askWithPDF };









// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// const safeJSON = (text) => {
//   try {
//     const clean = text.replace(/```json|```/g, "").trim();
//     return JSON.parse(clean);
//   } catch {
//     return null;
//   }
// };

// const ask = async (prompt) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: prompt,
//   });
//   return safeJSON(response.text);
// };

// const askWithPDF = async (prompt, base64Data) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: [
//       { text: prompt },
//       { inlineData: { mimeType: "application/pdf", data: base64Data } },
//     ],
//   });
//   return safeJSON(response.text);
// };

// module.exports = { ask, askWithPDF };







// const Groq = require("groq-sdk");

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// const safeJSON = (text) => {
//   try {
//     const clean = text.replace(/```json|```/g, "").trim();
//     return JSON.parse(clean);
//   } catch {
//     return null;
//   }
// };

// const ask = async (prompt) => {
//   const response = await groq.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.3,
//   });
//   return safeJSON(response.choices[0].message.content);
// };

// const askWithPDF = async (prompt, base64Data) => {
//   const response = await groq.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     messages: [
//       {
//         role: "user",
//         content: [
//           { type: "text", text: prompt },
//           { type: "image_url", image_url: { url: `data:application/pdf;base64,${base64Data}` } },
//         ],
//       },
//     ],
//     temperature: 0.3,
//   });
//   return safeJSON(response.choices[0].message.content);
// };

// module.exports = { ask, askWithPDF };










const Groq = require("groq-sdk");

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY is not set in environment variables!");
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const safeJSON = (text) => {
  try {
    console.log("📨 Raw AI response:", text?.slice(0, 500));

    const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // Extract JSON object even if there's extra text around it
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("❌ No JSON object found in response");
      return null;
    }

    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("❌ JSON parse error:", err.message);
    console.error("Raw text was:", text);
    return null;
  }
};

const ask = async (prompt) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    return safeJSON(content);
  } catch (err) {
    console.error("❌ Groq ask() error:", err.message);
    throw err;
  }
};

const askWithPDF = async (prompt, base64Data) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: { url: `data:application/pdf;base64,${base64Data}` },
            },
          ],
        },
      ],
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    return safeJSON(content);
  } catch (err) {
    console.error("❌ Groq askWithPDF() error:", err.message);
    throw err;
  }
};

module.exports = { ask, askWithPDF };