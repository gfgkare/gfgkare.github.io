import "../styles/NewEventRegister.scss";


export default function NewEventRegister() {


    return (
        <div className="newEventRegister">

            <section className="bigImageContainer">
                <div className="navigation">
					<div className="logo">
						X
					</div>
					<div className="links">
						<span>Sponsors</span>
						<span>Q&A</span>
						<span>Join now</span>
					</div>
                </div>

                <div className="text">
                    <div className="name gradientText">
                        <div className="year">2024</div>
                        <div className="event">Codeathon</div>
                    </div>
                    <div className="shortAbout">
                        Contribute code, meet community members, participate in workshops, and win more SWAG.
                    </div>
                    <button className="cta">
                        Register
                    </button>
                </div>
            </section>

			<section className="sponsors">
				<div className="klu">KLU</div>
				<div className="gfgkare">GFG KARE</div>
			</section>

        </div>
    )
}