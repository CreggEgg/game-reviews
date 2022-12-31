<script lang="ts">
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import Button from "@smui/button";
	import { profileData, type ProfileData } from "./oauth/oauth";

	let profile = null as ProfileData;
	let [username, profilePicture]: string[] = ["", ""];
	profileData.subscribe((value) => {
		profile = value;
	});
	let signed_in = false;
	if (profile !== null) {
		signed_in = true;
		username = profile.username;
		profilePicture = profile.profilePicture;
	}
	let active: string;
</script>

<TopAppBar style="margin-bottom: 2vh;" variant="static" color="primary">
	<Row>
		<Section>
			<Title><Button href="/">Game reviews</Button></Title>
		</Section>
		{#if signed_in}
			<Section align="end" toolbar>
				<Title>{username}</Title>
				<img id="pfp" src={profilePicture} alt="user profile" />
			</Section>
		{/if}
	</Row>
</TopAppBar>

<slot />

<style>
	#pfp {
		height: 100%;
		margin-left: 2vw;
		border-radius: 100px;
	}
</style>
