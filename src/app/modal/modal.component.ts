import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export const MODAL_CLASSES = {
  notShowModal: "notShowModal",
  showModal: "showModal"
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  showModalInput: string = MODAL_CLASSES.notShowModal

  @Input()
  modalTitleInput: string = ""
  
  @Input()
  modalContentInput: string = ""

  @Output()
  showModalFeedback = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.showModalFeedback.emit(MODAL_CLASSES.notShowModal);
  }
}
