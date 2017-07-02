<template>
  <div class="loader" :style="{width: size, height: size}"></div>
</template>

<script>
export default {
  props: ['size'],
}
</script>

<style>
  .loader {
    border: solid #eceeef;
    border-top: solid #0275d8;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
