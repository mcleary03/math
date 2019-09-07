import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
import { generateProblems } from '../../src/utils'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

describe('problemGenerator', () => {
  it('handles 0 problems', () => {
    expect(generateProblems(0, 1, 2, '+').length).toBe(0)
  })
  it('handles 10 problems', () => {
    expect(generateProblems(10, 1, 2, '+').length).toBe(10)
  })
})
