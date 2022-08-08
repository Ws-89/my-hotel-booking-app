import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { AvailabilityResponse } from 'src/app/models/interface/availabilityResponse.interface';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';
import { AvailabilityService } from 'src/app/_services/availability.service';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  selector: 'app-available-hotels-list',
  templateUrl: './available-hotels-list.component.html',
  styleUrls: ['./available-hotels-list.component.css']
})
export class AvailableHotelsListComponent implements OnInit {

  availabilityResponse: AvailabilityResponse;

  constructor(private availabilityService: AvailabilityService,
    private router: Router,
    private messengerService: MessengerService,
  ) { }

  ngOnInit(): void {
    this.messengerService.getAvailabilitySearchData().pipe(
      switchMap(availabilityRequest => this.availabilityService.getAvailableRooms(availabilityRequest))
    ).subscribe(
      data => {
        console.log(data)
        this.availabilityResponse = data;
      }
    )
  }


  availabilityDetail(id: number, hotel: HotelInterface) {
    let possibleBooking = this.availabilityResponse;
    possibleBooking.data.availableHotels = null;
    possibleBooking.data.availableHotel = hotel;
    this.messengerService.sendHotelDetails(possibleBooking);
    this.router.navigate(['availability-details'])
  }

}


