'use client';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { CardSmallScreen } from '@/components/Shared/CardSmallScreen';

interface ModalProps {
  onClose: () => void;
}

interface Episode {
  id: number;
  title: string;
  thumbnail: File | null;
  images: File[];
}

interface Comic {
  id: number;
  title: string;
  author: string;
  episodes: number;
  downloads: number;
  status: string;
}

export default function AddComicModal({ onClose }: ModalProps) {
  const [comicTitle, setComicTitle] = useState('');
  const [authorCreator, setAuthorCreator] = useState('');
  const [status, setStatus] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [statuses, setStatuses] = useState<string[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([
    { id: 1, title: '', thumbnail: null, images: [] },
  ]);

  const [submitText, setSubmitText] = useState('Create Comic Series');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch statuses from JSON
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await fetch('/data/topComics.json');
        const data: { comics: Comic[] } = await res.json();
        const uniqueStatuses = [
          ...new Set(data.comics.map(comic => comic.status)),
        ];
        setStatuses(uniqueStatuses);
      } catch (error) {
        console.error('Error loading statuses:', error);
      }
    };
    fetchStatuses();
  }, []);

  const addEpisode = () => {
    setEpisodes([
      ...episodes,
      { id: episodes.length + 1, title: '', thumbnail: null, images: [] },
    ]);
  };

  const updateEpisodeTitle = (id: number, title: string) => {
    setEpisodes(episodes.map(ep => (ep.id === id ? { ...ep, title } : ep)));
  };

  const handleEpisodeThumbnail = (id: number, file: File | null) => {
    setEpisodes(
      episodes.map(ep => (ep.id === id ? { ...ep, thumbnail: file } : ep))
    );
  };

  const handleEpisodeImages = (id: number, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setEpisodes(
        episodes.map(ep =>
          ep.id === id ? { ...ep, images: [...ep.images, ...fileArray] } : ep
        )
      );
    }
  };

  const handleThumbnailUpload = (file: File | null) => {
    setThumbnail(file);
  };

  // Handle submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitText('Updated Comic Series');

    try {
      const payload = {
        title: comicTitle,
        author: authorCreator,
        status,
        description,
        episodes,
        thumbnail,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Comic submitted:', payload);
    } catch (error) {
      console.error('Error submitting comic:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <CardSmallScreen className="w-full max-w-5xl relative max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-6 sm:py-6 flex items-center justify-between ">
          <h3 className="text-base sm:text-lg font-semibold ">
            User Profile: comic_fan_78
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content - Responsive Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* LEFT SIDE - Comic Info */}
          <div className="space-y-4">
            {/* Comic Title */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Comic Title
              </label>
              <Input
                placeholder="Enter comic title"
                value={comicTitle}
                onChange={e => setComicTitle(e.target.value)}
                className="w-full bg-gray-100 border-none text-sm"
              />
            </div>

            {/* Author/Creator */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Author/Creator
              </label>
              <Input
                placeholder="Enter author name"
                value={authorCreator}
                onChange={e => setAuthorCreator(e.target.value)}
                className="w-full bg-gray-100 border-none text-sm"
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full h-9 px-3 rounded-md bg-gray-100 border-none text-sm focus:outline-none"
              >
                <option value="">Select Status</option>
                {statuses.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Thumbnail
              </label>
              <label className="flex flex-wrap sm:flex-nowrap items-center gap-2 h-auto sm:h-10 px-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="text-xs text-purple-700 bg-[#6366F13D] rounded-md px-4 py-1 truncate max-w-full sm:max-w-[200px]">
                  {thumbnail ? thumbnail.name : 'Choose File'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e =>
                    handleThumbnailUpload(e.target.files?.[0] || null)
                  }
                />
              </label>
            </div>

            {/* Comic Series Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Comic Series Description
              </label>
              <Textarea
                placeholder="Write description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full bg-gray-100 border-none text-sm h-28"
              />
            </div>
          </div>

          {/* RIGHT SIDE - All Comics */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
              <h4 className="text-sm font-semibold text-gray-900">
                All Comics
              </h4>
              <Button
                onClick={addEpisode}
                className="bg-green-600 hover:bg-green-700 text-white h-8 px-4 text-sm w-full sm:w-auto"
              >
                Add Episode
              </Button>
            </div>

            {/* Episodes Section */}
            <div
              className={`space-y-3 ${
                episodes.length >= 3 ? 'max-h-[400px] overflow-y-auto pr-2' : ''
              }`}
            >
              {episodes.map((ep, index) => (
                <div
                  key={ep.id}
                  className="border border-gray-200 rounded-md p-3 bg-gray-50 space-y-3"
                >
                  <div className="grid gap-2 grid-cols-6 items-center">
                    <div>
                      <h2 className="p-3 sm:p-4 rounded-md bg-gray-200 text-purple-800 text-center text-xs sm:text-sm">
                        {index + 1}
                      </h2>
                    </div>
                    <div className="col-span-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-gray-700 block mb-1">
                            Episode Title
                          </label>
                          <Input
                            placeholder={`Episode ${index + 1} title`}
                            value={ep.title}
                            onChange={e =>
                              updateEpisodeTitle(ep.id, e.target.value)
                            }
                            className="w-full bg-white border border-gray-200 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 block mb-1">
                            Episode Thumbnail
                          </label>
                          <label className="flex flex-wrap sm:flex-nowrap items-center gap-2 h-auto sm:h-9 px-3 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                            <span className="text-xs text-purple-700 bg-[#6366F13D] rounded-md px-4 py-1 truncate max-w-full sm:max-w-[180px]">
                              {ep.thumbnail ? ep.thumbnail.name : 'Choose File'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e =>
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
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">
                      Episode Images
                    </label>
                    <label className="flex flex-wrap sm:flex-nowrap items-center gap-2 h-auto sm:h-9 px-3 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                      <span className="text-xs text-purple-700 bg-[#6366F13D] rounded-md px-4 py-1 truncate max-w-full sm:max-w-[200px]">
                        {ep.images.length > 0
                          ? `${ep.images.length} image(s) selected`
                          : 'Choose Images'}
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={e =>
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
        <div className="sticky bottom-0 bg-white border-t px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto px-6"
          >
            Cancel
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {submitText}
          </Button>
        </div>
      </CardSmallScreen>
    </div>
  );
}
