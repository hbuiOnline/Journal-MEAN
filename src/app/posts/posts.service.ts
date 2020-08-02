import { Post } from './post.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts : Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http : HttpClient, private router: Router) {}

  getPosts(){ //Get multiple posts
      this.http.get<{message: string; posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
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

  getPost(id: string) { //Get single post
    // return {...this.posts.find(p => p.id === id)}; //check if that id equal to the id we're passing
    //Pull out all the properties and add it to a new js object then return that object
    return this.http.get<{_id:string, title:string, content: string, imagePath: string}>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string, image: File){
    // const post: Post = { id: null, title: title, content: content };
    const postData = new FormData();//Data format combined text value and blog
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http
      .post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        const post: Post = {
          id: responseData.post.id,
          title: title,
          content: content,
          imagePath: responseData.post.imagePath
        };
        // const id = responseData.postId;
        // post.id = id; //Update the id retrieved from responseData
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]); //Push the copy of the posts[], afted updated
        this.router.navigate(['/']);//navigate back to root page
      });
  }//End addPost

  updatePost(id: string, title: string, content: string, image: File | string){
    // const post: Post = { id: id, title: title, content: content, imagePath: null };
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(response => {
        //Content 68
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post: Post = {
          id: id,
          title: title,
          content: content,
          imagePath: ""
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']); //navigate back to root page
      });
  }

  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId) //Dynamic paramater
      .subscribe(() => {
        // console.log('Deleted!');
        const updatedPosts = this.posts.filter(post => post.id !== postId); //Filter allow us to return subset of that post array, if return T, element will be kept, if F, the element will not be part of filtered array
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);

      });
  }//End of deletePost
}//End of class postsService
