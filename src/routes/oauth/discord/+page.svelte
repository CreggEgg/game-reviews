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
	let discordData;

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

		if (discordData !== undefined) {
			profileData.set({
				profilePicture: `https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.webp?size=80`,
				username: discordData.username,
				id: "1",
			});
		}
		if (browser) await goto("/create-reviews");
	})();
</script>

<body>
	<h3>Redirecting...</h3>
</body>
