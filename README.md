# AURA Console UI

Welcome to the AURA Console UI, a futuristic and immersive user interface prototype for a high-end gaming console. This project showcases a modern, cinematic, and highly interactive experience built with Next.js, Tailwind CSS, and powered by Google's AI for dynamic, personalized content.

## ✨ Core Features

-   **Home Dock**: A central hub with quick links, a featured games carousel using a "Glass Showcase" effect, and parallax backgrounds.
-   **Game Library**: Browse your collection with large cover art, smart sorting tabs, and hover effects that reveal ambient video backgrounds.
-   **Game Store**: Discover new titles through a rotating 3D glass carousel, watch trailers on hover, and explore cinematic bundle pages.
-   **AI Curator Mode**: Leveraging Genkit, the store features an "AI Curator Weekly" section that generates personalized game recommendations and unique, discounted bundles based on your preferences.
-   **Friends & Social**: Connect with friends, see their presence (Online, In-Game), view recent squads, and start chats through a sleek sidebar.
-   **In-Game Overlay (Concept)**: A minimalist HUD and a radial menu for quick actions like inviting friends, streaming, and accessing settings.
-   **Rich Personalization**: Customize your profile, pin your favorite games, and choose from multiple themes that alter the UI's entire color scheme, from glowing accents to loading animations.

## 🛠️ Tech Stack

This project is built with a modern, performant, and scalable tech stack:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **UI Library**: [React](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **AI & Generative Features**: [Genkit (Google's Generative AI Toolkit)](https://firebase.google.com/docs/genkit)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation & Running

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    The application uses Next.js with Turbopack for lightning-fast development.
    ```bash
    npm run dev
    ```

3.  **Start the Genkit development service:**
    To enable the AI features, you'll need to run the Genkit service in a separate terminal.
    ```bash
    npm run genkit:dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

-   `src/app/`: Contains all the pages and routes for the application.
-   `src/components/`: Shared React components.
    -   `src/components/aura/`: Custom components specific to the AURA UI theme.
    -   `src/components/ui/`: Base components from ShadCN UI.
-   `src/ai/`: Home for all AI-related logic.
    -   `src/ai/flows/`: Genkit flows that define the AI models, prompts, and logic.
-   `src/lib/`: Utilities, mock data, and other library functions.
-   `src/context/`: React Context providers for managing global state.
-   `public/`: Static assets like images and fonts.

## 🎨 Styling Guidelines

The UI is built around a "glassmorphism" and "neon glow" aesthetic.

-   **Primary Color**: Vibrant Magenta (`#FF00FF`)
-   **Background Color**: Deep Charcoal (`#1A1A1A`)
-   **Accent Color**: Electric Violet (`#8A2BE2`)
-   **Fonts**: `Space Grotesk` for headlines and `Inter` for body text.

The core theme colors are defined as HSL CSS variables in `src/app/globals.css` and can be customized there. The `ThemeSwitcher` component in the Settings page demonstrates how these can be changed dynamically on the client side.
