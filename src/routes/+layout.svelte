<script lang="ts">
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import Menu from "@smui/menu";
	import List, { Item, Separator, Text } from "@smui/list";
	import Button from "@smui/button";
	import Ripple from "@smui/ripple";
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
	let menu: any;

	function logout() {}
</script>

<TopAppBar style="margin-bottom: 2vh;" variant="static" color="primary">
	<Row>
		<Section>
			<Title><Button href="/">Game reviews</Button></Title>
		</Section>
		{#if signed_in}
			<Section align="end" toolbar>
				<Title>{username}</Title>
				<img
					id="pfp"
					use:Ripple={{ surface: true }}
					on:click={() => {
						menu.setOpen(true);
					}}
					src={profilePicture}
					alt="user profile"
				/>
				<Menu bind:this={menu}>
					<List>
						<Separator />
						<Item on:SMUI:action={() => logout()}>
							<Text>Sign out</Text>
						</Item>
					</List>
				</Menu>
			</Section>
		{/if}
	</Row>
</TopAppBar>

<slot />

<style>
	#pfp {
		height: 100%;
		margin-left: 0.5vw;
		margin-right: 2vw;
		border-radius: 100px;
	}
</style>
