import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ReservationRequest } from '../../models/ReservationRequest';
import { LoginService } from '../auth/login.service';
import { ReservationDto } from '../../models/ReservationDto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient,private loginService:LoginService) {
    
   }


   public createReservation(request: ReservationRequest): Observable<any> {
    // Verificar si el usuario está autenticado
    if (!this.loginService.userToken) {
      console.log("Usuario no validado");
      return throwError('Usuario no validado'); // Puedes lanzar un error si el usuario no está autenticado
    }
  
    // Configurar las cabeceras para la solicitud
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.userToken}`, // Incluir el token en las cabeceras
    });
  
    console.log(request); // Mostrar la solicitud en la consola para depuración
    console.log(headers);
    // Realizar la solicitud POST al backend
    return this.http.post<any>('http://localhost:8080/api/v1/reservation', request, { headers });
  }
  
  public getReservationsByUserid(userId:number): Observable<ReservationDto[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.userToken}`, // Incluir el token en las cabeceras
    });
    return this.http.get<ReservationDto[]>('http://localhost:8080/api/v1/reservation/'+userId,{ headers });
  }
}
