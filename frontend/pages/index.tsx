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
        <a href="/manga">TEMPORARY LINK TO MANGA PAGE</a>
      </div>
    </div>
  )
}
