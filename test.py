"""Test MiniMax client - standalone version."""
import os
import sys

# Direct imports from local minimax_client
sys.path.insert(0, '/Users/skypesky/workSpaces/javascript/github/study')

from minimax_client import MiniMaxClient

# Set API key from environment or use placeholder for testing
# api_key = os.environ.get("MINIMAX_API_KEY", "")
# if not api_key:
#     print("Error: MINIMAX_API_KEY environment variable not set!")
#     print("Please run: export MINIMAX_API_KEY='your_api_key_here'")
#     sys.exit(1)

client = MiniMaxClient('MiniMax-M2.7-highspeed')
llm = client.get_llm()
res = llm.invoke('你是什么模型')
print('🎉 成功！')
print(res.content)
