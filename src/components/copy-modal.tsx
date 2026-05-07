"use client";

import { useEffect } from "react";

interface CopyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CopyModal({ isOpen, onClose }: CopyModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="rounded-2xl bg-white px-6 py-4 shadow-[0_16px_32px_rgba(60,33,88,0.2)]">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9f59cc]">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-md font-semibold text-[#23172f]">
            Link copied to clipboard!
          </p>
        </div>
      </div>
    </div>
  );
}
