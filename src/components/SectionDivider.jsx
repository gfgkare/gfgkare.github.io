import "../styles/SectionDivider.scss";

import { AiOutlineDown } from "react-icons/ai";

export default function SectionDivider(props) {
    return (
        <div className="dividerContainer">
            <div className="divider">
                {/* ------------------------------------------------ */}
            </div>
            {props.showDownButton ? (
                <div className="downButton" onClick={props.onClick}>
                    <AiOutlineDown className="icon" size={"30px"} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
