const { Category, Product } = require("../db");
const { checkUuid } = require("../helpers/utils");

async function getCategories(_req, res, next) {
  try {
    const categories = await Category.findAll();
    return res.send(categories);
  } catch (error) {
    next(error);
  }
}
//create a category
async function createCategory(req, res, next) {
  const { name, image } = req.body;
  try {
    const find = await Category.findOne({
      where: {
        name,
      },
    });
    if (find) {
      return res.status(400).send("Category Already Exists");
    }
    const category = await Category.create({
      name,
      image,
    });
    return res.send(category);
  } catch (error) {
    next(error);
  }
}

//update or modify a category
async function updateCategory(req, res, next) {
  try {
    const { id } = req.body;
    const toEditCategory = await Category.findOne({
      where: {
        uuid: id,
      },
    });
    if (toEditCategory) {
      const category = await toEditCategory.update(req.body);
      return res.send("Categoria actualizada");
    } else {
      return res.send("no existe la categoria");
    }
  } catch (error) {
    next(error);
  }
}

//delete a category
async function deleteCategory(req, res, next) {
  const { id } = req.body; //BODY
  try {
    if (checkUuid(id)) {
      const toDestroy = await Category.findOne({
        where: {
          uuid: id,
        },
      });
      if (toDestroy) {
        Category.destroy({
          where: {
            uuid: id,
          },
        });
        res.status(200).send("categoria eliminada");
      } else {
        res.status(404).send("Category not found");
      }
    } else {
      res.status(404).send("Invalid");
    }
  } catch (error) {
    next(error);
  }
}

async function getCategoryByName(req, res, next) {
  try {
    const { name } = req.query;
    console.log('NAME: ', name);
    const categoryByName = await Category.findAll({
      attributes: [
        "uuid",
        "name",
        "image"
      ],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    categoryByName.length > 0
      ? res.send(categoryByName)
      : res.status(404).send({error: 'Category not found.'});

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryByName,
};
