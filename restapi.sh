#!/bin/bash
USERNAME=huangziji
# -H "Accept: application/vnd.github+json" \
# -H "X-GitHub-Api-Version: 2022-11-28" \

case "$1" in
  init)
    curl \
      -H "Authorization: token $3" \
      -d '{"name": "'$2'", "private": false}' \
      https://api.github.com/user/repos
    ;;
  rm)
    curl -X DELETE \
      -H "Authorization: token $3" \
      https://api.github.com/repos/$USERNAME/$2
    ;;
  mv)
    curl -X PATCH \
      -H "Authorization: token $3" \
      -d '{"name": "'$3'"}' \
      https://api.github.com/repos/$USERNAME/$2
    ;;
  ls)
      # -H "Authorization: Bearer $GITHUB_TOKEN" \
    curl \
      https://api.github.com/users/$USERNAME/repos \
      | jq '.[] | .html_url'
    ;;
  *)
    echo "Invalid option"
    exit 1
    ;;
esac
