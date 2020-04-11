import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "initialization", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "initialization",
    loadChildren: () =>
      import("./pages/initialization/initialization.module").then(
        (m) => m.InitializationPageModule
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then((m) => m.ProfilePageModule),
  },
  {
    path: "doctors",
    loadChildren: () =>
      import("./pages/doctors/doctors.module").then((m) => m.DoctorsPageModule),
  },
  {
    path: "records",
    loadChildren: () =>
      import("./pages/records/records.module").then((m) => m.RecordsPageModule),
  },
  {
    path: "family-members",
    loadChildren: () =>
      import("./pages/family-members/family-members.module").then(
        (m) => m.FamilyMembersPageModule
      ),
  },
  {
    path: "view-doctor/:id",
    loadChildren: () =>
      import("./pages/view-doctor/view-doctor.module").then(
        (m) => m.ViewDoctorPageModule
      ),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./pages/settings/settings.module").then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: "help-center",
    loadChildren: () =>
      import("./pages/help-center/help-center.module").then(
        (m) => m.HelpCenterPageModule
      ),
  },
  {
    path: "homeo-kits/:doctor-id",
    loadChildren: () =>
      import("./pages/homeo-kits/homeo-kits.module").then(
        (m) => m.HomeoKitsPageModule
      ),
  },
  {
    path: "homeo-kits",
    loadChildren: () =>
      import("./pages/homeo-kits/homeo-kits.module").then(
        (m) => m.HomeoKitsPageModule
      ),
  },
  {
    path: "health-records",
    loadChildren: () =>
      import("./pages/health-records/health-records.module").then(
        (m) => m.HealthRecordsPageModule
      ),
  },
  {
    path: "appointments",
    loadChildren: () =>
      import("./pages/appointments/appointments.module").then(
        (m) => m.AppointmentsPageModule
      ),
  },
  {
    path: "payments/:id",
    loadChildren: () =>
      import("./pages/payments/payments.module").then(
        (m) => m.PaymentsPageModule
      ),
  },
  {
    path: "payments",
    loadChildren: () =>
      import("./pages/payments/payments.module").then(
        (m) => m.PaymentsPageModule
      ),
  },
  {
    path: "my-doctors",
    loadChildren: () =>
      import("./pages/my-doctors/my-doctors.module").then(
        (m) => m.MyDoctorsPageModule
      ),
  },
  {
    path: "modal",
    loadChildren: () =>
      import("./pages/modal/modal.module").then((m) => m.ModalPageModule),
  },
  {
    path: "payment-gateways",
    loadChildren: () =>
      import("./pages/payment-gateways/payment-gateways.module").then(
        (m) => m.PaymentGatewaysPageModule
      ),
  },
  {
    path: "slot-selection",
    loadChildren: () =>
      import("./pages/slot-selection/slot-selection.module").then(
        (m) => m.SlotSelectionPageModule
      ),
  },
  {
    path: "consultation-details",
    loadChildren: () =>
      import("./pages/consultation-details/consultation-details.module").then(
        (m) => m.ConsultationDetailsPageModule
      ),
  },
  {
    path: "issue-details/:id",
    loadChildren: () =>
      import("./pages/issue-details/issue-details.module").then(
        (m) => m.IssueDetailsPageModule
      ),
  },
  {
    path: "appointment-details",
    loadChildren: () =>
      import("./pages/appointment-details/appointment-details.module").then(
        (m) => m.AppointmentDetailsPageModule
      ),
  },
  {
    path: "appointment-questions/:one/:two/:three/:four",
    loadChildren: () =>
      import("./pages/appointment-questions/appointment-questions.module").then(
        (m) => m.AppointmentQuestionsPageModule
      ),
  },
  {
    path: "appointment-questions/:one/:two/:three",
    loadChildren: () =>
      import("./pages/appointment-questions/appointment-questions.module").then(
        (m) => m.AppointmentQuestionsPageModule
      ),
  },
  {
    path: "appointment-questions/:one/:two",
    loadChildren: () =>
      import("./pages/appointment-questions/appointment-questions.module").then(
        (m) => m.AppointmentQuestionsPageModule
      ),
  },
  {
    path: "appointment-questions/:one",
    loadChildren: () =>
      import("./pages/appointment-questions/appointment-questions.module").then(
        (m) => m.AppointmentQuestionsPageModule
      ),
  },
  {
    path: "vitals",
    loadChildren: () =>
      import("./pages/vitals/vitals.module").then((m) => m.VitalsPageModule),
  },
  {
    path: "vital-questions/:one/:two/:three/:four",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        (m) => m.VitalQuestionsPageModule
      ),
  },
  {
    path: "vital-questions/:one/:two/:three",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        (m) => m.VitalQuestionsPageModule
      ),
  },
  {
    path: "vital-questions/:one/:two",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        (m) => m.VitalQuestionsPageModule
      ),
  },
  {
    path: "vital-questions/:one",
    loadChildren: () =>
      import("./pages/vital-questions/vital-questions.module").then(
        (m) => m.VitalQuestionsPageModule
      ),
  },
  {
    path: "medical-history",
    loadChildren: () =>
      import("./pages/medical-history/medical-history.module").then(
        (m) => m.MedicalHistoryPageModule
      ),
  },
  {
    path: "lifestyle",
    loadChildren: () =>
      import("./pages/lifestyle/lifestyle.module").then(
        (m) => m.LifestylePageModule
      ),
  },
  {
    path: "files",
    loadChildren: () =>
      import("./pages/files/files.module").then((m) => m.FilesPageModule),
  },
  {
    path: "previous-consultations",
    loadChildren: () =>
      import(
        "./pages/previous-consultations/previous-consultations.module"
      ).then((m) => m.PreviousConsultationsPageModule),
  },
  {
    path: "completed-consultation-details",
    loadChildren: () =>
      import(
        "./pages/completed-consultation-details/completed-consultation-details.module"
      ).then((m) => m.CompletedConsultationDetailsPageModule),
  },
  {
    path: "edit-file",
    loadChildren: () =>
      import("./pages/edit-file/edit-file.module").then(
        (m) => m.EditFilePageModule
      ),
  },
  {
    path: "allergies",
    loadChildren: () =>
      import("./pages/allergies/allergies.module").then(
        (m) => m.AllergiesPageModule
      ),
  },
  {
    path: "single-selection",
    loadChildren: () =>
      import("./pages/single-selection/single-selection.module").then(
        (m) => m.SingleSelectionPageModule
      ),
  },
  {
    path: "edit-profile/:one/:two/:three/:four/:five/:six/:seven/:eight/:nine",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "edit-profile/:one/:two/:three/:four/:five/:six/:seven/:eight",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "edit-profile/:one/:two/:three/:four/:five/:six/:seven",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "edit-profile/:one/:two/:three/:four/:five/:six",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "edit-profile/:one/:two/:three/:four/:five",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "edit-profile/:one/:two/:three/:four",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "edit-profile/:one/:two/:three",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "edit-profile/:one/:two",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "edit-profile/:one",
    loadChildren: () =>
      import("./pages/edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },  {
    path: 'multi-selection',
    loadChildren: () => import('./pages/multi-selection/multi-selection.module').then( m => m.MultiSelectionPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
