import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  sendUserInput(userIn: string): void {
    const url: string = 'localhost:8000';
    // Makes request to backend for results
    
  }
}
