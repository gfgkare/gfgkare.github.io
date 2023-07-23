import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function TeamMember() {
    const [memberName, setMemberName] = useState();

    const params = useParams();

    useEffect(() => {
        setMemberName(params.membername || "each team member");
    }, []);

    return <>Dedicated page for {memberName}.</>;
}
