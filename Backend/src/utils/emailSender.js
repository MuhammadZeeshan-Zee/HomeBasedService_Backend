import nodemailer from "nodemailer";
const SendEmailUtil = async (body) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID_SMTP,
        pass: process.env.PASSWORD_SMTP, // or regular password if app password is not set up
      },
    });
    transporter.verify(function (error, success) {
      if (error) {
        console.error("Error happened when verify:", err.message);
        reject(err);
      } else {
        console.log("Server is ready to take our messages");
        transporter.sendMail(body, (err, info) => {
          if (err) {
            console.error("Error happened when sending email:", err.message);
            reject(err);
          } else {
            console.log("Email sent:", info.response);
            resolve(info);
          }
        });
      }
    });
  });
};
export { SendEmailUtil };
