'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, Pencil } from 'lucide-react';
import AddComicModal from './ComicModal';

interface Comic {
  id: number;
  title: string;
  author: string;
  episodes: number;
  downloads: number;
  status: string;
}

export default function ComicContentManagement() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [openModal, setOpenModal] = useState(false);

  // ✅ Fetch data from local JSON file
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const res = await fetch('/data/topComics.json');
        const data = await res.json();
        setComics(data.comics);
      } catch (error) {
        console.error('Error loading comics:', error);
      }
    };

    fetchComics();
  }, []);

  return (
    <div className="p-6 font-[inter]">
      <h2 className="text-lg font-semibold mb-4">Comic Content Management</h2>
      <Card className="p-4">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium">All Comics</h3>
          <div className="flex items-center gap-2">
            <Input placeholder="Search for comics..." className="w-64" />
            <Button onClick={() => setOpenModal(true)} className='bg-green-600'>Add New Comic</Button>
          </div>
        </div>

        <table className="w-full text-sm border-collapse">
          <thead className="bg-blue-50 ">
            <tr>
              <th className="text-left p-2">Title / Author</th>
              <th className="text-left p-2">Episodes</th>
              <th className="text-left p-2">Downloads</th>
              <th className="text-left p-2">Status</th>
              <th className="text-center p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {comics.length > 0 ? (
              comics.map(comic => (
                <tr
                  key={comic.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-2">
                    <div className="font-medium">{comic.title}</div>
                    <div className="text-xs text-gray-500">
                      by {comic.author}
                    </div>
                  </td>
                  <td className="p-2">{comic.episodes} episodes</td>
                  <td className="p-2">{comic.downloads.toLocaleString()}</td>
                  <td className="p-2">
                    <span
                      className={`${
                        comic.status === 'Published'
                          ? 'text-green-600'
                          : comic.status === 'Draft'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}
                    >
                      {comic.status}
                    </span>
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    <Button size="icon" variant="outline">
                      <Eye className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Pencil className="w-4 h-4 text-yellow-600" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  Loading comics...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Add New Comic Modal */}
      {openModal && <AddComicModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}
