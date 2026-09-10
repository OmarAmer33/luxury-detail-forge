CREATE TABLE public.booking_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  vehicle text NOT NULL,
  condition text NOT NULL,
  service text NOT NULL,
  preferred_date text NOT NULL,
  preferred_time text NOT NULL,
  hear_about text,
  notes text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','quoted','booked','closed')),
  source text
);

GRANT ALL ON public.booking_submissions TO service_role;

ALTER TABLE public.booking_submissions ENABLE ROW LEVEL SECURITY;