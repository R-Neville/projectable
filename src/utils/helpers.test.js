import { screen, render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { useEffect } from 'react';
import {
  dateFromTimestamp,
  showError,
  buildAxiosErrorHandler,
} from './helpers';
import { errorCodes } from '../config/axiosConfig';

const TestComponent = ({ onShowError }) => {
  useEffect(() => {
    document.addEventListener('show-error', onShowError);
    return () => {
      document.removeEventListener('show-error', onShowError);
    };
  }, []);

  return (
    <div>
      <button
        data-testid="show-error-test-button"
        onClick={() => {
          showError(new Error('test'));
        }}
      ></button>
    </div>
  );
};

describe('dateFromTimestamp', () => {
  test('returns correct date when provided a timestamp', () => {
    const date = dateFromTimestamp('2022-11-18T00:49:35.385Z');
    expect(date).toBe('Fri Nov 18 2022');
  })
});

describe('showError', () => {
  test('dispatches custom "show-error" event successfully (error with correct message in detail)', () => {
    const onShowError = jest.fn((event) =>
      expect(event.detail.error.message).toBe('test')
    );
    render(<TestComponent onShowError={onShowError}></TestComponent>);
    const showErrorTestButton = screen.getByTestId('show-error-test-button');
    fireEvent.click(showErrorTestButton);
    setTimeout(() => {
      expect(onShowError).toBeCalled();
    });
  });
});

describe('buildAxiosErrorHandler', () => {
  test('onFatal is called when error has no response property and show error event is dispatched correctly', () => {
    const onShowError = jest.fn((event) =>
      expect(event.detail.error.message).toBe('test')
    );
    document.addEventListener('show-error', onShowError);
    const onFatal = jest.fn();
    buildAxiosErrorHandler(onFatal)(new Error('test'));
    setTimeout(() => {
      expect(onFatal).toBeCalled();
      expect(onShowError).toBeCalled();
    });
  });

  test('onFatal is called when error.code is "ERR_NETWORK" and show error event is dispatched correctly', () => {
    const onShowError = jest.fn((event) =>
      expect(event.detail.error.message).toBe('test')
    );
    document.addEventListener('show-error', onShowError);
    const onFatal = jest.fn();
    const error = new Error('test');
    error.code = errorCodes.ERR_NETWORK;
    buildAxiosErrorHandler(onFatal)(error);
    setTimeout(() => {
      expect(onFatal).toBeCalled();
      expect(onShowError).toBeCalled();
    });
  });

  test('onFatal is called when error.response.status is a "fatal" status and show error event is dispatched correctly', () => {
    const onShowError = jest.fn((event) =>
      expect(event.detail.error.message).toBe('test')
    );
    document.addEventListener('show-error', onShowError);
    const onFatal = jest.fn();
    const error = new Error('test');
    error.response = { status: 401 };
    buildAxiosErrorHandler(onFatal)(error);
    setTimeout(() => {
      expect(onFatal).toBeCalled();
      expect(onShowError).toBeCalled();
    });
  });

  test('when no checks are true, onFatal is not called and oneDone is called (if passed) - regardless of the error thrown ans show error event is dispatched correctly', () => {
    const onShowError = jest.fn((event) =>
      expect(event.detail.error.message).toBe('test')
    );
    document.addEventListener('show-error', onShowError);
    const onFatal = jest.fn();
    const onDone = jest.fn();
    const error = new Error('test');
    error.response = true;
    buildAxiosErrorHandler(onFatal, onDone)(error);
    setTimeout(() => {
      expect(onFatal).not.toBeCalled();
      expect(onDone).toBeCalled();
      expect(onShowError).toBeCalled();
    });
  });
});
