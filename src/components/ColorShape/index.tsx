/**
 * External dependencies
 */
import { FC } from 'react';

/**
 * Internal dependencies
 */
import styles from './colorShape.module.scss';
import { UserColors } from '../../types/user';

export interface ColorShape {
	color: UserColors;
}
export const ColorShape: FC<ColorShape> = ({color}) => {
	return (
		<div className={styles.shape} style={{backgroundColor: color}} />
	);
}

export default ColorShape;
