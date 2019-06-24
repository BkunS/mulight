import { shallowMount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'

import Vuex from 'vuex'
import ElementUI from 'element-ui'
import QuestionsDetail from '@/scenes/QuestionsDetail.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('QuestoinsDetail.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        selectQuestion: '/questions/7'
      }
    })
  })
  it('renders props.question when passed', () => {
    const wrapper = shallowMount(QuestionsDetail, { store, localVue })
    expect(wrapper.find('.question').text()).to.have.string('Question:')
    expect(wrapper.contains('el-table-stub')).to.be.true
  })
})
