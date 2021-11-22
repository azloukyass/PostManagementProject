import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '../authService';
import { DataService } from '../data.service';
import { Post } from '../Interfaces/post';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent  {

  constructor(private dataService:DataService , public dialog:MatDialog,  public auth :AuthService) { }

  displayedColumn=['date_posted', 'title', 'category', 'position'];
  dataSource= new PostDataSource(this.dataService);

  deletePost(id) {
    if(this.auth.isAuthenticated()) {
      this.dataService.deletePost(id);
      this.dataSource = new PostDataSource(this.dataService);
    } else {
      alert ('login in Before please !');
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width:'600px',
      data:'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
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
