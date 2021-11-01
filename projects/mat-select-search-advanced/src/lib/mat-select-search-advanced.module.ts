import { NgModule } from '@angular/core';
import { MatSelectSearchAdvancedComponent } from './mat-select-search-advanced.component';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

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
    ReactiveFormsModule,
    MatDividerModule
  ],
  exports: [
    MatSelectSearchAdvancedComponent
  ]
})
export class MatSelectSearchAdvancedModule { }
