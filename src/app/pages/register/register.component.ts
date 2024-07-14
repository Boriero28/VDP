import { Component } from '@angular/core';
import { AddUser } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FontService } from 'src/app/services/font.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authservice:AuthService,private route:Router, private _snackBar: MatSnackBar,private fontSrv: FontService){}

  formatErrorMessage(errorMessage:string){
    const parts = errorMessage.split(',');
    const formattedMessage = parts.join(',\n'); 
    return formattedMessage;
  }

  doRegistration(registrationData:AddUser){
   
    this.authservice.addUser(registrationData).subscribe(
      (res) => {
        this._snackBar.open("User "+ res.firstName +" in successfully", "OK",  {
            duration: 3000,
          });

        this.route.navigateByUrl("/home")
      },
      (err) => {
        this._snackBar.open(this.fontSrv.capitalize(this.formatErrorMessage(err.error.message)), "OK");
        }
    );

    
      
    }

}
