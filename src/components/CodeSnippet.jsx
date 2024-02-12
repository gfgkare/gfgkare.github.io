import "../styles/CodeSnippet.scss";

export default function CodeSnippet(props) {

    return (
        <div className="codeSnippet">
            {
                ("" + props.codeSnippet).split("|").map((line, index) => {
                    return (
                        <span key={index} className="line">
                            {line}
                        </span>
                    )
                })
            }
        </div>
    )
}