import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ILesson } from '../../interfaces/lesson.interface';

@Injectable({
   providedIn: 'root'
})
export class AcademyService {
   constructor(private _httpClient: HttpClient) {
   }

   createLesson(payload: FormData) {
      return this._httpClient.post(environment.host + 'create-lesson', payload);
   }

   updateLesson(payload: FormData) {
      return this._httpClient.post(environment.host + 'update-lesson', payload);
   }

   getLessons(searchParams = {}): Observable<{ ok: boolean; count: number; lessons: ILesson[] }> {
      return this._httpClient.post<{ ok: boolean; count: number; lessons: ILesson[] }>(environment.host + 'get-lessons', searchParams)
   }

   deleteLesson(id: string): Observable<{ ok: boolean; message: string }> {
      return this._httpClient.post<{ ok: boolean; message: string }>(environment.host + 'delete-lesson', { id })
   }

   incrementViewsCount(id: string) {
      this._httpClient.post(environment.host + 'increment-views-count', { id }).subscribe()
   }
}
