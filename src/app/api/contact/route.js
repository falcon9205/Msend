import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req){
    const body =await req.json()
    
    const {fullName,email,phone,message} = body
    console.log("data from body",fullName,email,phone,message);
    const sender = process.env.NEXT_PUBLIC_Nodemailder_Mail_id;
    const sender_passkey = process.env.NEXT_PUBLIC_Nodemailder_Password;
   
     const transporter = nodemailer.createTransport({
          service: "gmail",
          secure: true,
          port: 465,
          auth: {
            user: sender,
            pass: sender_passkey,
          },
        });
      
        const mailOptions1 = (email) => ({
          from: sender,
          to: "mauryahimanshu567@gmail.com",  // Ensure you're sending emails to individual recipients
          subject: "Msend - Contact Us ",
          html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
      text-align: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #007bff;
      color: white;
    }
    td {
      background-color: #f9f9f9;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Msend Contact Form Submission</h2>
    
    <table>
      <tr>
        <th>Field</th>
        <th>Details</th>
      </tr>
      <tr>
        <td><strong>Full Name</strong></td>
        <td>${fullName}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td>${email}</td>
      </tr>
      <tr>
        <td><strong>Phone Number</strong></td>
        <td>${phone}</td>
      </tr>
      <tr>
        <td><strong>Message</strong></td>
        <td>${message}</td>
      </tr>
    </table>

    <p class="footer">msend - Send Emails Effortlessly‚ Anytime‚ Anywhere!</p>
  </div>

</body>
</html>
`,
        });

        const mailOptions2 = (email) => ({
            from: sender,
            to: email,  // Ensure you're sending emails to individual recipients
            subject: "Thankyou for Contacting...",
            html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
      text-align: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #007bff;
      color: white;
    }
    td {
      background-color: #f9f9f9;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
    .social-links {
      text-align: center;
      margin-top: 20px;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      text-decoration: none;
    }
    .social-links img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Got Your Query</h2>
    
    <table>
      <tr>
        <th>Field</th>
        <th>Details</th>
      </tr>
      <tr>
        <td><strong>Full Name</strong></td>
        <td>${fullName}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td>${email}</td>
      </tr>
      <tr>
        <td><strong>Phone Number</strong></td>
        <td>${phone}</td>
      </tr>
      <tr>
        <td><strong>Message</strong></td>
        <td>${message}</td>
      </tr>
    </table>

    <div class="social-links">
      <p><strong>Connect with me:</strong></p>
      <a href="https://www.linkedin.com/in/himanshu-maurya-7b5273190/" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn">
      </a>
      <a href="https://www.instagram.com/yeahthatshemu/" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram">
      </a>
      <a href="https://api.whatsapp.com/send?phone=919205487164&text=Hi%20Himanshu%20%F0%9F%91%8B" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
      </a>
    </div>

    <p class="footer">This is an automated email from Msend.</p>
  </div>

</body>
</html>
`,
          });
      
        try {
          
              await transporter.sendMail(mailOptions1(email));
              await transporter.sendMail(mailOptions2(email))
          console.log("All emails sent successfully");
          return NextResponse.json({msg:"All mail send sucess"},{status:200})
        } catch (error) {
          console.error("Error while sending emails:", error);
          return NextResponse.json({error: "error while sending the mail"},{status:400})
        }
   
}