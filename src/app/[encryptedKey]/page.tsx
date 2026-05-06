"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

const MAX_SIZE_TEXT = "Maximum file size 2GB";
const trustItems = [
  {
    // icon: "/protection-logo.png",
    title: "Create your own Flux link.",
    description:
      "Experience the fastest way to share files securely across the globe. Let your files flow without the hassle of a login screen.",
  },
];

export default function DownloadPage() {
  const params = useParams();
  const fileKey = params?.encryptedKey;
  // return <div>This is download page for file {fileKey}</div>;
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

  //dummy file data
  const dummyFiles: File[] = [
    new File(["dummy content"], "photo.jpg", { type: "image/jpeg" }),
    new File(["dummy content"], "document.pdf", { type: "application/pdf" }),
    new File(["dummy content"], "music.mp3", { type: "audio/mpeg" }),
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([dummyFiles[0], dummyFiles[1], dummyFiles[2]]);
  const [expirationHours, setExpirationHours] = useState(24);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isFileSelectionLocked, setIsFileSelectionLocked] = useState(false);

  const handleFileDownload = () => {
    // Implement file download logic here
    alert("File Download");
  }

  return (
    <main className="text-[#1d1326]">
      <div className="mx-auto flex min-h-screen max-w-[1320px] flex-col px-6 pb-5 pt-4 lg:px-10">
        <section className="relative flex-1 py-6 text-center lg:px-10 lg:py-10">
          <h1 className="font-playfair text-4xl letter-spacing-[0.2rem] text-[#23172f] md:text-6xl">
            Let your files <span className="text-[#8253a7]">flow.</span>
          </h1>
          <p className="mt-3 text-base text-[#4A306D] md:text-[25px] md:leading-8">
            Flux is a calm, temporary file-sharing space for
            <br />
            fast uploads, instant links, and secure sharing.
          </p>

          <div className="mt-10 grid gap-8 transition-all duration-300 lg:grid-cols-[1.3fr_1fr]">
            <div
              className={`min-h-[350px] rounded-2xl border-2 bg-white/70 px-5 py-6 text-left shadow-[0_6px_16px_rgba(60,33,88,0.08)] transition border-[#c4b8cf]`}>
              <div className="space-y-4 overflow-y-auto h-100">
                {selectedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${file.size}-${index}`}
                    className="flex items-start justify-between gap-4 rounded-xl border border-[#ded4e8] bg-white px-4 py-3"
                  >
                    <div className="flex items-start gap-3">
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

                    {/* <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-[#8e4eba] transition hover:text-[#7c39ab] disabled:cursor-not-allowed "
                    >
                      Remove
                    </button> */}

                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <article className="px-10 flex flex-row justify-between items-center h-min rounded-2xl border border-[#d9d0e1] bg-white/90 p-5 shadow-[0_8px_20px_rgba(60,33,88,0.12)]">
                <p className="h-full text-left mt-2 text-sm leading-6 text-[#6a5a79]">
                  Found {selectedFiles.length} file(s). <br />
                  Expiring in {expirationHours} hours.
                </p>
                <button
                  type="button"
                  onClick={handleFileDownload}
                  className="select-none group flex flex-row gap-2 text-xs text-center items-center font-bold uppercase tracking-wide text-[#8f4aba] border-2 border-[#8f4aba] rounded-lg p-2 px-10 transition hover:text-white hover:bg-[#8f4aba] disabled:cursor-not-allowed "
                >
                  <Image
                    src="/download-logo.png"
                    alt=""
                    width={12}
                    height={12}
                    className="h-3 w-3 group-hover:invert group-hover:brightness-0 transition"
                  />
                  Download
                </button>
              </article>

              <article className="h-min rounded-2xl border border-[#d9d0e1] bg-white/90 p-10 shadow-[0_8px_20px_rgba(60,33,88,0.12)]">
                <h3 className="text-left text-xl font-bold text-[#2f1d3d]">
                  {trustItems[0].title}
                </h3>
                <p className="text-left mt-2 text-sm leading-6 text-[#6a5a79]">
                  {trustItems[0].description}
                </p>
                <button
                  type="button"
                  onClick={() => window.location.href = "/"}
                  className="select-none mt-10 text-xs text-center font-bold uppercase tracking-wide text-[#8f4aba] border-2 border-[#8f4aba] rounded-lg p-2 w-full transition hover:text-white hover:bg-[#8f4aba] disabled:cursor-not-allowed "
                >
                  Go to Upload Page
                </button>
              </article>

            </div>
          </div>
        </section>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8a7a99]">
          <p>© 2026 FLUX. ALL RIGHTS RESERVED</p>
          <div className="flex gap-6 uppercase tracking-wider">
            {/* <span>Terms</span>
              <span>Privacy</span>
              <span>Status</span> */}
          </div>
        </footer>
      </div>
    </main>
  );
}
