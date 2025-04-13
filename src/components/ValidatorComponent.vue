<script setup>
import { getValidateCertificate } from '@/helpers/getValidateCert'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

onMounted(() => {
  validateCert()
})

const API_URL = import.meta.env.VITE_URL_WEB_FIME
const route = useRoute()
const qr = route.query.qr
const version = route.query.version
const certData = ref({})
const succesScreen = ref(false)
const urlCert = ref(API_URL + 'certificates/__uuid__/pdf')

//MOCK VALIDA CERTIFICADO
const validateCert = async () => {
  const response = await getValidateCertificate({
    qrCode: qr,
    qrVersion: version,
  })
  console.log(response)
  if (response != null) {
    succesScreen.value = true
    certData.value = response
    urlCert.value = urlCert.value.replace('__uuid__', certData.value.uuid)
  }
}
</script>

<template>
  <div class="container">
    <div v-if="succesScreen">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row text-center">
                <div class="col-12">
                  <div class="row d-flex justify-content-center">
                    <div class="col-5 col-sm-3 col-md-2 col-xl-2">
                      <img class="i-valid-cert img-fluid" src="/valid-cert.png" alt="" />
                      Certificado Válido
                    </div>
                  </div>
                </div>
              </div>
              <div class="row my-3">
                <div class="col-12 text-center">
                  <h3>{{ certData.alumnoNombreCompleto }}</h3>
                  <p>{{ certData.alumnoCuit }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="alert alert-info" role="alert">
                    <div class="row">
                      <div class="col-3 d-flex justify-content-center align-items-center">
                        <i class="fa-regular fa-file-pdf fs-50"></i>
                      </div>
                      <div class="col-9">
                        <p class="cert-data-title-sm">
                          {{ certData.cursoNombre }}
                        </p>
                        <a :href="urlCert" target="_blank" class="btn btn-outline-primary"
                          >VER CERTIFICADO</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row text-center my-3">
        <div class="col-12">
          <div class="row d-flex justify-content-center">
            <div class="col-6 col-sm-5 col-md-6 col-xl-3">
              <img class="i-valid-cert img-fluid" src="/file-not-found.png" alt="" />
              <!-- <p>Nada por aqui.</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-12 text-center">
          <p class="lead">No se encontraron datos relacionados al certificado.</p>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-12 text-center">
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <router-link :to="{ name: 'home' }" class="btn btn-primary btn-lg px-4 gap-3"
              >Volver</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fs-50 {
  font-size: 50px;
}
.cert-data-title-sm {
  font-size: 18px;
}
.text-decoration-none {
  text-decoration: none;
}
</style>
