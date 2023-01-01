<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { profileData, type ProfileData } from "../oauth";
	import { browser } from "$app/environment";

	let token_type: string | null;
	let access_token: string | null;

	let params = new URLSearchParams($page.url.hash.slice(1));
	let currentProfileData: ProfileData = null;

	profileData.subscribe((value) => (currentProfileData = value));
	access_token = params.get("access_token");
	token_type = params.get("token_type");

	if (browser) {
		(async () => {
			const discordData = JSON.parse(
				await (
					await fetch("https://discord.com/api/users/@me", {
						headers: {
							authorization: `${token_type} ${access_token}`,
						},
					})
				).text()
			);

			if (discordData !== undefined && currentProfileData === null) {
				let profilePicture = `https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.webp?size=80`;
				const response = await fetch("/api/create-profile", {
					method: "POST",
					body: JSON.stringify({
						username: discordData.username,
						avatar_url: profilePicture,
						discord_id: discordData.id,
					}),
					headers: {
						"content-type": "application/json",
					},
				});
				let responseData = await response.json();
				console.log({ responseData });
				profileData.set({
					profilePicture: `https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.webp?size=80`,
					username: discordData.username,
					id: responseData,
				});
			}

			if (browser) await goto("/create-reviews");
		})();
	}

	// const { error } = await supabase.from("profiles").insert({
	// 	id,
	// 	username: discordData.username,
	// 	avatar_url: `https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.webp?size=80`,
	// });
	// if (browser) await goto("/create-reviews");;
</script>

<body>
	<h3>Redirecting...</h3>
</body>
