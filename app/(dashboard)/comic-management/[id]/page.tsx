"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetSingleComicQuery } from "@/rtk/features/all-apis/comics/comicsApi";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function SingleComicPage() {
  const router = useRouter();
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetSingleComicQuery(id);
  const comic = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading comic details...</p>
      </div>
    );
  }

  if (!comic) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Comic not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/comic-management")}
            className="rounded-full cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-semibold text-gray-800">
            Comic Details
          </h2>
        </div>
        <Button
          onClick={() => refetch()}
          className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
        >
          Refresh
        </Button>
      </div>

      {/* Main Comic Info */}
      <Card className="p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={comic?.thumbnail_url}
            alt={comic?.title}
            className="w-40 h-40 object-cover rounded-lg border"
            height={400}
            width={400}
            crossOrigin="anonymous"
          />

          <div className="space-y-2">
            <h3 className="text-xl font-bold">{comic.title}</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Author:</span> {comic.author}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold ${
                  comic.status === "PUBLISHED"
                    ? "bg-green-100 text-green-700"
                    : comic.status === "DRAFT"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {comic.status}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Description:</span>{" "}
              {comic.description}
            </p>

            <div className="flex gap-6 mt-3 text-sm text-gray-600">
              <p>
                <span className="font-medium">Downloads:</span>{" "}
                {comic.download_count}
              </p>
              <p>
                <span className="font-medium">Views:</span> {comic.view_count}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Episodes List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Episodes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {comic.episodes?.map((ep: any) => (
            <Card key={ep.id} className="p-4 hover:shadow-md transition">
              <Image
                src={ep.thumbnail_url}
                alt={ep.title}
                className="w-full h-40 object-cover rounded-md mb-3 border"
                height={400}
                width={400}
                crossOrigin="anonymous"
              />
              <h4 className="font-semibold text-gray-800">{ep.title}</h4>
              <p className="text-sm text-gray-500 mb-2">
                Episode {ep.episode_number}
              </p>

              {/* Images */}
              <div className="grid grid-cols-3 gap-2">
                {ep.images_urls?.map((img: string, i: number) => (
                  <Image
                    key={i}
                    src={img}
                    alt={`Episode ${ep.episode_number} - ${i + 1}`}
                    className="w-full h-16 object-cover rounded"
                    height={400}
                    width={400}
                    crossOrigin="anonymous"
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
