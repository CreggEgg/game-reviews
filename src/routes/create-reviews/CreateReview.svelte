<script context="module">
	const elements = new Set();
</script>

<script lang="ts">
	import Autocomplete from "@smui-extra/autocomplete";
	import Card from "@smui/card";

	const games = [
		"Red Dead Redemption II",
		"Mario Odyssey",
		"Fortnite",
		"High on Life",
	];
	let value: string;
</script>

<Card>
	<div id="card">
		<Autocomplete options={games} bind:value label="Game" />
	</div>
</Card>

<style>
	#card {
		width: 100%;
		height: 100%;
		padding: 2rem;
		display: flex;
	}
</style>
