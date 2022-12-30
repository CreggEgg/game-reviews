import type { PageLoadEvent } from "./$types";
/** @type {import('./$types').PageLoad} */
export function load({url}: PageLoadEvent) {
	
	const params = new URLSearchParams()
	const access_token = url.searchParams.get("access_token");
	const token_type = url.searchParams.get("token_type");
	return {
		props: {
			
			access_token: url,
			token_type,
		},
	};
  }

export type DiscordOauthData = {access_token: string; token_type: string;}
