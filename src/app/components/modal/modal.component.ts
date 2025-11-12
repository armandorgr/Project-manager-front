import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

export interface ModalDialogData {
  icon: string; // Nombre del icono de Material (e.g. "check", "error", "info")
  iconClass?: string; // Clase CSS adicional (e.g. "success", "error")
  message: string; // Texto o HTML
  actions: {
    label: string; // Texto del botón
    color?: string; // Color Angular Material (primary, accent, warn)
    action: 'close' | 'custom'; // Qué hace (cerrar o emitir evento)
    value?: any; // Valor opcional que se devuelve si es custom
  }[];
}

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  standalone:true
})
export class ModalDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalDialogData
  ) {}

  onAction(action: any) {
    if (action.action === 'close') {
      this.dialogRef.close();
    } else {
      this.dialogRef.close(action.value);
    }
  }
}
