const router = require("express").Router();

const ctrl = require("./ctrl");

router.route("/admin/:password").post((req,res)=>{
  if(req.params.password==="admin") res.status(200).send("admin on");
  else res.status(503).send("wrong password");
});

router
  .route("/admin")
  .get(ctrl.adminGet)
  .post(ctrl.adminPost);
router.route("/table/:user").get(ctrl.getTable);

router.route("/login/:user").post(ctrl.login);
router
  .route("/query/:user")
  .get(ctrl.query)
  .post(ctrl.query)
  .put(ctrl.query)
  .delete(ctrl.query);

module.exports = router;
