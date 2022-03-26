import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { AvailabilityRequest } from 'src/app/models/availabilityRequest';
import { AvailabilityService } from 'src/app/_services/availability.service';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';

@Component({
  selector: 'app-availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.css']
})
export class AvailabilityListComponent implements OnInit {

  availabilities: Availability[];
  availableHotels = new Array<Availability>();
  reservations: Availability[];
  
  availabilityRequest: AvailabilityRequest = new AvailabilityRequest();

  constructor(private availabilityService: AvailabilityService, 
              private router: Router, 
              private reservationService: ReservationsService,
              private messengerService: MessengerService) { }



  ngOnInit(): void {
    this.messengerService.getAvailabilitySearchData().subscribe(x => this.availabilityRequest = x);
    this.getAvailabilities(this.availabilityRequest);
  }

  filterAvailabilitiesAlreadyInReservationCart(availabilities: Availability[], reservations: Availability[], availabilityRequest: AvailabilityRequest){
    return availabilities.filter(x => !reservations.find(y => this.checkIfAvailabilityIsInReservationCart(x, y, availabilityRequest)))
  }

  collectHotelToDisplay(availabilities: Availability[]){
    let result = new Array<Availability>();

    
    for(let x of availabilities){
      if(result.find(a => a.hotel_id == x.hotel_id))
        continue;
      result.push(x);
    }
    return result;
  }

  getAvailabilities(availabilityRequest: AvailabilityRequest){
    return this.availabilityService.getAvailableRooms(availabilityRequest)
    .subscribe(data => {
      
      this.availabilities = data;

      var reservations = this.reservationService.getReservations();
      if(reservations.length > 0)
        this.availabilities = this.filterAvailabilitiesAlreadyInReservationCart(this.availabilities, reservations, availabilityRequest);
      
      this.availableHotels = this.collectHotelToDisplay(this.availabilities);
      
    },
    error => console.log(error))
  }

  availabilityDetail(id: number){
    this.messengerService.sendSearchResultData(this.availabilities);
    this.reservationService.addReservaionRequestDate(this.availabilityRequest);
    this.router.navigate(['availability-details', id])
  }

  checkIfAvailabilityIsInReservationCart = function(availability: Availability, reservation: Availability, availabilityRequest: AvailabilityRequest): boolean{
    return (reservation.room_id == availability.room_id && 
    (((reservation.from_date.toISOString() < availabilityRequest.from_date.toISOString() || reservation.from_date.toISOString() == availabilityRequest.from_date.toISOString()) 
    && (reservation.to_date.toISOString() > availabilityRequest.from_date.toISOString() || reservation.to_date.toISOString() == availabilityRequest.from_date.toISOString()))
    || 
    ((reservation.from_date.toISOString() < availabilityRequest.to_date.toISOString() || reservation.from_date.toISOString() == availabilityRequest.to_date.toISOString()) 
    && (reservation.to_date.toISOString() > availabilityRequest.to_date.toISOString() || reservation.to_date.toISOString() == availabilityRequest.to_date.toISOString()))
    || 
    ((reservation.from_date.toISOString() > availabilityRequest.from_date.toISOString()|| reservation.from_date.toISOString() == availabilityRequest.from_date.toISOString()) 
    && (reservation.to_date.toISOString() < availabilityRequest.to_date.toISOString() || reservation.to_date.toISOString() == availabilityRequest.to_date.toISOString()))
    || 
    ((reservation.from_date.toISOString() < availabilityRequest.from_date.toISOString() || reservation.from_date.toISOString() == availabilityRequest.from_date.toISOString()) 
    && (reservation.to_date.toISOString() > availabilityRequest.to_date.toISOString() || reservation.to_date.toISOString() == availabilityRequest.to_date.toISOString())))
    )
  }

}
