import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.page.html",
  styleUrls: ["./doctor.page.scss"]
})
export class DoctorPage implements OnInit {
  doctorForm: FormGroup;

  showRemarks: boolean = false;
  benIds: any[] = [];
  hospitals: any[] = [];
  dbRchs: any[] = [];
  rchs: any[] = [
    {
      beneficiaryTypeId: 1,
      beneficiaryTypeName: 'ANC',
    },
    {
      beneficiaryTypeId: 2,
      beneficiaryTypeName: 'PNC',
    },
    {
      beneficiaryTypeId: 3,
      beneficiaryTypeName: 'NEONATE',
    },
    {
      beneficiaryTypeId: 4,
      beneficiaryTypeName: 'INFANT',
    },
    {
      beneficiaryTypeId: 5,
      beneficiaryTypeName: 'CHILD (1 - 5 YRS)',
    }
  ];
  cds: any[] = [];
  ncds: any[] = [];
  minorAilments: any[] = [];

  allowOtherCd: boolean = false;
  allowOtherNcd: boolean = false;
  allowOtherMinorAilment: boolean = false;
  allowOtherRefferedTo: boolean = false;

  newDate = new Date();
  dateTime: string = this.commonService.getDateTime(this.newDate);

  userId: number;
  vanId: number;
  deviceId: number;
  stateId: number;
  districtId: number;
  mandalId: number;
  villageId: number;
  servicePointId: number;
  servicePointName: string;
  servicePointCode: string;

  constructor(
    private db: DatabaseService,
    private commonService: CommonService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.loadSessionDetails();
    // this.loadBeneficiaries();
    // this.loadHospitals();
    // this.loadRCHs();
    // this.loadProvisionalDiagnosis(1);
    // this.loadProvisionalDiagnosis(2);
    // this.loadProvisionalDiagnosis(3);

    this.doctorForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      rch: new FormControl("", Validators.required),
      cd: new FormControl("", Validators.required),
      otherCd: new FormControl("", Validators.required),
      ncd: new FormControl("", Validators.required),
      otherNcd: new FormControl("", Validators.required),
      minorAilments: new FormControl("", Validators.required),
      otherMinorAilment: new FormControl("", Validators.required),
      remarks: new FormControl("", Validators.required),
      refferedTo: new FormControl("", Validators.required),
      otherRefferedTo: new FormControl("", Validators.required)
    });
  }

  ngOnInit() { }

  loadBeneficiaries() {
    this.db
      .getBeneficiaries()
      .then(beneficiaries => {
        console.log(
          "Fetched beneficiaries -> " + JSON.stringify(beneficiaries)
        );
        this.benIds = beneficiaries;
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaries() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadHospitals() {
    this.db
      .getHospitals()
      .then(hospitals => {
        console.log(
          "Fetched hospitals -> " + JSON.stringify(hospitals)
        );
        this.hospitals = hospitals;
      })
      .catch(error => {
        console.error(
          "Error -> getHospitals() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadProvisionalDiagnosis(category) {
    let categoryName;
    if (category == 1) {
      categoryName = 'CDs';
    } else if (category == 2) {
      categoryName = 'NCDs';
    } else {
      categoryName = 'Minor Ailments';
    }

    this.db
      .getProvisionalDiagnosis(category)
      .then(results => {
        console.log(
          `Fetched ${categoryName} ->  + JSON.stringify(results)`
        );
        if (category == 1) {
          this.cds = results;
        } else if (category == 2) {
          this.ncds = results;
        } else {
          this.minorAilments = results;
        }
      })
      .catch(error => {
        console.error(
          "Error -> getProvisionalDiagnosis() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadRCHs() {
    this.db
      .getRCHs()
      .then(rchs => {
        console.log(
          "Fetched RCHs -> " + JSON.stringify(rchs)
        );
        this.dbRchs = rchs;
        this.rchs = rchs;
      })
      .catch(error => {
        console.error(
          "Error -> getRCHs() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  loadSessionDetails() {
    this.stateId = this.commonService.sessionDetails['stateId'];
    this.districtId = this.commonService.sessionDetails['districtId'];
    this.mandalId = this.commonService.sessionDetails['mandalId'];
    this.villageId = this.commonService.sessionDetails['villageId'];
    this.servicePointId = this.commonService.sessionDetails['servicePointId'];
    this.servicePointName = this.commonService.sessionDetails['servicePointName'];
    this.servicePointCode = this.commonService.sessionDetails['servicePointCode'];
  }

  remarksCheckbox(e) {
    if (e.target.checked) {
      this.showRemarks = true;
      this.doctorForm.patchValue({
        cd: "N/A",
        otherCd: "",
        ncd: "N/A",
        otherNcd: "",
        minorAilments: "N/A",
        otherMinorAilment: "",
        remarks: "",
        refferedTo: -1
      });
      this.allowOtherCd = false;
      this.allowOtherNcd = false;
      this.allowOtherMinorAilment = false;
      console.log("remarksCheckbox is checked");
    } else {
      this.showRemarks = false;
      this.doctorForm.patchValue({
        cd: "",
        otherCd: "",
        ncd: "",
        otherNcd: "",
        minorAilments: "",
        remarks: "N/A",
        otherMinorAilment: "",
        refferedTo: ""
      });
      console.log("remarksCheckbox is unchecked");
    }
  }

  cdChange() {
    let selectedCD = this.doctorForm.get("cd").value;
    console.log("selected CD are -> " + JSON.stringify(selectedCD));
    let hasOther = selectedCD.filter(id => id == 12);

    if (hasOther.length > 0) {
      this.allowOtherCd = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherCd = false;
    }
  }

  ncdChange() {
    let selectedNCD = this.doctorForm.get("ncd").value;
    console.log("selected NCD are -> " + JSON.stringify(selectedNCD));
    let hasOther = selectedNCD.filter(id => id == 13);

    if (hasOther.length > 0) {
      this.allowOtherNcd = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherNcd = false;
    }
  }

  minorAilmentChange() {
    let selectedMinorAilment = this.doctorForm.get("minorAilments").value;
    console.log("selected minorAilment are -> " + JSON.stringify(selectedMinorAilment));
    let hasOther = selectedMinorAilment.filter(id => id == 34);

    if (hasOther.length > 0) {
      this.allowOtherMinorAilment = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherMinorAilment = false;
    }
  }

  refferedToChange() {
    let selectedRefferedTo = this.doctorForm.get("refferedTo").value;
    console.log("selected RefferedTo is -> " + JSON.stringify(selectedRefferedTo));

    if (selectedRefferedTo == 2) {
      this.allowOtherRefferedTo = true;
      console.log("Other option is selected");
    } else {
      this.allowOtherRefferedTo = false;
    }
  }

  benIdChange() {
    let selectedBenID = this.doctorForm.get("beneficiaryId").value;
    console.log("selectedBenID is -> " + selectedBenID);
    // if (selectedBenID && selectedBenID != null)
    //   this.getBenDetails(selectedBenID);
  }

  getBenDetails(selectedBenID) {
    this.rchs = this.dbRchs;
    this.db
      .getBeneficiaryDetails(selectedBenID)
      .then(benDetails => {
        console.log("Received Ben details are -> " + JSON.stringify(benDetails));

        let benAge = benDetails[0]['age'];
        let benAgeTypeId = benDetails[0]['ageTypeId'];
        let benPregnancyStatus = benDetails[0]['pregnancyStatus'];
        let benGender = benDetails[0]['gender'];

        this.commonService.beneficiaryDetails['userPhoto'] = benDetails[0]['imageUrl'];
        this.commonService.beneficiaryDetails['userName'] = benDetails[0]['name'];
        this.commonService.beneficiaryDetails['pregnancyStatus'] = benPregnancyStatus;
        this.commonService.beneficiaryDetails['ageTypeId'] = benAgeTypeId;
        this.commonService.beneficiaryDetails['age'] = benAge;
        this.commonService.beneficiaryDetails['userSurname'] = benDetails[0]['surname'];
        this.commonService.beneficiaryDetails['userAge'] = 5;
        this.commonService.beneficiaryDetails['userGender'] = benGender;
        this.commonService.beneficiaryDetails['userDOJ'] = benDetails[0]['registrationDate'];
        this.commonService.beneficiaryDetails['userDistrict'] = benDetails[0]['districtName'];
        this.commonService.beneficiaryDetails['userMandal'] = benDetails[0]['mandalName'];
        this.commonService.beneficiaryDetails['userVillage'] = benDetails[0]['villageName'];
        this.commonService.beneficiaryDetails['userVisitId'] = benDetails[0]['visitId'];
        this.commonService.beneficiaryDetails['userPatientId'] = benDetails[0]['patientId'];
        this.commonService.beneficiaryDetails['userVisitCount'] = benDetails[0]['visitCount'];
        this.commonService.beneficiaryDetails['userDeviceId'] = benDetails[0]['deviceId'];
        this.commonService.beneficiaryDetails['userVanId'] = benDetails[0]['vanId'];
        this.commonService.beneficiaryDetails['userRouteVillageId'] = benDetails[0]['routeVillageId'];
        this.commonService.beneficiaryDetails['userServicePointId'] = benDetails[0]['servicePointId'];
        this.commonService.beneficiaryDetails['userCompoundPatientId'] = benDetails[0]['compoundPatientId'];

        if (benGender == 2) {
          if (benAge >= 16 && benAgeTypeId == 3) {
            if (benPregnancyStatus == 1) {
              this.doctorForm.patchValue({ rch: 1 });
            } else if (benPregnancyStatus == 2) {
              this.doctorForm.patchValue({ rch: 2 });
            }
          }
        } else if (benAge >= 1 && benAge <= 5 && benAgeTypeId == 3) {
          this.doctorForm.patchValue({ rch: 5 });
        } else if (benAge >= 1 && benAge <= 30 && benAgeTypeId == 1) {
          this.doctorForm.patchValue({ rch: 3 });
        } else if (benAge >= 1 && benAge <= 12 && benAgeTypeId == 2) {
          this.doctorForm.patchValue({ rch: 4 });
        } else {
          this.rchs.length = 0;
        }

      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaryDetails() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  resetValues() {
    this.doctorForm.patchValue({
      beneficiaryId: "",
      rch: "",
      cd: "",
      otherCd: "",
      ncd: "",
      otherNcd: "",
      minorAilments: "",
      otherMinorAilment: "",
      remarks: "",
      refferedTo: "",
      otherRefferedTo: ""
    });
    this.allowOtherCd = false;
    this.allowOtherNcd = false;
    this.allowOtherMinorAilment = false;
    this.allowOtherRefferedTo = false;
  }


  onSubmit(values) {
    console.clear();
    console.log("Doctor form is submitted, below are the values");
    console.log(values);

    let patientId = this.doctorForm.get("beneficiaryId").value;
    let rch = this.doctorForm.get("rch").value;
    let cd = this.doctorForm.get("cd").value;
    let otherCd = this.doctorForm.get("otherCd").value.trim();
    let ncd = this.doctorForm.get("ncd").value;
    let otherNcd = this.doctorForm.get("otherNcd").value.trim();
    let minorAilments = this.doctorForm.get("minorAilments").value;
    let otherMinorAilment = this.doctorForm.get("otherMinorAilment").value.trim();
    let remarks = this.doctorForm.get("remarks").value.trim();
    let refferedTo = this.doctorForm.get("refferedTo").value;
    let otherRefferedTo = this.doctorForm.get("otherRefferedTo").value.trim();

    if (!patientId || patientId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }

    if (!rch || rch.length == 0) {
      alert("Please Select RCH");
      return false;
    }

    if (this.showRemarks === false) {
      if (!cd || cd.length == 0) {
        alert("Please Select CD");
        return false;
      }
      if (this.allowOtherCd && otherCd == '') {
        alert("Please Enter CD other details.");
        return false;
      }
      if (!ncd || ncd.length == 0) {
        alert("Please Select NCD");
        return false;
      }
      if (this.allowOtherNcd && otherNcd == '') {
        alert("Please Enter NCD other details.");
        return false;
      }
      if (!minorAilments || minorAilments.length == 0) {
        alert("Please Select Minor Ailments");
        return false;
      }
      if (this.allowOtherNcd && otherMinorAilment == '') {
        alert("Please Enter Minor Ailment other details.");
        return false;
      }
      if (!refferedTo || refferedTo.length == 0) {
        alert("Please Select Reffered To");
        return false;
      }
      if (this.allowOtherRefferedTo && otherRefferedTo == '') {
        alert("Please Enter RefferedTo other details.");
        return false;
      }
    } else {
      if (!remarks || remarks == null) {
        alert("Please Enter Remarks");
        return false;
      }
    }

    let visitId = this.commonService.beneficiaryDetails['userVisitId'];
    let deviceId = this.commonService.beneficiaryDetails['userDeviceId'];
    let vanId = this.commonService.beneficiaryDetails['userVanId'];
    let routeVillageId = this.commonService.beneficiaryDetails['userRouteVillageId'];
    let servicePointId = this.commonService.beneficiaryDetails['userServicePointId'];
    let compoundPatientId = this.commonService.beneficiaryDetails['userCompoundPatientId'];
    let visitCount = this.commonService.beneficiaryDetails['userVisitCount'];

    alert("Form can be submitted");
  }
}
