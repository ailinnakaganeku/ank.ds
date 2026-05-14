import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta = {
  title: 'ank.ds/Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    value: 'install',
    question: 'How do I install ank.ds?',
    answer: 'Add @ankds/core to your dependencies and import the components you need.',
  },
  {
    value: 'theme',
    question: 'Can I customize the theme?',
    answer: 'Yes — override the CSS custom properties under the --ank-* namespace.',
  },
  {
    value: 'tree-shake',
    question: 'Is the library tree-shakeable?',
    answer: 'Yes. Each component lives in its own module and the package declares only CSS as a side effect.',
  },
];

export const Single: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Accordion type="single" defaultValue="install">
        {items.map((it) => (
          <Accordion.Item key={it.value} value={it.value}>
            <Accordion.Trigger>{it.question}</Accordion.Trigger>
            <Accordion.Panel>{it.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Accordion type="multiple" defaultValue={['install', 'theme']}>
        {items.map((it) => (
          <Accordion.Item key={it.value} value={it.value}>
            <Accordion.Trigger>{it.question}</Accordion.Trigger>
            <Accordion.Panel>{it.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Accordion type="single" collapsible>
        {items.map((it) => (
          <Accordion.Item key={it.value} value={it.value}>
            <Accordion.Trigger>{it.question}</Accordion.Trigger>
            <Accordion.Panel>{it.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};
