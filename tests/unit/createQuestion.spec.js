import { shallowMount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'

import ElementUI from 'element-ui'
import CreateQuestion from '@/scenes/CreateQuestion.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('CreateQuestion.vue', () => {
  it('renders form component', () => {
    const wrapper = shallowMount(CreateQuestion, { localVue })
    expect(wrapper.contains('.questionForm')).to.be.true
  })
})
