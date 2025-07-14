const products = require("../models/product");
const productVariant = require("../models/productVariant");
const handleError = require("../middleware/handleError");
const cluster = require('cluster');

class productController {

  static productData = async (req, res, next) => {

    try{

      console.log(`Process ID: ${process.pid}`);

      let curDate = Date.now();

      let productDetails = {};

      const saleStart = (new Date("2025-04-12T06:25:00.734+00:00")).getTime();

      const saleEnd = saleStart + (30*60*1000);

     // console.log(curDate, saleStart, saleEnd, new Date(curDate),);

      if(curDate>=saleStart &&  curDate<=saleEnd){
      //console.log(date_ob, saleTime, new Date(saleTime));
      
          productDetails =  await products.aggregate([
          { "$unwind": "$variants" }, // array of objectId in product table
          {
            $lookup: {
              from: "productvariants", // table_name
              localField: "variants",
              foreignField: "_id",
              as: "variantsArray"
            }
          },
          { "$unwind": "$variantsArray" },
          {
            $addFields: 
            {
              "variantsArray.price": 
              { "$subtract": 
                [ 
                  "$variantsArray.price",
                  { "$multiply": 
                    [
                      {
                        "$divide": [
                          20,
                          100
                        ]
                      },
                    "$variantsArray.price"
                    ]
                  }
                  
                ]
              }
            }
          },
        // Group back to arrays
          { "$group": 
            {
              "_id": "$_id",
              "sku_code" :   {"$first":"$sku_code"},
              "name" :  {"$first":"$name"},
              "description" :   {"$first":"$description"},
              "variantsArray": { "$push": "$variantsArray" }
            }
          },
          //{$replaceRoot: { newRoot: "$data" }}
        ]);
      }
      else
      {
        productDetails =  await products.aggregate([
          { "$unwind": "$variants" }, // array of objectId in product table
          {
            $lookup: {
              from: "productvariants",
              localField: "variants",
              foreignField: "_id",
              as: "variantsArray"
            }
          },
          { "$unwind": "$variantsArray" },
          { "$group": 
            {
              "_id": "$_id",
              "sku_code" :   {"$first":"$sku_code"},
              "name" :  {"$first":"$name"},
              "description" :   {"$first":"$description"},
              "variantsArray": { "$push": "$variantsArray" }
            }
          }
        ]);
      }

      //const productDetails = await products.find().populate('variants').exec();
      res.status(200).send({"status":"succsess","message":"Get product details","result":productDetails});
    }
    catch(err){
      next(err);
    }
  };

  static addProductData = async (req, res, next) => {

    try{

      //var bindata = new Buffer.from(string.split(",")[1], 'binary').toString('base64');

      const productInfo = new products({
        sku_code:  req.body.sku_code,
        name: req.body.name,
        description: req.body.description
      });

      const productInfoSave = await productInfo.save()

      if (productInfoSave) {

        const prodVariant = req.body.variants;
        // const productVariantInfo = new productVariant({
        //   model_no: req.body.variants.model_no,
        //   model_name: req.body.variants.model_name,
        //   color: req.body.variants.color,
        //   price: req.body.variants.price,
        //   quantity: req.body.variants.quantity,
        //   description: req.body.variants.description
        // });

        const promises = prodVariant.map( async (variants) => {
          let productVariantInfo = new productVariant({
              model_no: variants.model_no,
              model_name: variants.model_name,
              color: variants.color,
              price: variants.price,
              quantity: variants.quantity,
              description: variants.description
          });

          const productVariantSave = await productVariantInfo.save()

          if(productVariantSave){
            const productInfoUpdate = await products.findByIdAndUpdate(productInfoSave._id, {$push: {variants: productVariantSave._id} } );
          }
          
        });

       const productVariantSave = await Promise.all(promises);

        if(productVariantSave){

          if (productVariantSave) {

            //const productImageSave = await productVariant.save()

            res.status(200).send({"status":"succsess","message":"Product Info Added"});

            // const userUpdate = await users.findByIdAndUpdate(req.userData._id, {$push: {userInfos: userInfoSave._id} } );
            
            // if(userUpdate){

            //   res.status(200).send({"status":"succsess","message":"User Info Added"});
        
            // }
            // else{
            //   await handleError({message:"User info not updated to user collection",statusCode:500},req,res,next);
            // }
          }
          else{
            await handleError({message:"User info not added",statusCode:500},req,res,next);
          }
        }
      }
     
    }
    catch(err){
      next(err);
    }
  };
}

module.exports = productController;