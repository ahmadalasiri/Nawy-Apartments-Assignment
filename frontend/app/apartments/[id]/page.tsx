import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { apartmentsAPI } from "@/lib/api";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const apartment = await apartmentsAPI.getById(id);
    return {
      title: `${apartment.name} - Nawy`,
      description: apartment.description,
    };
  } catch {
    return {
      title: "Apartment Not Found - Nawy",
    };
  }
}

export default async function ApartmentDetailPage({ params }: PageProps) {
  let apartment;

  try {
    const { id } = await params;
    apartment = await apartmentsAPI.getById(id);
  } catch (error) {
    notFound();
  }

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

  const images =
    apartment.images && apartment.images.length > 0
      ? apartment.images
      : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={images[0]}
              alt={apartment.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {images.slice(1, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative h-24 w-full rounded-lg overflow-hidden bg-gray-200"
                >
                  <Image
                    src={image}
                    alt={`${apartment.name} - Image ${index + 2}`}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 16vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=="
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                {apartment.project}
              </span>
              <span className="text-gray-500 text-sm">
                Unit {apartment.unitNumber}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {apartment.name}
            </h1>
            <p className="text-4xl font-bold text-primary-600">
              {formatPrice(apartment.price)}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <svg
                className="w-8 h-8 mx-auto mb-2 text-gray-600"
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
              <p className="text-2xl font-bold text-gray-900">
                {apartment.bedrooms}
              </p>
              <p className="text-sm text-gray-600">Bedrooms</p>
            </div>

            <div className="text-center">
              <svg
                className="w-8 h-8 mx-auto mb-2 text-gray-600"
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
              <p className="text-2xl font-bold text-gray-900">
                {apartment.bathrooms}
              </p>
              <p className="text-sm text-gray-600">Bathrooms</p>
            </div>

            <div className="text-center">
              <svg
                className="w-8 h-8 mx-auto mb-2 text-gray-600"
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
              <p className="text-2xl font-bold text-gray-900">
                {formatArea(apartment.area)}
              </p>
              <p className="text-sm text-gray-600">Area</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {apartment.description}
            </p>
          </div>

          {/* Contact Button */}
          <button className="w-full btn-primary py-3 text-lg">
            Contact Agent
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Property Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Unit Number</span>
            <span className="font-semibold">{apartment.unitNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Project</span>
            <span className="font-semibold">{apartment.project}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Bedrooms</span>
            <span className="font-semibold">{apartment.bedrooms}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Bathrooms</span>
            <span className="font-semibold">{apartment.bathrooms}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Area</span>
            <span className="font-semibold">{formatArea(apartment.area)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Price</span>
            <span className="font-semibold">
              {formatPrice(apartment.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
