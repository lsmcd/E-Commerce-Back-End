const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: {model: Product}
    });
    if (!categoryData) {
      res.status(404).json({message: 'No categories found'});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const categoryData = await Category.findByPk(req.params.id, {
    include: {model: Product}
  });
    if (!categoryData) {
      res.status(404).json({message: "No category with that ID found"});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(() => res.status(200).json({message: "Successful POST"}))
    .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }})
    .then((category) => {
      category[0] ?
      res.status(200).json({message: "Successful PUT"}):
      res.status(400).json({message: "ID could not be updated"});
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }})
    .then((category) => {
      category ?
      res.status(200).json({message: "Successful DELETE"}):
      res.status(404).json({message: "ID not found"});
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
