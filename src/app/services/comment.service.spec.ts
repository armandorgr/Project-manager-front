import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { CreateCommentDto, CommentResponseDto } from '../model/api.types';
import { Response } from '../model/api.types';

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getComments', () => {
    it('should return an Observable<Response<CommentResponseDto[]>>', () => {
      const projectId = 'proj-123';
      const taskId = 'task-456';
      const dummyComments: Response<CommentResponseDto[]> = { status: 'SUCCESS', data: [] };

      service.getComments(projectId, taskId).subscribe(comments => {
        expect(comments).toEqual(dummyComments);
      });

      const req = httpMock.expectOne(`${service['basePath']}/${projectId}/tasks/${taskId}/comments`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyComments);
    });
  });

  describe('createComment', () => {
    it('should return an Observable<Response<CommentResponseDto>>', () => {
      const projectId = 'proj-123';
      const taskId = 'task-456';
      const newComment: CreateCommentDto = { content: 'Test comment' };
      const dummyResponse: Response<CommentResponseDto> = { status: 'SUCCESS', data: { id: 'comment-789', content: 'Test comment' } };

      service.createComment(projectId, taskId, newComment).subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${service['basePath']}/${projectId}/tasks/${taskId}/comments`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newComment);
      expect(req.request.withCredentials).toBe(true);
      req.flush(dummyResponse);
    });
  });

  describe('updateComment', () => {
    it('should return an Observable<Response<CommentResponseDto>>', () => {
      const projectId = 'proj-123';
      const taskId = 'task-456';
      const commentId = 'comment-789';
      const updatedComment: CreateCommentDto = { content: 'Updated comment' };
      const dummyResponse: Response<CommentResponseDto> = { status: 'SUCCESS', data: { id: commentId, content: 'Updated comment' } };

      service.updateComment(projectId, taskId, commentId, updatedComment).subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${service['basePath']}/${projectId}/tasks/${taskId}/comments/${commentId}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(updatedComment);
      expect(req.request.withCredentials).toBe(true);
      req.flush(dummyResponse);
    });
  });

  describe('deleteComment', () => {
    it('should return an Observable<void>', () => {
      const projectId = 'proj-123';
      const taskId = 'task-456';
      const commentId = 'comment-789';

      service.deleteComment(projectId, taskId, commentId).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${service['basePath']}/${projectId}/tasks/${taskId}/comments/${commentId}`);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.withCredentials).toBe(true);
      req.flush(null, { status: 204, statusText: 'No Content' });
    });
  });
});
