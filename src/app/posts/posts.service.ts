import { Post } from './post.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts : Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts(){
      return [...this.posts]; //Create a new array with an old object, so add or remove will not effect the origin array created within this class
      // return this.posts;
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]); //Push the copy of the posts[], afted updated
  }
}
