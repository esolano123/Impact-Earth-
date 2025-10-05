# Impact-Earth-

This project fetches asteroid data from NASA's NEO API and displays it on a frontend.
Below are instructions for setting up and running the app on Windows and Mac.


1. Open Terminal / Command Prompt

Windows: Open Command Prompt or PowerShell
Mac: Open Terminal

Navigate to your project folder:
cd path/to/AtroidTrackingSimApp



2. Install Dependencies
   
Using pnpm:
pnpm install

Using npm:
npm install



3. Set Up Environment Variables

The app requires a NASA API key stored in a .env.local file.

Windows:
Command Prompt:
type NUL > .env.local

Then open .env.local in a text editor and add:
NASA_API_KEY=YOUR_NASA_API_KEY_HERE


Mac:
Command Prompt:
touch .env.local

Then open .env.local in a text editor and add:
NASA_API_KEY=YOUR_NASA_API_KEY_HERE

Important: Do not hardcode the key in your code — always use process.env.NASA_API_KEY.



4. Run the Development Server

Using pnpm:
pnpm dev

Using npm:
npm run dev

By default, your app will be available at:
http://localhost:3000



5. Access the App

Open your web browser and go to:
http://localhost:3000
Your frontend should now fetch asteroid data from your Next.js API routes without CORS issues.



