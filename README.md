Gemini Clone App

A modern, AI-inspired chat application built with React and Tailwind CSS, mimicking the interface of Google’s Gemini. This app demonstrates chatroom management, dark mode UI, OTP login simulation, and other key features.

🌐 Live Demo

🔗 https://gemini-clone-app-theta.vercel.app/

🧩 Features
1. Authentication (Partially Implemented)

OTP-based Login/Signup simulation using country codes.

Fetch country data from an external API (e.g., restcountries.com) to show dial codes.

Simulate OTP send and validation using setTimeout.

Form validation using React Hook Form + Zod.
⚠️ Note: Full backend OTP verification is not implemented; currently simulates OTP flow for demo purposes.

2. Dashboard

Lists user’s chatrooms.

Features to create and delete chatrooms.

Toast notifications confirm actions like chat creation and deletion.

3. Chatroom Interface (Partially Implemented)

Chat UI with user and simulated AI messages.

Timestamps for messages.

Typing indicator: "Gemini is typing...".

Fake AI replies after a short delay using setTimeout.

Throttling to simulate AI thinking delay.

Auto-scroll to the latest message.

Support for image preview and copy-to-clipboard in messages is planned.

⚠️ Some advanced features like reverse infinite scroll, client-side pagination, and real image upload are not yet implemented.

4. Global UX Features

Dark Mode toggle for night-friendly UI.

Mobile responsive design.

Shimmer/loading skeleton effect for chat messages.

Toast notifications for key actions (OTP sent, message sent, chatroom deleted).


gemini-clone/
│
├── public/                  # Static assets (images, favicon)
│
├── src/
│   ├── assets/                      # Images, icons, and other static resources
│   ├── components/                  # Reusable components
│   │   ├── Sidbar/                  # sidebar components
│   │   ├── MainPageComponent/       # Dashboard components
│   │   ├── LoginFrom/               # OTP login form components
│   │   ├── OtpInput/                # OTP input component
│   │   └── CountrySelect/           # Custom select components (country codes)
│   │
│   ├── Context/                     # Reusable context
        ├── Context/                 # context for the funcality
│   │   ├── ThemeContext/            # Dark Theme
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components (Login, Dashboard, Chatroom)
│   ├── styles/              # Tailwind CSS and custom styles
│   ├── utils/               # Utility functions (throttle, formatting, etc.)
│   └── main.jsx             # Entry point
│
├── .env.local               # Environment variables (API keys)
├── package.json
├── tailwind.config.js
└── vite.config.js
Explanation:

components/: Contains all reusable UI components. Organized by feature for clarity.

context/: Holds React Context providers for managing global state like chatrooms and auth.

pages/: Each route/page component (e.g., login page, dashboard) lives here.

api/: Functions to fetch data from external APIs.

styles/: Tailwind config and custom CSS if needed.

utils/: Helper functions (e.g., date formatting, throttling).

⚙️ Technologies Used
Frontend: React.js, Vite

Styling: Tailwind CSS

Form Validation: React Hook Form + Zod

State Management: React Context API

Notifications: react-toastify

Deployment: Vercel

🛠️ Installation

Clone the repository:

git clone https://github.com/your-username/gemini-clone.git


Navigate into the project directory:

cd gemini-clone


Install dependencies:

npm install


Start the development server:

npm run dev


Open the app in your browser:

http://localhost:5173

📈 Future Enhancements

Full OTP backend integration.

Infinite scroll and pagination for chat messages.

Voice and image input in chats.

Advanced search and filtering for chatrooms.

User authentication & profile management.

Persistent AI conversation history with real API.