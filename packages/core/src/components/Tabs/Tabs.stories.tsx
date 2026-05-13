import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './Tabs';
import { Badge } from '../Badge';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 32, maxWidth: 720 }}>{children}</div>
);

const PanelText = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: 'var(--ank-body)',
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--ank-ink-soft)',
      padding: 20,
      border: '2.5px solid var(--ank-ink)',
      background: 'var(--ank-white)',
      boxShadow: '4px 4px 0 var(--ank-shadow-color)',
    }}
  >
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Frame>
      <Tabs defaultValue="overview">
        <Tabs.List aria-label="Account sections">
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
          <Tabs.Tab value="team">Team</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">
          <PanelText>
            Overview panel. Use arrow keys, Home, and End to move between tabs.
          </PanelText>
        </Tabs.Panel>
        <Tabs.Panel value="billing">
          <PanelText>
            Billing panel. Manage subscriptions, invoices, and payment methods here.
          </PanelText>
        </Tabs.Panel>
        <Tabs.Panel value="team">
          <PanelText>
            Team panel. Invite teammates and adjust their roles.
          </PanelText>
        </Tabs.Panel>
      </Tabs>
    </Frame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [tab, setTab] = useState('one');
      return (
        <Frame>
          <Tabs value={tab} onChange={setTab}>
            <Tabs.List aria-label="Controlled example">
              <Tabs.Tab value="one">One</Tabs.Tab>
              <Tabs.Tab value="two">Two</Tabs.Tab>
              <Tabs.Tab value="three">Three</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="one"><PanelText>Panel one.</PanelText></Tabs.Panel>
            <Tabs.Panel value="two"><PanelText>Panel two.</PanelText></Tabs.Panel>
            <Tabs.Panel value="three"><PanelText>Panel three.</PanelText></Tabs.Panel>
          </Tabs>
          <div style={{ fontFamily: 'var(--ank-mono)', fontSize: 12, color: 'var(--ank-gray-500)', marginTop: 16 }}>
            active: {tab}
          </div>
        </Frame>
      );
    };
    return <Demo />;
  },
};

export const WithDisabledTab: Story = {
  render: () => (
    <Frame>
      <Tabs defaultValue="docs">
        <Tabs.List aria-label="Docs sections">
          <Tabs.Tab value="docs">Docs</Tabs.Tab>
          <Tabs.Tab value="api">API</Tabs.Tab>
          <Tabs.Tab value="changelog" disabled>Changelog</Tabs.Tab>
          <Tabs.Tab value="examples">Examples</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="docs"><PanelText>Documentation panel.</PanelText></Tabs.Panel>
        <Tabs.Panel value="api"><PanelText>API reference panel.</PanelText></Tabs.Panel>
        <Tabs.Panel value="changelog"><PanelText>Changelog panel.</PanelText></Tabs.Panel>
        <Tabs.Panel value="examples"><PanelText>Examples panel — arrow keys skip the disabled tab.</PanelText></Tabs.Panel>
      </Tabs>
    </Frame>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Frame>
      <Tabs defaultValue="inbox">
        <Tabs.List aria-label="Mail folders">
          <Tabs.Tab value="inbox">
            Inbox <Badge variant="dark" size="sm">12</Badge>
          </Tabs.Tab>
          <Tabs.Tab value="drafts">
            Drafts <Badge variant="outline" size="sm">2</Badge>
          </Tabs.Tab>
          <Tabs.Tab value="sent">Sent</Tabs.Tab>
          <Tabs.Tab value="archive">Archive</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="inbox"><PanelText>12 unread messages in your inbox.</PanelText></Tabs.Panel>
        <Tabs.Panel value="drafts"><PanelText>2 drafts waiting to be sent.</PanelText></Tabs.Panel>
        <Tabs.Panel value="sent"><PanelText>Sent messages from the last 30 days.</PanelText></Tabs.Panel>
        <Tabs.Panel value="archive"><PanelText>Archived conversations.</PanelText></Tabs.Panel>
      </Tabs>
    </Frame>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Frame>
      <Tabs defaultValue="t1">
        <Tabs.List aria-label="Many tabs">
          {Array.from({ length: 8 }).map((_, i) => (
            <Tabs.Tab key={i} value={`t${i + 1}`}>Tab {i + 1}</Tabs.Tab>
          ))}
        </Tabs.List>
        {Array.from({ length: 8 }).map((_, i) => (
          <Tabs.Panel key={i} value={`t${i + 1}`}>
            <PanelText>Panel content for Tab {i + 1}.</PanelText>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Frame>
  ),
};
