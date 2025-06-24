
-- Create a table to store incoming webhook data
CREATE TABLE public.incoming_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  timestamp TIMESTAMP WITH TIME ZONE,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (making it public for webhook access)
ALTER TABLE public.incoming_data ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow everyone to insert data (for webhook)
CREATE POLICY "Anyone can insert incoming data" 
  ON public.incoming_data 
  FOR INSERT 
  WITH CHECK (true);

-- Create a policy to allow everyone to view incoming data
CREATE POLICY "Anyone can view incoming data" 
  ON public.incoming_data 
  FOR SELECT 
  USING (true);
