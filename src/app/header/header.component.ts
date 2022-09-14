import { Component, OnInit } from '@angular/core';
import { MODAL_CLASSES } from '../modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showModal:string = MODAL_CLASSES.notShowModal;
  modalTitle:string = "Como Jogar";
  modalContent: string = "Você tem 6 tentativas para adivinhar a palavra. Após cada tentativa, os blocos irão indicar quão próximo seu palpite está da palavra correta de acordo com a cor de feedback! \nVERDE - Acertou o carectere e sua posição. \nAMARELO - Acertou o caractere mas errou sua posição. \nCINZA - Errou o caractere. \nBom jogo!";

  constructor() { }

  ngOnInit(): void {
  }

  openModal(){
    this.showModal = MODAL_CLASSES.showModal
  }

  closeModal(){
    this.showModal = MODAL_CLASSES.notShowModal
  }
}
