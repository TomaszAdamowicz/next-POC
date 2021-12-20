/**
 * External dependencies
 */
import { NextPage } from "next";

/**
 * Internal dependencies
 */
import type { User } from '../../types';
import { UsersTable, NewUser } from '../../components';

interface UsersProps {
	usersData: User[];
}

const Users: NextPage<UsersProps> = ({ usersData }) => {
	return (
		<main>
			<NewUser />
			<UsersTable usersData={usersData}/>
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
