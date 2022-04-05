import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, Observable } from 'rxjs';
import { concatAll, filter, map, switchMap } from 'rxjs/operators';
import { Availability } from 'src/app/models/availability';
import { AvailabilityRequest } from 'src/app/models/availabilityRequest';
import { AvailabilityInterface } from 'src/app/models/interface/availabilityInterface.interface';
import { AvailabilityRequestInterface } from 'src/app/models/interface/availabilityRequestInterface.interface';
import { AvailableHotelInterface } from 'src/app/models/interface/availableHotelInterface.interface';
import { AvailabilityService } from 'src/app/_services/availability.service';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-available-hotels-list',
  templateUrl: './available-hotels-list.component.html',
  styleUrls: ['./available-hotels-list.component.css']
})
export class AvailableHotelsListComponent implements OnInit{


  availableHotels$: Observable<AvailableHotelInterface>;
  availabilities: AvailabilityInterface[];
  reservations: AvailabilityInterface[];
  availabilityRequest: AvailabilityRequestInterface;
  // availableHotels = new Array<Availability>();
  
  constructor(private availabilityService: AvailabilityService, 
              private router: Router, 
              private reservationService: ReservationsService,
              private messengerService: MessengerService,
              private userAuthService: UserAuthService
              ) {}

  ngOnInit(): void {
    if(this.userAuthService.isLoggedIn()){
    this.messengerService.getAvailabilitySearchData().pipe(
      switchMap(availabilityRequest => this.reservationService.getReservationCart().pipe(
        map(reservations => 
          this.availabilityService.getAvailableRooms(availabilityRequest).pipe(map(availabilities => 
            this.filterAvailabilitiesAlreadyInReservationCart(availabilities, reservations, availabilityRequest)
          )
        
          ).subscribe(data => this.availabilities = data)
        )
      )
    )).subscribe()
          }else{}


  // } else {
  //   this.availabilityService.getAvailableRooms(this.availabilityRequest).subscribe(data => {
  //     console.log(data)
  //     this.availabilities = data;  
  //     this.availableHotels = this.collectHotelToDisplay(this.availabilities);
  //   })
  // }
}

  filterAvailabilitiesAlreadyInReservationCart(availabilities: AvailabilityInterface[], reservations: AvailabilityInterface[], availabilityRequest: AvailabilityRequest){
    return availabilities.filter(x => !reservations.find(y => this.checkIfAvailabilityIsInReservationCart(x, y, availabilityRequest)))
  }

  // collectHotelToDisplay(availabilities: Availability[]){
  //   let result = new Array<Availability>();

    
  //   for(let x of availabilities){
  //     if(result.find(a => a.hotel_id == x.hotel_id))
  //       continue;
  //     result.push(x);
  //   }
  //   return result;
  // }

  // availabilityDetail(id: number){
  //   console.log(this.availabilities)
  //   this.messengerService.sendSearchResultData(this.availabilities);
  //   this.reservationService.addReservaionRequestDate(this.availabilityRequest);
  //   this.router.navigate(['availability-details', id])
  // }

  checkIfAvailabilityIsInReservationCart = function(availability: AvailabilityInterface, reservation: AvailabilityInterface, availabilityRequest: AvailabilityRequestInterface): boolean{
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
