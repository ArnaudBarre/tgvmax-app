<template>
  <div class="text-xs-center">
    <transition-group name="toggle">
      <div v-for="schedule in schedules" :key="schedule">{{schedule}}</div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: ['list', 'hide'],
  computed: {
    schedules() {
      return this.hide ? this.list.slice(0, 3) : this.list
    }
  }
}
</script>

<style>
  .toggle-enter-active, .toggle-leave-active {
    transition: .6s;
  }

  .toggle-enter, .toggle-leave-to {
    opacity: 0;
    height: 0;
  }

  .toggle-enter-to, .toggle-leave {
    height: 24px;
  }
</style>
