import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getServerEnvironment } from "@/lib/env";
let supabaseClient: SupabaseClient | undefined;
export function getSupabaseServerClient(): SupabaseClient {
  if (!supabaseClient) {
    const environment = getServerEnvironment();
    supabaseClient = createClient(environment.SUPABASE_URL, environment.SUPABASE_SECRET_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
  }
  return supabaseClient;
}
