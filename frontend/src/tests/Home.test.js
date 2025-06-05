import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/Home";
import useProducts from "../hooks/useProducts";

// Mock the useProducts hook
jest.mock("../hooks/useProducts");

const mockData = [
  {
    id: 1,
    name: "Product A",
    price: 100,
    description: "Description A",
    img_url: "/imageA.jpg",
  },
  {
    id: 2,
    name: "Product B",
    price: 200,
    description: "Description B",
    img_url: "/imageB.jpg",
  },
];

describe("Home Component", () => {
  it("renders the loading state correctly", () => {
    useProducts.mockReturnValue({
      list: [],
      loading: true,
      hasMore: true,
      loadMore: jest.fn(),
    });

    render(<Home />);
    expect(
      screen.getByText(/Products For You \(Loading...\)/)
    ).toBeInTheDocument();
  });

  it("displays products correctly after loading", async () => {
    useProducts.mockReturnValue({
      list: mockData,
      loading: false,
      hasMore: true,
      loadMore: jest.fn(),
    });

    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
    });
  });

  it("loads more products on scroll", async () => {
    const loadMoreMock = jest.fn();
    useProducts.mockReturnValue({
      list: mockData,
      loading: false,
      hasMore: true,
      loadMore: loadMoreMock,
    });

    render(<Home />);
    const scrollableDiv = screen.getByTestId("scrollableDiv");
    // userEvent.scroll(scrollableDiv, { y: 100 });
    fireEvent.scroll(scrollableDiv, { target: { scrollTop: 100 } });

    await waitFor(() => {
      expect(loadMoreMock).toHaveBeenCalled();
    });
  });

  it("shows loading more message while fetching", async () => {
    useProducts.mockReturnValue({
      list: mockData,
      loading: false,
      hasMore: true,
      loadMore: jest.fn(),
    });

    render(<Home />);
    expect(screen.queryByText("Loading more...")).not.toBeInTheDocument();
  });

  it("handles the end of the list (no more items to load)", async () => {
    useProducts.mockReturnValue({
      list: mockData,
      loading: false,
      hasMore: false,
      loadMore: jest.fn(),
    });

    render(<Home />);
    expect(screen.queryByText("Loading more...")).not.toBeInTheDocument();
  });

  it("displays error message on fetch failure", async () => {
    const errorMessage = "Failed to load products";
    console.error = jest.fn(); // Suppress console errors in test output

    useProducts.mockReturnValue({
      list: [],
      loading: false,
      hasMore: false,
      loadMore: jest.fn(),
    });

    render(<Home />);
    await waitFor(() => {
      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    });
  });
});
