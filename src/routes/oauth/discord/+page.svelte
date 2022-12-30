<script lang="ts">
	import type { DiscordOauthData } from "./+page";
	export let data: { props: DiscordOauthData };
	let { token_type, access_token } = data.props;
</script>

<body>
	<h3>access_token: {access_token} & token_type: {token_type}</h3>
</body>
