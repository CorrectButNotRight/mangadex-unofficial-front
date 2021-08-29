import React, { useState } from 'react'
import jsonFetch from '~/lib/fetch.ts'
import { ERROR_TIMEOUT } from '~/lib/constants.ts'

export default function MangaDescription({ uuid }: { uuid: string }) {
  // GET request URL
  const url = 'https://api.mangadex.org/manga/' + uuid;

  // Init a React state for 'description' and define how to modify it
  const [description, setDescription] = useState("");

  // JS fetch
  fetch('https://api.mangadex.org/manga/' + uuid)
    .then(response => {
      if(!response.ok) {
        throw "Response not ok"
      }
      return response.json();
    })
    .then(jsonData => {
      setDescription(jsonData.data.attributes.description.en);
    })
    .catch(e => {
      setTimeout(() => {
        if(content === "") {
          setDescription("Description not found");
        }
      }, ERROR_TIMEOUT);
      console.error(e);
    });

  return (
    <p>{description}</p>
  )
}
