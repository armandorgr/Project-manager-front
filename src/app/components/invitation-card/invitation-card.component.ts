import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Invitation } from '../../model/projects/invitation.interface';

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './invitation-card.component.html',
  styleUrls: ['./invitation-card.component.scss']
})
export class InvitationCardComponent {
  @Input({ required: true }) invitation!: Invitation;

  @Output() accept = new EventEmitter<Invitation>();
  @Output() reject = new EventEmitter<Invitation>();

  onAccept() {
    this.accept.emit(this.invitation);
  }

  onReject() {
    this.reject.emit(this.invitation);
  }
}