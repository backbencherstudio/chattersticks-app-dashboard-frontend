'use client'
import SettingsModal from '../_components/settings/SettingsModal';

import { useSettingsModal } from '@/context/SettingsModalContext';


export default function SettingsPage() {
  
const { settingsModalOpen, closeSettingsModal } = useSettingsModal();
  return (
    <div>
      {/* The modal */}
      <SettingsModal
        
        isOpen={settingsModalOpen}
        onClose={closeSettingsModal}
      />
    </div>
  );
}