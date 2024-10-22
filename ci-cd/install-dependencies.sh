#!/bin/bash
set -eux
rm ~/.npmrc | true
echo @npm-bbta:registry=https://bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/ > ~/.npmrc
curl -u "${ARTIFACTORY_READER_USER}:${ARTIFACTORY_READER_API_KEY}" 'https://bbogdigital.jfrog.io/bbogdigital/api/npm/auth' >> ~/.npmrc

npm install
