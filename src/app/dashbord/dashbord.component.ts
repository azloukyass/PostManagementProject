import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Post } from '../Interfaces/post';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private dataService:DataService) { }

  displayedColumn=['date_posted', 'title', 'category', 'delete'];
  dataSource= new PostDataSource(this.dataService);

  ngOnInit(): void {
  }

}
export class PostDataSource extends DataSource<any> {
  constructor(private dataService:DataService){
    super();
  }

  connect() : Observable<Post[]> {
    return this.dataService.getData();
  }
  disconnect(){};
}
