/**
 * External dependencies
 */
import { NextPage } from "next";

/**
 * Internal dependencies
 */
import type { User } from '../../types';

interface UsersProps {
	usersData: User[];
}

const Users: NextPage<UsersProps> = ({ usersData }) => {
	return (
		<main>
			Users
		</main>
	)
};

export const getServerSideProps = async () => {
	try {
		// const res = await fetch('');
		const usersData: User[] = [
			{
				id: 1,
				name: 'Jon Doe',
				favoriteColor: 'red',
				createdAt: 'Wed Feb 05 2020 11:18:21 GMT+0000 (Greenwich Mean Time)',
			},
			{
				id: 2,
				name: 'Jane Doe',
				favoriteColor: 'green',
				createdAt: 'Mon Dec 20 2021 11:18:21 GMT+0000 (Greenwich Mean Time)',
			},
			{
				id: 3,
				name: 'Jon XYZ',
				favoriteColor: 'blue',
				createdAt: 'Tue Dec 21 2021 11:18:21 GMT+0000 (Greenwich Mean Time)',
			}
		];

		return {
			props: {
				usersData,
			}
		}
	} catch(e) {
		console.log(e);

		return {
			notFound: true,
		};
	}

}

export default Users;
