import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, ExternalLink, Youtube, Sparkles } from 'lucide-react';

interface WeddingMusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const WeddingMusicPlayer: React.FC<WeddingMusicPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const YOUTUBE_VIDEO_ID = 'NaZznqme2hg';
  const YOUTUBE_URL = 'https://youtu.be/NaZznqme2hg';

  // Trigger play when autoPlayTrigger becomes true (e.g. envelope opened)
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      playSong();
    }
  }, [autoPlayTrigger]);

  const sendCommand = (func: string, args: unknown[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  const playSong = () => {
    sendCommand('playVideo');
    setIsPlaying(true);
  };

  const pauseSong = () => {
    sendCommand('pauseVideo');
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      sendCommand('unMute');
      setIsMuted(false);
    } else {
      sendCommand('mute');
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Hidden/Off-screen YouTube IFrame Player with JS API enabled */}
      <div className="fixed -bottom-96 -right-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&origin=${encodeURIComponent(
            typeof window !== 'undefined' ? window.location.origin : ''
          )}&autoplay=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&rel=0`}
          title="Khmer Wedding Song"
          allow="autoplay; encrypted-media"
          onLoad={() => setIsReady(true)}
        />
      </div>

      {/* Floating Modern Audio Controller on Bottom Right */}
      <div className="no-print fixed bottom-5 right-5 z-40 flex items-center gap-1.5">
        <div
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 text-xs font-medium border ${
            isPlaying
              ? 'bg-[#43281c]/95 text-amber-200 border-amber-300/50 shadow-stone-950/30 ring-2 ring-amber-500/20'
              : 'bg-white/95 text-[#43281c] border-[#edd3dd] hover:bg-[#faedf2] shadow-pink-900/10'
          }`}
        >
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 cursor-pointer focus:outline-none"
            title={isPlaying ? 'ផ្អាកបទចម្រៀង (Pause)' : 'ចាក់បទចម្រៀង (Play)'}
          >
            <div className="relative flex items-center justify-center">
              {isPlaying ? (
                <>
                  <span className="absolute -inset-1 rounded-full bg-amber-400/20 animate-ping opacity-60" />
                  <Pause className="w-4 h-4 text-amber-300 relative z-10 fill-amber-300" />
                </>
              ) : (
                <Play className="w-4 h-4 text-[#43281c] fill-[#43281c]" />
              )}
            </div>

            <span className="font-kantumruy font-bold text-[11px] sm:text-xs whitespace-nowrap">
              {isPlaying ? 'បទមង្គលការ (កំពុងចាក់)' : 'ចាក់បទមង្គលការ'}
            </span>
          </button>

          {/* Animated sound wave bars when active */}
          {isPlaying && (
            <div className="flex items-center gap-0.5 ml-0.5" title="កំពុងលេង">
              <span className="w-0.5 h-2.5 bg-amber-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-0.5 h-3.5 bg-amber-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-0.5 h-2 bg-amber-300 rounded-full animate-bounce" />
            </div>
          )}

          {/* Quick Mute/Unmute */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="p-1 rounded-full hover:bg-white/10 text-amber-200 transition-colors cursor-pointer ml-1"
              title={isMuted ? 'បើកសំឡេង' : 'បិទសំឡេង'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Video Popout Button */}
          <button
            onClick={() => setShowVideoModal(true)}
            className="p-1 rounded-full hover:bg-white/10 text-emerald-400 hover:text-white transition-colors cursor-pointer"
            title="មើលវីដេអូចម្រៀង YouTube"
          >
            <Youtube className="w-3.5 h-3.5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Optional YouTube Video Lightbox Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#1a2920] rounded-2xl overflow-hidden border border-[#c8dcd0]/30 shadow-2xl p-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60 mb-3">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <span className="font-moul text-xs text-amber-200">បទចម្រៀងពិធីមង្គលការ</span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-300 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/10 cursor-pointer"
              >
                ✕ បិទ
              </button>
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                title="Khmer Wedding Song YouTube Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="flex items-center justify-between mt-3 text-xs font-kantumruy text-[#a2c4b0]">
              <span>បទចម្រៀងមង្គលការប្រពៃណីខ្មែរ</span>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-300 hover:underline"
              >
                <span>បើកក្នុង YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
