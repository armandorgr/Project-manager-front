import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Comment } from '../../model/comments/comment.interface';
import { DialogService } from '../../shared/service/dialog.service';
import { FieldConfig } from '../../shared/dynamic-forms/interfaces/dynamic-field.interface';
import { Validators } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent {
  private readonly dialogService = inject(DialogService);
  commentFormConfig: FieldConfig[] = [
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      validations: [Validators.required, Validators.minLength(10)],
    },
  ];
  @Input({ required: true }) currentUserId!: string;
  @Input({ required: true }) comment!: Comment;
  @Output() edit = new EventEmitter<Comment>();
  @Output() delete = new EventEmitter<string>();

  // Getter para la inicial del avatar
  get userInitial(): string {
    return this.comment.user.username.charAt(0).toUpperCase();
  }

  onEdit(): void {
    this.dialogService
      .openFormDialog(this.commentFormConfig, 'Update comment', this.comment)
      .pipe(filter((result) => result))
      .subscribe((result) => {
        this.edit.emit({ ...this.comment, ...result });
      });
  }

  onDelete(): void {
    this.dialogService
      .openConfirrmDialog('Are you sure you want to delete this comment?')
      .pipe(filter((result) => result))
      .subscribe(() => {
        this.delete.emit(this.comment.id);
      });
  }
}
