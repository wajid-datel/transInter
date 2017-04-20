import { Component, OnInit } from '@angular/core';

import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  selectedLanguage: string;
  wolves = 0;
  gender = 'f';
  fly = true;
  logo = 'https://angular.io/resources/images/logos/angular/angular.png';
  inc(i: number) {
    this.wolves = Math.min(5, Math.max(0, this.wolves + i));
  }
  male()   { this.gender = 'm'; }
  female() { this.gender = 'f'; }

  ngOnInit(){
    this.selectedLanguage = localStorage.getItem('locale') as string;
    if(!this.selectedLanguage)
      this.selectedLanguage = environment.locale;

  }

  languageChanged(value){
    localStorage.setItem('locale', value);
    location.reload();
  }
}
