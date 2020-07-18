import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-create', //Our own html tag
  templateUrl: './post-create.component.html', //Poiting at the html file
  styleUrls: ['./post-create.component.css']
}) //Decorator

export class PostCreateComponent {

  enteredTitle = ''; //declare the properties
  enteredContent =''; //declare the properties

  constructor(public postsService: PostsService){} //Create the constructor and declare the properties

  onAddPost(form: NgForm){ //Now postInput is the param of onAddPost, with type of the input
    // console.dir(postInput); Get the value into the console
    // this.newPost = postInput.value; //This get the value and assign into the property of the class
    // this.newPost = this.Content;
    if (form.invalid){
      return;
    }
    // const post: Post = {
    //   // title: this.enteredTitle, //Value has been assign from browser after click (onAddPost())
    //   // content: this.enteredContent,

    //   title: form.value.title,
    //   content: form.value.content,
    // };

    // this.postCreated.emit(post); //Output the value
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
