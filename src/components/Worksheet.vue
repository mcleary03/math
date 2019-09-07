<template>
  <div class="worksheet">
    <div class="title">{{ title }}</div>
    <div class="problems">
      <div v-for="(problem, i) in problems" :key="i">
        <Problem :problem="problem" :autoUpdate="true" />
      </div>
    </div>
  </div>
</template>

<script>
  import Problem from './Problem'

  export default {
    name: 'Worksheet',

    components: {
      Problem
    },

    props: {
      problems: {type: Array, default: () => []},
      title: {type: String, default: ''}
    },

    watch: {
      problems(data) {
        console.log('problems in worksheet: ', data)
      }
    },

    data() {
      return {
        
      }
    }
  }
</script>

<style scoped lang="scss">
  .worksheet {
    width: 100%;
    margin: 0;
    padding: 40px 20px;
    font-size: 1em;
  }
  .title {
    color: #666666;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
  }
  .problems {
    width: min-content;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: max-content;
    grid-auto-flow: row;
    grid-row-gap: 3em;
    grid-column-gap: 2em;
    @media screen and (max-width: 820px) {
      grid-template-columns: 1fr 1fr 1fr
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: 1fr 1fr
    }
    @media screen and (max-width: 300px) {
      grid-template-columns: 1fr
    }
  }
</style>
