import { NgModule } from '@angular/core';
import { MatSelectSearchAdvancedComponent } from './mat-select-search-advanced.component';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MatSelectSearchAdvancedComponent
  ],
  imports: [
    CommonModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatSelectSearchAdvancedComponent
  ]
})
export class MatSelectSearchAdvancedModule { }
