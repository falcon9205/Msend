"use client"; // Required for Next.js App Router
// import { signIn, signOut, useSession } from "next-auth/react";

// export default function Login() {
//   const { data: session } = useSession();

//   console.log("Session Data:", session); // Log the session data to the console

//   return (
//     <div>
//       {session ? (
//         <>
//           <p>Welcome, {session.user?.name}</p>
//           <pre>{JSON.stringify(session, null, 2)}</pre> {/* Display all session data */}
//           <button onClick={() => signOut()}>Sign Out</button>
//         </>
//       ) : (
//         <button onClick={() => signIn("google")}>Google</button>
//       )}
//     </div>
//   );
// }


import Homepage from "@/component/Homepage/homepage.js";
import DbConnect from "@/utils/dbConnect";




export default function Home() {
  DbConnect()
  return (
    <>
    
    {/* <Header/> */}
    {/* <Profile/> */}
    <Homepage/>
    {/* <Footer/> */}
    </>
  );
}
