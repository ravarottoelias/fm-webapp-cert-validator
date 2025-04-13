<template>
  <div class="vl-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default {
  data() {
    return {
      isLoading: true,
      fullPage: true,
    }
  },
  components: {
    Loading,
  },
  methods: {
    doAjax() {},
    onCancel() {},
  },
}
</script>
