#!/bin/bash

# SYNOPSIS
#  quoteSubst <text>
quoteSubst() {
  IFS= read -d '' -r < <(sed -e ':a' -e '$!{N;ba' -e '}' -e 's/[&/\]/\\&/g; s/\n/\\&/g' <<<"$1")
  printf %s "${REPLY%$'\n'}"
}

which aleph &>/dev/null
if ! [[ $? -eq 0 ]] ; then
    echo "Aleph binary not found, please install aleph"
    exit
fi

SCRIPT_DIR=$(pwd)
NEW="frontend"
OLD="frontend-old"

mv $NEW $OLD
aleph upgrade
echo "\nEnter yes to all the following prompts\n"
aleph init frontend


cp -r $OLD/{components,lib,pages,style} $NEW
CONTENT="$(cat import_map_append.txt)"
sed -i '/\"imports\":.*{/a \\n'"$(quoteSubst "$CONTENT")" $NEW/import_map.json

rm -rf frontend-old

git add $NEW/{import_map.json,vercel.json}
git commit -m "UPDATE ALEPH VERSION $(aleph --version | head -n1)"
