/**
 * External dependencies
 */
import React, { FC, useRef } from 'react';

/**
 * Internal dependencies
 */
import type { User } from '../../types';
import styles from './newUser.module.scss';

export const NewUser: FC = () => {
	const name = useRef<HTMLInputElement>(null);
	const color = useRef<HTMLSelectElement>(null);

	const colorOptions = [
		'red',
		'blue',
		'green'
	];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

	const nameValue = name.current ? name.current.value : '';
	const colorValue = color.current  ? color.current.value : '';


  }

	return (
		<form className={styles['new-user']} onSubmit={handleSubmit}>
			<b>Add User</b>
			<div>
				<label htmlFor="user-name" className={styles['input-label']}>User Name</label>
				<input ref={name} id="user-name" type="text" />
			</div>
			<select ref={color} className={styles.select}>
				{colorOptions.map(option => (
					<option value={option} key={option}>{option}</option>
				))}
			</select>
			<button type="submit">Add new user</button>
		</form>
	);
}

export default NewUser;
