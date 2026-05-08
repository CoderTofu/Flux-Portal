"use client";
import Image from "next/image";
import JSZip from "jszip";
import { useState, useEffect } from "react";

const trustItems = [
  {
    title: "Create your own Flux link.",
    description:
      "Experience the fastest way to share files securely across the globe. Let your files flow without the hassle of a login screen.",
  },
];

type File = {
  url: string;
  Key: string;
  Size: number;
  ContentType: string;
};

type ApiResponse = {
  remaining_seconds: number;
  items: File[];
};

export default function DownloadPage() {
  const [fileKey, setFileKey] = useState("");
  // return <div>This is download page for file {fileKey}</div>;
  function formatBytes(size: number) {
    if (size < 1024) return `${size} B`;
    if (size < 1024 ** 2) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 ** 3) return `${(size / 1024 ** 2).toFixed(1)} MB`;
    return `${(size / 1024 ** 3).toFixed(1)} GB`;
  }

  function getFileTypeLabel(file: File) {
    if (file.ContentType.startsWith("image/")) return "Image";
    if (file.ContentType.startsWith("video/")) return "Video";
    if (file.ContentType.startsWith("audio/")) return "Audio";
    if (file.ContentType.includes("pdf")) return "PDF";
    return "File";
  }

  function formatExpiration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    if (hours > 0) {
      return `${hours} hours`;
    }
    const minutes = Math.floor((seconds % 3600) / 60);
    if (minutes > 0) return `${minutes} minutes`;
    return `${seconds % 60} seconds`;
  }

  const [expirationHours, setExpirationHours] = useState<number | undefined>(
    undefined,
  );

  const handleFileDownload = async (url: string, filename: string) => {
    const res = await fetch(url);
    const blob = await res.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(blobUrl);
  };

  const handleMultiDownload = async (items: any[]) => {
    const zip = new JSZip();

    await Promise.all(
      items.map(async (file) => {
        const response = await fetch(file.url);
        const blob = await response.blob();

        zip.file(file.Key, blob);
      }),
    );

    const zipBlob = await zip.generateAsync({ type: "blob" });

    const blobUrl = window.URL.createObjectURL(zipBlob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `flux-downloads-${fileKey}.zip`;

    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(blobUrl);
  };

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = window.location.pathname.replace("/", "");
    setFileKey(key);
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `https://n4kefqn10k.execute-api.ap-southeast-1.amazonaws.com/dev/${key}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }

        const json: ApiResponse = await response.json();

        setData(json);
        if (json.remaining_seconds > 0)
          setExpirationHours(json.remaining_seconds);
        else setExpirationHours(undefined);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    if (expirationHours === undefined) return;
    if (expirationHours > 0) {
      setTimeout(() => {
        setExpirationHours((prev) => prev! - 1);
      }, 1000);
    } else {
      location.reload();
    }
  }, [expirationHours]);

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
          {loading ? (
            <div className="mt-10 flex justify-center items-center gap-8 transition-all duration-300 lg:grid-cols-[1.3fr_1fr]">
              <p className="mt-3 text-base text-[#4A306D] md:text-[20px] md:leading-8">
                Hang tight, we're fetching your files...
              </p>
            </div>
          ) : !data || data.items.length === 0 ? (
            <div className="mt-10 flex flex-1 items-center justify-center">
              <div className="flex min-h-[450px] w-full flex-col items-center justify-center rounded-2xl border-2 border-[#c4b8cf] bg-white/70 px-5 py-10 text-center shadow-[0_6px_16px_rgba(60,33,88,0.08)]">
                <Image
                  src="/no-file.png"
                  alt="No files"
                  width={180}
                  height={180}
                  className="mb-6 opacity-90"
                />

                <p className="text-base text-[#4A306D] md:text-[20px] md:leading-8">
                  No files found or link expired.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-10 grid gap-8 transition-all duration-300 lg:grid-cols-[1.3fr_1fr]">
              <div
                className={`min-h-[350px] rounded-2xl border-2 bg-white/70 px-5 py-6 text-left shadow-[0_6px_16px_rgba(60,33,88,0.08)] transition border-[#c4b8cf]`}
              >
                <div className="space-y-4 overflow-y-auto h-100">
                  {data.items.map((file) => (
                    <div
                      key={`${file.Key}-${file.Size}`}
                      className="flex items-start justify-between gap-4 rounded-xl border border-[#ded4e8] bg-white px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm font-medium text-[#3a2748]">
                            {file.Key}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-[#7e6d8d]">
                            {getFileTypeLabel(file)} •{" "}
                            {formatBytes(file.Size)}{" "}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleFileDownload(file.url, file.Key)}
                        className="group mt-0.5 text-xs font-semibold uppercase tracking-wide text-[#8e4eba] border-2 border-[#8e4eba] p-2 rounded-2xl transition hover:text-[#7c39ab] hover:bg-[#7c39ab] disabled:cursor-not-allowed "
                      >
                        <Image
                          src="/download-logo.png"
                          alt=""
                          width={12}
                          height={12}
                          className="h-3 w-3 group-hover:invert group-hover:brightness-0 transition"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <article className="px-10 flex flex-row justify-between items-center h-min rounded-2xl border border-[#d9d0e1] bg-white/90 p-5 shadow-[0_8px_20px_rgba(60,33,88,0.12)]">
                  <p className="h-full text-left mt-2 text-sm leading-6 text-[#6a5a79]">
                    Found {data.items.length} file(s). <br />
                    Expiring in {formatExpiration(expirationHours!)}.
                  </p>
                  <button
                    type="button"
                    // onClick={() => handleFileDownload(data.items[0].url, data.items[0].Key)}
                    onClick={() => {
                      handleMultiDownload(data.items);
                    }}
                    className="select-none group flex flex-row gap-2 text-xs text-center items-center font-bold uppercase tracking-wide text-[#8f4aba] border-2 border-[#8f4aba] rounded-lg p-2 px-10 transition hover:text-white hover:bg-[#8f4aba] disabled:cursor-not-allowed "
                  >
                    <Image
                      src="/download-logo.png"
                      alt=""
                      width={12}
                      height={12}
                      className="h-3 w-3 group-hover:invert group-hover:brightness-0 transition"
                    />
                    Download All
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
                    onClick={() => (window.location.href = "/")}
                    className="select-none mt-10 text-xs text-center font-bold uppercase tracking-wide text-[#8f4aba] border-2 border-[#8f4aba] rounded-lg p-2 w-full transition hover:text-white hover:bg-[#8f4aba] disabled:cursor-not-allowed "
                  >
                    Go to Upload Page
                  </button>
                </article>
              </div>
            </div>
          )}
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
