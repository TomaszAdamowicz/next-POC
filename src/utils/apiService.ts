/**
 * Internal dependencies
 */
import type { User } from '../types';
import {Group} from "../types";

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
};

export const getUsers = async () => {
	try {
		const res = await fetch(`${process.env.API_URL}/users`);
		const data = await res.json();

		return {
			props: {
				usersData: data as User[],
			}
		}
	} catch(e) {
		console.log(e);

		return {
			notFound: true,
		};
	}
};

export const getGroups = async () => {
	try {
		const res = await fetch(`${process.env.API_URL}/groups`);
		const data = await res.json();

		return {
			props: {
				groupsData: data as Group[],
			}
		}
	} catch(e) {
		console.log(e);

		return {
			notFound: true,
		};
	}
};

export const addUserToGroup = async (data: {groupId: string, userId: string}): Promise<{user: User | null}> => {
	const {groupId, userId} = data;

	if(!groupId && !userId) {
		return {user: null};
	}

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}/addUser`,{
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}),
			body: JSON.stringify({
				id: userId,
			})
		});

		return await res.json();
	} catch(e) {
		console.log(e);

		return {user: null};
	}
};

export const removeUserFromGroup = async (data: {groupId: string, userId: string}): Promise<{user: User | null}> => {
	const {groupId, userId} = data;

	if(!groupId && !userId) {
		return {user: null};
	}

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}/removeUser`,{
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}),
			body: JSON.stringify({
				id: userId,
			})
		});

		return await res.json();
	} catch(e) {
		console.log(e);

		return {user: null};
	}
};

export const getRecentUser = async () => {
	const {props} = await getUsers();

	if(props?.usersData && props.usersData.length > 0) {
		return {
			props: {
				recentUser: props.usersData.slice(-1)[0] as User,
			}
		}
	}

	return false;
}
