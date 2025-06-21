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

4.  **[COMPLETED] Refine Foxy's Appearance:** (Commit `b6ebe1d` and prior related changes)
    *   Converted inline styles in `AnimatedFoxy.tsx` to Tailwind CSS for consistency and maintainability.
    *   Improved visual styling, including box shadow, border radius, and spacing.
    *   Ensured smooth transitions for visibility and responsiveness.

### Phase 2: Basic Animation

**Objective:** Replace the static Foxy image with simple animations to make her more lively.

**Tasks:**

1.  **[PENDING] Choose Animation Technology:**
    *   **Lottie:** Good for vector animations, lightweight, and scalable. Requires creating animations in Adobe After Effects with the LottieFiles plugin.
    *   **Sprite Sheets:** Traditional 2D animation technique. Can be implemented with CSS or a simple JS animation loop.
    *   **Framer Motion / React Spring:** For UI-based animations and transitions, might be suitable for simple Foxy movements or state changes.
    *   *Decision Point: Evaluate ease of asset creation and integration.* Lottie is often a good choice for character animation in web apps.

2.  **[PENDING] Create/Source Basic Animations:**
    *   **Idle:** Foxy breathing lightly, blinking.
    *   **Talking:** Simple mouth movement synced (loosely at first) with message display.
    *   **Happy/Excited:** Foxy smiling, maybe a small jump or tail wag, for correct answers or achievements.
    *   *Asset Creation: This is a significant step. May require an animator or sourcing suitable existing assets.*

3.  **[PENDING] Integrate Animation into `AnimatedFoxy.tsx`:**
    *   Replace the `<img>` tag with the chosen animation component (e.g., Lottie player).
    *   Manage animation states (idle, talking, happy) based on props or context.
    *   New directory: `src/assets/animations/foxy/` (e.g., `idle.json`, `talking.json`).

4.  **[PENDING] Control Animations from `GameContext.tsx` or Props:**
    *   Add state to `GameContext.tsx` to control Foxy's current animation (e.g., `foxyAnimationState: 'idle' | 'talking' | 'happy'`).
    *   Update `setFoxyMessage` or create a new function to also set `foxyAnimationState` to 'talking' when a message appears, and back to 'idle' after.
    *   Trigger 'happy' animation on specific positive events.

**Files to Modify:**
*   `src/components/AnimatedFoxy.tsx`
*   `src/contexts/GameContext.tsx`
*   Game mode components (to trigger 'happy' animations).
**New Files/Directories:**
*   `src/assets/animations/foxy/` (for Lottie JSON files or sprite sheets)

### Phase 3: Voice Integration (Pre-recorded)

**Objective:** Add pre-recorded natural voice lines for Foxy, synchronized with her talking animation.

**Tasks:**

1.  **[PENDING] Script Voice Lines:**
    *   Transcribe all Foxy messages defined in `translations.ts` into a script.
    *   Ensure scripts are natural-sounding and appropriate for the target audience (Eva).

2.  **[PENDING] Record Voice Lines:**
    *   Perform voice acting and recording for one language initially (e.g., German).
    *   Ensure good audio quality and consistent delivery.
    *   Organize audio files clearly.
    *   New directory: `src/assets/audio/foxy/{lang}/` (e.g., `de/welcome.mp3`, `de/practice_intro.mp3`).

3.  **[PENDING] Integrate Audio Playback:**
    *   Use HTML5 `<audio>` API or a lightweight audio library.
    *   Modify `GameContext.tsx` to manage audio playback:
        *   Function to play a specific Foxy voice line based on a key (mapping to the audio file).
        *   Ensure sound settings (`soundEnabled`) are respected.
        *   Handle potential issues like audio loading, playback errors.

4.  **[PENDING] Synchronize Voice and Animation:**
    *   When a Foxy message is displayed:
        *   Play the corresponding audio file.
        *   Set Foxy's animation state to 'talking'.
    *   When the audio finishes:
        *   Set Foxy's animation state back to 'idle' (if no new message immediately follows).
    *   This might involve listening to audio `onended` events.

**Files to Modify:**
*   `src/contexts/GameContext.tsx`
*   `src/components/AnimatedFoxy.tsx` (potentially to help manage audio events if tightly coupled with animation)
**New Files/Directories:**
*   `src/assets/audio/foxy/de/` (and other languages later)

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

*   **Milestone 1 (Phase 1 - Near Completion):**
    *   Foxy provides contextual text messages in all game modes (Intro messages done - Commit `01c32af`; Event-based messages in all modes now complete).
    *   User can toggle Foxy's visibility (Done - Commit `25dced1`).
    *   Generic `showFoxyMessage` helper function implemented and used (Done - Commit `ab828cf`).
    *   Appearance refinement in `AnimatedFoxy.tsx` (Marked as Done - Commit `b6ebe1d` and prior related changes, but plan's mention of Tailwind CSS conversion is not reflected in current `AnimatedFoxy.tsx` code).
    *   *Status: All event-based messages are implemented. The main outstanding question for Phase 1 completion is the Tailwind CSS conversion for `AnimatedFoxy.tsx` as per Task 4's description in the plan.*
*   **Milestone 2 (Phase 2 - Pending):** Foxy is animated with basic idle, talking, and happy states.
*   **Milestone 3 (Phase 3 - Pending):** Foxy speaks pre-recorded voice lines in one language, synchronized with talking animation.
*   **Milestone 4 (Phase 4 - Pending):** Advanced interactions, polish, and multilingual voice support implemented.

This plan provides a roadmap. Specific tasks and timelines within each phase will need further breakdown as development progresses.
Regular testing, especially on the target iPad device, will be crucial throughout all phases.
User feedback (from Eva) should be incorporated where possible.
