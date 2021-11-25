import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../room';
import { RoomService } from '../_services/room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  id: Number;
  room: Room;

  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.room = new Room();
    this.roomService.getRoomById(this.id).subscribe(data => {
      this.room = data;
    });
  }

}
