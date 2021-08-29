import React from 'react'
import { useRouter } from 'aleph/react'

export function useParams(): object {
  // hypothetically current location patname is '/post/hello-world?theme=dark'
  const {
    basePath,      // string, should be '/'
    locale,        // string, should be 'en'
    defaultLocale, // string, should be 'en'
    locales,       // string[], should be ['en']
    pathname,      // string, should be '/post/hello-world'
    routePath,     // string, should be '/post/[slug]'
    params,        // object, should be {slug: 'hello-world'}
    query,         // URLSearchParams, `query.get('theme')` sholud be 'dark'
  } = useRouter();
  return params;
}

export function useQuery(): object {
  // hypothetically current location patname is '/post/hello-world?theme=dark'
  const {
    basePath,      // string, should be '/'
    locale,        // string, should be 'en'
    defaultLocale, // string, should be 'en'
    locales,       // string[], should be ['en']
    pathname,      // string, should be '/post/hello-world'
    routePath,     // string, should be '/post/[slug]'
    params,        // object, should be {slug: 'hello-world'}
    query,         // URLSearchParams, `query.get('theme')` sholud be 'dark'
  } = useRouter();
  return query;
}
