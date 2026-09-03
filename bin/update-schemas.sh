#!/usr/bin/env bash

set -euo pipefail

curl --fail --silent --show-error --location \
  https://account.chief.app/api/spec/v1.json \
  --output apis/accountchief.json

curl --fail --silent --show-error --location \
  https://account.chief.app/api/graphql/schema \
  --output apis/accountchief.graphql

curl --fail --silent --show-error --location \
  https://domain.chief.app/api/spec/v1.json \
  --output apis/domainchief.json

curl --fail --silent --show-error --location \
  https://flowguard.network/api/spec/v1.json \
  --output apis/flowguard.json

curl --fail --silent --show-error --location \
  https://cert.chief.app/api/graphql/schema \
  --output apis/certchief.graphql

curl --fail --silent --show-error --location \
  https://tny.app/api/graphql/schema \
  --output apis/tny.graphql

curl --fail --silent --show-error --location \
  https://deploy.chief.app/api/graphql/schema \
  --output apis/deploychief.graphql
