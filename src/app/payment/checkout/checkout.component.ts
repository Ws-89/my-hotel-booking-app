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

  async pay(): Promise<void> {
    const payment = {
      name: 'Hotel room',
      currency: 'usd',
      amount: 99900,
      quantity: 1,
      cancelUrl: 'http://localhost:4200/payment-canceled',
      successUrl: 'http://localhost:4200/payment-success',
    }

    // const payment = {
    //   cancelUrl: 'http://localhost:4200/payment-canceled',
    //   successUrl: 'http://localhost:4200/payment-success',
    //   line_items: [
    //     {amount: 1, quantity: 1},
    //     {amount: 2, quantity: 2}
    //   ]
    // }

    const stripe = await this.stripePromise;

    this.httpClient
      .post(`${environment.serverUrl}/payment`, payment)
      .subscribe((data: any) => {
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }

  ngOnInit(): void {
  }

}
