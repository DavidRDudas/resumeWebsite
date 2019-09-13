<template>
  <v-app>
    <core-drawer />

    <core-view />

    <core-footer />
  </v-app>
</template>

<script>
export default {
  components: {
    CoreDrawer: () => import("@/components/core/Drawer"),
    CoreFooter: () => import("@/components/core/Footer"),
    CoreView: () => import("@/components/core/View")
  }
};
</script>
