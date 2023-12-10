import re
import unittest


# 使用正则表达式实现
def myStrip(original, removeStr="\s"):
    return re.sub(r"^{}+|{}$".format(removeStr, removeStr), "", original)


def myStripV2(original: str, removeStr: str = " ") -> str:
    start = 0
    end = len(original)

    if original.startswith(removeStr):
        start = len(removeStr)

    if original.endswith(removeStr):
        end = -len(removeStr)

    return original[start:end]


# 编写测试用例
class TestFunc(unittest.TestCase):
    def test_myStrip(self):
        self.assertEqual(myStrip("aba", "a"), "b")
        self.assertEqual(myStrip(" aba "), "aba")
        self.assertEqual(myStrip("aba", "A"), "aba")
        self.assertEqual(myStrip("AbA", "A"), "b")

    def test_my_strip_v2(self):
        self.assertEqual(myStripV2("aba", "a"), "b")
        self.assertEqual(myStripV2(" aba "), "aba")
        self.assertEqual(myStripV2("aba", "A"), "aba")
        self.assertEqual(myStripV2("AbA", "A"), "b")


if __name__ == "__main__":
    unittest.main()
