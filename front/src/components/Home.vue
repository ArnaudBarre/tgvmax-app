<template>
  <div class="home py-5" :style="{'background-image': `url(${require('./../assets/tgv.jpg')})`}">
    <h1 class="text-white py-5">Envie de partir en weekend ?</h1>
    <h4 class="text-white py-5">Découvrez toutes les destinations possibles avec votre abonnement TGVmax !</h4>
    <router-link class="btn btn-primary btn-lg my-5" tag="button" to="/search">Rechercher</router-link>
  </div>
</template>

<style>
  .home {
    background-size: cover;
    height: 100vh;
    text-align: center;
  }
</style>