# Tetris Loop Animation - SPEC.md

## 1. Concept & Vision

一个视觉上令人着迷的俄罗斯方块无限循环动画。黑色背景上，彩色方块优雅下落、旋转、堆积，当完整行形成时闪烁消除，产生令人满足的"解压"效果。整体风格是极简霓虹美学——在黑暗中发光的几何形态，创造出一种冥想般的视觉体验。

## 2. Design Language

### Aesthetic Direction
深色赛博朋克风格，参考《银翼杀手》的霓虹美学与经典俄罗斯方块的复古像素感结合。

### Color Palette
- **Background:** `#0a0a0f` (深空黑)
- **Grid Lines:** `#1a1a2e` (暗紫灰)
- **I-Piece:** `#00f5ff` (青色霓虹)
- **O-Piece:** `#ffd700` (金色)
- **T-Piece:** `#bf00ff` (紫色霓虹)
- **S-Piece:** `#00ff41` (绿色霓虹)
- **Z-Piece:** `#ff0040` (红色霓虹)
- **J-Piece:** `#0080ff` (蓝色霓虹)
- **L-Piece:** `#ff8000` (橙色霓虹)
- **Line Clear Flash:** `#ffffff` (纯白闪烁)
- **Glow Effect:** 各颜色 50% opacity 模糊

### Typography
- **Font:** "Orbitron" (Google Fonts) - 科幻感几何字体
- **Fallback:** monospace

### Spatial System
- 游戏区域: 10列 × 20行
- 每个方块单元格: 28px × 28px
- 方块间隙: 2px (通过 CSS border 实现)
- 整体居中显示，带霓虹发光边框

### Motion Philosophy
- **方块下落:** 恒定速度，每 500ms 下落一行
- **软降:** 可选，按下键加速
- **旋转:** 瞬间完成，无动画延迟
- **消行:** 白光闪烁 150ms，然后整行淡出 200ms
- **新方块生成:** 从顶部立即出现
- **循环机制:** 当堆叠到达顶部时，屏幕闪白，所有方块消失，重新开始

### Visual Assets
- 无外部图片依赖
- 纯 CSS 方块着色 + box-shadow 发光效果
- CSS grid 布局

## 3. Layout & Structure

```
┌─────────────────────────────────────────┐
│              TETRIS LOOP               │  ← 标题
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │                                 │    │
│  │                                 │    │
│  │         GAME BOARD              │    │
│  │         10 × 20                │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                         │
│           SCORE: 00000                  │  ← 分数显示
│                                         │
│        [CONTROLS HINT]                  │
└─────────────────────────────────────────┘
```

- 全屏深色背景，棋盘居中
- 棋盘带有霓虹发光边框 (box-shadow)
- 响应式: 在小屏幕上缩小方块尺寸

## 4. Features & Interactions

### Core Features
1. **七种标准方块 (SRS系统)**
   - I, O, T, S, Z, J, L
   - 每种有独特颜色和发光效果

2. **方块移动**
   - ← → 箭头: 左右移动
   - ↑ 箭头: 旋转
   - ↓ 箭头: 软降 (加速下落)
   - 空格: 硬降 (直接落到底部)

3. **消行机制**
   - 检测完整行
   - 消行时白色闪烁
   - 得分增加 (100 × 消行数， combo 加倍)

4. **无限循环**
   - 当方块堆叠无法继续时
   - 全屏白闪 (200ms)
   - 所有方块消失
   - 分数清零
   - 动画继续，永不停止

5. **幽灵方块 (Ghost Piece)**
   - 半透明显示落点位置
   - 颜色与当前方块相同但 30% opacity

### Edge Cases
- 旋转时检测碰撞，Wall Kick 偏移
- 触底后短暂延迟再固定，让玩家有时间调整

## 5. Component Inventory

### Game Board
- 10×20 网格，深色背景
- 霓虹发光边框
- 状态: 运行中 / 闪烁重置

### Active Tetromino
- 4个方块组成的当前下落形状
- 颜色 + 发光效果
- 状态: 下落中 / 触底 / 已固定

### Ghost Piece
- 当前方块的投影
- 30% opacity
- 位置显示落点

### Locked Blocks
- 已固定的方块
- 保持原色和发光效果

### Cleared Row
- 白光闪烁状态
- 然后淡出消失

### Score Display
- Orbitron 字体
- 数字滚动动画
- 跟随消行更新

## 6. Technical Approach

### Framework
纯 HTML + CSS + Vanilla JavaScript
单文件实现，无需构建工具

### Architecture
```javascript
// 主要模块
- Tetromino: 方块定义 (形状、颜色、旋转状态)
- Board: 游戏板状态管理 (10×20 数组)
- Game: 主游戏循环 (requestAnimationFrame)
- Renderer: DOM 渲染更新
- Input: 键盘事件处理
```

### Key Implementation Details
- 使用 CSS Grid 显示游戏板
- 每个单元格是一个 div，根据状态添加类名
- 方块颜色通过 CSS class 切换
- 游戏循环使用 requestAnimationFrame + 时间戳控制速度
- 键盘事件使用 keydown，支持按住连续移动

### Animation
- CSS transitions 用于消行闪烁效果
- CSS keyframes 用于发光脉冲
- JS 控制游戏逻辑时序
