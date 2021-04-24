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

  commentsForm = this.formBuilder.group({
    comment: '',
    users: []
  });
  constructor(
    private formBuilder: FormBuilder
    ) {}

    autosuggestUsers(event: any): void {
      const code = String.fromCharCode(event.keyCode);

      // The below line checks that if you are starting a new word reset back the isTagShown flag
      if(code === ' ') {
        this.isTagShown = false;
      }
      
      //Resetting the users array when we type @ by clicking back
      this.users = users;
      let textAreaInput = event.target.value;

      // The below if condition checks if the current character entered is '@' and sets the isTagShown to true
      if(Number(code) === 2) {
        this.isTagShown = true;
      }
        // The below code filters users array only with values that match the value after the '@'
        if(this.isTagShown){
          let taggedUserValue = textAreaInput.slice(textAreaInput.lastIndexOf('@') + 1) // We are adding +1 to ignore the '@'
          console.log(taggedUserValue);
          if(taggedUserValue.length > 0) {
            const result = this.users.filter(user => {
              return user.name.toLowerCase().startsWith(taggedUserValue.toLowerCase())
            });
        this.users = result;
      }
    }
  }
    onSubmit(): void {
      this.commentsForm.reset();
    }
}
