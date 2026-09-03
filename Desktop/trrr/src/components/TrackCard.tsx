import React, { useState } from 'react';
import { buildathonTracks } from '../data/tracksData';
import type { BuildathonTrack } from '../types';
import { ShieldCheck, Play } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TrackCardProps {
  onSelectTrackForDemo: (track: BuildathonTrack) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({ onSelectTrackForDemo }) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('track-01');

  const currentTrack = buildathonTracks.find((t) => t.id === selectedTrackId) || buildathonTracks[0];

  const handleTrackSelect = (id: string) => {
    soundFx.playClick();
    setSelectedTrackId(id);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 lg:py-12">
      {/* Track Selector & Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Track List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-mono tracking-wider text-gray-500 uppercase px-2 mb-3">
            Buildathon Challenge Tracks
          </h3>
          {buildathonTracks.map((track) => {
            const isSelected = track.id === selectedTrackId;
            return (
              <button
                key={track.id}
                onClick={() => handleTrackSelect(track.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between group border ${
                  isSelected
                    ? 'bg-[#121721] border-amber-500/40 text-white shadow-xl shadow-amber-500/5'
                    : 'bg-[#0E121A]/60 border-[#1E2638] text-gray-400 hover:text-white hover:bg-[#121721]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-sm font-semibold transition-colors ${
                      isSelected ? 'text-amber-400' : 'text-gray-500 group-hover:text-gray-400'
                    }`}
                  >
                    {track.number}
                  </span>
                  <span className="font-semibold text-sm tracking-tight">{track.title}</span>
                </div>
                {isSelected && <span className="w-1.5 h-6 rounded-full bg-amber-400 shadow-sm shadow-amber-400"></span>}
              </button>
            );
          })}

          {/* Quick Info Box */}
          <div className="p-4 rounded-xl bg-[#121721]/60 border border-[#1E2638] mt-6 text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-semibold font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>THE BAR COMPLIANCE</span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Every money action must be explainable, bounded, and gated. Built on Razorpay Test-Mode APIs.
            </p>
          </div>
        </div>

        {/* Right Track Detail Card (Matches Screenshot Layout) */}
        <div className="lg:col-span-8 bg-[#121721] border border-[#1E2638] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

          {/* Track Header */}
          <div className="space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
              <span>TRACK {currentTrack.number}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {currentTrack.title}
            </h2>
            <p className="text-lg text-amber-300/90 font-medium">
              {currentTrack.tagline}
            </p>
          </div>

          {/* Main Description */}
          <div className="border-t border-b border-[#1E2638] py-6 my-6">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {currentTrack.description}
            </p>
          </div>

          {/* Why Now & Example Directions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            {/* Why Now */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                WHY NOW
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {currentTrack.whyNow}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentTrack.protocols.map((protocol, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A2233] text-gray-300 border border-[#2A3650]"
                  >
                    {protocol}
                  </span>
                ))}
              </div>
            </div>

            {/* Example Directions */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                EXAMPLE DIRECTIONS
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                {currentTrack.exampleDirections.map((dir, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <span className="text-amber-400 font-mono font-bold">+</span>
                    <span>{dir}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The Bar Box */}
          <div className="bg-[#0B0E14] border border-[#1E2638] rounded-xl p-5 mb-8">
            <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-2">
              THE BAR
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {currentTrack.theBar}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={() => {
                soundFx.playSuccess();
                onSelectTrackForDemo(currentTrack);
              }}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-black px-8 py-3.5 rounded-xl font-bold text-sm transition-all transform active:scale-95 shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 group"
            >
              <Play className="w-4 h-4 fill-black group-hover:translate-x-0.5 transition-transform" />
              <span>Launch Live Interactive Agent Hub</span>
            </button>

            <span className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Razorpay Test-Mode Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
