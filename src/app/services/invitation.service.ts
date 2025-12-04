import { inject, Injectable } from '@angular/core';
import { BaseService } from '../shared/api/service/api.base.service';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { ApiCall } from '../model/api.types';
import { ApiResponse } from '../model';
import { catchError } from 'rxjs';
import { Invitation } from '../model/projects/invitation.interface';

@Injectable({
  providedIn: 'root'
})
export class InvitationService extends BaseService {
  private readonly httpClient = inject(HttpClient);

    getAllInvitations(): ApiCall<Invitation[]> {
      return this.httpClient
        .request<ApiResponse<Invitation[]>>('get', `/invitations`, {
          headers: new HttpHeaders(),
          context: new HttpContext(),
          withCredentials: true,
          observe: 'response',
          responseType: 'json',
        })
        .pipe(catchError(this.handleErrors<ApiResponse<null>>));
    }
}
