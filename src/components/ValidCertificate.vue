<template>
  <div v-if="showDataCert" class="px-4 py-4 my-4 text-center">
    <div class="row justify-content-lg-center">
      <div class="col-lg-8 col-xl-8">
        <div class="card border-info mb-3">
          <div class="card-header text-center">Datos del Certificado</div>
          <div class="card-body">
            <div class="row justify-content-md-center justify-content-lg-center">
              <div class="col">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <span class="text-center d-block">Alumno</span>
                    <h4 class="card-title text-center">{{ data.alumno.nombreCompleto }}</h4>
                    <span class="text-center d-block">CUIT</span>
                    <h4 class="card-title text-center">{{ data.alumno.cuil }}</h4>
                  </li>
                  <li class="list-group-item">
                    <span class="text-center d-block">Modulo</span>
                    <h4 class="card-title text-center">{{ data.curso.titulo }}</h4>
                    <span class="text-center d-block">Fecha</span>
                    <h4 class="card-title text-center">{{ data.curso.fecha }}</h4>
                  </li>
                  <li class="list-group-item">
                    <span class="text-center d-block">Instituto</span>
                    <h4 class="card-title text-center">{{ data.curso.instituto }}</h4>
                  </li>
                  <li class="list-group-item">
                    <p class="text-muted">
                      <i class="bi bi-patch-check-fill text-success"></i> Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Repellendus dolor expedita numquam natus
                      doloribus est rem sit iste ullam ea dicta, porro aliquid quisquam quidem nemo
                      debitis laudantium odio fuga?
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const data = reactive({ alumno: '', curso: '' })
const props = defineProps(['certificateData'])
const showDataCert = ref(false)

watch(props, (certData) => {
  console.info(certData.certificateData)
  if (certData.certificateData.code === 0) {
    showDataCert.value = true
    data.alumno = certData.certificateData.data.alumno
    data.curso = certData.certificateData.data.curso
  }
})
</script>
