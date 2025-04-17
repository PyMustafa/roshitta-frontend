import React from "react";
import StarRatings from "react-star-ratings";

export default function StarRating({ rating = 0, starDimension = "17px", starSpacing = "0px" }) {
    return (
      <StarRatings
        rating={rating}
        starRatedColor="#FF9A00"
        starEmptyColor="#CCCCCC"
        starDimension={starDimension}
        starSpacing={starSpacing}
        numberOfStars={5}
        name="rating"
        svgIconPath="M12 17.27l3.18 1.91c.39.23.85-.11.73-.55l-.84-3.66 2.79-2.39c.39-.34.19-.97-.34-1.03l-3.74-.32-1.46-3.45c-.2-.47-.87-.47-1.07 0l-1.46 3.45-3.74.32c-.53.06-.73.69-.34 1.03l2.79 2.39-.84 3.66c-.12.44.34.78.73.55l3.18-1.91z"
        svgIconViewBox="5 7 20 20"
      />
    );
  }