<template>
  <v-snackbar
   :value="snackbar"
   :bottom="y === 'bottom'"
   :left="x === 'left'"
   :multi-line="mode === 'multi-line'"
   :right="x === 'right'"
   :timeout="timeout"
   :top="y === 'top'"
   :vertical="mode === 'vertical'"
 >
 </v-snackbar>
</template>

<script>
export default {
  name: 'mSnackbar',
  data() {
    return {
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 3000,
    };
  },
  props: {
    snackbar: { type: Boolean, default: false },
  },
};
</script>
