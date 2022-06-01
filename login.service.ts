import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http: HttpClient, private router: Router) { }

  postEmploy(data: any) {
    return this.http.post<any>('http://localhost:5000/posts', data).pipe(map((res => {
      return res;
    })))

  }

  getEmploy() {
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res: any) => {
      return res;
    }))
  }

  // use slash button(/) before the data is adding //
  updateEmploy(id: number, data: any) {
    return this.http.put<any>("http://localhost:3000/posts/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  deleteEmploy(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res: any) => {
      return res;
    }))
  }

}