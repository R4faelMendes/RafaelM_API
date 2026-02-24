const router = require("express").Router();
const userController = require("../controllers/userController");
const eventoController = require('../controllers/eventoController');
const organizadorController = require('../controllers/organizadorController');
const ingressoController = require('../controllers/ingressoController');


//Usuario
router.post("/user", userController.createUser);
router.get("/user", userController.readUsers);
router.put("/user/:cpf", userController.updateUser);
router.delete("/user/:cpf", userController.deleteUser);
router.post("/login",userController.loginUser);

//Evento
router.post('/evento', eventoController.createEvento);
router.get('/evento', eventoController.getAllEventos);
router.put('/evento', eventoController.updateEvento);
router.delete('/evento/:id', eventoController.deleteEvento);

//Ingresso
router.post('/organizador',organizadorController.createOrganizador);
router.get('/organizador', organizadorController.getAllOrganizadores);
router.get('/organizador/:id',organizadorController.getOrganizadorById);
router.put('/organizador/:id',organizadorController.updateOrganizador);
router.delete('/organizador/:id',organizadorController.deleteOrganizador);

//Ingresso
router.post('/ingresso', ingressoController.createIngresso);
router.get('/ingresso', ingressoController.getAllIngressos);
router.get('/ingresso/evento/:id', ingressoController.getByIdEvento);
router.put('/ingresso', ingressoController.updateIngresso);
router.delete('/ingresso/:id', ingressoController.deleteIngresso);

module.exports = router;
