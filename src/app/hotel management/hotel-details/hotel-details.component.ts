import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../../models/hotel';
import { HotelsService } from '../../_services/hotels.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  selectedFile: File = null;
  id: number;
  hotel: Hotel;

  constructor(private route: ActivatedRoute, private hotelService: HotelsService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.hotel = new Hotel();
    this.hotelService.getHotelById(this.id).subscribe(data => {
      this.hotel = data;
    })
  }

  updateHotel(id: number){
    this.router.navigate(['update-hotel', id]);
  }

  deleteHotel(id: number){
    this.hotelService.deleteHotel(id).subscribe(data => {
      this.hotelService.getHotelList();
    })
  }

  showRoomList(id: number){
    this.router.navigate(['rooms', id]);
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name)
    this.hotelService.uploadImage(this.id, fd).subscribe(res => {
      console.log(res);
    })
  }


}
