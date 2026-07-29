function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://keystone.com.vn'
const LOGO_URL = `${SITE_URL}/images/trang-chu/keystone-white-300x150.png`

const NAVY = '#0a1f3c'
const NAVY_DARK = '#050d1a'
const GOLD = '#d4a843'
const NEUTRAL_BG = '#f8f9fa'
const TEXT = '#1a1a2e'
const MUTED = '#6b7280'
const FONT = "Arial, 'Segoe UI', Helvetica, sans-serif"

/**
 * Table-based "bulletproof" layout: fixed 600px via mso conditional, fluid
 * via plain HTML/CSS for everything else. Avoids flex/grid/gradients/webfonts
 * so Outlook desktop (Word rendering engine), Gmail (strips <style> in <head>
 * for some clients), and mobile webviews all render the same structure.
 */
function shell(opts: { preheader: string; bodyHtml: string }) {
  return `<!DOCTYPE html>
<html lang="vi" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; display: block; }
  body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: ${NEUTRAL_BG}; }
  @media screen and (max-width: 600px) {
    .email-container { width: 100% !important; }
    .email-padding { padding-left: 20px !important; padding-right: 20px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:${NEUTRAL_BG};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(opts.preheader)}</div>
  <center style="width:100%; background-color:${NEUTRAL_BG};">
    <!--[if mso]>
    <table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0">
    <tr><td>
    <![endif]-->
    <table role="presentation" class="email-container" align="center" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; margin:0 auto;">
      <tr>
        <td style="background-color:${NAVY}; padding:24px 32px;" class="email-padding">
          <img src="${LOGO_URL}" width="150" alt="KEYSTONE" style="display:block; height:auto; max-width:150px;">
        </td>
      </tr>
      <tr>
        <td style="background-color:#ffffff;">
          ${opts.bodyHtml}
        </td>
      </tr>
      <tr>
        <td style="background-color:${NAVY_DARK}; padding:20px 32px; text-align:center;" class="email-padding">
          <p style="margin:0; font-family:${FONT}; font-size:12px; line-height:18px; color:#9ca3af;">
            CÔNG TY TNHH 1YEARS &nbsp;•&nbsp; MST: 0319452642<br>
            Tòa nhà Barotex, Số 6 Võ Văn Kiệt, P. Sài Gòn, TP. Hồ Chí Minh<br>
            Hotline: 0903 997 909 &nbsp;•&nbsp; Email: info@plusai.vn
          </p>
        </td>
      </tr>
    </table>
    <!--[if mso]>
    </td></tr>
    </table>
    <![endif]-->
  </center>
</body>
</html>`
}

function infoRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:6px 0; font-family:${FONT}; font-size:14px; color:${MUTED}; width:110px; vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:6px 0; font-family:${FONT}; font-size:14px; color:${TEXT}; vertical-align:top;">${value}</td>
    </tr>`
}

export function renderAdminNotificationEmail(data: {
  name: string
  email: string
  subject?: string
  message: string
}) {
  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="email-padding" style="padding:32px;">
          <p style="margin:0 0 16px 0; font-family:${FONT}; font-size:18px; font-weight:bold; color:${TEXT};">
            Có liên hệ mới từ website
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${infoRow('Họ tên', escapeHtml(data.name))}
            ${infoRow('Email', `<a href="mailto:${escapeHtml(data.email)}" style="color:${NAVY}; text-decoration:underline;">${escapeHtml(data.email)}</a>`)}
            ${infoRow('Chủ đề', escapeHtml(data.subject || '(không có)'))}
          </table>
          <p style="margin:20px 0 6px 0; font-family:${FONT}; font-size:14px; color:${MUTED};">Nội dung</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${NEUTRAL_BG}; border-radius:6px;">
            <tr>
              <td style="padding:16px; font-family:${FONT}; font-size:14px; line-height:22px; color:${TEXT};">
                ${escapeHtml(data.message).replace(/\n/g, '<br>')}
              </td>
            </tr>
          </table>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
            <tr>
              <td bgcolor="${GOLD}" style="border-radius:6px;">
                <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block; padding:12px 24px; font-family:${FONT}; font-size:14px; font-weight:bold; color:${NAVY_DARK}; text-decoration:none;">
                  Trả lời ngay
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`

  return shell({ preheader: `Liên hệ mới từ ${data.name}: ${data.subject || data.message.slice(0, 80)}`, bodyHtml })
}

export function renderUserConfirmationEmail(data: { name: string; subject?: string }) {
  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="email-padding" style="padding:32px; text-align:center;">
          <p style="margin:0 0 12px 0; font-family:${FONT}; font-size:20px; font-weight:bold; color:${TEXT};">
            Cảm ơn ${escapeHtml(data.name)} đã liên hệ với Keystone!
          </p>
          <p style="margin:0 0 24px 0; font-family:${FONT}; font-size:15px; line-height:24px; color:${MUTED};">
            Chúng tôi đã nhận được yêu cầu của bạn${data.subject ? ` về "<strong style="color:${TEXT};">${escapeHtml(data.subject)}</strong>"` : ''}.
            Đội ngũ Keystone sẽ phản hồi trong vòng 24 giờ làm việc.
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
            <tr>
              <td bgcolor="${GOLD}" style="border-radius:6px;">
                <a href="${SITE_URL}" style="display:inline-block; padding:12px 28px; font-family:${FONT}; font-size:14px; font-weight:bold; color:${NAVY_DARK}; text-decoration:none;">
                  Khám phá thêm về Keystone
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:28px 0 0 0; font-family:${FONT}; font-size:13px; line-height:20px; color:${MUTED};">
            Cần hỗ trợ gấp? Gọi hotline <strong style="color:${TEXT};">0903 997 909</strong>.
          </p>
        </td>
      </tr>
    </table>`

  return shell({ preheader: 'Keystone đã nhận được liên hệ của bạn và sẽ phản hồi sớm.', bodyHtml })
}
