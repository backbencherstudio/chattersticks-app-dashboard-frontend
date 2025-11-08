'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsModalContextType {
  settingsModalOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
}

const SettingsModalContext = createContext<
  SettingsModalContextType | undefined
>(undefined);

export function SettingsModalProvider({ children }: { children: ReactNode }) {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const openSettingsModal = () => setSettingsModalOpen(true);
  const closeSettingsModal = () => setSettingsModalOpen(false);

  return (
    <SettingsModalContext.Provider
      value={{ settingsModalOpen, openSettingsModal, closeSettingsModal }}
    >
      {children}
    </SettingsModalContext.Provider>
  );
}

export function useSettingsModal() {
  const context = useContext(SettingsModalContext);
  if (!context) {
    throw new Error(
      'useSettingsModal must be used within a SettingsModalProvider'
    );
  }
  return context;
}
