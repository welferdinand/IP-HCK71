const { Food } = require("../models");
const { Op } = require('sequelize')

class FoodController {
  static async getAllFoods(req, res, next) {
    try {
      const {filter, sort, page, search} = req.query
      const paramsQuerySQL = {
        limit: 8
      }

      //filtering
      if(filter){
        paramsQuerySQL.where = {
            category: filter
        }
    }

    //sorting
    if(sort) {
        const ordering = sort[0] === '-' ? 'DESC' : 'ASC'
        const columnName = ordering === 'DESC' ? sort.slice(1) : sort;

        paramsQuerySQL.order = [
            [columnName, ordering]
        ]
    }

    //pagination
    let limit = 8;
    let pageNumber = 1;
    
    if(page){
        //limit = 10
        //page 1 -> 1 - 10 -> offset = 0, limit = 10;
        //page 2 -> 11 - 20 -> offset = 10, limit = 10;
        //page 3 -> 21 - 30 -> offset = 20, limit = 10;

        //offset = limit * (pageNumber - 1)
        if(page.size){
            limit = +page.size;
            paramsQuerySQL.limit = limit
        }

        if(page.number){
            pageNumber = +page.number;
            paramsQuerySQL.offset = limit * (pageNumber - 1)
        }
    }

    //search
    if(search) {
        paramsQuerySQL.where = {
            title: {
                [Op.iLike]: `%${search}%`
            }
        }         
    }

    // 1. saat ini kita di page berapa?
    // 2. datanya mana?
    // 3. total datanya ada berapa?
    // 4. total page nya ada berapa?
    // 5. data per page nya berapa?

  const {count, rows} = await Food.findAndCountAll(paramsQuerySQL);
  res.status(200).json({
    page: pageNumber,
    data: rows,
    totalData: count,
    totalPage: Math.ceil(count/limit),
    dataPerPage: limit
  });
    } catch (error) {
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
