import React, { useState, useEffect } from 'react'
import jsonFetch from '~/lib/fetch.ts'
import { API_BASE_URL } from '~/lib/constants.ts'

export default function MangaDescription({ uuid }: { uuid: string }) {
  // Init a React state for 'description' and define how to modify it
  const [description, setDescription] = useState("");

  // JS fetch
  useEffect(() => {
    fetch(API_BASE_URL + '/manga/' + uuid)
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
        console.error(e);
      });
  }, []);

  return (
    <p>{description}</p>
  )
}
