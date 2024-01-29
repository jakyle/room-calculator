<script lang="ts">
  import DimensionTable from "./lib/DimensionTable.svelte";
  import RoomEditor from "./lib/RoomEditor.svelte";
  import RoomSummary from "./lib/RoomSummary.svelte";
  import { roomStore } from "./lib/RoomsStore";

  let isAddingRoom = false;
  let isAddingJson = false;
  let deleteRoomId = "";
  let jsonInput = "";
  $: shouldModal = isAddingRoom || deleteRoomId || isAddingJson;

  const deleteRoom = (id: string) => {
    roomStore.update((rooms) => rooms.filter((room) => room.id !== id));
    deleteRoomId = "";
  };

  const saveToJson = () => {
    const rooms = $roomStore;
    const roomsJson = JSON.stringify(rooms);
    const blob = new Blob([roomsJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rooms.json";
    a.click();
  }

  const jsonToData = () => {
    const rooms = JSON.parse(jsonInput);
    roomStore.set(rooms);
    isAddingJson = false;
  }
</script>

<div class="w-screen h-screen bg-slate-400">
  <div class="flex flex-col w-full h-full relative py-4 px-8">
    {#if shouldModal}
      <div
        class="absolute w-full h-full left-0 top-0 flex items-center justify-center bg-black/50 z-10"
      >
        {#if isAddingRoom}
          <div class="size-5/6">
            <RoomEditor on:roomEdited={() => (isAddingRoom = false)} />
          </div>
        {/if}

        {#if deleteRoomId}
          <div
            class="size-72 flex flex-col justify-between bg-yellow-200 rounded p-16"
          >
            <p>Are you sure you want to delete this room?</p>
            <div class="flex w-full gap-x-12">
              <button
                class="rounded px-4 py-2 bg-green-200"
                on:click={() => (deleteRoomId = "")}>No</button
              >
              <button
                class="rounded px-4 py-2 bg-red-200"
                on:click={() => deleteRoom(deleteRoomId)}>Yes</button
              >
            </div>
          </div>
        {/if}

        {#if isAddingJson}
          <div class="flex flex-col size-3/4 p-4 bg-slate-500">
            <textarea bind:value={jsonInput} class="flex-1 whitespace-pre" />
            <div class="flex-none flex justify-between pt-2">
              <button class="rounded px-4 py-2 bg-cyan-500" on:click={jsonToData}>OVERRIDE</button>
              <button class="rounded px-4 py-2 bg-red-500" on:click={() => isAddingJson = false}>CANCEL</button>
            </div>
          </div>
        {/if} 

      </div>
    {/if}

    {#await $roomStore then rooms}
      <div class="flex-grow overflow-auto">

        {#if rooms.length}
        <ul class="flex flex-col min-h-min gap-1 shadow-inner">
          {#each rooms as room}
            <li>
              <details class="child-summary:open:bg-slate-100">
                <RoomSummary {room} on:deleteRoom={(x) => deleteRoom(x.detail)} />
                <DimensionTable dimensions={room.dimensions} />
              </details>
            </li>
          {/each}
        </ul>
        {:else}
          <div class="w-full h-full flex items-center justify-center">
            <h1 class="text-4xl font-bold text-yellow-800 animate-pulse">No rooms added yet</h1>
          </div>
        {/if}

      </div>

      <div
        class="flex flex-none justify-around font-bold text-2xl px-8 py-3 rounded bg-slate-100 shadow-lg"
      >
        <h3>
          Total Square Feet: {rooms
            .reduce((acc, curr) => acc + curr.squareFeet, 0)
            .toFixed(2)}
        </h3>

        <h3>
          10%: {(
            rooms.reduce((acc, curr) => acc + curr.squareFeet, 0) * 1.1
          ).toFixed(2)}
        </h3>

        <h3>
          15%: {(
            rooms.reduce((acc, curr) => acc + curr.squareFeet, 0) * 1.15
          ).toFixed(2)}
        </h3>
      </div>

      <div class="w-full gap-4 justify-between flex-row flex">

        <div class="flex flex-none flex-row gap-4">
          <button
            class="rounded px-6 py-4 bg-green-200"
            on:click={() => (isAddingRoom = true)}
          >
            ADD ROOM
          </button>

          <button class="rounded px-6 py-4 bg-yellow-500" on:click={saveToJson}>
            SAVE JSON
          </button>
        </div>
        
        <button on:click={() => isAddingJson = true} class="rounded px-6 py-4 bg-teal-500">
          UPLOAD JSON
        </button>
      </div>
    {/await}
  </div>
</div>
