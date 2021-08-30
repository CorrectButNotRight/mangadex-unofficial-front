import React, { useState, useEffect } from 'react'
import MangaBanner from '~/components/banner.tsx'
import ChapterImages from '~/components/chapter-images.tsx'
import { useParams } from '~/lib/useRouter.ts'
import { API_BASE_URL } from '~/lib/constants.ts'

// Generate contents of page from a successful fetch
function generateSuccessContent(uuid: string) {
  return (
    <>
      <ChapterImages uuid={uuid}/>
    </>
  );
}

//XXX Generate error message (could yoink and make generic)
function generateErrorContent() {
  return (
    <h2>Chapter doesn't exist.</h2>
  );
}

export default function Chapter() {
  const uuid = useParams().uuid;
  const [content, setContent] = useState("");
  
  useEffect(() => {
    fetch(API_BASE_URL + '/chapter?ids[]=' + uuid)
      .then(response => {
        return response.ok
             ? Promise.resolve(response.json())
             : Promise.reject("Response not ok");
      })
      .then(jsonData => {
        if(jsonData.results.length == 0 || jsonData.results[0].result != "ok") {
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