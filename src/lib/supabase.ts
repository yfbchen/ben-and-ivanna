import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fpcnecyggvzhcoigoegf.supabase.co";
const supabaseAnonKey =
  "sb_publishable_RaiMNVnnKyF6g1cqPaUinQ_KajPffxb";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
