import { supabase } from "../../../lib/supabaseClient";
import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import type Review from "../../create-reviews/review";
import Review from "../../create-reviews/review";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: any }) {
	const { reviews, id } = await request.json();

	reviews.forEach(async (review: Review) => {
		const uuid = await createReview(review);
		let uploadReviews = [];
		const { data, error: fetcherror } = await supabase
			.from("users")
			.select()
			.eq("id", id);
		if (fetcherror) throw fetcherror;
		if (data === null) return json(false);
		if (data[0].reviews === null) {
			uploadReviews = [uuid];
		} else {
			uploadReviews = data[0].reviews;
			uploadReviews.push(uuid);
		}

		const { error: updateerror } = await supabase
			.from("users")
			.update({ reviews: uploadReviews })
			.eq("id", id);
		if (updateerror) throw updateerror;
	});

	return json(true);
}

async function createReview(review: Review) {
	console.log(review);
	if (review === undefined) return false;
	let uuid = uuidv4();
	let tries = 0;
	while (true) {
		console.log(tries);
		tries++;
		if (tries >= 10) false;
		const { data, error } = await supabase
			.from("reviews")
			.select()
			.eq("id", uuid);
		if (error) throw error;
		if (data !== null) {
			break;
		}
		uuid = uuidv4();
	}

	const { error } = await supabase.from("reviews").insert({
		id: uuid,
		game: review.game,
		rating: review.rating,
		tags: review.tags,
	});

	if (error) throw error;
	return uuid;
}
