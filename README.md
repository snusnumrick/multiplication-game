# Evas Einmaleins Spiel 🦊✨

"Evas Einmaleins Spiel" (Eva's Multiplication Game) is an interactive and fun educational game designed
to help children, specifically Eva, learn multiplication tables with the help of a friendly mascot, Foxy.
The game is built with React, TypeScript, and Vite, and styled with Tailwind CSS. It supports multiple languages
(German and Russian) and offers various game modes to keep learning engaging.

## Features

### 🎮 **Game Modes**
- **Practice Mode:** Learn and practice multiplication tables at your own pace with intelligent tutoring.
- **Quiz Mode:** Test your knowledge under timed conditions with different difficulty levels.
- **Adventure Mode:** Progress through levels, each with unique challenges and rewards.
- **Memory Game:** Find matching multiplication problems and answers.
- **Real-World Math:** Apply multiplication to everyday scenarios.
- **Fantasy Math:** Solve magical problems using multiplication.

### 🧠 **Smart Explanation System**
Our advanced AI-powered explanation engine provides personalized learning experiences:

#### **Adaptive Strategy Selection**
- **Analyzes user performance** to detect struggling numbers (7, 8, 9 tracking)
- **Escalates help complexity** - starts with patterns, falls back to visual for struggling students
- **Tracks preferred learning styles** and remembers what works for each user
- **Contextual intelligence** that changes strategy based on attempts and user history

#### **Mathematical Strategies**
1. **🔄 Symmetry Intelligence**: `7 × 3 = 3 × 7` - always choose the easier direction
2. **⚡ 9s Magic**: Subtract from 10s, digit sum patterns, finger tricks
3. **🔢 11s Wizardry**: Repeat digits for singles, middle-sum method for doubles
4. **🖐️ 5s Mastery**: Half of 10s method, nickel counting patterns
5. **🔟 10s Power**: Add zeros rule, multiples decomposition
6. **👯 Doubles Strategy**: Pure doubles, half-and-double transformations
7. **🎯 Near Doubles**: `n × (n+1) = n² + n` consecutive number patterns
8. **⭐ Perfect Squares**: Memorized building blocks and shortcuts
9. **🏗️ Building Facts**: Use 2s, 5s, 10s as foundation for harder facts
10. **🎪 Pattern Recognition**: Special relationships (complements to 10, etc.) (partially done)
11. **🧩 Decomposition**: Break large numbers into tens and ones
12. **🎯 Benchmark Numbers**: Use 5, 10, 15, 20, 25 as stepping stones
13. **🧠 Memory Tricks**: "Six ate forty-eight", rhymes, and stories
14. **🚀 Speed Techniques**: Left-to-right calculation (pending), rounding-and-adjusting (pending)

#### **Multi-Modal Learning Approaches**
- **👁️ Visual Arrays**: Dot patterns and rectangle models for visual learners
- **🎵 Skip Counting**: Progressive counting sequences (3, 6, 9, 12...)
- **🔍 Pattern Recognition**: Mathematical relationships and number tricks
- **🌍 Real-World Contexts**: "Like 4 boxes with 7 toys each = 28 toys"
- **🖐️ Kinesthetic Methods**: Finger tricks and physical demonstrations

#### **Intelligent Adaptation Features**
- **Struggle Detection**: Automatically identifies problem numbers and adjusts strategies
- **Strategy Switching**: If visual doesn't work, tries pattern recognition or decomposition
- **Difficulty Scaling**: Level-appropriate explanations from basic to advanced
- **Confidence Building**: Celebrates consecutive correct streaks and progress
- **Memory Reinforcement**: Provides mnemonics and memorable associations

#### **Smart Analytics & Progress Tracking**
- **Learning Style Analysis**: Identifies whether student prefers visual, pattern, or auditory learning
- **Mistake Pattern Recognition**: Detects common error types and provides targeted help
- **Strategy Effectiveness Tracking**: Learns which explanations work best for each user
- **Adaptive Difficulty**: Adjusts problem complexity based on performance trends

### 📊 **Progress & Achievement System**
- **Progress Tracking:** Monitors learned tables, total stars collected, and achievements.
- **Smart Achievement System:** Rewards for strategy mastery, consecutive correct answers, and mathematical insights.
- **Personalized Learning Path:** Adapts difficulty and content based on individual progress.

### ⚙️ **Customizable Settings**
- Language selection (German/Russian with smart explanation translation).
- Difficulty levels (Easy, Medium, Hard) with strategy complexity matching.
- Sound control and visual preference settings.
- Learning style preferences (Visual, Auditory, Kinesthetic, Pattern-based).

### 🎨 **Interactive Experience**
- **Interactive UI:** Engaging visuals and sound effects to enhance the learning experience.
- **Responsive Design:** Optimized for various screen sizes, including iPad.
- **Advanced Foxy Integration:** AI-powered animated mascot with voice synthesis and contextual interactions.
- **Strategy Visualization:** Color-coded explanation types with intuitive icons.

### 🦊 **Advanced Foxy Mascot System**
Our intelligent companion Foxy provides personalized support throughout the learning journey:

#### **Animated Character System**
- **Sprite-based Animations**: Smooth transitions between idle, talking, and happy states
- **Contextual Animation Triggers**: Automatic animation state management based on user interactions
- **Responsive Visual Design**: Optimized for various screen sizes with consistent character presentation

#### **Natural Voice Integration**
- **AI-Generated Speech**: Pre-recorded natural voice lines using Eleven Labs Text-to-Speech
- **Multi-language Support**: German and Russian voice synthesis with native pronunciation
- **Audio-Animation Synchronization**: Talking animations automatically sync with voice playback
- **Automated Audio Generation**: Script-based pipeline for creating voice content from translations

#### **Intelligent Contextual Messaging**
- **Smart Event Detection**: Recognizes learning milestones, struggles, and achievements
- **Adaptive Encouragement**: Personalized messages based on performance patterns
- **Game Mode Integration**: Context-aware introductions and guidance for each learning mode
- **Progress Celebration**: Special animations and voice lines for consecutive correct answers

#### **User Experience Features**
- **Visibility Control**: Users can toggle Foxy on/off in settings
- **Sound Integration**: Respects global sound settings while providing audio feedback
- **Performance-Based Responses**: Different encouragement strategies for various learning scenarios
- **Seamless Integration**: Non-intrusive design that enhances rather than distracts from learning

#### **Technical Implementation**
- **Sprite Sheet Technology**: Efficient animation system with 70x70 pixel frames
- **Audio Management**: HTML5 audio API with error handling and fallback support
- **State Management**: Centralized animation and voice control through React Context
- **Automation Pipeline**: TypeScript-based audio generation system for scalable content creation

## Technologies Used

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **Smart Explanations:** Custom AI-powered explanation engine
- **Learning Analytics:** Built-in progress tracking and adaptation algorithms
- **Animation System:** Sprite sheet-based character animation
- **Voice Synthesis:** Eleven Labs Text-to-Speech API integration
- **Audio Management:** HTML5 Audio API with advanced synchronization

## Smart Explanation Engine Architecture

### **Strategy Selection Algorithm**
```typescript
// Intelligent strategy selection based on:
// - User's current skill level and learning style
// - Previous attempt history and mistake patterns  
// - Number characteristics and mathematical properties
// - Contextual factors (time of day, recent performance)

const selectOptimalStrategy = (problem, userProfile, attemptHistory) => {
  // Pattern recognition for special numbers (9s, 11s, squares)
  if (hasSpecialPattern(problem)) return getPatternStrategy(problem);
  
  // Adapt to user's struggle areas
  if (isStruggleArea(problem, userProfile)) return getVisualStrategy(problem);
  
  // Use preferred learning style
  return getStyleBasedStrategy(problem, userProfile.preferredStyle);
};
```

### **Multi-Strategy Explanation Generation**
Each explanation includes:
- **🎯 Core Concept**: The mathematical principle being demonstrated
- **📝 Step-by-Step Guide**: Clear, sequential instructions
- **🔍 Pattern Recognition**: Mathematical relationships and shortcuts
- **🧠 Memory Aids**: Mnemonics, rhymes, and memorable associations
- **🌍 Real-World Applications**: Practical contexts and examples
- **👁️ Visual Representations**: Arrays, diagrams, and models

### **Adaptive Learning Features**
- **Real-time Performance Analysis**: Continuously monitors user responses
- **Dynamic Strategy Adjustment**: Switches approaches based on effectiveness
- **Personalized Difficulty Scaling**: Maintains optimal challenge level
- **Learning Style Recognition**: Identifies and adapts to individual preferences
- **Long-term Progress Optimization**: Builds comprehensive mathematical understanding

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
-   `pnpm generate-audio`: Generates AI voice files for Foxy using Eleven Labs Text-to-Speech API (requires API key configuration).

## Audio Generation Setup

To generate Foxy's voice files:

1. **Setup Eleven Labs Account:**
    - Create account at [elevenlabs.io](https://elevenlabs.io)
    - Obtain API key from dashboard
    - Select voice IDs for German and Russian

2. **Configure Environment:**
   ```bash
   # Create .env file in project root
   ELEVENLABS_API_KEY=your_api_key_here
   ```

3. **Update Voice IDs:**
    - Edit `scripts/generate-foxy-audio.ts`
    - Set `VOICE_ID_GERMAN` and `VOICE_ID_RUSSIAN` constants

4. **Generate Audio:**
   ```bash
   pnpm generate-audio
   ```

This creates MP3 files in `public/audio/foxy/{lang}/` for all Foxy message keys.

## Project Structure

-   `public/`: Contains static assets like images and fonts.
-   `src/`: Contains the main source code.
    -   `components/`: Reusable UI components.
        -   `PracticeMode.tsx`: Enhanced practice mode with smart explanations.
        -   `SmartExplanationEngine.ts`: Core explanation generation logic.
        -   `AnimatedFoxy.tsx`: Advanced animated mascot with sprite-based animations and voice integration.
    -   `contexts/`: React Context for global state management (e.g., `GameContext.tsx`).
        -   `game-hooks.ts`: Smart learning analytics and progress tracking.
        -   `GameContext.tsx`: Enhanced with Foxy animation states, audio management, and contextual messaging.
    -   `utils/`: Utility functions and algorithms.
        -   `explanationStrategies.ts`: Mathematical strategy implementations.
        -   `learningAnalytics.ts`: User progress analysis and adaptation.
    -   `assets/`: Static assets imported by components.
        -   `animations/foxy/`: Sprite sheet animations for character states (idle, talking, happy).
    -   `translations.ts`: Contains localization strings for different languages (including explanation strategies and Foxy messages).
    -   `App.tsx`: Main application component.
    -   `main.tsx`: Entry point of the application.
-   `public/`: Contains static assets like images and fonts.
    -   `audio/foxy/`: AI-generated voice files organized by language (de/, ru/).
    -   `images/`: Static images including Foxy mascot assets.
-   `scripts/`: Development and automation scripts.
    -   `generate-foxy-audio.ts`: Automated audio generation using Eleven Labs API.
-   `index.html`: The main HTML file.
-   `vite.config.ts`: Vite configuration file.
-   `tailwind.config.js`: Tailwind CSS configuration file.
-   `tsconfig.json` / `tsconfig.node.json`: TypeScript configuration files.

## Smart Learning Philosophy

### **The POWER Principles**
Our explanation system follows the POWER methodology:

- **P**atterns - Look for number patterns and mathematical relationships first
- **O**rder - Use symmetry (`a × b = b × a`) to choose the easier direction
- **W**hole numbers - Leverage 5s, 10s, 25s as calculation helpers
- **E**asy first - Always choose the simplest cognitive path
- **R**epeat - Practice with spaced repetition for long-term retention

### **Adaptive Intelligence**
The system continuously learns from each interaction:
- **Mistake Analysis**: Identifies conceptual gaps and provides targeted remediation
- **Success Pattern Recognition**: Reinforces effective learning strategies
- **Cognitive Load Management**: Adjusts complexity to maintain optimal challenge
- **Metacognitive Development**: Teaches students to recognize their own learning preferences

### **Mathematical Confidence Building**
- **Multiple Solution Paths**: Shows there's always more than one way to solve problems
- **Celebration of Discovery**: Rewards mathematical insights and "aha!" moments
- **Error Normalization**: Treats mistakes as learning opportunities, not failures
- **Strategy Ownership**: Empowers students to choose their preferred approaches

## Educational Impact

### **Research-Based Features**
- **Spaced Repetition**: Optimally timed review of previously learned concepts
- **Interleaving**: Mixes different types of problems to improve retention
- **Elaborative Interrogation**: Encourages "why" and "how" thinking
- **Dual Coding**: Combines visual and verbal processing for enhanced memory

### **Differentiated Learning Support**
- **Visual Learners**: Array models, area diagrams, pattern visualizations
- **Auditory Learners**: Rhymes, counting sequences, verbal explanations
- **Kinesthetic Learners**: Finger tricks, physical manipulations, gesture-based methods
- **Analytical Learners**: Pattern recognition, algebraic relationships, logical reasoning

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. When contributing to the smart explanation system:

### **Adding New Strategies**
1. Implement the strategy in `explanationStrategies.ts`
2. Add appropriate applicability conditions
3. Include comprehensive step-by-step explanations
4. Provide visual representations where helpful
5. Add memorable mnemonics or memory aids
6. Test with various number combinations
7. Update translation files for multi-language support

### **Improving Learning Analytics**
- Enhance user progress tracking algorithms
- Develop new adaptation strategies based on learning research
- Improve mistake pattern recognition
- Add new achievement types and motivational features

### **Extending Foxy Integration**
- **New Animation States**: Add sprite sheets for additional emotions (surprised, thinking, celebrating)
- **Voice Content**: Expand Foxy's vocabulary with more contextual messages
- **Interactive Features**: Implement clickable Foxy interactions or mini-conversations
- **Multilingual Expansion**: Add support for additional languages with native voice synthesis

### **Audio and Animation Development**
- **Voice Line Creation**: Record or generate new audio content following the established naming convention
- **Sprite Sheet Development**: Create new animations using 70x70 pixel frame specifications
- **Audio Pipeline Enhancement**: Improve the automated audio generation script with additional voice options
- **Animation Timing**: Fine-tune animation synchronization with voice playback for optimal user experience

---

## 🎯 Why This System is Advanced

Traditional multiplication education often relies on rote memorization and single-method explanations. Eva's Multiplication Game transforms learning through:

### **Personalized Intelligence**
- **Individual Learning Profiles**: Recognizes each student's unique cognitive style
- **Adaptive Complexity**: Maintains optimal challenge without overwhelming
- **Success Prediction**: Identifies which strategies will work best for each learner

### **Mathematical Empowerment**
- **Strategy Autonomy**: Students learn to choose their own solution methods
- **Conceptual Understanding**: Moves beyond memorization to deep comprehension
- **Transfer Learning**: Skills apply to broader mathematical thinking

### **Joyful Discovery**
- **"Aha!" Moment Creation**: Designs experiences that generate mathematical insights
- **Confidence Building**: Celebrates every form of mathematical thinking
- **Intrinsic Motivation**: Makes math feel like solving fun puzzles rather than work

---

**Enjoy helping Eva discover the magic of multiplication with Foxy and our intelligent tutoring system!** 🦊✨📚

*"There's always more than one way to solve a multiplication problem. The best way is the one that makes sense to YOU!"* 💡
