import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { FieldWrapper } from '../FieldWrapper';

const Trigger = ({
  label,
  open,
  onOpen,
}: {
  label: string;
  open: boolean;
  onOpen: () => void;
}) => (
  <div style={{ padding: 32 }}>
    <Button onClick={onOpen} aria-haspopup="dialog" aria-expanded={open}>
      {label}
    </Button>
  </div>
);

const meta = {
  title: 'ank.ds/Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Trigger label="Open modal" open={open} onOpen={() => setOpen(true)} />
          <Modal open={open} onClose={() => setOpen(false)} title="Confirm action">
            <Modal.Body>
              <p style={{ margin: 0 }}>
                Are you sure you want to continue? You can change this later in settings.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Continue</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    };
    return <Demo />;
  },
};

export const Sizes: Story = {
  render: () => {
    const Demo = () => {
      const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null);
      return (
        <div style={{ display: 'flex', gap: 12, padding: 32, flexWrap: 'wrap' }}>
          <Button onClick={() => setSize('sm')}>Small</Button>
          <Button onClick={() => setSize('md')}>Medium</Button>
          <Button onClick={() => setSize('lg')}>Large</Button>
          <Modal
            open={size !== null}
            onClose={() => setSize(null)}
            size={size ?? 'md'}
            title={size ? `${size.toUpperCase()} modal` : 'Modal'}
          >
            <Modal.Body>
              <p style={{ margin: 0 }}>
                This modal is rendered at the {size} size. Available widths are 380, 500, and 720 pixels.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setSize(null)}>Got it</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    };
    return <Demo />;
  },
};

export const LongContent: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Trigger label="Open long modal" open={open} onOpen={() => setOpen(true)} />
          <Modal open={open} onClose={() => setOpen(false)} title="Terms of service" size="lg">
            <Modal.Body>
              {Array.from({ length: 12 }).map((_, i) => (
                <p key={i} style={{ marginTop: i === 0 ? 0 : 16 }}>
                  Section {i + 1}. The quick brown fox jumps over the lazy dog. The body
                  scrolls when the content overflows the viewport. The header and footer
                  stay pinned to the top and bottom of the modal frame.
                </p>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpen(false)}>Decline</Button>
              <Button onClick={() => setOpen(false)}>Accept</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    };
    return <Demo />;
  },
};

export const ConfirmDestructive: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Trigger label="Delete account" open={open} onOpen={() => setOpen(true)} />
          <Modal open={open} onClose={() => setOpen(false)} title="Delete your account?" size="sm">
            <Modal.Body>
              <p style={{ margin: 0 }}>
                This will permanently remove your account and all associated data. This
                action cannot be undone.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>Delete account</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    };
    return <Demo />;
  },
};

export const WithForm: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      const firstInputRef = useRef<HTMLInputElement>(null);
      return (
        <>
          <Trigger label="Invite teammate" open={open} onOpen={() => setOpen(true)} />
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Invite a teammate"
            initialFocus={firstInputRef}
          >
            <Modal.Body>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <FieldWrapper label="Email" required helper="They will receive an invite link.">
                  <Input ref={firstInputRef} type="email" placeholder="you@example.com" />
                </FieldWrapper>
                <FieldWrapper label="Role">
                  <Input defaultValue="Editor" />
                </FieldWrapper>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Send invite</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    };
    return <Demo />;
  },
};

export const StaticOverlay: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Trigger label="Open modal (no overlay close)" open={open} onOpen={() => setOpen(true)} />
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Required step"
            closeOnOverlay={false}
            closeOnEscape={false}
          >
            <Modal.Body>
              <p style={{ margin: 0 }}>
                Clicking outside or pressing Escape will not close this modal. Use one
                of the buttons below.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpen(false)}>Acknowledge</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    };
    return <Demo />;
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Trigger label="Open titleless modal" open={open} onOpen={() => setOpen(true)} />
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-label="Quick action"
          >
            <Modal.Body>
              <p style={{ margin: 0 }}>
                A modal without a visible title. The aria-label keeps it accessible.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    };
    return <Demo />;
  },
};
