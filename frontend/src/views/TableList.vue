<template>
  <v-container fill-height fluid grid-list-xl>
    <v-dialog v-model="dialogOpen" width="600px">
      <v-card>
        <v-card-title class="primary">
          Add New User
          <v-spacer />
          <v-btn color="white" icon @click="dialogOpen = false">
            <v-icon large>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            
              <v-form ref= "userForm" v-model="formIsValid">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="newUser.firstName"
                      label="First Name"
                      :rules="nameRules"
                      :counter="15"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="newUser.lastName"
                      label="Last Name"
                      :rules="nameRules"
                      :counter="15"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            
          </v-container>
        </v-card-text>

        <v-card-actions class="align-center">
          <v-spacer></v-spacer>
          <v-btn @click="saveNewUser" color="success" :disabled="!formIsValid">save</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row justify="center">
      <v-col cols="12">
        <material-card
          title="Users"
          text="Here is an example of a CRUD table on the users database"
          color="primary"
        >
          <v-data-table :headers="headers" :items="items">
            <template v-slot:top>
              <v-toolbar flat>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="dialogOpen = true">Add New User</v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.action="{ item }">
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <template v-slot:item.firstName="props">
              <v-edit-dialog
                :return-value.sync="props.item.firstName"
                @save="save(props.item)"
                @cancel="cancel"
                @close="close"
              >
                {{ props.item.firstName }}
                <template v-slot:input>
                  <v-text-field v-model="props.item.firstName" label="Edit" single-line counter maxlength="15"></v-text-field>
                </template>
              </v-edit-dialog>
            </template>

            <template v-slot:item.lastName="props">
              <v-edit-dialog
                :return-value.sync="props.item.lastName"
                @save="save(props.item)"
                @cancel="cancel"
                @close="close"
              >
                {{ props.item.lastName }}
                <template v-slot:input>
                  <v-text-field v-model="props.item.lastName" label="Edit" single-line counter maxlength="15"></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        sortable: true,
        text: "ID",
        value: "id",
        align: "left"
      },
      {
        sortable: true,
        text: "First Name",
        value: "firstName",
        align: "center"
      },
      {
        sortable: true,
        text: "Last Name",
        value: "lastName",
        align: "center"
      },
      {
        sortable: false,
        text: "Delete",
        value: "action",
        align: "center"
      }
    ],
    items: [],
    snack: false,
    snackColor: "",
    snackText: "",
    dialogOpen: false,
    formIsValid: false,
    newUser: {
      firstName: "",
      lastName: ""
    },
    nameRules: [
      v => !!v || "Required",
      v => (!!v && v.length <= 15) || "Must be less than 15 characters"
    ]
  }),
  methods: {
    async deleteItem(item) {

      if(confirm('Are you sure you want to delete this user?')) {
        const response = await this.$http.post("/api/deleteUser", item);
        //find the index of the item in the table
        const index = this.items.indexOf(item)

        //remove the item from the table using the index
        this.items.splice(index, 1)
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "User Deleted!";
      }
    },
    async save(item) {
      // this is where we will put our post request for updating a record
      const response = await this.$http.post("/api/updateUser", item);
      //wait for response

      //update snack bar
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved!";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    close() {
      console.log("Dialog closed");
    },
    async saveNewUser() {
      const saveDataResponse = await this.$http.post("/api/user/" + this.newUser.lastName + "/" + this.newUser.firstName);

      if(saveDataResponse.status === 200){
        // push this data into the table
        this.items.push(saveDataResponse.data)
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "New user created with ID = " + saveDataResponse.data.id;

        //reset the form
        this.$refs.userForm.reset()
        //close the dialog
        this.dialogOpen = false;
        
      } else {
        this.snack = true;
        this.snackColor = "error";
        this.snackText = "Error Occurred. Try again later";
      }
    }
  },
  async mounted() {
    const response = await this.$http.get("/api/getAllUsers");
    this.items = response.data;
  }
};
</script>
