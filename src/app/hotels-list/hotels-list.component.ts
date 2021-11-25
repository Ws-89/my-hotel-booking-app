import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../hotel';
import { HotelsService } from '../_services/hotels.service';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {

  hotels: Hotel[];

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

  updateHotel(id: number){
    this.router.navigate(['update-hotel', id]);
  }

  deleteHotel(id: number){
    this.hotelService.deleteHotel(id).subscribe(data => {
      this.getHotels();
    })
  }

  hotelDetails(id: number){
    this.hotelService.getHotelById(id).subscribe(data => {
      this.router.navigate(['hotel-details', id]);
    })
  }

  showRoomList(id: number){
    this.router.navigate(['rooms', id]);
  }
}
