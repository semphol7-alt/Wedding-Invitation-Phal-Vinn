import React, { useState, useRef } from 'react';
import {
  Images,
  ZoomIn,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Download,
  Sparkles,
  Camera
} from 'lucide-react';

import photo1 from '../assets/images/khmer_wedding_couple_1792157328614.jpg';
import photo2 from '../assets/images/wedding_prewedding_formal_1792158729341.jpg';
import photo3 from '../assets/images/wedding_rings_hands_1792158729971.jpg';
import photo4 from '../assets/images/wedding_candid_joy_1792158731021.jpg';
import photo5 from '../assets/images/wedding_traditional_kbach_1792158732005.jpg';

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'traditional' | 'prewedding';
  likes: number;
}

const INITIAL_PHOTOS: GalleryPhoto[] = [
  {
    id: 'p1',
    url: photo1,
    caption: 'សម្លៀកបំពាក់ក្សត្រប្រពៃណីខ្មែរ ពណ៌ត្បូងមរកត និងមាស',
    category: 'traditional',
    likes: 284,
  },
  {
    id: 'p2',
    url: photo2,
    caption: 'Pre-Wedding រ៉ូបកូនក្រមុំពណ៌ស និងឈុត Tuxedo ស',
    category: 'prewedding',
    likes: 312,
  },
  {
    id: 'p3',
    url: photo3,
    caption: 'ចិញ្ចៀនអាពាហ៍ពិពាហ៍មាស និងស្នាមញញឹមសុភមង្គល',
    category: 'traditional',
    likes: 456,
  },
  {
    id: 'p4',
    url: photo4,
    caption: 'ស្នាមញញឹមពោរពេញដោយក្តីស្រឡាញ់ និងភាពផ្អែមល្ហែម',
    category: 'prewedding',
    likes: 395,
  },
  {
    id: 'p5',
    url: photo5,
    caption: 'រាជមង្គលប្រពៃណីខ្មែរ ឈុតក្បាច់បុរាណពណ៌មាស-ក្រហមឆ្អៅ',
    category: 'traditional',
    likes: 520,
  },
];

export const WeddingPhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(INITIAL_PHOTOS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'traditional' | 'prewedding'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [likedPhotoIds, setLikedPhotoIds] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPhotos = photos.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isCurrentlyLiked = !!likedPhotoIds[id];

    setLikedPhotoIds((prev) => ({
      ...prev,
      [id]: !isCurrentlyLiked,
    }));

    setPhotos((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likes: item.likes + (isCurrentlyLiked ? -1 : 1) }
          : item
      )
    );
  };

  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const newPhoto: GalleryPhoto = {
            id: `custom_${Date.now()}_${index}`,
            url: reader.result,
            caption: 'រូបថតអនុស្សាវរីយ៍មង្គលការ',
            category: 'prewedding',
            likes: 1,
          };
          setPhotos((prev) => [newPhoto, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <div className="my-6 rounded-2xl bg-[#fdf6f8] border-2 border-[#edd3dd] p-4 sm:p-5 text-center shadow-xs">
      {/* Gallery Header */}
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h3 className="font-moul text-sm sm:text-base text-[#43281c]">
          វិចិត្រសាលរូបថត (GALLERY)
        </h3>
        <Sparkles className="w-4 h-4 text-amber-500" />
      </div>

      <p className="text-[11px] text-[#7f5539] font-kantumruy mb-4">
        កម្រងរូបភាពអនុស្សាវរីយ៍ និង Pre-Wedding របស់គូស្វាមីភរិយាថ្មី
      </p>

      {/* Filter Tabs + Add Photo Action */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#eed7e0]">
        {/* Category Pills */}
        <div className="flex items-center gap-1 bg-[#fae8ee] p-1 rounded-xl text-xs font-kantumruy">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-white text-[#43281c] shadow-xs font-bold'
                : 'text-[#7f5539] hover:text-[#43281c]'
            }`}
          >
            ទាំងអស់ ({photos.length})
          </button>
          <button
            onClick={() => setSelectedFilter('prewedding')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              selectedFilter === 'prewedding'
                ? 'bg-white text-[#43281c] shadow-xs font-bold'
                : 'text-[#7f5539] hover:text-[#43281c]'
            }`}
          >
            Pre-Wedding
          </button>
          <button
            onClick={() => setSelectedFilter('traditional')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              selectedFilter === 'traditional'
                ? 'bg-white text-[#43281c] shadow-xs font-bold'
                : 'text-[#7f5539] hover:text-[#43281c]'
            }`}
          >
            ប្រពៃណីខ្មែរ
          </button>
        </div>

        {/* Upload Custom Photos Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleAddPhotos}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#43281c] hover:bg-[#341d13] text-amber-100 text-xs font-kantumruy font-bold transition-all shadow-xs cursor-pointer"
            title="បន្ថែមរូបភាពពីទូរស័ព្ទ / កុំព្យូទ័រ"
          >
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>+ បន្ថែមរូបថត</span>
          </button>
        </div>
      </div>

      {/* 2-Column Photo Grid (matching the user's reference sample 646.jpg) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {filteredPhotos.map((photo, index) => {
          const isLiked = !!likedPhotoIds[photo.id];
          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#c8dcd0] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Photo Image Aspect 3:4 */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#eef4f0]">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Scrim Gradient for hover / mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Floating Heart / Like Button */}
                <button
                  type="button"
                  onClick={(e) => handleLike(photo.id, e)}
                  className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 shadow-sm cursor-pointer ${
                    isLiked
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                  title={isLiked ? 'ឈប់ចូលចិត្ត' : 'ចូលចិត្ត'}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isLiked ? 'fill-white stroke-white' : ''
                    }`}
                  />
                </button>

                {/* Zoom In Badge */}
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Photo Caption & Likes Bottom Bar */}
              <div className="p-2 bg-white text-left font-kantumruy flex items-center justify-between text-[10px] text-[#4a5f51]">
                <span className="truncate pr-1 font-medium">{photo.caption}</span>
                <span className="flex items-center gap-0.5 text-[#e21a22] font-bold shrink-0">
                  <Heart className="w-2.5 h-2.5 fill-red-500 text-red-500" />
                  {photo.likes}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-[#e5efe8] text-[11px] text-[#6b8273] font-kantumruy">
        ចុចលើរូបភាពដើម្បីពង្រីកមើលទំហំធំ និងទាញយក (Download)
      </div>

      {/* Lightbox Modal with Fullscreen, Prev/Next, and Download */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-2">
              <span className="text-xs font-kantumruy text-amber-200 font-bold">
                រូបភាពទី {activePhotoIndex + 1} នៃ {filteredPhotos.length}
              </span>

              <div className="flex items-center gap-2">
                {/* Download Button */}
                <a
                  href={filteredPhotos[activePhotoIndex].url}
                  download={`khmer-wedding-photo-${activePhotoIndex + 1}.jpg`}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="ទាញយករូបថតនេះ"
                >
                  <Download className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="បិទ"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Lightbox Image Frame */}
            <div className="relative max-h-[75vh] w-auto overflow-hidden rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center bg-black">
              <img
                src={filteredPhotos[activePhotoIndex].url}
                alt={filteredPhotos[activePhotoIndex].caption}
                className="max-h-[75vh] max-w-full object-contain select-none"
              />

              {/* Prev Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPhoto();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-transform active:scale-90 cursor-pointer"
                  title="រូបមុន"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPhoto();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-transform active:scale-90 cursor-pointer"
                  title="រូបបន្ទាប់"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Caption & Like under lightbox */}
            <div className="w-full flex items-center justify-between text-white mt-3 px-3">
              <p className="text-xs font-kantumruy text-gray-200">
                {filteredPhotos[activePhotoIndex].caption}
              </p>

              <button
                onClick={() => handleLike(filteredPhotos[activePhotoIndex].id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-kantumruy cursor-pointer transition-colors ${
                  likedPhotoIds[filteredPhotos[activePhotoIndex].id]
                    ? 'bg-red-500 text-white font-bold'
                    : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    likedPhotoIds[filteredPhotos[activePhotoIndex].id]
                      ? 'fill-white'
                      : ''
                  }`}
                />
                <span>{filteredPhotos[activePhotoIndex].likes}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
