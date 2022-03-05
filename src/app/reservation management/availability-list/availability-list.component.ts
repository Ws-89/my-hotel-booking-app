import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { AvailabilityRequest } from 'src/app/models/availabilityRequest';
import { AvailabilityService } from 'src/app/_services/availability.service';
import { HotelsService } from 'src/app/_services/hotels.service';

@Component({
  selector: 'app-availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.css']
})
export class AvailabilityListComponent implements OnInit {

  availabilities = new Array<Availability>();
  availableHotels = new Array<Availability>();
  retrievedImages = new Map<number, any>();
  base64Data: any;
  retrieveResonse: any;
  
  availabilityRequest: AvailabilityRequest = new AvailabilityRequest();

  constructor(private activatedRoute: ActivatedRoute, private availabilityService: AvailabilityService, private router: Router, private hotelService: HotelsService) { }



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

      for(var x of data){
        if(this.availableHotels.find(a => a.hotel_id == x.hotel_id))
          continue;
        this.availableHotels.push(x);
        this.downloadImage(x.hotel_id);
        
        
      }
    },
    error => console.log(error))
  }

  availabilityDetail(id: number){
    this.availabilityService.passAvailabilityResult(this.availabilities);
    this.router.navigate(['availability-details', id])
  }

  downloadImage(id: number){
    this.hotelService.downloadImage(id).subscribe(data => {
      this.retrieveResonse = data;
      this.base64Data = this.retrieveResonse.bytePic;
      this.retrievedImages.set(id, 'data:image/jpeg;base64,' + this.base64Data);
    })
  }

}
