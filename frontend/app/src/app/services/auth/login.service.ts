import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import  {  Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { User } from './user';
import { environment } from '../../../environments/environment';
import { RegisterRequest } from '../../models/RegisterRequest';
import { UserInfo } from '../../models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");
  currentUser: BehaviorSubject<UserInfo> =new BehaviorSubject<UserInfo>({} as UserInfo);
  currentUserRol:BehaviorSubject<String> =new BehaviorSubject<String>("");
  currentUserName:BehaviorSubject<String> =new BehaviorSubject<String>("");
  constructor(private http: HttpClient) {
    this.loadUserFromSessionStorage()
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    this.currentUserRol=new BehaviorSubject<String>(sessionStorage.getItem("role") || "");
    this.currentUserName=new BehaviorSubject<String>(sessionStorage.getItem("username") || "");
  }
  loadUserFromSessionStorage() {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      const user: UserInfo = JSON.parse(userJson);
      this.currentUser.next(user);  // Actualiza el BehaviorSubject
    }
  }

  // Método para guardar el usuario en sessionStorage
  saveUserToSessionStorage(user: UserInfo) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);  // Actualiza el BehaviorSubject
  }
  clearUser() {
    sessionStorage.removeItem('user');  // Eliminar del sessionStorage
    this.currentUser.next({} as UserInfo);  // Resetear el BehaviorSubject
  }
  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/login",credentials).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);
        sessionStorage.setItem("username", credentials.username);
        sessionStorage.setItem("role", userData.role);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        this.currentUserRol.next(userData.role);
        this.currentUserName.next(credentials.username);
        this.saveUserToSessionStorage(userData);
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  }
  register(credentials:RegisterRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/register",credentials).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);
        sessionStorage.setItem("username", credentials.username);
        sessionStorage.setItem("role", userData.role);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        this.currentUserRol.next(userData.role);
        this.currentUserName.next(credentials.username);
        this.saveUserToSessionStorage(userData);
        
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  }

  logout():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
    
    this.currentUserLoginOn.next(false);
    this.currentUserRol.next("");
    this.currentUserData.next("");
    this.currentUserName.next("");
    this.clearUser();
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }
  get user():Observable<UserInfo>{
    return this.currentUser.asObservable();
  }
  get userRol():Observable<String>{
    return this.currentUserRol.asObservable();
  }
  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }

}
