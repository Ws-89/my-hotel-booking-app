import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  stripePromise = loadStripe(environment.stripe);
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  async pay(): Promise<void> {
    const payment = {
      name: 'Hotel room',
      currency: 'usd',
      amount: 99900,
      quantity: 1,
    }
    
    const stripe = await this.stripePromise;

    this.httpClient
      .post(`${environment.serverUrl}/payment`, payment)
      .subscribe((data: any) => {
        this.redirectToCheckout(data)    
      });
  }

  async redirectToCheckout(sessionId: any) {
    const stripe = await this.stripePromise;
    stripe.redirectToCheckout({
      sessionId: sessionId.id,
    });
  }
  

}
