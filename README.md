<h1 align="center">MAT SELECT SEARCH ADVANCE</h1>

<p align="center">

<img src="https://img.shields.io/badge/create%20by-zellkon-brightgreen" >

<img src="https://img.shields.io/badge/version-0.0.3-orange">
</p>

_A This project made by the **[ZELLKON](https://zellkon.com)** team._

---

Base on **[ngx-mat-select-search](https://www.npmjs.com/package/ngx-mat-select-search)**.

# [Project a demo](https://github.com/zellkon/mat-select-search-custom)

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
<lib-mat-select-search-advanced 
        [objects]="getObject()" indexKey="id" 
        viewKey="name" 
        [searchProperties]="['name']"
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

### indexKey (this is your index your object, example: id)
```html
  indexKey="id" 
```
### viewKey (custom view value in mat-select)
```html
 viewKey="name"
```
### searchProperties (list key of object for search)
```html
 [searchProperties]="['name']"
```
##### or
```html
 [searchProperties]="['name','age',...]"
```
### placeholderSearchLabel (lable on search input)
```html
 placeholderSearchLabel="Search by name" 
```
### multiple (true or false)
```html
 [multiple]="false"
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

##Same for other attributes
