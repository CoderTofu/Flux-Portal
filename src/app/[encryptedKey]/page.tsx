"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function DownloadPage() {
  const params = useParams();
  const fileKey = params?.encryptedKey;
  return <div>This is download page for file {fileKey}</div>;
}
