const { Food } = require("../models");

class FoodController {
  static async getAllFoods(req, res, next) {
    try {
      const foods = await Food.findAll();

      res.status(200).json(foods);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createFood(req, res, next) {
    try {
      const food = await Food.create({
        title: req.body.title,
        price: req.body.price,
        difficulty: req.body.difficulty,
        image: req.body.image,
        category: req.body.category,
      });
      res.status(201).json({
        message: `Food ${req.body.title} Created`,
        food,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getFoodById(req, res, next) {
    try {
      const foodId = req.params.id;
      const food = await Food.findByPk(foodId);
      if (!food) throw { name: "NotFound" };
      res.status(200).json(food);
    } catch (error) {
      next(error);
    }
  }

  static async editFoodById(req, res, next) {
    try {
      const foodId = req.params.id;
      const food = await Food.findByPk(foodId);
      if (!food) throw { name: "NotFound" };
      await food.update({
        title: req.body.title,
        price: req.body.price,
        difficulty: req.body.difficulty,
        image: req.body.image,
        category: req.body.category
      });
      res
        .status(200)
        .json({ message: `Food ${req.body.title} is updated` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFoodById(req, res, next) {
    try {
      const foodId = req.params.id;
      const food = await Food.findByPk(foodId);
      if (!food) throw { name: "NotFound" };
      await food.destroy();
      res
        .status(200)
        .json({ message: `${food.title} success to delete` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FoodController;
