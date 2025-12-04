import { Component, inject, OnInit, signal } from '@angular/core';
import { InvitationService } from '../../../services/invitation.service';
import { InvitationCardComponent } from '../../invitation-card/invitation-card.component';
import { Invitation } from '../../../model/projects/invitation.interface';
import { ProjectService } from '../../../services/project.service';
import { DialogService } from '../../../shared/service/dialog.service';
import { ApiResponseError, ApiResponseSuccess } from '../../../model/api.types';

@Component({
  selector: 'app-invitations-page',
  standalone: true,
  imports: [InvitationCardComponent],
  templateUrl: './invitations-page.component.html',
  styleUrl: './invitations-page.component.scss',
})
export class InvitationsPageComponent implements OnInit {
  private readonly invitationService = inject(InvitationService);
  private readonly projectService = inject(ProjectService);
  private readonly DialogService = inject(DialogService);
  invitations = signal<Invitation[]>([]);

  ngOnInit(): void {
    this.invitationService.getAllInvitations().subscribe((invitations) => {
      if (invitations.ok && invitations.body?.data) {
        this.invitations.set(invitations.body.data);
      }
    });
  }

  private handleResponse(
    response: ApiResponseError | ApiResponseSuccess<null>,
    projectId: string
  ) {
    console.log(response);
    
    if (response.ok) {
      this.invitations.update((invitations) => {
        return invitations.filter((i) => i.projectId !== projectId);
      });
    }
  }

  onAccept(invitation: Invitation) {
    this.projectService
      .join(invitation.projectId, 'ACCEPT')
      .subscribe((response) => {
        this.DialogService.openResponseDialog(
          response,
          response.ok
            ? 'Invitation accepted'
            : 'Error trying to accept invitation'
        ).subscribe(() => {
          this.handleResponse(response, invitation.projectId);
        });
      });
  }
  onReject(invitation: Invitation) {
    this.projectService
      .join(invitation.projectId, 'DECLINE')
      .subscribe((response) => {
        this.handleResponse(response, invitation.projectId);
      });
  }
}
