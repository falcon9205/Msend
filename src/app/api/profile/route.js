import User_Model from "@/Model/User_Model";
import DbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import Template_Model from "@/Model/Template_Model";
export async function POST(req) {
  try {
    await DbConnect();
    const body = await req.json()
     console.log("Backend profile",body);
     
    const users = await User_Model.findOne({email:body.email}); // Fetch all users
    
    const history = await Template_Model.find({
      "data.id": users._id
    });
    console.log("template history",history);
     
    return NextResponse.json({ success: true, users,history }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}
