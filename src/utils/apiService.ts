/**
 * Internal dependencies
 */
import type { User } from '../types';

export const saveUser = async (data: {name: string, color: string}): Promise<{user: User | null}> => {
	const {name, color} = data;

	if(!name && !color) {
		return {user: null};
	}

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`,{
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}),
			body: JSON.stringify({
				name,
				favoriteColor: color,
			})
		});

		return await res.json();
	} catch(e) {
		console.log(e);

		return {user: null};
	}
}
