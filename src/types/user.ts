import {Group} from "./group";

export enum UserColors {
	Red = 'red',
	Blue = 'blue',
	Green = 'green',
}

export interface UsersProps {
	usersData: User[];
}

export interface GroupsUsersProps {
	groupsData: Group[];
	usersData: User[];
}

export interface User {
	id: string,
	name: string,
	favoriteColor: UserColors,
	createdAt: string,
}
