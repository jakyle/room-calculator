<script lang="ts">
  import RoomEditor from "./lib/RoomEditor.svelte";
  import { roomStore } from "./lib/RoomsStore";

  let isAddingRoom = false;
  let deleteRoomId = "";

  const deleteRoom = (id: string) => {
    roomStore.update((rooms) => rooms.filter((room) => room.id !== id));
	deleteRoomId = '';
  };
</script>

<div class="w-screen h-screen bg-slate-400">
  <div class="w-full h-full relative p-12">
    {#if isAddingRoom}
      <div
        class="absolute w-full h-full left-0 top-0 flex items-center justify-center bg-black/50"
      >
        <div class="w-3/4 h-3/4">
          <RoomEditor on:roomEdited={() => (isAddingRoom = false)} />
        </div>
      </div>
    {/if}

    {#if deleteRoomId}
      <div
        class="absolute w-full h-full left-0 top-0 flex items-center justify-center bg-black/50"
      >
        <div class="w-3/4 h-3/4 flex flex-col justify-between">
          <p>Are you sure you want to delete this room?</p>

		  <div class="flex w-full justufy-between">
			<button on:click={() => (deleteRoomId = '')}>No</button>
			<button on:click={() => deleteRoom(deleteRoomId)}>Yes</button>
		  </div>
        </div>
      </div>
    {/if}

    {#await $roomStore then rooms}
      <ul>
        {#each rooms as room}
          <li>
            <div class="flex flex-row gap-4 rounded bg-stone-200 border border-stone-800 [&_h2]:font-bold px-6 py-2">
              <div class="flex flex-col items-center">
                <h2>Name</h2>
                <p>{room.name}</p>
              </div>
			  <div class="flex flex-col items-center">
                <h2>Description</h2>
                <p>{room.description}</p>
              </div>
              <div class="flex flex-col items-center">
                <h2>Square Foot:</h2>
                <div>{room.squareFeet.toFixed(2)}</div>
              </div>
			  <div class="flex flex-col items-center">
                <h2>Square inches:</h2>
                <div>{room.squareInches.toFixed(2)}</div>
              </div>
              <button on:click={() => deleteRoom(room.id)}>❌</button>
            </div>
          </li>
        {/each}
      </ul>

	  <div class="flex justify-center font-bold text-2xl p-12">
		Total Square Feet: {rooms.reduce((acc, curr) => acc + curr.squareFeet, 0).toFixed(2)}
	  </div>
	  <div class="flex flex-row w-full">
		<button class="rounded px-6 py-4 bg-green-200" on:click={() => isAddingRoom = true}>ADD ROOM</button>
	  </div>
    {/await}
  </div>
</div>
