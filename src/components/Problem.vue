<template>
  <div class="problem">
    <div class="feedback" v-if="showFeedback">
      <div class="good" v-if="isCorrect">CORRECT!</div>
      <div class="bad" v-if="!isCorrect">WRONG</div>
    </div>
    <div v-for="(number, i) in numbers" :key="i">
      <div class="row" v-for="(digit, i) in `${number}`.split('')" :key="i">
        <div class="carry"/>
      </div>
      <div class="row">
        <span class="number" v-if="i===numbers.length-1">
          {{ operator }}
        </span>
        <div class="number">{{ number }}</div>
      </div>
    </div>
    <div class="equals" />
    <div class="answer row">
      <input class="number" v-model="answer">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Problem',

  props: {
    autoUpdate: {type: Boolean, default: false},
    problem: {type: Object, default: () => {}}
  },

  computed: {
    isCorrect() {
      return this.solution == this.answer
    },
    solution() {
      return this.problem.numbers.reduce((val, n) => {
        switch(this.problem.operator) {
          case '+': return val + Number(n)
          case '-': return val - Number(n)
          case '*': return val * Number(n)
          // TODO should there be a default?
        }
      })
    },
    // trying to force proper rtl typing
    // answer(value='0') {
    //   return value.split('').reverse();
    // }
  },

  methods: {
    checkSolution() {
      this.showFeedback = true
    }
  },

  data() {
    return {
      answer: '',
      operator: this.problem.operator,
      numbers: this.problem.numbers,
      showFeedback: this.autoUpdate
    }
  }
}
</script>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }
  .problem {
    width: 100%;
    color: #333333;
    font-size: 1em;
  }
  .row {
    width: 100%;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
  }
  .digit {
    // height: 1.5em;
    // width: 20px;
    text-align: right;
    padding: 0.5em;
  }
  .operator {
    align-self: center;
  }
  .equals {
    height: 0;
    border: 1px solid #333333;
  }
  .number {
    border: 0;
    letter-spacing: 0.5em;
    padding: 0.5em;
    text-align: right;
    font-size: 1em;
    height: 2em;
    line-height: 2em;
    width: 100%;
    font-weight: bold;
    font-family: inherit;
  }
  .answer {
    direction: rtl;
  }
  .feedback {
    font-weight: bold;
    .good {
      color: green;
    }
    .bad {
      color: red;
    }
  }
</style>
