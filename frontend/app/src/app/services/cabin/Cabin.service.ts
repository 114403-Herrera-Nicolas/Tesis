import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cabin } from '../../models/Cabin';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class CabinService {
  private selectedCabin:Cabin;
 
  private name?: string;
  private location?: string;
  private minPrice?: number=0;
  private maxPrice?: number;
  private capacity?: number;
  private featureIds?: number[];

  selectedcabin(cabin: Cabin) {
    this.selectedCabin=cabin;
   }
   getSelectedCabin():Cabin{
    return this.selectedCabin;
   }
  // Almacenar y observar la lista de cabañas
  private cabinsSubject: BehaviorSubject<Cabin[]> = new BehaviorSubject<Cabin[]>([]);
  public cabins$: Observable<Cabin[]> = this.cabinsSubject.asObservable(); // Exponer como Observable

  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Métodos para actualizar los parámetros de búsqueda
  setName(name: string) {
    this.name = name;
  }

  setLocation(location: string) {
    this.location = location;
  }

  setPriceRange(minPrice?: number, maxPrice?: number) {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }

  setCapacity(capacity: number) {
    this.capacity = capacity;
  }

  setFeaturesId(featureIds: number[]) {
    this.featureIds = featureIds;
    console.log(this.featureIds);
  }

  // Método para realizar la búsqueda de cabañas
  searchCabins(): Observable<Cabin[]> {
    let params = new HttpParams();

    // Añadir parámetros solo si existen
    if (this.name) {
      params = params.set('name', this.name);
    }
    if (this.location) {
      params = params.set('location', this.location);
    }
    
      params = params.set('minPrice', 1);
    
    if (this.maxPrice) {
      params = params.set('maxPrice', this.maxPrice);
    }
    if (this.capacity) {
      params = params.set('capacity', this.capacity.toString());
    }
    if (this.featureIds && this.featureIds.length) {
      params = params.set('featureIds', this.featureIds.join(','));
    }

    // Realizar la solicitud GET y actualizar el BehaviorSubject con la respuesta
    return this.http.get<Cabin[]>(`${environment.urlApi}cabin/search`, { params })
      .pipe(
        tap(cabins => this.cabinsSubject.next(cabins)), // Actualizar el BehaviorSubject
        catchError(this.handleError) // Manejar errores
      );
  }
  getCabinById(id: string): Observable<Cabin> {
    return this.http.get<Cabin>(`${environment.urlApi}cabin/${id}`);
  }

  // Obtener las cabañas almacenadas actualmente
  getCabins(): Observable<Cabin[]> {
    return this.cabins$;
  }
  createCabin(formData: FormData, cabinDetails: any): Promise<any> {
    // Verificar el token
    if (!this.loginService.userToken) {
      return Promise.reject('User is not authenticated. Please log in.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.userToken}`,
    });

    const name = encodeURIComponent(cabinDetails.name);
    const description = encodeURIComponent(cabinDetails.description);
    const location = encodeURIComponent(cabinDetails.location);
    const pricePerNight = cabinDetails.pricePerNight;
    const capacity = cabinDetails.capacity;
    const availability = cabinDetails.availability ? 'true' : 'false';
    const featureIds = cabinDetails.featureIds
      .map((id: number) => `featureIds=${id}`)
      .join('&');

    const url = `${environment.urlApi}cabin?name=${name}&description=${description}&location=${location}&pricePerNight=${pricePerNight}&capacity=${capacity}&availability=${availability}&${featureIds}`;

    return this.http.post(url, formData, { headers }).toPromise();
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error(`Backend retornó el código de estado ${error.status}, cuerpo:`, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor, inténtelo de nuevo más tarde.'));
  }
}
