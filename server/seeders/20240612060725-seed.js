'use strict';
const axios = require("axios")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const options = {
      method: 'GET',
      url: 'https://chinese-food-db.p.rapidapi.com/',
      headers: {
        'x-rapidapi-key': '450c074e4amsh73d32bb4d8cd679p111374jsn63aa3af1001f',
        'x-rapidapi-host': 'chinese-food-db.p.rapidapi.com'
      }
    };
    
    let {data} = await axios.request(options)
    
    data = data.map((el) => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      el.price = Math.ceil(Math.random() * 10) * 10000;
      let categoryNumber = Math.ceil(Math.random() * 2)
      if(categoryNumber === 1) el.category = "halal"
      if(categoryNumber === 2) el.category = "haram"

      return el
    })

    await queryInterface.bulkInsert("Food", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Food", null, {})
  }
};
