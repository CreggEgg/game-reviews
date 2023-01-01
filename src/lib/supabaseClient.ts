import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/public";
import { env as _env } from "$env/dynamic/private";
export const supabase = createClient(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_ANON_KEY,
	{
		global: {
			headers: { apikey: _env.API_KEY },
		},
	}
);
