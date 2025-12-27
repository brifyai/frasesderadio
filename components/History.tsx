import React from 'react';
import { HistoryItem } from '../types';

interface HistoryProps {
  items: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Historial de Audios
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm hover:border-brand-500 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-mono text-brand-400 bg-brand-900/50 px-2 py-0.5 rounded mr-2">
                  {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
                <span className="text-xs text-slate-400">{item.voiceName} • {item.style}</span>
              </div>
              <a 
                href={item.audioUrl} 
                download={`voz_chilena_${item.id.substring(0,6)}.wav`}
                className="text-brand-400 hover:text-brand-300 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Descargar
              </a>
            </div>
            <p className="text-slate-300 text-sm line-clamp-2 italic mb-3">"{item.text}"</p>
            <audio controls src={item.audioUrl} className="w-full h-8 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
