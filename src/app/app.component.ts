import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userIn: string = '';
  
  res: any;

  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {  }

  sendUserInput(): void {
    const url: string = `localhost:8000/gpt`;
    const json = { userIn: this.userIn };
    // Makes request to backend for results
    this.httpClient.post<any>(url,json).subscribe(res => {
      this.res = res;
    })
  }
}
