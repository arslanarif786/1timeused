import imageCompression from "browser-image-compression";

export default async function compressImage(imageFile, type = null) {
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: type && type == "profile-img" ? 0.13 : 0.4,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const compressedImage = await imageCompression(imageFile, options);
  // console.log('compressedFile instanceof Blob', compressedImage instanceof Blob); // true
  console.log(`compressedFile size ${compressedImage.size / 1024 / 1024} MB`); // smaller than maxSizeMB
  return compressedImage;
}
