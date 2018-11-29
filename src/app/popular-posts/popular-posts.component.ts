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

  constructor(private ps: PostService) { }

  ngOnInit() {
    let highId : any = [];
    highId = this.top3Posts();

    console.log("The high id: "+highId[0]);

    this.ps.top3Posts(highId).subscribe(data => {
      this.posts = data;
    });
  }

  top3Posts() {
    let id: string,title: string, content: string, like: string;
    const posts: Post = {title: title, content: content, like: like}

    //Variables
    let highId : any = [];
    let highNum: number[] = [0,0,0]; //highNum[0] is the highest and highNum[2] is the lowest of array
    let i : number = 0;

    while(i < this.posts.length)
    {
      let checker = this.posts[i];
      let likeAsNum = parseInt(checker["like"]);
      console.log(likeAsNum);
      
          //Check if likes is higher than current numbers
          if(likeAsNum > highNum[0])
          {
            //move the other posts down in array
            highNum[0] = highNum[1];
            highId[0] = highId[1];

            highNum[1] = highNum[2];
            highId[1] = highId[2];

            //Set new highest
            highNum[0] = likeAsNum;
            highId[0] = checker["_id"];
          }
          else if(likeAsNum > highNum[1] || likeAsNum == highNum[0])
          {
            highNum[2] = highNum[1];
            highId[2] = highId[1];

            highNum[1] = likeAsNum;
            highId[1] = checker["_id"];
          }
          else if(likeAsNum > highNum[2] || likeAsNum == highNum[1])
          {
            highNum[2] = likeAsNum;
            highId[2] = checker["_id"];
          }
         i++;
         console.log(checker["_id"]);
    }
      return highId;
      //console.log(i);
    
  }
}
