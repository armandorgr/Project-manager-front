import { Validators } from '@angular/forms';
import { FieldConfig } from '../../dynamic-forms/interfaces/dynamic-field.interface';

export const projectFormConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Project name',
    type: 'text',
    validations: [Validators.required, Validators.minLength(3)],
  },
  {
    name: 'description',
    label: 'Project description',
    type: 'textarea',
    validations: [Validators.required, Validators.minLength(10)],
  },
  {
    name: 'startDate',
    label: 'Start date',
    type: 'date',
    validations: [Validators.required],
  },
  {
    name: 'endDate',
    label: 'End date',
    type: 'date',
    validations: [Validators.required],
  },
];
