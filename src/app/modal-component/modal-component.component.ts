import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})

export class ModalComponentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponentComponent>) { }

  ngOnInit(): void {
  }

  // When the user clicks the action button a.k.a. the done button in the\
  // modal, show an alert and followed by the closing of the modal
  actionFunction() {
    alert("Successfully Edited.");
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

}