/**
 * External dependencies
 */
import { useState } from "react";
import { NextPage } from "next";

/**
 * Internal dependencies
 */
import { getUsers } from '../../utils/apiService';
import styles from './styles/groups.module.scss';
import type { User, UsersProps } from '../../types';


const Groups: NextPage<UsersProps> = ({usersData}) => {
	const [users, setUsers] = useState<User[]>(usersData);

	return (
		<main>
			<div className={styles.groups}>

			</div>
		</main>
	)
};

export const getServerSideProps = async () => {
	return await getUsers();
}

export default Groups;
