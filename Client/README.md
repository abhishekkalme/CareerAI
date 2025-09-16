# AI-Powered Career Guidance Platform
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/abhishekkalme/AI-Powered-Career-Guidance-Platform)

The AI-Powered Career Guidance Platform is a comprehensive web application designed to assist users in navigating their professional journey. It leverages AI to provide personalized career recommendations, skill analysis, and learning paths. The platform integrates various modules, including psychometric assessments, real-time job market data, expert mentoring, and an interactive AI chatbot, to offer a holistic career development experience.

## Features

- **5-D Psychometric Assessment**: A detailed evaluation of the user's orientation style, career interests, personality traits, cognitive aptitude, and emotional intelligence.
- **Personalized Career Dashboard**: A central hub displaying career recommendations, top-matched roles, salary expectations, and required skills based on assessment results.
- **Comprehensive Career Reports**: AI-generated reports that provide a deep dive into personality analysis, skill gaps, development plans, and career pathways.
- **Skill Gap Analysis**: Visualizes the difference between a user's current skills and the skills required for their target careers, with prioritized learning suggestions.
- **Career Progression Ladder**: Outlines a step-by-step career roadmap for specific roles, detailing stages from junior to senior levels.
- **Curated Learning Resources**: Recommends personalized courses, tutorials, and certifications from various platforms to bridge identified skill gaps.
- **Expert Mentoring & Guest Lecturers**: A platform to connect with certified career coaches and industry experts for one-on-one mentoring and lectures.
- **Virtual Internships**: Provides simulated work-from-home internship experiences with modules and projects from top companies.
- **Enhanced AI Chatbot**: An interactive AI-powered counselor offering personalized guidance on career paths, skill development, and interview preparation.
- **Real-Time Job Market Data**: Integrates live data on job openings, salary trends, and in-demand skills for specific roles and locations.

## Tech Stack

- **Framework**: React with Vite
- **Language**: TypeScript
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Charting**: Recharts
- **Form Management**: React Hook Form

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18.x or later)
- npm (or a compatible package manager like yarn or pnpm)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/abhishekkalme/ai-powered-career-guidance-platform.git
    cd ai-powered-career-guidance-platform
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## Project Structure

The project follows a standard React application structure:

```
src/
├── assets/         # Static assets like images and icons
├── components/     # Reusable UI components
│   ├── ui/         # Base UI elements from shadcn/ui
│   └── ...
├── context/        # React context providers (e.g., UserDataContext)
├── pages/          # Top-level page components for each route
├── router/         # Application routing setup (AppRouter)
├── services/       # Mock services for API interactions (e.g., jobMarketService)
├── styles/         # Global styles and Tailwind CSS configuration
├── Attributions.md # License and attribution information
└── App.tsx         # Main application component
