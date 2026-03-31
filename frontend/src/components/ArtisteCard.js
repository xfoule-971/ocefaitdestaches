const ArtisteCard = ({ movie, title, desc1, desc2 }) => {

    return (

        <div className="col-12 col-md-9 col-lg-7">

            <div className="card card-survol bg-success shadow-lg border-5 text-center mx-auto">

                <video
                    className="card-img-top"
                    src={movie}
                    controls
                    autoPlay
                    muted
                    loop
                />

                <div className="card-body text-light">

                    <h3 className="card-title fw-semibold">
                        {title}
                    </h3>

                    <p className="justif-text lh-base fst-italic">
                        {desc1}
                    </p>

                    <p className="justif-text lh-base fst-italic">
                        {desc2}
                    </p>

                </div>

            </div>

        </div>

    );

};

export default ArtisteCard;