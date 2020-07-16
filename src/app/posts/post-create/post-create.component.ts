import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create', //Our own html tag
  templateUrl: './post-create.component.html', //Poiting at the html file
  styleUrls: ['./post-create.component.css']
}) //Decorator

export class PostCreateComponent {

  enteredTitle = ''; //declare the properties
  enteredContent =''; //declare the properties
  @Output() postCreated = new EventEmitter();

  onAddPost(){ //Now postInput is the param of onAddPost, with type of the input
    // console.dir(postInput); Get the value into the console
    // this.newPost = postInput.value; //This get the value and assign into the property of the class
    // this.newPost = this.Content;
    const post = {
      title: this.enteredTitle, //Value has been assign from browser after click (onAddPost())
      content: this.enteredContent,
    };

    this.postCreated.emit(post); //Output the value
  }
}
