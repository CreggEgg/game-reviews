<script lang="ts">
	import CreateReview from "./CreateReview.svelte";
	import Button from "@smui/button";
	import type Rating from "./review";
	//import CreateReview from "./CreateReview.svelte";

	let reviews: Rating[] = [undefined, undefined, undefined];

	function updateReview(index: number, value: Rating) {
		if (reviews[index] === undefined || reviews[index] === null)
			reviews[index] = {};
		reviews[index] = value;
		valid = reviews.some(
			(item) =>
				item !== undefined &&
				item !== null &&
				item.hasOwnProperty("game") &&
				item.hasOwnProperty("rating") &&
				item.hasOwnProperty("tags") &&
				item["tags"].includes(null)
		);
	}

	function remove(index: number) {
		reviews.splice(index, 1);
	}

	let valid = false;
</script>

<div>
	{valid}
	{JSON.stringify(reviews)}
	{#each reviews as review, i}
		<CreateReview
			updateReview={(value) => {
				updateReview(i, value);
			}}
			remove={() => {
				remove(i);
				reviews = reviews;
			}}
			removeable={i > 2}
		/>
	{/each}
	<Button
		variant="unelevated"
		on:click={() => {
			reviews = [...reviews, undefined];
		}}
		style="width: 30%; margin: auto;">+</Button
	>
</div>

<style>
	div {
		width: 60vw;
		margin: auto;
		display: grid;
		grid-gap: 2vh;
	}
</style>
