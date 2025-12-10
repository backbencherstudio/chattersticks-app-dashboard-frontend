"use client";

import { CardSmallScreen } from "@/components/Shared/CardSmallScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateComicMutation } from "@/rtk/features/all-apis/comics/comicsApi";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ModalProps {
  onClose: () => void;
}

interface Episode {
  id: number;
  title: string;
  thumbnail: File | null;
  images: File[];
}

export default function AddComicModal({ onClose }: ModalProps) {
  const [comicTitle, setComicTitle] = useState("");
  const [authorCreator, setAuthorCreator] = useState("");
  const [status, setStatus] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [episodes, setEpisodes] = useState<Episode[]>([
    { id: 1, title: "", thumbnail: null, images: [] },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [CreateComic] = useCreateComicMutation();

  // Add new episode
  const addEpisode = () => {
    setEpisodes([
      ...episodes,
      { id: episodes.length + 1, title: "", thumbnail: null, images: [] },
    ]);
  };

  // Update episode title
  const updateEpisodeTitle = (id: number, title: string) => {
    setEpisodes(episodes.map((ep) => (ep.id === id ? { ...ep, title } : ep)));
  };

  // Update episode thumbnail
  const handleEpisodeThumbnail = (id: number, file: File | null) => {
    setEpisodes(
      episodes.map((ep) => (ep.id === id ? { ...ep, thumbnail: file } : ep))
    );
  };

  // Update episode images
  const handleEpisodeImages = (id: number, files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setEpisodes(
      episodes.map((ep) =>
        ep.id === id ? { ...ep, images: [...ep.images, ...fileArray] } : ep
      )
    );
  };

  // Handle main thumbnail
  const handleThumbnailUpload = (file: File | null) => {
    setThumbnail(file);
  };

  // ✅ FIXED handleSubmit (uses FormData)
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", comicTitle);
      formData.append("author", authorCreator);
      formData.append("status", status);
      formData.append("description", description);

      if (thumbnail) formData.append("thumbnail", thumbnail);

      // Append each episode
      episodes.forEach((ep, index) => {
        formData.append(
          `episodes[${index}][episode_number]`,
          String(index + 1)
        );
        formData.append(`episodes[${index}][title]`, ep.title);
        if (ep.thumbnail)
          formData.append(`episodes[${index}][thumbnail]`, ep.thumbnail);

        ep.images.forEach((img, i) => {
          formData.append(`episodes[${index}][images][${i}]`, img);
        });
      });

      const response = await CreateComic(formData);

      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }

      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error submitting comic:");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <CardSmallScreen className="w-full max-w-5xl relative max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add New Comic</h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">
                Comic Title
              </label>
              <Input
                placeholder="Enter comic title"
                value={comicTitle}
                onChange={(e) => setComicTitle(e.target.value)}
                className="bg-gray-100 border-none text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Author/Creator
              </label>
              <Input
                placeholder="Enter author name"
                value={authorCreator}
                onChange={(e) => setAuthorCreator(e.target.value)}
                className="bg-gray-100 border-none text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Status</label>
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

            <div>
              <label className="text-sm font-medium block mb-2">
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
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
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

          {/* Right Side - Episodes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Episodes</h4>
              <Button
                onClick={addEpisode}
                className="bg-green-600 hover:bg-green-700 text-white h-8 px-4 text-sm"
              >
                Add Episode
              </Button>
            </div>

            <div
              className={`space-y-3 ${
                episodes.length >= 3 ? "max-h-[400px] overflow-y-auto pr-2" : ""
              }`}
            >
              {episodes.map((ep, index) => (
                <div
                  key={ep.id}
                  className="border rounded-md p-3 bg-gray-50 space-y-3"
                >
                  <div
                    className="relative cursor-pointer"
                    onClick={() => removeEpisode(index)}
                  >
                    <X className="h-3 w-3 absolute right-0" />
                  </div>

                  <div className="grid grid-cols-6 gap-2 items-center">
                    <div>
                      <h2 className="p-3 bg-gray-200 text-purple-800 text-center text-sm rounded-md">
                        {index + 1}
                      </h2>
                    </div>
                    <div className="col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium block mb-1">
                          Episode Title
                        </label>
                        <Input
                          placeholder={`Episode ${index + 1} title`}
                          value={ep.title}
                          onChange={(e) =>
                            updateEpisodeTitle(ep.id, e.target.value)
                          }
                          className="bg-white border text-sm"
                        />
                      </div>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Create Comic Series"}
          </Button>
        </div>
      </CardSmallScreen>
    </div>
  );
}
