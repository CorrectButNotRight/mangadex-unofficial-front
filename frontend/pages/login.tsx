import React from 'react'
import MangaBanner from '~/components/banner.tsx'

export default function Home() {
  return (
    <div className="page">
      <head>
        <title>Login</title>
        {/* <link rel="stylesheet" href="../style/index.css" /> */}
      </head>

      <MangaBanner/>
      
      <script>
        function sendUsernames() {
          let username = document.getElementById("username");
          if(username.value == "") {
            return false;
          }
        }
      </script>
      <div className="App">
        <form action="javascript:sendUsernames()">
          <label htmlFor="username">Username:</label><br/>
          <input type="text" id="username" name="username"/><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="text" id="password" name="password"/><br/>
          <input type="submit" value="submit"/>
          </form>
      </div>
    </div>
  );
}
