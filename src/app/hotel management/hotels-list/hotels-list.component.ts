import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel';
import { HotelsService } from '../../_services/hotels.service';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {

  hotels = new Array<Hotel>();
  retrievedImages = new Map<number, any>();
  base64Data: any;
  retrieveResonse: any;
 
  constructor(private hotelService: HotelsService, private router: Router) { }

  ngOnInit(): void {
    this.getHotels();
  }

  private getHotels(){
    this.hotelService.getHotelList().subscribe(data => {
      for(var x of data){
        this.hotels.push(x);
      }
      
    });
  }

  hotelDetails(id: number){
    this.hotelService.getHotelById(id).subscribe(data => {
      this.router.navigate(['hotel-details', id]);
    })
  }

}
