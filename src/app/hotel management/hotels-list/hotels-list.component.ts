import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';
import { Hotel } from '../../models/hotel';
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
        this.hotels = data;    
        console.log(this.hotels)
    });
  }

  hotelDetails(id: number){
    this.hotelService.getHotelById(id).subscribe(data => {
      this.router.navigate(['hotel-details', id]);
    })
  }

}
