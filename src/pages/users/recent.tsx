/**
 * External dependencies
 */
import { NextPage } from "next";

/**
 * Internal dependencies
 */
import { getRecentUser } from '../../utils/apiService';
import { User}  from '../../types';
import { UsersTable, ColorShape } from '../../components/';

interface RecentProps {
	recentUser: User,
}

const Recent: NextPage<RecentProps> = ({recentUser}) => {
	return (
		<main style={{color: recentUser.favoriteColor}}>
			<ColorShape color={recentUser.favoriteColor} />
			<UsersTable usersData={[recentUser]} />
		</main>
	)
};

export const getServerSideProps = async () => {
	const data = await getRecentUser();

	if(data) {
		return data;
	}

	return {
		redirect: {
			destination: '/',
			permanent: false,
		}
	}
}

export default Recent;
