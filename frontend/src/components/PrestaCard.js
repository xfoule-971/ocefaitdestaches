const PrestaCard = ({ image, info, title, line1, line2, line3 }) => {

    return (

        <div className="col-12 col-md-6 col-lg-4 d-flex">

            <div className="card border border-4 border-warning bg-success w-100 h-100">

                {image && (

                    <img
                        src={image}
                        className="card-img-top"
                        alt={info}
                    />
                    
                )}

                <div className="card-body d-flex flex-column text-light">

                    <h3 className="card-title text-center mb-4">
                        {title}
                    </h3>

                    <ul className="card-text d-flex flex-column align-items-start">

                        <li className="text-start">{line1}</li>

                        <li className="text-start">{line2}</li>

                        <li className="text-start">{line3}</li>

                    </ul>

                </div>

            </div>

        </div>

    );
    
};

export default PrestaCard;