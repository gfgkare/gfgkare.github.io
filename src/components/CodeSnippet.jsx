import "../styles/CodeSnippet.scss";

export default function CodeSnippet(props) {

    return (

        <div className="codeSnippet">
            {props.children}
        </div>
    )
}