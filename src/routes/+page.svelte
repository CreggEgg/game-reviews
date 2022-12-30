<script lang="ts">
	import Button, { Label } from "@smui/button";
	import Dialog, { Title, Content, Actions, InitialFocus } from "@smui/dialog";
	let get_signed_up_dialog = true;
</script>

<body>
	<Dialog
		bind:open={get_signed_up_dialog}
		aria-labelledby="sign-up-dialog-title"
		aria-describedby="sign-up-dialog-content"
	>
		<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
		<Title id="sign-up-dialog-title">Get started on Epic Gamer</Title>
		<Content id="sign-up-dialog-content"
			>Sign in to get personalized game reviews or just browse the reviews of
			our users.</Content
		>
		<Actions>
			<Button variant="unelevated" href="/oauth" use={[InitialFocus]}
				>Get started</Button
			>
			<Button
				on:click={() => (get_signed_up_dialog = false)}
				variant="outlined"
			>
				<Label>I'll just browse</Label>
			</Button>
		</Actions>
	</Dialog>
	<h1>Hello world</h1>
	<Button variant="unelevated" href="/oauth">Get started</Button>
</body>
