import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Room } from '../../models/room';
import { RoomService } from '../../_services/room.service';
import {Location} from '@angular/common';
import { RoomGroupService } from 'src/app/_services/room-group.service';
import { RoomGroupInterface } from 'src/app/models/interface/roomGroup.interface';
import { Observable } from 'rxjs';

// ng g c room-list
@Component({
  selector: 'app-room-list', // to skopiowalem do app.component.html
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  // zmienna zawierajaca tablice
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
    this.roomGroupService.addToExistingGroup(id).subscribe(data => {
      this.getRoomGroupByHotelId()
    })
  }
  
  getRoomGroupByHotelId(){
    this.roomGroupService.getRoomGroupsByHotelId(this.hotel_id).subscribe(data => {
      this.roomGroups = data;
  })
  }

  deleteGroup(id: Number){
    this.roomGroupService.deleteGroup(id).subscribe(data => {
      this.getRoomGroupByHotelId()
    }) 
  }

  updateGroup(id: Number){
    this.router.navigate(['update-room', id]);
  }


  updateRoom(id: Number){
    this.router.navigate(['update-room', id]);
  }

  deleteRoom(id: Number){
    this.roomGroupService.removeFromGroup(id).subscribe(data => {
      this.getRoomGroupByHotelId()
    })
  }

  roomDetails(id: Number){
    this.router.navigate(['room-details', id]);
  }

  createRoom(hotel_id: Number){
    this.router.navigate(['create-room', hotel_id]);
  }
  
  backClicked() {
    this._location.back();
  }
}
