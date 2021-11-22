import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mat-select-search-advanced',
  template: `
  <div>
  <mat-form-field [appearance]="appearance" style="width: 100%;">
      <mat-label>
          {{label}}<span *ngIf="required" style="color: red;">*</span>
      </mat-label>
      <mat-select [formControl]="objectFormControl" [multiple]="multiple" #multiSelect
  (selectionChange)="selectionChange()" (openedChange)="openedChange()">
  <mat-option>
      <ngx-mat-select-search [showToggleAllCheckbox]="showToggleAllCheckbox" (toggleAll)="toggleSelectAll($event)"
          [formControl]="objectMultiFilterCtrl" [toggleAllCheckboxTooltipMessage]="tooltipMessage"
          [toogleAllCheckboxTooltipPosition]="'above'" [toggleAllCheckboxChecked]="isAllSelected"
          [placeholderLabel]="placeholderSearchLabel" [noEntriesFoundLabel]="noEntriesFoundLabel"></ngx-mat-select-search>
  </mat-option>
  <mat-option *ngFor="let obj of filteredObjectsMulti | async;" [value]="obj[indexKey]" (click)="selectOption(obj[indexKey])">
        <span *ngFor="let key of viewKey; let i = index;">
            {{obj[key]}}
            <span *ngIf="i >= 0 && i !== viewKey.length - 1"> - </span>
        </span>
        <mat-divider></mat-divider> 
  </mat-option>
  <mat-select-trigger *ngIf="multiple === true">
      {{isAllSelected ? selectAllViewLabel : objectSelecteds}}
  </mat-select-trigger>
  </mat-select>
  <mat-error>{{catchErrorMessage('objectFormControl')}}
  </mat-error>
  </mat-form-field>
</div>
  `,
  styles: [
  ]
})
export class MatSelectSearchAdvancedComponent<TObject extends object> implements OnInit, AfterViewInit, OnDestroy, OnChanges {
 // Start define variable for mat-select-search***************************************************************
  /** list of objects */
  @Input()
  objects!: TObject[];
  @Input()
  initData!: any;
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
  @Input() multiple = true;
  @Input() disabled = false;
  @Input() messageErrorRequired = 'Không được để trống';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() required = true;
  /** control for the MatSelect filter keyword multi-selection */
  objectSelecteds!: any;
  objectFormControl: FormControl = new FormControl({value:'', disabled: this.disabled}, [Validators.required]);
  objectMultiFilterCtrl: FormControl = new FormControl();
  /** list of objects filtered by search keyword */
  public filteredObjectsMulti: ReplaySubject<TObject[]> = new ReplaySubject<TObject[]>(1);
  @ViewChild('multiSelect', { static: true })
  multiSelect!: MatSelect;

  @Output() listSelected$ = new EventEmitter<any>();
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
      this.objectFormControl.patchValue(this.initData);
    }
    if ('initData' in changes){
      const initData = changes['initData'].currentValue;
      this.initData = initData;
      this.objectSelecteds = this.initData;
      this.objectFormControl.patchValue(this.initData);
      // this.makePreviewValue(this.initData);
    }
    if ('required' in changes){
      const required = changes['required'].currentValue;
      if (required){
        this.objectFormControl.setValidators(Validators.required);
        this.objectFormControl.reset();
      } else {
        this.objectFormControl.removeValidators(Validators.required);
        this.objectFormControl.reset();
      }
    }
  }

  ngOnInit(): void {

     // set initial selection
    this.objectFormControl.patchValue(this.initData);
    this.makePreviewValue(this.initData);
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
          this.objectFormControl.patchValue(val.map(obj => obj[this.indexKey]));
        } else {
          this.isAllSelected = false;
          this.objectFormControl.patchValue([]);
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
    this.objectFormControl.patchValue([]);
  }

  makePreviewValue(listId: any): void {
    // for show Selected value text
    if (this.multiple){
      this.objectSelecteds = this.objects.filter((obj) => listId?.includes(obj[this.indexKey])).map( val => val[this.viewKey[0]]);
    } else {
      this.objectSelecteds = this.objects[listId];
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
    this.compareSelectedAndInitial(this.objectFormControl.value, this.objects);
  }

  openedChange(): void {
    this.selectionChange();
  }
  selectOption(data: any){
    this.optionSelected$.emit(data);
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
    
     this.objectFormControl.valueChanges.subscribe(
        (value) => {
          this.listSelected$.emit(value);
          this.makePreviewValue(value);
        }
      );
  }
  // End Select with search and select all ****************************************************************************

  catchErrorMessage(controlName?: any): string {
    const controls = this;
    if (controlName === 'objectFormControl') {
      const errors = controls.objectFormControl.errors;
      if (errors?.required) {
        return this.messageErrorRequired;
      }
    }
    return '';
  }
}
