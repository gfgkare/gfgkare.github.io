
import "../styles/ChapterMember.scss";
import chapterMembersInfo from "../data/chapterMembersInfo";

export default function ChapterMember() {


    return (
        <>
            {chapterMembersInfo.map((member) => {
                return (
                    <div className="chapterMember">
                        <img className="memberImage" src={member.img} />
                        <div className="memberName">{member.name}</div>
                        <div className="memberSince">Member since {member.memberSince}</div>

                        <div className="otherDetails">Other details...</div>
                    </div>
                );
            })}
        </>
    );
}
