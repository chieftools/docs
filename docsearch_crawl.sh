#!/bin/bash

docker run -it --env-file=.env.local -e "CONFIG=$(cat docsearch_config.json | jq -r tostring)" algolia/docsearch-scraper
