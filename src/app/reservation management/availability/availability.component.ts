import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { AvailabilityRequest } from 'src/app/models/availabilityRequest';
import { AvailabilityService } from 'src/app/_services/availability.service';
import { HotelsService } from 'src/app/_services/hotels.service';
import { ReservationsService } from 'src/app/_services/reservations.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private availabilityService: AvailabilityService, 
              private router: Router, 
              private reservationService: ReservationsService) { }

  id: number;
  searchResult: Availability[];
  roomsOfSpecificHotel: Availability[];
  availabilityRequest: AvailabilityRequest;
  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.availabilityService.shareResult.subscribe(x => this.searchResult = x);
    this.roomsOfSpecificHotel = this.searchResult.filter(x => x.hotel_id == this.id);
    this.reservationService.reservationRequestWithDate.subscribe(x => this.availabilityRequest = x);
  }

  bookThisRoom(availability: Availability){
    availability.from_date = this.availabilityRequest.from_date;
    availability.to_date = this.availabilityRequest.to_date;
    this.reservationService.addReservationItem(availability)
    this.router.navigateByUrl('/reservation-page')
  }



}
