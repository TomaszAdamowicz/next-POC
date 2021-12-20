/**
 * External dependencies
 */
import type {FC} from 'react';
import type { AppProps } from 'next/app'

const MyApp: FC<AppProps> =  ({ Component, pageProps }) => {
  	return <Component {...pageProps} />
}

export default MyApp
