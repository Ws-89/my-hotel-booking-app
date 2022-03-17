import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { AvailabilityRequest } from 'src/app/models/availabilityRequest';
import { Reservation } from 'src/app/models/reservation';
import { AvailabilityService } from 'src/app/_services/availability.service';
import { HotelsService } from 'src/app/_services/hotels.service';
import { ReservationsService } from 'src/app/_services/reservations.service';

@Component({
  selector: 'app-availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.css']
})
export class AvailabilityListComponent implements OnInit {

  availabilities: Availability[];
  availableHotels = new Array<Availability>();
  
  availabilityRequest: AvailabilityRequest = new AvailabilityRequest();

  constructor(private availabilityService: AvailabilityService, 
              private router: Router, 
              private reservationService: ReservationsService) { }



  ngOnInit(): void {
    this.availabilityService.share.subscribe(x => this.availabilityRequest = x);
    this.getAvailabilitiesRequest(this.availabilityRequest);
  }

  filterAvailabilitiesAlreadyInReservationCart(availabilities: Availability[], availabilityRequest: AvailabilityRequest){
    var reservations = this.reservationService.getReservations().items;
    var result = new Array<Availability>();
    
    if(reservations.length > 0 && availabilities.length > 0)
    for(let x of availabilities){
      for(let y of reservations){
        if(!this.checkIfAvailabilityIsInReservationCart(x, y, availabilityRequest))
        result.push(x);
        console.log(result.length);
      }
    }
    if(result.length > 0)
      return result;
    else 
      return availabilities;
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

  getAvailabilitiesRequest(availabilityRequest: AvailabilityRequest){
    return this.availabilityService.getAvailableRooms(availabilityRequest)
    .subscribe(data => {
      
      this.availabilities = data;
  
      this.availabilities = this.filterAvailabilitiesAlreadyInReservationCart(this.availabilities, availabilityRequest);
      
      this.availableHotels = this.collectHotelToDisplay(this.availabilities);
      
    },
    error => console.log(error))
  }

  availabilityDetail(id: number){
    this.availabilityService.passAvailabilityResult(this.availabilities);
    this.router.navigate(['availability-details', id])
  }

  checkIfAvailabilityIsInReservationCart = function(availability: Availability, reservation: Availability, availabilityRequest: AvailabilityRequest): boolean{
    // return reservation.room_id == availability.room_id && 
    // (((reservation.from_date.toISOString() < availabilityRequest.from_date.toISOString() || reservation.from_date.toISOString() == availabilityRequest.from_date.toISOString()) 
    // && (reservation.to_date.toISOString() > availabilityRequest.from_date.toISOString() || reservation.to_date.toISOString() == availabilityRequest.from_date.toISOString()))
    // || 
    // ((reservation.from_date.toISOString() < availabilityRequest.to_date.toISOString() || reservation.from_date.toISOString() == availabilityRequest.to_date.toISOString()) 
    // && (reservation.to_date.toISOString() > availabilityRequest.to_date.toISOString() || reservation.to_date.toISOString() == availabilityRequest.to_date.toISOString()))
    // || 
    // ((reservation.from_date.toISOString() > availabilityRequest.from_date.toISOString()|| reservation.from_date.toISOString() == availabilityRequest.from_date.toISOString()) 
    // && (reservation.to_date.toISOString() < availabilityRequest.to_date.toISOString() || reservation.to_date.toISOString() == availabilityRequest.to_date.toISOString()))
    // || 
    // ((reservation.from_date.toISOString() < availabilityRequest.from_date.toISOString() || reservation.from_date.toISOString() == availabilityRequest.from_date.toISOString()) 
    // && (reservation.to_date.toISOString() > availabilityRequest.to_date.toISOString() || reservation.to_date.toISOString() == availabilityRequest.to_date.toISOString())))
    console.log(reservation.from_date + " rezerwacja");
    console.log(availabilityRequest.from_date + " zapytanie")
    return true
  }

}
