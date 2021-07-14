const { rejects } = require('assert');
const cons = require('consolidate');
const { resolve } = require('path');
const skodaCarsModels = require('../models/skoda-cars-schemas');

module.exports = {

    getSkodaVariantAbove: (budgetOne) => {
        return new Promise((resolve, reject) => {
            skodaCarsModels.skodaCarsDetails.find({
                $or: [
                    {
                        $and: [
                            { app_id: 'skodafb' },
                            { max_price: { $gte: budgetOne } },
                        ],
                    },
                    { min_price: { $gte: budgetOne } }

                ]
            }, (err, res) => {
                if (err) console.log(err);
                else {
                    console.log(res)
                    resolve(res)

                }
            })
        })

    },
    getSkodaVariantBtw: (budgetOne, budgetTwo) => {
        return new Promise((resolve, reject) => {
            skodaCarsModels.skodaCarsDetails.find({
                $or: [
                    {
                        $and: [
                            { app_id: 'skodafb' },
                            { max_price: { $gte: budgetOne } },
                            { min_price: { $lte: budgetTwo } }
                        ],
                    },
                    { min_price: { $gte: budgetOne } },
                    { max_price: { $lte: budgetTwo } }

                ]
            }, (err, res) => {
                if (err) console.log(err);
                else {
                    console.log(res)
                    resolve(res)

                }
            })
        })

    },
    getSkodaVariantExactly: (budgetOne) => {
        return new Promise((resolve, reject) => {
            skodaCarsModels.skodaCarsDetails.find({
                $or: [
                    {
                        $and: [
                            { app_id: 'skodafb' },
                            { max_price: budgetOne }],
                    },
                    { min_price: budgetOne }
                ]
            }, (err, res) => {
                if (err) console.log(err);
                else {
                    console.log(res)
                    resolve(res)

                }
            })
        })

    },
    getSkodaVariantBudgetOne: (budgetOne) => {
        return new Promise((resolve, reject) => {
            skodaCarsModels.skodaCarsDetails.find({
                app_id: 'skodafb',
                min_price: { $lte: budgetOne } 

            }, (err, res) => {
                if (err) console.log(err);
                else {
                    console.log(res)
                    resolve(res)

                }
            })
        })

    },
    getSkodaVariantBudgetMany: (budgetOne,budgetTwo) => {
        return new Promise((resolve, reject) => {
            skodaCarsModels.skodaCarsDetails.find({
                app_id: 'skodafb',
                min_price: { $gte: budgetTwo } ,
                min_price: { $gt: budgetOne }

            }, (err, res) => {
                if (err) console.log(err);
                else {
                    console.log(res)
                    resolve(res)

                }
            })
        })

    },
    getSkodaVariantBudgetBelow: (budgetOne,budgetTwo) => {
        return new Promise((resolve, reject) => {
            skodaCarsModels.skodaCarsDetails.find({
                app_id: 'skodafb',
                max_price: { $gte: budgetOne } ,
                min_price: { $lte: budgetTwo }

            }, (err, res) => {
                if (err) console.log(err);
                else {
                    console.log(res)
                    resolve(res)

                }
            })
        })

    }
}