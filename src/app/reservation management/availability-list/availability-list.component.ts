import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
import { concatAll, map } from 'rxjs/operators';
import { Availability } from 'src/app/models/availability';
import { AvailabilityRequest } from 'src/app/models/availabilityRequest';
import { AvailabilityService } from 'src/app/_services/availability.service';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.css']
})
export class AvailabilityListComponent implements OnInit{

  availabilities: Availability[];
  availableHotels = new Array<Availability>();
  reservations: Array<Availability> = [];
  
  availabilityRequest: AvailabilityRequest = new AvailabilityRequest();
  

  constructor(private availabilityService: AvailabilityService, 
              private router: Router, 
              private reservationService: ReservationsService,
              private messengerService: MessengerService,
              private userAuthService: UserAuthService
              ) {}

  ngOnInit(): void {
    this.messengerService.getAvailabilitySearchData().subscribe(x => this.availabilityRequest = x);
    if(this.userAuthService.isLoggedIn()){
    var getReservations$ = this.reservationService.getReservationCart().pipe(map(x => {
      let reservations: Array<Availability> = [];
      if(x) {
        x.cartItems.forEach((arg) => {
          if(arg)
          reservations.push(
            new Availability(
              arg.availability_id, 
              arg.hotel_id,
              arg.hotel_name,
              arg.city, 
              arg.grade,
              arg.room_id,
              arg.roomType,
              arg.from_date,
              arg.to_date,
              arg.price))
        })
      }
      this.reservations = reservations;
    },))
    var getAvailableRooms$ = this.availabilityService.getAvailableRooms(this.availabilityRequest)
    .pipe(map((data => {
      
      this.availabilities = data;
      if(this.reservations.length > 0)
        this.availabilities = this.filterAvailabilitiesAlreadyInReservationCart(this.availabilities, this.reservations, this.availabilityRequest);
      
      this.availableHotels = this.collectHotelToDisplay(this.availabilities);
    })))
    concat(getReservations$, getAvailableRooms$).subscribe()
   

  } else {
    this.availabilityService.getAvailableRooms(this.availabilityRequest).subscribe(data => {
      console.log(data)
      this.availabilities = data;  
      this.availableHotels = this.collectHotelToDisplay(this.availabilities);
    })
  }
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

  getReservations(){
    return this.reservationService.getReservationCart().subscribe(data => {
      this.reservations = data.cartItems;
    })
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
