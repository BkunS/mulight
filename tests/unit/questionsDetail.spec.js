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
        selectQuestion: {
          "url": "/questions/12525",
          "published_at": "2019-06-24T01:39:05.023860+00:00",
          "published_atStr": "6/24/2019, 9:39:05 AM",
          "question": "Want to yolo?",
          "choices": [
              {
                  "url": "/questions/12525/choices/51415",
                  "votes": 2,
                  "choice": "Yes"
              },
              {
                  "url": "/questions/12525/choices/51416",
                  "votes": 0,
                  "choice": "No"
              }
          ],
          "choicesLen": 2
        }
      }
    })
  })
  it('renders props.question when passed', () => {
    const wrapper = shallowMount(QuestionsDetail, { store, localVue })
    expect(wrapper.find('.question').text()).to.have.string('Want to yolo?')
    expect(wrapper.contains('el-table-stub')).to.be.true
  })
})
