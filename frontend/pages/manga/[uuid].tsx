import React, { useState } from 'react'
import MangaBanner from '~/components/banner.tsx'
import MangaDescription from '~/components/manga-description.tsx'
import MangaCover from '~/components/manga-cover.tsx'
import { useParams } from '~/lib/useRouter.ts'
import { ERROR_TIMEOUT } from '~/lib/constants.ts'

// Generate contents of page from a successful fetch
function generateSuccessContent(uuid: string) {
    //<MangaDescription uuid={uuid}/>
    //<MangaCover uuid={uuid}/>
  const toReturn = (
    <MangaDescription uuid={uuid}/>
  );
  return toReturn;
}

//XXX Generate error message (could yoink and make generic)
function generateErrorContent() {
  return (
    <h2>Manga doesn't exist.</h2>
  );
}

// Manga overview component
export default function MangaOverview() {
  const uuid = useParams().uuid;
  const url = 'https://api.mangadex.org/manga/' + uuid;
  const [content, setContent] = useState("");

  fetch(url)
    .then(response => {
      if(!response.ok) {
        throw "Response not ok";
      }
      return response.json();
    })
    .then(jsonData => {
      if(jsonData.result != "ok") {
        throw "JSON not ok";
      }
      setContent(generateSuccessContent(uuid));
    })
    .catch(e => {
      console.error(e);
      setTimeout(() => {
        if(content === "") {
          setContent(generateErrorContent());
        }
      }, ERROR_TIMEOUT);
    });

  return (
    <div className="page">
      <head>
        <title>Manga Overview</title>
      </head>

      <MangaBanner/>

      <div className="App">
        {content}
      </div>
    </div>
  )
}
