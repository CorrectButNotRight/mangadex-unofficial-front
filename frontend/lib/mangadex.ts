import { API_BASE_URL, FETCH_LIMIT } from '~/lib/constants.ts'

async function getGroupNames(groupIds: object) {
  const groupMap = new Map();
  for(let uuid of groupIds) {
    const response = await fetch(API_BASE_URL + '/group?limit=1&ids[]=' + uuid);
    const jsonData = await response.json();
    const groupName = jsonData.results[0].data.attributes.name;
    groupMap.set(uuid, groupName);
  }
  return groupMap;
}

export async function getChapterList(uuid: string) {
  // Empty request to get total chapters
  let response = await fetch(API_BASE_URL + '/chapter?limit=' + 0 + '&manga=' + uuid + '&translatedLanguage[]=en');
  let jsonData = await response.json();
  const total = parseInt(jsonData.total, 10);

  const promiseArray = [];
  for(let i=0; i<total; i+=FETCH_LIMIT) { // Due to API fetch limits
    const response = await fetch(API_BASE_URL + '/chapter?limit=' + FETCH_LIMIT + '&offset=' + i + '&manga=' + uuid + '&translatedLanguage[]=en');
    promiseArray.push(response.json());
  }
  
  const jsonArray = await Promise.all(promiseArray);
  if(jsonArray[0].results.length === 0) {
    return Promise.reject("No chapters");
  }

  const chapterArray = [];
  const groupSet = new Set();
  for(let jsonData of jsonArray) {
    for(let j=0; j<jsonData.results.length; j++) { // Iterate over all results returned from our fetch
      let groupId = "";
      const relationships = jsonData.results[j].relationships;
      for(let relationship of relationships) {
        if(relationship.type === "scanlation_group") {
          groupSet.add(relationship.id);
          groupId = relationship.id
        }
      }

      const attributes = jsonData.results[j].data.attributes;
      const chapterNumber = Number(attributes.chapter) === NaN ? 0 : Number(attributes.chapter);
      const chapterName = attributes.title === null ? "" : attributes.title;
      const chapterId = jsonData.results[j].data.id;

      // chapterArray.push([chapterNumber, chapterName, groupId]);
      chapterArray.push({
        number: chapterNumber,
        name: chapterName,
        uuid: chapterId,
        group: groupId
      });
    }
  }

  const groupMap = await getGroupNames(groupSet);
  for(let chapterIdx = 0; chapterIdx < chapterArray.length; chapterIdx++) {
    const groupName = groupMap.get(chapterArray[chapterIdx].group);
    chapterArray[chapterIdx].group = groupName === undefined ? "" : groupName;
  }

  chapterArray.sort((a, b) => {
    const numberDiff = a.number - b.number;
    if(numberDiff === 0) {
      return a.group.localeCompare(b.group);
    }
    else {
      return numberDiff;
    }
  });

  return chapterArray;
}

export async function getCover(uuid: string) {
  // Empty request to get total covers
  let response = await fetch(API_BASE_URL + '/cover?limit=' + 0 + '&manga[]=' + uuid);
  let jsonData = await response.json();
  const total = parseInt(jsonData.total, 10);
  const tempVolume = [-1, "getCover"];

  const promiseArray = [];
  for(let i=0; i<total; i+=FETCH_LIMIT) { // Due to API fetch limits
    const response = await fetch(API_BASE_URL + '/cover?limit=' + FETCH_LIMIT + '&offset=' + i + '&manga[]=' + uuid);
    promiseArray.push(response.json());
  }
  
  const jsonArray = await Promise.all(promiseArray);
  if(jsonArray[0].results.length === 0) {
    return Promise.reject("Cover not found");
  }

  for(let jsonData of jsonArray) {
    for(let j=0; j<jsonData.results.length; j++) { // Iterate over all results returned from our fetch
      const attributes = jsonData.results[j].data.attributes;
      const volume = Number(attributes.volume);
      if(volume !== NaN) {
        if(volume > tempVolume[0]) {
          tempVolume[0] = parseInt(attributes.volume, 10);
          tempVolume[1] = attributes.fileName;
        }
      }
      else if(tempVolume[0] === -1) {
        tempVolume = [0, attributes.fileName];
      }
    }
  }
  return tempVolume[1];
}

export async function getChapterImages(uuid: string) {
  let response = await fetch(API_BASE_URL + '/at-home/server/' + uuid);
  let jsonData = await response.json();
  const fileurl = jsonData.baseUrl;

  response = await fetch(API_BASE_URL + '/chapter?limit=1&ids[]=' + uuid);
  jsonData = await response.json();
  const attributes = jsonData.results[0].data.attributes;
  const hash = attributes.hash;
  const filenames = attributes.data;

  const pathArray = [];
  for(let filename of filenames) {
    pathArray.push(fileurl + '/data/' + hash + '/' + filename);
  }
  return pathArray;
}