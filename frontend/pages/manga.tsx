import React from 'react'
import MangaBanner from '~/components/banner.tsx'
import MangaDescription from '~/components/manga-description.tsx'
import MangaCover from '~/components/manga-cover.tsx'

export default function MangaOverview() {
  return (
    <div className="page">
      <head>
        <title>Manga Overview</title>
      </head>

      <MangaBanner/>

      <div className="App">
        <MangaDescription uuid="a96676e5-8ae2-425e-b549-7f15dd34a6d8" />
        {/* <MangaCover uuid="a96676e5-8ae2-425e-b549-7f15dd34a6d8" /> */}
      </div>
    </div>
  )
}
