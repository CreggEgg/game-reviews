import { supabase } from "../../../lib/supabaseClient";
import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import type Review from "../../create-reviews/review";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: any }) {
	const { reviews, id } = await request.json();

	if (reviews === undefined) return false;

	let games: string[] = [];
	let ratings: string[] = [];
	let tags: string[][] = [];

	reviews.forEach(async (review: Review) => {
		if (review === undefined) return;
		games.push(review.game);
		ratings.push(review.rating);
		tags.push(review.tags);
	});

	const { error: reviewserror } = await supabase.from("reviews").insert({
		id,
		games,
		ratings,
		tags,
	});

	if (reviewserror) throw reviewserror;

	return json(true);
}

async function createReview(review: Review) {
	console.log(review);
}
