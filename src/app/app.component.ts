import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userIn: string = '';
  houses: Array<any> = [];
  progressBar = false;

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit(): void { }

  onSubmit(): void {
    const url: string = `https://localhost:8000/demo-api/get-listings/`;
    const json = { userIn: this.userIn };
    console.log(this.userIn);
    // Makes request to backend for results
    this.httpClient.post<any>(url, json).subscribe(res => {
      console.log('Count: ' + res.data.home_search.count);
      this.setTextArea(res.data.home_search.results);
    });
  }

  setTextArea(res: Array<any>){
    for(let obj of res){
      console.log(obj);
      // Checks if number of houses in obj is 0
      if(obj.data.home_search.count == 0) continue;
      else if(!obj) continue;

      for(let comp of obj.data.home_search.results){
        console.log(comp);
        if(!comp) continue; // This line is necessary for preventing TypeErrors
        try {
          const street = comp.location.address.line;
          const city = comp.location.address.city;
          const state = comp.location.address.state_code;
          const des = comp.description;
          const houseObj = {
            address: `${street}, ${city}, ${state}`,
            sqft: des.sqft,
            lot_sqft: des.lot_sqft,
            bedrooms: des.beds,
            bathrooms: des.baths,
            photo: comp.primary_photo.href,
            street_view: comp.street_view_url,
            href: comp.href,
            price: comp.list_price,
            date: comp.list_date
          }
          this.houses.push(houseObj);
        }
        catch(TypeError) {
          console.log('TypeError occurred');
        }
      } 
    }
  }

  format(num: number): string{
    // Convert the price to a string.
    const numString = num.toString();

    // If the price is less than 1000, simply return the price string.
    if (num < 1000) {
      return numString;
    }

    // Otherwise, format the price string with commas and a decimal point.
    const formatted = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formatted;
  }
}
