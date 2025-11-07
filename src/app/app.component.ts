// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent {
//   answer: string = '';
//   keys: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//   addKey(key: string) {
//     this.answer += key;
//   }

//   backspace() {
//     this.answer = this.answer.slice(0, -1);
//   }

//   submitAnswer() {
//     alert('Submitted: ' + this.answer);
//     // You can add your actual logic here
//   }
// }


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
//   standalone: true,
// })
// export class AppComponent {
//   constructor() {}
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}
}


