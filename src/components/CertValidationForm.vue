<script setup></script>

<template>
  <div class="px-4 py-4 my-4 text-center">
    <img class="d-block mx-auto mb-4" src="/public/logo-fimeint.png" alt="" width="172" />
    <h1 class="display-5 fw-bold">Validador de Certificados</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">
        Puede validar los certificados emitidos por FIMe escaneando el QR que se encuentra en la
        parte inferior del certificado.
      </p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <router-link :to="{ name: 'qrValidator' }" class="btn btn-primary btn-lg px-4 gap-3"
          >Escanear QR</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
