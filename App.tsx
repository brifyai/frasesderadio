import React, { useState, useEffect } from 'react';
import VoiceSelector from './components/VoiceSelector';
import History from './components/History';
import RadioTemplates from './components/RadioTemplates';
import { VOICES, STYLES, ACCENT_NAME } from './constants';
import { GenerationParams, StyleOption, HistoryItem } from './types';
import { generateAudio } from './services/geminiService';
import { base64ToUint8Array, createAudioBlob } from './utils/audioUtils';

type AppMode = 'radio' | 'text';

const App: React.FC = () => {
  // State
  const [mode, setMode] = useState<AppMode>('radio');
  const [text, setText] = useState<string>('');
  const [voiceId, setVoiceId] = useState<string>(VOICES[0].id);
  const [style, setStyle] = useState<StyleOption>(StyleOption.Natural);
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Radio branding state
  const [radioName, setRadioName] = useState<string>('Mi Radio');
  const [brandColor, setBrandColor] = useState<string>('#3b82f6');

  // Helper to insert tags
  const insertTag = (tag: string) => {
    setText((prev) => prev + ` ${tag} `);
  };

  const handleGenerate = async (textToGenerate?: string, voiceIdToUse?: string, styleToUse?: StyleOption, speedToUse?: number, pitchToUse?: number) => {
    const finalText = textToGenerate || text;
    const finalVoiceId = voiceIdToUse || voiceId;
    const finalStyle = styleToUse || style;
    const finalSpeed = speedToUse || speed;
    const finalPitch = pitchToUse || pitch;

    if (!finalText.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const params: GenerationParams = {
        text: finalText,
        voiceId: finalVoiceId,
        style: finalStyle,
        speed: finalSpeed,
        pitch: finalPitch
      };

      const base64Audio = await generateAudio(params);
      const pcmData = base64ToUint8Array(base64Audio);
      const audioBlob = createAudioBlob(pcmData, 'wav');
      const audioUrl = URL.createObjectURL(audioBlob);

      const selectedVoice = VOICES.find(v => v.id === finalVoiceId);

      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        text: finalText,
        audioUrl,
        timestamp: Date.now(),
        voiceName: selectedVoice?.name || 'Desconocido',
        style: finalStyle
      };

      setHistory(prev => [newItem, ...prev]);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al generar el audio. Verifica tu API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* Header Profesional */}
      <header className="bg-slate-800 border-b border-slate-700 py-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: brandColor }}
            >
              {radioName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {radioName}
              </h1>
              <p className="text-slate-400 text-sm">Estudio de Producción Radio Profesional</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-900/40 text-brand-400 text-xs font-semibold border border-brand-800">
                Acento: {ACCENT_NAME} 🇨🇱
              </span>
            </div>
            {/* Mode Toggle */}
            <div className="flex bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setMode('radio')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'radio'
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                📻 Plantillas Radio
              </button>
              <button
                onClick={() => setMode('text')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'text'
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ✍️ Texto Libre
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {mode === 'radio' ? (
          /* Radio Templates Mode */
          <div className="space-y-8">
            {/* Branding Controls */}
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold text-brand-100 mb-4">Configuración de Marca</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-100 mb-2">Nombre de la Radio</label>
                  <input
                    type="text"
                    value={radioName}
                    onChange={(e) => setRadioName(e.target.value)}
                    placeholder="Ej: Radio Rock 95.5"
                    className="w-full bg-slate-700 border-slate-600 rounded-md text-white py-2 px-3 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-100 mb-2">Color de Marca</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-12 h-10 bg-slate-700 border border-slate-600 rounded-md"
                    />
                    <input
                      type="text"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      placeholder="#3b82f6"
                      className="flex-1 bg-slate-700 border-slate-600 rounded-md text-white py-2 px-3 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Radio Templates Component */}
            <RadioTemplates 
              onGenerate={handleGenerate}
              loading={loading}
            />
          </div>
        ) : (
          /* Text Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Controls */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* 1. Voice Selector */}
              <VoiceSelector selectedVoiceId={voiceId} onSelect={setVoiceId} />

              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-6">
                
                {/* 2. Style Selector */}
                <div>
                  <label className="block text-sm font-medium text-brand-100 mb-2">2. Estilo</label>
                  <select 
                    value={style} 
                    onChange={(e) => setStyle(e.target.value as StyleOption)}
                    className="w-full bg-slate-700 border-slate-600 rounded-md text-white py-2 px-3 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  >
                    {STYLES.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Speed Selector */}
                <div>
                   <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-brand-100">3. Velocidad</label>
                    <span className="text-xs text-brand-400">{speed.toFixed(1)}x</span>
                   </div>
                   <input 
                    type="range" 
                    min="0.5" 
                    max="2.0" 
                    step="0.1" 
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-brand-500"
                   />
                   <div className="flex justify-between text-xs text-slate-500 mt-1">
                     <span>Lento</span>
                     <span>Rápido</span>
                   </div>
                </div>

                {/* 4. Pitch Selector */}
                <div>
                   <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-brand-100">4. Tono</label>
                    <span className="text-xs text-brand-400">{pitch}</span>
                   </div>
                   <input 
                    type="range" 
                    min="-10" 
                    max="10" 
                    step="1" 
                    value={pitch}
                    onChange={(e) => setPitch(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-brand-500"
                   />
                   <div className="flex justify-between text-xs text-slate-500 mt-1">
                     <span>Grave</span>
                     <span>Agudo</span>
                   </div>
                </div>
              </div>

            </div>

            {/* Right Column: Input & Results */}
            <div className="lg:col-span-2">
              
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                <label className="block text-sm font-medium text-brand-100 mb-2">Texto a transformar</label>
                
                {/* Toolbar */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <button onClick={() => insertTag('[pausa]')} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs rounded text-brand-200 border border-slate-600 transition-colors">+ [pausa]</button>
                  <button onClick={() => insertTag('[risa]')} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs rounded text-yellow-200 border border-slate-600 transition-colors">+ [risa]</button>
                  <button onClick={() => insertTag('[grito]')} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs rounded text-red-200 border border-slate-600 transition-colors">+ [grito]</button>
                  <button onClick={() => insertTag('[llanto]')} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs rounded text-blue-200 border border-slate-600 transition-colors">+ [llanto]</button>
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Escribe aquí tu texto... Usa las etiquetas para dar vida a la voz."
                  className="w-full h-40 bg-slate-900 border border-slate-600 rounded-lg p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                />

                {error && (
                  <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-200 text-sm rounded-md">
                    {error}
                  </div>
                )}

                <button 
                  onClick={() => handleGenerate()}
                  disabled={loading || !text.trim()}
                  className={`mt-6 w-full py-3 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] ${
                    loading || !text.trim()
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-900/50'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generando...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                      Generar Audio
                    </>
                  )}
                </button>
              </div>

              {/* History Block */}
              <History items={history} />

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
