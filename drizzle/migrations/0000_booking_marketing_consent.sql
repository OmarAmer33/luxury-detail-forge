ALTER TABLE public.booking_submissions ADD COLUMN marketing_consent boolean NULL;

COMMENT ON COLUMN public.booking_submissions.marketing_consent IS 'True when the customer opted in to optional marketing texts on the booking form; NULL for older rows.';