import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
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
    
    // const stripe = await this.stripePromise;

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
