<template>
  <div id="app">

    <div :class="['menu', hideMenu]">

      <div id="params">
        <div class="param">
          <input type="number" min="1" v-model="nProblems"> <span class="label">Problem{{nProblems>1?'s':''}}</span>
        </div>
        <div class="param">
          <input type="number" min="2" v-model="nNumbers"> <span class="label">Numbers</span>
        </div>
        <div class="param">
          <input type="number" min="1" v-model="nDigits"> <span class="label">Digits</span>
        </div>
      </div>

      <div id='operators'>
        <div class="operator">
          <div>+</div><input type="checkbox" value='+' v-model="operators">
        </div>
        <div class="operator">
          <div>-</div><input type="checkbox" value='-' v-model="operators">
        </div>
        <div class="operator">
          <div>*</div><input type="checkbox" value='*' v-model="operators">
        </div>
      <!-- <div class="operator">
        <span>/</span><input type="checkbox" value='/' v-model="operators">
      </div> -->
      </div>

      <div class="menuButton" @click="hideMenu=!hideMenu"></div>

    </div>

    <div class="wrapper">
      <Worksheet class="worksheet" :title="title" :problems="problems" v-if="problems"/>
    </div>

  </div>
</template>

<script>
  import { generateProblems } from './utils'
  import Worksheet from './components/Worksheet'

  const OPERATORS = {
    '+': 'Addition',
    '-': 'Subtraction',
    '*': 'Multiplication',
    // '/': 'Division' // Division has more rules, requires extra work
  }

  export default {
    name: 'App',

    components: {
      Worksheet
    },

    computed: {
      problems() {
        console.log('updating problems: ', this.nProblems, this.nDigits, this.nNumbers, this.operators)
        return (this.nProblems && this.nDigits && this.nNumbers && this.operators.length) ? 
          generateProblems(this.nProblems, this.nDigits, this.nNumbers, this.operators) : []
      },
      title() {
        return this.operators.map( (o, i, a) => {
          return `${!i||a.length===1?'':i<a.length-1?', ':' and '}${OPERATORS[o]}`
        }).join('')
      }
    },

    data() {
      return {
        nProblems: 1,
        nNumbers: 2,
        nDigits: 1,
        operators: [],
        hideMenu: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    font-size: 20px;
    @media print {
      background-color: #ffffff;
      .menu {
        display: none;
      }
    }
  }
  .wrapper {
    display: grid;
    justify-content: center;
    margin-top: 1em;
  }
  .menu {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: 1em;
    justify-content: center;
    padding: 10px;
    background-color: #2109a8;
    color: #ffffff;
    height: 8em;
    &.hideMenu {
      height: 1em;
    }
    .menuButton {
      width: 100%;
      display: none;
      position: absolute;
      bottom: 1.5em;
      justify-self: center;
      cursor: pointer;
      &:before {
        content: '';
        border-left: 1em solid transparent;
        border-right: 1em solid transparent;
        border-bottom: 0.5em solid #ffffff;
      }
      @media screen and (max-width: 300px) {
        display: initial;
        @at-root .hideMenu {
          transform: rotate(180deg);
        }
      }
    }
    @media screen and (max-width: 300px) {
      &.hideMenu {
        height: 20em;
      }
    }
    #operators {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 2em;
      height: 5.1em;
      @media screen and (max-width: 300px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-row-gap: 0.5em;
      }
      .operator {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr; 
        font-size: 1.2em;
        font-weight: 700;
        justify-self: center;
        input[type='checkbox'] {
          font-size: inherit;
          display: block;
          margin: 0;
        }
      }
    }
    #params {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 1em;
      align-self: center;
      height: 1.5em;
      width: 100%;
      @media screen and (max-width: 300px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-row-gap: 1em;
        align-self: flex-start;
        text-align: left;
      }
      .param {
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-weight: bold;
        text-align: left;
        @media screen and (max-width: 720px) {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr;
          text-align: center;
          // grid-row-gap: 1em;
          // align-self: flex-start;
        }
        input {
          border: 0;
          border-radius: 5px;
          font-weight: bold;
          font-size: 1em;
          width: 5em;
          height: 2em;
          line-height: 2em;
        }
        .label {
          min-width: 4.5em;
          padding-left: 0.5em;
          @media screen and (max-width: 300px) {
            padding: 0;
          }
        }
      }
    }
  }
</style>
