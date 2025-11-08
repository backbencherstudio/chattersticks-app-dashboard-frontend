'use client';


import SettingsModal from '@/app/(dashboard)/_components/settings/SettingsModal';
import { useSettingsModal } from '@/context/SettingsModalContext';

export default function ClientModalWrapper() {
  const { settingsModalOpen, closeSettingsModal } = useSettingsModal();

  return (
    <SettingsModal isOpen={settingsModalOpen} onClose={closeSettingsModal} />
  );
}
