


export default function Meta() {

    return (
        <div style={ {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
        } }>

            <ul>
                <li>Author: <a href="https://www.github.com/sabzdotpy" target="_blank" rel="noreferrer">sabzdotpy</a></li>
                <li>CID: 1762e65eb</li>
                <li>Notes: release</li>
                <li>Status: dev</li>
                <li>Last Updated: {currentDate}</li>
                <li>Latest commit message: {commitMessage}</li>
            </ul>


        </div>
    )
}
