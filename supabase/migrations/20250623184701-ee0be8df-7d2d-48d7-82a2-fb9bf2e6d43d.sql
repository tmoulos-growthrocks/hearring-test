
-- Create a policy to allow everyone to insert new genders
CREATE POLICY "Anyone can create genders" 
  ON public.genders 
  FOR INSERT 
  WITH CHECK (true);
