require("@testing-library/jest-dom");

// jest.setup.js or setupTests.js

const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
