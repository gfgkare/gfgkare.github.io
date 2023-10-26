import React, { useState, useEffect } from "react";
import { auth, database } from "../components/firebaseCtx";
import { green, red, pink } from "../scripts/Misc";
import { update, remove, ref as dRef } from "firebase/database";
import { encode } from "firebase-key";

import {
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	createUserWithEmailAndPassword,
	updateProfile,
	setPersistence,
	GoogleAuthProvider,
	FacebookAuthProvider,
	GithubAuthProvider,
	signOut,
} from "firebase/auth";
import { set, ref, child, get, onValue, query, orderByChild, startAt, limitToFirst, equalTo } from "firebase/database";
import useArray from "../hooks/useArray";

export const AuthContext = React.createContext();

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
	prompt: "select_account",
});

const FaceBookProvider = new FacebookAuthProvider();
FaceBookProvider.setCustomParameters({
	prompt: "select_account",
});

const GithubProvider = new GithubAuthProvider();
GithubProvider.setCustomParameters({
	prompt: "select_account",
});

export const useAuth = () => {
	return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [USER_METADATA, SET_USER_METADATA] = useState();
	const [USER_MISCDATA, SET_USER_MISCDATA] = useState();
	const JOURNAL_ENTRIES = useArray();
	const [author] = useState("Sabz");

	const SET_USER = (user) => {
		console.trace("SET_USER called from children");
		setCurrentUser(user);
	};

	const GET_USER = () => {
		return currentUser;
	};

	const USER_PRESENT = () => {
		if (currentUser === "none" || !currentUser) return false;
		else if (currentUser) return true;
	};

	const signin = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signinwithpopup = (provider) => {
		console.log("sign in with");
		if (provider === "google") {
			console.log("logging with google");
			return signInWithPopup(auth, GoogleProvider);
		} else if (provider === "facebook") {
			console.log("logging with facebook");
			return signInWithPopup(auth, FaceBookProvider);
		} else if (provider === "github") {
			console.log("logging with gh");
			return signInWithPopup(auth, GithubProvider);
		}
	};

	const signinwithredirect = (provider) => {
		if (provider === "google") {
			return signInWithRedirect(auth, GoogleProvider);
		} else if (provider === "facebook") {
			return signInWithRedirect(auth, FaceBookProvider);
		} else if (provider === "github") {
			return signInWithRedirect(auth, GithubProvider);
		}
	};

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signout = () => {
		return signOut(auth);
	};

	const changedisplayname = (name) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
		});
	};

	const setpersistence = (persistence) => {
		setPersistence(auth, persistence);
	};

	useEffect(() => {
		console.log("[AuthContext.jsx] start");
		const unsubscribe = auth.onAuthStateChanged((user) => {
			pink("[onAuthStateChanged from AuthContext.jsx]");
			if (user) {
				green("[AuthContext] user found!");
				setCurrentUser(user);
				// console.log(user)
				// user.getIdToken().then((token) => pink(token, "USER TOKEN", true))
			} else {
				red("[AuthContext] no logged in user found.");
				console.log(user);
				setCurrentUser("none");
			}
		});

		return () => unsubscribe();
	}, []);

	const testWrite = (userID, username, email) => {
		try {
			const rootRef = ref(database, "root");
			const emailPath = `emails_list/${userID}`;
			const usernamePath = `username_list/${username}`;
			return rootRef.update({ emailPath: email, usernamePath: userID });
		} catch (e) {
			console.error(e);
		}
	};

	const writeUserMetaData = (userId, displayName, username, email, dateofbirth) => {
		return set(ref(database, "root/users_metadata/" + userId), {
			displayname: displayName,
			username: username,
			email: email,
			dateofbirth: dateofbirth,
		});
	};

	const writeUserMiscData = (userID) => {
		return set(ref(database, "root/users_miscdata/" + userID), {
			hasloggedinforthefirsttime: false,
			hasverifiedemail: false,
		});
	};

	const appendUsernameToUsernamesList = (userId, username) => {
		return set(ref(database, "root/username_list/" + username), {
			id: userId,
		});
	};

	const appendEmailToEmailsList = (userId, email) => {
		return set(ref(database, "root/emails_list/" + userId), {
			email: email,
		});
	};

	const getUserMetaData = (userID) => {
		console.log("reading user data...");

		return new Promise((resolve, reject) => {
			onValue(ref(database, `users_metadata/${userID}`), (snapshot) => {
				if (snapshot.val()) {
					SET_USER_METADATA(snapshot.val());
					resolve(snapshot.val());
				} else {
					reject("No data found");
				}
			});
		});
	};

	const getUserMiscData = (userID) => {
		console.log("reading user data...");

		return new Promise((resolve, reject) => {
			onValue(ref(database, `users_miscdata/${userID}`), (snapshot) => {
				if (snapshot.val()) {
					SET_USER_MISCDATA(snapshot.val());
					resolve(snapshot.val());
				} else {
					reject("No data found");
				}
			});
		});
	};

	// testing

	const getDataSortByDOB = () => {
		const query = query(ref(database, "users_metadata"), orderByChild("dateofbirth"));

		get(query)
			.then((snapshot) => {
				console.log(snapshot);
			})
			.catch((error) => {
				red("Error in getDobSort");
				console.log(error);
			});
	};

	const getPostData = (postID) => {
		const posts = [
			{
				id: 1,
				author: "Sabz",
				author_picture: "none",
				date: "02-10-2004",
				gig_topic: "Hacking",
				text: "I want programmer to hack nasa thanku",
			},
			{
				id: 2,
				author: "Jeff",
				author_picture: "none",
				date: "12-01-2022",
				gig_topic: "Game Development",
				text: "Muck",
			},
			{
				id: 3,
				author: "Joe",
				author_picture: "file too large",
				date: "06-09-2021",
				gig_topic: "Other",
				text: "mama",
			},
		];

		return new Promise((resolve, reject) => {
			if (postID === "all") resolve(posts);

			if (postID == 1 || postID == 2 || postID == 3) {
				resolve(posts[postID - 1]);
			} else {
				reject("ID Not Found");
			}
		});
	};

	const writeUserToDatabase = (uid, displayname, username, dob, email) => {
		const updates = {};
		updates[`root/users/${uid}/displayname`] = displayname;
		updates[`root/users/${uid}/username`] = username;
		updates[`root/users/${uid}/dob`] = dob;
		updates[`root/users/${uid}/email`] = email;
		updates[`root/username_list/${username}`] = email;
		updates[`root/email_list/${encode(email)}`] = uid;

		update(dRef(database), updates)
			.then(() => {
				green("Database write success!");
				console.log("Added user name, dob and email to database.");
			})
			.catch(() => {
				red("Database write failure");
			});
	};

	const readAllUsernames = () => {
		return new Promise((resolve, reject) => {
			const readRef = ref(database, `root/username_list`);

			onValue(readRef, (snapshot) => {
				if (snapshot.val()) {
					resolve(Object.keys(snapshot.val()));
				} else {
					resolve([]);
				}
			});
		});
	};

	const getEmailFromUsername = (username) => {
		return new Promise((resolve, reject) => {
			console.log("Read username_list looking for email");
			const readRef = ref(database, `root/username_list/${username}`);

			onValue(readRef, (snapshot) => {
				console.log(snapshot);
				if (snapshot.val()) {
					console.log(`Email from username = ${snapshot.val()}`);
					resolve(snapshot.val());
				} else {
					reject("No email found with given username");
				}
			});
		});
	};

	const getUsernameFromUid = (uid) => {
		return new Promise((resolve, reject) => {
			const readRef = ref(database, `root/users/${uid}`);
			// console.log(uid)
			onValue(readRef, (snapshot) => {
				// console.log(snapshot.val());
				if (snapshot.val()) {
					// console.log(`Username from UID = ${snapshot.val()["username"]}`);
					resolve(snapshot.val()["username"]);
				} else {
					console.log("No username found with UID");
					reject("???");
				}
			});
		});
	};

	const changeToCustomDisplayName = (displayName) => {
		changedisplayname(displayName)
			.then(() => {
				console.log("Changed name in auth object. Proceeding to change in db");
				let updates = {};
				updates[`root/users/${currentUser.uid}/displayname`] = displayName;
				// updates[`root/email_list/${encode(email)}`] = uid;

				update(dRef(database), updates)
					.then(() => {
						green("Database change displayname success!");
						// console.log("Added user name, dob and email to database.");
					})
					.catch(() => {
						red("Database change displayname failure");
					});
			})
			.catch((e) => {
				console.log("Error changing name in auth.");
			});
	};

	const addJournalEntryToDatabase = (title, text, timestamp, mood) => {
		return new Promise((resolve, reject) => {
			if (currentUser && currentUser !== "none") {
				if (!timestamp) {
					console.log("No timestamp was provided");
					timestamp = Date.now();
				}

				if (!title && !(JSON.stringify(text) === "[{}]")) {
					console.log("both text and title are empty/");
					reject("Both title and content cannot be empty.");
				}

				const updates = {};
				updates[`root/journal_entries/${currentUser.uid}/${timestamp}/title`] = title;
				updates[`root/journal_entries/${currentUser.uid}/${timestamp}/text`] = text;
				updates[`root/journal_entries/${currentUser.uid}/${timestamp}/timestamp`] = timestamp;
				updates[`root/journal_entries/${currentUser.uid}/${timestamp}/mood`] = mood;
				// updates[`root/journal_entries/${currentUser.uid}/date_added`] = username;

				update(dRef(database), updates)
					.then(() => {
						green("Added journal entry to db!");
						console.log("Journal entry added to database");
						resolve(timestamp);
					})
					.catch((e) => {
						red("Couldn't add journal entry to db :(");
						console.log(e);
						reject(e);
					});
			} else {
				reject("No user found.");
			}
		});
	};

	const deleteJournalEntryFromDatabase = (timestamp) => {
		return new Promise((resolve, reject) => {
			if (currentUser && currentUser !== "none") {
				if (!timestamp) {
					reject("no timestamp was provided");
				}

				const deletes = {};
				deletes[`root/journal_entries/${currentUser.uid}/${timestamp}`] = null;

				update(dRef(database), deletes)
					.then(() => {
						green("Deleted entry from db.");
						resolve("Entry deleted.");
					})
					.catch((e) => {
						red("Error while deleting entry from db.");
						reject(e);
					});
			} else {
				reject("No user found.");
			}
		});
	};

	const readAllJournalEntries = () => {
		return new Promise((resolve, reject) => {
			if (currentUser && currentUser !== "none") {
				const readRef = ref(database, `root/journal_entries/${currentUser.uid}`);

				try {
					onValue(readRef, (snapshot) => {
						if (snapshot.val()) {
							console.log("Jounral has value");
							resolve(snapshot.val());
						} else {
							console.log("Jounral has no value");
							resolve([]);
						}
					});
				} catch (e) {
					reject(e);
				}
			} else {
				reject("No user found.");
			}
		});
	};

	const readAndSetJournalEntries = () => {
		return new Promise((resolve, reject) => {
			let temp = [];
			readAllJournalEntries()
				.then((entries) => {
					console.log(entries);
					if (Object.keys(entries).length < 1) {
						// console.log(Object.keys(entries).length)
						console.log("Jounral entry length 0");
						JOURNAL_ENTRIES.setValue([]);
						resolve([]);
						return;
					}

					Object.getOwnPropertyNames(entries).map((timestamp) => {
						console.log("Parsing jounral entries...");
						// JOURNAL_ENTRIES.push(entries[timestamp])
						var obj = {};
						obj[timestamp] = entries[timestamp];
						temp.push(obj);

						// temp[timestamp] = entries[timestamp]
					});
					JOURNAL_ENTRIES.setValue(temp);
					resolve();
				})
				.catch((e) => {
					console.log("error in reading all journal entries");
					console.log(e);
					reject(e);
				});
		});
	};

	const value = {
		author,
		currentUser,
		GET_USER,
		SET_USER,
		USER_PRESENT,
		USER_METADATA,
		USER_MISCDATA,
		JOURNAL_ENTRIES,
		signin,
		signout,
		signinwithpopup,
		signinwithredirect,
		signup,
		changedisplayname,
		writeUserMetaData,
		writeUserMiscData,
		getUserMetaData,
		getUserMiscData,
		appendUsernameToUsernamesList,
		appendEmailToEmailsList,
		setpersistence,

		getPostData,
		getDataSortByDOB,

		testWrite,
		writeUserToDatabase,
		readAllUsernames,
		getEmailFromUsername,
		getUsernameFromUid,

		changeToCustomDisplayName,
		addJournalEntryToDatabase,
		deleteJournalEntryFromDatabase,

		readAllJournalEntries,
		readAndSetJournalEntries,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
