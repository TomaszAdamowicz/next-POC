/**
 * External dependencies
 */
import { FC } from 'react';

/**
 * Internal dependencies
 */
import styles from './error.module.scss';

interface ErrorProps {
	message: string;
}

const Error: FC<ErrorProps> = ({message}) => {
	return (
		<p className={`${styles.error} error-message`}>{message}</p>
	)
};

export default Error;
