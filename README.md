# Evas Einmaleins Spiel 🦊✨

"Evas Einmaleins Spiel" (Eva's Multiplication Game) is an interactive and fun educational game designed to help children, specifically Eva, learn          
multiplication tables with the help of a friendly mascot, Foxy. The game is built with React, TypeScript, and Vite, and styled with Tailwind CSS. It       
supports multiple languages (German and Russian) and offers various game modes to keep learning engaging.

## Features

- **Multiple Game Modes:**
    - **Practice Mode:** Learn and practice multiplication tables at your own pace.
    - **Quiz Mode:** Test your knowledge under timed conditions with different difficulty levels.
    - **Adventure Mode:** Progress through levels, each with unique challenges and rewards.
    - **Memory Game:** Find matching multiplication problems and answers.
    - **Real-World Math:** Apply multiplication to everyday scenarios.
    - **Fantasy Math:** Solve magical problems using multiplication.
- **Progress Tracking:** Monitors learned tables, total stars collected, and achievements.
- **Achievements System:** Rewards for milestones like collecting stars or mastering tables.
- **Customizable Settings:**
    - Language selection (German/Russian).
    - Difficulty levels (Easy, Medium, Hard).
    - Sound control.
- **Interactive UI:** Engaging visuals and sound effects to enhance the learning experience.
- **Responsive Design:** Optimized for various screen sizes, including iPad.
- **Localization:** User interface and content available in German and Russian.

## Technologies Used

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash                                                                                                                                                
    git clone <repository-url>                                                                                                                             
    cd evas-einmaleins-spiel                                                                                                                               
    ```                                                                                                                                                    

2.  **Install dependencies:**                                                                                                                              
    Using npm:
    ```bash                                                                                                                                                
    npm install                                                                                                                                            
    ```                                                                                                                                                    
    Or using yarn:
    ```bash                                                                                                                                                
    yarn install                                                                                                                                           
    ```                                                                                                                                                    

### Running the Application

To start the development server:

Using npm:
```bash                                                                                                                                                    
npm run dev                                                                                                                                                
```                                                                                                                                                        
Or using yarn:
```bash                                                                                                                                                    
yarn dev                                                                                                                                                   
```                                                                                                                                                        

This will start the Vite development server, typically at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run:

-   `npm run dev` or `yarn dev`: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page
    will reload if you make edits.
-   `npm run build` or `yarn build`: Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the   
    build for the best performance.
-   `npm run lint` or `yarn lint`: Lints the project files using ESLint.
-   `npm run preview` or `yarn preview`: Serves the production build locally to preview it.

## Project Structure

-   `public/`: Contains static assets like images and fonts.
-   `src/`: Contains the main source code.
    -   `components/`: Reusable UI components.
    -   `contexts/`: React Context for global state management (e.g., `GameContext.tsx`).
    -   `assets/`: Static assets imported by components.
    -   `translations.ts`: Contains localization strings for different languages.
    -   `App.tsx`: Main application component.
    -   `main.tsx`: Entry point of the application.
-   `index.html`: The main HTML file.
-   `vite.config.ts`: Vite configuration file.
-   `tailwind.config.js`: Tailwind CSS configuration file.
-   `tsconfig.json` / `tsconfig.node.json`: TypeScript configuration files.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
                                                                                                                                                           
---                                                                                                                                                        

Enjoy helping Eva learn multiplication with Foxy!   