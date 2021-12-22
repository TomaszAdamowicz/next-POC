/**
 * External dependencies
 */
import { FC } from 'react';

/**
 * Internal dependencies
 */
import { User } from '../../types';

const UsersList: FC<{usersData: User[]}> = ({usersData}) => {
	return (
		<div>
			<select>
					{usersData.map(user => (
						<option key={user.id} value={user.id}>{user.name}</option>
					))}
				</select>
		</div>
	);
}

export default UsersList;
