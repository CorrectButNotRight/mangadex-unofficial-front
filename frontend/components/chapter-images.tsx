import React, { useState, useEffect } from 'react'
import { getChapterImages } from '~/lib/mangadex.ts'

function generateImageElements(images: string[]) {
  const listArray = [];
  let counter = 0;
  for(let url of images) {
    listArray.push(<li key={counter}><img src={url}/></li>);
    counter++;
  }
  return listArray;
}

// MangaChapters() fetches the latest cover for the given manga uuid
// Inputs
// - uuid: valid manga uuid
export default function ChapterImages({ uuid }: { uuid: string }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getChapterImages(uuid)
      .then(chapterImages => {
        setImages(chapterImages);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return generateImageElements(images);
}
