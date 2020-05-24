const router = require("express").Router();
const validate = require("../utils/helper.js").validate;
const transactions = require("../services/transactions");

router.get("/", function (req, res) {
    resolveResponse(transactions.getAll(), res);
})


router.get("/:id", function (req, res) {
    resolveResponse(transactions.getById(req.params.id), res);
})

router.post("/", function (req, res) {
    resolveResponse(transactions.add(req.body), res);
})

router.put("/", function (req, res) {
    resolveResponse(transactions.update(req.body), res);
})

router.delete("/:id", function (req, res) {
    resolveResponse(transactions.deleteTransaction(req.params.id), res);
})

var resolveResponse = function (promise, res) {
    promise
        .then(prod => { res.send(prod) })
        .catch(err => { console.error(err); res.send(err) });
}

module.exports = router;