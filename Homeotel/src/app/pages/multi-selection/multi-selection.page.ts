import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-multi-selection",
  templateUrl: "./multi-selection.page.html",
  styleUrls: ["./multi-selection.page.scss"],
})
export class MultiSelectionPage implements OnInit {
  title;
  arrayOfObjects;
  selectedObjects;
  clonedArrayOfObjects;

  constructor(
    private utilities: UtilitiesService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(
      "this.utilities.medicalHistoryPageState['selectedMedicalHistory'] is below"
    );
    console.log(
      this.utilities.medicalHistoryPageState["selectedMedicalHistory"]
    );

    let master = this.utilities.medicalHistoryPageState[
      "selectedMedicalHistory"
    ]["masterDataTag"];
    let currentMasters = this.utilities.medicalHistoryPageState[master];
    console.log("Current master data is below");
    console.log(currentMasters);

    this.title = this.utilities.medicalHistoryPageState[
      "selectedMedicalHistory"
    ]["name"];

    let data = this.utilities.medicalHistoryPageState["selectedMedicalHistory"][
      "data"
    ];

    console.log("data is below");
    console.log(data);

    if (data.length > 0) {
      this.selectedObjects = data.map((item) => {
        return item["injury_id"];
      });
    }

    console.log("this.selectedObjects is below");
    console.log(this.selectedObjects);

    let j = 0;
    let generated = currentMasters.map((items) => {
      return { ...items, id: j++, isSelected: false };
    });

    console.log("generated is below");
    console.log(generated);

    let i = 0;
    this.clonedArrayOfObjects = this.arrayOfObjects = currentMasters.map(
      (items) => {
        return {
          ...items,
          id: i++,
          isSelected: this.selectedObjects.includes(items["injury_id"])
            ? true
            : false,
        };
      }
    );
    console.log("this.clonedArrayOfObjects is below");
    console.log(this.clonedArrayOfObjects);

    // this.selectedObjects = [];
  }

  onChange(word) {
    console.log("Searched word -> " + word);
    this.clonedArrayOfObjects = this.arrayOfObjects.filter((q) => {
      const regex = new RegExp(`${word}`, "gi");
      return !q.isSelected && q.name.match(regex);
    });
    console.log(JSON.stringify(this.arrayOfObjects));
  }

  chooser(id) {
    console.log("Item will be chosen " + id);
    this.arrayOfObjects[id]["isSelected"] = true;
    this.selectedObjects.push(id);
  }

  remover(id) {
    console.log("Item will be removed " + id);
    this.arrayOfObjects[id]["isSelected"] = false;
    this.selectedObjects = this.selectedObjects.filter(
      (option) => option != id
    );
  }

  save() {
    if (this.selectedObjects.length == 0) {
      alert("Please select at least one item");
      return false;
    }
    console.log("this.selectedObjects are below");
    console.log(this.selectedObjects);
    this.router.navigate(["/medical-history"]);
  }
}
