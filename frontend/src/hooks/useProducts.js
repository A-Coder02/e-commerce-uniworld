import { useEffect, useState } from "react";
import ProductsService from "../services/Products.service";
import { toast } from "react-toastify";

const useProducts = () => {
  // States & Binding
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 4,
    page: 1,
    totalItems: 0,
    totalPages: 1,
  });

  // Fetch products based on the current page
  const fetchProducts = async (page, isFirstTime) => {
    setLoading(true);
    try {
      const response = await ProductsService.getList({
        page,
        limit: pagination.limit,
      });

      // Append new products to the existing list
      if (response?.data) {
        if (isFirstTime) setRows(response?.data);
        else setRows((prev) => [...prev, ...response.data]);

        setPagination((prev) => ({
          ...prev,
          page: page,
          totalItems: response.pagination.totalItems,
          totalPages: response.pagination.totalPages,
        }));

        // Check if more products are available
        setHasMore(page < response.pagination.totalPages);
      }
    } catch (err) {
      console.error("error: ", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts(1, true);
  }, []);

  // Load more products
  const loadMore = () => {
    if (pagination.page < pagination.totalPages) {
      fetchProducts(pagination.page + 1);
    } else {
      setHasMore(false);
    }
  };

  return {
    list: rows,
    loading,
    hasMore,
    loadMore,
  };
};

export default useProducts;
