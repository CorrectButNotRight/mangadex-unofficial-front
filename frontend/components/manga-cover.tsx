import React, { useState, useEffect } from 'react'
import { COVER_BASE_URL } from '~/lib/constants.ts'
import { getCover } from '~/lib/mangadex.ts'


// MangaCover() fetches the latest cover for the given manga uuid
// Inputs
// - uuid: valid manga uuid
export default function MangaCover({ uuid }: { uuid: string }) {
  const [fileurl, setFileurl] = useState("");

  useEffect(() => {
    getCover(uuid)
      .then(filename => {
        setFileurl(COVER_BASE_URL + '/covers/' + uuid + '/' + filename);
      })
      .catch(e => {
        setFileurl("Cover not available");
      });
  }, []);

  if(fileurl.indexOf('/covers/') !== -1) {
    return (
      <img src={fileurl}/>
    );
  }
  else {
    return (
      <p>{fileurl}</p>
    );
  }
}
