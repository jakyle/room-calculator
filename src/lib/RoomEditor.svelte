<script lang="ts">
	import { createEventDispatcher } from "svelte";
  import type { Dimension, Room } from "../models/Room";
  import { v4 as uuidv4 } from "uuid";
  import { roomStore } from "./RoomsStore";

  const dispatchDoneEditing = createEventDispatcher<{roomEdited: boolean}>();

  let name: string = "";
  let description: string = "";

  let dimensionFields: {
    width: string;
    length: string;
    description: string;
  }[] = [];

  const handleSubmit = () => {
    const dimensions = dimensionFields.map((dimension) => {
      const { width, length, description } = dimension;
      // Split the width and length into feet and inches
      const [widthFeet, widthInches] = width.split(".");
      const [lengthFeet, lengthInches] = length.split(".");

      // Convert feet and inches to inches
      const widthInInches = parseInt(widthFeet) * 12 + parseInt(widthInches);
      const lengthInInches = parseInt(lengthFeet) * 12 + parseInt(lengthInches);

      const dimensionFinal: Dimension = {
        width: widthInInches,
        length: lengthInInches,
        squareFeet: (widthInInches * lengthInInches) / 144,
        squareInches: widthInInches * lengthInInches,
        description,
      };

      return dimensionFinal;
    });

    const room: Room = {
      id: uuidv4().toString(),
      name,
      description,
      dimensions,
      squareFeet: dimensions.reduce((acc, curr) => acc + curr.squareFeet, 0),
      squareInches: dimensions.reduce(
        (acc, curr) => acc + curr.squareInches,
        0
      ),
    };

	roomStore.update((rooms) => [...rooms, room]);

	dispatchDoneEditing('roomEdited', true);
  };

  const addDimension = () => {
    dimensionFields.push({ width: "", length: "", description: "" });
	dimensionFields = dimensionFields;
  };

  const removeDimension = (index: number) => {
    dimensionFields.splice(index, 1);
    dimensionFields = dimensionFields;
  };

  const footByInchesPattern = "/^d+(.([1-9]|1[0-2]))?$/";
</script>

<div class="size-full flex items-center justify-center flex-col gap-y-8 bg-gray-500">
  <form
    on:submit|preventDefault={handleSubmit}
    class="size-3/4 flex flex-col gap-y-4"
  >
    <fieldset class="flex gap-x-4 py-4 px-6">
      <legend class="text-2xl font-bold">Room</legend>

      <div class="flex flex-col gap-2">
        <label for="name">Name</label>
        <input required id="name" type="text" bind:value={name} />
      </div>

      <div class="flex flex-col gap-2">
        <label for="description">Description</label>
        <textarea id="description" bind:value={description}></textarea>
      </div>
    </fieldset>

    {#each dimensionFields as dimension, i (i)}
      <fieldset class="flex gap-x-4 py-4 px-6">
        <legend class="text-2xl font-bold">Dimension {i + 1}</legend>
        <div class="flex flex-col gap-2">
          <label for={`width${i}`}>Width</label>
          <input
            required
            pattern="^\d+(\.([1-9]|1[0-2]))?$"
            id={`width${i}`}
            type="text"
            bind:value={dimension.width}
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for={`length${i}`}>Length</label>
          <input
            required
            pattern="^\d+(\.([1-9]|1[0-2]))?$"
            id={`length${i}`}
            type="text"
            bind:value={dimension.length}
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for={`desc${i}`}>Description</label>
          <textarea id={`desc${i}`} bind:value={dimension.description}
          ></textarea>
        </div>

        <button
          class="size-6 rounded-lg flex items-center justify-center"
          on:click={() => removeDimension(i)}>❌</button
        >
      </fieldset>
    {/each}

    <div class="flex flex-row gap-2 w-full">
      <button class="px-6 py-4 rounded bg-blue-200" on:click={addDimension} type="button">ADD DIMENSION</button>
      <button class="px-6 py-4 rounded bg-green-200" type="submit">SAVE</button>
	  <button class="px-6 py-4 rounded bg-red-200" type="button" on:click={() => dispatchDoneEditing("roomEdited", true)}>CANCEL</button>
    </div>
  </form>
</div>
