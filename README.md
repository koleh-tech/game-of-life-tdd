# TDD Practice - Game of life

This project let me practice Test Driven Development as well as setting up CICD pipelines for React projects.

Although the main [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules) logic was driven with TDD,
the UI development was mainly guided by Typescript.

## Live instance

View the live instance here: [live instance](https://koleh-tech.github.io/game-of-life-tdd/).

## How to run locally

```
# Install dependencies
npm install

# Running the app with hot reloading
npm run dev

# Running the tests with autowatch
npm run test

# Run tests once off
npm run test-on-ci

# Auto format the code
npm run format
```

See the scripts contained in `package.json` for more commands, as well as `github/workflows/test.yml` to see how these commands are run
on CI.
