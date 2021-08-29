import React, { useState } from 'react'

//TODO figure out how to loop async data
export default function MangaCover({ uuid }: { uuid: string }) {
  fetch('https://api.mangadex.org/manga/' + uuid)
    .then(response => response.json())
    .then(jsonData => {
      setDescription(jsonData.data.attributes.description.en);
    })
    .catch(err => {
      console.log(err);
      setDescription("Description not found");
    });
  
  return (
    <p>Cover</p>
  )
}
