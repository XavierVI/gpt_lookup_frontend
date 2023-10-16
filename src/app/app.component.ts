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
  textArea: string = '';

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit(): void {  }

  onSubmit(): void {
    const url: string = `http://localhost:8000/gpt`;
    const json = { userIn: this.userIn };
    console.log(this.userIn);
    // Makes request to backend for results
    this.httpClient.post<any>(url, json).subscribe(res => {
      console.log(res);
      this.res = res;
      this.textArea = res;
    });
    console.log(this.res);
  }
}
