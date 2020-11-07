![build-test](https://github.com/guyarb/deny-not-updated-branch/workflows/build-test/badge.svg)

# deny-not-updated-branch
A github action fails a workflow if the branch is not up to date with the target branch.
You must add a branch protection rule of `Require branches to be up to date before merging`.

## How to use

Add to your workflow the following contents:

```yaml
name: workflow

on:
  push:
    branches: [ '**' ]
  pull_request:
    branches: [ '**' ]

jobs:
  full_ci:
    runs-on: ubuntu-18.04

    steps:
      - uses: guyarb/deny-not-updated-branch@v1.0.0

```

## Development of this action

1. Fork this repo.
2. Create a branch with your feature/bugfix.
3. Open a PR to me.

## Issues
Please open issues for any bug or suggestion you have.
