import { Component, OnInit,ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetpostService } from 'src/app/services/getpost.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-get-post',
  templateUrl: './get-post.page.html',
  styleUrls: ['./get-post.page.scss'],
})
export class GetPostPage implements OnInit {
  public  userData: any;  searchTerm : string="";
  defaultSelectedRadio = "new";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any='old';

  constructor(public dataService: GetpostService,private http: HttpClient) {
    // this.dataService.getAllRegister();
    // console.log(this.dataService.dataList)

   
   }

  ngOnInit() {
  
  }



  // getAllRegister() {
  //   this.http.get('http://localhost:5000/api/login/GetUser').subscribe(response => {
  //     this.userData=response;
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  searchData(title: string): Observable<any> {
    return this.userData.filter(x=>x.UserName==title
      
    );
  }
  searchChanged() {
    // Call our service function which returns an Observable
    this.userData = this.searchData(this.searchTerm);
    console.log(this.userData);
  }

  // loadData(event) {
    
  //   setTimeout(() => {
    
  //     for (let i = 0; i < 10; i++) { 
  //       this.dataService.dataList.push("Item number "+(this.dataService.dataList+1));
  //     }
  //     //Hide Infinite List Loader on Complete
  //     event.target.complete();
  //   }, 500);
  // }
  // setFilteredItems() {

  //   this.userData = this.dataService.filterItems(this.searchTerm);
  //   console.log(this.userData);
  // }

  radio_list = [
    {
      name: 'custType',
      value: 'old',
      text: 'OLD',
      checked: true,
    }, {
      name: 'custType',
      value: 'new',
      text: 'NEW',
      checked: false,
    }
    
  ];
 
 
  radioSelect(event) {
    this.selectedRadioItem = event.detail.value;
  }
 

  
//   filterItems(searchTerm){
//     return this.userData.filter((item) => {
//          return item.UserName.toLowerCase().includes(searchTerm.toLowerCase());
//      });  
//  }

}
