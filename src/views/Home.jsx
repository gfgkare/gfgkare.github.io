import "../styles/Home.scss";

import { Link } from "react-router-dom"

import kluTeam from "../assets/klu_team.jpg";

import ImageComp from "../components/ImageComp";

export default function Main() {
    return (
        <>
            <div className="section intro">
                <div className="name">GeeksForGeeks Student Chapter</div>
                <div className="inst">KARE</div>
            </div>

            <div className="section about">
                <div className="titleAndContent">
                    <div className="title">WHO ARE WE</div>
                    <div className="content">
                        We are a team of aspiring students from Kalasalingam
                        University focused on making education and problem
                        solving yada yada yada accessible to students that want
                        to improve themselves in the fields of programming and
                        computer science.
                        <br /> <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Beatae nulla distinctio mollitia vero, omnis doloribus
                        debitis et dignissimos, earum voluptatum incidunt
                        voluptates quae praesentium aut molestiae ea quo nobis
                        consequatur!
                    </div>
                </div>

                <div className="imageContainer">
                    <div className="image">
                        {/* <img src={kluTeam} alt="GFG Team at KLU" /> */}
                        <ImageComp src={kluTeam} alt="GFG Team at KLU" text={ <>Image taken after event GFG Summer Carnival! <Link to="/events/gfg_summer_carnival">Go to event</Link> </>  } />
                    </div>
                </div>
            </div>
        </>
    );
}
