


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
                <li>Status: prod</li>
                <li>Last Updated: {currentDate}</li>
                <li>Latest commit message: {commitMessage}</li>
                <li>Hehe: {import.meta.env.VITE_SUPABASE_URL}</li>
            </ul>


        </div>
    )
}
