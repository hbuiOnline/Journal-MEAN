import { Post } from './post.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts : Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http : HttpClient) {}

  getPosts(){
      this.http.get<{message: string; posts: any}>(
        'http://localhost:3000/api/posts'
        )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        }); // Return the array of posts
      })) //Add in the operator, accept multiple operators

      .subscribe((transformedPosts) => {
        this.posts = transformedPosts; //Coming from the server
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

  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
      });
  }
}//End of class postsService
