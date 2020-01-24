import { useEffect, useState } from 'react';

export const useFetch = ({ method, url, body, customFields }) => {
  // eslint-disable-next-line no-unused-vars
  const [_url, setUrl] = useState(url);
  const [rawRes, setRawRes] = useState({});
  const [error, setError] = useState(null);
  const [isBusy, setIsBusy] = useState(true);

  if (!url.length) {
    console.error('UseAjaxApi Error: URL input or URI input is undefined');
    return;
  }

  if (!body && method === 'post') {
    console.error(
      'UseAjaxApi Error: Body object is required for Post methods - please add a Body object'
    );
  }

  useEffect(() => {
    
      co 
          .get({ uri, customFields })
          .then(data => {
            setRawRes(data);
            setIsBusy(false);
          })
          .catch(err => {
            setError(err);
          });
        break;
      }
    }

    return () => {
      setIsBusy(true);
      setError(null);
    };
  }, [url, uri]);

  return { rawRes, error, isBusy };
};
