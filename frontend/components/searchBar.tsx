import React, { useState, useEffect } from 'react'
import { getSearchResults } from '~/lib/mangadex.ts'
import MangaCover from '~/components/manga-cover.tsx'

// generateListElements(updateList) This function consumes an  and outputs manga cover and title list
// [] -> []
function generateListElements(searchList: string[]) {
  let searchDisplay=[]
  for(let i=0; i<(searchList.length); i+=2) {
    searchDisplay.push(<li key={i}><MangaCover uuid={searchList[i]}/><p>{searchList[i+1]}</p></li>);
  }
  return searchDisplay;
}

// Searching() This function returns the manga cover and titles of the search results
// Int SortMode String String String[] String String[] Int -> []
export default function Searching(offset, sortMode, searchBar, excMode="OR", excTags=[], incMode="AND", incTags=[], reqSize=20) {
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    getSearchResults(offset, sortMode, searchBar, excMode="OR", excTags=[], incMode="AND", incTags=[], reqSize=20)
      .then(chaptersList => {
        setSearchList(chaptersList);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);
  return generateListElements(searchList);
}
