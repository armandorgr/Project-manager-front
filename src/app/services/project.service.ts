import { Injectable } from '@angular/core';
import { BaseService } from '../shared/api/service/api.base.service';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../model';
import { Project } from '../model/projects/project.interface';
import { catchError } from 'rxjs';
import { ApiCall } from '../model/api.types';
import { SendInvitation } from '../model/projects/invitation.interface';
import { Member } from '../model/projects/member.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  getAllProjects(): ApiCall<Project[]> {
    return this.httpClient
      .request<ApiResponse<Project[]>>('get', '/project', {
        headers: new HttpHeaders(),
        context: new HttpContext(),
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }
  getAllMembers(id: string): ApiCall<Member[]> {
    return this.httpClient
      .request<ApiResponse<Member[]>>('get', `/project/${id}/members`, {
        headers: new HttpHeaders(),
        context: new HttpContext(),
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }
  getProjectById(id: string): ApiCall<Project> {
    return this.httpClient
      .request<ApiResponse<Project>>('get', `/project/${id}`, {
        headers: new HttpHeaders(),
        context: new HttpContext(),
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  createProject(project: Project): ApiCall<Project> {
    console.log(project);
    return this.httpClient
      .request<ApiResponse<Project>>('post', `/project`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
        body: project,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  update(project: Project, id: string): ApiCall<Project> {
    return this.httpClient
      .request<ApiResponse<Project>>('patch', `/project/${id}`, {
        headers: new HttpHeaders(),
        context: new HttpContext(),
        withCredentials: true,
        body: project,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  delete(id: string): ApiCall<null> {
    return this.httpClient
      .request<ApiResponse<null>>('delete', `/project/${id}`, {
        headers: new HttpHeaders(),
        context: new HttpContext(),
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  kickMember(id: string, memberId: string): ApiCall<null> {
    return this.httpClient
      .request<ApiResponse<null>>(
        'delete',
        `/project/${id}/members/${memberId}`,
        {
          headers: new HttpHeaders(),
          context: new HttpContext(),
          withCredentials: true,
          observe: 'response',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  join(id: string, response: string): ApiCall<null> {
    return this.httpClient
      .request<ApiResponse<null>>(
        'post',
        `/project/${id}/join?invitationResponse=${response}`,
        {
          headers: new HttpHeaders(),
          context: new HttpContext(),
          withCredentials: true,
          observe: 'response',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }
  invite(id: string, query: Partial<SendInvitation>): ApiCall<null> {
    return this.httpClient
      .request<ApiResponse<null>>('post', `/project/${id}/invite`, {
        headers: new HttpHeaders(),
        context: new HttpContext(),
        withCredentials: true,
        body: query,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }
}
