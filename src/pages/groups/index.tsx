/**
 * External dependencies
 */
import {useCallback, useMemo, useState} from "react";
import {NextPage} from "next";

/**
 * Internal dependencies
 */
import {addUserToGroup, getGroups, getUsers, removeUserFromGroup} from '../../utils/apiService';
import type {Group, User} from '../../types';

const getFreeUsers = (users, groups) => {
	const connectedIds = groups.map(g => g.usersIds).flat(2);
	const freeUsers = users.filter(u => !connectedIds.includes(u.id)) || [];
	return freeUsers;
}

const Groups: NextPage<any> = ({ groupsData, usersData }) => {
	const [groups, setGroups] = useState<Group[]>(groupsData);
	const [freeUsers, setFreeUsers] = useState<User[]>(getFreeUsers(usersData, groupsData));

	const [ selectedFreeUsers, setSelectedFreeUsers ] = useState([]);
	const [ selectedGroup, setSelectedGroup ] = useState();
	const [ selectedUsersGroup, setSelectedUsersGroup ] = useState([]);

	const handleSelectUser = useCallback(e => {
		e.stopPropagation();
		e.preventDefault();
		// @ts-ignore
		const selectedOptions = (Array.from(e.target.selectedOptions, option => option.value) || []);
		// @ts-ignore
		setSelectedFreeUsers(selectedOptions);
		// setSelectedUsers(e.target.value);
	}, [ setSelectedFreeUsers ])

	const handleSelectGroup = useCallback(e => {
		e.stopPropagation();
		e.preventDefault();
		setSelectedGroup(e.target.value);
	}, [ setSelectedGroup ]);

	const handleSelectUserGroup = useCallback(e => {
		e.stopPropagation();
		e.preventDefault();
		const selectedOptions = (Array.from(e.target.selectedOptions, option => option.value) || []);
		setSelectedUsersGroup(selectedOptions);
	}, [ setSelectedUsersGroup ]);

	const isButtonMoveToDisabled = useMemo(() => (selectedFreeUsers || []).length === 0 || !selectedGroup, [selectedFreeUsers, selectedGroup]);
	const isButtonMoveFromDisabled = useMemo(() => (selectedUsersGroup || []).length === 0 || !selectedGroup, [selectedGroup, selectedUsersGroup]);

	const groupUsers = useMemo(() => {
		const group = groups.find(g => g.id === selectedGroup);
		const gUsers = usersData.filter(user => group?.usersIds?.includes(user.id));
		return gUsers;
	}, [groups, usersData, selectedGroup]);


	const handleMoveToGroup = useCallback(async e => {
		e.stopPropagation();
		e.preventDefault();

		let originalGroup = groups.find(g => g.id === selectedGroup);
		if (originalGroup) {
			const newGroups = groups.filter(g => g.id !== selectedGroup);

			await Promise.all(selectedFreeUsers.map(userId => addUserToGroup({ groupId: selectedGroup || "", userId })));
			originalGroup.usersIds = (originalGroup?.usersIds || []).concat(selectedFreeUsers);
			newGroups.push(originalGroup);
			setGroups(newGroups);

			setFreeUsers(getFreeUsers(freeUsers, newGroups))
			setSelectedFreeUsers([]);
		}
	}, [freeUsers, groups, selectedFreeUsers, selectedGroup]);

	const handleMoveFromGroup = useCallback(async e => {
		e.stopPropagation();
		e.preventDefault();

		let originalGroup = groups.find(g => g.id === selectedGroup);
		if (originalGroup) {
			const newGroups = groups.filter(g => g.id !== selectedGroup);

			await Promise.all(selectedUsersGroup.map(userId => removeUserFromGroup({ groupId: selectedGroup || "", userId })));
			originalGroup.usersIds = (originalGroup?.usersIds || []).filter(id => !selectedUsersGroup.includes(id));
			newGroups.push(originalGroup);
			setGroups(newGroups);
			setFreeUsers(getFreeUsers(usersData, newGroups))
			setSelectedUsersGroup([]);
		}
	}, [groups, selectedGroup, selectedUsersGroup, usersData]);



	return (
		<main>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<div style={{display: 'flex', flexDirection: 'column', width: '40%', padding: '10px'}}>
					<label htmlFor="selected-users">Choose a free user:</label>
					<select value={selectedFreeUsers} onChange={handleSelectUser} name="selectedUsers"
							id="selected-users" multiple={true}>
						{freeUsers.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
					</select>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', width: '20%', padding: '10px'}}>
					<button disabled={isButtonMoveToDisabled} onClick={handleMoveToGroup}>{'Move ->'}</button>
					<button disabled={isButtonMoveFromDisabled} onClick={handleMoveFromGroup}>{'<- Move'}</button>
				</div>

				<div style={{display: 'flex', flexDirection: 'column', width: '40%', padding: '10px'}}>
					<label htmlFor="selected-group">Choose a group:</label>
					<select value={selectedGroup} onChange={handleSelectGroup} name="selectedGroup"
							id="selected-group">
						<option value="">--- Select group ---</option>
						{groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
					</select>
					{ selectedGroup && <div style={{display: 'flex', flexDirection: 'column'}}>
						<label htmlFor="selected-users-group">Choose a user from group:</label>
						<select value={selectedUsersGroup} onChange={handleSelectUserGroup} name="selectedUsersGroup"
								id="selected-users-group" multiple={true}>
							{groupUsers.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
						</select>
					</div>
					}
				</div>
			</div>
		</main>
	)
};

export const getServerSideProps = async () => {
	const promises = await Promise.all([getGroups(), getUsers()]);
	const [ { props: groupsDataProps }, { props: usersDataProps } ] = promises;
	return {
		props: {
			groupsData: groupsDataProps?.groupsData,
			usersData: usersDataProps?.usersData
		}
	};
}

export default Groups;
