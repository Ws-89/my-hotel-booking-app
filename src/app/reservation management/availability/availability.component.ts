import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { AvailabilityService } from 'src/app/_services/availability.service';
import { HotelsService } from 'src/app/_services/hotels.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  constructor(private route: ActivatedRoute, private availabilityService: AvailabilityService, private router: Router, private hotelService: HotelsService) { }

  id: number;
  searchResult: Availability[];
  roomsOfSpecificHotel: Availability[];


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.availabilityService.shareResult.subscribe(x => this.searchResult = x);
    this.roomsOfSpecificHotel = this.searchResult.filter(x => x.hotel_id == this.id);
    console.log(this.roomsOfSpecificHotel);
  }

  bookThisRoom(availability: Availability){
    
  }



}
