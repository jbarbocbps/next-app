import {
  AppShell,
  Navbar,
  Header,
  Group,
  ActionIcon,
  useMantineColorScheme,
  ScrollArea,
  Image,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

import { MainLinks } from './_mainLinks';
import { User } from './_user';

import CBPSLogo from 'assets/images/cbps-logo.png';

export default function AppShellComponent({ children }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar
          width={{ base: 300 }}
          height="calc(100vh - 60px)"
          p="xs"
        >
          <Navbar.Section
            grow
            mt="xs"
            component={ScrollArea}
          >
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group
            sx={{ height: '100%' }}
            px={20}
            position="apart"
          >
            <Image
              src={CBPSLogo.src}
              height={50}
              width="auto"
              alt="CBPS Logo"
            />
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
            </ActionIcon>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
