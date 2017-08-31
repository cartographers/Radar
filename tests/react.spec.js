const {expect} = require('chai')
const React = require('react')
const {shallow} = require('enzyme')
const {spy} = require('sinon')

describe('show how to simulate an event', () => {

  let authFormComponent

  const fakeProps = {
    name: 'login',
    displayName: 'Login',
    handleSubmit: spy()
  }

  beforeEach(() => {
    authFormComponent = shallow(<AuthForm {...fakeProps} />)
  })

  it('invokes handleSubmit on submit', () => {

    authFormComponent.find('form').simulate('submit')
    expect(fakeProps.handleSubmit.calledOnce).to.be.equal(true)

  })
})
