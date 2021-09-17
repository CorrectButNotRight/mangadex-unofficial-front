import React, { useState, useEffect } from 'react'
import MangaBanner from '~/components/banner.tsx'
import MangaDescription from '~/components/manga-description.tsx'
import MangaCover from '~/components/manga-cover.tsx'
import MangaChapters from '~/components/manga-chapters.tsx'
import { useParams } from '~/lib/useRouter.ts'
import { apiFetch } from '~/lib/fetch.ts'

// Generate contents of page from a successful fetch
function generateSuccessContent(uuid: string) {
  return (
    <>
      <MangaDescription uuid={uuid}/>
      <MangaCover uuid={uuid}/>
      <MangaChapters uuid={uuid}/>
    </>
  );
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
  const [content, setContent] = useState("");

  useEffect(() => {
    apiFetch('/manga/' + uuid)
      .then(response => {
        return response.ok
             ? Promise.resolve(response.json())
             : Promise.reject("Response not ok");
      })
      .then(jsonData => {
        if(jsonData.result != "ok") {
          throw "JSON not ok";
        }
        setContent(generateSuccessContent(uuid));
      })
      .catch(e => {
        console.error(e);
        setContent(generateErrorContent(uuid));
      });
  }, []);

  return (
    <div className="page">
      <head>
        <title>Manga Overview</title>
      </head>

      <main>
        <MangaBanner/>

        <div className="App">
          {content}
        </div>
      </main>
    </div>
  );
}
