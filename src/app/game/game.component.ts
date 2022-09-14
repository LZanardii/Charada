import { Component, OnInit } from '@angular/core';
import { ILetter } from 'src/utils/ILetter';
import { MODAL_CLASSES } from '../modal/modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  dbOfWords: string[] = ["urubu", "arroz", "artes", "carne", "amora", "dente"]
  finalWorld = "";
  currentFinalWord = ""
  showModal = MODAL_CLASSES.notShowModal
  modalTitle = ""
  modalContent = ""
  gameEnded: boolean = false
  matrixOfLetters: ILetter[][] = [];
  couterRows: number = 0;
  couterLetters: number = 0;

  keyboardFeedback: ILetter[] = []

  constructor() {
    this.finalWorld = this.dbOfWords[this.getRandomInt(0, 5)]
    this.currentFinalWord = this.finalWorld
    this.initMatrix()
    console.log(this.finalWorld)
  }

  ngOnInit(): void {
  }

  insertLetter(innetHmtl: string) {
    if (this.couterLetters === 5) {
      this.openModal("Palavra completa!", "Você já selecionou as 5 letras... clique em 'Enter' para verificar.")
    } else if (this.couterLetters < 5) {
      this.matrixOfLetters[this.couterRows][this.couterLetters].value = innetHmtl;
      this.matrixOfLetters[this.couterRows][this.couterLetters].class = "imputed";
      this.couterLetters += 1;
    }
  }

  deleteLetter() {
    if (this.couterLetters != 0) {
      this.couterLetters -= 1;
      this.matrixOfLetters[this.couterRows][this.couterLetters].value = "";
      this.matrixOfLetters[this.couterRows][this.couterLetters].class = "notImputed";
    } else {
      this.openModal("Cuidado!", "Insira ao menos uma letra para poder apagar!")
    }
  }

  validateWord() {
    if (this.couterLetters < 5) {
      this.openModal("Cuidado!", "A palavra deve conter exatamente 5 letras")
    } else if (this.couterLetters === 5) {
      let keyboardFeedbackHelper: ILetter[] = []
      this.matrixOfLetters[this.couterRows].forEach((letter, index) => {
        this.matrixOfLetters[this.couterRows][index] = this.validateLetter(letter.value, index);
        keyboardFeedbackHelper.push(this.matrixOfLetters[this.couterRows][index])
      })
      this.keyboardFeedback = keyboardFeedbackHelper
      this.couterRows += 1;
      this.couterLetters = 0;
      if (this.couterRows === 6 && this.validateWinner(this.matrixOfLetters[this.couterRows - 1]) === false) {
        this.gameEnded = true
        this.openModal(`Fim de jogo!`, `A palavra correta era ${this.finalWorld}... Mas não se preocupe, já estamos preparando um novo jogo para você.\n`)
      } else if (this.validateWinner(this.matrixOfLetters[this.couterRows - 1])) {
        this.gameEnded = true
        this.openModal("Parabéns!", "Você acertou a palavra e completou o jogo... \nBora jogar mais uma? Já estamos preparando uma palavra difícil para você!")
      } else {
        this.openModal("Ops!", `Você ainda não acertou, mas não se preocupe, ainda faltam ${6 - this.couterRows} tentativas... Continue tentando!\n`)
      }
    }
  }

  validateLetter(letter: string, index: number): ILetter {
    if (this.finalWorld[index].toUpperCase() === letter) {
      this.currentFinalWord = this.replaceByIndex(this.currentFinalWord, index, "-")
      return { value: letter, class: "right" }
    } else if (this.currentFinalWord.toUpperCase().search(letter) !== -1) {
      return { value: letter, class: "warning" }
    } else {
      return { value: letter, class: "wrong" }
    }
  }

  validateWinner(array: ILetter[]): boolean {
    let counter = 0;
    array.forEach((letter) => {
      if (letter.class === "right") {
        counter += 1;
      }
    })
    return counter === 5;
  }

  initMatrix(){
    this.matrixOfLetters = [
      [{ value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }],
      [{ value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }],
      [{ value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }],
      [{ value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }],
      [{ value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }],
      [{ value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }, { value: "", class: "notImputed" }],
    ]
  }

  openModal(title: string, content: string){
    this.modalTitle = title
    this.modalContent = content
    this.showModal = MODAL_CLASSES.showModal
  }

  closeModal(){
    if (this.gameEnded){
      window.location.reload()
    }
    this.showModal = MODAL_CLASSES.notShowModal
    this.modalTitle = ""
    this.modalContent = ""
  }

  getRandomInt(min: number, max: number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  replaceByIndex(str: string, index: number, replacement: string) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
  }

}
