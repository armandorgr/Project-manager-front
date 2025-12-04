import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponseError, ApiResponseSuccess } from '../../model/api.types';
import {
    DialogAction,
  ModalDialogComponent,
  ModalDialogData,
} from '../../components/modal/modal.component';
import { FieldConfig } from '../dynamic-forms/interfaces/dynamic-field.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  openResponseDialog<T>(
    response: ApiResponseError | ApiResponseSuccess<T>,
    message: string,
    ...customActions:DialogAction[]
  ) {
    const isOk = response.ok;
    const data: ModalDialogData = {
      icon: isOk ? 'check' : 'error',
      iconClass: isOk ? 'success' : 'error',
      message: message,
      actions: [
        {
          label: 'Close',
          action: 'close',
        },
        ...customActions,
      ],
    };
    const dialogRef = this.dialog.open(ModalDialogComponent, { data });
    return dialogRef.afterClosed();
  }

  openConfirrmDialog(message: string, ...customActions:DialogAction[]) {
    const data: ModalDialogData = {
      icon: 'question',
      iconClass: 'neutral',
      message: message,
      actions: [
        {
          label: 'Cancel',
          action: 'close',
        },
        {
          label: 'Confirm',
          action: 'custom',
          value: true,
        },
        ...customActions,
      ],
    };
    const dialogRef = this.dialog.open(ModalDialogComponent, { data });
    return dialogRef.afterClosed();
  }

  openFormDialog(fields: FieldConfig[], title: string, initialData?: any) {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      data: { title, fields , initialData},
    });
    return dialogRef.afterClosed();
  }
}
