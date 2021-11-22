import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lib-mat-select-search-advanced',
  template: `
  <div>
  <mat-form-field [appearance]="appearance" style="width: 100%;">
      <mat-label>
          {{label}}
      </mat-label>
<mat-select [formControl]="formControlName" [multiple]="multiple" #multiSelect
  (selectionChange)="selectionChange()" (openedChange)="openedChange()">
  <mat-option>
      <ngx-mat-select-search [showToggleAllCheckbox]="showToggleAllCheckbox" (toggleAll)="toggleSelectAll($event)"
          [formControl]="objectMultiFilterCtrl" [toggleAllCheckboxTooltipMessage]="tooltipMessage"
          [toogleAllCheckboxTooltipPosition]="'above'" [toggleAllCheckboxChecked]="isAllSelected"
          [placeholderLabel]="placeholderSearchLabel" [noEntriesFoundLabel]="noEntriesFoundLabel"></ngx-mat-select-search>
  </mat-option>
  <mat-option *ngFor="let obj of filteredObjectsMulti | async;" [value]="obj[indexKey]" (change)="selectOption($event)">
        <span *ngFor="let key of viewKey; let i = index;">
            {{obj[key]}}
            <span *ngIf="i >= 0 && i !== viewKey.length - 1"> - </span>
        </span>
        <mat-divider></mat-divider>     
  </mat-option>
  <mat-select-trigger *ngIf="multiple === true">
      {{isAllSelected ? selectAllViewLabel : makePreviewValue(formControlName.value)}}
  </mat-select-trigger>
  </mat-select>
  <mat-error>{{catchErrorMessage('formControlName')}}
  </mat-error>
  </mat-form-field>
</div>

  `,
  styles: [
  ]
})
export class MatSelectSearchAdvancedComponent<TObject extends object> implements OnInit, AfterViewInit, OnDestroy {
   // Start define variable for mat-select-search***************************************************************
  /** list of objects */
  @Input()
  objects!: TObject[];
  @Input()
  initDataSingle!: any;
  @Input()
  initDataMultiple!: any[];
  @Input()
  searchProperties: (keyof TObject)[] = [];
  @Input()
  indexKey!: keyof TObject;
  @Input()
  viewKey!: (keyof TObject)[];
  @Input() tooltipMessage = 'Chọn tất cả / Bỏ chọn tất cả';
  @Input() placeholderSearchLabel = 'Tìm kiếm';
  @Input() noEntriesFoundLabel = 'Không tìm thấy kết quả nào';
  @Input() label = '';
  @Input() selectAllViewLabel = 'Tất cả';
  @Input() showToggleAllCheckbox = true;
  @Input()
  multiple!: boolean;
  @Input() disabled = false;
  @Input() messageErrorRequired = 'Không được để trống';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  // @Input() required = true;
  /** control for the MatSelect filter keyword multi-selection */
  objectSelecteds!: any;
  @Input()
  formControlName!: FormControl;
  objectMultiFilterCtrl: FormControl = new FormControl();
  /** list of objects filtered by search keyword */
  public filteredObjectsMulti: ReplaySubject<TObject[]> = new ReplaySubject<TObject[]>(1);
  @ViewChild('multiSelect', { static: true })
  multiSelect!: MatSelect;
  @Output() optionSelected$ = new EventEmitter<any>();
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  isAllSelected = false;
  // End define variable for mat-select-search*****************************************************************
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if ('objects' in changes){
      const objects = changes['objects'].currentValue;
      this.objects = objects;
      this.filteredObjectsMulti.next(this.objects.slice());
    }
  }

  ngOnInit(): void {

     // set initial selection
     if (this.multiple){
      this.formControlName.patchValue(this.initDataMultiple);
     } else {
      this.formControlName.patchValue(this.initDataSingle);
     }
    this.initSelect();
  }

  // Select with search and select all ****************************************************************************

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean): void {
    this.filteredObjectsMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {
        // console.log(val);
        if (selectAllValue) {
          this.isAllSelected = true;
          this.formControlName.patchValue(val.map(obj => obj[this.indexKey]));
        } else {
          this.isAllSelected = false;
          this.formControlName.patchValue([]);
        }
      });
  }

  protected filterObjectsMulti(): void {
    if (!this.objects) {
      return;
    }
    // get the search keyword
    let search = this.objectMultiFilterCtrl.value;
    if (!search) {
      this.filteredObjectsMulti.next(this.objects.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the objects with code
    this.filteredObjectsMulti.next(
      this.objects.filter(object => String(object[this.searchProperties[0]]).toLowerCase().indexOf(search) > -1
      || String(object[this.searchProperties[1]]).toLowerCase().indexOf(search) > -1
      || String(object[this.searchProperties[2]]).toLowerCase().indexOf(search) > -1
      || String(object[this.searchProperties[3]]).toLowerCase().indexOf(search) > -1
      || String(object[this.searchProperties[4]]).toLowerCase().indexOf(search) > -1
      )
      );
  }

  clearAllSelected() {
    this.isAllSelected = false;
    this.formControlName.patchValue([]);
  }

  makePreviewValue(id: any): any {
    // for show Selected value text
    if (this.multiple){
      return this.objects.filter((obj) => id?.includes(obj[this.indexKey])).map( val => val[this.viewKey[0]]);
    } else {
     return this.objects[id];
    }
  }

  compareSelectedAndInitial(selectedArray: any, initalArray: any): void {
    if (selectedArray && initalArray) {
      if (selectedArray?.length !== initalArray?.length) {
        this.isAllSelected = false;
      }
      else {
        this.isAllSelected = true;
      }
    }
  }
  selectionChange(): void {
    this.compareSelectedAndInitial(this.formControlName.value, this.objects);
  }

  openedChange(): void {
    // this.selectionChange();
  }
  selectOption(data: any){
    this.optionSelected$.emit({value: data});
  }

  initSelect(): void {
    // load the initial object list
    this.filteredObjectsMulti.next(this.objects.slice());
    // listen for search field value changes
    this.objectMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((value) => {
        if (value) {
          this.clearAllSelected();
        }
        this.filterObjectsMulti();
      });
  }
  // End Select with search and select all ****************************************************************************

  catchErrorMessage(controlName?: any): string {
    const controls = this;
    if (controlName === 'formControlName') {
      const errors = controls.formControlName.errors;
      if (errors?.required) {
        return this.messageErrorRequired;
      }
    }
    return '';
  }
}
