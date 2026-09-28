import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { AlertMessageMolecule } from './alert-message.molecule';

const meta: Meta<AlertMessageMolecule> = {
  title: 'Design System/Molecules/AlertMessage',
  component: AlertMessageMolecule,
  tags: ['autodocs'],
  args: { dismiss: fn() },
};

export default meta;
type Story = StoryObj<AlertMessageMolecule>;

export const Info: Story = {
  args: { type: 'info', message: 'Informação importante' },
};

export const Success: Story = {
  args: { type: 'success', message: 'Operation completed successfully!' },
};

export const Warning: Story = {
  args: { type: 'warning', message: 'Atenção: Verifique os dados' },
};

export const Error: Story = {
  args: { type: 'error', message: 'Erro ao processar solicitação' },
};

export const Dismissible: Story = {
  args: { type: 'info', message: 'Esta mensagem pode ser fechada', dismissible: true },
};
