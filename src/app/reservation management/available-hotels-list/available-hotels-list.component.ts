import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AvailabilityInterface } from 'src/app/models/interface/availability.interface';
import { AvailabilityRequestInterface } from 'src/app/models/interface/availabilityRequest.interface';
import { AvailableHotelInterface } from 'src/app/models/interface/availableHotel.interface';
import { AvailableRoomInterface } from 'src/app/models/interface/availableRoom.interface';


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


  availableHotels: AvailableHotelInterface[];
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

  private groupAvailableRoomsByHotels(availableRooms: AvailableRoomInterface[]){
    let result: AvailableHotelInterface[] = [];

            for(let item of availableRooms){
              let hotel = result.find(hotel => hotel.hotel_id == item.hotel_id)
              if(hotel){
                hotel.rooms.push(item)
              }else {
                var newRoom: AvailableRoomInterface[] = [item]
                var newHotel: AvailableHotelInterface = {
                  hotel_id : item.hotel_id,
                  hotel_name : item.hotel_name,
                  city: item.city,
                  grade: item.grade,
                  rooms : newRoom,
                  image: item.image
                }
                result.push(newHotel)
                }
              }
      return result;
  }

  private filterAvailabilitiesAlreadyInReservationCart(availabilities: AvailabilityInterface[], reservations: AvailabilityInterface[], availabilityRequest: AvailabilityRequestInterface){
    return availabilities.filter(availability => !reservations.find(reservation => this.checkIfAvailabilityIsInReservationCart(availability, reservation, availabilityRequest)))
  }

  private checkIfAvailabilityIsInReservationCart = function(availability: AvailabilityInterface, reservation: AvailabilityInterface, availabilityRequest: AvailabilityRequestInterface): boolean{
    availability.from_date = new Date(availability.from_date);
    availability.to_date = new Date(availability.to_date);
    reservation.from_date = new Date(reservation.from_date);
    reservation.to_date = new Date(reservation.to_date);
    availabilityRequest.from_date = new Date(availabilityRequest.from_date);
    availabilityRequest.to_date = new Date(availabilityRequest.to_date);
   
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
