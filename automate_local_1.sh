#!/usr/bin/env bash
start=$(date +%s)
rm -rf features/cucumberstudio
hiptest-publisher --config-file test/hiptest-publisher.conf --test-run-id 529997 --only=features
yarn test --exit
hiptest-publisher --config-file test/hiptest-publisher.conf --push test/results.json  --test-run-id 529997 --push-format cucumber-json
end=$(date +%s)
echo $(($end-$start))
