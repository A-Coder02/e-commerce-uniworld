import React, { useState } from "react";
// Components
import Button from "../components/form-ui/Button";
import Table from "../components/Table";
import ProductModal from "../components/ProductModal";
import RemoveModal from "../components/RemoveModal";
import usePortal from "../hooks/usePortal.jsx";

const Portal = () => {
  const {
    // Table
    columns,
    rows,
    loadingRows,
    // Product Form states
    show,
    openModal,
    loading,
    initialValues,
    addProduct,
    editProduct,
    setShowProductModal,
    showRemoveModal,
    setShowRemoveModal,
    removeProduct,
    pagination,
    setPagination,
    onPageChange,
  } = usePortal();

  return (
    <div className="flex flex-col flex-1">
      <section className="flex flex-1 flex-col gap-4 relative">
        <div className="flex justify-between sticky top-0">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="flex gap-4">
            <Button onClick={openModal}>Add Product</Button>
          </div>
        </div>
        <Table
          columns={columns}
          rows={rows}
          loading={loadingRows}
          pagination={pagination}
          setPagination={setPagination}
          onPageChange={onPageChange}
        />
      </section>
      {/* Add Product Modal */}
      <ProductModal
        show={show}
        setShow={(bool) => {
          // setShow(bool);
          // setInitialValues(INITIAL_VALUES);
          setShowProductModal(bool);
        }}
        initialValues={initialValues}
        title={`${initialValues?.id ? "Update" : "Add"} Product`}
        onSubmit={initialValues?.id ? editProduct : addProduct}
        loading={loading}
      />
      <RemoveModal
        show={showRemoveModal}
        initialValues={initialValues}
        setShow={(bool) => {
          setShowRemoveModal(bool);
        }}
        loading={loading}
        onSubmit={removeProduct}
      />
    </div>
  );
};

export default Portal;
