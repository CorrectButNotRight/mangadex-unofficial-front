import React, { useState } from 'react'

//TODO figure out how to loop async data
// MangaCover() fetches the latest cover for the given manga uuid
// Inputs
// - uuid: valid manga uuid
export default function MangaCover({ uuid }: { uuid: string }) {
  const [volumePair, setVolumePair] = useState([-1, ""]);
  const [counter, setCounter] = useState(0);
  const [total, setTotal] = useState(0);
  fetch('https://api.mangadex.org/cover?manga[]=' + uuid)
    .then(response => response.json())
    .then(jsonData => {
      setTotal(parseInt(jsonData.total, 10));
      setCounter(parseInt(jsonData.offset, 10) + parseInt(jsonData.limit, 10));
      //FIXME prone to issues if volume isn't defined
      jsonData.results.forEach((obj) => {
        if(obj.data.attributes.volume !== null) {

        }
        else if(volumePair === -1) {
          setVolumePair([0, obj.data.attributes.fileName]);
        }
      });
    })
    .catch(err => {
      console.log(err);
      setDescription("Description not found");
    });
  
  return (
    <p>Cover</p>
  )
}
