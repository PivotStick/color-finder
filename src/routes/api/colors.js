import { get } from 'https';
import getColors from 'get-image-colors';

const getColorsOf = (url, count) =>
	new Promise((resolve) => {
		get(url, (res) => {
			const n = [];

			res.on('data', (/** @type {Buffer} */ chunk) => {
				n.push(...chunk);
			});

			res.on('end', () => {
				getColors(Buffer.from(n), {
					count,
					type: res.headers['content-type']
				}).then((colors) => {
					resolve(colors.map((c) => c.hex()));
				});
			});
		});
	});

/**
 * @type {import("@sveltejs/kit").RequestHandler}
 */
export const post = async ({ request }) => {
	const body = await request.json();

	return {
		body: await getColorsOf(body.src, body.count)
	};
};
