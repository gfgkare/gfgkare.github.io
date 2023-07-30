import { useState, useEffect } from "react";
import { useMisc } from "../contexts/MiscContext";

import "../styles/AllMembers.scss";
import MemberPreview from "../components/MemberPreview";
import allMemberData from "../data/csvjson.json";
import useArray from "../hooks/useArray";

import { FiPlus } from "react-icons/fi"

import ShapesBackground from "../components/ShapesBackground";

export default function AllMembers() {
    const { setNavTitle } = useMisc();
    const [pointer, setPointer] = useState(0);

    const membersToRender = useArray();
    
    const getAndSetData = () => {
        allMemberData.slice(pointer, pointer + 11).map((member) => {
            membersToRender.push( member )
            setPointer( pointer + 11 );
        });
    };

    useEffect(() => {
        setNavTitle("STUDENT MEMBERS");
        getAndSetData();
    }, []);

    return (
        <>

        <ShapesBackground />
            <div
                className="allMembersContainer"
            >
                {membersToRender.value.map((member) => {
                    return <MemberPreview info={member} />
                })}

                <button
                    onClick={() => getAndSetData()}
                    // onClick={() => {
                    //     setMembersToRender([
                    //         ...membersToRender,
                    //         allMemberData.slice(pointer, pointer + 5),
                    //     ]);
                    //     setPointer((pointer) => pointer + 5);
                    // }}
                >
                    <><FiPlus/> {"     "} Load More</>
                </button>
                {/* <MemberPreview />
                <MemberPreview />
                <MemberPreview /> */}
            </div>
        </>
    );
}
