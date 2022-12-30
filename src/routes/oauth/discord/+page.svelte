<script context="module" lang="ts">
	export function load({ url }: { url: URL }) {
		const access_token = url.searchParams.get("access_token");
		const token_type = url.searchParams.get("token_type");
		return {
			props: {
				access_token,
				token_type,
			},
		};
	}
</script>

<script lang="ts">
	export let token_type: string;
	export let access_token: string;
</script>

<body>
	<h3>access_token: {access_token} & token_type: {token_type}</h3>
</body>
