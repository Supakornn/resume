<script lang="ts">
	import Hideable from './Hideable.svelte';

	export let position = '';
	export let company = '';
	export let location = '';
	export let url = '';
	export let years: string[] = [];
	export let details: string[] = [];
	export let hide = false;
</script>

<div class="work-experience">
	<Hideable {hide}>
		<div class="flex mb-1 print:mb-0">
			<div class="flex-1 text-left font-bold">
				<a href={url} target="_blank" rel="noreferrer">{company}</a>
			</div>
			{#if location}
				<div class="flex-1 text-right font-normal">{location}</div>
			{/if}
		</div>
		<div class="flex mb-2 print:mb-1">
			<div class="flex-1 text-left font-bold">{position}</div>
			<div class="flex-1 text-right font-normal">{years.join(' - ')}</div>
		</div>
		<ul class="text-left list-disc pl-8 print:pl-6">
			{#each details as detail}
				<li>
					{detail}
				</li>
			{/each}
		</ul>
	</Hideable>
</div>

<style lang="postcss">
	.work-experience {
		@apply my-4;
	}

	a {
		text-decoration: underline;
	}

	@media print {
		.work-experience {
			margin-top: 0.4rem;
			margin-bottom: 0.4rem;
		}
	}
</style>
