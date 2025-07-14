const express = require("express");
//const router = express.Router();
//const login = require("../controller/login");
//const cluster = require("../controller/cluster");
const registration = require("../controller/registration");
const unusedVar = "";
const userController = require("../controller/userController");
const userController = require("../controller/userController");

const productController = require("../controller/productController");
const mailController = require("../controller/mailController");

const checkAuthUser = require("../middleware/auth");
const validateApi = require("../middleware/validateApi");
const handleErrors = require("../middleware/handleError");
const fileUpload = require("express-fileupload");

router.use(handleErrors);
router.use(validateApi);

router.route("/login").post(login);
router.route("/registration").post(registration);
router.route("/getUserDetails").get(checkAuthUser,userController.userData);
router.route("/addUserInfo").post(checkAuthUser,fileUpload(),userController.userInfo);
router.route("/getProductDetails").get(productController.productData);
router.route("/addProduct").post(checkAuthUser,productController.addProductData);
router.route("/sendCodeToUsers").post(mailController.sendCodeToUsers);

module.exports = router;