import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from '../components/TodoApp';
import InputArea from '../components/InputArea';
import TodoItems from '../components/TodoItems';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Rendering', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TodoApp />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    test('should contains an input and a button', () => {
        const wrapper = shallow(<InputArea />);
        expect(wrapper.containsAllMatchingElements([
            <input />,
            <button>Add</button>
        ])).toBe(true);
    })

    test('renders the items to be added', () => {
        const wrapper = mount(<TodoApp />);
        wrapper.instance().addTask('Sam');
        wrapper.instance().addTask('Resin');
        wrapper.update();
        expect(wrapper.find('li').length).toBe(2);
    })
})
describe('Props', () => {
    test('Check props for addtask InputArea', () => {
        const wrapper = shallow(<TodoApp />);
        const InputArea = wrapper.find('InputArea');
        const addTask = wrapper.instance().addTask;
        expect(InputArea.prop('onSubmit')).toEqual(addTask);
    })
    test('Check props for deletetask TodoItems', () => {
        const wrapper = shallow(<TodoApp />);
        const InputArea = wrapper.find('TodoItems');
        const deleteTask = wrapper.instance().deleteTask;
        expect(InputArea.prop('delete')).toEqual(deleteTask);
    })
    test('Check props for checktask TodoItems', () => {
        const wrapper = shallow(<TodoApp />);
        const InputArea = wrapper.find('TodoItems');
        const checkTask = wrapper.instance().checkTask;
        expect(InputArea.prop('check')).toEqual(checkTask);
    })
})

describe('TodoApp', () => {
    test('should render InputArea and TodoItems', () => {
        const wrapper = shallow(<TodoApp />);
        expect(wrapper.containsAllMatchingElements([
            <InputArea />,
            <TodoItems />
        ])).toBe(true);
    })

    test('Initial case for state', () => {
        const wrapper = shallow(<TodoApp />);
        expect(wrapper.state('items')).toEqual([]);
    })
    test('adds tasks to the state', () => {
        const wrapper = shallow(<TodoApp />);
        wrapper.instance().addTask('Complete todos');
        expect(wrapper.state('items')).toEqual([{ "isDone": false, "key": 0, 'text': 'Complete todos' }]);
    })
    test('passes addTask to InputArea', () => {
        const wrapper = shallow(<TodoApp />);
        const InputArea = wrapper.find('InputArea');
        const addTask = wrapper.instance().addTask;
        expect(InputArea.prop('onSubmit')).toEqual(addTask);
    })
    test('passes a bound addTask function to InputArea', () => {
        const wrapper = shallow(<TodoApp />);
        const InputArea = wrapper.find('InputArea');
        InputArea.prop('onSubmit')('Complete todo');
        expect(wrapper.state('items')).toEqual([{ "isDone": false, "key": 0, 'text': 'Complete todo' }]);
    })
})