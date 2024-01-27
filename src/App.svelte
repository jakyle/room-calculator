<script lang="ts">
  import RoomEditor from "./lib/RoomEditor.svelte";
  import { roomStore } from "./lib/RoomsStore";

  let isAddingRoom = false;
  let deleteRoomId = "";

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
  };
</script>

<div class="w-screen h-screen bg-slate-400">
  <div class="w-full h-full relative p-12 overflow-auto">
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
        class="absolute size-full left-0 top-0 flex items-center justify-center bg-black/50"
      >
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
      </div>
    {/if}

    {#await $roomStore then rooms}
      <ul class="flex flex-col gap-2">
        {#each rooms as room}
          <li>
            <details class="child-summary:open:bg-slate-100">
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
                  on:click={() => (deleteRoomId = room.id)}>❌</button
                >
              </summary>
              <div class="px-3 pb-2 pt-1 w-full bg-stone-200">
                <table class="w-full">
                  <thead>
                    <tr class="child-th:bg-stone-600 child-th:text-white">
                      <th>Width (inches)</th>
                      <th>Length (inches)</th>
                      <th>Width (feet)</th>
                      <th>Length (feet)</th>
                      <th>Feet<sup>2</sup></th>
                      <th>Inches<sup>2</sup></th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody class="child-tr:border-b child-tr:border-b-stone-600 last:child-tr:border-none hover:child-tr:bg-stone-50">
                    {#each room.dimensions as dimension}
                      <tr>
                        <td>{dimension.width}</td>
                        <td>{dimension.length}</td>
                        <td
                          >{Math.floor(dimension.width / 12)}.{dimension.width %
                            12}</td
                        >
                        <td
                          >{Math.floor(
                            dimension.length / 12
                          )}.{dimension.length % 12}</td
                        >
                        <td>{dimension.squareFeet.toFixed(2)}</td>
                        <td>{dimension.squareInches}</td>
                        <td>{dimension.description}</td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </details>
          </li>
        {/each}
      </ul>

      <div
        class="flex justify-around font-bold text-2xl p-12 rounded bg-slate-100 [&>h3]:bg-yellow-100"
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
      <div class="flex flex-row w-full gap-4">
        <button
          class="rounded px-6 py-4 bg-green-200"
          on:click={() => (isAddingRoom = true)}>ADD ROOM</button
        >
        <button class="rounded px-6 py-4 bg-yellow-500" on:click={saveToJson}>
          SAVE JSON
        </button>
      </div>
    {/await}
  </div>
</div>
