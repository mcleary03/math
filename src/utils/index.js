export const getRandom = digits => Math.floor(Math.random() * 10**digits)

// length is total number of problems to generate
// digits is max number of digits in a number
// numbers is max number of numbers in a problem
// operators is an array of strings
export const generateProblems = (nProblems, nDigits, nNumbers, operators) => {
  const problems = new Array(Number(nProblems)).fill(0).map( () => {
    const operator = operators[Math.floor(Math.random() * operators.length)]
    const numbers = new Array(Number(nNumbers)).fill(0).map( () => getRandom(nDigits))

    return {
      operator,
      numbers
    }
  })

  return problems
}
