import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userIn: string = '';
  textArea: string = '';

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit(): void {  }

  onSubmit(): void {
    const url: string = `http://localhost:8000/gpt`;
    const json = { userIn: this.userIn };
    console.log(this.userIn);
    // Makes request to backend for results
    this.textArea = '';
    this.httpClient.post<any>(url, json).subscribe(res => {
      console.log(res);
      if(!res.autocomplete) this.textArea += res.mssg;
      else this.setTextArea(res.autocomplete);
    });
  }

  setTextArea(arr: Array<any>){
    for(let i = 0; i < arr.length; i++){
      let line = '';
      line += `Area type: ${arr[i].area_type}, `;
      line += `State: ${arr[i].state}, city: ${arr[i].city}`;
      line += `Score: ${arr[i].score}`;
      this.textArea += (line + '\n');
    }
  }

}
