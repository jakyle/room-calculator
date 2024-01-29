<script lang="ts">
  import type { Dimension } from "../models/Room";

	export let dimensions: Dimension[];
</script>

<div class="px-3 pb-2 pt-1 w-full bg-stone-200">
	<table class="w-full">
		<thead>
		<tr class="child-th:bg-stone-600 child-th:text-white">
			<th>Wid(in)</th>
			<th>Len(in)</th>
			<th>Wid(ft)</th>
			<th>Len(ft)</th>
			<th>ft<sup>2</sup></th>
			<th>in<sup>2</sup></th>
			<th>Desc.</th>
		</tr>
		</thead>
		<tbody
		class="child-tr:border-b child-tr:border-b-stone-600 last:child-tr:border-none hover:child-tr:bg-stone-50"
		>
			{#each dimensions as dimension}
				<tr>
				<td>{dimension.width}</td>
				<td>{dimension.length}</td>
				<td
					>{Math.floor(
					dimension.width / 12
					)}' {dimension.width % 12}"</td
				>
				<td
					>{Math.floor(
					dimension.length / 12
					)}' {dimension.length % 12}"</td
				>
				<td>{dimension.squareFeet.toFixed(2)}</td>
				<td>{dimension.squareInches}</td>
				<td>{dimension.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>