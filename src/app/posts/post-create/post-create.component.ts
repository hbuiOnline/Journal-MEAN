import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';


@Component({
  selector: 'app-post-create', //Our own html tag
  templateUrl: './post-create.component.html', //Poiting at the html file
  styleUrls: ['./post-create.component.css']
}) //Decorator

export class PostCreateComponent implements OnInit{

  enteredTitle = ''; //declare the properties
  enteredContent =''; //declare the properties
  post: Post;
  isLoading = false;
  private mode = 'create'; //How come this one doesn't use?
  private postId: string;


  constructor(public postsService: PostsService, public route: ActivatedRoute) {} //Create the constructor and declare the properties

  //Content 66
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')){ //If we have it, then we can edit it, if we don't then we are in create it mode
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => { //content 67, 68
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        }); //Single post
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm){ //Now postInput is the param of onAddPost, with type of the input
    // this.newPost = postInput.value; //This get the value and assign into the property of the class
    // this.newPost = this.Content;
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content);
    }
    form.resetForm();
  }
}
