import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BeneficiaryRegistrationPageRoutingModule } from "./beneficiary-registration-routing.module";

import { BeneficiaryRegistrationPage } from "./beneficiary-registration.page";
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiaryRegistrationPageRoutingModule,
    ExporterModule
  ],
  declarations: [BeneficiaryRegistrationPage],
  exports: []
})
export class BeneficiaryRegistrationPageModule {}
