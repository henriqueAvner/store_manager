const validateQuantity = (req, res, next) => {
  const itemsSold = req.body;
  for (let i = 0; i < itemsSold.length; i += 1) {
    if (!itemsSold[i].quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }

  next();
};

const validateQuantityObject = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};
const validateQuantityObjLength = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateProductId = (req, res, next) => {
  const itemsSold = req.body;
  for (let i = 0; i < itemsSold.length; i += 1) {
    if (!itemsSold[i].productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }

  next();
};

const validateQuantityLength = (req, res, next) => {
  const itemsSold = req.body;

  for (let i = 0; i < itemsSold.length; i += 1) {
    if (itemsSold[i].quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }
  next();
};

module.exports = {
  validateQuantity,
  validateProductId,
  validateQuantityLength,
  validateQuantityObject,
  validateQuantityObjLength,

};