import React from 'react'
import MangaBanner from '~/components/banner.tsx'

export default function Home() {
  return (
    <div className="page">
      <head>
        <title>Hello World - Mangadex Front</title>
        {/* <link rel="stylesheet" href="../style/index.css" /> */}
      </head>

      <MangaBanner/>

      <div className="App">
        <h1>Hello World!</h1>
        <li><a href="/manga/a96676e5-8ae2-425e-b549-7f15dd34a6d8">TEMPORARY LINK TO MANGA PAGE</a></li>
      </div>
    </div>
  );
}
