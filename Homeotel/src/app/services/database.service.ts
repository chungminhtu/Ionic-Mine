import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { Platform } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { UtilitiesService } from "./utilities.service";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  dbObject: SQLiteObject;
  isDbReady: boolean = false;

  database_name: string = "homeotel_dev_2.db";

  // Tables
  table_users = "table_users";

  constructor(
    private plt: Platform,
    public sqlite: SQLite,
    private http: HttpClient,
    private sqlitePorter: SQLitePorter,
    private utilities: UtilitiesService
  ) {
    this.createDb();
  }

  createDb() {
    return this.plt.ready().then(() => {
      return this.sqlite
        .create({
          name: this.database_name,
          location: "default",
        })
        .then(async (db: SQLiteObject) => {
          this.dbObject = await db;
          console.log("database - createDb - Success -> " + JSON.stringify(db));
          return db;
        })
        .catch((error) => {
          console.warn(
            "database - createDb - Error -> " + JSON.stringify(error)
          );
          return false;
        });
    });
  }

  seedSql() {
    return this.http
      .get("assets/homeotel_dev_1.sql", { responseType: "text" })
      .toPromise()
      .then((sql) => {
        return this.sqlitePorter
          .importSqlToDb(this.dbObject, sql)
          .then(async (res) => {
            let getRes = await res;
            console.log("SQL file imported successfully... :)");
            this.isDbReady = true;
            return true;
          })
          .catch((error) => {
            console.warn("SQL file import error => " + JSON.stringify(error));
            return false;
          });
      });
  }

  exportDatabaseToSql() {
    this.sqlitePorter.exportDbToSql(this.database_name).then((data) => {
      console.log("Database has been exported" + JSON.stringify(data));
    });
  }

  checkTable() {
    return this.createDb().then(async (res: SQLiteObject) => {
      console.log("log from checkTable func");
      let data = await res;
      let sql = "SELECT name FROM sqlite_master WHERE type='table' AND name=?";
      return data
        .executeSql(sql, [this.table_users])
        .then((res) => {
          console.log(
            "database - checkTable - Success -> " + JSON.stringify(res)
          );
          if (res.rows.length <= 0) {
            return this.seedSql().then(async (res) => {
              let data = await res;
              if (data != null) {
                return true;
              }
            });
          } else {
            this.isDbReady = true;
            return true;
          }
        })
        .catch((error) => {
          console.warn(
            "database - checkTable - Error -> " + JSON.stringify(error)
          );
          return false;
        });
    });
  }

  // -------------------------- For reference - starts  --------------------------
  insertItem(name_model) {
    let sql = "INSERT INTO myfreakytable (name) VALUES (?)";
    return this.dbObject
      .executeSql(sql, [name_model])
      .then((res) => {
        console.log(
          "database - insertItem - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch((error) => {
        console.warn(
          "database - insertItem - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  getItems() {
    let sql = "SELECT * FROM myfreakytable";
    return this.dbObject.executeSql(sql, []).then((res) => {
      let names = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          names.push(res.rows.item(i));
        }
      }
      return names;
    });
  }

  getTables() {
    let sql = "SELECT name FROM sqlite_master WHERE type ='table'";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let tables = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          tables.push({
            tableName: data.rows.item(i).name,
          });
        }
      }
      return tables;
    });
  }

  deleteItem(id) {
    let sql = "DELETE FROM myfreakytable WHERE pid = ?";
    return this.dbObject
      .executeSql(sql, [id])
      .then((res) => {
        console.log(
          "database - deleteItem - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch((error) => {
        console.warn(
          "database - deleteItem - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }
  // -------------------------- For reference - ends  --------------------------}
  getSmokingMasters() {
    let sql = "SELECT smoking_id, name FROM m_smoking where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let smokingMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          smokingMasterData.push({
            smoking_id: data.rows.item(i).smoking_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return smokingMasterData;
    });
  }

  getAlcoholMasters() {
    let sql = "SELECT alcohol_id, name FROM m_alcohol where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let alcoholMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          alcoholMasterData.push({
            alcohol_id: data.rows.item(i).alcohol_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return alcoholMasterData;
    });
  }

  getExcerciseMasters() {
    let sql = "SELECT excercise_id, name FROM m_excercise where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let excerciseMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          excerciseMasterData.push({
            excercise_id: data.rows.item(i).excercise_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return excerciseMasterData;
    });
  }

  getActivityLevelMasters() {
    let sql =
      "SELECT activity_level_id, name FROM m_activity_level where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let activityLevelMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          activityLevelMasterData.push({
            activity_level_id: data.rows.item(i).activity_level_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return activityLevelMasterData;
    });
  }

  getProfessionMasters() {
    let sql = "SELECT profession_id, name FROM m_profession where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let professionMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          professionMasterData.push({
            profession_id: data.rows.item(i).profession_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return professionMasterData;
    });
  }

  getFoodMasters() {
    let sql = "SELECT food_id, name FROM m_food where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let foodMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          foodMasterData.push({
            food_id: data.rows.item(i).food_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return foodMasterData;
    });
  }

  getHeatMasters() {
    let sql = "SELECT heat_id, name FROM m_heat where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let heatMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          heatMasterData.push({
            heat_id: data.rows.item(i).heat_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return heatMasterData;
    });
  }

  crudOperations(query) {
    return this.dbObject
      .executeSql(query, [])
      .then((res) => {
        console.log(
          "database - crudOperation - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch((error) => {
        console.warn(
          "database - crudOperation - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  getLifestyleMasters() {
    let lifestyleMasterData = [];
    let sql = `SELECT smoking_id as id, name, 'table_smoking' as master_type FROM m_smoking where is_active = 1 
    UNION ALL
  SELECT alcohol_id as id, name, 'table_alcohol' as master_type FROM m_alcohol where is_active =1
    UNION ALL
  SELECT excercise_id as id, name, 'table_excercise' as master_type FROM m_excercise where is_active =1
    UNION ALL
  SELECT activity_level_id as id, name, 'table_activity_level' as master_type FROM m_activity_level where is_active =1
    UNION ALL
  SELECT profession_id as id, name, 'table_profession' as master_type FROM m_profession where is_active =1
    UNION ALL
  SELECT food_id as id, name, 'table_food' as master_type FROM m_food where is_active =1
    UNION ALL
  SELECT heat_id as id, name, 'table_heat' as master_type FROM m_heat where is_active =1`;
    return this.dbObject
      .executeSql(sql, [])
      .then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            lifestyleMasterData.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              master_type: data.rows.item(i).master_type,
            });
          }
        }
        return lifestyleMasterData;
      })
      .catch((err) => {
        console.error(
          "Error -> getLifestyleMasters() function returned error." +
            JSON.stringify(err)
        );
      });
  }

  getLifestyles(IN_user_id, IN_relative_id) {
    let sql = `SELECT lifestyle_id, user_id, relative_id, smoking_id, alcohol_id, excercise_id,
    activity_level_id, profession_id, food_id, heat_id FROM ehr_lifestyle WHERE user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let lifestyleData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          lifestyleData.push({
            lifestyle_id: res.rows.item(i).lifestyle_id,
            user_id: res.rows.item(i).user_id,
            relative_id: res.rows.item(i).relative_id,
            smoking_id: res.rows.item(i).smoking_id,
            alcohol_id: res.rows.item(i).alcohol_id,
            excercise_id: res.rows.item(i).excercise_id,
            activity_level_id: res.rows.item(i).activity_level_id,
            profession_id: res.rows.item(i).profession_id,
            food_id: res.rows.item(i).food_id,
            heat_id: res.rows.item(i).heat_id,
          });
        }
      }
      return lifestyleData;
    });
  }

  getProfileDetails(IN_user_id) {
    let sql = `SELECT * FROM d_user WHERE user_id = ${IN_user_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let profileDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          profileDetails.push({
            name: res.rows.item(i).name,
            phone: res.rows.item(i).phone,
            email: res.rows.item(i).email,
            gender_id: res.rows.item(i).gender_id,
            dob: res.rows.item(i).dob,
            blood_group_id: res.rows.item(i).blood_group_id,
            marital_status_id: res.rows.item(i).marital_status_id,
            height: res.rows.item(i).height,
            weight: res.rows.item(i).weight,
          });
        }
      }
      return profileDetails;
    });
  }

  getProfileRelatedMasters() {
    let profileRelatedMasters = [];
    let sql = `SELECT blood_group_id AS id, name AS name, 'blood_group' as master_type from m_blood_group WHERE is_active = 1
    Union
    SELECT marital_status_id AS id, name AS name, 'marital_status' as master_type from m_marital_status WHERE is_active = 1
    Union
    SELECT gender_id AS id, name AS name, 'gender' as master_type from m_gender WHERE is_active = 1`;
    return this.dbObject
      .executeSql(sql, [])
      .then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            profileRelatedMasters.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              master_type: data.rows.item(i).master_type,
            });
          }
        }
        return profileRelatedMasters;
      })
      .catch((err) => {
        console.error(
          "Error -> getLifestyleMasters() function returned error." +
            JSON.stringify(err)
        );
      });
  }

  getProfilePhoto(IN_user_id) {
    let sql = `SELECT photo FROM du_photo WHERE user_id = ${IN_user_id} relative_id = 0`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let profilePhoto = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          profilePhoto.push({
            photo: res.rows.item(i).photo,
          });
        }
      }
      return profilePhoto;
    });
  }
}
