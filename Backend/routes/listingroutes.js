const express = require("express");
const Listing = require("../model/Listing.model");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");


const router = express.Router();


// CREATE (tenant/admin)
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    if (req.user.role !== "owner" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    const imageUrls = req.files.map(file => file.path);

    const listing = await Listing.create({
      ...req.body,
      images: imageUrls,
      amenities: JSON.parse(req.body.amenities),
      owner: req.user.id
    });

    res.status(201).json(listing);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});



// GET ALL
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().populate("owner", "name");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET SINGLE
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner", "name");
    res.json(listing);
  } catch (err) {
    res.status(404).json({ message: "Listing not found" });
  }
});


// UPDATE (owner/admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Not found" });

    if (listing.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(listing, req.body);
    await listing.save();

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE (owner/admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Not found" });

    if (listing.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await listing.deleteOne();
    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
