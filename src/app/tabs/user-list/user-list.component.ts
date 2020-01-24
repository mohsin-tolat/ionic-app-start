import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from 'src/shared/models/userDto.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input()
  userDetails: UserDto;

  constructor() {}

  ngOnInit() {}
}
