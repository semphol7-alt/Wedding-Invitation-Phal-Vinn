import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, ZoomIn, X, Sparkles } from 'lucide-react';

interface PhotoCustomizerProps {
  currentPhoto: string;
  onPhotoChange: (newUrl: string) => void;
  defaultPhoto: string;
}

export const PhotoCustomizer: React.FC<PhotoCustomizerProps> = ({
  currentPhoto,
  onPhotoChange,
  defaultPhoto,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onPhotoChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefault = () => {
    onPhotoChange(defaultPhoto);
  };

  return (
    <div className="relative">
      {/* 📸 ស៊ុមរូបភាពប្រណីតមានចលនាអណ្តែត */}
      <div className="photo-frame-container my-5 flex flex-col items-center justify-center">
        <div className="relative group">
          <div className="photo-wrapper p-1.5 bg-gradient-to-br from-[#edd3dd] via-[#dfb6c4] to-[#b07d91] rounded-[100px_100px_24px_24px] shadow-lg animate-float-soft transition-all duration-300">
            <div className="w-[170px] h-[225px] sm:w-[190px] sm:h-[250px] rounded-[94px_94px_20px_20px] overflow-hidden bg-[#fdf8fa] relative flex items-center justify-center border-2 border-white">
              <img
                src={currentPhoto}
                alt="រូបថតគូស្វាមីភរិយា ស៊ឹម សុផល & ម៉ាក់ កញ្ញាដាវីន"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to default generated photo if custom fails
                  const target = e.currentTarget;
                  if (target.src !== defaultPhoto) {
                    target.src = defaultPhoto;
                  }
                }}
              />

              {/* Quick actions hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed(true)}
                  className="p-2 rounded-full bg-white/90 text-slate-800 hover:bg-white transition-transform active:scale-90 shadow-md cursor-pointer"
                  title="ពង្រីកមើលរូបភាព"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-full bg-[#43281c] text-amber-100 hover:bg-[#341d13] transition-transform active:scale-90 shadow-md cursor-pointer"
                  title="ប្តូររូបថតថ្មី"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Golden Corner Tag */}
          <div className="absolute -bottom-2 -right-1 bg-gradient-to-r from-[#43281c] to-[#7f5539] text-amber-100 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 border border-amber-300">
            <Sparkles className="w-2.5 h-2.5 text-amber-200" />
            <span>សុភមង្គល</span>
          </div>
        </div>

        {/* Action Controls for uploading / resetting custom couple photo */}
        <div className="flex items-center gap-2 mt-3 text-xs font-kantumruy">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#faedf2] hover:bg-[#f6e1eb] text-[#43281c] border border-[#edd3dd] text-[11px] font-medium transition-colors cursor-pointer"
          >
            <Camera className="w-3 h-3 text-[#7f5539]" />
            <span>ប្តូររូបថតផ្ទាល់ខ្លួន</span>
          </button>

          {currentPhoto !== defaultPhoto && (
            <button
              type="button"
              onClick={resetToDefault}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-red-50 text-[#8b4f4f] border border-[#e2c7c7] text-[11px] transition-colors cursor-pointer"
              title="ត្រឡប់ទៅរូបដើមវិញ"
            >
              <RefreshCw className="w-3 h-3" />
              <span>រូបដើម</span>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-lg max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute -top-10 right-0 text-white hover:text-amber-300 p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={currentPhoto}
              alt="រូបថតគូស្វាមីភរិយា"
              className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl border-2 border-amber-300/60"
            />
            <p className="text-amber-100 font-moul text-sm mt-3 text-center">
              ស៊ឹម សុផល & ម៉ាក់ កញ្ញាដាវីន
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
