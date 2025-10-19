"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-200">
        <Image
          src={images[selectedImage]}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {images.slice(0, 3).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-24 w-full rounded-lg overflow-hidden bg-gray-200 transition-all duration-200 ${
                selectedImage === index
                  ? "ring-4 ring-primary-600 scale-105"
                  : "hover:ring-2 hover:ring-primary-400 hover:scale-102"
              }`}
            >
              <Image
                src={image}
                alt={`${name} - Image ${index + 1}`}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 33vw, 16vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=="
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
