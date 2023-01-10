import { useState } from 'react';
import Head from 'next/head';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import '../styles/globals.css';

import AppShellComponent from 'components/AppShell';

function MyApp({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState('light');

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <AppShellComponent>
            <Component {...pageProps} />
          </AppShellComponent>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;
