import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomType } from '../../enum/room-type.enum';
import {Location} from '@angular/common';
import { RoomService } from 'src/app/_services/room.service';
import { RoomInterface } from 'src/app/models/interface/room.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {


  form: FormGroup;

  id: number;
  room: RoomInterface;
  roomType = RoomType;
  roomTypeKeys = [];

  descriptionList: Array<any> = [
    {name: "private bathroom", value: "private bathroom", isChecked: false},
    {name: "tv", value: "tv", isChecked: false},
    {name: "kitchen", value: "kitchen", isChecked: false},
    {name: "iron", value: "iron", isChecked: false},
    {name: "frigde", value: "frigde", isChecked: false},
    {name: "balcony", value: "balcony", isChecked: false},
    {name: "sea view", value: "sea view", isChecked: false},
    {name: "mountain view", value: "mountain view", isChecked: false}
  ]

  constructor(private roomService: RoomService, private fb: FormBuilder,
    private route: ActivatedRoute, private _location: Location) {
    this.roomTypeKeys = Object.keys(this.roomType);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      description: this.fb.array([]),
      roomType: new FormControl(''),
      price: new FormControl('')
    })

    this.roomService.getRoomById$(this.id).subscribe(data => {
      this.room = data.data.object;
      this.form.patchValue({roomType: data.data.object.roomType})
      this.isChecked(data.data.object.description)
    }, error => console.log(error));
  }

  isChecked(data: String){
    let splittedData = data.split(", ")
    const description: FormArray = this.form.get('description') as FormArray;
    this.descriptionList.forEach(item => {
      if(splittedData.includes(item.value)){
        item.isChecked = true;
        description.push(new FormControl(item.value))
      }
    })
  }

  onCheckboxChange(e){
    const description: FormArray = this.form.get('description') as FormArray;
    if(e.target.checked) {
      description.push(new FormControl(e.target.value));
    }else {
      let i: number = 0;
      description.controls.forEach((item: FormControl) => {
        if(item.value == e.target.value){
          description.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit(){
    this.room.roomType = this.form.value.roomType;
    this.room.description = this.form.value.description.join(", ");
    this.room.price = this.form.value.price;

    this.roomService.updateRoom(this.room.roomId, this.room)
    .then(data => {
    this.backClicked();
    },
    error => console.log(error));
  }


  backClicked() {
    this._location.back();
  }

}
