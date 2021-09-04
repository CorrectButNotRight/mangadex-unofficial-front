import React, { useState, useEffect } from 'react'
import { getUpdateList } from '~/lib/mangadex.ts'
import MangaCover from '~/components/manga-cover.tsx'

// generateListElements(updateList) This function consumes an update list and outputs manga cover and title list
// [] -> []
function generateListElements(updateList: String[]) {
  let latestUpdateDisplay=[]
  for(let i=0; i<(updateList.length); i+=2) {
    latestUpdateDisplay.push(<li key={i}><MangaCover uuid={updateList[i]}/><p>{updateList[i+1]}</p></li>);
  }
  return latestUpdateDisplay;
}

// LatestUpdates() This function returns the manga cover and titles of the latest updates
// None => []
export default function LatestUpdates() {
    const [updateList, setUpdateList] = useState([]);
    useEffect(() => {
        getUpdateList()
          .then(chaptersList => {
            setUpdateList(chaptersList);
          })
          .catch(e => {
            console.error(e);
          });
      }, []);
    return generateListElements(updateList);
}