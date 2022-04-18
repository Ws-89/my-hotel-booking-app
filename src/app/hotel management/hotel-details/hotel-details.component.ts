
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';
import { HotelsService } from '../../_services/hotels.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
}) 
export class HotelDetailsComponent implements OnInit {

  selectedFile: File = null;
  id: number;
  hotel: HotelInterface;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private hotelService: HotelsService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.hotelService.getHotelById(this.id)
    .then(data => {
      // console.log(data)
      this.loading = false;
      this.hotel = data;
    })
  }

  updateHotel(id: number){
    this.router.navigate(['update-hotel', id]);
  }

  deleteHotel(id: number){
    this.hotelService.deleteHotel(id).then(data => {
      this.router.navigate(['hotels']);
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
    this.hotelService.uploadImage(this.id, fd).then(res => {
      console.log(res);
    })
  }


}
