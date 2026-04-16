<script lang="ts">
	export let name: string = '';
	export let nickname: string = '';
	export let phone: string = '';
	export let email: string = '';
	export let github: string = '';
	export let location: string = '';
	export let website: string = '';
	export let linkedin: string = '';

	$: contacts = [
		email ? { label: email, href: `mailto:${email}` } : null,
		github ? { label: `github.com/${github}`, href: `https://github.com/${github}` } : null,
		website ? { label: website, href: `https://${website}` } : null,
		phone ? { label: phone, href: `tel:${phone}` } : null,
		location ? { label: location, href: null } : null,
	].filter(Boolean);
</script>

<div class="text-center py-4 print:py-1">
	<h1 class="text-4xl lg:text-5xl font-bold print:text-xl mb-1">
		{name}
		{#if nickname}
			<span class="web-only text-2xl font-normal text-gray-500">({nickname})</span>
		{/if}
	</h1>
	<div class="flex flex-wrap justify-center gap-x-1">
		{#each contacts as contact, i}
			{#if i > 0}<span class="text-gray-400">·</span>{/if}
			{#if contact.href}
				<a href={contact.href} target="_blank" rel="noreferrer">{contact.label}</a>
			{:else}
				<span>{contact.label}</span>
			{/if}
		{/each}
	</div>
</div>

<style lang="postcss">
	a {
		text-decoration: underline;
	}

	@media print {
		div {
			padding: 0 !important;
			margin-bottom: 0.3rem;
		}

		h1 {
			font-size: 16pt !important;
			margin-bottom: 0.2rem;
		}

		.flex {
			font-size: 8pt !important;
		}
	}
</style>
