import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
// import testObj from './testObj';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userIn: string = '';
  houses: Array<any> = [];
  progressBar = false;

  // pagination variables
  length = 0; // the total number of houses
  pageSize = 5; // the number of houses per page
  pageIndex = 0; // this marks the current page
  pageSizeOptions = [5, 10, 25];
  housesToDisplay: any[] = []; // the houses to be displayed on the page

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit(): void { }

  onSubmit(): void {
    const url: string = `https://localhost:8000/demo-api/get-listings/`;
    const json = { userIn: this.userIn };
    this.progressBar = true;
    this.houses = [];
    this.housesToDisplay = [];
    this.httpClient.post<any>(url, json).subscribe(res => {
      this.generateHouseCards(res);
      this.progressBar = false;
      this.length = this.houses.length;
      if(this.length >= this.pageSize) this.housesToDisplay = this.houses.slice(0, this.pageSize);
      else this.housesToDisplay = this.houses;
    });
    // setTimeout(() => {
    //   this.generateHouseCards(testObj);
    //   this.progressBar = false;
    //   this.length = this.houses.length;
    //   if(this.length >= this.pageSize) this.housesToDisplay = this.houses.slice(0, this.pageSize);
    //   else this.housesToDisplay = this.houses;
    // }, 1500);
  }

  generateHouseCards(res: Array<any>){
    for(let obj of res){
      if(obj.data.home_search.count == 0) continue;
      else if(!obj) continue;

      for(let comp of obj.data.home_search.results){
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

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    const start = event.pageSize*event.pageIndex;
    const end = (event.pageSize-1) + event.pageSize*event.pageIndex;
    this.housesToDisplay = this.houses.slice(start, end+1);
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
