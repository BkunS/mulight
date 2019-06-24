import { shallowMount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'

import Vuex from 'vuex'
import ElementUI from 'element-ui'
import QuestionsList from '@/scenes/QuestionsList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('QuestionsList.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        questions: [{
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
        }]
      }
    })
  })
  it('renders list component', () => {
    const wrapper = shallowMount(QuestionsList, { store, localVue })
    expect(wrapper.contains('.wrapper')).to.be.true
  })
})
