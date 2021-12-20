/**
 * External dependencies
 */
import type {FC} from 'react';
import type { AppProps } from 'next/app';

/**
 * Internal dependencies
 */
import {Nav} from '../components';

const MyApp: FC<AppProps> =  ({ Component, pageProps }) => {
  	return (
		<>
			<Nav />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
