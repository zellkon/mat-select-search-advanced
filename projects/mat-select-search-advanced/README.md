<h1 align="center">MAT SELECT SEARCH ADVANCE</h1>

<p align="center">

<img src="https://img.shields.io/badge/create%20by-zellkon-brightgreen" >
</p>

_This project made by  **[ZELLKON](https://zellkon.com)**._

---

# [Github](https://github.com/zellkon/mat-select-search-advanced)

<p align="center">
<img src="https://media.giphy.com/media/OgaVPvsW91Z2nR1lTX/giphy.gif">
</p>

## [NPM Package](https://www.npmjs.com/package/mat-select-search-advanced)



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
<mat-select-search-advanced 
        [objects]="array" indexKey="id" 
        [viewKey]="['name']" 
        [searchProperties]="['name', 'age']"
        [initData] = "initArray"
        placeholderSearchLabel="Search by name" 
        label="List Animal" 
        messageErrorRequired="You need select some thing"
        noEntriesFoundLabel="Found nothing" 
        tooltipMessage="Select all / Deselect all" 
        selectAllViewLabel="All animal"
        [required] = "true"
        (optionSelect$)="getOptionSelected($event)"
        (listSelected$)="getListSelected($event)">
    </mat-select-search-advanced>
```

**This code is just a sample**

## Properties - Config Mat-select-search-advance
### objects and initData (this is your array and init array)
```js
// if you wana change array
this.array = newArray.slice();
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
### initData (init data in edit mode, example: id value)
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
## appearance ('outline' | 'fill' | ...)
```html
 appearance="outline"
```
## Same for other attributes
