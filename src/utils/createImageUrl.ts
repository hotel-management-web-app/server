import { Request } from 'express';

export const createImageUrl = (req: Request, file?: Express.Multer.File) => {
  const protocol = req.protocol;
  const host = req.headers.host;

  const currentFile = file || req.file;
  const imageName = currentFile?.filename ?? 'images/no_image.jpg';
  const imageUrl = `${
    process.env.NODE_ENV === 'production' ? 'https' : protocol
  }://${host}/${imageName} `;

  return imageUrl;
};
