import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIconButton,
    MatIcon, MatFormField, MatInput, 
     MatPrefix,MatDialogClose,
   ReactiveFormsModule,
   MatButton
   ],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})
export class SignUpDialog {

  store = inject(EcommerceStore);
  fb = inject(NonNullableFormBuilder);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);
  data = inject<{checkout : boolean }>(MAT_DIALOG_DATA);


  signUpForm = this.fb.group({
    name : ['AKK',Validators.required],
    email : ['AKK@gmail.com',Validators.required],
    password : ['AKK',Validators.required],
    configPassword : ['AKK',Validators.required],
  })

  signUp(){
    if(!this.signUpForm.valid){
      this.signUpForm.markAllAsTouched();
      return ;
    }
    const {name,email,password} =this.signUpForm.value;
    this.store.signUp({name,email,password,dialogId : this.dialogRef.id ,checkout: this.data?.checkout} as SignUpParams);
  }

  openSignInDialog(){
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose:true,
      data: {
        checkout: this.data?.checkout
      }
    });
  }
}
