import { NextResponse } from "next/server";
import DbConnect from "@/utils/dbConnect";
import User_Model from "@/Model/User_Model";
import Template_Model from "@/Model/Template_Model";
import nodemailer from "nodemailer";
import Login from "@/component/test/test";
import { date } from "zod";

export async function GET(){
    
}

const templates = {
  Interview: {
    subject: "Interview",
    text: ( candidateName) =>
      `Hello ${candidateName},\n\nThank you for reaching out. We will review your request and get back to you soon.\n\nBest Regards,\nYour Company`,
    html:(
        candidateName,
        jobTitle,
        companyName,
        date,
        time,
        interviewerName,
        meetingLink,
      )=>
      `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #eeeeee;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        h2 {
            color: #1a1a1a;
        }
        .interview-details {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-left: 5px solid #007bff;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
        @media (max-width: 600px) {
            .email-container {
                width: 90%;
                padding: 15px;
            }
            .btn {
                width: 100%;
                text-align: center;
                display: block;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            
            <h2>Interview Confirmation</h2>
        </div>
        <div class="content">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>We are pleased to confirm your interview for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>. Below are the interview details:</p>
            
            <div class="interview-details">
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time} (Indian TimeZone)</p>
                <p><strong>Mode:</strong> [Virtual]</p>
                <p><strong>Meeting Link:</strong> ${meetingLink}</p>
                <p><strong>Interviewer:</strong> ${interviewerName}</p>
            </div>

            <p>Kindly confirm your availability by clicking the button below:</p>
            <a href="${meetingLink}" class="btn">Join Meeting</a>
            
            <p>If you have any questions or need to reschedule, please reach out to us.</p>

            <p>Best Regards,<br><strong>${interviewerName}</strong><br>${companyName}</p>
        </div>
        <div class="footer">
            &copy; ${companyName} | All Rights Reserved
        </div>
    </div>
</body>
</html>
`,
  },
  ProductLaunch: {
    subject: "Product Launch",
    text: (customerName) =>
      `Dear ${customerName},\n\nCongratulations! We are happy to connect with you.\n\nBest Regards,\nHR Team`,
    html: (
        customerName,
          productName,
          productCategory,
          yourName,
          companyName,
    ) =>
      `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exciting Product Launch!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        h2 {
            color: #1a1a1a;
        }
        .product-image img {
            width: 100%;
            border-radius: 8px;
        }
        .product-details {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-left: 5px solid #28a745;
            text-align: left;
        }
        .product-details ul {
            list-style-type: none;
            padding: 0;
        }
        .product-details ul li {
            margin-bottom: 10px;
            font-size: 14px;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            font-size: 12px;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
        @media (max-width: 600px) {
            .email-container {
                width: 90%;
                padding: 15px;
            }
            .btn {
                width: 100%;
                text-align: center;
                display: block;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            
            <h2>Introducing Our Latest Innovation!</h2>
        </div>
        <div class="content">
            <p>Dear <strong>${customerName}</strong>,</p>
            <p>We’re thrilled to introduce our latest product: <strong>${productName}</strong> – designed to make your life easier and better than ever!</p>
            
            

            <div class="product-details">
                <h3>Why You’ll Love It:</h3>
                <ul>
                    <li>✅ Innovative features to simplify your tasks</li>
                    <li>✅ Cutting-edge technology for superior performance</li>
                    <li>✅ Sleek and modern design</li>
                    <li>✅ Special launch price for a limited time!</li>
                </ul>
            </div>

            <p>Don’t miss out on the future of <strong>${productCategory}</strong>!</p>
            <a href="http://localhost:3000/try-it" class="btn">Explore Now</a>
            
            <p>If you have any questions, feel free to reach out to us.</p>

            <p>Best Regards,<br><strong>${yourName}</strong><br>${companyName}</p>
        </div>
        <div class="footer">
            &copy; ${companyName} | All Rights Reserved
        </div>
    </div>
</body>
</html>
`,
  },
  PromotionAnnouncement: {
    subject: "Congratulations",
    text: (promotedEmployeeName) =>
        `Dear ${promotedEmployeeName},\n\nCongratulations! We are happy to connect with you.\n\nBest Regards,\nHR Team`,
    html: (
    promotedEmployeeName,
        newPosition,
        companyName,
        yourName,
    ) =>
      `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exciting Promotion Announcement!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        h2 {
            color: #1a1a1a;
        }
        .promotion-banner {
            width: 100%;
            border-radius: 8px;
        }
        .announcement {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-left: 5px solid #007bff;
            text-align: left;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            font-size: 12px;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
        @media (max-width: 600px) {
            .email-container {
                width: 90%;
                padding: 15px;
            }
            .btn {
                width: 100%;
                text-align: center;
                display: block;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            
            <h2>Exciting Promotion Announcement!</h2>
        </div>
        <div class="content">
            <p>Dear <strong>${promotedEmployeeName}</strong>,</p>
            <p>We are thrilled to announce that <strong>${promotedEmployeeName}</strong> has been promoted to <strong>${newPosition}</strong> at <strong>${companyName}</strong>!</p>
            
            

            <div class="announcement">
                <h3>About the Promotion:</h3>
                <p><strong>${promotedEmployeeName}</strong> has been an invaluable part of our team, consistently demonstrating dedication, leadership, and excellence. We are excited to see them thrive in their new role as <strong>${newPosition}</strong>.</p>
            </div>

            <p>Please join us in congratulating <strong>${promotedEmployeeName}</strong> on this well-deserved achievement!</p>
            <a href="http://localhost:3000/try-it" class="btn">Celebrate With Us</a>
            
            <p>Best Regards,<br><strong>${yourName}</strong><br>${companyName}</p>
        </div>
        <div class="footer">
            &copy; ${companyName} | All Rights Reserved
        </div>
    </div>
</body>
</html>
`,
  },
  SubscribeNewsletter: {
    subject: "SubscribeNewsletter",
    text: (username) =>
        `Dear ${username},\n\nCongratulations! We are happy to connect with you.\n\nBest Regards,\nHR Team`,
    html: (
        username,
        yourName,
          newsletterLink,
    ) =>
      `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscribe to Our Newsletter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        h2 {
            color: #1a1a1a;
        }
        .newsletter-benefits {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-left: 5px solid #ff9800;
            text-align: left;
        }
        .newsletter-benefits ul {
            list-style-type: none;
            padding: 0;
        }
        .newsletter-benefits ul li {
            margin-bottom: 10px;
            font-size: 14px;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            background-color: #ff9800;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            font-size: 12px;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
        @media (max-width: 600px) {
            .email-container {
                width: 90%;
                padding: 15px;
            }
            .btn {
                width: 100%;
                text-align: center;
                display: block;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            
            <h2>Subscribe to Our Monthly Newsletter</h2>
        </div>
        <div class="content">
            <p>Dear <strong>${username}</strong>,</p>
            <p>Stay ahead with the latest updates, trends, and insights delivered straight to your inbox every month!</p>
            
            <div class="newsletter-benefits">
                <h3>What You’ll Get:</h3>
                <ul>
                    <li>✅ Exclusive industry news & trends</li>
                    <li>✅ Expert tips & insights</li>
                    <li>✅ Special offers & discounts</li>
                    <li>✅ Early access to new content</li>
                </ul>
            </div>

            <p>Subscribe now and never miss an update!</p>
            <a href="${newsletterLink}" class="btn">Subscribe Now</a>
            
            <p>If you have any questions, feel free to reach out to us.</p>

            <p>Best Regards,<br><strong>${yourName}</strong><br></p>
        </div>
        <div class="footer">
            &copy; | All Rights Reserved
        </div>
    </div>
</body>
</html>
`,
  },
  TeamMeetingInvitation: {
    subject: "Team Meeting Invitation",
    text: (yourName) =>
        `Dear ${yourName},\n\nCongratulations! We are happy to connect with you.\n\nBest Regards,\nHR Team`,
    html: (
        date,
        meetingLink,
        time,
        agenda,
        yourName,
        companyName,
    ) =>
      `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Meeting Invitation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        h2 {
            color: #1a1a1a;
        }
        .meeting-details {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-left: 5px solid #007bff;
            text-align: left;
        }
        .meeting-details ul {
            list-style-type: none;
            padding: 0;
        }
        .meeting-details ul li {
            margin-bottom: 10px;
            font-size: 14px;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            font-size: 12px;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
        @media (max-width: 600px) {
            .email-container {
                width: 90%;
                padding: 15px;
            }
            .btn {
                width: 100%;
                text-align: center;
                display: block;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            
            <h2>📅 Team Meeting Invitation</h2>
        </div>
        <div class="content">
            
            <p>You are invited to our upcoming team meeting. Please find the details below:</p>
            
            <div class="meeting-details">
                <h3>Meeting Details:</h3>
                <ul>
                    <li><strong>📅 Date:</strong> ${date}</li>
                    <li><strong>⏰ Time:</strong> ${time} (Your Time Zone)</li>
                    <li><strong> Link:</strong> ${meetingLink}</li>
                    <li><strong>📝 Agenda:</strong> ${agenda}</li>
                </ul>
            </div>

            <p>Please confirm your attendance by clicking the button below.</p>
            <a href="${meetingLink}" class="btn">Confirm Attendance</a>
            
            <p>Looking forward to your participation.</p>

            <p>Best Regards,<br><strong>${yourName}</strong><br>${companyName}</p>
        </div>
        <div class="footer">
            &copy; ${companyName} | All Rights Reserved
        </div>
    </div>
</body>
</html>
`,
  },
  WelcomeAboard : {
    subject: "Welcome to the team",
    text: (employeeName) =>
        `Dear ${employeeName},\n\nCongratulations! We are happy to connect with you.\n\nBest Regards,\nHR Team`,
    html: (
        employeeName,
        companyName,
        joiningDate,
        department,
        managerName,
        yourName,
    ) =>
      `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Onboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #eeeeee;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        h2 {
            color: #1a1a1a;
        }
        .welcome-message {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-left: 5px solid #28a745;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
        }
        @media (max-width: 600px) {
            .email-container {
                width: 90%;
                padding: 15px;
            }
            .btn {
                width: 100%;
                text-align: center;
                display: block;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            
            <h2>Welcome Aboard!</h2>
        </div>
        <div class="content">
            <p>Dear <strong>${employeeName}</strong>,</p>
            <p>We are thrilled to welcome you to <strong>${companyName}</strong>! We are excited to have you as a part of our team.</p>
            
            <div class="welcome-message">
                <p><strong>Joining Date:</strong> ${joiningDate}</p>
                <p><strong>Department:</strong> ${department}</p>
                <p><strong>Manager:</strong> ${managerName}</p>
            </div>

            <p>To get started, click the button below to explore our onboarding portal:</p>
            <a href="http://localhost:3000/try-it" class="btn">Get Started</a>
            
            <p>If you have any questions, feel free to reach out to us. We look forward to working with you!</p>

            <p>Best Regards,<br><strong>${yourName}</strong><br>${companyName}</p>
        </div>
        <div class="footer">
            &copy; ${companyName} | All Rights Reserved
        </div>
    </div>
</body>
</html>

`,
  },
};

export async function POST(req) {
  console.log("Call from backend");
  const body = await req.json();
  console.log("Body data from backend:", body);

  if (!body || Object.keys(body).length === 0) {
    return NextResponse.json({ error: "No data received" }, { status: 400 });
  }

  try {
    await DbConnect();
    const { UserEmail, emails, selectedTemplate } = body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: "No valid recipients found" },
        { status: 400 }
      );
    }

    const emailTemplate = templates[selectedTemplate];
    console.log("Email template post",emailTemplate);
    
    if (!emailTemplate) {
      return NextResponse.json(
        { error: "Invalid template selection" },
        { status: 400 }
      );
    }
    // Find the existing user based on email
    const existingUser = await User_Model.findOne({ email: UserEmail });
    
    

    if (!existingUser) {
      console.log("Email not found in DB");
      return NextResponse.json(
        { error: "Invalid request to server" },
        { status: 400 }
      );
    }

    if (emails.length > 0) {
      const templateData = body;

      console.log("running if sendmail");

      // Trigger email sending asynchronously in the background
      sendEmails(emails, emailTemplate, templateData);
      console.log("Emails are being sent in the background");
    }

    

    // Add user ID to the data object
    const updatedData = { ...body, id: existingUser._id };

    // Find and update OR create a new document
    const savedData = await Template_Model.findOneAndUpdate(
      { "data.sender_id": existingUser._id }, // Find by user ID in the data object
      { data: updatedData }, // Update data
      { new: true, upsert: true } // Return updated document and create if not exists
    );

    return NextResponse.json({ success: true, data: savedData });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

async function sendEmails(emailArray, emailTemplate, templateData) {
    const sender = process.env.NEXT_PUBLIC_Nodemailder_Mail_id;
    const sender_passkey = process.env.NEXT_PUBLIC_Nodemailder_Password;
    console.log("template",emailTemplate);
    
    if (!emailTemplate || !templateData) {
      console.error("Invalid email template or template data:", emailTemplate, templateData);
      return NextResponse.json({ error: "template not found" }, { status: 400 });
    }
  
    let emailText = "";
    let emailHtml = "";
  
    if (emailTemplate.subject === "Interview") {
      console.log("Picking interview template data");
  
      emailText = emailTemplate.text(templateData.candidateName);
      emailHtml = emailTemplate.html(
        templateData.candidateName,
        templateData.jobTitle,
        templateData.companyName,
        templateData.date,
        templateData.time,
        templateData.interviewerName,
        templateData.meetingLink
      );
    } else if(emailTemplate.subject === "Product Launch") {
        console.log("Picking interview template data");
  
        emailText = emailTemplate.text(templateData.customerName);
        emailHtml = emailTemplate.html(
          templateData.customerName,
          templateData.productName,
          templateData.productCategory,
          templateData.yourName,
          templateData.companyName,
        );
    } else if(emailTemplate.subject === "Congratulations"){
        emailText = emailTemplate.text(templateData.promotedEmployeeName);
        emailHtml = emailTemplate.html(
          templateData.promotedEmployeeName,
          templateData.newPosition,
          templateData.companyName,
          templateData.yourName,
          
        )
       
    } else if(emailTemplate.subject === "SubscribeNewsletter"){
          
          
          emailText = emailTemplate.text(templateData.username);
        emailHtml = emailTemplate.html(
          templateData.username,
          templateData.yourName,
          templateData.newsletterLink,
          
          
        )
        
    } else if(emailTemplate.subject === "Team Meeting Invitation"){
        emailText = emailTemplate.text(templateData.yourName);
        emailHtml = emailTemplate.html(
          templateData.date,
          templateData.meetingLink,
          templateData.time,
          templateData.agenda,
          templateData.yourName,
          templateData.companyName,
        )
          
    } else if(emailTemplate.subject === "Welcome to the team"){
        emailText = emailTemplate.text(templateData.employeeName);
        emailHtml = emailTemplate.html(
          templateData.employeeName,
          templateData.companyName,
          templateData.joiningDate,
          templateData.department,
          templateData.managerName,
          templateData.yourName,
        )
    }
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: sender,
        pass: sender_passkey,
      },
    });
  
    const mailOptions = (email) => ({
      from: sender,
      to: email,  // Ensure you're sending emails to individual recipients
      subject: emailTemplate.subject,
      text: emailText,
      html: emailHtml,
    });
  
    try {
      await Promise.all(
        emailArray.map(async (email) => {
          await transporter.sendMail(mailOptions(email));
        })
      );
      console.log("All emails sent successfully");
    } catch (error) {
      console.error("Error while sending emails:", error);
    }
  }
  
