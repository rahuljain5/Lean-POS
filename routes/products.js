const router = require("express").Router();
const validate = require("../utils/helper.js").validate;
const products = require("../services/products");

router.get("/", function (req, res) {
    resolveResponse(products.getAll(), res);
})


router.get("/:id", function (req, res) {
    resolveResponse(products.getById(req.params.id), res);
})

router.get("/search/:text", function (req, res) {
    resolveResponse(products.getBySearchText(req.params.text), res);
})

router.post("/", function (req, res) {
    resolveResponse(products.add(req.body), res);
})

router.put("/", function (req, res) {
    resolveResponse(products.update(req.body), res);
})

router.delete("/:id", function (req, res) {
    resolveResponse(products.deleteProduct(req.params.id), res);
})

var resolveResponse = function (promise, res) {
    promise
        .then(prod => { res.send(prod) })
        .catch(err => { console.error(err); res.send(err) });
}

module.exports = router;