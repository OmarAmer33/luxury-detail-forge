## v6-update — Reviews page: 4 → 6 reviews

Small update to Fix 2 only. Fix 1 (home) and Fix 3 (footer) unchanged.

### Change (`src/routes/reviews.tsx`)

Expand the `reviews` array from 4 to 6 entries, reordered for variety:

1. **Bryan Correia** — Local Guide, broad endorsement (existing)
2. **Tim Sweidan** — Mustang, ceramic coating specific (existing)
3. **Daniel Duran** — NEW: ceramic coating, multiple vehicles, retention
4. **Ardy Kalezic** — Names Derek directly, repeat customer (existing)
5. **D'Angelo Daniel** — BMW specific, visceral language (existing)
6. **Melinda Zito** — NEW: pre-trade-in use case, different angle

New entries:
- **Daniel Duran**: *"Excellent job! I normally don't leave reviews, but this one is well deserved..."*
- **Melinda Zito**: *"I wanted to have my car detailed before turning it in to make a new purchase..."*

### Grid verification

Current grid is `grid gap-6 md:grid-cols-2 lg:grid-cols-3` — already handles 6 cards cleanly:
- `lg`: 3 columns × 2 rows
- `md`: 2 columns × 3 rows  
- `< md`: 1 column × 6 rows

No structural or styling changes needed.