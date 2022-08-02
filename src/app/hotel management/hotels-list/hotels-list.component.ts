import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';
import { HotelsService } from '../../_services/hotels.service';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {

  hotels = new Array<HotelInterface>();
  retrievedImages = new Map<number, any>();
  base64Data: any;
  retrieveResonse: any;
 
  constructor(private hotelService: HotelsService, private router: Router) { }

  ngOnInit(): void {
    this.getHotels();
  }

  private getHotels(){
    this.hotelService.getHotelList().subscribe(data => {
      console.log(data)
      this.hotels = data;
    })
  }

  hotelDetails(id: number){
    this.hotelService.getHotelById(id).then(data => {
      this.router.navigate(['hotel-details', id]);
    })
  }

}
