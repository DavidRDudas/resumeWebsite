<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <material-card color="blue">
          <v-avatar slot="offset" class="mx-auto d-block elevation-6" size="130">
            <img src="https://heartland.cc/wp-content/uploads/2018/02/male-placeholder.jpg" />
          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3">Computer Science Graduate Student</h6>

            <h4 class="font-weight-light">David Dudas</h4>

            <p class="font-weight-light">I am currently enrolled as a student, while working full time. My interests vary from machine learning to computer graphics. I have a wide range of hobbies, but particularly focus on programming, game development, writing, reading, cycling, and photography </p>

            <v-btn color="primary" href="mailto:daviddudas@hotmail.com">Email Me</v-btn>

          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  //
};
</script>
