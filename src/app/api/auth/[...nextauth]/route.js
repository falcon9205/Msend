import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User_Model from "@/Model/User_Model";
import DbConnect from "@/utils/dbConnect";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await DbConnect(); // Ensure MongoDB is connected

      try {
        const existingUser = await User_Model.findOne({ email: user.email });

        if (!existingUser) {
          await User_Model.create({
            fullName: user.name,
            email: user.email,
            profilePhoto: user.image,
          });
        } else {
          existingUser.profilePhoto = user.image;
          existingUser.fullName = user.name;
          await existingUser.save();
        }

        return true; // ✅ Allow login

      } catch (error) {
        console.error("Error saving user to DB", error);
        return false; // ❌ Deny login on error
      }
    },

    async session({ session }) {
      await DbConnect(); // Ensure MongoDB is connected

      try {
        const user = await User_Model.findOne({ email: session.user.email });

        if (user) {
          session.user.id = user._id.toString(); // Convert ObjectId to string
        }
      } catch (error) {
        console.error("Error fetching session user:", error);
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Redirect to custom sign-in page (optional)
  },
});

export { handler as GET, handler as POST };
