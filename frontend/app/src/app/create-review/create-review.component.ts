import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { UserInfo } from '../models/UserInfo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../services/reviews/review.service';
import { ReviewRequest } from '../models/ReviewRequest';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {

reviewRequest:ReviewRequest={
  userId: 0,
  cabinId: 0,
  rating: 0,
  comment: ''
}
  @Input() cabinId:number;
  @Output() ratingSubmitted = new EventEmitter<boolean>();
  user: UserInfo;
  rating:number=0;
  comment:string="";
  constructor(private loginService : LoginService,private reviewService:ReviewService) { }
  ngOnInit(): void {
    this.loginService.user.subscribe(data=>{
      this.user=data;
    })
  }

  submitReview() {
    if (!this.comment.trim()) {
      alert('El comentario es requerido.');
      return;
    }
    this.reviewRequest={
      cabinId: this.cabinId,
      comment: this.comment,
      rating: this.rating,
      userId:this.user.userId
    }
    console.log(this.reviewRequest);
    this.reviewService.createReview(this.reviewRequest).subscribe(data => {
      this.comment="";
      this.rating=0;
      this.ratingSubmitted.emit(true);
    });
  }
}
