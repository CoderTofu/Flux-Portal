import Image from "next/image";

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

export default function Home() {
  return (
    <main className="text-[#1d1326]">
      <div className="mx-auto max-w-350 flex min-h-screen flex-col px-6 pb-5 pt-4 lg:px-10">
        <section className="relative flex-1 justify-center overflow-hidden lg:px-10 lg:py-10 text-center">
          <div className="relative mx-auto">
            <div className="w-full">
              <h1 className="font-playfair text-4xl tracking-tight text-[#23172f] md:text-6xl">
                Let your files <span className="text-[#8253a7]">flow.</span>
              </h1>
              <p className="mt-3 text-base text-[#4A306D] md:text-xl">
                Flux is a calm, temporary file-sharing space for fast uploads,{" "}
                <br />
                instant links, and secure sharing.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_1fr_1fr]">
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#c4b8cf] bg-white/70 px-5 text-center shadow-[0_6px_16px_rgba(60,33,88,0.08)]">
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
                <p className="mt-2 text-sm text-[#6e5d7f]">
                  Maximum file size 2GB
                </p>
                <button
                  type="button"
                  className="mt-8 rounded-full bg-[#9f59cc] px-9 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(156,79,203,0.35)] transition hover:bg-[#8d47ba]"
                >
                  Select File
                </button>
              </div>

              <article className="rounded-2xl flex flex-col justify-center border border-[#d9d0e1] bg-white/90 p-5 shadow-[0_8px_20px_rgba(60,33,88,0.12)]">
                <h3 className="text-2xl font-semibold text-[#2f1d3d]">
                  {trustItems[0].title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6a5a79] text-left">
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
          </div>
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
