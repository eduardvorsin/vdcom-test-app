
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useScreenWidth from './useScreenWidth';

describe('useScreenWidth tests', () => {
  it('should return a screen width of 1024 if the device orientation is landscape', () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1024);
    const { result } = renderHook(() => useScreenWidth());

    expect(result.current).toBe(1024);
  });

  it('should return a width of 768 after the screen orientation changes', () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1024);
    const screenChangeEvent = new Event('orientationchange');
    const { result } = renderHook(() => useScreenWidth());

    act(() => {
      jest.spyOn(window.screen, 'width', 'get').mockReturnValue(768);
      window.dispatchEvent(screenChangeEvent);
    });

    expect(result.current).toBe(768);
  });
});
