/**
 * External dependencies
 */
import React, { FC } from 'react';

/**
 * Internal dependencies
 */
import type { User } from '../../types';
import styles from './usersTable.module.scss';

export const UsersTable: FC<{usersData: User[]}> = ({usersData}) => {
	const tableData = usersData.map( user => (
		<tr
			key={user.id}
		>
			<td className={styles.data}>{user.name}</td>
			<td className={styles.data}>{user.favoriteColor}</td>
		</tr>
	));

	return (
		<table className={styles.table}>
			<thead className={styles.head}>
				<tr>
					<th>Name</th>
					<th>Favorite Color</th>
				</tr>
			</thead>
			<tbody>
				{ tableData }
			</tbody>
		</table>
	);
}

export default UsersTable;
