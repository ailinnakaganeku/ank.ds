import { inventory } from './inventory';
import './Welcome.css';

const REPO_URL = 'https://github.com/ailinnakaganeku/ank.ds';

const sections = [
  { label: 'Foundations', path: './?path=/story/ank-ds-foundations-colors--palette' },
  {
    label: `Components (${inventory.components})`,
    path: './?path=/docs/ank-ds-components-button--docs',
  },
  { label: `Patterns (${inventory.patterns})`, path: './?path=/docs/ank-ds-patterns-hero--docs' },
  { label: `Layout (${inventory.layout})`, path: './?path=/docs/ank-ds-layout-autogrid--docs' },
];

export const Welcome = () => (
  <div className="welcome">
    <h1 className="welcome__title">ank.ds</h1>
    <code className="welcome__install">npm install @ankds/core</code>
    <nav aria-label="Sections" className="welcome__links">
      {sections.map((section) => (
        <a key={section.label} href={section.path} target="_top">
          {section.label}
        </a>
      ))}
      <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
        GitHub ↗
      </a>
    </nav>
  </div>
);
