import { useOutletContext, Link } from 'react-router-dom';


export default function DashboardError() {

    
    const [
        currentUser, circlePerc, isVisible, visualsRef, celebrate, animationDone, setAnimationDone, totalMarks, totalScoredMarks, 
        correctlyAnswered, incorrectlyAnswered,positiveMarks, negativeMarks, error] = useOutletContext();


    return (

        <div className="error">
            {error}
        </div>
    )
}