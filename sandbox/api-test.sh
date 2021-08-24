#!/bin/sh

URL="api.mangadex.org"
DATA="data"

# Search for manga
curl -X GET "${URL}/manga?title=one"
# d8a959f7-648e-4c8d-8f23-f1f3f8e129f3

# Get chapter data
# Is there a way to get chapter ID's only?
# translatedLanguage[]=en
# limit=100
# offset=100 (if necessary)
curl -X GET "${URL}/chapter/?manga=${MANGA_ID}"
# Reponse gives us "total" field, keep querying until "offset" >= "total"
# Manually sort by volume, then by chapters

# Get home server
curl -X GET "${URL}/at-home/server/${CHAPTER_ID}"

# Get chapter image
curl -X GET "${HOME_URL}/${DATA}/${CHAPTER_HASH}/${IMAGE}"
