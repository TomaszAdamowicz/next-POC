/**
 * External dependencies
 */
import react, { FC } from 'react';

/**
 * Internal dependencies
 */
import styles from './colorShape.module.scss';
import { UserColors } from '../../types/user';

interface ColorShape {
	color: UserColors;
}
export const ColorShape: FC<ColorShape> = ({color}) => {
	return (
		<div className={styles.shape} style={{backgroundColor: color}} />
	);
}

export default ColorShape;
