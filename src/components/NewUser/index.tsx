/**
 * External dependencies
 */
import { FC, useState, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { UserColors } from '../../types';
import styles from './newUser.module.scss';
import { saveUser } from '../../utils/apiService';
import type { User } from '../../types/user';
import { Error } from '../';

interface NewUserProps {
	updateData: (userData: User) => void;
}


export const NewUser: FC<NewUserProps> = ({updateData}) => {
	const [formState, setFormState] = useState({color: 'red', name: ''});
	const [hasInputError, setInputError] = useState(false);

	useEffect(() => {
		if(formState.name) {
			setInputError(false);
		}
	}, [formState.name]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if(!formState.name) {
			setInputError(true);

			return;
		}

		const { user } = await saveUser(formState);

		if(user) {
			updateData(user);
		}
	};

	return (
		<form
			className={styles['new-user']}
			onSubmit={handleSubmit}
		>
			<b>Add User</b>
			<div className={styles.input}>
				<label
					htmlFor="user-name"
					className={styles['input-label']}
				>
					User Name
				</label>
				{hasInputError && <Error message="Name field is required"/>}
				<input
					id="user-name"
					type="text"
					value={formState.name}
					onChange={(e) => setFormState({...formState,  name: e?.target.value})}
				/>
			</div>
			<select
				className={styles.select}
				value={formState.color}
				onChange={(e) => setFormState({...formState,  color: e?.target.value})}
			>
				{(Object.keys(UserColors) as Array<keyof typeof UserColors>).map(option => (
					<option
						value={UserColors[option]}
						key={UserColors[option]}
					>
						{option}
					</option>
				))}
			</select>
			<button type="submit">Add new user</button>
		</form>
	);
}

export default NewUser;
