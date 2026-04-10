// src/components/Gallery.tsx (Final Slideshow Version)

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../AppContext';
import { Image as ImageIcon } from 'lucide-react';

// --- NEW: Import Swiper components and styles ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// ------------------------------------------------

// --- YOUR CLOUDINARY DETAILS ---
// Double-check this is your correct Cloud Name from your dashboard.
const CLOUDINARY_CLOUD_NAME = 'invitationpic';
const CLOUDINARY_TAG = 'wedding-gallery';       // The tag you must use when uploading
// --------------------------------

interface CloudinaryImage {
  public_id: string;
  version: number;
}

export const Gallery: React.FC = () => {
  const { t } = useAppContext();
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${CLOUDINARY_TAG}.json`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.resources) {
          setImages(data.resources);
        }
      })
      .catch(error => console.error('Error fetching gallery images:', error))
      .finally(() => setIsLoading(false)); // Stop loading regardless of outcome
  }, []);

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-glow mb-4">{t.gallery.title}</h2>
        <p className="opacity-70 max-w-md mx-auto">{t.gallery.desc}</p>
      </div>

      <div className="relative aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-gold/50 bg-black/20">
        {isLoading ? (
          // --- LOADING STATE ---
          <div className="w-full h-full flex flex-col items-center justify-center">
            <ImageIcon size={48} className="text-gold/50 mb-4 animate-pulse" />
            <p className="opacity-70">Loading memories...</p>
          </div>
        ) : images.length > 0 ? (
          // --- SLIDESHOW RENDERED HERE ---
          <Swiper
            modules={[EffectFade, Autoplay, Navigation, Pagination]}
            effect="fade"
            loop={true}
            autoplay={{
              delay: 2500, // Changes picture every 2.5 seconds (you can set to 1000 for 1 second)
              disableOnInteraction: false,
            }}
            navigation={true} // Adds next/prev arrows
            pagination={{ clickable: true }} // Adds dots at the bottom
            className="w-full h-full"
          >
            {images.map((image) => (
              <SwiperSlide key={image.public_id}>
                <img
                  src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,g_auto,w_1280,h_720/v${image.version}/${image.public_id}.jpg`}
                  alt="Wedding gallery"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // --- NO IMAGES FOUND STATE ---
          <div className="w-full h-full flex flex-col items-center justify-center">
            <ImageIcon size={48} className="text-gold/50 mb-4" />
            <p className="opacity-70">No photos found in the gallery yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};
