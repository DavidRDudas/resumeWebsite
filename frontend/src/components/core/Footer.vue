<template>
  <v-footer id="core-footer" absolute height="75">
    <v-spacer />
    <span class="font-weight-light copyright">
      <i class="mr-1">
        <v-icon>mdi-copyright</v-icon>
        {{ year }}
      </i>
      <b>David Dudas</b>
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    year: new Date().getFullYear()
  })
};
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
