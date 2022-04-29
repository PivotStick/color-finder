<script>
	import { page } from '$app/stores';

	let src =
		localStorage.getItem('src') ||
		'https://f.hellowork.com/blogdumoderateur/2017/08/youtube-logo.gif';
	let colors = ['#000000'];

	$: localStorage.setItem('src', src);
</script>

<svelte:head>
	<title>Color Finder</title>
</svelte:head>

<img
	{src}
	alt=""
	on:error={(e) => {
		e.currentTarget.style.setProperty('display', 'none');
	}}
	on:load={async (e) => {
		const c = e.currentTarget;
		colors = await fetch('/api/colors', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				count: +$page.url.searchParams.get('n') || 5,
				src
			})
		}).then((res) => res.json());

		c.style.setProperty('display', 'block');
	}}
/>
<input type="url" bind:value={src} />

<div class="colors">
	{#each colors as color}
		<div class="color" style:color>
			<p>{color}</p>
		</div>
	{/each}
</div>

<style lang="scss">
	input {
		font: inherit;
		position: absolute;

		top: calc(50% + 10em);
		left: 50%;

		transform: translate(-50%, -50%);

		border: none;
		padding: 0.5em;
		border-radius: 0.5em;
		width: 20em;
		outline: none;
		z-index: 11;

		box-shadow: 0 0 1em rgba(black, 0.1);
	}

	img {
		position: absolute;

		top: 45%;
		left: 50%;

		transform: translate(-50%, -50%);

		display: block;
		border-radius: 1em;
		height: 25em;
		object-fit: cover;
		z-index: 10;
		border: none;

		box-shadow: 0 0 1em rgba(black, 0.1);
	}

	.colors {
		display: flex;
		height: 100vh;
	}

	.color {
		position: relative;
		flex: 1;
		background-color: currentColor;
		transition: 400ms ease color;

		p {
			position: absolute;
			text-align: center;
			color: white;
			font-weight: 900;

			top: 85%;
			left: 50%;
			transform: translate(-50%, -50%);

			padding: 0.25em 0.5em;
			border-radius: 0.5em;
			background-color: rgba(black, 0.25);
		}
	}
</style>
