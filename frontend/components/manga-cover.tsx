import React, { useState } from 'react'
import { FETCH_LIMIT, COVER_BASE_URL } from '~/lib/constants.ts'


async function getCover(uuid: string) {
  let response = await fetch('https://api.mangadex.org/cover?manga[]=' + uuid);
  let jsonData = await response.json();
  const total = parseInt(jsonData.total, 10);
  let tempVolume = [-1, "getCover"];
  
  for(let i=0; i<total; i+=FETCH_LIMIT) { // Due to API fetch limits
    const response = await fetch('https://api.mangadex.org/cover?limit=' + FETCH_LIMIT + '&manga[]=' + uuid);
    const jsonData = await response.json();

    for(let j=0; j<jsonData.results.length; j++) { // Iterate over all results returned from our fetch
      if(jsonData.results[j].data.attributes.volume !== null) {
        if(parseInt(jsonData.results[j].data.attributes.volume, 10) > tempVolume[0]) {
          tempVolume[0] = parseInt(jsonData.results[j].data.attributes.volume, 10);
          tempVolume[1] = jsonData.results[j].data.attributes.fileName;
        }
      }
      else if(tempVolume[0] === -1) {
        tempVolume = [0, jsonData.results[j].data.attributes.fileName];
      }
    }
  }
  return tempVolume[1];
}

// MangaCover() fetches the latest cover for the given manga uuid
// Inputs
// - uuid: valid manga uuid
export default function MangaCover({ uuid }: { uuid: string }) {
  const [fileurl, setFileurl] = useState("");


  getCover(uuid)
    .then(filename => {
      setFileurl(COVER_BASE_URL + '/covers/' + uuid + '/' + filename);
    })
    .catch(e => {
      setFileurl("error!");
    });
  

  return (
    <img src={fileurl}/>
  )
}
