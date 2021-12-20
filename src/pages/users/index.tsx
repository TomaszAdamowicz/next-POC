/**
 * External dependencies
 */
import { useState, useCallback } from 'react';
import { NextPage, } from "next";

/**
 * Internal dependencies
 */
import type { User } from '../../types';
import { UsersTable, NewUser } from '../../components';

interface UsersProps {
	usersData: User[];
}

const Users: NextPage<UsersProps> = ({ usersData }) => {
	const [data, setData] = useState<User[]>(usersData);

	const updateUsers = useCallback((newUser) => {
		setData([...data, newUser]);
	}, [data]);

	return (
		<main>
			<NewUser updateData={updateUsers}/>
			<UsersTable usersData={data}/>
		</main>
	)
};

export const getServerSideProps = async () => {
	try {
		const res = await fetch(`${process.env.API_URL}/users`);
		const data = await res.json();

		return {
			props: {
				usersData: data,
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
