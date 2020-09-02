const express = require('express');
const router = express.Router();
const auth = require('../../middelware/auth');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../../models/Admin');
const Client = require('../../models/Client');
const { check, validationResult } = require("express-validator");
const addSubtractDate = require("add-subtract-date");
var moment = require('moment');
const shortid = require('shortid');



//Get client
router.get('/', auth, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.errror(err.message);
        res.status(500).send("Server Errror")
    }


});

//Login
router.post('/', [
    check('regNo', 'Include a valid reg no').isNumeric(),
    check('password', 'Password Required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { regNo, password } = req.body
        try {

            let user = await User.findOne({ regNo });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

            }


            //JsonWebToken

            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payload,
                "JWTSECRET",
                { expiresIn: 360000 }
                , (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            );


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    })
//Add Client

router.post('/client', auth, async (req, res) => {

    let modelId = shortid.generate()
    const { name, investment, regNo, plan, interest, date, installments } = req.body;

    let client = await Client.findOne({ regNo });
    if (client) {
        return res.status(400).json({ errors: [{ msg: "client already exists" }] });
    }

    client = new Client({
        name,
        regNo,
        investment,
        model: [],
        interest,
        date,
    })
    let obj = {
        plan,
        installmentDate: '',
        payments: [],
        due: null,
        modelId
    }
    client.date = new Date(moment().format())

    if (plan == "Three Months") {
        client.interest = investment * 0.05
        console.log(client.date)
        obj.installmentDate = (addSubtractDate.add(client.date, 3, "months"))
    }
    if (plan == "Six Months") {
        client.interest = investment * 0.1
        obj.installmentDate = (addSubtractDate.add(client.date, 6, "months"))
    }
    if (plan == "1 Year") {
        client.interest = investment * 0.15
        obj.installmentDate = (addSubtractDate.add(client.date, 1, "year"))
    }
    client.model.push(obj)

    client.date = moment().format();
    await client.save()
    return res.json({ client })

})
//Get all Clients
router.get('/getclients', async (req, res) => {

    try {


        const clients = await Client.find()
        res.json(clients);
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');

    }
})

//GEt Client
router.post('/edit', auth, async (req, res) => {

    const { name, investment, regNo, plan, interest } = req.body;

    let client = await Client.findOne({ regNo });
    if (!client) {
        return res.status(400).json({ errors: [{ msg: "client does not exists" }] });
    }
    res.send(client)




})

//Add INvestment
router.put('/edit/add', async (req, res) => {
    const { investment, regNo, plan, interest } = req.body;
    let modelId = shortid.generate()
    let client = await Client.findOne({ regNo });
    client.investment = +(client.investment) + +(investment);
    let obj = {
        plan,
        modelId,
        installmentDate: '',
        payments: [],

    }


    if (plan == "Three Months") {
        client.interest = +(client.interest) + +(investment * 0.05)
        obj.installmentDate = (addSubtractDate.add(client.date, 3, "months"))
    }
    if (plan == "Six Months") {
        client.interest = +(client.interest) + +(investment * 0.1)
        obj.installmentDate = (addSubtractDate.add(client.date, 6, "months"))
    }
    if (plan == "1 Year") {
        client.interest = +(client.interest) + +(investment * 0.15)
        obj.installmentDate = (addSubtractDate.add(client.date, 1, "year"))
    }
    // client.plan.join(" , ")
    client.date = moment().format();
    client.model.push(obj)
    await client.save();
    res.send(client)

})

//Payment
router.put('/payment', async (req, res) => {
    const { id, installmentDate, plan, interest,modelId } = req.body
    const client = await Client.findById(id)
    client.model.map((c) => {
        let date1 = c.installmentDate;
        let date2 = new Date(installmentDate);
        // console.log(shortid.kkkkkkkgenerate());
        c.payments.map((p) => {
            if (installmentDate == p.installmentDate && p.plan == plan  && modelId == c.modelId) {
                return res.status(500).send("Payment Already done")
            }
        })
        if (c.plan == plan && date1 >= date2 && modelId == c.modelId) {
            let currentDate = moment().format()
            let id = shortid.generate()
            let data = {
                interest,
                currentDate,
                installmentDate,
                plan,
                id

            }
            c.payments.push(data)
            c.due = null;
            if (c.plan == "Three Months") {
                c.installmentDate = (addSubtractDate.add(c.installmentDate, 3, "months"))
            }
            if (c.plan == "Six Months") {
                c.installmentDate = (addSubtractDate.add(c.installmentDate, 6, "months"))
            }
            if (c.plan == "1 Year") {
                c.installmentDate = (addSubtractDate.add(c.installmentDate, 1, "year"))
            }
        }

    })
    Client.updateOne({ _id: id }, { $set: client }, (err, rsp) => {
        console;
    });



    return res.send(client)

})

module.exports = router;