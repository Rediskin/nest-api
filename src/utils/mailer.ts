const nodemailer = require("nodemailer");
import { BadRequestException } from '@nestjs/common';
import { lang } from './lang';


const sendEmail = async (msg: any): Promise<void> => {
  if(process.env.SMTP_HOST !== undefined &&
    process.env.SMTP_PORT !== undefined &&
    process.env.SMTP_USER_NAME !== undefined &&
    process.env.SMTP_USER_PASSWORD !== undefined) {
       const transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: +process.env.SMTP_PORT,
         auth: {
           user: process.env.SMTP_USER_NAME,
           pass: process.env.SMTP_USER_PASSWORD,
         },
         tls: {
           rejectUnauthorized: false,
         }
       });
       await transporter.sendMail(msg, (error: any, info: any) => {
         if(error){
           console.log("NodMailerError: ",error);
         } else{
           console.log("EmailSent: ",info.response);
         }
       });
  }
}

export class Mailer {

  public async sendForgotPasswordEmail(email: string, token: string): Promise<void> {
    if(process.env.FRONT_HOST === undefined){
      throw new BadRequestException({
        status:400,
        error: lang["EN"].front_host_not_found,
      }, "400");
    }
    const url = `${process.env.FRONT_HOST}/restorePassword?token=${token}`;
    const msg = {
      to: email,
      from: process.env.SMTP_USER_NAME,
      subject: "Восстановление пароля",
      html: `
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
       <head>
           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
               <title>Восстановление пароля</title>
           <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
       </head>
       <body style="margin: 0; padding: 0;">
           <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
               <tr>
                   <td lang="en" style="display: block; font-size: 10pt; font-family: Arial,sans-serif; font-weight: normal; line-height: 1.15; margin-bottom: 20px">Добрый день.</td>
               </tr>
               <tr>
                   <td lang="en" style="display: block; font-size: 10pt; font-family: Arial,sans-serif; font-weight: normal; line-height: 1.15; margin-bottom: 20px">Что бы восстановить пароль перейдите по ссылке:</td>
               </tr>
               <tr>
                   <td lang="en" style="display: block; font-size: 10pt; font-family: Arial,sans-serif; font-weight: normal; line-height: 1.15; margin-bottom: 20px"><a href=${url}>Нажмите сюда</a></td>
               </tr>
               <tr>
                   <td lang="en" style="display: block; font-size: 10pt; font-family: Arial,sans-serif; font-weight: normal; line-height: 1.15; margin-bottom: 20px">С уважением администрация сайта</td>
               </tr>
           </table>
       </body>
   </html>
   `,
    };
    await sendEmail(msg);
  }
}
export const mailer = new Mailer();