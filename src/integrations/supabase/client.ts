// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dwyfnqrtdbgyujkustbm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eWZucXJ0ZGJneXVqa3VzdGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTM2NTMsImV4cCI6MjA2MzY4OTY1M30.cQVEX7aMmTIsSh-4xutX2pEf6MNoW8BWGJbPTmc5d2I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);