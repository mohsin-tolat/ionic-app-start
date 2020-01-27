import { Component, OnInit, Input } from '@angular/core';
import { UserDto } from 'src/shared/models/userDto.model';

@Component({
  selector: 'app-user-detail-child',
  templateUrl: './user-detail-child.component.html',
  styleUrls: ['./user-detail-child.component.scss'],
})
export class UserDetailChildComponent implements OnInit {
  @Input()
  userDetails: UserDto;

  constructor() {}

  ngOnInit() {}
}
