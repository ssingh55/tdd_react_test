import React from 'react';
import TodoItems from '../components/TodoItems';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('TodoItems', () => {
    test('should render some items', () => {
        const items = ['Sam Adams', 'Resin', 'Octoberfest'];
        const wrapper = shallow(<TodoItems items={items} />);
        // console.log(wrapper.find('li'))
        expect(wrapper.find('li')).toHaveLength(3);
    })
    //check
    test('should call check when it change', () => {
        const checkTaskSpy = spy();
        const items = [{ text: 'hello', isDone: false, key: 0 }]
        const wrapper = shallow(<TodoItems items={items} check={checkTaskSpy} />);
        const checkBox = wrapper.find('input');
        checkBox.simulate('change');
        expect(checkTaskSpy.calledOnce).toBe(true);
    })
    //delete
    test('should delete the tasks from the state', () => {
        const deleteTaskSpy = spy();
        const items = [{ text: 'hello', isDone: false, key: 0 }]
        const wrapper = shallow(<TodoItems items={items} delete={deleteTaskSpy} />);
        const deleteButton = wrapper.find('button');
        deleteButton.simulate('click')
        expect(deleteTaskSpy.calledOnce).toBe(true)
    })

    
    test('should render zero items', () => {
        const wrapper = shallow(<TodoItems />);
        expect(wrapper.find('li')).toHaveLength(0);
    })
    test('should render undefined items', () => {
        const wrapper = shallow(<TodoItems items={undefined} />);
        expect(wrapper.find('li')).toHaveLength(0);
    })
    test('should render some items', () => {
        const items = ['Sam Adams', 'Resin', 'Octoberfest'];
        const wrapper = shallow(<TodoItems items={items} />);
        // console.log(wrapper.find('li'))
        expect(wrapper.find('li')).toHaveLength(3);
    })
})