const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findByPk(req.params.id, { include: Product });
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category returned, please try again' });
      return;
    }
    res.status(200).json({ message: 'Success. Category has been updated' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
    try {
      const deleteCategory = await Category.destroy({
        where: { id: req.params.id },
      });
      if (!deleteCategory) {
        res.status(404).json({ message: 'Error: Not Deleted' });
        return;
      }
      res.status(200).json({ message: 'Success! Cateogry Deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
