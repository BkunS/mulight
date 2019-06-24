import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import QuestionItem from '@/components/QuestionItem.vue'

describe('QuestoinItem.vue', () => {
  it('renders props.question when passed', () => {
    const propsData = {
      question: {
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
    const wrapper = shallowMount(QuestionItem, { propsData })
    expect(wrapper.find('.questionRow').text()).to.have.string('Want to yolo?')
    expect(wrapper.find('.publishAtRow').text()).to.have.string('6/24/2019, 9:39:05 AM')
    expect(wrapper.find('.choicesLenRow').text()).to.have.string('2')
  })
})
