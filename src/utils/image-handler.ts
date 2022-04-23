/* eslint-disable no-param-reassign */

const sharp = require('sharp');

sharp.cache(false);

interface IReziseOptions {
    pathName: string;
    size: number[];
    filename: string;
    extension: string;
    sizeTag: string;
}

export class ImageHandler {
  private static env = process.env.NODE_ENV;

  private static localPhotoUrlApi = 'http://localhost:8000/api/image/avatars';

  private static prodPhotoUrlApi = 'http://206.189.234.1:8000/api/image/avatars';

  private static prodPostImageUrlApi = 'http://206.189.234.1:8000/api/image/post';

  private static localPostImageUrlApi = 'http://localhost:8000/api/image/post'

  public static async resizeImage(options: IReziseOptions) {
    const buffer = await sharp(`${options.pathName}/${options.filename}${options.extension}`)
      .resize(options.size[0], options.size[1], {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toBuffer();
    await sharp(buffer).toFile(`${options.pathName}/${options.filename}-${options.sizeTag}${options.extension}`);
  }

  public static getPhotoUrl(filename: string, type = 'md') {
    if (!filename) return '';

    const [name, extension] = filename.split('.');
    const basePath = this.env === 'prod' ? this.prodPhotoUrlApi : this.localPhotoUrlApi;
    const filePath = `${basePath}?filename=${name}-${type}.${extension}`;

    return filePath;
  }

  public static getPostImageUrl(filename: string) {
    if (!filename) return '';

    const [name, extension] = filename.replace('/', '').split('.');
    const basePath = this.env === 'prod' ? this.prodPostImageUrlApi : this.localPostImageUrlApi;
    const filePath = `${basePath}?filename=${name}.${extension}`;

    return filePath;
  }
}
