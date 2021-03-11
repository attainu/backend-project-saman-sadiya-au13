const Cart = require("../models/cart");
const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    // .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB"
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = async (req, res) => {
  // const { amount, address, user  } = req.body;

  const userId = req.params.userId; //TODO: the logged in user id
  console.log(userId);
  try {
    let cart = await Cart.findOne({ userId });
    if(cart){
      const products = cart.products;
      let order = new Order({...req.body, products: products});
        order.save((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to save your order in DB"
          });
        }
        Cart.updateOne(
          {_id: cart._id}, 
          {products: [] }, 
          (err, result) => {
            if (err) {
              res.status(400).json({
                error: "Updating product in DB failed"
              });
            }
          });
        res.json(order);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
}
  // order.save((err, order) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "Failed to save your order in DB"
  //     });
  //   }
  //   res.json(order);
  // });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name email")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB"
        });
      }
      // res.json(order)
      res.render('todayorder', { title: 'Admin', order: order.reverse() });
    });
};

exports.getAllTrackingOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name email")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB"
        });
      }
      // res.json(order)
      res.render('trackorder', { title: 'Admin', order: order.reverse() });
    });
};

exports.getAllOrdersUserPage = (req, res) => {
  Order.find({ user: req.params.userId})
    .populate("user", "_id name email")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB"
        });
      }
      // res.json(order);
      console.log(order)
      res.render('userorderdetail', { title: 'User', order: order.reverse() });
    });
};


exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.updateOne(
    { _id: req.params.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status"
        });
      }
      res.redirect('/admin/trackorder')
      // res.json(order);
      // res.render('trackorder', { title: 'Admin' });
    }
  );
};
