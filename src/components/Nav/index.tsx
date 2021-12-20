/**
 * External dependencies
 */
import { FC } from 'react';
import Link from 'next/link';

/**
 * Internal dependencies
 */
import styles from './nav.module.scss';

export const Nav: FC = () => {
	return (
		<nav>
			<ul className={styles.navigation}>
				<li>
					<Link href="/users">User</Link>
				</li>
				<li>
					<Link href="/users/recent">Recent</Link>
				</li>
				<li>
					<Link href="/groups">Groups</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
