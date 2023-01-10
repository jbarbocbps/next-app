import React from 'react';
import { IconGitPullRequest, IconAlertCircle, IconMessages, IconDatabase } from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import Link from 'next/link';

function MainLink({ icon, color, label, href }) {
  return (
    <UnstyledButton
      component={Link}
      href={href}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon
          color={color}
          variant="light"
        >
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconGitPullRequest size={16} />,
    color: 'blue',
    label: 'AG Grid',
    href: '/ag-grid-samples/basic',
  },
  {
    icon: <IconAlertCircle size={16} />,
    color: 'teal',
    label: 'Link 2',
    href: '/',
  },
  {
    icon: <IconMessages size={16} />,
    color: 'violet',
    label: 'Link 3',
    href: '/',
  },
  {
    icon: <IconDatabase size={16} />,
    color: 'grape',
    label: 'Link 4',
    href: '/',
  },
];

export function MainLinks() {
  const links = data.map((link) => (
    <MainLink
      {...link}
      key={link.label}
    />
  ));
  return <div>{links}</div>;
}
