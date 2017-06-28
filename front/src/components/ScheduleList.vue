<template>
  <div>
    <h5 class="text-muted">{{title}}{{list.length > 1 ? 's' : ''}}</h5>
    <transition-group name="toggle">
      <div v-for="schedule in schedules" :key="schedule">{{schedule}}</div>
    </transition-group>
    <div v-if="list.length > 3">
      <div>
        <img class="arrow" v-show="hide" @click="hide = !hide" src="../assets/arrow-down.png"/>
        <img class="arrow" v-show="!hide" @click="hide = !hide" src="../assets/arrow-up.png"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'list'],
  data () {
    return {
      hide: true
    }
  },
  computed: {
    schedules () {
      return this.hide ? this.list.slice(0, this.list.length == 3 ? 3 : 2) : this.list
    }
  }
}
</script>

<style>
  .arrow {
    height: 32px;
    border-radius: 50%;
  }

  .arrow:hover {
    background-color: #e1e1e1;
  }

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