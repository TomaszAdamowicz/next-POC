/**
 * External dependencies
 */
import React, { FC } from 'react';

/**
 * Internal dependencies
 */
import type { User } from '../../types';

export const UsersTable: FC<{usersData: User[]}> = ({usersData}) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Favorite Color</th>
				</tr>
			</thead>
			<tbody>
				{usersData.map( user => (
					<tr
						key={user.name}
					>
						<td>{user.name}</td>
						<td>{user.favoriteColor}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default UsersTable;
