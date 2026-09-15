# Delete four test rows from booking_submissions

Read-only verification has identified the four rows to remove. This cleanup deletes only those rows and leaves all production and backfill data untouched.

## Rows to delete

| id | name | created_at |
|---|---|---|
| 5a7f0f3d-b6db-4607-8307-e0aa45c7e0b8 | CHROME TEST 0914 | 2026-09-15 17:33:15 UTC |
| 7ad2f0e8-0a47-45cd-a214-d77ed423e074 | GCLID TEST A | 2026-09-15 19:15:02 UTC |
| edc29cc1-1c26-4226-bd04-4a2d55e018cb | GCLID TEST B | 2026-09-15 19:17:26 UTC |
| 1e335c71-07b4-48d0-bbf3-e4ac3f415705 | TEST | 2026-09-10 17:44:18 UTC |

## SQL

```sql
DELETE FROM public.booking_submissions
WHERE id IN (
  '5a7f0f3d-b6db-4607-8307-e0aa45c7e0b8',
  '7ad2f0e8-0a47-45cd-a214-d77ed423e074',
  'edc29cc1-1c26-4226-bd04-4a2d55e018cb',
  '1e335c71-07b4-48d0-bbf3-e4ac3f415705'
);
```

## Scope

- Delete only those four rows by primary key.
- Do not truncate the table.
- Do not modify any remaining row, column, index, policy, or code.

## Verification

After the delete, `SELECT count(*) FROM public.booking_submissions` should return 12 (down from 16).
