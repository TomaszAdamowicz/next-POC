export enum UserColors {
	Red = 'red',
	Blue = 'blue',
	Green = 'green',
}

export interface UsersProps {
	usersData: User[];
}

export interface User {
	id: number,
	name: string,
	favoriteColor: UserColors,
	createdAt: string,
}
