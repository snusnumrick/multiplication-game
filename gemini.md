This is a web-based multiplication game built with React, Vite, and TypeScript. It's designed to be an engaging and educational experience for users learning multiplication.

**Key Features:**

*   **Multiple Game Modes:** The game offers a variety of modes to keep learning fresh and exciting:
    *   **Practice Mode:** Allows users to focus on specific multiplication tables.
    *   **Quiz Mode:** Tests users' knowledge with a series of questions.
    *   **Adventure Mode:** A story-driven mode where users progress through levels by solving multiplication problems.
    *   **Memory Game:** A classic memory game with a multiplication twist.
    *   **Real-World Math:** Presents multiplication problems in the context of real-life scenarios.
    *   **Fantasy Math:** A more imaginative mode with a fantasy theme.
*   **"Foxy" Mascot:** The game features a friendly mascot named Foxy who provides encouragement and guidance.
*   **Text-to-Speech:** Foxy's voice is generated using the ElevenLabs API, providing a more interactive experience.
*   **Internationalization:** The game is available in English, German, and Russian.
*   **Modern Tech Stack:** The project utilizes a modern and efficient tech stack, including:
    *   **React:** For building the user interface.
    *   **Vite:** As the build tool and development server.
    *   **TypeScript:** For type safety and improved code quality.
    *   **Tailwind CSS:** For styling the application.
    *   **Radix UI & shadcn/ui:** For a set of accessible and reusable UI components.

**Project Structure:**

*   `src/components`: Contains the React components for each game mode and UI elements.
*   `src/contexts`: Manages the game's state using React Context.
*   `public/audio`: Stores the audio files for Foxy's voice in different languages.
*   `scripts/generate-foxy-audio.ts`: A script for generating the text-to-speech audio files.
