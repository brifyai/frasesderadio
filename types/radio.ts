export interface RadioTemplate {
  id: string;
  name: string;
  category: 'jingle' | 'spot' | 'identification' | 'transition' | 'closing';
  template: string;
  variables: string[];
  description: string;
}

export interface RadioProject {
  id: string;
  name: string;
  brandName: string;
  brandColor: string;
  logo?: string;
  createdAt: number;
  audioFiles: RadioAudioFile[];
}

export interface RadioAudioFile {
  id: string;
  templateId: string;
  templateName: string;
  finalText: string;
  audioUrl: string;
  voiceId: string;
  voiceName: string;
  style: string;
  speed: number;
  pitch: number;
  timestamp: number;
  variables: Record<string, string>;
}

export interface TemplateVariable {
  name: string;
  value: string;
  required: boolean;
}

export const TEMPLATE_CATEGORIES = {
  jingle: 'Jingles de Entrada',
  spot: 'Spots Promocionales', 
  identification: 'Identificaciones',
  transition: 'Transiciones',
  closing: 'Cierres'
} as const;

export type TemplateCategory = keyof typeof TEMPLATE_CATEGORIES;