import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export type FieldType = 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea' | 'date';

export interface FieldOption {
  label: string;
  value: any;
}

export interface FieldConfig {
  name: string;           // Nombre del control (key en el JSON final)
  label: string;          // Etiqueta visible
  type: FieldType;        // Tipo de input
  value?: any;            // Valor inicial (para ediciones)
  options?: FieldOption[];// Solo para selects
  validations?: ValidatorFn[]; // Validadores de Angular (Required, Email, etc.)
  asyncOptions?: Observable<FieldOption[]|undefined>;
}