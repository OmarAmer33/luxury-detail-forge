# Backfill 10 historical organic booking submissions

## Goal
Insert 10 recovered historical leads into the existing `public.booking_submissions` table without touching schema, RLS, policies, code, or the existing TEST row.

## Method
Use the database `run_sql` tool (data operation, not a schema migration) to run the provided single `INSERT` statement.

## SQL to execute

```sql
INSERT INTO public.booking_submissions
  (created_at, name, phone, email, vehicle, condition, service,
   preferred_date, preferred_time, hear_about, notes, status, source)
VALUES
  ('2026-09-08 12:00:00+00','Nick Helmstetter','9083778693','njh810@gmail.com','2026 BMW X3M50','Excellent','Full Detail','2026-09-15','9:00 AM','Google',NULL,'new','organic-backfill'),
  ('2026-09-06 12:00:00+00','Pamela Brennan','973-687-6970','pmbsnow23@gmail.com','2015 Leus RX','Good','Full Detail','2026-09-16','9:00 AM','Google','The car is in good condition except for mulriple minor scratches.','new','organic-backfill'),
  ('2026-09-05 12:00:00+00','Ari B Harrison','7324929991','aribharrison@gmail.com','2019 CRV','Good','Interior Detail','2026-09-11','10:00 AM','Referral',NULL,'new','organic-backfill'),
  ('2026-09-03 12:00:00+00','Stu','5164514192','blue.key.rentals.80@gmail.com','2020 Toyota Camry LE','Fair','Full Detail','2026-09-04','10:00 AM',NULL,NULL,'new','organic-backfill'),
  ('2026-08-22 12:00:00+00','Show C','3475462547','showbknyc2@gmail.com','2016 Range Rover sport','Excellent','Vinyl Wrap','2026-09-26','2:00 PM','Referral','Hello how  are you doing I''m trying to get a quote on a satin black wrap for a 2016 Range Rover sport, thank you','new','organic-backfill'),
  ('2026-08-21 12:00:00+00','elizabeth Acquisto','7189742883','elizabeth.acquisto@gmail.com','Toyota highlander, 2018','Heavy Use','Interior Detail','2026-08-21','1:00 PM','Google','I think I used you guys 4 years ago. The car is pretty gross inside','new','organic-backfill'),
  ('2026-08-20 12:00:00+00','Luye Li','3025441193','zhongguowutong@gmail.com','Tesla Model Y - 2026','Good','Not sure — recommend something','2026-08-27','3:00 PM','Returning Customer','Hi, Derrik, This is to book Elite Wash service next Thursday, 8/27, at 3:00 p.m. Thank you--Returning customer, Luye Li','new','organic-backfill'),
  ('2026-08-15 12:00:00+00','Chanel Hurtado','9178474838','chanelmd@yahoo.com','2014 Dodge Durango SXT','Good','Interior Detail','2026-08-24','9:00 AM','Other',NULL,'new','organic-backfill'),
  ('2026-08-12 12:00:00+00','George Khalil','2017868411','georgekhalil96@gmail.com','2025 Toyota Camry','Excellent','Full Detail','2026-08-20','4:00 PM','Google',NULL,'new','organic-backfill'),
  ('2026-08-12 13:00:00+00','Ross Missiris','8458256783','rmissiris@gmail.com','2027 Mercedes cle53','Excellent','Window Tint','2026-08-22','9:00 AM','Google','Unfortunate situation. Had a friends friend come to my house to tint my new car. He suggested doing the windshield too, I asked if I needed the inspection sticker first and he said no it''s all good. Turns out not the case. I need to get the tint removed, then get my inspection sticker, then get it redone. Is this something you can help with?','new','organic-backfill');
```

## What will not change
- No code files edited.
- No schema/RLS/policy/grant changes.
- Existing TEST row will not be deleted, truncated, or modified.

## Verification
After running the insert, query:

```sql
SELECT COUNT(*) AS total_rows FROM public.booking_submissions;
```

Expected result: 11 (1 existing TEST row + 10 backfilled rows).

Then confirm the 10 new rows exist by listing the inserted `id`, `name`, `email`, and `source` columns.

## Reporting
I will report the final row count and confirm all 10 backfilled rows are present.
