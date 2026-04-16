<script lang="ts">
	import { onMount } from 'svelte';
	import type { IProfileResp } from '../types';
	import Hideable from './Hideable.svelte';
	import Intro from './Intro.svelte';
	import Work from './Work.svelte';

	let profile: IProfileResp;

	$: dataLink = `${sourceLink}/blob/main/static/data/profile.json`;
	$: ({
		intro = {} as IProfileResp['intro'],
		summary = '',
		projects = [],
		contributions = [],
		// technologies = [],
		experiences = [],
		educations = [],
		achievements = [],
		resumeUrl: { sourceLink = '', fullVersionLink = '' } = {}
	} = profile || {});

	onMount(async () => (profile = await fetchResumeProfile()));

	async function fetchResumeProfile() {
		const resp = await fetch('/data/profile.json');
		return await resp.json();
	}
</script>

<header class="web-only text-center p-4 sm:p-6 bg-green-400 text-white w-screen">
	<h1 class="text-4xl">Resume</h1>
	<h3>
		<button on:click={() => window.print()} class="underline text-lg">[Print]</button>
	</h3>
	<p>
		Printer-friendly standard résumé, any HTML tags with <code>web-only</code> CSS class will be hidden
		on print.
	</p>
	<p>You can click at any sections or lines hide some information before printing.</p>
	<a href={sourceLink} target="_blank" rel="noopener">[Source]</a>
	<a href={dataLink} target="_blank" rel="noopener">[Data]</a>
</header>

<main class="text-center p-4 m-0 md:m-8 xl:mx-auto max-w-screen-xl">
	<Intro {...intro} />

	{#if summary}
		<section>
			<Hideable>
				<h2 class="text-2xl print:text-4xl uppercase text-left">Summary</h2>
				<hr />
				<p class="text-left">{summary}</p>
			</Hideable>
		</section>
	{/if}

	<!-- <section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Technologies and Languages</h2>
			<hr />
			<ul class="text-left list-disc pl-8">
				{#each technologies as tech}
					<Hideable>
						<li>
							<span class="w-28 inline-block">{tech.section}</span>
							<span>{tech.details}</span>
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section> -->

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Work Experience</h2>
			<hr />

			{#each experiences as exp}
				<Work {...exp} />
			{/each}
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Open Source Contributions</h2>
			<hr />

			{#each contributions as contribution}
				<Hideable hide={contribution.hide}>
					<div class="text-left my-4 print:my-1">
						<div class="flex justify-between mb-2 print:mb-1">
							<a href="https://{contribution.url}" target="_blank" rel="noreferrer" class="font-bold">
								{contribution.name}
							</a>
						</div>
						<ul class="text-left list-disc pl-8 print:pl-6">
							{#each contribution.details as detail}
								<li>{detail}</li>
							{/each}
						</ul>
					</div>
				</Hideable>
			{/each}
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Projects</h2>
			<hr />

			{#each projects as project}
				<Hideable hide={project.hide}>
					<div class="text-left my-4 print:my-1">
						<div class="flex justify-between mb-2 print:mb-1">
							<a href="https://{project.url}" target="_blank" rel="noreferrer" class="font-bold">
								{project.name}
							</a>
						</div>
						<ul class="text-left list-disc pl-8 print:pl-6">
							{#each project.details as detail}
								<li>{detail}</li>
							{/each}
						</ul>
					</div>
				</Hideable>
			{/each}
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Education</h2>
			<hr />

			{#each educations as edu}
				<Hideable>
					<div class="my-4 print:my-1">
						<div class="flex mb-1 print:mb-0">
							<div class="flex-1 text-left font-bold">
								{edu.degree}{#if edu.gpa}&nbsp;<span class="font-normal">({edu.gpa})</span>{/if}
							</div>
							{#if edu.location}
								<div class="flex-1 text-right font-normal">{edu.location}</div>
							{/if}
						</div>
						<div class="flex">
							<div class="flex-1 text-left">{edu.school}</div>
							{#if edu.years}
								<div class="flex-1 text-right font-normal">{edu.years}</div>
							{/if}
						</div>
					</div>
				</Hideable>
			{/each}
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Achievements & Certificates</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each achievements as ar}
					<Hideable>
						<li>
							<a href={ar.link}>{ar.title}</a>
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>
</main>

<style lang="postcss">
	main {
		overflow-x: hidden;
	}

	a {
		text-decoration: underline;
	}

	section {
		@apply my-4;
	}

	section h2 {
		@apply font-semibold;
	}

	section hr {
		@apply mt-0 mb-2;
		border-color: darkgrey;
		print-color-adjust: exact;
		-webkit-print-color-adjust: exact;
	}

	:global(.print-only) {
		display: none;
	}

	@media print {
		* {
			font-size: 9.5pt !important;
			line-height: 1.4;
		}

		:global(a) {
			text-decoration: none !important;
		}


		strong {
			font-size: 9.5pt !important;
		}

		:global(.text-sm) {
			font-size: 9pt !important;
		}

		section h2 {
			font-size: 10.5pt !important;
		}

		:global(.print-only) {
			display: inherit;
		}

		:global(.web-only) {
			display: none;
		}

		ul {
			padding-left: 1.2rem;
			margin-top: 0.1rem;
			margin-bottom: 0.2rem;
		}

		li {
			margin-bottom: 0.15rem;
		}

		section {
			margin-top: 0.4rem;
			margin-bottom: 0.4rem;
		}

		section:first-of-type {
			margin-top: 0.1rem;
		}

		section hr {
			margin-top: 0.05rem;
			margin-bottom: 0.1rem;
			border: none !important;
			border-top: 0.5px solid #aaa !important;
			print-color-adjust: exact;
			-webkit-print-color-adjust: exact;
		}

		main {
			margin: 0;
			padding: 0.3rem 0.5rem;
		}
	}
</style>
