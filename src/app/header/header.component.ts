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
  modalContent: string = "Você tem 6 tentativas para adivinhar a palavra. Após cada tentativa, os blocos irão indicar quão próximo seu palpite está da palavra correta. Atenção: acentos serão preenchidos automaticamente.";

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
