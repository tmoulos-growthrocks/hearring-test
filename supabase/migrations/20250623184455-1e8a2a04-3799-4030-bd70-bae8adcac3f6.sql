
-- Create a table for genders
CREATE TABLE public.genders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the gender values
INSERT INTO public.genders (name) VALUES 
  ('male'),
  ('female'),
  ('other');

-- Enable Row Level Security (optional - making it public for now)
ALTER TABLE public.genders ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow everyone to read genders
CREATE POLICY "Anyone can view genders" 
  ON public.genders 
  FOR SELECT 
  USING (true);
