import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarAtom } from './avatar.atom';

const meta: Meta<AvatarAtom> = {
  title: 'Design System/Atoms/Avatar',
  component: AvatarAtom,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
    },
    fallback: {
      control: 'text',
      description: 'Fallback initials text',
    },
    bgColor: {
      control: 'color',
      description: 'Fallback background color',
    },
  },
};

export default meta;
type Story = StoryObj<AvatarAtom>;

/**
 * Avatar with image
 */
export const WithImage: Story = {
  args: {
    src: 'https://via.placeholder.com/100/0033A0/FFFFFF?text=AZ',
    alt: 'Azul Airlines',
    size: 'md',
  },
};

/**
 * Avatar with initials fallback
 */
export const WithFallback: Story = {
  args: {
    fallback: 'AZ',
    alt: 'Azul',
    size: 'md',
  },
};

/**
 * Small avatar
 */
export const Small: Story = {
  args: {
    fallback: 'GL',
    alt: 'Gol',
    size: 'sm',
  },
};

/**
 * Medium avatar
 */
export const Medium: Story = {
  args: {
    fallback: 'LA',
    alt: 'Latam',
    size: 'md',
  },
};

/**
 * Large avatar
 */
export const Large: Story = {
  args: {
    fallback: 'AZ',
    alt: 'Azul',
    size: 'lg',
  },
};

/**
 * Extra large avatar
 */
export const ExtraLarge: Story = {
  args: {
    fallback: 'GL',
    alt: 'Gol',
    size: 'xl',
  },
};

/**
 * Azul airline avatar
 */
export const Azul: Story = {
  args: {
    fallback: 'AZ',
    alt: 'Azul Airlines',
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <atom-avatar
        fallback="AZ"
        alt="Azul Airlines"
        [size]="size"
        style="background-color: #0033A0; color: white;"
      />
    `,
  }),
};

/**
 * Gol airline avatar
 */
export const Gol: Story = {
  args: {
    fallback: 'GL',
    alt: 'Gol Airlines',
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <atom-avatar
        fallback="GL"
        alt="Gol Airlines"
        [size]="size"
        style="background-color: #FF6600; color: white;"
      />
    `,
  }),
};

/**
 * Latam airline avatar
 */
export const Latam: Story = {
  args: {
    fallback: 'LA',
    alt: 'Latam Airlines',
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <atom-avatar
        fallback="LA"
        alt="Latam Airlines"
        [size]="size"
        style="background-color: #E31837; color: white;"
      />
    `,
  }),
};

/**
 * Avatar with broken image fallback
 */
export const BrokenImage: Story = {
  args: {
    src: 'https://broken-url.com/image.png',
    fallback: 'AZ',
    alt: 'Azul',
    size: 'md',
  },
};

/**
 * Avatar with automatic initials
 */
export const AutoInitials: Story = {
  args: {
    alt: 'Azul Linhas',
    size: 'md',
  },
};

/**
 * All sizes
 */
export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; align-items: center; gap: 24px; padding: 24px;">
        <atom-avatar fallback="AZ" alt="Azul" size="sm" />
        <atom-avatar fallback="AZ" alt="Azul" size="md" />
        <atom-avatar fallback="AZ" alt="Azul" size="lg" />
        <atom-avatar fallback="AZ" alt="Azul" size="xl" />
      </div>
    `,
  }),
};

/**
 * Airlines side by side
 */
export const Airlines: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <atom-avatar
            fallback="AZ"
            alt="Azul Airlines"
            size="lg"
            style="background-color: #0033A0; color: white;"
          />
          <div>
            <div style="font-weight: 600;">Azul Airlines</div>
            <div style="font-size: 14px; color: #64748B;">AZ</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <atom-avatar
            fallback="GL"
            alt="Gol Airlines"
            size="lg"
            style="background-color: #FF6600; color: white;"
          />
          <div>
            <div style="font-weight: 600;">Gol Airlines</div>
            <div style="font-size: 14px; color: #64748B;">GL</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <atom-avatar
            fallback="LA"
            alt="Latam Airlines"
            size="lg"
            style="background-color: #E31837; color: white;"
          />
          <div>
            <div style="font-weight: 600;">Latam Airlines</div>
            <div style="font-size: 14px; color: #64748B;">LA</div>
          </div>
        </div>
      </div>
    `,
  }),
};
