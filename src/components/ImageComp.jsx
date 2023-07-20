import "../styles/ImageComp.scss";

export default function ImageComp(props) {
    return (
        <div className="imageComp">
            <img src={props.src} alt={props.alt} />
            {props.text ? (
                <div class="overlay">
                    <div class="text">{props.text}</div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
