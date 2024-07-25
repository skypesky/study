import pyautogui
import random
import time
import keyboard


stop = False

def click_randomly():
    try:
        print("程序即将开始")
        count = 1
        while count <= 100 and stop is False:
            # 随机等待 1 到 3 秒
            wait_time = random.uniform(3, 5)
            time.sleep(wait_time)

            for i in range(1, 1000):  
                if stop is True or is_mouse_in_area(0,0, 400, 400) is False:
                    continue;
                # 随机选择点击位置
                click_x = random.randint(350, 400)
                click_y = random.randint(350, 400)

                # 移动鼠标到指定位置并点击
                pyautogui.moveTo(click_x, click_y)
                pyautogui.click()
            
            count = count + 1

    except KeyboardInterrupt:
        print("程序已终止")


# 定义一个函数来检查鼠标位置是否在指定区域
def is_mouse_in_area(x1, y1, x2, y2):
    mouse_x, mouse_y = pyautogui.position()
    return x1 <= mouse_x <= x2 and y1 <= mouse_y <= y2

# 定义按下esc键时的回调函数
def on_esc_pressed():
    global stop
    stop = True
    print("程序已停止")
    
# 监听键盘事件，按下esc键时停止程序
keyboard.add_hotkey('esc', on_esc_pressed)

if __name__ == '__main__':
    click_randomly()
    
