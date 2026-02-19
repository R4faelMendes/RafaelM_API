const router = require("express").Router();
const userController = require("../controllers/userController");
const compraController = require("../controllers/compraController");

router.post("/compra",compraController.createCompra);
 
router.post("/user", userController.createUser);
router.get("/user", userController.readUsers);
router.put("/user/:cpf", userController.updateUser);
router.delete("/user/:cpf", userController.deleteUser);
router.post("/login",userController.loginUser);

module.exports = router;
