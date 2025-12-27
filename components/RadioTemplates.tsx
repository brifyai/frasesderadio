import React, { useState } from 'react';
import { RadioTemplate, TEMPLATE_CATEGORIES, TemplateCategory } from '../types/radio';
import { RADIO_TEMPLATES } from '../constants/radioTemplates';
import { VOICES } from '../constants';
import { StyleOption } from '../types';

interface RadioTemplatesProps {
  onGenerate: (text: string, voiceId: string, style: StyleOption, speed: number, pitch: number) => void;
  loading: boolean;
}

const RadioTemplates: React.FC<RadioTemplatesProps> = ({ onGenerate, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('jingle');
  const [selectedTemplate, setSelectedTemplate] = useState<RadioTemplate | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [finalText, setFinalText] = useState<string>('');
  const [voiceId, setVoiceId] = useState<string>(VOICES[0].id);
  const [style, setStyle] = useState<StyleOption>(StyleOption.Natural);
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(0);

  const templatesByCategory = RADIO_TEMPLATES.filter(t => t.category === selectedCategory);

  const handleTemplateSelect = (template: RadioTemplate) => {
    setSelectedTemplate(template);
    const initialVariables: Record<string, string> = {};
    template.variables.forEach(variable => {
      initialVariables[variable] = '';
    });
    setVariables(initialVariables);
    setFinalText('');
  };

  const handleVariableChange = (variableName: string, value: string) => {
    const newVariables = { ...variables, [variableName]: value };
    setVariables(newVariables);
    
    // Update final text
    if (selectedTemplate) {
      let text = selectedTemplate.template;
      Object.entries(newVariables).forEach(([key, val]) => {
        text = text.replace(new RegExp(`{${key}}`, 'g'), val || `{${key}}`);
      });
      setFinalText(text);
    }
  };

  const handleGenerate = () => {
    if (finalText.trim() && selectedTemplate) {
      onGenerate(finalText, voiceId, style, speed, pitch);
    }
  };

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Buenos días';
    if (hour >= 12 && hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const fillCommonVariables = () => {
    const commonVars = {
      radio_name: 'Mi Radio',
      tiempo: getCurrentTime(),
      ciudad: 'Santiago'
    };
    
    const newVariables = { ...variables };
    Object.entries(commonVars).forEach(([key, value]) => {
      if (selectedTemplate?.variables.includes(key)) {
        newVariables[key] = value;
      }
    });
    
    setVariables(newVariables);
    
    // Update final text
    if (selectedTemplate) {
      let text = selectedTemplate.template;
      Object.entries(newVariables).forEach(([key, val]) => {
        text = text.replace(new RegExp(`{${key}}`, 'g'), val || `{${key}}`);
      });
      setFinalText(text);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Selector */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-brand-100 mb-4">Plantillas de Radio Profesional</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(TEMPLATE_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as TemplateCategory)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === key
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Template List */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h4 className="text-md font-medium text-brand-100 mb-3">
          {TEMPLATE_CATEGORIES[selectedCategory]}
        </h4>
        <div className="grid gap-3">
          {templatesByCategory.map(template => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedTemplate?.id === template.id
                  ? 'border-brand-500 bg-brand-900/20'
                  : 'border-slate-600 hover:border-slate-500 bg-slate-700/50'
              }`}
            >
              <h5 className="font-medium text-white">{template.name}</h5>
              <p className="text-sm text-slate-400 mt-1">{template.description}</p>
              <p className="text-xs text-brand-300 mt-2 font-mono">
                {template.template}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Template Configuration */}
      {selectedTemplate && (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-brand-100">
              Configurar: {selectedTemplate.name}
            </h4>
            <button
              onClick={fillCommonVariables}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-xs rounded text-brand-200 transition-colors"
            >
              Llenar comunes
            </button>
          </div>

          {/* Variables */}
          <div className="space-y-3">
            {selectedTemplate.variables.map(variable => (
              <div key={variable}>
                <label className="block text-sm font-medium text-brand-100 mb-1 capitalize">
                  {variable.replace('_', ' ')}
                </label>
                <input
                  type="text"
                  value={variables[variable] || ''}
                  onChange={(e) => handleVariableChange(variable, e.target.value)}
                  placeholder={`Ingresa ${variable.replace('_', ' ')}`}
                  className="w-full bg-slate-700 border-slate-600 rounded-md text-white py-2 px-3 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Voice and Style Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-100 mb-2">Voz</label>
              <select
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}
                className="w-full bg-slate-700 border-slate-600 rounded-md text-white py-2 px-3 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                {VOICES.map(voice => (
                  <option key={voice.id} value={voice.id}>{voice.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-100 mb-2">Estilo</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as StyleOption)}
                className="w-full bg-slate-700 border-slate-600 rounded-md text-white py-2 px-3 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value={StyleOption.Natural}>Natural</option>
                <option value={StyleOption.Alegre}>Alegre</option>
                <option value={StyleOption.Triste}>Triste</option>
                <option value={StyleOption.Susurrar}>Susurrar</option>
                <option value={StyleOption.Storyteller}>Cuentacuentos</option>
              </select>
            </div>
          </div>

          {/* Speed and Pitch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-brand-100">Velocidad</label>
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
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-brand-100">Tono</label>
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
            </div>
          </div>

          {/* Final Text Preview */}
          <div>
            <label className="block text-sm font-medium text-brand-100 mb-2">Texto Final</label>
            <div className="bg-slate-900 border border-slate-600 rounded-md p-3 text-white min-h-[80px]">
              {finalText || 'Completa las variables para ver el texto final...'}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !finalText.trim()}
            className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] ${
              loading || !finalText.trim()
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Generar Audio de Radio
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RadioTemplates;