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
  
  ngOnInit(): void { }

  onSubmit(): void {
    const url: string = `https://dukecitydigital.com/demo-api/get-listings/`;
    const json = { userIn: this.userIn };
    console.log(this.userIn);
    // Makes request to backend for results
    this.textArea = '';
    this.httpClient.post<any>(url, json).subscribe(res => {
      console.log('Count: ' + res.data.home_search.count);
      this.setTextArea(res.data.home_search.results);
    });
  }

  setTextArea(arr: Array<any>){
    for(let comp of arr){
      const address = comp.location.address;
      const des = comp.description;
      this.textArea += `Location: ${address.line}, ${address.city}, ${address.state}, ${address.postal_code}\n`;
      this.textArea += `Sqft: ${des.sqft}, bedrooms: ${des.beds}, bathrooms: ${des.baths}\n`;
      console.log('\n');
    }
  }
}
