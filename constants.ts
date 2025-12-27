import { Gender, VoiceOption, StyleOption } from './types';

// Gemini has limited distinct voices (Puck, Charon, Kore, Fenrir, Zephyr).
// We map 10 UI options to these 5, implying slightly different personas in the prompt instructions.

export const VOICES: VoiceOption[] = [
  { id: 'm1', name: 'Mateo (Grave)', gender: Gender.Male, apiVoiceName: 'Fenrir' },
  { id: 'm2', name: 'Benjamín (Joven)', gender: Gender.Male, apiVoiceName: 'Puck' },
  { id: 'm3', name: 'Lucas (Profundo)', gender: Gender.Male, apiVoiceName: 'Charon' },
  { id: 'm4', name: 'Joaquín (Suave)', gender: Gender.Male, apiVoiceName: 'Fenrir' },
  { id: 'm5', name: 'Vicente (Enérgico)', gender: Gender.Male, apiVoiceName: 'Puck' },
  { id: 'f1', name: 'Valentina (Clara)', gender: Gender.Female, apiVoiceName: 'Kore' },
  { id: 'f2', name: 'Sofía (Dulce)', gender: Gender.Female, apiVoiceName: 'Zephyr' },
  { id: 'f3', name: 'Isabella (Profesional)', gender: Gender.Female, apiVoiceName: 'Kore' },
  { id: 'f4', name: 'Camila (Joven)', gender: Gender.Female, apiVoiceName: 'Zephyr' },
  { id: 'f5', name: 'Emilia (Madura)', gender: Gender.Female, apiVoiceName: 'Kore' },
];

export const STYLES = [
  { value: StyleOption.Natural, label: 'Natural' },
  { value: StyleOption.Alegre, label: 'Alegre' },
  { value: StyleOption.Triste, label: 'Triste' },
  { value: StyleOption.Susurrar, label: 'Susurrar' },
  { value: StyleOption.Storyteller, label: 'Cuentacuentos' },
];

export const ACCENT_NAME = "Chileno";

export const SAMPLE_RATE = 24000;
