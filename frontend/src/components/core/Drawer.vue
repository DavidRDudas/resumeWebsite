<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    src="https://cdn.pixabay.com/photo/2017/03/30/20/25/polygon-2189646_960_720.jpg"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)" />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar>
        <v-icon large>mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-title class="title">David Dudas</v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    links: [
      {
        to: "/",
        icon: "mdi-account",
        text: "About Me"
      },
      {
        to: "/table-list",
        icon: "mdi-file-table-box-multiple-outline",
        text: "Table List"
      },
      {
        to: "/projects",
        icon: "mdi-clipboard-outline",
        text: "Projects"
      },
      {
        to: "/resume",
        icon: "mdi-file-outline",
        text: "Resume"
      },
      {
        to: "/maps",
        icon: "mdi-map-marker",
        text: "My Location"
      }
      
    ]
  }),

  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"])
  }
};
</script>
