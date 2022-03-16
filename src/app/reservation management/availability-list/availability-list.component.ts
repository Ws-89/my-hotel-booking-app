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

  availabilities = new Array<Availability>();
  availableHotels = new Array<Availability>();
  
  availabilityRequest: AvailabilityRequest = new AvailabilityRequest();

  constructor(private activatedRoute: ActivatedRoute, 
              private availabilityService: AvailabilityService, 
              private router: Router, 
              private hotelService: HotelsService,
              private reservationService: ReservationsService) { }



  ngOnInit(): void {
    this.availabilityService.share.subscribe(x => this.availabilityRequest = x);
    this.getAvailabilitiesRequest(this.availabilityRequest);
  }

  getAvailabilitiesRequest(availabilityRequest: AvailabilityRequest){
    this.availabilityService.getAvailableRooms(availabilityRequest)
    .subscribe(data => {
      
      for(var x of data){
        this.availabilities.push(x);
      }
      
      this.availabilities = this.availabilities.filter(
        x => this.reservationService.getReservations().items.filter(
          y => this.filterItemsAlreadyInCart(x,y, availabilityRequest) ))
    

      for(var x of this.availabilities){
        if(this.availableHotels.find(a => a.hotel_id == x.hotel_id))
          continue;
        this.availableHotels.push(x);
      }
    },
    error => console.log(error))
  }

  availabilityDetail(id: number){
    this.availabilityService.passAvailabilityResult(this.availabilities);
    this.router.navigate(['availability-details', id])
  }

  filterItemsAlreadyInCart(availability: Availability, reservation: Reservation, availabilityRequest: AvailabilityRequest){
    return reservation.room_id === availability.room_id && 
    ((reservation.from_date < availabilityRequest.from_date && reservation.to_date > availabilityRequest.from_date)
    || (reservation.from_date < availabilityRequest.to_date && reservation.from_date > availabilityRequest.to_date)
    || (reservation.from_date > availabilityRequest.from_date && reservation.to_date < availabilityRequest.from_date)
    || (reservation.from_date < availabilityRequest.from_date && reservation.to_date > availabilityRequest.to_date)
  )
  }
}
