require('dotenv').config();
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

console.log('API Key exists:', !!process.env.GROQ_API_KEY);
console.log('API Key preview:', process.env.GROQ_API_KEY?.slice(0, 10) + '...');

groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [{ role: 'user', content: 'Reply with just this exact text: {"test": true}' }],
}).then(r => {
  console.log('✅ RESPONSE:', r.choices[0].message.content);
}).catch(e => {
  console.error('❌ ERROR:', e.message);
});