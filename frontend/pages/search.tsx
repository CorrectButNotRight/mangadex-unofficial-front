import React from 'react'
import MangaBanner from '~/components/banner.tsx'
import Searching from '~/components/searchBar.tsx'
import { SortMode } from '~/lib/enums.ts'

export default function search() {
    return (
        <div className="page">
          <head>
            <title>Hello World - Mangadex Front</title>
            {/* <link rel="stylesheet" href="../style/index.css" /> */}
          </head>
    
          <MangaBanner/>
          
          <div className="App">
            <h1>Hello Search!</h1>
          </div>
          <div>
            <Searching/>
          </div>
        </div>
      );
}