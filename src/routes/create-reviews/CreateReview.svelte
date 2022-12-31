<script lang="ts">
	import Paper, { Title, Subtitle, Content } from "@smui/paper";
	import Autocomplete from "@smui-extra/autocomplete";
	import FormField from "@smui/form-field";
	import Slider from "@smui/slider";
	import Button from "@smui/button";

	export let removeable: boolean;
	export let updateReview: (value: any) => void;
	export let remove: Function;

	const games = [
		"Counter-Strike: Global Offensive",
		"ELDEN RING",
		"Apex Legends",
		"Destiny 2",
		"Call of Duty: Modern Warfare II",
		"Red Dead Redemption 2",
		"God of War",
	];

	const tags = ["good", "bad", "medium"];
	let inputtedValue = false;
	let value: string;
	$: (() => {
		inputtedValue = value !== undefined;
		updateReview({ game: value, rating, tags: [tag1, tag2, tag3] });
	})();
	let rating = 0;
	//$: console.log(rating);
	let [tag1, tag2, tag3] = [undefined, undefined, undefined];
</script>

<Paper>
	<Content>
		<div id="card">
			<Autocomplete options={games} bind:value label="Game" />
			{#if inputtedValue}
				<FormField
					align="end"
					style="display: flex; width: 90%; flex-direction: column;
					align-items: flex-start;"
				>
					<p
						style="padding-right: 12px; width: max-content; display: block; margin-bottom: 0.5rem;"
					>
						Rating:
					</p>
					<Slider
						min={0}
						max={10}
						discrete
						tickMarks
						style="width: 90%;"
						on:change={() => {
							updateReview({ game: value, rating, tags: [tag1, tag2, tag3] });
						}}
						bind:value={rating}
					/>

					<div id="tag-selection">
						<Autocomplete
							options={tags}
							bind:value={tag1}
							textfield$variant="outlined"
							label="Tag"
							on:change={() => {
								updateReview({ game: value, rating, tags: [tag1, tag2, tag3] });
							}}
						/>
						<Autocomplete
							options={tags}
							bind:value={tag2}
							textfield$variant="outlined"
							label="Tag"
							on:change={() => {
								updateReview({ game: value, rating, tags: [tag1, tag2, tag3] });
							}}
						/>
						<Autocomplete
							options={tags}
							bind:value={tag3}
							textfield$variant="outlined"
							label="Tag"
							on:change={() => {
								updateReview({ game: value, rating, tags: [tag1, tag2, tag3] });
							}}
						/>
					</div>
				</FormField>{/if}
			{#if removeable}
				<Button
					on:click={() => {
						remove();
					}}
					variant="unelevated"
					style="width: auto; margin-left: auto;">Remove</Button
				>
			{/if}
		</div></Content
	>
</Paper>

<!-- <div id="card">
		
	</div> -->
<style>
	#card {
		width: 100%;
		height: 100%;
		display: flex;
	}

	#tag-selection {
		display: grid;
		grid-gap: 5px;
		width: 100%;
		grid-template-columns: repeat(3, 1fr);
	}
</style>
