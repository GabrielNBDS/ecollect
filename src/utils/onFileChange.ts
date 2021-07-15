import { ChangeEvent } from 'react';

function readFile(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => resolve(reader.result as string),
      false,
    );
    reader.readAsDataURL(file);
  });
}

export default async function onFileChange(
  { target }: ChangeEvent<HTMLInputElement>,
  setImageSrc: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> {
  if ((target as HTMLInputElement).files.length > 0) {
    const file = (target as HTMLInputElement).files[0];
    const imageDataUrl = await readFile(file);

    setImageSrc('');
    setImageSrc(imageDataUrl);
  }
}
