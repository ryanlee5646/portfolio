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
   {{ text }}
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
      text: '크롬 브라우저에 최적화되어 있습니다',
    };
  },
  props: {
    snackbar: { type: Boolean, default: false },
  },
};
</script>
