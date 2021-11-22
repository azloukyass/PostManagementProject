import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from 'stream';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent  {

  blogPost = {
    title:'' ,
    body:'',
    category:'',
    position:'',
    date_posted: new Date()
  };
  public event : EventEmitter = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @inject(MAT_DIALOG_DATA) public data:any,
    public dataService:DataService
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.blogPost.position = this.dataService.dataLength();
    this.event.emit({data: this.blogPost});
    this.dialogRef.close();
  }

  categories = this.dataService.getCategories();

  ngOnInit(): void {
  }

}
