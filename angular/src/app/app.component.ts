import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  title: string = 'angular-demo';

  clock: Observable<number> = interval(3000);

  constructor(
    public http: HttpClient,
  ) {
  }

  ngOnInit(): void {

  }

}
