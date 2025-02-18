// 获取DOM元素引用
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const mainImage = document.getElementById('mainImage');
const question = document.getElementById('question');
const clickSound = document.getElementById('clickSound');
const ending = document.getElementById('ending'); // 获取结束画面元素
// 页面加载时自动播放背景音频
document.addEventListener('DOMContentLoaded', () => {
    const backgroundAudio = document.getElementById('backgroundAudio');
    backgroundAudio.volume = 0.5; // 设置音量（0.0 到 1.0）
    backgroundAudio.play();
});
// 图片数组，存放所有动态图片的路径
const images = [
    'images/1.gif',
    'images/2.gif',
    'images/3.gif',
    'images/4.gif',
    'images/5.gif',
    'images/6.gif',
    'images/7.gif',
    'images/8.gif',
    'images/9.gif',
    'images/10.gif',
    'images/10.gif',
    'images/10.gif',
    'images/10.gif',
    'images/10.gif',
    'images/10.gif',
    // 继续添加更多图片路径
];

let imageIndex = 0;  // 当前显示的图片索引
let noClickCount = 0;

const noTexts = [
    "不要",
    "？你认真的吗？",
    "要不再想想？",
    "不许选这个！",
    "我会很伤心的...",
    "别嘛~",
    "我不要！！！",
    "不可以的：(",
    "不行！",
    "不行！！",
    "不行！！！",
    "不行！啊啊啊"
];

// Yes button click handler
yesButton.addEventListener('click', () => {
    clickSound.play();

    // 隐藏原有元素
    const container = document.querySelector('.container');
    container.style.display = 'none';

    // 显示结束画面
    ending.style.display = 'block';
});

// No button click handler
noButton.addEventListener('click', () => {
    clickSound.play();

    // 更新“不要”按钮文本
    const currentText = noTexts[noClickCount % noTexts.length];
    noButton.textContent = currentText;

    // 增大“愿意”按钮
    const scaleFactor = 1.4; // 每次放大40%
    yesButton.style.transform = `scale(${scaleFactor ** noClickCount})`;

    // 更新图片
    imageIndex = (imageIndex + 1) % images.length;
    mainImage.src = images[imageIndex];

    // 检查计数是否达到12次
    if (noClickCount >= 10) { // 第12次点击是索引11
        question.textContent = "你真的愿意吗？我迫不及待了！";
        noButton.style.display = 'none'; // 隐藏“不要”按钮
        return;
    }

    // 移动“愿意”按钮以避免遮挡文字和图片
    const yesButtonRect = yesButton.getBoundingClientRect();
    const containerRect = document.querySelector('.content').getBoundingClientRect();
    const offsetTop = (containerRect.bottom - yesButtonRect.height) / 2;
    yesButton.style.position = 'absolute';
    yesButton.style.top = `${offsetTop}px`;

    noClickCount++;
});

// 阻止右键菜单
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// 移动设备适配：触控事件
document.addEventListener('touchstart', (e) => {
    // 检测触摸目标，避免误触
    if (e.target === noButton) {
        noButton.focus();
    }
});