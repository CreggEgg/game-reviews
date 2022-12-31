<script lang="ts">
	import TopAppBar, { Row } from "@smui/top-app-bar";
	import Tab, { Label } from "@smui/tab";
	import TabBar from "@smui/tab-bar";

	let active: string;
</script>

<TopAppBar variant="static" color="secondary">
	<Row
		><TabBar tabs={["Home", "Merchandise", "About Us"]} let:tab bind:active>
			<!-- Note: the `tab` property is required! -->
			<Tab {tab} href="">
				<Label>{tab}</Label>
			</Tab>
		</TabBar></Row
	>
</TopAppBar>

<slot />
