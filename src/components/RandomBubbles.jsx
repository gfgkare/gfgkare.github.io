import "../styles/RandomBubbles.scss";
import Bubble from "./Bubble";

export default function RandomBubbles(props) {


    const renderRandomBubbles = () => {
        let bubbles = new Array(3 + Math.floor(Math.random() * 3))
            .fill(0)
            .map((_, i) => {
                return <Bubble key={i} />;
            });
        return bubbles;
    };

    return (
        <div className="bubbles">
            {renderRandomBubbles()}
        </div>
    );
}
