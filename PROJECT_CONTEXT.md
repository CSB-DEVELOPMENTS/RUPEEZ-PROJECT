# Rupeez Project Context

## Purpose

Rupeez is a personal finance and collaborative money management application built with Expo, React Native, Expo Router, NativeWind, and Supabase. The product direction combines:

- Personal cashflow tracking
- Wallet and transaction management
- Shared expenses and split settlements
- Shared goals and contributions
- Savings and wealth-building flows
- Loans, notifications, and achievement-style progress features

This file is intended to help AI agents understand the project quickly before making code or schema changes.

## Product Summary

The current app presents Rupeez as "Your Fin-OS. All-in-One." The landing page positions the product around four core promises:

- Track your cashflow
- Plan your bills
- Split with anyone
- Build wealth together

The current implemented frontend focuses on:

- Public landing page
- Email/password login
- Email/password signup
- Protected dashboard shell
- Theme support
- Dashboard UI with finance-oriented mock data

## Current Tech Stack

- Expo 56
- React 19
- React Native 0.85
- Expo Router for file-based navigation
- NativeWind + Tailwind CSS for styling
- Supabase JS for authentication and backend integration
- AsyncStorage for native auth session persistence

## Runtime Architecture

### App structure

- `src/app/_layout.tsx`
  Initializes the global app tree with `AppThemeProvider` and `AuthProvider`.
- `src/app/(public)`
  Public routes such as landing, login, and signup.
- `src/app/(protected)`
  Auth-protected routes such as the dashboard.

### Authentication

- Auth state is managed in `src/contexts/AuthContext.tsx`.
- Supabase email/password login and signup are wired.
- Protected routes redirect unauthenticated users to `/login`.
- Signup stores `full_name` in Supabase auth user metadata.
- Password reset and Google OAuth are not fully wired yet.

### Backend integration

- Supabase client lives in `src/lib/supabase.ts`.
- Required environment variables:
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## UI and Design Direction

The provided design deck is primarily visual. The current codebase reflects that direction through:

- A clean finance-dashboard aesthetic
- Green as the primary action color
- Blue as a supporting brand color
- Display-focused typography
- Marketing and product copy centered on clarity, control, and collaborative finance

The dashboard currently uses mock data that represents the intended product domains:

- Safe-to-spend summary
- Total balance
- Income and expenses
- Transactions
- Subscriptions
- Portfolio/wealth widgets
- Spending categories
- Calendar and insights

## Domain Model From ER Diagram

The ER diagram describes a broader backend than what is currently implemented in the UI. It suggests Rupeez is planned as a full financial workspace, not just a dashboard.

### Core identity tables

- `users`
  - `user_gid`
  - `email`
  - `status`
  - `last_name`
  - `first_name`
  - `subscription_token`
  - `created_at`
  - `updated_at`
- `profiles`
  - `profile_gid`
  - `user_id`
  - `email`
  - `profile_name`
  - `profile_picture_url`
  - `role`
  - `status`
  - `color`
  - `currency`
  - `created_at`
  - `updated_at`
- `user_metadata`
  - `metadata_gid`
  - `user_id`
  - `current_step`
  - `is_completed`
  - `created_at`
  - `updated_at`

### Wallet and transaction tables

- `wallets`
  - `wallet_gid`
  - `profile_id`
  - `wallet_name`
  - `current_balance`
  - `is_default`
  - `is_active`
  - `wallet_category_id`
  - `created_at`
  - `updated_at`
- `wallet_categories`
  - `id`
  - `name`
  - `created_at`
- `transactions`
  - `transaction_gid`
  - `profile_id`
  - `wallet_id`
  - `amount`
  - `transaction_type`
  - `transaction_category_id`
  - `description`
  - `transaction_date`
  - `created_at`
  - `updated_at`
- `transaction_categories`
  - `id`
  - `name`
  - `created_at`
- `transaction_reference`
  - `id`
  - `transaction_id`
  - `reference_key`
  - `created_at`
  - `updated_at`

### Shared goals

- `shared_goals`
  - `goal_gid`
  - `goal_name`
  - `target_amount`
  - `current_amount`
  - `deadline`
  - `status`
  - `is_active`
  - `created_at`
  - `updated_at`
- `goal_participants`
  - `participant_gid`
  - `goal_id`
  - `profile_id`
  - `role`
  - `created_at`
  - `updated_at`
- `goal_contributions`
  - `contribution_gid`
  - `goal_id`
  - `profile_id`
  - `transaction_id`
  - `amount`
  - `contribution_date`
  - `proof_id`
  - `created_at`
  - `updated_at`
- `contribution_proofs`
  - `proof_gid`
  - `url`
  - `created_at`
  - `updated_at`

### Shared expenses and split flows

- `shared_expenses`
  - `shared_expense_gid`
  - `name`
  - `amount`
  - `frequency`
  - `next_billing_date`
  - `is_active`
  - `created_at`
  - `updated_at`
- `shared_expense_participants`
  - `participant_gid`
  - `shared_expense_gid`
  - `profile_id`
  - `role`
  - `paid_amount`
  - `percentage`
  - `auto_deduct`
  - `created_at`
  - `updated_at`
- `shared_expense_contributions`
  - `contribution_gid`
  - `shared_expense_id`
  - `profile_id`
  - `transaction_id`
  - `amount`
  - `status`
  - `merge_reference`
  - `created_at`
  - `updated_at`
- `shared_expense_settlement`
  In the ER diagram there is a second contribution-like table that looks like a settlement/transfer mapping:
  - `contribution_gid`
  - `shared_expense_id`
  - `from_profile_id`
  - `to_profile_id`
  - `from_transaction_id`
  - `to_transaction_id`
  - `amount`
  - `status`
  - `proof_id`
  - `merge_reference`
  - `created_at`
  - `updated_at`
- `contribution_transactions`
  - `contribution_transaction_gid`
  - `contribution_id`
  - `transaction_id`
  - `proof_id`
  - `created_at`
  - `updated_at`

Note: the ER diagram includes a note indicating one shared-expense table is used to store both subscriptions and splitwise-like items. In that design, `frequency` and `next_billing_date` may be `null` for pure split expense records.

### Savings, wealth, and loans

- `milionaire_box`
  - `mlionaire_box_gid`
  - `profile_id`
  - `name`
  - `description`
  - `target_amount`
  - `current_amount`
  - `is_active`
  - `created_at`
  - `updated_at`
- `milionaire_box_transactions`
  - `mlionaire_box_transaction_gid`
  - `mlionaire_box_gid`
  - `transaction_id`
  - `created_at`
  - `updated_at`
- `loans`
  - `loan_gid`
  - `profile_id`
  - `name`
  - `description`
  - `total_amount`
  - `current_amount`
  - `interest`
  - `deadline`
  - `month_period`
  - `status`
  - `is_active`
  - `created_at`
  - `updated_at`
- `loan_transactions`
  - `loan_transaction_gid`
  - `loan_gid`
  - `transaction_id`
  - `created_at`
  - `updated_at`

### Engagement and system support

- `notifications`
  - `notification_gid`
  - `profile_id`
  - `user_id`
  - `notification_type`
  - `title`
  - `message`
  - `action_url`
  - `is_read`
  - `created_at`
- `notification_preference`
  - `preference_gid`
  - `user_id`
  - `social_alert`
  - `subscription_alert`
  - `financila_alert`
  - `created_at`
  - `updated_at`
- `logs`
  - `log_gid`
  - `profile_id`
  - `action_type`
  - `meta_data`
  - `created_at`
- `batch_archivements`
  - `archivment_gid`
  - `profile_id`
  - `badge_type`
  - `created_at`

## Important Product Interpretation

AI agents should treat Rupeez as a product with two layers:

1. Current implementation layer
   The app currently ships authentication, marketing pages, theming, and a dashboard-oriented UI shell.
2. Planned domain layer
   The ER diagram defines a significantly broader finance platform that includes shared finance, savings, loans, notifications, and progress systems.

When making changes, avoid assuming every ER entity is already implemented in code. Many schema concepts appear planned rather than fully integrated into the current frontend.

## Practical Guidance For Future Agents

- Check route groups before adding screens:
  - public screens belong in `src/app/(public)`
  - authenticated screens belong in `src/app/(protected)`
- Reuse `AuthContext` and `useAuth` for auth-aware work.
- Reuse theme tokens from `global.css` and the theme context instead of hardcoding colors.
- Treat dashboard constants as placeholder product data unless connected to Supabase.
- If adding backend features, align naming with the ER diagram first, then confirm actual Supabase table names before coding.
- Be careful with typos from the ER source. Some names in the diagram appear misspelled, so validate before generating SQL or TypeScript types.

## Known Gaps

- No Supabase schema or migrations are present in this repo yet.
- OAuth and password recovery are only partially prepared.
- The dashboard is mock-driven, not yet backed by live finance data.
- The design PDF is mostly visual, so UI intent is clearer than interaction details.

## Suggested Next Documentation Targets

- A verified Supabase schema document once migrations exist
- API/data flow notes for auth and dashboard loading
- Feature-by-feature implementation status
- Naming normalization for ER diagram typos before schema generation
