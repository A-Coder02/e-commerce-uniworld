import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ToastContainer } from "react-toastify";
import Portal from "../pages/Portal";
import usePortal from "../hooks/usePortal";
import Button from "../components/form-ui/Button";

// Mocking the custom hook
jest.mock("../hooks/usePortal");

// Mocked store for Redux
const mockStore = configureStore([]);
const store = mockStore({
  auth: { user: { id: "1" } },
});

const mockData = [
  {
    id: 69,
    name: "Product admin1",
    img_url:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRgyR6GolZhdekEpQpEfYf97USuYgYGhA5lCwsJKZl19W75XMQdQbbR32DryH-nPMvlgOotghSzVT97NeP1ziE4QB7KdhvIYpj9_cEbSO_SqDThKHGXxWeSTQ",
    description: "For Black & White",
    price: 23,
    user_id: "17b3ab12-d422-4be5-91c7-5fbbe875409d",
  },
];

const columns = [
  {
    field: "id",
    label: "ID",
    renderCell: (data) => `#${data.id}`,
  },
  {
    field: "image",
    label: "Image",
    minWidth: "300px",
    renderCell: (data) => (
      <img
        src={data.img_url}
        className="h-48 aspect-square object-contain"
        alt="thumbnail"
      />
    ),
  },
  {
    field: "name",
    label: "Name",
    minWidth: "150px",
  },
  {
    field: "description",
    label: "Description",
    minWidth: "300px",
  },
  {
    field: "action",
    label: "Action",
    flex: 1,
    renderCell: (data) => (
      <div className="flex gap-4">
        <Button
          // onClick={() => onClickEditButton(data)}
          data-testid={`update-btn-${data.id}`}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          // onClick={() => onClickRemoveButton(data)}
          data-testid={`remove-btn-${data.id}`}
        >
          Remove
        </Button>
      </div>
    ),
  },
];

describe("Portal Component", () => {
  beforeEach(() => {
    usePortal.mockReturnValue({
      rows: mockData,
      columns: columns,
      loadingRows: false,
      pagination: { limit: 4, page: 1, totalItems: 8, totalPages: 2 },
      setPagination: jest.fn(),
      onPageChange: jest.fn(),
      openModal: jest.fn(),
      initialValues: {},
      showRemoveModal: false,
      setShowProductModal: jest.fn(),
      setShowRemoveModal: jest.fn(),
      show: false,
      addProduct: jest.fn(),
      editProduct: jest.fn(),
      loading: false,
      removeProduct: jest.fn(),
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <ToastContainer />
        <Portal />
      </Provider>
    );

  it("renders the Portal component with product list", async () => {
    renderComponent();
    expect(screen.getByText("Product admin1")).toBeInTheDocument();
    // expect(screen.getByText("Product A")).toBeInTheDocument();
    // expect(screen.getByText("Product B")).toBeInTheDocument();
  });

  it("opens the add product modal on button click", async () => {
    renderComponent();
    const addButton = screen.getByText("Add Product");
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(usePortal().openModal).toHaveBeenCalled();
    });
  });

  it("edits a product when the update button is clicked", async () => {
    renderComponent();
    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);
  });

  it("removes a product when the remove button is clicked", async () => {
    renderComponent();
    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);
  });

  it("calls the removeProduct function on confirming removal", async () => {
    usePortal.mockReturnValueOnce({
      ...usePortal(),
      showRemoveModal: true,
    });
    renderComponent();
    const confirmButton = screen.getByText("Sure, I want");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(usePortal().removeProduct).toHaveBeenCalled();
    });
  });

  it("paginates when a page change occurs", async () => {
    renderComponent();
    const nextPageButton = screen.getByText("Next");
    fireEvent.click(nextPageButton);
    await waitFor(() => {
      expect(usePortal().onPageChange).toHaveBeenCalledWith(2);
    });
  });
});
