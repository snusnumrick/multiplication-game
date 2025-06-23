import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // Use 'node-fetch' for making HTTP requests
import { translations } from '../src/translations'; // Adjust path as necessary

// Load environment variables (optional, for local development)
// import dotenv from 'dotenv';
// dotenv.config();

// --- Configuration ---
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

// Replace with your actual Voice IDs from Eleven Labs
const VOICE_ID_GERMAN = 'YOUR_GERMAN_VOICE_ID'; // Example: 'Rachel' might be '21m00Tcm4TlvDq8ikWAM'
const VOICE_ID_RUSSIAN = 'YOUR_RUSSIAN_VOICE_ID'; // Example: 'Domi' might be 'AZnzlk1XvdvUeBnXmlld'

const SUPPORTED_LANGUAGES: Array<'de' | 'ru'> = ['de', 'ru'];
const OUTPUT_BASE_DIR = path.join(__dirname, '..', 'public', 'audio', 'foxy');

// List of Foxy message keys that require audio files (from FOXY_INTEGRATION_PLAN.md)
const FOXY_MESSAGE_KEYS: Array<keyof typeof translations.de> = [
  'foxyWelcomeMainMenu',
  'foxyIntroPracticeMode',
  'foxyIntroQuizMode',
  'foxyIntroAdventureMode',
  'foxyIntroMemoryGame',
  'foxyIntroRealWorldMath',
  'foxyIntroFantasyMath',
  'foxyEncouragement1',
  'foxyEncouragement2',
  'foxyEncouragement3',
  'foxyCongrats1',
  'foxyCongrats2',
  'foxyCongrats3',
  'foxyCongratsAdventureLevel',
  'foxyCongratsQuiz',
  'foxyCongratsQuizHigh',
  'foxyCongratsQuizMid',
  'foxyCongratsQuizLow',
  'foxyAdventureCorrectAnswer',
  'foxyQuizCorrectAnswer',
  'foxyAdventureIncorrect',
  'foxyAdventureTimeLow',
  'foxyAdventurePass1Star',
  'foxyAdventurePass2Stars',
  'foxyAdventurePass3Stars',
  'foxyAdventureFail',
  'foxyMemoryMatchFound',
  'foxyMemoryNoMatch',
  'foxyMemoryFewPairsLeft',
  'foxyMemoryGameComplete',
  'foxyRealWorldProblem',
  'foxyRealWorldExpression',
  'foxyRealWorldAnswer',
  'foxyRealWorldCorrect',
  'foxyRealWorldIncorrect',
  'foxyFantasyProblem',
  'foxyFantasyExpression',
  'foxyFantasyAnswer',
  'foxyFantasyCorrect',
  'foxyFantasyIncorrect',
  'foxyEncouragementStreak3',
  'foxyEncouragementStreak5',
  'foxyEncouragementTryAgain',
  'foxyEncouragementQuizKeepTrying',
  'foxyTimeRunningOutQuiz',
  'foxyHintMessage',
];

// --- Helper Functions ---
async function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

async function generateAndSaveAudio(text: string, voiceId: string, outputPath: string) {
  if (!ELEVENLABS_API_KEY) {
    console.error('ELEVENLABS_API_KEY is not set. Please set it in your environment variables.');
    return;
  }
  if (voiceId.startsWith('YOUR_')) {
    console.error(`Placeholder Voice ID detected: ${voiceId}. Please update it with your actual Eleven Labs Voice ID.`);
    return;
  }

  if (fs.existsSync(outputPath)) {
    console.log(`Audio file already exists, skipping: ${outputPath}`);
    return;
  }

  console.log(`Generating audio for: "${text.substring(0, 50)}..." -> ${outputPath}`);

  try {
    const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2', // Or your preferred model
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error generating audio for "${text.substring(0,30)}...": ${response.status} ${response.statusText} - ${errorBody}`);
      return;
    }

    const audioBuffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(audioBuffer));
    console.log(`Successfully saved audio to: ${outputPath}`);

  } catch (error) {
    console.error(`Exception during audio generation for "${text.substring(0,30)}...":`, error);
  }
  // Add a small delay to avoid hitting rate limits too quickly
  await new Promise(resolve => setTimeout(resolve, 1000)); 
}

// --- Main Script Logic ---
async function main() {
  console.log('Starting Foxy audio generation script...');

  for (const lang of SUPPORTED_LANGUAGES) {
    const langDir = path.join(OUTPUT_BASE_DIR, lang);
    ensureDirectoryExists(langDir);

    const voiceId = lang === 'de' ? VOICE_ID_GERMAN : VOICE_ID_RUSSIAN;
    const langTranslations = translations[lang];

    if (!langTranslations) {
      console.warn(`Translations not found for language: ${lang}. Skipping.`);
      continue;
    }

    for (const messageKey of FOXY_MESSAGE_KEYS) {
      // Type assertion to assure TypeScript that messageKey is a valid key for langTranslations
      const text = (langTranslations as any)[messageKey] as string | undefined;

      if (!text) {
        console.warn(`Text not found for key "${String(messageKey)}" in language "${lang}". Skipping.`);
        continue;
      }

      const outputFileName = `${String(messageKey)}.mp3`;
      const outputPath = path.join(langDir, outputFileName);

      await generateAndSaveAudio(text, voiceId, outputPath);
    }
  }

  console.log('Foxy audio generation script finished.');
}

main().catch(error => {
  console.error('Unhandled error in main script execution:', error);
});
