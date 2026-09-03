import React, { useState } from 'react';
import { tracksData, type TrackInfo } from '../data/tracksData';
import { Bot } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TrackCardProps {
  onSelectTrack?: (trackId: string) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({ onSelectTrack }) => {
  const [selectedTrackId, setSelectedTrackId] = useState('track-01');

  const handleSelect = (track: TrackInfo) => {
    soundFx.playClick();
    setSelectedTrackId(track.id);
    if (onSelectTrack) {
      onSelectTrack(track.id);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {tracksData.map((track) => {
        const isSelected = selectedTrackId === track.id;
        return (
          <div
            key={track.id}
            onClick={() => handleSelect(track)}
            className={`shine-card rounded-3xl p-6 sm:p-8 border cursor-pointer transition-all ${
              isSelected ? 'border-[#111827] shadow-xl' : 'border-[#DFDBCF]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFDBCF] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#111827] text-[#EAF852] flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5 fill-[#EAF852]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#111827] font-serif">{track.title}</h3>
                  <p className="text-xs text-gray-500 font-mono">{track.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-[#EAF852] text-[#111827] font-bold border border-[#D6F038]">
                  TRACK {track.number} ACTIVE
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-700 font-sans pt-4 leading-relaxed font-medium">
              {track.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-4 font-mono text-[10px]">
              {track.tags.map((tag: string, idx: number) => (
                <span key={idx} className="px-2.5 py-1 rounded-full bg-white border border-[#DFDBCF] text-[#111827] font-bold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
