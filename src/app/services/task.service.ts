import { Injectable } from '@angular/core';
import { BaseService } from '../shared/api/service/api.base.service';
import { ApiCall } from '../model/api.types';
import { Task } from '../model/tasks/task.interface';
import { ApiResponse } from '../model';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  getAllTaskByProject(projectId: string): ApiCall<Task[]> {
    return this.httpClient
      .request<ApiResponse<Task[]>>('get', `/project/${projectId}/tasks`, {
        headers: new HttpHeaders(),
        context: new HttpContext(),
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  getAllAssignedTasks(): ApiCall<Task[]> {
    return this.httpClient
      .request<ApiResponse<Task[]>>('get', `/tasks/assigned`, {
        headers: new HttpHeaders(),
        context: new HttpContext(),
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  getById(projectId: string, taskId: string): ApiCall<Task> {
    return this.httpClient
      .request<ApiResponse<Task>>(
        'get',
        `/project/${projectId}/tasks/${taskId}`,
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

  create(task: Task, projectId: string): ApiCall<Task> {
    return this.httpClient
      .request<ApiResponse<Task>>('post', `/project/${projectId}/tasks`, {
        headers: new HttpHeaders(),
        context: new HttpContext(),
        body: task,
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  update(task: Task, projectId: string, taskId: string): ApiCall<Task> {
    return this.httpClient
      .request<ApiResponse<Task>>(
        'patch',
        `/project/${projectId}/tasks/${taskId}`,
        {
          headers: new HttpHeaders(),
          context: new HttpContext(),
          body: task,
          withCredentials: true,
          observe: 'response',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  delete(projectId: string, taskId: string): ApiCall<null> {
    return this.httpClient
      .request<ApiResponse<null>>(
        'delete',
        `/project/${projectId}/tasks/${taskId}`,
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
