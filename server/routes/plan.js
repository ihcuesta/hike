const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const Restaurant = require("../models/Restaurant");
const _ = require("lodash");
const passport = require("passport");

// Last plans restaurant detail page
router.get("/lastplansrest/:id", async (req, res, next) => {
  try {
    const plans = await Plan.find({
      restid: req.params.id
    });
    return res.status(200).json({ plans });
  } catch (err) {
    console.log("Error while retrieving plans", error);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// All
router.get("/all", async (req, res, next) => {
  try {
    const plans = await Plan.find({});
    return res.status(200).json({ plans });
  } catch (err) {
    console.log("Error while retrieving plans", error);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// Region
router.get("/region/:region", async (req, res, next) => {
  try {
    const plansRegion = await Plan.find({
      region: req.params.region
    });
    return res.status(200).json({ plansRegion });
  } catch (err) {
    console.log("Error while retrieving plans region: ", err);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// New plan
router.post("/new", async (req, res, next) => {
  const {
    name,
    hikelevel,
    shortDescr,
    longDescr,
    kms,
    image1,
    image2,
    image3,
    image4,
    image5,
    date,
    startTime,
    lunchTime,
    brunch,
    maxBookings,
    bookings,
    breakfast,
    firstCourse,
    secondCourse,
    dessert,
    drinks,
    bread,
    coffee,
    status
  } = req.body;
  try {
    // Check if the plan already exists
    const registeredPlan = await Plan.findOne({ name });
    if (registeredPlan) {
      console.log(`Plan ${name} already exists`);
      return res.status(400).json({ message: "Plan name already taken" });
    }

    const restOwner = await Restaurant.findOne({ owner: req.user._id });

    const newPlan = await Plan.create({
      name,
      owner: req.user._id,
      restid: restOwner._id,
      restaurant: restOwner.name,
      region: restOwner.region,
      city: restOwner.city,
      hikelevel,
      shortDescr,
      longDescr,
      kms,
      image1,
      image2,
      image3,
      image4,
      image5,
      date,
      startTime,
      lunchTime,
      brunch,
      maxBookings,
      bookings,
      breakfast,
      firstCourse,
      secondCourse,
      dessert,
      drinks,
      bread,
      coffee,
      status
    });
    console.log("Plan created");
    return res.status(200).json({ newPlan });
  } catch (err) {
    console.log("Error while trying to create a new plan", err);
    return res
      .status(500)
      .json({ message: "Error while trying to create a new plan", err });
  }
});

// Detail page of plan
router.get("/:id", async (req, res, next) => {
  try {
    const planId = await Plan.findOne({
      _id: req.params.id
    });
    return res.status(200).json({ planId });
  } catch (err) {
    console.log("Error while retrieving plan ID: ", error);
    return res.status(500).json({ message: "Impossible to get the plan" });
  }
});

// Edit page for a plan ID
router.get("/:id/edit", async (req, res, next) => {
  try {
    const planToEdit = await Plan.findOne({
      _id: req.params.id
    });

    if (String(planToEdit.owner) === String(req.user._id)) {
      console.log("Acceso permitido");
      return res.status(200).json({ planToEdit });
    } else {
      console.log("Only the owner is allowed to edit this plan");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to get information to edit the plan: ", err);
    return status(500).json({
      message: "Error trying to get information to edit the plan"
    });
  }
});

// Send the updates after edit
router.put("/:id/edit", async (req, res, next) => {
  const {
    name,
    hikelevel,
    shortDescr,
    longDescr,
    kms,
    image1,
    image2,
    image3,
    image4,
    image5,
    date,
    startTime,
    lunchTime,
    brunch,
    maxBookings,
    bookings,
    breakfast,
    firstCourse,
    secondCourse,
    dessert,
    drinks,
    bread,
    coffee,
    status
  } = req.body;
  try {
    const planToEdit = await Plan.findOne({
      _id: req.params.id
    });

    if (String(planToEdit.owner) === String(req.user._id)) {
      const registeredPlan = await Plan.findOne({ name });
      if (registeredPlan) {
        console.log(`Plan ${name} already exists`);
        return res.status(400).json({ message: "Plan name already taken" });
      }
      const planUpdated = await Plan.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: {
            name,
            hikelevel,
            shortDescr,
            longDescr,
            image1,
            image2,
            image3,
            image4,
            image5,
            pics,
            date,
            startTime,
            lunchTime,
            brunch,
            maxBookings,
            bookings,
            breakfast,
            firstCourse,
            secondCourse,
            dessert,
            drinks,
            bread,
            coffee,
            status
          }
        }
      );
      return res.status(200).json({ planUpdated });
    } else {
      console.log("Only the owner is allowed to edit this plan");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to update the plan details: ", err);
    return status(500).json({
      message: "Error trying to update the plan details"
    });
  }
});

// Send delete action
router.post("/:id/delete", async (req, res, next) => {
  try {
    let planCheck = await Plan.findOne({
      _id: req.params.id
    });

    if (String(planCheck.owner) === String(req.user._id)) {
      const planDeleted = await Plan.findOneAndRemove({
        _id: req.params.id
      });
      return res.status(200).json({ planDeleted });
    } else {
      console.log("Only the owner is allowed to delete this plan");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to delete the plan: ", err);
    return status(500).json({
      message: "Error trying to delete the restaurant"
    });
  }
});

module.exports = router;
