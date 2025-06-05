const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (process.env.NODE_ENV === "test") {
  // Define Jest mock functions
  const mockInsert = jest.fn();
  const mockSelect = jest.fn();
  const mockSingle = jest.fn();
  const mockEq = jest.fn();
  const mockRange = jest.fn();
  const mockDelete = jest.fn();
  const mockUpdate = jest.fn();

  supabase = {
    from: jest.fn(() => ({
      insert: mockInsert.mockReturnThis(),
      select: mockSelect.mockReturnThis(),
      eq: mockEq.mockReturnThis(),
      range: mockRange.mockReturnThis(),
      delete: mockDelete.mockReturnThis(),
      update: mockUpdate.mockReturnThis(),
      single: mockSingle,
    })),
  };

  // Attach mocked methods directly for test assertions
  supabase.mockInsert = mockInsert;
  supabase.mockSelect = mockSelect;
  supabase.mockSingle = mockSingle;
  supabase.mockEq = mockEq;
  supabase.mockRange = mockRange;
  supabase.mockDelete = mockDelete;
  supabase.mockUpdate = mockUpdate;
} else {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

module.exports = supabase;
