<template>
  <div class="text-xs-center">
    <transition-group name="toggle">
      <div v-for="schedule in schedules" :key="schedule">{{schedule}}</div>
    </transition-group>
    <div v-if="list.length > 3">
      <v-btn class="ma-0" icon @click.native="hide = !hide">
        <v-icon class="primary--text">{{hide ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      hide: true
    }
  },
  computed: {
    schedules () {
      return this.hide ? this.list.slice(0, this.list.length === 3 ? 3 : 2) : this.list
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