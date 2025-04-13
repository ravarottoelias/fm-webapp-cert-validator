<template>
  <div class="px-4 py-4 my-4 text-center">
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
</template>
