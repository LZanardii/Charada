import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';

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

  formatedContent: string[] = []

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(change: SimpleChange){
    this.formatedContent = this.modalContentInput.split("\n")
  }

  onClose(){
    this.showModalFeedback.emit(MODAL_CLASSES.notShowModal);
  }

  validSentence(string: string){
    if (string.length > 0){
      return true
    }
    return false
  }
}
