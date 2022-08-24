import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-input-component',
  templateUrl: './text-input-component.component.html',
  styleUrls: ['./text-input-component.component.css']
})
export class TextInputComponentComponent implements OnInit {

  @Input() public label: string = ''
  @Input() public inputType: string = ''
  @Input() public placeHolder: string = ''
  @Input() public formControlName: string = ''
  @Input() public validationName: string = ''
  @Input() public multiValidation: string = ''
  @Input() public errorMessage: string = ''
  @Input() public getValidationStatus: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
