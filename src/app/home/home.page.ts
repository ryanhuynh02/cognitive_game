import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgIf,
    NgFor
  ]
})
export class HomePage {
  activeGame: 'math' | 'color' = 'math';
  tryCount = 0;
  showingNumbers = true;            // still in “remember” phase
  numberSequence: number[] = [];    // two random numbers
  currentNumberIndex = 0;           // which one to show

  question = '';
  correctAnswer = 0;
  answer = '';

  // Color Sequence Game
  colors          = ['black','white','red','green','yellow','blue','brown','orange','pink','purple'];
  colorSequence  : string[] = [];
  showingColors  = true;
  shuffledOptions: string[] = [];
  currentColorIndex = 0;
  selectedAnswers: string[] = [];

  removeLastColor() {
    this.selectedAnswers.pop();
  }
  
  constructor(
    private alertCtrl: AlertController,
  ){
    this.startMathSequence();
  }

  switchGame(game: 'math' | 'color'){
    this.activeGame = game;
    if(game==='math'){
      this.startMathSequence();
    } else {
      this.startColorSequenceGame();
    }
  }

  //  Math Logic 
  mathOperator: '+' | '-' = '+';
  startMathSequence() {
    // pick the first number anywhere from 0 to 9
  const first = this.getRandomInt(0, 9);
  // pick the second number from 0 up to 'first'
  const second = this.getRandomInt(0, 9);

  if (Math.random() < 0.5) {
    this.mathOperator = '+';
    this.numberSequence = [first, second];
  } else {
    this.mathOperator = '-';
    const big = Math.max(first, second), small = Math.min(first, second);
    this.numberSequence = [ big, small ];
  }

  this.currentNumberIndex  = 0;
  this.showingNumbers      = true;
  this.answer              = '';
  this.tryCount            = 0; // reset when a new math problem
  }

  nextMath() {
  if (this.currentNumberIndex < this.numberSequence.length - 1) {
    // show the second number
    this.currentNumberIndex++;
  } else {
    // both shown → build the question
    const [x, y] = this.numberSequence;
    if (this.mathOperator === '+') {
      this.question      = `What is the SUM?`;
      this.correctAnswer = x + y;
    } else {
      this.question      = `What is DIFFERENCE?`;
      this.correctAnswer = x - y;
    }

    this.showingNumbers = false;
  }
}


  addKey(k:string){ this.answer += k; }
  backspace(){ this.answer = this.answer.slice(0,-1); }

  async submitAnswer(){
    const ua = parseInt(this.answer,10);
    const [x,y] = this.numberSequence;
    // alert(ua===this.correctAnswer
    //   ? 'Correct!'
    //   : `Incorrect. Answer: ${this.correctAnswer}`);
    // this.startMathSequence();

    if (ua == this.correctAnswer) {
      await this.showIonicAlert('Correct', 'Great job');
      this.startMathSequence();
    } else if (this.tryCount == 0) {
      //first wrong try -> give them one more shot
      this.tryCount ++;
      this.answer = ''; //clear their input

      //re-compose the same question text:
      const q = this.mathOperator === '+'
                ? `What is the SUM of ${x} and ${y}?`
                : `What is the DIFFERENCE of ${x} and ${y}?`;
      await this.showIonicAlert('Try again', q);
    } else {
      // second wrong try -> show the real answer and move to the next question
      await this.showIonicAlert(
        'Incorrect',
        `Sorry—the right answer was ${this.correctAnswer}.`
      );
      this.startMathSequence();
    }

  }

    private async showIonicAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [ 'OK' ],
      cssClass: 'big-alert'
    });
    await alert.present();
  }


  // Color Sequence Logic
  startColorSequenceGame(){
    const count = 3;  // always show exactly 3 colors
    this.colorSequence  = this.shuffle(this.colors).slice(0,count);
    this.showingColors  = true;
    this.currentColorIndex = 0;
    this.selectedAnswers = [];
    this.shuffledOptions = [];
  }

  nextColor(){
    if(this.currentColorIndex < this.colorSequence.length-1){
      this.currentColorIndex++;
    } else {
      this.showingColors = false;
      this.shuffledOptions = this.shuffle(this.colors);
    }
  }

  get currentColor(){ return this.colorSequence[this.currentColorIndex]; }

  selectColor(c:string){
    if (this.selectedAnswers.length < this.colorSequence.length) {
      this.selectedAnswers.push(c);
    }
  }



  submitColorSequence(){
    const ok = JSON.stringify(this.selectedAnswers) === JSON.stringify(this.colorSequence);
    // alert(ok
    //   ? 'Correct!'
    //   : `Wrong – sequence was: ${this.colorSequence.join(', ')}`);
    // this.startColorSequenceGame();

    this.showIonicAlert(
      ok ? 'Correct' : 'Incorrect',
      ok
        ? 'Great job!'
        : `Sequence was: ${this.colorSequence.join(', ')}`
    );
    this.startColorSequenceGame();
  }

  // Helpers
  shuffle(arr:string[]){
    return [...arr].sort(()=>Math.random()-0.5);
  }
  chunkColors(list:string[]):string[][]{
    const out:string[][]=[];
    for(let i=0;i<list.length;i+=3){
      out.push(list.slice(i,i+3));
    }
    return out;
  }
  getRandomInt(min:number,max:number){
    return Math.floor(Math.random()*(max-min+1))+min;
  }
}
