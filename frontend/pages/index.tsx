import { useDeno } from 'aleph/react'
import React from 'react'
import Logo from '~/components/logo.tsx'
import useCounter from '~/lib/useCounter.ts'
import Banner from 'react-banner'
import '~/style/react-banner.css'
import MangaDescription from '~/components/manga-description.tsx'

export default function Home() {
  const [count, isSyncing, increase, decrease] = useCounter()
  const version = useDeno(() => Deno.version.deno)

  return (
    <div className="page">
      <head>
        <title>Hello World - Aleph.js</title>
        {/* <link rel="stylesheet" href="../style/index.css" /> */}
      </head>

      <Banner
        logo="My Logo"
        url={ window.location.pathname }
        items={[
          { "content": "Example Link", "url": "/example" },
          { "content": "Another", "url": "/another" },
          { "content": "Link w/ Children", "url": "/children", "children": [
            { "content": "John", "url": "/children/john" },
            { "content": "Jill", "url": "/children/jill" },
            { "content": "Jack", "url": "/children/jack" }
          ]}
        ]} />
      <div className="App">
        <h1>Hello World!</h1>
        <MangaDescription uuid="a96676e5-8ae2-425e-b549-7f15dd34a6d8" />
      </div>
    </div>
  )
}
