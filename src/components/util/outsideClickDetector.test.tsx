import React from 'react';
import { shallow } from 'enzyme';
import { useOutsideClickDetector } from './outsideClickDetector';
import { act } from 'react-dom/test-utils';

describe('outSideClickDetector', () => {
  test('should detect outside click', () => {
    const outsideClickMock = jest.fn();
    const insideClickMock = jest.fn();

    act(() => {
      const wrapper = shallow(
        <MockComponent
          outsideClick={outsideClickMock}
          insideClick={insideClickMock}
        ></MockComponent>
      );
      wrapper.find('#outside').simulate('click');
    });
  });

  test('should not detect inside click', () => {
    const outsideClickMock = jest.fn();
    const insideClickMock = jest.fn();

    act(() => {
      const wrapper = shallow(
        <MockComponent
          outsideClick={outsideClickMock}
          insideClick={insideClickMock}
        ></MockComponent>
      );
      wrapper.find('#inside').simulate('click');
    });
    expect(outsideClickMock).not.toHaveBeenCalled();
    expect(insideClickMock).toHaveBeenCalled();
  });
});

const MockComponent: React.FC<{
  outsideClick: any;
  insideClick: any;
}> = ({ outsideClick, insideClick }) => {
  const ref = React.useRef(null);
  useOutsideClickDetector(ref, outsideClick);
  const handleClick = () => {
    insideClick();
  };

  return (
    <>
      <div id="outside">outside</div>
      <div ref={ref}>
        <div onClick={handleClick} id="inside">
          inside
        </div>
      </div>
    </>
  );
};
