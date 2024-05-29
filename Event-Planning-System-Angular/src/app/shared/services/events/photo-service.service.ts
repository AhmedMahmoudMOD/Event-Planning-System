import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceService {

  constructor() { }
  getImages(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const images = [
          {
            itemImageSrc: 'https://i.pinimg.com/564x/0d/9c/d4/0d9cd4d81a883d84682594e30a9dccf4.jpg',
            thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1'
          },
          // Add more image objects here if needed
        ];
        resolve(images);
      } catch (error) {
        reject(error);
      }
    });
  }
}
