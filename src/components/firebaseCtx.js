import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getDatabase, connectDatabaseEmulator } from "firebase/database"
import { firebaseConfig } from "../scripts/firebaseKey"

const firebaseapp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseapp)
const database = getDatabase(firebaseapp)

//  if (location.hostname === "localhost") {
//      // Point to the RTDB emulator running on localhost.
//      connectAuthEmulator(auth, "http://localhost:9099")
//      connectDatabaseEmulator(database, "localhost", 9000)
//  }

export { auth, database }
// export database
export default firebaseapp