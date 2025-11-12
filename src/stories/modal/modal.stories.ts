import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ModalDialogComponent, ModalDialogData } from '../../components/modal/modal.component';

@Component({
  selector: 'app-modal-host',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <button mat-raised-button color="primary" (click)="openModal()">Abrir modal</button>
  `,
})
class ModalHostComponent {
  constructor(private readonly dialog: MatDialog) {}

  openModal() {
    const data: ModalDialogData = {
      icon: "error",
      iconClass: 'error',
      message: '¡Modal de prueba desde Storybook!',
      actions: [
        { label: 'Aceptar', color: 'primary', action: 'close' },
        { label: 'Ver más', color: 'accent', action: 'custom', value: 'extra' },
      ],
    };
    this.dialog.open(ModalDialogComponent, { data });
  }
}

const meta: Meta<ModalHostComponent> = {
  title: 'Shared/ModalDialog',
  component: ModalHostComponent,
  decorators: [
    moduleMetadata({
      imports: [ModalDialogComponent, MatDialogModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ModalHostComponent>;

export const Default: Story = {};

export const InlinePreview: StoryObj<ModalDialogComponent> = {
  render: (args) => ({
    component: ModalDialogComponent,
    props: args,
  }),
  args: {
    data: {
      icon: 'error',
      iconClass: 'error',
      message: 'Esto es un modal renderizado inline.',
      actions: [{ label: 'Cerrar', action: 'close' }],
    },
  },
};
