import React from 'react';
import InputArea from '../components/InputArea';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('InputArea', () => {
    test('should accept input', () => {
        const wrapper = shallow(<InputArea />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Complete task' } });
        expect(wrapper.state('text')).toBe("Complete task");
        expect(wrapper.find('input').prop('value')).toBe("Complete task")
    })
    //add
    test('should add the task when clicked', () => {
        const addTaskSpy = spy();
        const wrapper = shallow(<InputArea onSubmit={addTaskSpy} />)
        wrapper.setState({ text: 'DockerDeployment' });
        const addButton = wrapper.find('button');
        addButton.simulate('click');
        expect(addTaskSpy.calledOnce).toBe(true);
        expect(addTaskSpy.calledWith('DockerDeployment')).toBe(true);
    })
})