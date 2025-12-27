import React from 'react';
import { VoiceOption, Gender } from '../types';
import { VOICES } from '../constants';

interface VoiceSelectorProps {
  selectedVoiceId: string;
  onSelect: (id: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ selectedVoiceId, onSelect }) => {
  const males = VOICES.filter(v => v.gender === Gender.Male);
  const females = VOICES.filter(v => v.gender === Gender.Female);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-brand-100">1. Selecciona una Voz</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Male Voices */}
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-2 block">Voces Masculinas</span>
          <div className="space-y-2">
            {males.map(voice => (
              <button
                key={voice.id}
                onClick={() => onSelect(voice.id)}
                className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm flex items-center justify-between ${
                  selectedVoiceId === voice.id 
                    ? 'bg-brand-600 text-white shadow-lg' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <span>{voice.name}</span>
                {selectedVoiceId === voice.id && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Female Voices */}
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-2 block">Voces Femeninas</span>
          <div className="space-y-2">
            {females.map(voice => (
              <button
                key={voice.id}
                onClick={() => onSelect(voice.id)}
                className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm flex items-center justify-between ${
                  selectedVoiceId === voice.id 
                    ? 'bg-pink-600 text-white shadow-lg' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <span>{voice.name}</span>
                {selectedVoiceId === voice.id && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceSelector;
