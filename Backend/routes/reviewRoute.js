const express = require("express");
const Review = require("../model/Review.model");
const Listing = require("../model/Listing.model");
const auth = require("../middleware/auth");

const router = express.Router();


// ADD REVIEW
router.post("/:listingId", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.create({
      rating,
      comment,
      user: req.user.id,
      listing: req.params.listingId
    });

    await Listing.findByIdAndUpdate(req.params.listingId, {
      $push: { reviews: review._id }
    });

    res.status(201).json(review);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET REVIEWS FOR LISTING
router.get("/:listingId", async (req, res) => {
  try {
    const reviews = await Review.find({
      listing: req.params.listingId
    }).populate("user", "name");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE REVIEW
router.delete("/:reviewId", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // only owner or admin can delete
    if (
      review.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // remove review reference from listing
    await Listing.findByIdAndUpdate(review.listing, {
      $pull: { reviews: review._id }
    });

    await review.deleteOne();

    res.json({ message: "Review deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
