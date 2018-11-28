import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import { Observable } from 'rxjs';
import {Post} from '../post.model';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  posts: any = [];
  myTitle: String;
  myLike: string;

  constructor(private router:Router, private route: ActivatedRoute,private ps:PostService){}

  ngOnInit(){
    this.ps.getPostsData().subscribe(data => {
        this.posts = data;
    });
  }

   onDelete(id:String){
     console.log("Delete called "+ id);
     this.ps.deletePost(id).subscribe(() =>
     {
        this.ngOnInit();
     })
   }

   onLike(id:String,title: string, content: string, like: string){
    console.log("Liked "+ id);
    const post: Post = {title: title, content: content, like: like};

    //Get Number of likes from data
    let i = 0;
    let found : boolean = false;

    while(found == false)
    {
      //checker is set at the beggining of the loop so it is updated as the loop checks each id
      let checker = this.posts[i];

      if(checker["_id"] === id)
      {
        found = true;
        break;
      }
      i++;
    }

    let checker = this.posts[i];
    console.log(id+" matches "+checker["_id"]);
    this.myLike = checker["like"];

    //Increment Number of likes for this post
    var likeAsNum;
    likeAsNum = parseInt(this.myLike);       //Change to integer for incrementing
    likeAsNum ++;
    console.log("like incremented!\nNew number of likes: "+likeAsNum);
    like = likeAsNum.toString();             //Back to string for data type

    this.ps.LikedPost(id, title, content, like).subscribe(() =>
    {
       this.ngOnInit();
    })
  }
  
}
