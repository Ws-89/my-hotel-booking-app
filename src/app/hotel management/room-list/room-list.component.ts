import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {Location} from '@angular/common';
import {  RoomService } from 'src/app/_services/room.service';
import { RoomInterface } from 'src/app/models/interface/room.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiResponse } from 'src/app/models/interface/api-response.interface';
import { Page } from 'src/app/models/interface/page';
import { HttpErrorResponse } from '@angular/common/http';
import { map, startWith, catchError } from 'rxjs/operators';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  roomList$: Observable<({ appState: string, appData?: ApiResponse<Page<RoomInterface>>, error?: HttpErrorResponse })>;
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  responseSubject = new BehaviorSubject<ApiResponse<Page<RoomInterface>>>(null)

  hotel_id: Number;
  rooms: RoomInterface[];


  constructor(private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.roomList$ = this.roomService.getRoomListByHotelId$(this.route.snapshot.params['id'], 0, 10).pipe(
      map((response: ApiResponse<Page<RoomInterface>>) =>  {
        console.log('response',response)
        this.responseSubject.next(response)
        this.currentPageSubject.next(response.data.page.number)
        return ({ appState: 'APP_LOADED', appData: response })
      }),
      startWith({ appState: 'APP_LOADING'}),
      catchError((error:HttpErrorResponse) => {
        return of({ appState: 'APP_ERROR', error }) 
      })) 
  }

  goToPage(pageNumber: number = 0): void{
    this.roomList$ = this.roomService.getRoomListByHotelId$(this.route.snapshot.params['id'], pageNumber).pipe(
      map((response: ApiResponse<Page<RoomInterface>>) => {
        this.responseSubject.next(response)
        this.currentPageSubject.next(response.data.page.number)
        return ({ appState: 'APP_LOADED', appData: response})
      }),
      startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value}),
      catchError((error:HttpErrorResponse) => {
        return of({ appState: 'APP_ERROR', error})
      })
    )
  }

  goToNextOrPrevious(direction?: string): void {
    this.goToPage(direction == 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value -1)
  }

  deleteRoom(id: Number){
    this.roomService.deleteRoom(id).then(data => {
      this.goToPage(this.currentPageSubject.value)
    })
  }

  showReservations(id: Number){
    this.router.navigate(['reservation-list', id])
  }

  updateRoom(id: Number){
    this.router.navigate(['update-room', id]);
  }

  switchRoomState(id: number, state: boolean){
    this.roomService.switchRoomState(id, state).then(result => {
      this.goToPage(this.currentPageSubject.value);
    })
  }


  createRoom(){
    this.router.navigate(['create-room', this.route.snapshot.params['id']]);
  }

  backClicked() {
    this._location.back();
  }
}
