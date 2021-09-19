import React, { useState, useEffect } from 'react'
import { getSearchResults } from '~/lib/mangadex.ts'
import MangaCover from '~/components/manga-cover.tsx'
import { SortMode } from '~/lib/enums.ts'

var offset = 0
var sortMode = SortMode.RelevanceDesc
var searchBar = "quintessential"
var excMode="OR"
var excTags=[]
var incMode="AND"
var incTags=[]
var reqSize=20

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
// None -> []
export default function Searching() {
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    getSearchResults(offset, sortMode, searchBar, excMode, excTags, incMode, incTags, reqSize)
      .then(chaptersList => {
        setSearchList(chaptersList);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);
  return generateListElements(searchList);
}
