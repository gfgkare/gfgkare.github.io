import { useState, useEffect, useRef } from "react";
import { useMisc } from "../contexts/MiscContext";

import "../styles/AllMembers.scss";
import MemberPreview from "../components/MemberPreview";
import allMemberData from "../data/all_data_merged";

import { useDebouncedCallback } from "use-debounce";

import useArray from "../hooks/useArray";

import { FiPlus } from "react-icons/fi";

import ShapesBackground from "../components/ShapesBackground";

export default function AllMembers() {
    const { setNavTitle } = useMisc();
    const [pointer, setPointer] = useState(0);
    const [searchBarText, setSearchBarText] = useState(0);

    const searchBar = useRef();

    const [allMembersLength, setAllMembersLength] = useState(0);

    const membersToRender = useArray();

    const debounced = useDebouncedCallback((value) => {
        setSearchBarText(value);
    }, 500);

    const getAndSetData = () => {
        allMemberData.slice(pointer, pointer + 11).map((member) => {
            membersToRender.push(member);
        });
        setPointer(pointer + 11);
    };

    const pushMatchedNamesToList = (name) => {
        let matched = allMemberData.filter((data) =>
            data.Name.toLowerCase().includes(name.toLowerCase())
        );
        membersToRender.setValue(matched);
    };

    useEffect(() => {
        setNavTitle("STUDENT MEMBERS");
        getAndSetData();
        setAllMembersLength(allMemberData.length);
    }, []);

    useEffect(() => {
        if (!searchBarText) {
            membersToRender.setValue([]);
            if (!pointer) {
                allMemberData.slice(0, 11).map((member) => {
                    membersToRender.push(member);
                });
            } else {
                allMemberData.slice(0, pointer).map((member) => {
                    membersToRender.push(member);
                });
            }
        } else {
            let matched = allMemberData.filter((data) =>
                data.Name.toLowerCase().includes(searchBarText.toLowerCase())
            );
            membersToRender.setValue(matched);
        }
    }, [searchBarText]);

    return (
        <>
            <ShapesBackground />
            <div className="allMembersContainer">
                <div className="searchBarWrapper">
                    <input
                        type="text"
                        placeholder="Enter a name to search..."
                        className="searchBar"
                        ref={searchBar}
                        onChange={(e) => debounced(e.target.value)}
                    />
                </div>

                {membersToRender.value.length
                    ? membersToRender.value.map((member, index) => {
                          return (
                              <MemberPreview
                                  visibilityStatus={""}
                                  key={index}
                                  info={member}
                              />
                          );
                      })
                    : () => {}}

                {(membersToRender.value.length < allMembersLength && !searchBarText ) ? (
                    <button onClick={() => getAndSetData()}>
                        <>
                            {" "}
                            <FiPlus /> {"     "} Load More{" "}
                        </>
                    </button>
                ) : (
                    <></>
                )}

                {/* <MemberPreview />
                <MemberPreview />
                <MemberPreview /> */}
            </div>
        </>
    );
}
