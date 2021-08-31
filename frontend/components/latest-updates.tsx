import React, { useState, useEffect } from 'react'
import { getUpdateList } from '~/lib/mangadex.ts'

// generateListElements(updateList) This function consumes an update list and outputs manga cover and title list
// [] -> []
function generateListElements(updateList: object) {
    // Note that we can't acually test this before comming up with a throttle for rate limits or we get banned so for now, it is pain.
    return "pain.";
}

// LatestUpdates() This function returns the manga cover and titles of the latest updates
// None => []
export default function LatestUpdates() {
    const [updateList, setUpdateList] = useState([]);
    useEffect(() => {
        getUpdateList()
          .then(chaptersList => {
            setUpdateList(chaptersList);
          })
          .catch(e => {
            console.error(e);
          });
      }, []);
    return generateListElements(updateList);
}