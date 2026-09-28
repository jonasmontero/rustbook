import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarAtom } from './avatar.atom';

const meta: Meta<AvatarAtom> = {
  title: 'Design System/Atoms/Avatar',
  component: AvatarAtom,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL da imagem',
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do avatar',
    },
    fallback: {
      control: 'text',
      description: 'Texto fallback (iniciais)',
    },
    bgColor: {
      control: 'color',
      description: 'Cor de fundo do fallback',
    },
  },
};

export default meta;
type Story = StoryObj<AvatarAtom>;

/**
 * Avatar com imagem (exemplo placeholder)
 */
export const WithImage: Story = {
  args: {
    src: 'https://via.placeholder.com/100/0033A0/FFFFFF?text=AZ',
    alt: 'Azul Linhas Aéreas',
    size: 'md',
  },
};

/**
 * Avatar com fallback (iniciais)
 */
export const WithFallback: Story = {
  args: {
    fallback: 'AZ',
    alt: 'Azul',
    size: 'md',
  },
};

/**
 * Avatar pequeno
 */
export const Small: Story = {
  args: {
    fallback: 'GL',
    alt: 'Gol',
    size: 'sm',
  },
};

/**
 * Avatar médio
 */
export const Medium: Story = {
  args: {
    fallback: 'LA',
    alt: 'Latam',
    size: 'md',
  },
};

/**
 * Avatar grande
 */
export const Large: Story = {
  args: {
    fallback: 'AZ',
    alt: 'Azul',
    size: 'lg',
  },
};

/**
 * Avatar extra grande
 */
export const ExtraLarge: Story = {
  args: {
    fallback: 'GL',
    alt: 'Gol',
    size: 'xl',
  },
};

/**
 * Avatar Azul (companhia aérea)
 */
export const Azul: Story = {
  args: {
    fallback: 'AZ',
    alt: 'Azul Linhas Aéreas',
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <atom-avatar
        fallback="AZ"
        alt="Azul Linhas Aéreas"
        [size]="size"
        style="background-color: #0033A0; color: white;"
      />
    `,
  }),
};

/**
 * Avatar Gol (companhia aérea)
 */
export const Gol: Story = {
  args: {
    fallback: 'GL',
    alt: 'Gol Linhas Aéreas',
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <atom-avatar
        fallback="GL"
        alt="Gol Linhas Aéreas"
        [size]="size"
        style="background-color: #FF6600; color: white;"
      />
    `,
  }),
};

/**
 * Avatar Latam (companhia aérea)
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
 * Avatar com imagem quebrada (mostra fallback)
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
 * Avatar gerando iniciais automaticamente
 */
export const AutoInitials: Story = {
  args: {
    alt: 'Azul Linhas',
    size: 'md',
  },
};

/**
 * Todos os tamanhos
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
 * Companhias aéreas lado a lado
 */
export const Airlines: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <atom-avatar
            fallback="AZ"
            alt="Azul Linhas Aéreas"
            size="lg"
            style="background-color: #0033A0; color: white;"
          />
          <div>
            <div style="font-weight: 600;">Azul Linhas Aéreas</div>
            <div style="font-size: 14px; color: #64748B;">AZ</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <atom-avatar
            fallback="GL"
            alt="Gol Linhas Aéreas"
            size="lg"
            style="background-color: #FF6600; color: white;"
          />
          <div>
            <div style="font-weight: 600;">Gol Linhas Aéreas</div>
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
