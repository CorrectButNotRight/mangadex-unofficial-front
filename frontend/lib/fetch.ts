import { useState } from 'react'
import { API_BASE_URL } from '~/lib/constants.ts'
import throttle from 'fetch-throttle'

const apiThrottle = throttle(fetch, 5, 1000);
const imageThrottle = throttle(fetch, 20, 1000);
const homeThrottle = throttle(fetch, 40, 60000);

export async function apiFetch(endpoint: string) {
  return apiThrottle(API_BASE_URL + endpoint);
}

export async function imageFetch(url: string) {
  return imageThrottle(url);
}

export async function homeFetch(uuid: string) {
  return homeThrottle(API_BASE_URL + '/at-home/server/' + uuid);
}
