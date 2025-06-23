'use client'
import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

type FrameContext = Record<string, any>;

export default function Home() {
  const [isMiniApp, setIsMiniApp] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    // Cek apakah berjalan di Mini App Farcaster
    sdk.isInMiniApp().then(setIsMiniApp);

    // Sembunyikan splash screen jika sudah siap
    sdk.actions.ready();

    // Ambil context secara async
    async function getContext() {
      const ctx = await sdk.context;
      setContext(ctx);
    }
    getContext();
  }, []);

  // Handler klik tombol
  const handleClick = () => {
    setPesan("Tombol berhasil diklik! 🎉");
  };

  return (
    <main>
      <h1>Mini App Farcaster</h1>
      <p>
        {isMiniApp
          ? "Aplikasi ini berjalan di dalam Farcaster Mini App."
          : "Aplikasi ini berjalan di luar Farcaster Mini App (browser biasa)."}
      </p>
      <button onClick={handleClick}>Klik Saya</button>
      {pesan && <p style={{ color: "green" }}>{pesan}</p>}
      <h2>Context:</h2>
      <pre>
        {context && JSON.stringify(context, null, 2)}
      </pre>
    </main>
  );
}