import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from '../../../environments/environment';
import { LoginService } from '../auth/login.service';
import { UserInfo } from '../../models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private loginService:LoginService) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.urlApi+"user/"+id).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(userRequest:User):Observable<any>
  {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.userToken}`,
    });
    let user: UserInfo;
    this.loginService.user.subscribe(data=>{
      user=data;
    }); 
     let response= this.http.put(environment.urlApi+"user", userRequest, {headers});
      response.subscribe(data=>{
        user.firstName=userRequest.firstname;
        user.lastName=userRequest.lastname;
        user.userName=userRequest.username;
        this.loginService.currentUser.next(user);
        sessionStorage.setItem('user', JSON.stringify(user));
      });
     return response;
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
