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

    * The app doesn't compile for Android; there is a problem with CMake, and some libraries aren't compatible with React version 19. I need more time to check the problems, try to fix them or downgrade the version of React.

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
- MOVIES_API_KEY = your api key from https://www.themoviedb.org/

Run the app (example)

iOS:

npm run ios

## Architecture & design decisions

Eslint, prettier and husky for code standards. The husky runs the scripts:
-npm test,
-npm run check-format,
So if the unit tests fail, you need to fix them before trying to commit.

Zustand chosen for simple and testable local state (watchlist). Persist middleware with AsyncStorage to satisfy the persistence bonus.

Repository pattern (movieRepository) isolates the network layer.

View-model hooks (useHomeViewModel, useDetailViewModel,useDetailsNavigation ) encapsulate side effects and keep screens focused on rendering.

Performance: LegendList with stable keys, useCallback and useMemo to avoid re-renders. Poster images are cached by the native image loader; swap in react-native-fast-image for improved caching if desired.

# Trade-offs:

Due to time, focus was on functionality and clean separation — advanced transitions (Reanimated coverflow) were left as a nice-to-have.

# Outstanding/next steps

Add more robust error UI and retry flows.

Improve image caching (fast-image), add shimmer placeholders.

Add unit tests for hooks/viewmodels (mock repository).

Add accessible animations and fine-tune layout on tablets.

Add Tailwind CSS to speed development.

Add detox for E2E.

Add pagination to  the results of api when the carousel is near the latest movies, I can update the page + 1 to get more results.

# Notes for reviewers

Home -> tap a poster -> opens Detail.

From Detail, tap Add / Remove to persist the movie in the Watchlist.

Watchlist persists across app launches,
In the watchlist, when you tap the poster image, if the movie has a URL from Netflix example: https://www.netflix.com/title/81507921, the app tries to open the Netflix app with deeplinking; otherwise, the website will be opened.

# Screenshots

<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-start">
   <img width="206" height="622" alt="simulator_screenshot_EC6C64A8-CF66-4C59-AF08-4FB7362AF8D2" src="https://github.com/user-attachments/assets/5ffee0d9-e92e-41e3-92fc-504ec58da46e" />
   <img width="206" height="622" alt="simulator_screenshot_4CCC78C5-2E74-47C4-BCB5-1038109E3140" src="https://github.com/user-attachments/assets/c0a2a177-592c-4985-a651-f81531ffd4d6" />
   <img width="206" height="622" alt="simulator_screenshot_B27A9F28-6107-4E5F-8BCB-A8497B70E142" src="https://github.com/user-attachments/assets/91e7b76c-7bb7-4598-ab1c-e555e45fe850" />
   <img width="206" height="622" alt="simulator_screenshot_82998165-A38F-44DA-89BE-FB0D4F0ED9E7" src="https://github.com/user-attachments/assets/4de0211f-c5fe-4047-9ac5-f1498f078ebe" />
   <img width="206" height="622" alt="simulator_screenshot_601FDE72-9F04-477D-9B3A-84A74917F01C" src="https://github.com/user-attachments/assets/e93938a6-8782-41fb-88b8-c52b3c33c6f8" />
   <img width="206" height="622" alt="simulator_screenshot_8FACCB13-6EE3-4F74-A7C0-1A9A727FDBB9" src="https://github.com/user-attachments/assets/6b2aca3b-917e-4ff8-8fd7-611a8ade0671" />
   <img width="206" height="622" alt="simulator_screenshot_4EF2E56B-7BA7-48BE-A783-37D793A2D1E3" src="https://github.com/user-attachments/assets/0a4f19ef-de89-4614-b193-3cace8470dac" />
</div>
