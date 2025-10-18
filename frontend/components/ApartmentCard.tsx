"use client";

import Link from "next/link";
import Image from "next/image";
import type { Apartment } from "@/lib/types";

interface ApartmentCardProps {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const formatArea = (area: string) => {
    return `${parseFloat(area).toFixed(0)} m²`;
  };

  const imageUrl =
    apartment.images && apartment.images.length > 0
      ? apartment.images[0]
      : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800";

  return (
    <Link href={`/apartments/${apartment.id}`}>
      <div className="card group cursor-pointer">
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <Image
            src={imageUrl}
            alt={apartment.name}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=="
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-semibold text-primary-600">
            {apartment.project}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {apartment.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            Unit: {apartment.unitNumber}
          </p>

          <p className="text-2xl font-bold text-primary-600 mb-3">
            {formatPrice(apartment.price)}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>{apartment.bedrooms} Beds</span>
            </div>

            <div className="flex items-center gap-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              <span>{apartment.bathrooms} Baths</span>
            </div>

            <div className="flex items-center gap-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              <span>{formatArea(apartment.area)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
