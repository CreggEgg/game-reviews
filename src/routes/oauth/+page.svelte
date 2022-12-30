<script lang="ts">
	import Button, { Label } from "@smui/button";
</script>

<body>
	<h1>Sign in with:</h1>
	<Button
		variant="unelevated"
		id="discord-sign-in"
		href="https://discord.com/api/oauth2/authorize?client_id=1058145965569224794&redirect_uri=https%3A%2F%2Fgame-reviews-nine.vercel.app%2Foauth%2Fdiscord&response_type=token&scope=identify"
		>Discord</Button
	>
</body>

<style>
	body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
