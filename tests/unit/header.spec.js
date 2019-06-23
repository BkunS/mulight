import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Header from '@/components/Header.vue'

describe('Header.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'Test Title'
    const wrapper = shallowMount(Header, { propsData: { title }})
    expect(wrapper.text()).to.have.string(title)
  })
})
