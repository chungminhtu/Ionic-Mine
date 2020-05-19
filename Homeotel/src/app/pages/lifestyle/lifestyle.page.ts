import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-lifestyle",
  templateUrl: "./lifestyle.page.html",
  styleUrls: ["./lifestyle.page.scss"],
})
export class LifestylePage implements OnInit {
  lifestyles;

  smoking = "Select";
  alcohol = "Select";
  excercise = "Select";
  activity = "Select";
  profession = "Select";
  food = "Select";
  heat = "Select";

  smokingId: number = null;
  alcoholId: number = null;
  excerciseId: number = null;
  activityId: number = null;
  professionId: number = null;
  foodId: number = null;
  heatId: number = null;

  m_smoking: any[] = [];
  m_alcohol: any[] = [];
  m_excercise: any[] = [];
  m_activity: any[] = [];
  m_profession: any[] = [];
  m_food: any[] = [];
  m_heat: any[] = [];

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private db: DatabaseService,
    private router: Router
  ) {
    this.getLifestyles();
  }

  ngOnInit() {
    this.loadLifestyles();
    this.loadLifestyles_SQLite();
  }

  loadLifestyles() {
    this.lifestyles = [
      {
        id: 0,
        name: "Smoking",
        tag: "smoking",
        list: this.smoking,
        value: this.smokingId,
        masterDataTag: "m_smoking",
        redirectTo: "/edit-lifestyle/1",
      },
      {
        id: 1,
        name: "Alcohol",
        tag: "alcohol",
        list: this.alcohol,
        value: this.alcoholId,
        masterDataTag: "m_alcohol",
        redirectTo: "/edit-lifestyle/1/2",
      },
      {
        id: 2,
        name: "Excercise",
        tag: "excercise",
        list: this.excercise,
        value: this.excerciseId,
        masterDataTag: "m_excercise",
        redirectTo: "/edit-lifestyle/1/2/3",
      },
      {
        id: 3,
        name: "Activity level",
        tag: "activity",
        list: this.activity,
        value: this.activityId,
        masterDataTag: "m_activity",
        redirectTo: "/edit-lifestyle/1/2/3/4",
      },
      {
        id: 4,
        name: "Profession",
        tag: "profession",
        list: this.profession,
        value: this.professionId,
        masterDataTag: "m_profession",
        redirectTo: "/edit-lifestyle/1/2/3/4/5",
      },
      {
        id: 5,
        name: "Food preferences",
        tag: "food",
        list: this.food,
        value: this.foodId,
        masterDataTag: "m_food",
        redirectTo: "/edit-lifestyle/1/2/3/4/5/6",
      },
      {
        id: 6,
        name: "Heat preferences",
        tag: "heat",
        list: this.heat,
        value: this.heatId,
        masterDataTag: "m_heat",
        redirectTo: "/edit-lifestyle/1/2/3/4/5/6/7",
      },
    ];
  }

  async getLifestyles() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getLifestyles().subscribe((data) => {
            a.dismiss();
            console.log("Returned from Backend");
            console.log(data);
            if (this.utilities.isInvalidApiResponseData(data)) {
              console.log("Returned Error");
            } else {
              if (
                typeof data != "undefined" &&
                typeof data[0] != "undefined" &&
                typeof data[0][0] != "undefined"
              ) {
                console.log("Data returned from backend");

                this.m_smoking = data[0];
                this.m_smoking = this.m_smoking.map((item) => {
                  return { ...item, self_id: item["smoking_id"] };
                });
                this.utilities.lifestylePageState["m_smoking"] = this.m_smoking;
                console.log("this.m_smoking is below");
                console.log(this.m_smoking);

                this.m_alcohol = data[1];
                this.m_alcohol = this.m_alcohol.map((item) => {
                  return { ...item, self_id: item["alcohol_id"] };
                });
                this.utilities.lifestylePageState["m_alcohol"] = this.m_alcohol;
                console.log("this.m_alcohol is below");
                console.log(this.m_alcohol);

                this.m_excercise = data[2];
                this.m_excercise = this.m_excercise.map((item) => {
                  return { ...item, self_id: item["excercise_id"] };
                });
                this.utilities.lifestylePageState[
                  "m_excercise"
                ] = this.m_excercise;
                console.log("this.m_excercise is below");
                console.log(this.m_excercise);

                this.m_activity = data[3];
                this.m_activity = this.m_activity.map((item) => {
                  return { ...item, self_id: item["activity_level_id"] };
                });
                this.utilities.lifestylePageState[
                  "m_activity"
                ] = this.m_activity;
                console.log("this.m_activity_level is below");
                console.log(this.m_activity);

                this.m_profession = data[4];
                this.m_profession = this.m_profession.map((item) => {
                  return { ...item, self_id: item["profession_id"] };
                });
                this.utilities.lifestylePageState[
                  "m_profession"
                ] = this.m_profession;
                console.log("this.m_profession is below");
                console.log(this.m_profession);

                this.m_food = data[5];
                this.m_food = this.m_food.map((item) => {
                  return { ...item, self_id: item["food_id"] };
                });
                this.utilities.lifestylePageState["m_food"] = this.m_food;
                console.log("this.m_food is below");
                console.log(this.m_food);

                this.m_heat = data[6];
                this.m_heat = this.m_heat.map((item) => {
                  return { ...item, self_id: item["heat_id"] };
                });
                this.utilities.lifestylePageState["m_heat"] = this.m_heat;
                console.log("this.m_heat is below");
                console.log(this.m_heat);

                if (data[7].length > 0) {
                  let smokingInfo = data[7][0];
                  console.log("smoking is below");
                  console.log(smokingInfo);
                  this.smokingId = smokingInfo["smoking_id"];
                  this.smoking = smokingInfo["name"];
                }
                this.utilities.lifestylePageState["smokingId"] = this.smokingId;

                if (data[8].length > 0) {
                  let alcoholInfo = data[8][0];
                  console.log("alcohol is below");
                  console.log(alcoholInfo);
                  this.alcoholId = alcoholInfo["alcohol_id"];
                  this.alcohol = alcoholInfo["name"];
                }
                this.utilities.lifestylePageState["alcoholId"] = this.alcoholId;

                if (data[9].length > 0) {
                  let excerciseInfo = data[9][0];
                  console.log("excercise is below");
                  console.log(excerciseInfo);
                  this.excerciseId = excerciseInfo["excercise_id"];
                  this.excercise = excerciseInfo["name"];
                }
                this.utilities.lifestylePageState[
                  "excerciseId"
                ] = this.excerciseId;

                if (data[10].length > 0) {
                  let activityInfo = data[10][0];
                  console.log("activity is below");
                  console.log(activityInfo);
                  this.activityId = activityInfo["activity_level_id"];
                  this.activity = activityInfo["name"];
                }
                this.utilities.lifestylePageState[
                  "activityId"
                ] = this.activityId;

                if (data[11].length > 0) {
                  let professionInfo = data[11][0];
                  console.log("profession is below");
                  console.log(professionInfo);
                  this.professionId = professionInfo["profession_id"];
                  this.profession = professionInfo["name"];
                }
                this.utilities.lifestylePageState[
                  "professionId"
                ] = this.professionId;

                if (data[12].length > 0) {
                  let foodInfo = data[12][0];
                  console.log("food is below");
                  console.log(foodInfo);
                  this.foodId = foodInfo["food_id"];
                  this.food = foodInfo["name"];
                }
                this.utilities.lifestylePageState["foodId"] = this.foodId;

                if (data[13].length > 0) {
                  let heatInfo = data[13][0];
                  console.log("heat is below");
                  console.log(heatInfo);
                  this.heatId = heatInfo["heat_id"];
                  this.heat = heatInfo["name"];
                }
                this.utilities.lifestylePageState["heatId"] = this.heatId;

                this.loadLifestyles();
              } else {
                console.log("Something went wrong in data");
              }
            }
          });
        });
      });
  }

  loadLifestyles_SQLite() {
    this.db
      .getLifestyles()
      .then((lifestyleDetails) => {
        console.log("Received lifestyle details are below -> ");
        console.log(JSON.stringify(lifestyleDetails));
      })
      .catch((error) => {
        console.error(
          "Error -> loadLifestyles_SQLite() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  redirect(id) {
    console.log("Selected ID -> " + id);
    console.log(this.lifestyles[id]);
    this.utilities.lifestylePageState["selectedLifestyle"] = this.lifestyles[
      id
    ];

    this.router.navigate([this.lifestyles[id]["redirectTo"]]);
  }
}
