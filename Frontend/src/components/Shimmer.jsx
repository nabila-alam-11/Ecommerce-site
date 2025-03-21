const Shimmer = () => {
  return (
    <div className=" my-4" style={{ paddingInline: "6rem" }}>
      {/* Categories Section */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="placeholder w-100" style={{ height: "250px" }}></div>
        </div>
        <div className="col-md-4">
          <div className="placeholder w-100" style={{ height: "250px" }}></div>
        </div>
        <div className="col-md-4">
          <div className="placeholder w-100" style={{ height: "250px" }}></div>
        </div>
      </div>

      {/* Large Banner */}
      <div className="my-4">
        <div className="placeholder w-100" style={{ height: "350px" }}></div>
      </div>

      {/* New Arrivals and Festive Collection */}
      <div className="row g-3">
        {/* New Arrivals */}
        <div className="col-md-6">
          <div className="p-3 border rounded bg-light">
            <h5 className="placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="placeholder-glow">
              <span className="placeholder col-8"></span>
              <span className="placeholder col-10 mt-2"></span>
            </p>
          </div>
        </div>

        {/* Festive Collection */}
        <div className="col-md-6">
          <div className="p-3 border rounded bg-light">
            <h5 className="placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="placeholder-glow">
              <span className="placeholder col-8"></span>
              <span className="placeholder col-10 mt-2"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shimmer;
