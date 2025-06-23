
-- Create a policy to allow everyone to update genders
CREATE POLICY "Anyone can update genders" 
  ON public.genders 
  FOR UPDATE 
  USING (true);

-- Create a policy to allow everyone to delete genders
CREATE POLICY "Anyone can delete genders" 
  ON public.genders 
  FOR DELETE 
  USING (true);
