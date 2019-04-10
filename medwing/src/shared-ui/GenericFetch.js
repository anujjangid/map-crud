// @flow

type URL = string;
type Method = string;
type BodyData = string;

const GenericFetch = (url: URL, method: Method, bodyData: BodyData) =>
  /* eslint-disable-next-line */
  fetch(url, {
    method: method || 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(bodyData)
  });

export default GenericFetch;
