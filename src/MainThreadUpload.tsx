import { MD5, enc } from "crypto-js";
import { useState } from "react";
import { Animation } from "./Animation";

export function MainThreadUpload() {
  const [hashes, setHashes] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    setHashes([]);
    setElapsedTime(null);

    const t0 = performance.now();

    const files = Array.from(event.target.files ?? []);

    const hashes = await Promise.all(
      files.map(async (file) => {
        const text = await file.text();

        const hash = MD5(text);

        return hash.toString(enc.Hex);
      })
    );

    const t1 = performance.now();

    setElapsedTime(t1 - t0);

    setHashes(hashes);
  };

  const formatter = Intl.NumberFormat("pt-BR");

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />

      <pre>{JSON.stringify(hashes, null, 2)}</pre>

      {elapsedTime && (
        <span>Took {formatter.format(elapsedTime / 1000)} seconds.</span>
      )}

      <Animation />
    </div>
  );
}
