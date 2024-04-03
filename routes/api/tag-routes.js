const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: Product
    });
    if (!tagData) {
      res.status(404).json({message: "No tags found"});
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: Product
    });
    if (!tagData) {
      res.status(404).json({message: "No tag found"});
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json({message: "No tag with that ID found"});
  }
});

//! PUT and POST don't add json objects products yet
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then(() => res.status(200).json({message: "Successful POST"}))
    .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }})
    .then((tag) => {
      tag[0] ?
      res.status(200).json({message: "Successful PUT"}):
      res.status(400).json({message: "ID could not be updated"});
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }})
    .then((tag) => {
      tag ?
      res.status(200).json({message: "Successful DELETE"}):
      res.status(404).json({message: "ID not found"});
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
