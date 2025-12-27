import { GoogleGenAI, Modality } from "@google/genai";
import { GenerationParams, VoiceOption, StyleOption } from "../types";
import { VOICES } from "../constants";

const getSystemInstruction = (style: StyleOption, speed: number, pitch: number) => {
  // Map speed slider (0.5 - 2.0) to natural language
  let speedDesc = "normal";
  if (speed < 0.8) speedDesc = "muy lenta";
  else if (speed < 1.0) speedDesc = "lenta";
  else if (speed > 1.5) speedDesc = "muy rápida";
  else if (speed > 1.1) speedDesc = "rápida";

  // Map pitch slider (-10 - 10) to natural language
  let pitchDesc = "normal";
  if (pitch < -5) pitchDesc = "muy grave y profundo";
  else if (pitch < -1) pitchDesc = "grave";
  else if (pitch > 5) pitchDesc = "muy agudo";
  else if (pitch > 1) pitchDesc = "agudo";

  return `
    Instrucciones de generación de audio:
    
    1. IDIOMA Y ACENTO:
    - Habla EXCLUSIVAMENTE en Español.
    - Acento: Chileno nativo.

    2. CONFIGURACIÓN DE VOZ:
    - Velocidad: ${speedDesc}.
    - Tono: ${pitchDesc}.
    - Estilo/Emoción: ${style}.
    
    3. INTERPRETACIÓN DE ETIQUETAS:
    - [pausa]: Genera silencio.
    - [risa]: Genera una risa natural.
    - [grito]: Voz enérgica/volumen alto.
    - [llanto]: Voz quebrada/llanto.
    - No leas las etiquetas literalmente.
    
    Lee el siguiente texto aplicando estas instrucciones:
  `;
};

export const generateAudio = async (params: GenerationParams): Promise<string> => {
  const { text, voiceId, style, speed, pitch } = params;

  if (!import.meta.env.VITE_API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
  const selectedVoice = VOICES.find(v => v.id === voiceId) || VOICES[0];
  
  const instruction = getSystemInstruction(style, speed, pitch);
  // Movemos las instrucciones al cuerpo del mensaje para evitar conflictos en la config del modelo TTS
  const fullPrompt = `${instruction}\n\n"${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice.apiVoiceName },
          },
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts && parts.length > 0) {
      const audioPart = parts.find(p => p.inlineData?.mimeType?.startsWith('audio'));
      if (audioPart && audioPart.inlineData?.data) {
        return audioPart.inlineData.data;
      }
    }

    throw new Error("No se generó contenido de audio en la respuesta.");

  } catch (error: any) {
    console.error("Error en Gemini Service:", error);
    
    if (error.status === 500 || error.message?.includes('500')) {
      throw new Error("Error del Servidor (500). Intenta simplificar el texto o probar de nuevo en unos momentos.");
    }
    
    throw error;
  }
};
