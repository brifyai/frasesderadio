export enum Gender {
  Male = 'Hombre',
  Female = 'Mujer',
}

export interface VoiceOption {
  id: string;
  name: string;
  gender: Gender;
  apiVoiceName: string; // Maps to Gemini valid voices (Puck, Charon, Kore, Fenrir, Zephyr)
}

export enum StyleOption {
  Alegre = 'alegre',
  Triste = 'triste',
  Susurrar = 'susurrar',
  Storyteller = 'storyteller',
  Natural = 'natural',
}

export interface HistoryItem {
  id: string;
  text: string;
  audioUrl: string; // Blob URL
  timestamp: number;
  voiceName: string;
  style: string;
}

export interface GenerationParams {
  text: string;
  voiceId: string;
  style: StyleOption;
  speed: number; // 0.5 to 2.0
  pitch: number; // -10 to 10
}
