import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../models/hotel';
import { HotelsService } from '../../_services/hotels.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  id: number;
  hotel: Hotel;

  constructor(private route: ActivatedRoute, private hotelService: HotelsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.hotel = new Hotel();
    this.hotelService.getHotelById(this.id).subscribe(data => {
      this.hotel = data;
    })
  }

}
