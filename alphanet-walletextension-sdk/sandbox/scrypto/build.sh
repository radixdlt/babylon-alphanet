#!/bin/bash

set -x
set -e

cd "$(dirname "$0")"

(
    cd gumball-machine;
    scrypto build;
    resim publish . --manifest ../../public/gumball_machine.rtm
)