import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({});

const TestWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

test("should pass", () => {
  expect(true).toBe(true);
});

export default TestWrapper;
