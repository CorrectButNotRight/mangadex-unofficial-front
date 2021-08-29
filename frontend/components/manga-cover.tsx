import React, { useState } from 'react'
import { FETCH_LIMIT } from '~/lib/constants.ts'


async function getCover(uuid: string) {
  let response = await fetch('https://api.mangadex.org/cover?manga[]=' + uuid);
  let jsonData = response.json();
  /* .then(jsonData => parseInt(jsonData.total, 10)); */
  const total = parseInt(jsonData.total, 10);
  let tempVolume = [-1, "getCover"];

  //TODO get this block working
  response = await fetch('https://api.mangadex.org/cover?limit=' + FETCH_LIMIT + '&manga[]=' + uuid);
  jsonData = response.json();
  tempVolume[0] = parseInt(jsonData.results[0].data.attributes.volume, 10);
  tempVolume[1] = jsonData.results[0].data.attributes.fileName;

  /* const [tempVolume, setTempVolume] = useState([-1, ""]); */
  // for(let i=0; i<total; i+=FETCH_LIMIT) { // Due to API fetch limits
  //   const response = await fetch('https://api.mangadex.org/cover?limit=' + FETCH_LIMIT + '&manga[]=' + uuid);
  //   /* .then(response => response.json()) */
  //   const jsonData = response.json();
  //   tempVolume[0] = parseInt(jsonData.results[0].data.attributes.volume, 10);
  //   tempVolume[1] = jsonData.results[0].data.attributes.fileName;
  //   // for(let j=0; j<jsonData.results.length; j++) { // Iterate over all results returned from our fetch
  //   //   if(jsonData.results[j].data.attributes.volume !== null) {
  //   //     if(parseInt(jsonData.results[j].data.attributes.volume, 10) > tempVolume[0]) {
  //   //       /* setTempVolume([parseInt(jsonData.results[j].data.attributes.volume, 10), jsonData.results[j].data.attributes.fileName]); */
  //   //       /* tempVolume = [parseInt(jsonData.results[j].data.attributes.volume, 10), jsonData.results[j].data.attributes.fileName]; */
  //   //       tempVolume[0] = parseInt(jsonData.results[j].data.attributes.volume, 10);
  //   //       tempVolume[1] = jsonData.results[j].data.attributes.fileName;
  //   //     }
  //   //   }
  //   //   else if(tempVolume[0] === -1) {
  //   //     /* setTempVolume([0, jsonData.results[j].data.attributes.fileName]); */
  //   //     tempVolume = [0, jsonData.results[j].data.attributes.fileName];
  //   //   }
  //   // }

  //   //  .then(jsonData => {
  //   //    for(let j=0; j<jsonData.results.length; j++) { // Iterate over all results returned from our fetch
  //   //      if(jsonData.results[j].data.attributes.volume !== null) {
  //   //        if(parseInt(jsonData.results[j].data.attributes.volume, 10) > tempVolume[0]) {
  //   //          setTempVolume([parseInt(jsonData.results[j].data.attributes.volume, 10), jsonData.results[j].data.attributes.fileName]);
  //   //          /* tempVolume = [parseInt(jsonData.results[j].data.attributes.volume, 10), jsonData.results[j].data.attributes.fileName]; */
  //   //        }
  //   //      }
  //   //      else if(tempVolume[0] === -1) {
  //   //        setTempVolume([0, jsonData.results[j].data.attributes.fileName]);
  //   //        /* tempVolume = [0, jsonData.results[j].data.attributes.fileName]; */
  //   //      }
  //   //    }
  //   //    /* jsonData.results.forEach((obj) => {
  //   //     *   if(obj.data.attributes.volume !== null) {
  //   //     *     if(parseInt(obj.data.attributes.volume, 10) > tempVolume[0]) {
  //   //     *       setTempVolume([parseInt(obj.data.attributes.volume, 10), obj.data.attributes.fileName]);
  //   //     *     }
  //   //     *   }
  //   //     *   else if(tempVolume[0] === -1) {
  //   //     *     setTempVolume([0, obj.data.attributes.fileName]);
  //   //     *   }
  //   //     * }); */
  //   //  });
  // }
  return tempVolume;
}

//TODO figure out how to loop async data
// MangaCover() fetches the latest cover for the given manga uuid
// Inputs
// - uuid: valid manga uuid
export default function MangaCover({ uuid }: { uuid: string }) {
  const [volumePair, setVolumePair] = useState([-1, "MangaCover"]);
  /* const [tempVolume, setTempVolume] = useState([-1, ""]); */
  /* const [counter, setCounter] = useState(0);
   * const [total, setTotal] = useState(0); */

  /* getCover(uuid)
   *   .then(pair => {
   *     setVolumePair([pair[0], pair[1]]);
   *   })
   *   .catch(e => console.error(e));
   */
  // fetch('https://api.mangadex.org/cover?manga[]=' + uuid)
  //   .then(response => response.json())
  //   .then(jsonData => { // Fetch #1 to find out total results
  //     /* setTotal(parseInt(jsonData.total, 10));
  //      * setCounter(parseInt(jsonData.offset, 10) + parseInt(jsonData.limit, 10)); */
  //     /* console.log(jsonData['offset'] + ' ' + jsonData.limit + ' ' + jsonData.total); */
  //     /* console.log(jsonData); */
  //     /* setVolumePair([0, "yahallo"]); */
  //     /* return [parseInt(jsonData.offset, 10) + parseInt(jsonData.limit, 10), parseInt(jsonData.total, 10)]; */
  //     return parseInt(jsonData.total, 10);
  //   })
  //   .then(total => { // Fetch #2 loop on all of the results
  //     for(let i=0; i<total; i+=FETCH_LIMIT) {
  //       console.log(i);
  //       /* setTempVolume([i, "test"]); */
  //       fetch('https://api.mangadex.org/cover?limit=' + FETCH_LIMIT + '&manga[]=' + uuid)
  //         .then(response => response.json())
  //         .then(jsonData => {
  //           /* setTempVolume([0, jsonData.results.length]); */
  //           //FIXME prone to issues if volume isn't defined
  //           /* setTempVolume(jsonData.results.length); */
  //           // for(let obj in jsonData.results) {
  //           //   if(obj.data.attributes.volume !== null) {
  //           //     if(parseInt(obj.data.attributes.volume, 10) > tempVolume[0]) {
  //           //       setTempVolume([parseInt(obj.data.attributes.volume, 10), obj.data.attributes.fileName]);
  //           //     }
  //           //   }
  //           //   else if(tempVolume[0] === -1) {
  //           //     setTempVolume([0, obj.data.attributes.fileName]);
  //           //   }
  //           // }
  //           for(let j=0; j<jsonData.results.length; j++) {
  //             if(jsonData.results[j].data.attributes.volume !== null) {
  //               if(parseInt(jsonData.results[j].data.attributes.volume, 10) > tempVolume[0]) {
  //                 setTempVolume([parseInt(jsonData.results[j].data.attributes.volume, 10), jsonData.results[j].data.attributes.fileName]);
  //               }
  //             }
  //             else if(tempVolume[0] === -1) {
  //               setTempVolume([0, jsonData.results[j].data.attributes.fileName]);
  //             }
  //           }
  //           // jsonData.results.forEach((obj) => {
  //           //   if(obj.data.attributes.volume !== null) {
  //           //     if(parseInt(obj.data.attributes.volume, 10) > tempVolume[0]) {
  //           //       setTempVolume([parseInt(obj.data.attributes.volume, 10), obj.data.attributes.fileName]);
  //           //     }
  //           //   }
  //           //   else if(tempVolume[0] === -1) {
  //           //     setTempVolume([0, obj.data.attributes.fileName]);
  //           //   }
  //           // });
  //         })
  //         .catch(err => console.error(err));
  //     }
  //     setVolumePair(tempVolume);
  //   })
  //   .catch(e => {
  //     setTimeout(() => {
  //       if(content === "") {
  //         setVolumePair([-1, "Cover not found"]);
  //       }
  //     }, ERROR_TIMEOUT);
  //     console.error(e);
  //   });
  
  return (
    <p>{volumePair[0]} {volumePair[1]}</p>
  )
}
