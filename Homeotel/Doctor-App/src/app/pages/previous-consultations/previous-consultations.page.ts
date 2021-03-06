import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: "app-previous-consultations",
  templateUrl: "./previous-consultations.page.html",
  styleUrls: ["./previous-consultations.page.scss"]
})
export class PreviousConsultationsPage implements OnInit {
  previousConsultations = [];

  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {
   // this.loadpreviousConsultations();
   this.loadpreviousConsultationsFromSqlLite()

  }

 async  loadpreviousConsultations() {
  
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    this.apiService
      .getPreviousConsultations(this.commonService.currentDoctorId)
      .subscribe(data => {
        a.dismiss();
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.previousConsultations = [];
          data[0].forEach(data => {
            var displayName;
            if ( data.relative_id ==0) {
              displayName = data.user_name
            }
            else{
              displayName = data.relative_name
            }
            
            this.previousConsultations.push({
              userId: data.user_id,
              relativeId : data.relative_id,
              displayName: displayName,
              appointmentAt: data.appointment_at,
              doctorName: data.doctor_name,
              byName : data.user_name,
              mode: data.mode,
              photo : data.photo
            });
          });

          console.log(this.previousConsultations);

          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
      });
      });
  }


  async loadpreviousConsultationsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getPayments(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              this.previousConsultations =[];
              this.previousConsultations= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadpreviousConsultationsFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }
}
