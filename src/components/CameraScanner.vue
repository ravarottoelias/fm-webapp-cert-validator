<script setup>
import { reactive, ref } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'

const decodedText = ref('')

const onLoaded = () => {
  console.log('loaded')
}

const onError = () => {
  console.log('Error')
}

const onDecode = (text) => {
  decodedText.value = text
}

var videoDevices = reactive({
  count: 0,
})

navigator.mediaDevices.enumerateDevices().then(function (devices) {
  console.log(devices)
  const devicesList = devices.filter((device) => device.kind === 'videoinput')
  videoDevices.count = devicesList.length
})
</script>

<template>
  <div class="px-4 py-4 my-4 text-center" v-if="videoDevices.count == 0">
    <div class="text-danger" style="font-size: 50px"><i class="bi bi-camera-video-off"></i></div>

    <h1 class="display-5 fw-bold">Ups! Algo salió mal</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">No se encontraron dispositivos de video.</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <router-link :to="{ name: 'home' }" class="btn btn-primary btn-lg px-4 gap-3"
          >Volver</router-link
        >
      </div>
    </div>
  </div>
  <StreamBarcodeReader
    v-if="videoDevices.count > 0"
    @decode="onDecode"
    @loaded="onLoaded"
    @error="onError"
  ></StreamBarcodeReader>

  <div class="px-4">
    <div class="alert alert-info" role="alert">Devices: {{ videoDevices.count }}</div>
    <div class="alert alert-secondary" role="alert">
      The decoded value in QR/barcode is: <b>{{ decodedText }}</b>
    </div>
  </div>
</template>

<style scoped></style>
