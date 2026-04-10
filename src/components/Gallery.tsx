// src/components/Gallery.tsx (Final Updated Version with Better Error Handling)

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../AppContext';
import { Image as ImageIcon, AlertCircle } from 'lucide-react';

// --- Swiper Slideshow Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// =========================================================================
// --- YOUR CLOUDINARY DETAILS ---
// This code is set up to use your specific Cloudinary account.
// It will ONLY work if you upload photos to Cloudinary and give them
// the EXACT tag 'wedding-gallery'.

const CLOUDINARY_CLOUD_NAME = 'invitationpic';
const CLOUDINARY_TAG = 'wedding-gallery';

// =========================================================================

interface CloudinaryImage {
  public_id: string;
  version: number;
}

export const Gallery: React.FC = () => {
  const { t } = useAppContext();
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This is the special URL that asks Cloudinary for a list of your photos.
    const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${CLOUDINARY_TAG}.json`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.resources && data.resources.length > 0) {
          setImages(data.resources);
        }
        // If data.resources is empty, the images array will remain empty.
      })
      .catch(error => {
        console.error('Error fetching gallery images from Cloudinary:', error);
        // In case of an error, we still want to stop loading.
      })
      .finally(() => {
        setIsLoading(false); // Stop loading after the fetch is complete.
      });
  }, []); // The empty array [] means this runs only once.

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-glow mb-4">{t.gallery.title}</h2>
        <p className="opacity-70 max-w-md mx-auto">{t.gallery.desc}</p>
      </div>

      <div className="relative aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-gold/50 bg-black/20 flex items-center justify-center">
        {isLoading ? (
          // --- LOADING STATE ---
          <div className="flex flex-col items-center justify-center animate-pulse">
            <ImageIcon size={48} className="text-gold/50 mb-4" />
            <p className="opacity-70">Loading memories...</p>
          </div>

        ) : images.length > 0 ? (
          // --- SLIDESHOW (SUCCESS STATE) ---
          <Swiper
            modules={[EffectFade, Autoplay, Navigation, Pagination]}
            effect="fade"
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={true}
            pagination={{ clickable: true }}
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
          // --- NEW: HELPFUL "NO IMAGES FOUND" MESSAGE ---
          <div className="text-center p-4">
            <AlertCircle size={48} className="text-yellow-400 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Photos Found</h3>
            <p className="text-sm opacity-80">
              To fix this, please go to your Cloudinary Media Library and add the tag
              <strong className="text-gold mx-1 font-mono bg-white/10 px-1.5 py-0.5 rounded">wedding-gallery</strong>
              to your uploaded photos.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};