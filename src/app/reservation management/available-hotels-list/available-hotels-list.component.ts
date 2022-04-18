import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { AvailabilityInterface } from 'src/app/models/interface/availability.interface';
import { AvailabilityRequestInterface } from 'src/app/models/interface/availabilityRequest.interface';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';


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


  availableHotels: Partial<AvailabilityInterface>[];
  availabilities: AvailabilityInterface[];
  reservations: AvailabilityInterface[];
  availabilityRequest: AvailabilityRequestInterface;
  
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
        switchMap(reservations => this.availabilityService.getAvailableRooms(availabilityRequest).pipe(
          map(availabilities => this.filterAvailabilitiesAlreadyInReservationCart(availabilities, reservations, availabilityRequest)),
        )))))
        .subscribe(
          data =>  {
            this.availableHotels = this.groupAvailableRoomsByHotels(data)
            this.availabilities = data
          })
      }
      else
      {
        this.messengerService.getAvailabilitySearchData().pipe(
          switchMap(availabilityRequest => this.availabilityService.getAvailableRooms(availabilityRequest))
        ).subscribe(
          data =>  {
            this.availableHotels = this.groupAvailableRoomsByHotels(data)
            this.availabilities = data
          }       
        )
      }
    }

    availabilityDetail(id: number){
      this.messengerService.sendSearchResultData(this.availabilities);
      this.reservationService.addReservaionRequestDate(this.availabilityRequest);
      this.router.navigate(['availability-details', id])
    }

  private groupAvailableRoomsByHotels(availableRooms: Partial<AvailabilityInterface>[]){
    let result: Partial<HotelInterface>[] = [];

    availableRooms.forEach(item => {
      var hotel = result.find(hotel => hotel.hotelId == item.hotelId)
              if(hotel){
                hotel.rooms.push(item)
              }else {
                var newRoom: Partial<AvailabilityInterface>[] = [item]
                var newHotel: Partial<HotelInterface> = {
                  hotelId : item.hotelId,
                  hotelName : item.hotelName,
                  city: item.city,
                  grade: item.grade,
                  rooms : newRoom,
                  image: item.image
                }
                result.push(newHotel)
                }
    })
      return result;
  }

  private filterAvailabilitiesAlreadyInReservationCart(availabilities: AvailabilityInterface[], reservations: AvailabilityInterface[], availabilityRequest: AvailabilityRequestInterface){
    return availabilities.filter(availability => !reservations.find(reservation => this.checkIfAvailabilityIsInReservationCart(availability, reservation, availabilityRequest)))
  }

  private checkIfAvailabilityIsInReservationCart = function(availability: AvailabilityInterface, reservation: AvailabilityInterface, availabilityRequest: AvailabilityRequestInterface): boolean{
    availability.startDate = new Date(availability.startDate);
    availability.endDate = new Date(availability.endDate);
    reservation.startDate = new Date(reservation.startDate);
    reservation.endDate = new Date(reservation.endDate);
    availabilityRequest.startDate = new Date(availabilityRequest.startDate);
    availabilityRequest.endDate = new Date(availabilityRequest.endDate);
   
    return (reservation.roomId == availability.roomId && 
    (((reservation.startDate.toISOString() < availabilityRequest.startDate.toISOString() || reservation.startDate.toISOString() == availabilityRequest.startDate.toISOString()) 
    && (reservation.endDate.toISOString() > availabilityRequest.startDate.toISOString() || reservation.endDate.toISOString() == availabilityRequest.startDate.toISOString()))
    || 
    ((reservation.startDate.toISOString() < availabilityRequest.endDate.toISOString() || reservation.startDate.toISOString() == availabilityRequest.endDate.toISOString()) 
    && (reservation.endDate.toISOString() > availabilityRequest.endDate.toISOString() || reservation.endDate.toISOString() == availabilityRequest.endDate.toISOString()))
    || 
    ((reservation.startDate.toISOString() > availabilityRequest.startDate.toISOString()|| reservation.startDate.toISOString() == availabilityRequest.startDate.toISOString()) 
    && (reservation.endDate.toISOString() < availabilityRequest.endDate.toISOString() || reservation.endDate.toISOString() == availabilityRequest.endDate.toISOString()))
    || 
    ((reservation.startDate.toISOString() < availabilityRequest.startDate.toISOString() || reservation.startDate.toISOString() == availabilityRequest.startDate.toISOString()) 
    && (reservation.endDate.toISOString() > availabilityRequest.endDate.toISOString() || reservation.endDate.toISOString() == availabilityRequest.endDate.toISOString())))
    )
  }

}
