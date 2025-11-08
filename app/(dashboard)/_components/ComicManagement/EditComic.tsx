/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CardSmallScreen } from "@/components/Shared/CardSmallScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSingleComicQuery,
  useUpdateComicMutation,
} from "@/rtk/features/all-apis/comics/comicsApi";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ModalProps {
  onClose: () => void;
  comicId: string;
}

interface Episode {
  images_urls: any;
  id?: string;
  title: string;
  thumbnail: File | null;
  thumbnail_url?: string;
  images: File[];
  episode_number: number;
}

export default function EditComic({ onClose, comicId }: ModalProps) {
  const [comicTitle, setComicTitle] = useState("");
  const [authorCreator, setAuthorCreator] = useState("");
  const [status, setStatus] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailRemoved, setThumbnailRemoved] = useState(false);

  const [updateComic] = useUpdateComicMutation();
  const { data } = useGetSingleComicQuery(comicId);
  const comic = data?.data;

  // Prefill the form with existing comic data
  useEffect(() => {
    if (comic) {
      setComicTitle(comic.title || "");
      setAuthorCreator(comic.author || "");
      setStatus(comic.status || "");
      setDescription(comic.description || "");

      if (comic.episodes?.length > 0) {
        const formattedEpisodes = comic.episodes.map((ep: any) => ({
          id: ep.id,
          title: ep.title,
          thumbnail: null,
          thumbnail_url: ep.thumbnail_url,
          images: [],
          images_urls: ep.images_urls || [],
          episode_number: ep.episode_number,
        }));
        setEpisodes(formattedEpisodes);
      }
    }
  }, [comic]);

  // Handle thumbnail change
  const handleThumbnailUpload = (file: File | null) => setThumbnail(file);

  // Update episode title
  const handleEpisodeTitle = (id: string | undefined, title: string) => {
    setEpisodes((prev) =>
      prev.map((ep) => (ep.id === id ? { ...ep, title } : ep))
    );
  };

  // Update episode thumbnail
  const handleEpisodeThumbnail = (
    id: string | undefined,
    file: File | null
  ) => {
    setEpisodes((prev) =>
      prev.map((ep) => (ep.id === id ? { ...ep, thumbnail: file } : ep))
    );
  };

  // Update episode images
  const handleEpisodeImages = (
    id: string | undefined,
    files: FileList | null
  ) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setEpisodes((prev) =>
      prev.map((ep) =>
        ep.id === id ? { ...ep, images: [...ep.images, ...newFiles] } : ep
      )
    );
  };

  // Add new episode
  const editEpisode = () => {
    const newEpisode: Episode = {
      episode_number: episodes.length + 1,
      title: "",
      thumbnail: null,
      images: [],
      images_urls: undefined,
    };
    setEpisodes([...episodes, newEpisode]);
  };

  // Remove episode
  const removeEpisode = (index?: number) => {
    setEpisodes((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      const renumbered = updated.map((ep, i) => ({
        ...ep,
        episode_number: i + 1,
      }));

      return renumbered;
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("title", comicTitle);
      formData.append("author", authorCreator);
      formData.append("status", status);
      formData.append("description", description);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      episodes.forEach((ep, index) => {
        if (ep.id) formData.append(`episodes[${index}][id]`, ep.id);
        formData.append(
          `episodes[${index}][episode_number]`,
          String(ep.episode_number)
        );
        formData.append(`episodes[${index}][title]`, ep.title);
        if (ep.thumbnail)
          formData.append(`episodes[${index}][thumbnail]`, ep.thumbnail);

        ep.images.forEach((img) => {
          formData.append(`episodes[${index}][images][]`, img);
        });
      });

      const response = await updateComic({ id: comicId, data: formData });

      if (response?.data?.success) {
        toast.success("Comic updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update comic.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Error submitting comic.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <CardSmallScreen className="w-full max-w-5xl relative max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Update Comic</h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X size={20} className="cursor-pointer" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Comic Title */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Comic Title
              </label>
              <Input
                placeholder="Enter comic title"
                value={comicTitle}
                onChange={(e) => setComicTitle(e.target.value)}
                className="bg-gray-100 border-none text-sm"
              />
            </div>

            {/* Author */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Author/Creator
              </label>
              <Input
                placeholder="Enter author name"
                value={authorCreator}
                onChange={(e) => setAuthorCreator(e.target.value)}
                className="bg-gray-100 border-none text-sm"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-9 px-3 rounded-md bg-gray-100 border-none text-sm"
              >
                <option value="">Select Status</option>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Thumbnail
              </label>
              <label className="flex items-center gap-2 h-10 px-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
                <span className="text-xs text-purple-700 bg-purple-100 rounded-md px-3 py-1 truncate">
                  {thumbnail ? thumbnail.name : "Choose File"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleThumbnailUpload(e.target.files?.[0] || null)
                  }
                />
              </label>

              {!thumbnailRemoved && (thumbnail || comic?.thumbnail_url) && (
                <div className="mt-3 relative inline-block">
                  <p className="text-xs text-gray-500 mb-1">Preview:</p>
                  <div className="relative w-32 h-32">
                    <Image
                      src={
                        thumbnail
                          ? URL.createObjectURL(thumbnail)
                          : comic.thumbnail_url
                      }
                      alt="Comic Thumbnail"
                      className="w-32 h-32 object-cover rounded-md border"
                      height={400}
                      width={400}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setThumbnail(null);
                        setThumbnailRemoved(true);
                      }}
                      className="absolute top-1 right-1 bg-white/80 hover:bg-red-100 text-red-600 rounded-full p-1 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Description
              </label>
              <Textarea
                placeholder="Write description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-100 border-none text-sm h-28"
              />
            </div>
          </div>

          {/* Right Column - Episodes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Episodes</h4>
              <Button
                onClick={editEpisode}
                className="bg-green-600 hover:bg-green-700 text-white h-8 px-4 text-sm cursor-pointer"
              >
                Add Episode
              </Button>
            </div>

            <div
              className={`space-y-3 ${
                episodes.length >= 3 ? "max-h-screen overflow-y-auto pr-2" : ""
              }`}
            >
              {episodes.map((ep, index) => (
                <div
                  key={ep.id ?? index}
                  className="border rounded-md p-6 bg-gray-50 space-y-3"
                >
                  <div
                    className="relative cursor-pointer"
                    onClick={() => removeEpisode(index)}
                  >
                    <X className="h-3 w-3 absolute right-0" />
                  </div>

                  <div className="grid grid-cols-6 gap-2 items-start">
                    {/* ✅ Left column: Episode number + Thumbnail preview */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-col items-center">
                        <label className="text-xs font-medium block mb-1 text-nowrap">
                          Episode No
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={ep.episode_number}
                          onChange={(e) => {
                            const newNumber = parseInt(e.target.value, 10) || 0;
                            setEpisodes((prev) =>
                              prev.map((episode) =>
                                episode.id === ep.id
                                  ? { ...episode, episode_number: newNumber }
                                  : episode
                              )
                            );
                          }}
                          className="w-12 h-12 text-center font-semibold bg-gray-200 text-purple-800 rounded-md border-none focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                      </div>

                      {/* Thumbnail Preview BELOW episode number */}
                      <div className="w-12 mt-2">
                        {(ep.thumbnail || ep.thumbnail_url) && (
                          <div className="relative w-20 h-20 mt-1">
                            <Image
                              src={
                                ep.thumbnail
                                  ? URL.createObjectURL(ep.thumbnail)
                                  : ep.thumbnail_url || ""
                              }
                              alt={`Episode ${index + 1} Thumbnail`}
                              className="w-20 h-20 object-cover rounded-md border"
                              height={400}
                              width={400}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setEpisodes((prev) =>
                                  prev.map((episode) =>
                                    episode.id === ep.id
                                      ? {
                                          ...episode,
                                          thumbnail: null,
                                          thumbnail_url: undefined,
                                        }
                                      : episode
                                  )
                                );
                              }}
                              className="absolute top-1 right-1 bg-white/80 hover:bg-red-100 text-red-600 rounded-full p-1 shadow cursor-pointer"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ✅ Right column: Episode title + Thumbnail upload input */}
                    <div className="col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Title Input */}
                      <div>
                        <label className="text-xs font-medium block mb-1">
                          Episode Title
                        </label>
                        <Input
                          placeholder={`Episode ${index + 1} title`}
                          value={ep.title}
                          onChange={(e) =>
                            handleEpisodeTitle(ep.id, e.target.value)
                          }
                          className="bg-white border text-sm"
                        />
                      </div>

                      {/* Thumbnail upload field */}
                      <div>
                        <label className="text-xs font-medium block mb-1">
                          Episode Thumbnail
                        </label>
                        <label className="flex items-center gap-2 px-3 bg-white border rounded-md cursor-pointer hover:bg-gray-100">
                          <span className="text-xs text-purple-700 bg-purple-100 rounded-md px-3 py-1 truncate">
                            {ep.thumbnail ? ep.thumbnail.name : "Choose File"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleEpisodeThumbnail(
                                ep.id,
                                e.target.files?.[0] || null
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium block mb-1">
                      Episode Images
                    </label>
                    <label className="flex items-center gap-2 px-3 bg-white border rounded-md cursor-pointer hover:bg-gray-100">
                      <span className="text-xs text-purple-700 bg-purple-100 rounded-md px-3 py-1 truncate">
                        {ep.images.length > 0
                          ? `${ep.images.length} image(s) selected`
                          : "Choose Images"}
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleEpisodeImages(ep.id, e.target.files)
                        }
                      />
                    </label>

                    {(ep.images.length > 0 ||
                      (ep.images_urls && ep.images_urls.length > 0)) && (
                      <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {/* Existing images from backend */}

                        {ep.images_urls?.map(
                          (imgUrl: string | Blob | undefined, i: number) => (
                            <div
                              key={`url-${i}`}
                              className="relative w-24 h-24"
                            >
                              <div className="relative w-24 h-24">
                                <Image
                                  src={
                                    imgUrl instanceof Blob
                                      ? URL.createObjectURL(imgUrl)
                                      : imgUrl || ""
                                  }
                                  alt={`Episode Image ${i + 1}`}
                                  className="w-24 h-24 object-cover rounded-md border"
                                  height={400}
                                  width={400}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEpisodes((prev) =>
                                      prev.map((episode) =>
                                        episode.id === ep.id
                                          ? {
                                              ...episode,
                                              images_urls:
                                                episode.images_urls?.filter(
                                                  (_: any, index: number) =>
                                                    index !== i
                                                ),
                                            }
                                          : episode
                                      )
                                    )
                                  }
                                  className="absolute top-1 right-1 bg-white/80 hover:bg-red-100 text-red-600 rounded-full p-1 shadow cursor-pointer"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          )
                        )}

                        {/* Newly added local images */}
                        {ep.images.map((file, i) => (
                          <div key={`file-${i}`} className="relative w-24 h-24">
                            <div className="relative w-24 h-24">
                              <Image
                                src={URL.createObjectURL(file)}
                                alt={`Uploaded Image ${i + 1}`}
                                className="w-24 h-24 object-cover rounded-md border"
                                height={400}
                                width={400}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setEpisodes((prev) =>
                                    prev.map((episode) =>
                                      episode.id === ep.id
                                        ? {
                                            ...episode,
                                            images: episode.images.filter(
                                              (_, index) => index !== i
                                            ),
                                          }
                                        : episode
                                    )
                                  )
                                }
                                className="absolute top-1 right-1 bg-white/80 hover:bg-red-100 text-red-600 rounded-full p-1 shadow cursor-pointer"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </CardSmallScreen>
    </div>
  );
}
