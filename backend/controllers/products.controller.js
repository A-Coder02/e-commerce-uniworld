const supabase = require("../supabase");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth APIs
 */

const createProduct = async (req, res) => {
  /* #swagger.tags = ['Products']
    #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            name: "",
            img_url: "",
            description: "",
            price: 0,
            user_id: ""
        }
    }
        */

  const { name, img_url, description, price, user_id } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ data: null, error: "Name and price are required." });
  }

  const { data, error } = await supabase
    .from("products")
    .insert([{ name, img_url, description, price, user_id }])
    .single();

  if (error) {
    return res.status(500).json({ data: null, error: error.message });
  }
  res
    .status(201)
    .json({ data, message: "Product created successfully.", error: null });
};

const getProducts = async (req, res) => {
  /* #swagger.tags = ['Products'] */

  try {
    const { page = 1, limit = 10, id } = req.query;
    const currentPage = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (currentPage - 1) * pageSize;

    let query = supabase
      .from("products")
      .select("id, name, img_url, description, price, user_id", {
        count: "exact",
      })
      .range(offset, offset + pageSize - 1);

    if (id) {
      query = query.eq("user_id", id);
    }

    const { data, error, count } = await query;

    const totalPages = Math.ceil(count / pageSize);

    if (error) {
      return res.status(500).json({ data: null, error: error.message });
    }

    res.status(200).json({
      data,
      message: "Products retrieved successfully.",
      pagination: {
        page: currentPage,
        limit: pageSize,
        totalItems: count,
        totalPages,
      },
      error: null,
    });
  } catch (err) {
    res.status(500).json({ data: null, error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .select("id, name, img_url, description, price, user_id(id, email)")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({ data: null, error: error.message });
  }
  res
    .status(200)
    .json({ data, message: "Product retrieved successfully.", error: null });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, img_url, description, price } = req.body;

  const { data, error } = await supabase
    .from("products")
    .update({ name, img_url, description, price })
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ data: null, error: error.message });
  }
  res
    .status(200)
    .json({ data, message: "Product updated successfully.", error: null });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ data: null, error: error.message });
  }
  res
    .status(200)
    .json({ data: { message: "Product deleted successfully." }, error: null });
};

const createOrder = async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .insert([{ total: req.body.total }])
    .single()
    .select();

  if (error) {
    return res.status(500).json({ data: null, error: error.message });
  }
  res
    .status(201)
    .json({ data, message: "Order created successfully.", error: null });
};

const checkoutOrder = async (req, res) => {
  const { items, order_id } = req.body;
  const { data, error } = await supabase
    .from("order_items")
    .insert(
      items.map((item) => {
        const newItem = {
          price: item.price,
          qty: item.qty,
          item_id: item.id,
          order_id,
        };
        return newItem;
      })
    )
    .select();

  if (error) {
    console.log({ error });
    return res.status(500).json({ data: null, error: error.message });
  }
  res
    .status(201)
    .json({ data, message: "Order checkout successfully.", error: null });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createOrder,
  checkoutOrder,
};
