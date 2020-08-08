import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-post-create", //Our own html tag
  templateUrl: "./post-create.component.html", //Poiting at the html file
  styleUrls: ["./post-create.component.css"]
}) //Decorator

export class PostCreateComponent implements OnInit{

  enteredTitle = ""; //declare the properties
  enteredContent = ""; //declare the properties
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create"; //How come this one doesn't use?
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {} //Create the constructor and declare the properties

  //Content 66
  ngOnInit() { //Initialization
    this.form = new FormGroup({ //Content 74
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) { //If we have it, then we can edit it, if we don't then we are in create it mode
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => { //content 67, 68
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
        }); //Single post
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file }); //Target a single control, file object in this case
    this.form.get("image").updateValueAndValidity(); //Inform the angular the change value, and check if it's valid
    const reader = new FileReader(); //Creating the reader
    reader.onload = () => {
      this.imagePreview = reader.result as string; //When it done loading the file, this is asynchonize code
    };
    reader.readAsDataURL(file); //Instruct to load that file
  }

  onSavePost() { //Now postInput is the param of onAddPost, with type of the input
    // this.newPost = postInput.value; //This get the value and assign into the property of the class
     // this.newPost = this.Content;
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

}
