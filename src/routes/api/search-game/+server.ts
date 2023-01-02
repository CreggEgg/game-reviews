import { error } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";
import type Review from "src/routes/create-reviews/review";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: { url: URL }) {
	const id = url.searchParams.get("id");
	const game = url.searchParams.get("game");
	if (game === null || id === null) return json(false);

	const { data: userReview, error: usererror } = await supabase
		.from("reviews")
		.select()
		.eq("id", id);

	if (userReview === null || userReview === undefined) return;

	const { data: allReviews, error: reviewserror } = await supabase
		.from("reviews")
		.select()
		.neq("games", null);

	let reviews: Review[] = [];

	allReviews?.forEach(async (review: Reviews) => {
		if (!review.games.includes(game)) return;
		let score = scoreReview(review, userReview[0]);
		if (score > 0.9) {
			let gameIndex = review.games.indexOf(game);
			let gameReview = {
				game: review.games[gameIndex],
				rating: review.ratings[gameIndex],
				tags: review.tags[gameIndex],
			} as Review;
			reviews.push(gameReview);
		}
	});

	return json(reviews);
}

const MAX = 1 + 1;
function scoreReview(review1: Reviews, review2: Reviews): number {
	let match = checkMatch(review1.games, review2.games);
	if (!match) return 0;
	let total = 0;
	total += matchCount(review1.tags, review2.tags);
	total += ratingsDiff(review1.ratings, review2.ratings);

	return total / MAX;
}

function ratingsDiff(ratings1: any[], ratings2: any[]): number {
	let total = 0;
	if (ratings1.length <= ratings2.length) {
		ratings1.forEach((element: number, index: number) => {
			total += 10 - Math.abs(element - ratings2[index]);
		});
		return total / ratings1.length;
	} else {
		ratings2.forEach((element: number, index: number) => {
			total += 10 - Math.abs(element - ratings1[index]);
		});
		return total / ratings2.length;
	}
}

function matchCount(tags1: any[], tags2: any[]): number {
	let total = 0;
	if (tags1.length <= tags2.length) {
		tags1.forEach((element: any[], jndex: number) => {
			element.forEach((element: any, index: number) => {
				if (tags2[jndex][index]) total++;
			});
		});
		return total / tags1.length;
	} else {
		tags2.forEach((element: any[], jndex: number) => {
			element.forEach((element: any, index: number) => {
				if (tags1[jndex][index]) total++;
			});
		});
		return total / tags2.length;
	}
}

function checkMatch(a: any[], b: any[]) {
	return (
		a.every((el) => {
			return b.includes(el);
		}) ||
		b.every((el) => {
			return a.includes(el);
		})
	);
}

type Reviews = {
	id: string;
	games: string[];
	ratings: number[];
	tags: string[][];
};
