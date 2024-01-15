import React from "react";
import Filter from "./filter";
import Products from "./products";

function HomePage() {
  return (
    <div className="md:basis-10/12">
      <div className="pl-3 flex-col md:flex-row flex gap-x-5">
        <Filter/>
        <Products/>
      </div>
    </div>
  );
}

export default HomePage;
