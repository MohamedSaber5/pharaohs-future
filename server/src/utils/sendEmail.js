import nodemailer from "nodemailer";
import logger from "./logger.js";

/**
 * Send an email using Nodemailer.
 * If SMTP credentials are missing, falls back to logging the OTP in the console for development.
 *
 * @param {Object} options
 * @param {string} options.email - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Plain text message
 * @param {string} options.html - HTML formatted email body
 */
export const sendEmail = async (options) => {
  const isSmtpConfigured =
    process.env.EMAIL_HOST &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASS;

  if (isSmtpConfigured) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"مستقبل الفراعنة" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`📧 Email sent successfully to ${options.email}`);
  } else {
    // Development / fallback logging
    logger.info("==================================================");
    logger.info(`📧 [EMAIL NOTIFICATION]`);
    logger.info(`To: ${options.email}`);
    logger.info(`Subject: ${options.subject}`);
    logger.info(`Content: ${options.message}`);
    logger.info("==================================================");
  }
};

/**
 * Generate luxury branded HTML template for Pharaohs Future OTP email
 */
export const generateOtpEmailHtml = (name, otp) => {
  return `
  <!DOCTYPE html>
  <html dir="rtl" lang="ar">
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; direction: rtl; }
      .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
      .header { background: #000e1f; padding: 32px 24px; text-align: center; }
      .brand-title { color: #c9952a; font-size: 22px; font-weight: bold; margin: 0; letter-spacing: 1px; }
      .brand-sub { color: #ffffff; font-size: 13px; margin-top: 6px; opacity: 0.8; }
      .content { padding: 36px 30px; text-align: center; color: #2d3748; }
      .greeting { font-size: 18px; font-weight: bold; color: #000e1f; margin-bottom: 12px; }
      .text { font-size: 14px; color: #5a6a85; line-height: 1.7; margin-bottom: 24px; }
      .otp-box { background: #fdfaf3; border: 2px dashed #c9952a; border-radius: 12px; padding: 18px 24px; margin: 20px auto; display: inline-block; }
      .otp-code { font-size: 32px; font-weight: 800; color: #000e1f; letter-spacing: 8px; margin: 0; }
      .expiry-notice { font-size: 12px; color: #e53e3e; font-weight: 600; margin-top: 16px; }
      .security-warning { font-size: 12px; color: #a0aec0; margin-top: 24px; border-top: 1px solid #edf2f7; padding-top: 16px; }
      .footer { background: #f8fafc; padding: 18px; text-align: center; font-size: 11px; color: #a0aec0; border-top: 1px solid #edf2f7; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="brand-title">مستقبل الفراعنة للاستثمار العقاري</h1>
        <p class="brand-sub">بوابتك إلى أرقى المشروعات العقارية في مصر</p>
      </div>
      <div class="content">
        <div class="greeting">مرحباً ${name ? name : "عميلنا العزيز"}،</div>
        <p class="text">
          لقد تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك في منصة مستقبل الفراعنة.
          يرجى استخدام رمز التحقق التالي لإتمام العملية:
        </p>
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
        </div>
        <div class="expiry-notice">⚠️ هذا الرمز صالح لمدة 10 دقائق فقط</div>
        <div class="security-warning">
          إذا لم تكن قد طلبت إعادة تعيين كلمة المرور، يرجى تجاهل هذه الرسالة أو التواصل مع الدعم الفني فوراً.
        </div>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} مستقبل الفراعنة. جميع الحقوق محفوظة.
      </div>
    </div>
  </body>
  </html>
  `;
};

export default sendEmail;
