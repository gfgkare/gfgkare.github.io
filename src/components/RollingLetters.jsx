import "../styles/RollingLetters.scss";


export default function RollingLetters(props) {


    return (
        <div className="rollingLetters">

            <div className="box">

                {
                    props.word.split("").map((letter, index) => {
                        return (
                            <div className={`container ${ index % 2 == 0 ? 'even' : 'odd' }`} key={index}>
                                <div>{letter}</div>
                                <div>0</div>
                                <div>1</div>
                                <div>0</div>
                                <div>1</div>
                                <div>0</div>
                                <div>1</div>
                                <div>0</div>
                                <div>1</div>
                                <div>0</div>
                                <div>1</div>
                                <div>0</div>
                                <div>1</div>
                                <div>0</div>
                                <div>1</div>
                                <div>0</div>
                                <div>1</div>
                                <div>0</div>
                                <div>1</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}