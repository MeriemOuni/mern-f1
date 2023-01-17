// 1 require express
const express = require("express");
const Contact = require("../models/Contact");

// 2 express router
const router = express.Router();

/// Routes

/**
 *  @desc: testing route
 *  @path : http://localhost:4923/api/contact/test
 *  @method : GET
 *  @data : no data
 */
router.get("/test", (req, res) => {
	res.send("Hello world");
});

/**
 *  @desc: add contact
 *  @path : http://localhost:4923/api/contact/add
 *  @method : POST
 *  @data : req.body
 */
router.post("/add", async (req, res) => {
	try {
		const { name, email, phone } = req.body;
		const newContact = new Contact({ name, email, phone });
		await newContact.save();
		res.status(200).send({ msg: "Contact add successfully ...", newContact });
	} catch (error) {
		res.status(400).send({ msg: " Can not add Contact !!!!", error });
	}
});

/**
 *  @desc: get all contact
 *  @path : http://localhost:4923/api/contact/all
 *  @method : GET
 *  @data : no data
 */
router.get("/all", async (req, res) => {
	try {
		const listContacts = await Contact.find();
		res
			.status(200)
			.send({ msg: "this is the lidt of all contact ...", listContacts });
	} catch (error) {
		res.status(400).send({ msg: "Can not get all contact !!!", error });
	}
});

/**
 *  @desc: get one contact
 *  @path : http://localhost:4923/api/contact/:id
 *  @method : GET
 *  @data : req.params._id
 */
router.get("/:id", async (req, res) => {
	try {
		const contactToGet = await Contact.findOne({ _id: req.params.id });
		res.status(200).send({ msg: "I get the Contact ...", contactToGet });
	} catch (error) {
		res
			.status(400)
			.send({ msg: "Can not get the contact with this ID !!!!", error });
	}
});

/**
 *  @desc: delete contact
 *  @path : http://localhost:4923/api/contact/:_id
 *  @method : DELETE
 *  @data : req.params._id
 */
router.delete("/:_id", async (req, res) => {
	try {
		const { _id } = req.params;
		await Contact.findOneAndDelete({ _id });
		res.status(200).send({ msg: "Contact deleted .." });
	} catch (error) {
		res
			.status(400)
			.send({ msg: "Can not delete contact with this id !!!", error });
	}
});

/**
 *  @desc: edit contact
 *  @path : http://localhost:4923/api/contact/:_id
 *  @method : PUT
 *  @data : req.params._id & req.body
 */
router.put("/:_id", async (req, res) => {
	try {
		const { _id } = req.params;
		const result = await Contact.updateOne({ _id }, { $set: { ...req.body } });
		res.status(200).send({ msg: "Contact updated ..." });
	} catch (error) {
		res
			.status(400)
			.send({ msg: "Can not update contact with this id !!!", error });
	}
});

// 3 export
module.exports = router;
