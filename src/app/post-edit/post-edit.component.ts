import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router/src/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes, Router } from '@angular/router';
import {PostService} from '../services/post.service';
import { NgForm } from "@angular/forms";
import {Post} from '../post.model';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post : any = [];
  myTitle : String; 
  myContent : String; 
  myLike: String;
  constructor(private router:Router, private route: ActivatedRoute, private service:PostService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.service.getPost(this.route.snapshot.params['id']).subscribe(data =>
    {
      this.post = data;
      console.log(this.post);
      this.myTitle = this.post.title;
      console.log("message: " +this.myTitle);
      console.log("Num Likes: "+this.myLike);

    });
  }
  onEditPost(form: NgForm) {
    this.service.updatePost(this.post._id, form.value.title, form.value.content, form.value.like).subscribe(() =>
    {
      this.router.navigate(['/list']);
    });
  }
}
