
/** @type {import('./$types').PageLoad} */
export function load({url}: {url: URL}) {
	const params = new URLSearchParams(url.hash.slice(1))
	const access_token = params.get("access_token");
	const token_type = params.get("token_type");
	return {
		props: {
			
			access_token,
			token_type,
		},
	};
  }

export type DiscordOauthData = {access_token: string; token_type: string;}
