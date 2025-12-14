import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { backendApi } from '../backendApi.js';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiUrl: string = backendApi;

  constructor(private httpClient: HttpClient) { }

  //Adding feedback
  sendFeedBack(feedback: Feedback): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/api/feedback', feedback)
  }

  //get all feedbacks for particular user by userId
  getAllFeedbackByUserId(userId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/api/feedback/user/' + userId) as Observable<Feedback[]>
  }

  //delete a particular feedback using feedbackId
  deleteFeedback(feedbackId: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/api/feedback/' + feedbackId)
  }

  //getting all feedback from backend
  getFeedbacks(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/api/feedback') as Observable<Feedback[]>
  }

  //update feedback
  updateFeedback(feedbackId: number, feedback: Feedback): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/api/feedback/' + feedbackId, feedback);
  }

  //Getting the user by userId
  findUserByUserId(userId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/api/feedback/' + userId);
  }

  //getting all feedbacks for homepage
  getAllFeedBackForHomePage(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/home/feedback")
  }
}
