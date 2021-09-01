
async function limitedFetch(url: string) {
  const response = await fetch(url);
  const headers = response.headers;
  const remaining = headers.get('X-RateLimit-Remaining');
  const timestamp = headers.get('X-RateLimit-Retry-After');
  console.log(headers);
  if(remaining != null && timestamp != null) {
      console.log('Stamp:' + timestamp + ' ' + remaining);
      console.log('Now:  ' + Date.now() / 1000);
  }
  return response;
}

const uuid = 'e86ec2c4-c5e4-4710-bfaa-7604f00939c7';
const url = 'https://api.mangadex.org/at-home/server/' + uuid;
limitedFetch(url)
.then(response => response.json())
.then(jsonData => {
    console.log("received json");
});
