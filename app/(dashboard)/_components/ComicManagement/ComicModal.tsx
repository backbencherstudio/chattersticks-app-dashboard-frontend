'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
}

export default function AddComicModal({ onClose }: ModalProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('Draft');
  const [description, setDescription] = useState('');

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-[500px] p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h3 className="text-lg font-semibold mb-4">Add New Comic</h3>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Comic Title</label>
            <Input
              placeholder="Enter title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Author</label>
            <Input
              placeholder="Enter author name"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              className="border rounded-md w-full p-2 text-sm"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Write a short description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Create Comic Series</Button>
        </div>
      </Card>
    </div>
  );
}
