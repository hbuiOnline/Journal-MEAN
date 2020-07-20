import { Post } from './post.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts : Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http : HttpClient) {}

  getPosts(){
      this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts; //Coming from the server
        this.postsUpdated.next([...this.posts]);
      });//3 params, 1st is new data (res), 2nd for error(handling), 3rd is complete
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]); //Push the copy of the posts[], afted updated
      });

  }
}
