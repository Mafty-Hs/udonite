import { IONetwork } from '../system';
import { ImageFile } from './image-file';
import { ImageContext } from './image-context';

export class ImageStorage {
  private static _instance: ImageStorage
  static get instance(): ImageStorage {
    if (!ImageStorage._instance) ImageStorage._instance = new ImageStorage();
    return ImageStorage._instance;
  }

  private imageHash: { [identifier: string]: ImageFile } = {};
  taglist:string[] = [];

  get images(): ImageFile[] {
    let images: ImageFile[] = [];
    for (let identifier in this.imageHash) {
      images.push(this.imageHash[identifier]);
    }
    return images;
  }

  private constructor() {
    console.log('ImageStorage ready...');
  }

  private set(context :ImageContext): ImageFile {
    let image = new ImageFile();
    image.context = context;
    if (!context.isHide && context.tag) {
      for (let tag of context.tag) {
        if (!this.taglist.includes(tag)) this.taglist.push(tag);
      }
    }
    return image;
  }

  tagAdd(tag :string) {
    if (!this.taglist.includes(tag)) this.taglist.push(tag);
  }

  create(context :ImageContext) {
    let image = this.set(context);
    this.imageHash[image.identifier] = image; 
  }

  update(context :ImageContext) {
    let image = this.get(context.identifier);
    if (!context.isHide && context.tag) {
      for (let tag of context.tag) {
        if (!this.taglist.includes(tag)) this.taglist.push(tag);
      }
    }
    image.context = context;
  }

  delete(identifier: string): boolean {
    let deleteImage: ImageFile = this.imageHash[identifier];
    if (deleteImage) {
      //deleteImage.destroy();
      delete this.imageHash[identifier];
      return true;
    }
    return false;
  }

  get(identifier: string): ImageFile {
    let image: ImageFile = this.imageHash[identifier];
    if (image) return image;
    return null;
  }


  async getCatalog() {
    let images = await IONetwork.imageMap()
    for (let image of images) {
      if (!this.imageHash[image.identifier])
        this.imageHash[image.identifier] = this.set(image); 
    }
  }
}
