import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input()
  userModelMain: UserModel;

  constructor() {}

  ngOnInit() {}

  getCurrentLogedUser(userModel: UserModel) {
    this.userModelMain = userModel;
  }

  printUserData(){
    console.log(this.userModelMain);
  }
}
