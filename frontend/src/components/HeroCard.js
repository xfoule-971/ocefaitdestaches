const HeroCard = ({ title }) => {

    return (

        <div className="p-3 hero" style={{ zIndex: '1'}}>

            <div className="text-center" style={{ zIndex: '999'}}>

                {/* Titre */}
                <h1 className="text-light fw-bold text-center hero__title" style={{ fontSize : '66px'}}>
                    {title}
                </h1>

            </div>

        </div>

    );

};

export default HeroCard;