import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { AvailabilityRequest } from 'src/app/models/availabilityRequest';
import { AvailabilityService } from 'src/app/_services/availability.service';
import { HotelsService } from 'src/app/_services/hotels.service';
import { MessengerService } from 'src/app/_services/messenger.service';
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
              private reservationService: ReservationsService,
              private messengerService: MessengerService) { }

  id: number;
  searchResult: Availability[];
  roomsOfSpecificHotel: Availability[];
  availabilityRequest: AvailabilityRequest;
  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.messengerService.getSearchResultData().subscribe(x => this.searchResult = x);
    this.roomsOfSpecificHotel = this.searchResult.filter(x => x.hotel_id == this.id);
    this.messengerService.getAvailabilitySearchData().subscribe(x => this.availabilityRequest = x)
  }

  bookThisRoom(availability: Availability){
    availability.from_date = this.availabilityRequest.from_date;
    availability.to_date = this.availabilityRequest.to_date;
    // this.reservationService.addReservationItemCart(availability);
    this.reservationService.addReservationItemCart(availability).subscribe(data => {
    }
     
    )
    this.router.navigateByUrl('/reservation-page')
  }



}
