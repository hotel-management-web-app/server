import { Request } from 'express';

export const createImageUrl = (req: Request) => {
  const protocol = req.protocol;
  const host = req.headers.host;

  const imageName = req.file?.filename ?? 'images/no_image.jpg';
  const imageUrl = `${protocol}://${host}/${imageName} `;

  return imageUrl;
};
