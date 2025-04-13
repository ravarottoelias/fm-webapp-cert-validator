<script setup>
import { thereIsAnyVideoDevice } from '@/helpers/getVideoDevices'
import { onMounted, reactive, ref } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { useRouter } from 'vue-router'
import LoadingComponent from './LoadingComponent.vue'
import NoVideoDevicesFound from './NoVideoDevicesFound.vue'
import ValidCertificate from './ValidCertificate.vue'

const router = useRouter()
const decodedText = ref('')
const isLoading = ref(true)
const showQRScanner = ref(false)
const videoDevices = reactive({
  count: 0,
})
const certificateData = ref('')

const onLoaded = () => {
  console.log('loaded')
}

const onError = () => {
  console.log('Error')
}

const onDecode = (text) => {
  decodedText.value = text
  isLoading.value = false
  showQRScanner.value = false
  showResult(decodedText)
}

onMounted(() => {
  // navigator.mediaDevices.enumerateDevices().then(function (devices) {
  //   const devicesList = devices.filter((device) => device.kind === 'videoinput')
  //   videoDevices.count = devicesList.length
  //   if (videoDevices.count > 0) {
  //     showQRScanner.value = true
  //   }
  //   isLoading.value = false
  // })
  checkVideoDevices()
})

const checkVideoDevices = async () => {
  if (await thereIsAnyVideoDevice()) {
    showQRScanner.value = true
  }
  isLoading.value = false
}

//MOCK VALIDA CERTIFICADO
const showResult = async (decodedText) => {
  const url = new URL(decodedText.value)
  const qr = url.searchParams.get('qr')
  const version = url.searchParams.get('version')
  console.log(qr)

  if (qr != null) {
    router.push({
      path: '/validate',
      query: {
        qr: qr,
        version: version,
      },
    })
  } else {
    alert('FALLO')
  }
}
</script>

<template>
  <NoVideoDevicesFound v-if="videoDevices.count == 0" />

  <LoadingComponent v-if="isLoading" />

  <StreamBarcodeReader
    v-if="showQRScanner"
    @decode="onDecode"
    @loaded="onLoaded"
    @error="onError"
  ></StreamBarcodeReader>

  <ValidCertificate :certificateData="certificateData" />

  <div class="px-4">
    <button type="submit" class="btn btn-primary" @click="validateCert">
      Mock validar certificado
    </button>
    <div class="alert alert-info" role="alert">Devices: {{ videoDevices.count }}</div>
    <div class="alert alert-secondary" role="alert">
      The decoded value in QR/barcode is: <b>{{ decodedText }}</b>
    </div>
  </div>
</template>

<style scoped></style>
