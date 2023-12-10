from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
import json


from selenium.webdriver.chrome.options import Options

chrome_options = Options()  
chrome_options.add_argument("--headless")
  
driver = WebDriver(options=chrome_options)
driver.get("https://231973.yichafen.com/public/queryscore/sqcode/NsDcAn0mNzIyOHw2ZmM1YTY5Nzc2N2E2NGY4MDQzNWE4OTk0OWIyNmQ3MHwyMzE5NzMO0O0O.html")

# 等待页面加载完成
driver.implicitly_wait(10)

# 输入姓名
name_input = driver.find_element(By.NAME, "s_xingming")
name_input.send_keys("黄舒迪")

# 点击查询按钮
query_btn = driver.find_element(By.ID, "yiDunSubmitBtn")
query_btn.click()

# 等待页面跳转
driver.implicitly_wait(3000)

# 获取表格数据
table = driver.find_element(By.CSS_SELECTOR, "table.case")

# print(table.get_attribute('innerHTML'))

data = {}
tr_list = table.find_elements(By.TAG_NAME, "tr")

# 表格的字段
fields = tr_list[0]

# 表格的数据
secondTr = tr_list[1]

headers = []

for field in fields.find_elements(By.TAG_NAME, "th"):
    headers.append(field.text)
    

tds = secondTr.find_elements(By.TAG_NAME, "td")
i = 0
for td in tds:
    data[headers[i]] = td.text;
    i+=1

print(data)

print(json.dumps(data, ensure_ascii=False, indent=2))

driver.quit()
