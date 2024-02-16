import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class TeacherAPIService {
  URL: string = environment.apiBaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  //OnLogin - Validate Teacher Password
  validatePassword(checkPass:any): Observable<any> {
    let url = `${this.URL}/teacherAuth/${checkPass}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  //Add New Student & Progress Results
  addStudentScore(data): Observable<any> {
    let url = `${this.URL}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  //Get All Student Results
  getResults() {
    return this.http.get(`${this.URL}`);
  }

  //Get Student Details
  getStudent(id): Observable<any> {
    let url = `${this.URL}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  //Update Student Details
  updateStudent(id, data): Observable<any> {
    let url = `${this.URL}/update/${id}`;
    return this.http
    .put(url, data, { headers:this.headers })
    .pipe(catchError(this.errorMgmt));
  }

  // Delete Student Details
  deleteStudent(id): Observable<any> {
    let url = `${this.URL}/delete/${id}`;
    return this.http
    .delete(url, { headers: this.headers })
    .pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
