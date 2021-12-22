/**
 * External dependencies
 */
import { useState, useCallback } from 'react';
import { NextPage, } from "next";

/**
 * Internal dependencies
 */
import type { User, UsersProps } from '../../types';
import { UsersTable, NewUser } from '../../components';
import { getUsers } from '../../utils/apiService';

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
	return await getUsers();
}

export default Users;
