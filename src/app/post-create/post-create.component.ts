import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private service:PostService) { }

  onAddPost(form: NgForm) {
    
    form.value.like = "0";

    this.service.addPost(form.value.title, form.value.content, form.value.like).subscribe(this.ngOnInit);
    
    console.log(form.value);
    form.resetForm();
  }

  ngOnInit() {

  }

}
