import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAlphabetLetter, ILetter } from 'src/utils/ILetter';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  @Input()
  letterInput: string = ""

  @Input()
  classInput: string = ""

  @Output()
  insertLetter = new EventEmitter<string>()

  @Output()
  deleteLetter = new EventEmitter<string>()

  @Output()
  validateWord = new EventEmitter<string>()

  alphabet: IAlphabetLetter[][] = [
    [
      { value: 'Q', class: "notMatch", click: "sendLetter" },
      { value: 'W', class: "notMatch", click: "sendLetter" },
      { value: 'E', class: "notMatch", click: "sendLetter" },
      { value: 'R', class: "notMatch", click: "sendLetter" },
      { value: 'T', class: "notMatch", click: "sendLetter" },
      { value: 'Y', class: "notMatch", click: "sendLetter" },
      { value: 'U', class: "notMatch", click: "sendLetter" },
      { value: 'I', class: "notMatch", click: "sendLetter" },
      { value: 'O', class: "notMatch", click: "sendLetter" },
      { value: 'P', class: "notMatch", click: "sendLetter" }
    ],
    [
      { value: 'A', class: "notMatch", click: "sendLetter" },
      { value: 'S', class: "notMatch", click: "sendLetter" },
      { value: 'D', class: "notMatch", click: "sendLetter" },
      { value: 'F', class: "notMatch", click: "sendLetter" },
      { value: 'G', class: "notMatch", click: "sendLetter" },
      { value: 'H', class: "notMatch", click: "sendLetter" },
      { value: 'J', class: "notMatch", click: "sendLetter" },
      { value: 'K', class: "notMatch", click: "sendLetter" },
      { value: 'L', class: "notMatch", click: "sendLetter" },
      { value: 'Ç', class: "notMatch", click: "sendLetter" },
      { value: 'showImage', class: "notMatch", click: "deleteLeter" }
    ],
    [
      { value: 'Z', class: "notMatch", click: "sendLetter" },
      { value: 'X', class: "notMatch", click: "sendLetter" },
      { value: 'C', class: "notMatch", click: "sendLetter" },
      { value: 'V', class: "notMatch", click: "sendLetter" },
      { value: 'B', class: "notMatch", click: "sendLetter" },
      { value: 'N', class: "notMatch", click: "sendLetter" },
      { value: 'M', class: "notMatch", click: "sendLetter" },
      { value: 'Enter', class: "notMatch", click: "validateWord" }
    ]
  ]

  constructor() {}

  ngOnInit(): void {
  }

  updateLetter(){
    this.alphabet.forEach((row) => {
      row.forEach((letter) => {
        if (letter.value === this.letterInput){
          letter.class = this.classInput
        }
      })
    })
  }

  manipulateLetterMethod(value: string, click?: string){
    if (click === "sendLetter"){
      this.insertLetter.emit(value);
    }else if (click === "deleteLeter"){
      this.deleteLetter.emit(value);
    }else if (click === "validateWord"){
      this.validateWord.emit(value);
    }
  }
  
  showImage(value: string){
    if (value === "showImage"){
      return true
    } else {
      return false
    }
  }
}
