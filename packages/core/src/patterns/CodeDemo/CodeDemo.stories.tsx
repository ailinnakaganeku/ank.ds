import type { Meta, StoryObj } from '@storybook/react';
import { CodeDemo } from './CodeDemo';

const meta = {
  title: 'ank.ds/Patterns/CodeDemo',
  component: CodeDemo,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CodeDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Terminal: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <CodeDemo title="terminal — bash">
        <CodeDemo.Line prompt="$">npm install @ankds/core</CodeDemo.Line>
        <CodeDemo.Line output>added 12 packages in 1.4s</CodeDemo.Line>
        <CodeDemo.Line prompt="$" caret />
      </CodeDemo>
    </div>
  ),
};

export const ImportSnippet: Story = {
  render: () => (
    <div style={{ width: 520 }}>
      <CodeDemo title="components/Hero.tsx">
        <pre>{`import { Hero } from '@ankds/core';

<Hero
  title="A neubrutalist DS."
  description="Bold borders, hard shadows."
  actions={<Button>Get started</Button>}
/>`}</pre>
      </CodeDemo>
    </div>
  ),
};

export const Light: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <CodeDemo variant="light" title="install">
        <CodeDemo.Line prompt="$">npx ankds init</CodeDemo.Line>
        <CodeDemo.Line output>copied tokens, components, and storybook config.</CodeDemo.Line>
        <CodeDemo.Line output>done in 800 ms.</CodeDemo.Line>
      </CodeDemo>
    </div>
  ),
};

export const NoBar: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <CodeDemo showDots={false}>
        <CodeDemo.Line prompt=">">await fetch('/api/components')</CodeDemo.Line>
        <CodeDemo.Line output>{`{ "count": 30, "patterns": 4 }`}</CodeDemo.Line>
      </CodeDemo>
    </div>
  ),
};
