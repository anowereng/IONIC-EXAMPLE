import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetpostService {
dataList:any;   isDataEnd:boolean=false;
  constructor(private http: HttpClient) {this.getAllRegister() }

  items = [];
  count: number = 0;

  getAllRegister() {
    this.http.get('http://localhost:5000/api/login/GetUser').subscribe(response => {
      this.dataList= response;
      for (let i = 0; i < 20; i++) {  // here you can limit the items according to your needs.
        this.items.push(this.dataList[this.count]);   // your JSON data which you want to display
        this.count++ //i am using a count variable to keep track of inserted records to avoid inserting duplicate records on infinite scroll
      }
    }, error => {
      console.log(error);
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {

   
    	if(this.isDataEnd!=true)
        for (let i = 0; i < 5; i++) {   
          this.items.push(this.dataList[this.count]); // this will start pushing next 5 items
          this.count++
        }
        if(this.items.length>=this.dataList.length){
          this.isDataEnd=true;
        }
      infiniteScroll.target.complete();
    }, 500);
  }

}
