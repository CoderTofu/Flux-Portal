"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const MAX_SIZE_TEXT = "Maximum file size 2GB";
const trustItems = [
  {
    title: "Instant Share",
    description:
      "Files are encrypted before they even leave your device. Share anything up to 2GB instantly with a simple link.",
    bullets: [
      { icon: "/encrypted-logo.png", label: "End-to-end Encrypted" },
      { icon: "/p2p-logo.png", label: "P2P Transfers available" },
      { icon: "/expiration-logo.png", label: "Controllable Expiration" },
    ],
  },
  {
    icon: "/protection-logo.png",
    title: "Zero Logs",
    description:
      "We don't know who you are, and we don't want to. Your privacy is our architecture.",
  },
  {
    icon: "/sharing-logo.png",
    title: "Private Sharing",
    description:
      "Secure direct links that auto-expire. You control the duration of your data's life.",
  },
];

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 ** 2) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 ** 3) return `${(size / 1024 ** 2).toFixed(1)} MB`;
  return `${(size / 1024 ** 3).toFixed(1)} GB`;
}

function getFileTypeLabel(file: File) {
  if (file.type.startsWith("image/")) return "Image";
  if (file.type.startsWith("video/")) return "Video";
  if (file.type.startsWith("audio/")) return "Audio";
  if (file.type.includes("pdf")) return "PDF";
  return "File";
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [expirationHours, setExpirationHours] = useState(24);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isFileSelectionLocked, setIsFileSelectionLocked] = useState(false);

  const hasFiles = selectedFiles.length > 0;
  const generatedShareLink = "flux.sh/abc123";

  const handleFiles = (files: FileList | null) => {
    if (!files || isFileSelectionLocked) return;
    const incoming = Array.from(files);
    if (!incoming.length) return;
    setSelectedFiles((prev) => [...prev, ...incoming]);
  };

  const handleRemoveFile = (fileIndex: number) => {
    if (isFileSelectionLocked) return;
    setSelectedFiles((prev) => prev.filter((_, index) => index !== fileIndex));
  };

  const handleStartUpload = () => {
    if (!hasFiles || isUploading || isFileSelectionLocked) return;
    setIsFileSelectionLocked(true);
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
    }, 750);
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setIsDragging(false);
    if (isFileSelectionLocked) return;
    handleFiles(event.dataTransfer.files);
  };

  return (
    <main className="text-[#1d1326]">
      <div className="mx-auto flex min-h-screen max-w-[1320px] flex-col px-6 pb-5 pt-4 lg:px-10">
        <section className="relative flex-1 py-6 text-center lg:px-10 lg:py-10">
          <h1 className="font-playfair text-4xl tracking-tight text-[#23172f] md:text-6xl">
            Let your files <span className="text-[#8253a7]">flow.</span>
          </h1>
          <p className="mt-3 text-base text-[#4A306D] md:text-[25px] md:leading-8">
            Flux is a calm, temporary file-sharing space for
            <br />
            fast uploads, instant links, and secure sharing.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(event) => handleFiles(event.target.files)}
          />

          {!hasFiles ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_1fr_1fr]">
              <div
                onDragOver={(event) => {
                  if (isFileSelectionLocked) return;
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex min-h-[350px] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white/70 px-5 text-center shadow-[0_6px_16px_rgba(60,33,88,0.08)] transition ${
                  isDragging
                    ? "border-[#9f59cc] bg-[#f8f1fe]"
                    : "border-[#c4b8cf]"
                }`}
              >
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4eafb]">
                    <Image
                      src="/upload-logo.png"
                      alt="Upload icon"
                      width={26}
                      height={26}
                      className="h-6 w-auto"
                    />
                  </div>
                  <h2 className="text-3xl font-semibold text-[#2f1d3d]">
                    Drag and drop your files
                  </h2>
                  <p className="mt-2 text-sm text-[#6e5d7f]">{MAX_SIZE_TEXT}</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-8 rounded-full bg-[#9f59cc] px-9 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(156,79,203,0.35)] transition hover:bg-[#8d47ba]"
                  >
                    Select Files
                  </button>
                </div>
              </div>

              <article className="rounded-2xl flex flex-col justify-center border border-[#d9d0e1] bg-white/90 p-5 shadow-[0_8px_20px_rgba(60,33,88,0.12)]">
                <h3 className="text-2xl font-semibold text-[#2f1d3d]">
                  {trustItems[0].title}
                </h3>
                <p className="mt-3 text-left text-sm leading-6 text-[#6a5a79]">
                  {trustItems[0].description}
                </p>
                <ul className="mt-6 space-y-5">
                  {trustItems[0].bullets?.map((bullet) => (
                    <li
                      key={bullet.label}
                      className="flex items-center gap-2 text-sm text-[#5d4c6c]"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f3e6fb]">
                        <Image
                          src={bullet.icon}
                          alt=""
                          width={12}
                          height={12}
                          className="h-3 w-3"
                        />
                      </span>
                      {bullet.label}
                    </li>
                  ))}
                </ul>
              </article>

              <div className="grid gap-5">
                {trustItems.slice(1).map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-[#d9d0e1] bg-white/90 p-5 text-center shadow-[0_8px_20px_rgba(60,33,88,0.12)]"
                  >
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4eafb]">
                      <Image
                        src={item.icon!}
                        alt=""
                        width={24}
                        height={24}
                        className="h-[24px] w-auto"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#2f1d3d]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6a5a79]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-10 grid gap-8 transition-all duration-300 lg:grid-cols-[1.3fr_1fr]">
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`min-h-[350px] rounded-2xl border-2 border-dashed bg-white/70 px-5 py-6 text-left shadow-[0_6px_16px_rgba(60,33,88,0.08)] transition ${
                  isDragging
                    ? "border-[#9f59cc] bg-[#f8f1fe]"
                    : "border-[#c4b8cf]"
                }`}
              >
                <div className="space-y-4 overflow-y-auto h-100">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}-${index}`}
                      className="flex items-start justify-between gap-4 rounded-xl border border-[#ded4e8] bg-white px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 rounded-md bg-[#f3e8fb] p-2">
                          <Image
                            src="/upload-logo.png"
                            alt=""
                            width={12}
                            height={12}
                            className="h-3 w-3"
                          />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-[#3a2748]">
                            {file.name}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-[#7e6d8d]">
                            {getFileTypeLabel(file)} •{" "}
                            {formatBytes(file.size)}{" "}
                          </p>
                        </div>
                      </div>
                      {isFileSelectionLocked ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-[#8e4eba] transition hover:text-[#7c39ab] disabled:cursor-not-allowed "
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {isFileSelectionLocked ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isFileSelectionLocked}
                      className="text-sm font-semibold text-[#8e4eba] transition hover:text-[#7c39ab] disabled:cursor-not-allowed disabled:text-[#bda9cd]"
                    >
                      + Add more files
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4 transition-all duration-300 opacity-100 translate-y-0">
                <article className="rounded-2xl border border-[#d9d0e1] bg-white/90 p-5 text-left shadow-[0_8px_20px_rgba(60,33,88,0.12)]">
                  <h3 className="text-lg font-semibold text-[#2f1d3d]">
                    Auto-Destruct
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#6a5a79]">
                    Configure when this file should be permanently removed from
                    the server.
                  </p>
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-[#8c7f99]">
                      <span>Expiration Time</span>
                      <span>{expirationHours} Hours</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={168}
                      value={expirationHours}
                      onChange={(event) =>
                        setExpirationHours(Number(event.target.value))
                      }
                      className="w-full accent-[#8f4aba]"
                    />
                    <div className="mt-1 flex justify-between text-[10px] uppercase text-[#9a8baa]">
                      <span>1 Hour</span>
                      <span>7 Days</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={!hasFiles || isUploading}
                    onClick={handleStartUpload}
                    className="mt-5 w-full rounded-lg bg-[#8f4aba] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7f3caa] disabled:cursor-not-allowed disabled:bg-[#c9b8d6]"
                  >
                    {isUploading
                      ? "Uploading..."
                      : isUploaded
                        ? "Update Settings"
                        : "Upload"}
                  </button>
                </article>

                {isUploaded && (
                  <article className="animate-in fade-in rounded-xl border border-[#dfd4e9] bg-white/90 p-3 shadow-[0_8px_20px_rgba(60,33,88,0.12)]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-[#6d5d7c]">
                        {generatedShareLink}
                      </p>
                      <button
                        type="button"
                        className="rounded-full bg-[#8f4aba] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#7f3caa]"
                      >
                        Copy Link
                      </button>
                    </div>
                  </article>
                )}
              </div>
            </div>
          )}
        </section>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8a7a99]">
          <p>© 2026 FLUX. ALL RIGHTS RESERVED</p>
          <div className="flex gap-6 uppercase tracking-wider">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Status</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
