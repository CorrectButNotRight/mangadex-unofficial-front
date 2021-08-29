import { useState } from 'react'

// Consider making a textFetch function

// jsonFetch performs a GET request on a URL and processes the response as JSON
// Inputs
//   - url: the URL to perform a GET request on
//   - callback: function that uses JSON as input and performs side effects
// Output
//   None
export default function jsonFetch(url: string, callback: (any) => void) {
  fetch(url)
    .then(response => response.json())
    .then(callback)
    .catch(err => {
      console.error(err);
    });
}
