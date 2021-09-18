import { FETCH_LIMIT , API_BASE_URL} from '~/lib/constants.ts'
import { apiFetch, homeFetch } from '~/lib/fetch.ts'
import { SortMode } from '~/lib/enums.ts'

async function getGroupNames(groupIds: object) {
  const groupMap = new Map();
  for(let uuid of groupIds) {
    const response = await apiFetch('/group?limit=1&ids[]=' + uuid);
    const jsonData = await response.json();
    const groupName = jsonData.data[0].attributes.name;
    groupMap.set(uuid, groupName);
  }
  return groupMap;
}

//getSearchResults(offset, sortMode, searchBar, excMode, excTags, incMode, incTags, reqSize) This function consumes exclusion, inclusion, and display mode of the search and returns
//                                                                                            the search result list
// Int SortMode String String String[] String String[] Int -> String[]
// Note: output example [{uuid}, manga name, {uuid}, manga name,...]
//       offset goes up by 1 everytime, index at 0, defaults to 0
//       excTags and incTags are arrays of strings of hashed tags
// Assume: 0 < reqSize <= 100
//         0 <= offset
//         searchBar not sanitized
export async function getSearchResults(offset=0, sortMode=SortMode.RelevanceDesc, searchBar="", excMode="OR", excTags=[], incMode="AND", incTags=[], reqSize=20) {

  let uri = "/manga?limit=" + reqSize + "&offset=" + (offset + 1)
  uri += "&includedTagsMode=" + incMode
  uri += "&excludedTagsMode=" + excMode
  if (sortMode == SortMode.Newest) {
    uri += "&order[latestUploadedChapter]=desc"
  } else if (sortMode == SortMode.Oldest) {
    uri += "&order[latestUploadedChapter]=asc"
  } else if (sortMode == SortMode.Relevancedesc) {
    uri += "&order[relevance]=desc"
  } else if (sortMode == SortMode.RelevanceAsc) {
    uri += "&order[relevance]=asc"
  } else if (sortMode == SortMode.FolloweAsc) {
    uri += "&order[followedCount]=desc"
  } else if (sortMode == SortMode.FolloweDesc) {
    uri += "&order[followedCount]=asc"
  }
  for (let tag of excTags) {
    uri += "&excludeTags[]=" + tag
  }
  for (let tag of incTags) {
    uri += "&includeTags[]=" + tag
  }
  uri += "&title=" + searchBar
  let response = await apiFetch(encodeURI(uri));
  let jsonData = await response.json();
  const updateArray = [];
  for (let i=0; i<((offset + 1)*reqSize); i+=1) {
    const data = jsonData.data[i];
    updateArray.push(data.id);
    updateArray.push(data.attributes.title.en);
  }
  return updateArray;
}

// getUpdateList(offset, reqSize) this function consumes 'request size' and 'offset' then returns the 'recent update' list
// Int Int String[] -> String[]
// Note: output example [{uuid}, manga name, {uuid}, manga name,...]
//       offset goes up by 1 everytime, index at 0, defaults to 0
// Assume: 0 < reqSize <= 100
//         0 <= offset
export async function getUpdateList(offset=0, reqSize=20, excTags=[]) {
  return getSearchResults(offset, SortMode.Newest, "", "OR", excTags, "AND", [], reqSize);
}

export async function getChapterList(uuid: string) {
  // Empty request to get total chapters
  let response = await apiFetch('/chapter?limit=' + 0 + '&manga=' + uuid + '&translatedLanguage[]=en');
  let jsonData = await response.json();
  const total = parseInt(jsonData.total, 10);

  const promiseArray = [];
  for(let i=0; i<total; i+=FETCH_LIMIT) { // Due to API fetch limits
    const response = await apiFetch('/chapter?limit=' + FETCH_LIMIT + '&offset=' + i + '&manga=' + uuid + '&translatedLanguage[]=en');
    promiseArray.push(response.json());
  }
  
  const jsonArray = await Promise.all(promiseArray);
  if(jsonArray[0].results.length === 0) {
    return Promise.reject("No chapters");
  }

  const chapterArray = [];
  const groupSet = new Set();
  for(let jsonData of jsonArray) {
    for(let j=0; j<jsonData.data.length; j++) { // Iterate over all results returned from our fetch
      let groupId = "";
      const relationships = jsonData.data[j].relationships;
      for(let relationship of relationships) {
        if(relationship.type === "scanlation_group") {
          groupSet.add(relationship.id);
          groupId = relationship.id
        }
      }

      const attributes = jsonData.data[j].attributes;
      const chapterNumber = Number(attributes.chapter) === NaN ? 0 : Number(attributes.chapter);
      const chapterName = attributes.title === null ? "" : attributes.title;
      const chapterId = jsonData.data[j].id;

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
  let response = await apiFetch('/cover?limit=' + 0 + '&manga[]=' + uuid);
  let jsonData = await response.json();
  const total = parseInt(jsonData.total, 10);
  const tempVolume = [-1, "getCover"];
  const nameExtension = '.512.jpg';

  const fetchPromises = [];
  for(let i=0; i<total; i+=FETCH_LIMIT) { // Due to API fetch limits
    fetchPromises.push(apiFetch('/cover?limit=' + FETCH_LIMIT + '&offset=' + i + '&manga[]=' + uuid).then(response => response.json()));
  }

  const jsonArray = await Promise.all(fetchPromises);
  if(jsonArray[0].data.length === 0) {
    return Promise.reject("Cover not found");
  }

  for(let jsonData of jsonArray) {
    for(let j=0; j<jsonData.data.length; j++) { // Iterate over all results returned from our fetch
      const attributes = jsonData.data[j].attributes;
      const volume = Number(attributes.volume);
      if(volume !== NaN) {
        if(volume > tempVolume[0]) {
          tempVolume[0] = parseInt(attributes.volume, 10);
          tempVolume[1] = attributes.fileName + nameExtension;
        }
      }
      else if(tempVolume[0] === -1) {
        tempVolume = [0, attributes.fileName + nameExtension];
      }
    }
  }
  return tempVolume[1];
}

export async function getChapterImages(uuid: string) {
  let response = await homeFetch(uuid);
  let jsonData = await response.json();
  const fileurl = jsonData.baseUrl;

  response = await apiFetch('/chapter?limit=1&ids[]=' + uuid);
  jsonData = await response.json();
  const attributes = jsonData.data[0].attributes;
  const hash = attributes.hash;
  const filenames = attributes.data;

  const pathArray = [];
  for(let filename of filenames) {
    pathArray.push(fileurl + '/data/' + hash + '/' + filename);
  }
  return pathArray;
}
