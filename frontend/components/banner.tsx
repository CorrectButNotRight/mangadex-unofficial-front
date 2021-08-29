import React from 'react'
import Banner from 'react-banner'
import '~/style/react-banner.css'

//TODO discuss replacing react-banner with a simple HTML+CSS banner
export default function MangaBanner() {
  return (
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
  )
}
