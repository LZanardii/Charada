import { Component, OnInit } from '@angular/core';
import { MODAL_CLASSES } from '../modal/modal.component';

interface letter {
  value: string
  class: string
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  dbOfWords: string[] = ["urubu", "arroz", "artes", "carne", "amora", "dente"]
  finalWorld = "";
  showModal = MODAL_CLASSES.notShowModal
  modalTitle = ""
  modalContent = ""
  gameEnded: boolean = false
  matrixOfLetters: letter[][] = [];
  couterRows: number = 0;
  couterLetters: number = 0;

  constructor() {
    this.finalWorld = this.dbOfWords[this.getRandomInt(0, 5)]
    this.initMatrix()
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
      this.matrixOfLetters[this.couterRows].forEach((letter, index) => {
        this.matrixOfLetters[this.couterRows][index] = this.validateLetter(letter.value, index);
        this.getBoardLetter(letter.value)
      })
      this.couterRows += 1;
      this.couterLetters = 0;
      if (this.couterRows === 6 && this.validateWinner(this.matrixOfLetters[this.couterRows - 1]) === false) {
        this.gameEnded = true
        this.openModal(`Fim de jogo!`, `A palavra correta era ${this.finalWorld}... Mas não se preocupe, já estamos preparando um nogo jogo para você.`)
      } else if (this.validateWinner(this.matrixOfLetters[this.couterRows - 1])) {
        this.gameEnded = true
        this.openModal("Parabéns!", "Você acertou a palavra e completou o jogo... Bora jogar mais uma? Já estamos preparando uma palavra difícil para você!")
      } else {
        this.openModal("Ops!", `Você ainda não acertou, mas não se preocupe, ainda faltam ${6 - this.couterRows} tentativas... continue tentando!`)
      }
    }
  }

  validateLetter(letter: string, index: number): letter {
    if (this.finalWorld[index].toUpperCase() === letter) {
      return { value: letter, class: "right" }
    } else if (this.finalWorld.toUpperCase().search(letter) !== -1) {
      return { value: letter, class: "warning" }
    } else {
      return { value: letter, class: "wrong" }
    }
  }

  validateWinner(array: letter[]): boolean {
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

  getBoardLetter(id: string){
    console.log(document.getElementById(id))
  }
}
