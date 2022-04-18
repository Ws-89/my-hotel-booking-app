import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {Location} from '@angular/common';
import { RoomGroupService } from 'src/app/_services/room-group.service';
import { RoomGroupInterface } from 'src/app/models/interface/roomGroup.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  hotel_id: Number;
  roomGroups: RoomGroupInterface[];
  

  constructor(private route: ActivatedRoute, 
    private roomGroupService: RoomGroupService,
    private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.hotel_id = this.route.snapshot.params['id'];
    this.getRoomGroupByHotelId();
    
  }

  addToExistingGroup(id: Number){
    this.roomGroupService.addToExistingGroup(id).then(data => {
      this.getRoomGroupByHotelId()
    })
  }
  
  getRoomGroupByHotelId(){
    this.roomGroupService.getRoomGroupsByHotelId(this.hotel_id).subscribe(data => {
      this.roomGroups = data;
  })
  }

  deleteGroup(id: Number){
    this.roomGroupService.deleteGroup(id).then(data => {
      this.getRoomGroupByHotelId()
    }) 
  }

  updateGroup(id: Number){
    this.router.navigate(['update-room', id]);
  }

  deleteRoom(id: Number){
    this.roomGroupService.removeFromGroup(id).then(data => {
      this.getRoomGroupByHotelId()
    })
  }

  createRoom(hotel_id: Number){
    this.router.navigate(['create-room', hotel_id]);
  }
  
  backClicked() {
    this._location.back();
  }
}
