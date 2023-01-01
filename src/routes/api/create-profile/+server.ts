import { supabase } from "../../../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: any }) {
	const { username, avatar_url, discord_id } = await request.json();

	let uuid = uuidv4();
	let tries = 0;
	while (true) {
		console.log(tries);
		tries++;
		if (tries > 100) return json(false);
		const { data, error } = await supabase
			.from("users")
			.select()
			.eq("id", uuid);
		if (error) throw error;
		if (data !== null) {
			break;
		}
		uuid = uuidv4();
	}

	const { error } = await supabase
		.from("users")
		.insert({ id: uuid, avatar_url, username, discord_id });

	if (error) throw error;
	return json(uuid);
}
