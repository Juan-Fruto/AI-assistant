# Smartphone sales platform with an AI assistant for users

This project has two domains, one for the chatbot and another for the administrator

Technology Summary:
 * Frontend: TS and React (both domains)
 * Backend: JS and Express
 * DB: MongoDB
 *Cloud Services:
  <ul><li>OpenAI</li>
  <li>Cloudninary</li>
  <li>ChatEngine</li></ul>

To run this project you need to have installed:
  * Node JS v18.12.1
  * MongoDB v6.0.2 (if the DB will be local)

Steps for run the project:
  1. git clone https://github.com/Juan-Fruto/AI-assistant.git
  2. cd AI-assistant.git
  3. cd backend
  4. npm install
  5. create a .env file in the current path with the next env variables:
    * PORT=
    * MONGODB_URI_LOCAL=
    * OPENAI_APIKEY= 
    * PROJECT_ID=
    * BOT_USER_NAME=
    * BOT_USER_SECRET=
    * JWT_SECRET=
    * CLOUDINARY_CLOUD_NAME=
    * CLOUDINARY_API_KEY=
    * CLOUDINARY_API_SECRET=
  6. npm run dev
  7. cd ../frontend
  8. npm install
  9. create or edit a .env.local file with the next env variables:
    * VITE_BASE_URL=
    * VITE_PROJECT_ID=
  10. npm run dev

Also you need to manage the inventory and prices of the smatphones with the next admistrator client: https://github.com/Juan-Fruto/Admin-AI-assistant
You have to clone the repository in other folder and run it in a different port, like 'http://domain:5174'
