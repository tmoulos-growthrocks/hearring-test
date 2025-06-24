
-- Add status column to track hearing test progress
ALTER TABLE public.incoming_data 
ADD COLUMN status TEXT DEFAULT 'pending';

-- Add a check constraint to ensure valid status values
ALTER TABLE public.incoming_data 
ADD CONSTRAINT valid_status CHECK (status IN ('pending', 'started', 'completed'));
