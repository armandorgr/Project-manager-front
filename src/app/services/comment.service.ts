import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../shared/api/service/api.base.service';
import { ApiCall } from '../model/api.types';
import { Comment } from '../model/comments/comment.interface';
import { ApiResponse } from '../model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends BaseService {
  private readonly httpClient = inject(HttpClient);

  getTaskComments(projectId: string, taskId: string): ApiCall<Comment[]> {
    return this.httpClient
      .request<ApiResponse<Comment[]>>(
        'get',
        `/project/${projectId}/tasks/${taskId}/comments`,
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
  create(
    projectId: string,
    taskId: string,
    comment: Comment
  ): ApiCall<Comment> {
    return this.httpClient
      .request<ApiResponse<Comment>>(
        'post',
        `/project/${projectId}/tasks/${taskId}/comments`,
        {
          headers: new HttpHeaders(),
          context: new HttpContext(),
          body: comment,
          withCredentials: true,
          observe: 'response',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  update(
    projectId: string,
    taskId: string,
    comment: Comment
  ): ApiCall<Comment> {
    return this.httpClient
      .request<ApiResponse<Comment>>(
        'patch',
        `/project/${projectId}/tasks/${taskId}/comments/${comment.id}`,
        {
          headers: new HttpHeaders(),
          context: new HttpContext(),
          body: comment,
          withCredentials: true,
          observe: 'response',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  delete(
    projectId: string,
    taskId: string,
    commentId: string
  ): ApiCall<Comment> {
    return this.httpClient
      .request<ApiResponse<Comment>>(
        'delete',
        `/project/${projectId}/tasks/${taskId}/comments/${commentId}`,
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
}
