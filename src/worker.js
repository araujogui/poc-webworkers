importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"
);

self.onmessage = async (event) => {
  console.log(event.data);

  const files = Array.from(event.data ?? []);

  const hashes = await Promise.all(
    files.map(async (file) => {
      const text = await file.text();

      const hash = CryptoJS.MD5(text);

      return hash.toString(CryptoJS.enc.Hex);
    })
  );

  postMessage(hashes);
};
