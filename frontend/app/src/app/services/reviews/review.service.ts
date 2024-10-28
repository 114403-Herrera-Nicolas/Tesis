import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { ReviewRequest } from '../../models/ReviewRequest';
import { ReviewResponse } from '../../models/ReviewResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient,private loginService:LoginService) {
    
  }

  createReview(reviewRequest:ReviewRequest):Observable<ReviewResponse>{
    return this.http.post<ReviewResponse>("http://localhost:8080/api/v1/reviews",reviewRequest)
  }

  getReviewsByCabinId(cabinId:string):Observable<ReviewResponse[]>{
    return this.http.get<ReviewResponse[]>("http://localhost:8080/api/v1/reviews/cabin/"+cabinId)
  }
}
