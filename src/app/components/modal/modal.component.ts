import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  @Input() title:string = '';
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>()
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>()

  pressCancel(){
    this.onCancel.emit();
  }

  pressConfirm(){
    this.onConfirm.emit();
  }

}
