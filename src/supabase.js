import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://auloiihxvdfpgixsxmqd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1bG9paWh4dmRmcGdpeHN4bXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NDUzMjIsImV4cCI6MjA1NzMyMTMyMn0.Fic053JkpVJIN-B5lGqy_ZOfkfh_Q_2vN8-Imd9w3g4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
