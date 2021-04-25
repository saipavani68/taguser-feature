import { Component, ɵCurrencyIndex } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { comments } from '../comments';
import { users } from '../users';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent {
  comments = comments;
  users = users;
  isTagShown = false;
  selectedUser: any;
  commentToPost: any;

  commentsForm = this.formBuilder.group({
    comment: '',
    users: []
  });
  
  constructor(
    private formBuilder: FormBuilder
    ) {}

  autosuggestUsers(event: any): void {
    const code = String.fromCharCode(event.keyCode);
    let textAreaInput = event.target.value;
    let tagLastIndex = textAreaInput.lastIndexOf('@')

    // The below line checks that if you are starting a new word or if textAreaInput is empty reset back the isTagShown flag
    if(code === ' ' || textAreaInput.length === 0) {
      this.isTagShown = false;
    }
    
    // Resetting the users array when we type @ by clicking back
    this.users = users;

    // The below if condition checks if the current character entered is '@' and sets the isTagShown to true
    // We want to make sure that either the beginning character is @ or a word starts with @
    if(Number(code) === 2 && (textAreaInput.length === 1 || textAreaInput.charAt(tagLastIndex - 1) === ' ')) {
      this.isTagShown = true;
    }
    
    // The below code filters users array only with values that match the value after the '@'
    if(this.isTagShown){
      let taggedUserValue = textAreaInput.slice(tagLastIndex + 1) // We are adding +1 to ignore the '@'
      if(taggedUserValue.length > 0) {
        const result = this.users.filter(user => {
          return user.name.toLowerCase().startsWith(taggedUserValue.toLowerCase())
        });
        this.users = result;
      }
    }
  }
  
  selectUser(){
    this.isTagShown = false;
    let tagStartIndex = this.commentToPost.lastIndexOf('@');
    this.commentToPost = this.commentToPost.substr(0, tagStartIndex) + this.selectedUser;
    alert(this.selectedUser);
  }
    
  onSubmit(): void {
      this.commentsForm.reset();
    }
}
