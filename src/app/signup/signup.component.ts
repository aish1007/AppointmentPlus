//Author NAME: Abhinandan Walia STUDENT ID: B00820613

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetdataService} from '../getdata.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: String;
  enull: boolean;
  pnull: boolean;
  einvalid: boolean;
  isdoctorchecked:boolean;
  indexat: any;
  indexdot: any;
  
  constructor(private getData : GetdataService, private route: ActivatedRoute, private router: Router) { }

    
  ngOnInit() {
    document.body.className = "register";
    this.isdoctorchecked=false;
  }
  onPatient(){
    this.isdoctorchecked=false;
  }
  onDoctor(){
    this.isdoctorchecked=true;
  }

  validate() {
    this.einvalid = false;
    this.enull = false;
    if((<HTMLInputElement>document.getElementById("userDoctor")).checked)
    {
      var licenseNumber = (<HTMLInputElement>document.getElementById("licensenumber")).value;
    }
    var firstName = (<HTMLInputElement>document.getElementById("fname")).value;
    var lastName = (<HTMLInputElement>document.getElementById("lname")).value;
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    var address = (<HTMLInputElement>document.getElementById("address")).value;
    var phone = (<HTMLInputElement>document.getElementById("phone")).value;
    var city = (<HTMLInputElement>document.getElementById("city")).value;
    var dateofBirth = (<HTMLInputElement>document.getElementById("dob")).value;
    var postalCode = (<HTMLInputElement>document.getElementById("postal")).value;
    var province = (<HTMLInputElement>document.getElementById("province")).value;

    this.indexat = email.indexOf("@");
    this.indexdot = email.lastIndexOf(".");

    if (email != "") {
      if (this.indexat < 1 || (this.indexdot - this.indexat < 2)) {

        this.einvalid = true;
        this.enull = false;
      }

    }
    else {
      this.einvalid = false;
      this.enull = true;
    }

    if (email == "") {
      this.enull = true;
    }
    if (password == "") {
      this.pnull = true;
    }
    else {
      this.pnull = false;
    }

    if (!this.enull && !this.pnull && !this.einvalid && !(<HTMLInputElement>document.getElementById("userDoctor")).checked) {
   var PatientDetails = { 
    "firstName" :firstName,
    "lastName" :lastName,
    "email" :email, 
    "password" :password,
    "address" :address,
    "phone" :phone,
    "city" :city,
    "dateofBirth" :dateofBirth, 
    "postalCode" :postalCode,
    "province" :province,
};
      this.storePatientinDB(PatientDetails);
    }
    if (!this.enull && !this.pnull && !this.einvalid && (<HTMLInputElement>document.getElementById("userDoctor")).checked) {
        var DoctorDetails = { 
        "licenseNumber" :licenseNumber,
        "firstName" :firstName,
        "lastName" :lastName,
        "email" :email, 
        "password" :password,
        "address" :address,
        "phone" :phone,
        "city" :city,
        "dateofBirth" :dateofBirth, 
        "postalCode" :postalCode,
        "province" :province,
   };
   this.storeDoctorinDB(DoctorDetails);
    }
      this.router.navigate(['/login']);
    }
    
    storePatientinDB(details)
    {
      this.getData.createPatientUser(details).subscribe((data)=>
      this.successMsg(data)
      );
    }
    storeDoctorinDB(details)
    {
      this.getData.createDoctorUser(details).subscribe((data)=>
      this.successMsg(data)
      );
    }
    successMsg(data)
    {
      if(data.message == "success")
      {
        Swal.fire
        (
          'Thank You!',
          'For Joining AppoinmentPlus Community',
        );
      }   
    }

  ngOnDestroy() {
    document.body.className = "";
  }

}