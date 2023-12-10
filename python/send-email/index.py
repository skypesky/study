import smtplib
from email.mime.text import MIMEText
from email.header import Header

smtp_server = "smtp.qq.com"
smtp_port = 465
from_mail = "2565978507@qq.com"
to_mail = ["2565978507@qq.com"]
password = "ccheterzqwdodjab"  # 16位授权码


content = """
<html>
<p>Python 邮件发送测试...</p>
<p><a href="http://www.runoob.com">这是一个链接</a></p>
</html>
"""

message = MIMEText(content, "html", "utf-8")

message["From"] = Header("2565978507@qq.com")  # 发送者
message["To"] = Header("2565978507@qq.com")  # 接收者

subject = "Python SMTP 邮件测试"
message["Subject"] = Header(subject, "utf-8")

try:
    smtp = smtplib.SMTP_SSL(smtp_server, smtp_port)
    smtp.login(from_mail, password)
    smtp.sendmail(from_mail, to_mail, message.as_string())
    print("send mail successfully")
except smtplib.SMTPException as e:
    print(e.message)
finally:
    smtp.quit()
