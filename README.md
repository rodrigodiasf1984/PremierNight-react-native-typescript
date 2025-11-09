# Premiere Night

## Summary

A small cross-platform app to help curators discover films and create a watchlist. Uses TMDb as the data source.

## What’s included

- Home screen with horizontal carousel (popular movies)
- Detail screen with poster, synopsis, release date, genres
- Watchlist screen with add/remove and persistence (Zustand + AsyncStorage)
- Layered structure: api, domain, repositories, store, hooks (viewmodels), screens, components, navigation and utils

## Tech & prerequisites

    * you must execute => npm run install --legacy-peer-deps is mandatory because the react-native-fast-image@8.6.3 (which doesn't support React 19.x due to its peer requirement of React ^17 || ^18),

    * the app doesn't compile for android, there is a problem with the cmake, some library aren't compatible with the react version 19, i need more time to check the problems, try to fix it or downgrade the version of react.

- Node 16+ (or as required by RN version)
- npm or yarn
- Xcode (macOS) for iOS, Android Studio for Android
- React Native CLI (bare RN project)
- Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    cd ios && pod install && cd ..
    ```

## TMDb API key

- Create a .env file in the project root:
- MOVIES_API_KEY = you api key from https://www.themoviedb.org/

Run the app (example)

iOS:

npm run ios

## Architecture & design decisions

Eslint, prettier and husky for code standars, thi husky run the scripts:
-npm test,
-npm run check-format,
so if the unit tests fails you need to fix them before trying to commit.

Zustand chosen for simple and testable local state (watchlist). Persist middleware with AsyncStorage to satisfy the persistence bonus.

Repository pattern (movieRepository) isolates network layer.

View-model hooks (useHomeViewModel, useDetailViewModel,useDetailsNavigation ) encapsulate side effects and keep screens focused on rendering.

Performance: LegendList with stable keys, useCallback and useMemo to avoid re-renders. Poster images are cached by the native image loader; swap in react-native-fast-image for improved caching if desired.

Trade-offs: Due to time, focus was on functionality and clean separation — advanced transitions (Reanimated coverflow) were left as a nice-to-have.

Outstanding / next steps

Add more robust error UI and retry flows.

Improve image caching (fast-image), add shimmer placeholders.

Add unit tests for hooks/viewmodels (mock repository).

Add accessible animations and fine-tune layout on tablets.

Add tailwindCSS to speed development.

Add detox for E2E.

Notes for reviewers

Home -> tap a poster -> opens Detail.

From Detail, tap Add / Remove to persist the movie in the Watchlist.

Watchlist persists across app launches,
in the watchlist when you tap the poster image, if the movie has an url from netflix example: https://www.netflix.com/title/81507921, the app tries to open the netflix app with deeplinking otherwise the website will be open.
