const getFileFromBlob = (
  url: string,
  cb: (response: XMLHttpRequest['response']) => void,
): void => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.addEventListener('load', () => {
    cb(xhr.response);
  });
  xhr.send();
};

export default getFileFromBlob;
