<template>
  <div class="home py-5" :style="{'background-image': `url(${require('./../assets/tgv.jpg')})`}">
    <h1 class="white--text py-4">Envie de partir en weekend ?</h1>
    <h4 class="white--text py-4">Découvrez toutes les destinations possibles avec votre abonnement TGVmax !</h4>
    <router-link to="/search"><v-btn primary large>Rechercher</v-btn></router-link>
  </div>
</template>

<style>
  .home {
    background-size: cover;
    height: 100vh;
    text-align: center;
  }
</style>