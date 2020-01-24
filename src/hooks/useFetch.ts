import { useEffect, useState } from 'react';

export const useFetch = (
  url: string,
  options: RequestInit
): { isBusy: boolean; error: any; rawRes: any } => {
  const [rawRes, setRawRes] = useState({});
  const [error, setError] = useState(null);
  const [isBusy, setIsBusy] = useState(true);

  if (!url.length) {
    console.error(' Error: URL input is undefined');
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setRawRes(json);
        setIsBusy(false);
      } catch (error) {
        setError(error);
      }
    })();

    return () => {
      setIsBusy(true);
      setError(null);
    };
  }, [url]);

  return { isBusy, error, rawRes };
};
