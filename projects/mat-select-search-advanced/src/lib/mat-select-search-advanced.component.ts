import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lib-mat-select-search-advanced',
  template: `
  <div [formGroup]="selectForm" >
  <mat-form-field appearance="outline" style="width: 100%;">
      <mat-label>
          {{label}}
      </mat-label>
      <mat-select formControlName="objectFormControl" [multiple]="multiple" #multiSelect
  (selectionChange)="selectionChange()" (openedChange)="openedChange()">
  <mat-option>
      <ngx-mat-select-search [showToggleAllCheckbox]="showToggleAllCheckbox" (toggleAll)="toggleSelectAll($event)"
          formControlName="objectMultiFilterCtrl" [toggleAllCheckboxTooltipMessage]="tooltipMessage"
          [toogleAllCheckboxTooltipPosition]="'above'" [toggleAllCheckboxChecked]="isAllSelected"
          [placeholderLabel]="placeholderSearchLabel" [noEntriesFoundLabel]="noEntriesFoundLabel"></ngx-mat-select-search>
  </mat-option>
  <mat-option *ngFor="let obj of filteredObjectsMulti | async;" [value]="obj[indexKey]">
          <span>
              {{obj[viewKey]}}
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
export class MatSelectSearchAdvancedComponent<TObject extends object> implements OnInit, AfterViewInit, OnDestroy {
  // Start define variable for mat-select-search***************************************************************
  /** list of objects */
  @Input()
  objects!: Observable<TObject[]>;
  @Input()
  searchProperties: (keyof TObject)[] = [];
  @Input()
  indexKey!: keyof TObject;
  @Input()
  viewKey!: keyof TObject;
  @Input() tooltipMessage = 'Chọn tất cả / Bỏ chọn tất cả';
  @Input() placeholderSearchLabel = 'Tìm kiếm';
  @Input() noEntriesFoundLabel = 'Không tìm thấy kết quả nào';
  @Input() label = 'Lựa chọn';
  @Input() selectAllViewLabel = 'Tất cả';
  @Input() showToggleAllCheckbox = true;
  @Input() multiple = true;
  @Input() messageErrorRequired = 'Không được để trống';
  /** control for the MatSelect filter keyword multi-selection */
  objectSelecteds!: any;
  selectForm!: FormGroup;
  /** list of objects filtered by search keyword */
  public filteredObjectsMulti: ReplaySubject<TObject[]> = new ReplaySubject<TObject[]>(1);
  @ViewChild('multiSelect', { static: true })
  multiSelect!: MatSelect;

  @Output() listSelected$ = new EventEmitter();
  /** Subject that emits when the component has been destroyed. */
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  isAllSelected = false;
  // End define variable for mat-select-search*****************************************************************
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.selectForm = this.fb.group({
      objectFormControl: ['', [Validators.required]],
      objectMultiFilterCtrl: [],
    });
    this.initSelect();
  }

  // Select with search and select all ****************************************************************************

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  // tslint:disable-next-line:typedef
  toggleSelectAll(selectAllValue: boolean) {
    this.filteredObjectsMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {
        // console.log(val);
        if (selectAllValue) {
          this.isAllSelected = true;
          this.selectForm.controls.objectFormControl.patchValue(val.map(obj => obj[this.indexKey]));
        } else {
          this.isAllSelected = false;
          this.selectForm.controls.objectFormControl.patchValue([]);
        }
      });
  }

  // tslint:disable-next-line:typedef
  protected filterObjectsMulti() {
    if (!this.objects) {
      return;
    }
    // get the search keyword
    let search = this.selectForm.controls.objectMultiFilterCtrl.value;
    if (!search) {
      this.objects.subscribe(data => {
        this.filteredObjectsMulti.next(data.slice());
      });
      // this.filteredObjectsMulti.next(this.objects.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the objects with code
    this.objects.pipe(map(o => o.filter(object => String(object[this.searchProperties[0]]).toLowerCase().indexOf(search) > -1
      || String(object[this.searchProperties[1]]).toLowerCase().indexOf(search) > -1
      || String(object[this.searchProperties[2]]).toLowerCase().indexOf(search) > -1)))
      .subscribe(data => {
        this.filteredObjectsMulti.next(data.slice());
      });
  }

  // tslint:disable-next-line:typedef
  clearAllSelected() {
    this.isAllSelected = false;
    this.selectForm.controls.objectFormControl.setValue([]);
  }

  // tslint:disable-next-line:typedef
  makePreviewValue() {
    // for show Selected value text
    this.selectForm.controls.objectFormControl.valueChanges.subscribe(
      (value) => {
        // console.log(value);
        this.listSelected$.emit(value);
        if (this.multiple){
          this.objects.pipe(map(o => o.filter((obj) => value.includes(obj[this.indexKey])))).subscribe(data => {
            this.objectSelecteds = data.map( val => val[this.viewKey]);
          });
        } else {
          this.objects.subscribe(data => {
            this.objectSelecteds = data[value];
          });
        }
      }
    );
  }

  // tslint:disable-next-line:typedef
  compareSelectedAndInitial(selectedArray: any, initalArray: any) {
    // console.log(selectedArray);
    // console.log(initalArray);
    if (selectedArray && initalArray) {
      if (selectedArray?.length !== initalArray?.length) {
        this.isAllSelected = false;
      }
      else {
        this.isAllSelected = true;
      }
    }
  }
  // tslint:disable-next-line:typedef
  selectionChange() {
    this.objects.subscribe(data => {
      this.compareSelectedAndInitial(this.selectForm.controls.objectFormControl.value, data);
    });
  }

  // tslint:disable-next-line:typedef
  openedChange() {
    this.selectionChange();
  }

  // tslint:disable-next-line:typedef
  initSelect() {
    // load the initial object list
    this.objects.subscribe(data => {
      this.filteredObjectsMulti.next(data.slice());
    });

    // listen for search field value changes
    this.selectForm.controls.objectMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((value) => {
        if (value) {
          this.clearAllSelected();
        }
        this.filterObjectsMulti();
      });
    this.makePreviewValue();
  }
  // End Select with search and select all ****************************************************************************

  catchErrorMessage(controlName?: any): string {
    const controls = this.selectForm.controls;
    if (controlName === 'objectFormControl') {
      const errors = controls.objectFormControl.errors;
      if (errors?.required) {
        return this.messageErrorRequired;
      }
    }
    return '';
  }
}
