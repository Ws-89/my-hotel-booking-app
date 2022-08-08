import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { ReservationArrangement } from '../models/reservationArrangement';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  stripePromise = loadStripe(environment.stripe);
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  async pay(reservationArragnement: ReservationArrangement): Promise<void> {
    const stripe = await this.stripePromise;

    this.httpClient
      .post(`${environment.serverUrl}/payment`, reservationArragnement)
      .subscribe((data: any) => {
        this.redirectToCheckout(data)    
      });
  }

  async redirectToCheckout(sessionId: any) {
    const stripe = await this.stripePromise;
    stripe.redirectToCheckout({
      sessionId: sessionId.id,
    });
    this.getEvent(sessionId.id)
  }
  
  getEvent(id: string){
    this.httpClient.get(`${environment.serverUrl}/${id}`).subscribe(data => {
      console.log(data)
    })
  }
// async pay(reservationArragnement: ReservationArrangement): Promise<void> {
  
  
//   const stripe = await this.stripePromise;

//   this.httpClient
//     .post(`${environment.serverUrl}/payment`, reservationArragnement)
//     .subscribe((data: any) => {
//       stripe.redirectToCheckout({
//         sessionId: data.id,
//       });
//     });
// }

}
