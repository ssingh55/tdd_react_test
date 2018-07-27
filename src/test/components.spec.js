import React from 'react';
import { shallow, mount } from 'enzyme';
import { BeerListContainer, InputArea, BeerList } from '../components/components';
import { spy } from 'sinon';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { wrap } from 'module';
configure({ adapter: new Adapter() });

describe('BeerListContainer', () => {
    test('should render Input Area and Beerlist', () => {
        const wrapper = shallow(<BeerListContainer />);
        expect(wrapper.containsAllMatchingElements([
            <InputArea />,
            <BeerList />
        ])).toBe(true);
    })

    test('should start with an empty list', () => {
        const wrapper = shallow(<BeerListContainer />);
        expect(wrapper.state('beers')).toEqual([])
    })

    test('adds items to the state', () => {
        const wrapper = shallow(<BeerListContainer />);
        wrapper.instance().addItem('Sam Adams');
        expect(wrapper.state('beers')).toEqual(['Sam Adams']);
    })

    test('passes addItem to InputArea', () => {
        const wrapper = shallow(<BeerListContainer />);
        const inputArea = wrapper.find(InputArea);
        const addItem = wrapper.instance().addItem;
        expect(inputArea.prop('onSubmit')).toEqual(addItem);
    })

    test('passes a bound addItem function to InputArea', () => {
        const wrapper = shallow(<BeerListContainer />);
        const inputArea = wrapper.find(InputArea);
        inputArea.prop('onSubmit')('Sam Adams');
        expect(wrapper.state('beers')).toEqual(['Sam Adams']);
    })
    test('renders the items', () => {
        const wrapper = mount(<BeerListContainer />);
        wrapper.instance().addItem('Sam Adams');
        wrapper.instance().addItem('Resin');
        wrapper.update()
        expect(wrapper.find('li').length).toBe(2);
    });
})

describe('InputArea', () => {
    test('should contain an input and a button', () => {
        const wrapper = shallow(<InputArea />);
        expect(wrapper.containsAllMatchingElements([
            <input />,
            <button>Add</button>
        ])).toBe(true);
    })

    test('should accept input', () => {
        // const wrapper = shallow(<InputArea/>);
        const wrapper = mount(<InputArea />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Resin' } });
        expect(wrapper.state('text')).toBe('Resin');
        expect(wrapper.find('input').prop('value')).toBe('Resin');
    })

    test('should call onSubmit when add is clicked', () => {
        const addItemSpy = spy();
        const wrapper = shallow(<InputArea onSubmit={addItemSpy} />);
        wrapper.setState({ text: 'Octoberfest' });
        const addButton = wrapper.find('button');

        addButton.simulate('click');

        expect(addItemSpy.calledOnce).toBe(true);
        expect(addItemSpy.calledWith('Octoberfest')).toBe(true);
    })
})

describe('BeerList', () => {
    test('should render zero items', () => {
        const wrapper = shallow(<BeerList items={[]} />);
        expect(wrapper.find('li')).toHaveLength(0);
    })
    test('should render undefined items', () => {
        const wrapper = shallow(<BeerList items={undefined} />);
        expect(wrapper.find('li')).toHaveLength(0);
    })
    test('should render some items', () => {
        const items = ['Sam Adams', 'Resin', 'Octoberfest'];
        const wrapper = shallow(<BeerList items={items} />)
        expect(wrapper.find('li')).toHaveLength(3);
    })
})