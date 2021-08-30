import React, { useState, useEffect } from 'react'
import { getChapterList } from '~/lib/mangadex.ts'

function generateListElements(chapters: object) {
  const listArray = [];
  let counter = 0;
  for(let chapter of chapters) {
    // listArray.push(<li key={counter}>{chapter.number} | {chapter.group} | {chapter.uuid} | {chapter.name}</li>);
    listArray.push(<li key={counter}><a href={'/chapter/' + chapter.uuid}>{chapter.number} | {chapter.group} | {chapter.name}</a></li>);
    counter++;
  }
  return listArray;
}

// MangaChapters() fetches the latest cover for the given manga uuid
// Inputs
// - uuid: valid manga uuid
export default function MangaChapters({ uuid }: { uuid: string }) {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    getChapterList(uuid)
      .then(chaptersList => {
        setChapters(chaptersList);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return generateListElements(chapters);
}
