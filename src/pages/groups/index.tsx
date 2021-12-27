/**
 * External dependencies
 */
import {ChangeEventHandler, Dispatch, SetStateAction, SyntheticEvent, useCallback, useMemo, useState} from "react";
import {NextPage} from "next";

/**
 * Internal dependencies
 */
import {addUserToGroup, getGroups, getUsers, removeUserFromGroup} from '../../utils/apiService';
import type {Group, GroupsUsersProps, User} from '../../types';
import Select from "../../components/Select/Select";
import styles from './styles/groups.module.scss';

enum MoveDirection {
	FROM = 'FROM_GROUP',
	TO = 'TO_GROUP'
}

const getFreeUsers = (users: User[], groups: Group[]) => {
	const connectedIds = groups.map(g => g.usersIds).flat(2);
	return users.filter(u => !connectedIds.includes(u.id));
}

const stopEvent = (e: SyntheticEvent) => {
	e.stopPropagation();
	e.preventDefault();
}

const getSelectedOptions = (e: SyntheticEvent) => {
	const select = e.target as HTMLSelectElement;
	const options = select.selectedOptions as HTMLCollectionOf<HTMLOptionElement>;
	return Array.from(options, option => option.value);
}

const handleChange = (e: SyntheticEvent, setState: Dispatch<SetStateAction<string[]>>) => {
	stopEvent(e);
	const selectedOptions = getSelectedOptions(e);
	setState(selectedOptions);
}

const Groups: NextPage<GroupsUsersProps> = ({ groupsData, usersData }) => {
	const [groups, setGroups] = useState<Group[]>(groupsData);
	const [freeUsers, setFreeUsers] = useState<User[]>(getFreeUsers(usersData, groupsData));

	const [ selectedFreeUsers, setSelectedFreeUsers ] = useState<string[]>([]);
	const [ selectedGroup, setSelectedGroup ] = useState<string>();
	const [ selectedUsersGroup, setSelectedUsersGroup ] = useState<string[]>([]);

	const handleSelectUser: ChangeEventHandler<HTMLSelectElement> = useCallback((e: SyntheticEvent<HTMLSelectElement>) => handleChange(e, setSelectedFreeUsers), [ setSelectedFreeUsers ])

	const handleSelectGroup = useCallback((e: SyntheticEvent<HTMLSelectElement>) => {
		stopEvent(e);
		setSelectedGroup((e.target as HTMLSelectElement).value);
	}, [ setSelectedGroup ]);

	const handleSelectUserGroup: ChangeEventHandler<HTMLSelectElement> = useCallback((e: SyntheticEvent<HTMLSelectElement>) => handleChange(e, setSelectedUsersGroup), [ setSelectedUsersGroup ]);

	const groupUsers: User[] = useMemo(() => {
		const group = groups.find(g => g.id === selectedGroup);
		return usersData.filter(user => group?.usersIds?.includes(user.id));
	}, [groups, usersData, selectedGroup]);

	const moveGroup = useCallback(async (e: SyntheticEvent, moveDirection: MoveDirection) => {
		stopEvent(e);
		let originalGroup = groups.find(g => g.id === selectedGroup);
		if (originalGroup) {
			const newGroups = groups.filter(g => g.id !== selectedGroup);
			let newFreeUsers = [];
			if (moveDirection === MoveDirection.FROM) {
				await Promise.all(selectedUsersGroup.map(userId => removeUserFromGroup({ groupId: selectedGroup || "", userId })));
				originalGroup.usersIds = (originalGroup?.usersIds || []).filter(id => !selectedUsersGroup.includes(id));
				newGroups.push(originalGroup);
				newFreeUsers = getFreeUsers(usersData, newGroups);
				setSelectedUsersGroup([]);
			} else {
				await Promise.all(selectedFreeUsers.map(userId => addUserToGroup({ groupId: selectedGroup || "", userId })));
				originalGroup.usersIds = (originalGroup?.usersIds || []).concat(selectedFreeUsers);
				newGroups.push(originalGroup);
				newFreeUsers = getFreeUsers(freeUsers, newGroups);
				setSelectedFreeUsers([]);
			}
			setGroups(newGroups);
			setFreeUsers(newFreeUsers);
		}
	}, [freeUsers, groups, selectedFreeUsers, selectedGroup, selectedUsersGroup, usersData])

	const handleMoveToGroup = useCallback(async e => await moveGroup(e, MoveDirection.TO), [moveGroup]);
	const handleMoveFromGroup = useCallback(async e => await moveGroup(e, MoveDirection.FROM), [moveGroup]);

	const isButtonMoveToDisabled = useMemo(() => (selectedFreeUsers || []).length === 0 || !selectedGroup, [selectedFreeUsers, selectedGroup]);
	const isButtonMoveFromDisabled = useMemo(() => (selectedUsersGroup || []).length === 0 || !selectedGroup, [selectedGroup, selectedUsersGroup]);

	const groupOptions = useMemo(() => [{id: "", name: "--- Select group ---"}, ...groups], [ groups ]);

	return (
		<main>
			<div className={styles.groups}>
				<div className={styles.freeUsers}>
					<Select options={freeUsers} multiple={true} label="Choose a free user:" name="selectedUsers" value={selectedFreeUsers} onChange={handleSelectUser} />
				</div>

				<div className={styles.moveButtons}>
					<button disabled={isButtonMoveToDisabled} onClick={handleMoveToGroup}>{'Move ->'}</button>
					<button disabled={isButtonMoveFromDisabled} onClick={handleMoveFromGroup}>{'<- Move'}</button>
				</div>

				<div className={styles.selectedGroup}>
					<Select options={groupOptions} label="Choose a group:" name="selectedGroup" value={selectedGroup} onChange={handleSelectGroup} />
					{ selectedGroup &&
					<div className={styles.usersGroups}>
					  <Select options={groupUsers} multiple={true} label="Choose a user from group:" name="selectedUsersGroup" value={selectedUsersGroup} onChange={handleSelectUserGroup} />
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
