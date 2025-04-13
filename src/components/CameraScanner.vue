<script setup>
import { thereIsAnyVideoDevice } from '@/helpers/getVideoDevices'
import { onMounted, reactive, ref } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { useRouter } from 'vue-router'
import LoadingComponent from './LoadingComponent.vue'
import NoVideoDevicesFound from './NoVideoDevicesFound.vue'

const router = useRouter()
const decodedText = ref('')
const isLoading = ref(true)
const showQRScanner = ref(false)
const videoDevices = reactive({
  count: 0,
})
const APP_MODE_IS_DEVELOP = import.meta.env.VITE_NODE_ENV == 'development'

const onLoaded = () => {}

const onError = () => {}

const onDecode = (text) => {
  decodedText.value = text
  isLoading.value = false
  showQRScanner.value = false
  showResult(decodedText)
}

onMounted(() => {
  if (APP_MODE_IS_DEVELOP) {
    console.log('----------------------')
    console.log('APP MODE IS: ' + import.meta.env.VITE_NODE_ENV)
    console.log('----------------------')
  }
  checkVideoDevices()
})

const checkVideoDevices = async () => {
  if (await thereIsAnyVideoDevice()) {
    showQRScanner.value = true
  }
  isLoading.value = false
}

const showResult = async (decodedText) => {
  const url = new URL(decodedText.value)
  const qr = url.searchParams.get('qr')
  const version = url.searchParams.get('version')

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

const getMockCertData = () => {
  router.push({
    path: '/validate',
    query: {
      qr: '1-1',
      version: '1',
    },
  })
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

  <div v-if="APP_MODE_IS_DEVELOP" class="px-4">
    <button type="submit" class="btn btn-primary" @click="getMockCertData">
      Mock validar certificado
    </button>
    <div class="alert alert-info" role="alert">Devices: {{ videoDevices.count }}</div>
    <div class="alert alert-secondary" role="alert">
      The decoded value in QR/barcode is: <b>{{ decodedText }}</b>
    </div>
  </div>
</template>

<style scoped></style>
