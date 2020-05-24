const router = require("express").Router();
const validate = require("../utils/helper.js").validate;
const categories = require("../services/categories");

router.get("/", function (req, res) {
    resolveResponse(categories.getAll(), res);
})


router.get("/:id", function (req, res) {
    resolveResponse(categories.getById(req.params.id), res);
})

router.post("/", function (req, res) {
    resolveResponse(categories.add(req.body), res);
})

router.put("/", function (req, res) {
    resolveResponse(categories.update(req.body), res);
})

router.delete("/:id", function (req, res) {
    resolveResponse(categories.deleteCategory(req.params.id), res);
})

var resolveResponse = function (promise, res) {
    promise
        .then(prod => { res.send(prod) })
        .catch(err => { console.error(err); res.send(err) });
}

module.exports = router;