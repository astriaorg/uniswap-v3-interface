#!/bin/bash

# This is some ridiculous BS because TypeScript won't compile inside of node_modules.
# We have to clone the repo, build it, and then symlink it to node_modules.
#
# probably a better way to do this but this brute force sledge hammer works for now.
(
  if [ ! -d "smart-order-router" ]; then
    git clone git@github.com:astriaorg/uniswap-smart-order-router.git smart-order-router
  else
    cd smart-order-router
    git pull
    cd ..
  fi
  cd smart-order-router
  yarn
  yarn build
  cd ..
  rm -fr node_modules/@uniswap/smart-order-router
  ln -s ../../../smart-order-router node_modules/@uniswap/smart-order-router
)
