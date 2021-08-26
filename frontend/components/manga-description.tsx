import React, { useState } from 'react'

/* TODO:
 * - understand function parameters
 * - JSON check for English description */
export default function MangaDescription({ uuid }: { uuid: string }) {
  const [description, setDescription] = useState("");
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
    <p>{description}</p>
  )
}
