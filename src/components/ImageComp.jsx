import "../styles/ImageComp.scss";

export default function ImageComp(props) {
    return (
        <div className="imageComp">
            <img src={props.src} alt={props.alt} />
            {props.text ? (
                <div className="overlay">
                    <div className="text">{props.text}</div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
