import { Component, Inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FieldConfig } from '../../shared/dynamic-forms/interfaces/dynamic-field.interface';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    AsyncPipe
  ],
  providers: [provideNativeDateAdapter()], // Para el datepicker
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  fields: FieldConfig[] = [];
  title: string = 'Formulario';

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<DynamicFormComponent>,
    // Inyectamos la data: { title: string, fields: FieldConfig[], data?: any }
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fields = data.fields;
    this.title = data.title || 'Formulario';
  }

  ngOnInit(): void {
    this.createForm();
    // Si hay datos iniciales (modo Edición), los aplicamos
    if (this.data.initialData) {
      this.form.patchValue(this.data.initialData);
    }
  }

  createForm() {
    const group: any = {};
    
    this.fields.forEach(field => {
      // El control se inicializa con el valor por defecto o vacío, y sus validadores
      group[field.name] = [field.value || '', field.validations || []];
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      // Cerramos el modal y devolvemos el valor del formulario
      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched(); // Muestra los errores si el usuario intenta guardar sin validar
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}