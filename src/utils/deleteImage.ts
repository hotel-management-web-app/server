import fs from 'fs';

export const deleteImage = (image: string) => {
  if (image) {
    const imageUrl = new URL(image);
    if (imageUrl.pathname !== '/images/no_image.jpg') {
      const imagePath = 'public' + imageUrl.pathname;
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
  }
};
