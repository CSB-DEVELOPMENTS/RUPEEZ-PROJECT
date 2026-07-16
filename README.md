# Rupeez

Rupeez is a mobile-first finance application built with Expo and Supabase. The product is designed to help users manage personal money, plan recurring commitments, split expenses with others, and grow toward savings or wealth goals inside one experience.

The current codebase includes:

- A branded public landing page
- Email/password authentication with Supabase
- Protected routing with Expo Router
- Theme-aware UI
- A dashboard experience built with reusable finance components

## Tech Stack

- Expo 56
- React 19
- React Native 0.85
- Expo Router
- NativeWind + Tailwind CSS
- Supabase
- TypeScript

## Project Structure

```text
src/
  app/
    _layout.tsx            # Root providers and router stack
    (public)/              # Landing, login, signup
    (protected)/           # Auth-only screens such as dashboard
  components/              # Reusable UI by feature area
  constants/               # Mock/product constants
  contexts/                # Auth and theme providers
  hooks/                   # Shared hooks
  lib/                     # External client setup, including Supabase
  types/                   # Shared TypeScript types
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a local environment file named `.env.local` based on `.env.example`.

```env
EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-supabase-publishable-key>
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=<your-google-web-client-id>
```

Notes:

- `src/lib/supabase.ts` expects both values at runtime.
- The publishable key is the public client key used by the Expo app.
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` must be the Google OAuth `Web application` client ID, including for Android native sign-in.
- For Android mobile builds, add the SHA-1 and SHA-256 fingerprints for every signing key you test with to the Google/Firebase app for package `com.csbd.rupeez`. A missing fingerprint commonly causes `DEVELOPER_ERROR` after the account picker appears.

### 3. Optional Android tooling

If you want to run on a local Android emulator or device from Windows, install Android platform tools:

```bash
winget install Google.PlatformTools
```

You may also need Android Studio if you plan to use an emulator.

### 4. Start the app

```bash
npm run start
```

You can also use:

```bash
npm run android
npm run ios
npm run web
```

## Current State

What is implemented now:

- Branded marketing/landing UI
- Login and signup flows
- Theme toggling
- Protected dashboard shell
- Dashboard cards and finance widgets backed by mock constants

What is planned by the domain model:

- Wallet categories and transaction categories
- Shared goals and contribution proofs
- Shared expenses and settlement flows
- Savings boxes / millionaire box
- Loans and loan-linked transactions
- Notifications, preferences, logs, and achievements

## AI/Contributor Context

For a fuller project briefing based on the codebase, ER diagram, and design references, see [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md).

## Useful Commands

```bash
npm run start
npm run lint
npm run android
npm run ios
npm run web
```
