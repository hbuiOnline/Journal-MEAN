import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from  '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {} //public infront will declare/auto create the properties

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      }); //Set up the subcription
  }

  onDelete(postId :string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe(); //remove subscription and prevent memory leak
  }
}

  // posts = [
  //   {title: 'First Post', content:'This is the first post\'s content'},
  //   {title: 'Second Post', content:'This is the second post\'s content'},
  //   {title: 'Third Post', content:'This is the third post\'s content'},
  // ];
