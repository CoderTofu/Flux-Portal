"use client";

import { useEffect } from "react";
import Image from "next/image";
interface ToastProps {
  text: string;
  type: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
}

export default function Toast({ text, type, isOpen, onClose }: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div
        className={`rounded-2xl bg-white px-6 py-4 shadow-[0_16px_32px_rgba(60,33,88,0.2)]`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${type === "success" ? "bg-green-400" : "bg-red-400"}`}
          >
            {type === "success" ? (
              <Image
                src="/check-icon.png"
                alt="Check icon"
                width={26}
                height={26}
                className="h-4 w-auto invert brightness-0"
              />
            ) : (
              <Image
                src="/x-icon.png"
                alt="X icon"
                width={4}
                height={4}
                className="h-3 w-auto invert brightness-0"
              />
            )}
          </div>
          <p className="text-md font-semibold text-[#23172f]">{text}</p>
        </div>
      </div>
    </div>
  );
}
