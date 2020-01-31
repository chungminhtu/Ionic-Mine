import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  newDate = new Date();
  dateTime: string;

  constructor(
    private alertCtrl: AlertController,
    private storageService: StorageService
  ) {
    this.dateTime = this.getDateTime(this.newDate);
  }

  beneficiaryDetails: Object = {
    userPhoto: "assets/profile_pic.jpg",
    userName: "",
    userSurname: "",
    userAge: null,
    userGender: "",
    userDOJ: "",
    userDistrict: "",
    userMandal: "",
    userVillage: "",
    userPatientId: "",
    userVisitId: "",
    userVisitCount: "",
    userDeviceId: "",
    userVanId: "",
    userRouteVillageId: "",
    userServicePointId: "",
    userCompoundPatientId: "",
    age: "",
    ageTypeId: "",
    pregnancyStatus: ""
  };

  sessionDetails: Object = {
    stateId: null,
    districtId: null,
    mandalId: null,
    villageId: null,
    servicePointId: null,
    servicePointName: "Loading...",
    servicePointCode: null
  };

  userDetails: Object = {
    firstName: null,
    lastName: null,
    fullName: null,
    userId: null,
    roleId: null,
    deviceId: null,
    vanId: null
  };

  makeBenObjectEmpty() {
    this.beneficiaryDetails = {};
    this.beneficiaryDetails["userPhoto"] = "assets/profile_pic.jpg";
  }

  makeUserObjectEmpty() {
    this.userDetails = {};
  }

  makeSessionObjectEmpty() {
    this.sessionDetails = {};
  }

  getDateTime(myDate) {
    return (
      myDate.getFullYear() +
      "-" +
      this.padDatePart(myDate.getMonth() + 1) +
      "-" +
      this.padDatePart(myDate.getDate())
    );
  }

  padDatePart(part) {
    return ("0" + part).slice(-2);
  }

  setBenDetails(benDetails) {
    this.beneficiaryDetails["userPhoto"] = benDetails["imageUrl"];
    this.beneficiaryDetails["userName"] = benDetails["name"];
    this.beneficiaryDetails["userSurname"] = benDetails["surname"];
    this.beneficiaryDetails["userAge"] = benDetails["age"];
    this.beneficiaryDetails["ageTypeId"] = benDetails["ageTypeId"];
    this.beneficiaryDetails["userGender"] = benDetails["gender"];
    this.beneficiaryDetails["userDOJ"] = benDetails["registrationDate"];
    this.beneficiaryDetails["userDistrict"] = benDetails["districtName"];
    this.beneficiaryDetails["userMandal"] = benDetails["mandalName"];
    this.beneficiaryDetails["userVillage"] = benDetails["villageName"];
    this.beneficiaryDetails["userVisitId"] = benDetails["visitId"];
    this.beneficiaryDetails["userPatientId"] = benDetails["patientId"];
    this.beneficiaryDetails["userVisitCount"] = benDetails["visitCount"];
    this.beneficiaryDetails["userDeviceId"] = benDetails["deviceId"];
    this.beneficiaryDetails["userVanId"] = benDetails["vanId"];
    this.beneficiaryDetails["userRouteVillageId"] =
      benDetails["routeVillageId"];
    this.beneficiaryDetails["userServicePointId"] =
      benDetails["servicePointId"];
    this.beneficiaryDetails["userCompoundPatientId"] =
      benDetails["compoundPatientId"];
  }

  logout() {
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Do you want to logout?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Logout",
            handler: () => {
              // alert("User will be logged out");
              this.storageService.clear();
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
