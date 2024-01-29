<script lang="ts">
	import { createEventDispatcher } from "svelte";
  import type { Room } from "../models/Room";

	const dispatchDeleteRoom = createEventDispatcher<{ deleteRoom: string }>();

	export let room: Room;
</script>

<summary
	class="flex flex-row cursor-pointer justify-between gap-4 rounded bg-stone-200 border border-stone-800 desc-h2:font-bold desc-h2:underline desc-h2:uppercase px-6 py-2"
	>
	<div class="flex flex-col basis-3/12">
		<h2>Name</h2>
		<p>{room.name}</p>
	</div>
	<div class="flex flex-col basis-4/12">
		<h2>Description</h2>
		<p>{room.description}</p>
	</div>
	<div class="flex flex-col basis-2/12">
		<h2>Square Foot</h2>
		<div>{room.squareFeet.toFixed(2)}</div>
	</div>
	<div class="flex flex-col items-center basis-2/12">
		<h2>Square inches</h2>
		<div>{room.squareInches.toFixed(2)}</div>
	</div>
	<button
		class="basis-1/12"
		on:click={() => dispatchDeleteRoom('deleteRoom', room.id)}>❌</button
	>
</summary>