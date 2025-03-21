const ShimmerCategoryPage = () => {
  return (
    <div className="my-4" style={{ paddingInline: "5rem" }}>
      <div className="row">
        {/* Sidebar - Filters */}
        <div className="col-md-3">
          <div className="placeholder-glow">
            <h5 className="placeholder col-6 mb-3"></h5>
            <div className="placeholder col-10 mb-3"></div>
            <div className="placeholder col-8 mb-3"></div>
            <div className="placeholder col-5 mb-3"></div>
            <div className="placeholder col-9 mb-3"></div>
            <div className="placeholder col-7 mb-3"></div>
            <h6 className="placeholder col-6 mt-3 mb-3"></h6>
            <div className="placeholder col-10 mb-3"></div>
            <div className="placeholder col-9 mb-3"></div>
          </div>
        </div>

        {/* Main Content - Product Listing */}
        <div className="col-md-9">
          {/* Search Bar */}
          <div className="mb-3">
            <div
              className="placeholder col-12"
              style={{ height: "40px" }}
            ></div>
          </div>

          {/* Product Cards */}
          <div className="row g-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="col-md-4">
                <div className="card p-2">
                  {/* Image Placeholder */}
                  <div
                    className="placeholder w-100"
                    style={{ height: "200px" }}
                  ></div>

                  {/* Product Info */}
                  <div className="card-body">
                    <h5 className="placeholder-glow">
                      <span className="placeholder col-8"></span>
                    </h5>
                    <p className="placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </p>

                    {/* Price & Button */}
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="placeholder col-4"></span>
                      <button className="btn btn-primary disabled placeholder col-5"></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCategoryPage;
