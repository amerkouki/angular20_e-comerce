import { Component, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInParams } from '../../models/user';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';
import Checkout from '../../pages/checkout/checkout';
@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatIconButton,
     MatIcon, MatFormField, MatInput, 
     MatSuffix, MatPrefix,MatDialogClose,
    ReactiveFormsModule,
    MatButton
    ],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  data = inject<{checkout : boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);

  passwodVisible = signal(false);
  signInForm = this.fb.group({
    email : ['akk@gmail.com',Validators.required],
    password : ['1234',Validators.required]
  })

  signin(){
    if(!this.signInForm.valid){
      this.signInForm.markAllAsTouched();
      return ;
    }
    const {email,password} =this.signInForm.value;
    this.store.signIn({email,password, checkout:this.data?.checkout , dialogId: this.dialogRef.id} as SignInParams);
  }

  openSignUpDialog(){
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose:true,
      data: {
        checkout: this.data?.checkout
      }
    });
  }
}
