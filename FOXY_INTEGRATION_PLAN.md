# Foxy Integration Development Plan

## Goal

Enhance Foxy's presence from a static image with text to an animated character with pre-recorded natural voice, making her a more engaging learning companion throughout the application.

## Current Status (as of commit `ab828cf`)

*   A basic `AnimatedFoxy.tsx` component exists.
*   Foxy displays a static image (`/images/foxy-mascot.jpg`) and a text message.
*   Foxy's visibility and message content are managed via `GameContext.tsx`.
*   A generic helper function `showFoxyMessage(messageKey, duration?)` is implemented in `GameContext.tsx` and used in game modes for showing Foxy's messages.
*   Foxy appears on `MainMenu.tsx` with a welcome message.
*   Foxy displays introductory messages when entering each game mode using the new helper.
*   Users can toggle Foxy's visibility in `Settings.tsx`.
*   Contextual messages for Foxy (introductions, encouragement, congratulations, hints) are defined in `translations.ts`.

## Phases of Development

### Phase 1: Contextual Messages & Enhanced Control (Text-Based)

**Objective:** Make Foxy's text messages more dynamic and relevant to the user's actions across different game modes. Provide user control over Foxy's visibility.

**Tasks:**

1.  **[COMPLETED] Expand Foxy's Vocabulary in `translations.ts`:** (Commit `2e1a0cb`)
    *   Define new translation strings for Foxy's messages for various contexts:
        *   Entering each game mode (`PracticeMode`, `QuizMode`, `AdventureMode`, `MemoryGame`, `RealWorldMath`, `FantasyMath`).
        *   Encouragement messages (e.g., "Great start!", "Keep trying!", "You're doing well!").
        *   Congratulatory messages for completing a level/game or achieving a high score.
        *   Hint-related messages (e.g., "Need a little help?").
    *   Example keys: `foxyIntroPractice`, `foxyEncouragementQuiz`, `foxyCongratsAdventureLevel`.

2.  **[PARTIALLY COMPLETED] Integrate Contextual Messages in Game Modes:** (Intro messages done - Commit `01c32af`; Event-based messages for Practice/Quiz modes - Commit `b6ebe1d` and prior related changes)
    *   Modify each game mode component (`PracticeMode.tsx`, `QuizMode.tsx`, etc.):
        *   Use `useEffect` and `useGame` hook (`showFoxyMessage`, `setIsFoxyVisible`) to display relevant Foxy messages upon entering the mode.
        *   **[COMPLETED]** Implement logic to show/hide Foxy or change her message based on game events within the mode.
            *   `PracticeMode.tsx`: [COMPLETED] Added messages for correct answer streaks (3 and 5) and encouragement on incorrect answers.
            *   `QuizMode.tsx`: [COMPLETED] Added messages for correct answer streaks, encouragement on incorrect, time running low warning, and contextual congratulatory messages based on final score.
            *   `AdventureMode.tsx`: [COMPLETED] Implemented event-driven messages (incorrect answer, time low, level completion).
            *   `MemoryGame.tsx`: [COMPLETED] Implemented event-driven messages (match found, no match, few pairs left, game complete).
            *   `RealWorldMath.tsx`: [COMPLETED] Implemented event-driven messages (problem, expression, answer steps, correct/incorrect result).
            *   `FantasyMath.tsx`: [COMPLETED] Implemented event-driven messages (problem, expression, answer steps, correct/incorrect result).
    *   In `GameContext.tsx`:
        *   **[COMPLETED]** Added a generic function `showFoxyMessage(messageKey: keyof Translation, duration?: number)` to simplify showing messages and potentially auto-hiding them. (Commit `ab828cf`)

3.  **[COMPLETED] User Control for Foxy's Visibility:** (Commit `25dced1`)
    *   Add a toggle button (e.g., in `Settings.tsx` or a persistent UI element) to allow users to show/hide Foxy.
    *   Store this preference in `GameSettings` within `GameContext.tsx`.
    *   `AnimatedFoxy.tsx` should respect this global visibility setting in addition to `isFoxyVisible` prop.

4.  **[COMPLETED] Refine Foxy's Appearance:** (Commit `b6ebe1d` and prior related changes, Tailwind CSS conversion completed in commit `6d5d335`)
    *   Converted inline styles in `AnimatedFoxy.tsx` to Tailwind CSS for consistency and maintainability.
    *   Improved visual styling, including box shadow, border radius, and spacing.
    *   Ensured smooth transitions for visibility and responsiveness.

### Phase 2: Basic Animation

**Objective:** Replace the static Foxy image with simple animations to make her more lively.

**Tasks:**

1.  **[COMPLETED] Choose Animation Technology:**
    *   **Sprite Sheets** selected as the animation technology.
    *   `AnimatedFoxy.tsx` has been updated to use sprite sheets for animations and static images for fallback/specific states. (Reflects changes up to commit `c6e9ab5` and current modifications).

2.  **[COMPLETED] Create/Source Basic Animations:** (Assets created/sourced, configuration updated in commit `df261bd` and `0d56e50`)
    *   **Idle:** `src/assets/animations/foxy/idle.png` - **Implemented**. (Configured for 121 frames)
    *   **Talking:** `src/assets/animations/foxy/talking.png` - **Implemented**. (Configured for 121 frames)
    *   **Happy/Excited:** `foxy-happy-spritesheet.png` - **Implemented**. (Configured for 121 frames)
    *   **Asset Details (Target Specifications):**
        *   All sprite sheets should be horizontal strips. Frame dimensions are 70x70 pixels.
        *   **Idle Animation (`idle.png`):**
            *   **File Name:** `idle.png` (already exists as `src/assets/animations/foxy/idle.png`)
            *   **Purpose:** Foxy breathing lightly, blinking.
            *   **Number of Frames:** Configured for 121 frames in `AnimatedFoxy.tsx`. Actual asset may vary.
            *   **Frame Width:** 70 pixels
            *   **Frame Height:** 70 pixels
            *   **Total Image Dimensions:** (121 frames * 70px) = 8470px width x 70px height (based on config).
        *   **Talking Animation (`talking.png`):**
            *   **File Name:** `talking.png` (already exists as `src/assets/animations/foxy/talking.png`)
            *   **Purpose:** Simple mouth movement for when Foxy is "speaking".
            *   **Number of Frames:** Configured for 121 frames in `AnimatedFoxy.tsx`. Actual asset may vary.
            *   **Frame Width:** 70 pixels
            *   **Frame Height:** 70 pixels
            *   **Total Image Dimensions:** (121 frames * 70px) = 8470px width x 70px height (based on config).
        *   **Happy/Excited Animation (`foxy-happy-spritesheet.png`):**
            *   **File Name:** `foxy-happy-spritesheet.png` (created)
            *   **Purpose:** Foxy smiling, small jump/wag, or other happy gestures.
            *   **Number of Frames:** Configured for 121 frames in `AnimatedFoxy.tsx`. Actual asset may vary.
            *   **Frame Width:** 70 pixels
            *   **Frame Height:** 70 pixels
            *   **Total Image Dimensions:** (121 frames * 70px) = 8470px width x 70px height (based on config).
    *   *Asset Creation Workflow (Sprite Sheets):*
        *   1. *Design & Sketch:* Plan keyframes for each animation (idle, talking, happy).
        *   2. *Create Individual Frames:* Draw each frame using image editing software (e.g., Aseprite, Piskel for pixel art; GIMP, Krita, Photoshop for raster; Illustrator, Figma for vector exported to raster). Ensure consistent frame dimensions and character positioning.
        *   3. *Combine into Sprite Sheet:* Arrange frames into a single image grid. Tools like Aseprite, TexturePacker, or online generators can automate this.
        *   4. *Define Animation Metadata (Recommended):* Create a JSON file per animation or one master JSON. This file describes frame coordinates (x, y, width, height), animation sequences (which frames belong to "idle", "talking", etc.), and frame durations.
    *   *Automation & AI:*
        *   *AI Image/Video Generation for Sprites:* (Details as previously listed)
        *   *Pipeline Automation:* (Details as previously listed)
    *   *Storage:* Animations and metadata are stored in `src/assets/animations/foxy/`.

3.  **[IN PROGRESS] Integrate Animation into `AnimatedFoxy.tsx`:**
    *   `AnimatedFoxy.tsx` now utilizes a sprite sheet and static image display system driven by `foxyAnimationState`.
    *   The static `<img>` tag has been replaced by a `<div>` styled for dynamic background image display (sprite animation).
    *   Animation states are configured in `animationsConfig`:
        *   **'idle':** Uses `idle.png` (configured for 121 frames).
        *   **'talking':** Uses `talking.png` (configured for 121 frames).
        *   **'happy':** Uses `foxy-happy-spritesheet.png` (configured for 121 frames).
        *   **'static_default':** Displays the main static Foxy image (`public/images/foxy-mascot.png`) using `background-size: contain`.
    *   The component receives `foxyAnimationState` from context (Commit `c1bffa8`) to select the appropriate animation or static image.
    *   Sprite sheet images are imported from `src/assets/animations/foxy/`.
    *   Foxy animation container is prevented from shrinking due to adjacent text (Commit `c6e9ab5`).
    *   Static image path corrected (Commit `df261bd`).

3.  **[COMPLETED] Integrate Animation into `AnimatedFoxy.tsx`:** (Completed with commits `df261bd`, `0d56e50` and prior work)
    *   `AnimatedFoxy.tsx` now utilizes a sprite sheet and static image display system driven by `foxyAnimationState`.
    *   The static `<img>` tag has been replaced by a `<div>` styled for dynamic background image display (sprite animation).
    *   Animation states are configured in `animationsConfig`:
        *   **'idle':** Uses `idle.png` (configured for 121 frames).
        *   **'talking':** Uses `talking.png` (configured for 121 frames).
        *   **'happy':** Uses `foxy-happy-spritesheet.png` (configured for 121 frames).
        *   **'static_default':** Displays the main static Foxy image (`/images/foxy-mascot.png`) using `background-size: contain`.
    *   The component receives `foxyAnimationState` from context (Commit `c1bffa8`) to select the appropriate animation or static image.
    *   Sprite sheet images are imported from `src/assets/animations/foxy/`.
    *   Foxy animation container is prevented from shrinking due to adjacent text (Commit `c6e9ab5`).
    *   Static image path corrected (Commit `df261bd`).

4.  **[COMPLETED] Control Animations from `GameContext.tsx` or Props:** (Completed with commit `91b70e7` and related context work)
    *   Add state to `GameContext.tsx` to control Foxy's current animation.
        *   **[COMPLETED]** `foxyAnimationState` (supporting 'idle', 'talking', 'happy') and its direct setter are managed internally. (Commit `c1bffa8` and subsequent structure)
        *   **[COMPLETED]** 'idle'/'talking' states are automatically managed based on Foxy's visibility and message presence via a `useEffect` hook. This hook is updated to not interfere with temporary states like 'happy'.
    *   **[COMPLETED]** Implement a public `setFoxyAnimationState` function in `GameContext.tsx` (exposed via context value).
        *   This function now handles the logic for the 'happy' state.
        *   When `setFoxyAnimationState('happy')` is called:
            *   Foxy's animation changes to 'happy'.
            *   A timer is started (e.g., for 2.5 seconds, managed by `happyAnimationTimeoutRef`).
            *   A `foxyMessageRef` is used to ensure the timeout callback has access to the current message state.
            *   When the timer expires, Foxy's animation state automatically reverts to 'talking' (if a message is active, checked via `foxyMessageRef`) or 'idle' (if no message is active).
        *   Calling this function with states other than 'happy' will clear any active 'happy' animation timeout and set the new state directly.
    *   **[COMPLETED]** Trigger 'happy' animation from game modes on specific positive events using the updated `setFoxyAnimationState('happy')`. (Commit `91b70e7` and subsequent related work across game modes).

**Files to Modify:**
*   `src/components/AnimatedFoxy.tsx` (cleanup was already done)
*   `src/contexts/GameContext.tsx`
*   Game mode components (to trigger 'happy' animations).
**New Files/Directories:**
*   `src/assets/animations/foxy/` (for Lottie JSON files or sprite sheets)

### Phase 3: Voice Integration (Pre-recorded)

**Objective:** Add pre-recorded natural voice lines for Foxy, synchronized with her talking animation.

**Tasks:**

1.  **[COMPLETED] Script Voice Lines:**
    *   Transcribe all Foxy-specific spoken messages defined in `translations.ts` (see list under Task 2) into a script for each target language.
    *   Ensure scripts are natural-sounding and appropriate for the target audience (Eva).
    *   *Status: Completed.*

2.  **[COMPLETED] Record Voice Lines:**
    *   Perform voice acting and recording for one language initially (e.g., German, then Russian).
    *   Ensure good audio quality (clear, no background noise, consistent volume) and consistent, engaging delivery.
    *   **Directory Structure:** Audio files should be placed in `public/audio/foxy/{lang_code}/`.
        *   Example for German: `public/audio/foxy/de/`
        *   Example for Russian: `public/audio/foxy/ru/`
    *   **File Naming Convention:** Use the exact `messageKey` from `translations.ts` as the filename, with an `.mp3` extension.
        *   Example: `public/audio/foxy/de/foxyWelcomeMainMenu.mp3`
    *   **List of Foxy Message Keys Requiring Audio Files (filename will be `{key}.mp3`):**
        *   `foxyWelcomeMainMenu`
        *   `foxyIntroPracticeMode`
        *   `foxyIntroQuizMode`
        *   `foxyIntroAdventureMode`
        *   `foxyIntroMemoryGame`
        *   `foxyIntroRealWorldMath`
        *   `foxyIntroFantasyMath`
        *   `foxyEncouragement1`
        *   `foxyEncouragement2`
        *   `foxyEncouragement3`
        *   `foxyCongrats1`
        *   `foxyCongrats2`
        *   `foxyCongrats3`
        *   `foxyCongratsAdventureLevel`
        *   `foxyCongratsQuiz`
        *   `foxyCongratsQuizHigh`
        *   `foxyCongratsQuizMid`
        *   `foxyCongratsQuizLow`
        *   `foxyAdventureCorrectAnswer`
        *   `foxyQuizCorrectAnswer`
        *   `foxyAdventureIncorrect`
        *   `foxyAdventureTimeLow`
        *   `foxyAdventurePass1Star`
        *   `foxyAdventurePass2Stars`
        *   `foxyAdventurePass3Stars`
        *   `foxyAdventureFail`
        *   `foxyMemoryMatchFound`
        *   `foxyMemoryNoMatch`
        *   `foxyMemoryFewPairsLeft`
        *   `foxyMemoryGameComplete`
        *   `foxyRealWorldProblem`
        *   `foxyRealWorldExpression`
        *   `foxyRealWorldAnswer`
        *   `foxyRealWorldCorrect`
        *   `foxyRealWorldIncorrect`
        *   `foxyFantasyProblem`
        *   `foxyFantasyExpression`
        *   `foxyFantasyAnswer`
        *   `foxyFantasyCorrect`
        *   `foxyFantasyIncorrect`
        *   `foxyEncouragementStreak3`
        *   `foxyEncouragementStreak5`
        *   `foxyEncouragementTryAgain`
        *   `foxyEncouragementQuizKeepTrying`
        *   `foxyTimeRunningOutQuiz`
        *   `foxyHintMessage`
    *   *Note: UI-only text keys like `foxyVisibilityTitle` do not need audio.*
    *   **Automation Script for Audio Generation (`scripts/generate-foxy-audio.ts`):**
        *   **Purpose:** This Node.js script automates the creation of MP3 audio files for Foxy's messages using the Eleven Labs Text-to-Speech API.
        *   **Functionality:**
            *   Reads Foxy-specific message keys and their corresponding text from `src/translations.ts`.
            *   Iterates through supported languages (currently German 'de' and Russian 'ru').
            *   For each message in each language, it calls the Eleven Labs API to synthesize speech.
            *   Saves the generated MP3 audio file to the designated path: `public/audio/foxy/{lang_code}/{messageKey}.mp3`.
            *   Skips generation if an audio file already exists at the target path.
            *   Includes a small delay between API calls to help avoid rate-limiting issues.
        *   **Configuration (within the script):**
            *   `ELEVENLABS_API_KEY`: Your API key for Eleven Labs. **Must be set as an environment variable.**
            *   `VOICE_ID_GERMAN`: The Eleven Labs Voice ID for the German voice. **Must be updated with your specific Voice ID.**
            *   `VOICE_ID_RUSSIAN`: The Eleven Labs Voice ID for the Russian voice. **Must be updated with your specific Voice ID.**
            *   `SUPPORTED_LANGUAGES`: An array of language codes to process (e.g., `['de', 'ru']`).
            *   `FOXY_MESSAGE_KEYS`: An array of translation keys that require audio generation.
            *   `model_id`: Specifies the Eleven Labs model to use (e.g., `eleven_multilingual_v2`).
            *   `voice_settings`: Configures speech parameters like stability and similarity boost.
        *   **Prerequisites:**
            *   Node.js and pnpm installed.
            *   Dependencies installed: `ts-node`, `typescript`, `dotenv`, `node-fetch`.
            *   An Eleven Labs account with an API key and desired Voice IDs.
        *   **Usage:**
            1.  Ensure your `ELEVENLABS_API_KEY` is set as an environment variable (e.g., in a `.env` file at the project root, which the script is configured to load via `dotenv`).
            2.  Update `VOICE_ID_GERMAN` and `VOICE_ID_RUSSIAN` constants in the script with your actual Voice IDs from Eleven Labs.
            3.  Run the script from the project root using the pnpm command defined in `package.json`:
                ```bash
                pnpm generate-audio
                ```
            4.  Alternatively, run directly (ensuring dependencies are met):
                ```bash
                pnpm exec node --loader ts-node/esm scripts/generate-foxy-audio.ts
                ```
        *   The script uses `import.meta.url` for ESM-friendly path resolution and is configured to be run with `node --loader ts-node/esm` as defined in `package.json`'s `generate-audio` script. (Commits `cf36748`, `f32734f`, `5547ca9`)

3.  **[IN PROGRESS] Integrate Audio Playback:**
    *   Use HTML5 `<audio>` API. (Implemented as of commit `add433f`)
    *   Modify `GameContext.tsx` to manage audio playback:
        *   Function `playFoxyAudio(messageKey)` implemented to play audio. (Commit `add433f`)
        *   Sound settings (`soundEnabled`) are respected. (Commit `add433f`)
        *   Basic audio loading/playback error handling in place. (Commit `add433f`)
    *   `playFoxyAudio` is called by `showFoxyMessage`. (Commit `add433f`)
    *   Animation state ('talking'/'idle') is now directly controlled by audio events (`onplaying`, `onended`, `onerror`) originating from `playFoxyAudio`. (Current changes)

4.  **[IN PROGRESS] Synchronize Voice and Animation:**
    *   When a Foxy message is displayed:
        *   The corresponding audio file is played via `playFoxyAudio` (called by `showFoxyMessageAndUpdate`).
        *   `playFoxyAudio` now sets Foxy's animation state to 'talking' when audio begins (`onplaying` event).
    *   When the audio finishes:
        *   `playFoxyAudio` sets Foxy's animation state back to 'idle' (`onended` event).
    *   Audio `onerror` events also revert Foxy to 'idle'.
    *   This core synchronization is now implemented. Further refinements might be needed based on testing.

**Files to Modify:**
*   `src/contexts/GameContext.tsx`
*   `src/components/AnimatedFoxy.tsx` (potentially to help manage audio events if tightly coupled with animation)
**New Files/Directories:**
*   `public/audio/foxy/de/` (and other languages later, e.g., `public/audio/foxy/ru/`)

### Phase 4: Advanced Interactions, Polish & Expansion

**Objective:** Refine Foxy's interactions, add more nuanced animations and voice lines, and expand to other languages.

**Tasks:**

1.  **[PENDING] More Complex Animations & Voice Lines:**
    *   Animations for thinking, pointing, or specific reactions.
    *   Voice lines for specific hints or feedback.
    *   Consider variations in delivery for repeated messages.

2.  **[PENDING] User Interaction with Foxy:**
    *   Allow users to click/tap on Foxy to:
        *   Repeat the current message/voice line.
        *   Request a hint (if applicable to the current game context).

3.  **[PENDING] Multilingual Support for Voice:**
    *   Record voice lines for other supported languages (e.g., Russian).
    *   Extend the audio management in `GameContext.tsx` to load voice lines based on the selected language.

4.  **[PENDING] Performance Optimization:**
    *   Ensure animations and audio do not negatively impact app performance, especially on target devices (iPad).
    *   Optimize asset sizes (animation files, audio files).

5.  **[PENDING] Accessibility:**
    *   Provide clear visual cues for Foxy's speech.
    *   Ensure text messages are always available (even if voice is the primary mode).
    *   Consider adding optional captions for voice lines.

**Files to Modify:**
*   All previously mentioned files will likely see further refinements.
*   `src/components/Settings.tsx` (if adding caption settings).

## Dependencies & Assets

*   **Animation Assets:** Lottie files, sprite sheets, or other animation data.
*   **Audio Assets:** Recorded voice lines in `.mp3` or `.ogg` format.
*   **Animation Library (Optional):** `lottie-react`, `framer-motion`, etc.
    *   If a new library is added, update `package.json` and install.

## Timeline & Milestones

*   **Milestone 1 (Phase 1 - COMPLETED):**
    *   Foxy provides contextual text messages in all game modes (Intro messages done - Commit `01c32af`; Event-based messages in all modes completed - Commit `0ab3cfa`).
    *   User can toggle Foxy's visibility (Done - Commit `25dced1`).
    *   Generic `showFoxyMessage` helper function implemented and used (Done - Commit `ab828cf`).
    *   Appearance refinement in `AnimatedFoxy.tsx`, including conversion to Tailwind CSS (Done - Commit `b6ebe1d` and prior related changes, Tailwind conversion in commit `6d5d335`).
    *   *Status: Phase 1 is fully complete.*
*   **Milestone 2 (Phase 2 - COMPLETED):** Foxy is animated with basic idle, talking, and happy states. (Completed with commits `df261bd`, `f53c7e1`, `0d56e50`, `91b70e7` and prior related work).
*   **Milestone 3 (Phase 3 - Pending):** Foxy speaks pre-recorded voice lines in one language, synchronized with talking animation.
*   **Milestone 4 (Phase 4 - Pending):** Advanced interactions, polish, and multilingual voice support implemented.

This plan provides a roadmap. Specific tasks and timelines within each phase will need further breakdown as development progresses.
Regular testing, especially on the target iPad device, will be crucial throughout all phases.
User feedback (from Eva) should be incorporated where possible.
