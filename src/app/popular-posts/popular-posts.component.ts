import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import { Observable } from 'rxjs';
import {Post} from '../post.model';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-popular-posts',
  templateUrl: './popular-posts.component.html',
  styleUrls: ['./popular-posts.component.css']
})

export class PopularPostsComponent implements OnInit {

  posts: any =[];
  topPosts: any =[];

  constructor(private ps: PostService) { }

  ngOnInit() {
    this.ps.getPostsData().subscribe(data => {
      this.posts = data;
      this.top3PostsFunc();
    });
  }

  top3PostsFunc() {
    let id: string,title: string, content: string, like: string;
    const posts: Post = {title: title, content: content, like: like};

    //Variables
    let highNum: number[] = [0,0,0]; //highNum[0] is the highest and highNum[2] is the lowest of array
    let i : number = 0;

    console.log(this.posts.length);
    while(i < this.posts.length)
    {
      let checker = this.posts[i];
      let likeAsNum = parseInt(checker["like"]);
      console.log(likeAsNum);
      
          //Check if likes is higher than current numbers
          if(likeAsNum > highNum[0])
          {
            //move the other posts down in array
            this.topPosts[1] = this.topPosts[0];
            this.topPosts[2] = this.topPosts[1];
            this.topPosts[0] = checker;
            highNum[0] = highNum[1];

            highNum[1] = highNum[2];

            //Set new highest
            highNum[0] = likeAsNum;
          }
          else if(likeAsNum > highNum[1] || likeAsNum == highNum[0])
          {
            this.topPosts[2] = this.topPosts[1];
            this.topPosts[1] = checker;
            highNum[2] = highNum[1];

            highNum[1] = likeAsNum;
          }
          else if(likeAsNum > highNum[2] || likeAsNum == highNum[1])
          {
            this.topPosts[2] = checker;
            highNum[2] = likeAsNum;
          }
         i++;
         console.log(checker["_id"]);
    }
  }
}