import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta = {
  title: 'ank.ds/Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'Accordion items' },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    question: 'How do I install ank.ds?',
    answer: 'Add @ankds/core to your dependencies and import the components you need.',
  },
  {
    question: 'Can I customize the theme?',
    answer: 'Yes — override the CSS custom properties under the --ank-* namespace.',
  },
  {
    question: 'Is the library tree-shakeable?',
    answer:
      'Yes. Each component lives in its own module and the package declares only CSS as a side effect.',
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Accordion>
        {items.map((item) => (
          <Accordion.Item key={item.question}>
            <Accordion.Trigger>{item.question}</Accordion.Trigger>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};

export const SomeOpenAtFirst: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Accordion>
        {items.map((item, index) => (
          <Accordion.Item key={item.question} defaultOpen={index < 2}>
            <Accordion.Trigger>{item.question}</Accordion.Trigger>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};
