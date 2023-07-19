import "../styles/Home.scss";

import kluTeam from "../assets/klu_team.jpg";

export default function Main() {
    return (
        <>
            <div className="section intro">
                <div className="name">GeeksForGeeks Student Chapter</div>
                <div className="inst">KARE</div>
            </div>

            <div className="section about">
                <div className="title">WHO ARE WE</div>

                <div className="imageAndContent">
                    <div className="content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aspernatur quo assumenda nulla possimus dolores
                        voluptatum velit neque aut, facilis harum ut facere odio
                        sapiente nisi commodi inventore delectus corporis.
                        Pariatur.
                    </div>

                    <div className="image">
                        <img src={kluTeam} alt="GFG Team at KLU" />
                    </div>
                </div>
            </div>
        </>
    );
}
