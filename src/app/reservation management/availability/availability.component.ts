import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailabilityInterface } from 'src/app/models/interface/availability.interface';
import { AvailabilityRequestInterface } from 'src/app/models/interface/availabilityRequest.interface';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private reservationService: ReservationsService,
              private messengerService: MessengerService, 
              private userAuthService: UserAuthService) { }

  id: number;
  searchResult: AvailabilityInterface[];
  roomsOfSpecificHotel: AvailabilityInterface[];
  availabilityRequest: AvailabilityRequestInterface;
  startDate: string;
  endDate: string;
  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.messengerService.getAvailabilitySearchData().subscribe(x => this.availabilityRequest = x)
    this.messengerService.getSearchResultData().subscribe(
        data => 
        {
          this.roomsOfSpecificHotel = data.filter(x => x.hotel_id == this.id)
          let tempStartDate = new Date(this.availabilityRequest.from_date)
          this.startDate = tempStartDate.toISOString().split('T')[0]
      
          let tempEndDate = new Date(this.availabilityRequest.to_date)
          this.endDate = tempEndDate.toISOString().split('T')[0]
        })
  }

  bookThisRoom(availability: AvailabilityInterface){
    availability.from_date = this.availabilityRequest.from_date;
    availability.to_date = this.availabilityRequest.to_date;
    if(this.userAuthService.isLoggedIn()){
    this.reservationService.addReservationItemCart(availability).subscribe(data => {
      this.router.navigateByUrl('/reservation-page')
    })
    }else{
      this.messengerService.sendReservationForNonLoggedInUser(availability)
      this.router.navigateByUrl('/complete-the-transaction')   
    }
  }
  


}
