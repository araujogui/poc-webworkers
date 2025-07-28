import { useEffect, useRef, useState } from "react";
import { Animation } from "./Animation";

export function WebWorkerUpload() {
  const [hashes, setHashes] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  const workerRef = useRef<Worker>(null);
  const t0 = useRef<number>(null);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (!workerRef.current) {
      throw new Error("Worker is not running");
    }

    setHashes([]);
    setElapsedTime(null);

    t0.current = performance.now();

    workerRef.current.postMessage(event.target.files);
  };

  useEffect(() => {
    const worker = new Worker(new URL("./worker.js", import.meta.url));

    workerRef.current = worker;

    worker.onmessage = (event) => {
      if (!t0.current) {
        throw new Error("t0 not set");
      }

      setHashes(event.data);

      const t1 = performance.now();

      setElapsedTime(t1 - t0.current);
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

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
