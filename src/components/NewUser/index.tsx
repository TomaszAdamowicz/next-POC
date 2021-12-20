/**
 * External dependencies
 */
import React, { FC, useRef } from 'react';

/**
 * Internal dependencies
 */
import { UserColors } from '../../types';
import styles from './newUser.module.scss';
import { saveUser } from '../../utils/apiService';

export const NewUser: FC = () => {
	const name = useRef<HTMLInputElement>(null);
	const color = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

	const userData = await saveUser({
		name: name.current ? name.current.value : '',
		color: color.current  ? color.current.value : '',
	});
  };

	return (
		<form className={styles['new-user']} onSubmit={handleSubmit}>
			<b>Add User</b>
			<div>
				<label htmlFor="user-name" className={styles['input-label']}>User Name</label>
				<input ref={name} id="user-name" type="text" />
			</div>
			<select ref={color} className={styles.select}>
				{(Object.keys(UserColors) as Array<keyof typeof UserColors>).map(option => (
					<option value={UserColors[option]} key={UserColors[option]}>{option}</option>
				))}
			</select>
			<button type="submit">Add new user</button>
		</form>
	);
}

export default NewUser;
