import React, { useState } from 'react'
import jsonFetch from '~/lib/fetch.ts'

export default function MangaDescription({ uuid }: { uuid: string }) {
  // GET request URL
  let url = 'https://api.mangadex.org/manga/' + uuid;

  // Init a React state for 'description' and define how to modify it
  const [description, setDescription] = useState("");
  let jsonClosure = (jsonData) => {
    if(jsonData.data.attributes.description.hasOwnProperty('en')) {
      setDescription(jsonData.data.attributes.description['en']);
    }
    else {
      setDescription("Description not found.");
    }
  };

  // JS fetch
  jsonFetch(url, jsonClosure);

  return (
    <p>{description}</p>
  )
}
