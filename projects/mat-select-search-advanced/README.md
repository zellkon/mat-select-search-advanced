<h1 align="center">MAT SELECT SEARCH ADVANCE</h1>

<p align="center">

<img src="https://img.shields.io/badge/create%20by-zellkon-brightgreen" >

<img src="https://img.shields.io/badge/version-0.1.7-blue">
</p>

_A This project made by the **[ZELLKON](https://zellkon.com)**._

---

# [Github](https://github.com/zellkon/mat-select-search-advanced)

<p align="center">
<img src="https://media.giphy.com/media/OgaVPvsW91Z2nR1lTX/giphy.gif">
</p>

## [NPM Package](https://www.npmjs.com/package/mat-select-search-advanced)
## [Base ngx-mat-select-search](https://www.npmjs.com/package/ngx-mat-select-search)



# Installation

`npm i mat-select-search-advanced`

# How to use

## Implement
### Import MatSelectSearchAdvancedModule into your module
```
import { MatSelectSearchAdvancedModule } from 'mat-select-search-advanced';
```
### Add Module
```
@NgModule({
  imports: [
    ...
    MatSelectSearchAdvancedModule
  ],
  declarations: [	
    AppComponent,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### Use library in your component
```html
<lib-mat-select-search-advanced 
        [objects]="getObject()" indexKey="id" 
        [viewKey]="['name']" 
        [searchProperties]="['name', 'age']"
        [initData] = "listId"
        placeholderSearchLabel="Search by name" 
        label="List Animal" 
        messageErrorRequired="You need select some thing"
        noEntriesFoundLabel="Found nothing" 
        tooltipMessage="Select all / Deselect all" 
        selectAllViewLabel="All animal"
        (listSelected$)="getListSelected($event)">
    </lib-mat-select-search-advanced>
```

**This code is just a sample**

## Properties - Config Mat-select-search-advance
### objects (this is your Observable array)
#### Convert array to Observable array
```js
import { Observable, of } from 'rxjs';
  getObject(){
  return of(yourArray)
}
```
#### Accept Subject and RelaySubject or BehaviorSubject
```js
// if you need change value realtime just use Subject
observableArray: Subject<any[]> = new ReplaySubject<any[]>(1);

// change value observableArray
observableArray.next(newData);
```

### indexKey (this is your index your object, example: id)
```html
  indexKey="id" 
```
### viewKey (custom view value in mat-select)
```html
 [viewKey]="['name', 'age']"
```
### searchProperties (list key of object for search)
```html
 [searchProperties]="['name']"
```
### showToggleAllCheckbox (true or false)
```html
  [showToggleAllCheckbox]="true"
```
##### or
```html
 [searchProperties]="['name','age',...]"
```
### placeholderSearchLabel (lable on search input)
```html
 placeholderSearchLabel="Search by name" 
```
### initData (init data in edit mode, example: listId=[1,2,3] || id = 1)
```html
 [initData]="listId" 
```
##### or
```html
 [initData]="1" 
```
### multiple (true or false)
```html
 [multiple]="false"
```
### disabled (true or false)
```html
 [disabled]="false"
```
## listSelected$ (result)
```html
 (listSelected$)="getListSelected($event)"
```
### create function getListSelected in your component.ts
```js
 getListSelected(result: any){
    console.log(result);
  }
```
### create function toggleAll in your component.ts
```js
 getToggleAll(result){
    console.log(result);
  }
```

## Same for other attributes
