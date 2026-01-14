// 二次元情侣相册 - 时间轴功能

// 相册数据 - 时间轴格式
const photoAlbum = [
    {
        id: 1,
        title: "初次相遇",
        description: "还记得那天在咖啡馆的偶遇吗？你坐在窗边看书，阳光洒在你的侧脸上，那一刻我就知道我们会有一段特别的故事。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2023-01-15",
        location: "星愿咖啡馆"
    },
    {
        id: 2,
        title: "第一次约会",
        description: "这是我们第一次正式约会，在樱花盛开的公园里。你有点紧张，我也是，但当我们开始聊天时，所有的紧张都消失了。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2023-03-20",
        location: "樱花公园"
    },
    {
        id: 3,
        title: "海边日落",
        description: "在海边看的第一次日落，金色的阳光洒在海面上，我们手牵手走在沙滩上，听着海浪声，那一刻时间仿佛静止了。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2023-05-10",
        location: "金色沙滩"
    },
    {
        id: 4,
        title: "生日惊喜",
        description: "你为我准备的生日惊喜派对，我永远记得你捧着蛋糕走进来时眼里的光芒，还有朋友们突然出现的欢呼声。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2023-07-28",
        location: "我们的家"
    },
    {
        id: 5,
        title: "夏日旅行",
        description: "那次说走就走的夏日旅行，我们在山间小屋里住了三天，没有网络，只有彼此和美丽的自然风景。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2023-08-15",
        location: "云雾山"
    },
    {
        id: 6,
        title: "秋季摄影",
        description: "秋天的时候，我们带着相机去拍红叶。你教我如何构图，我教你如何调光，我们互相成为了对方的老师。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2023-10-05",
        location: "枫叶谷"
    },
    {
        id: 7,
        title: "冬季初雪",
        description: "我们一起看的第一场雪，雪花轻轻飘落，你在雪地上写下我们的名字，说我们要一直在一起，直到白头。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2023-12-18",
        location: "城市广场"
    },
    {
        id: 8,
        title: "跨年之夜",
        description: "新年倒计时的时候，我们在人群中紧紧相拥。当烟花在天空绽放时，你在我耳边轻声说'新年快乐，我爱你'。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2023-12-31",
        location: "市中心广场"
    },
    {
        id: 9,
        title: "情人节",
        description: "你亲手做的巧克力虽然形状有点奇怪，但这是我吃过最甜的巧克力。爱不在于完美，而在于心意。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2024-02-14",
        location: "温馨小家"
    },
    {
        id: 10,
        title: "周年纪念",
        description: "一周年纪念日，你送我的花和手写卡片我都好好保存着。每一天都像第一天一样爱你，甚至更多。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2024-03-20",
        location: "纪念餐厅"
    },
    {
        id: 11,
        title: "春日野餐",
        description: "简单的野餐，却因为有你而变得特别。你做的三明治，我准备的水果，还有我们一起挑选的野餐毯。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2024-04-12",
        location: "湖边草地"
    },
    {
        id: 12,
        title: "现在的我们",
        description: "这张最新的照片记录了我们现在的样子。时间在流逝，但我们的爱却在不断增长。期待未来更多的美好时光。",
        image: Math.random() > 0.5 ? "123.jpg" : "bbb.jpg",
        date: "2024-06-01",
        location: "家中阳台"
    }
];

// DOM元素
const timelineItems = document.getElementById('timelineItems');
const shownCount = document.getElementById('shownCount');
const totalCount = document.getElementById('totalCount');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const backBtn = document.getElementById('backBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const yearFilters = document.querySelectorAll('.year-filter');
const photoModal = document.getElementById('photoModal');
const modalClose = document.getElementById('modalClose');
const modalPhoto = document.getElementById('modalPhoto');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalLocation = document.getElementById('modalLocation');
const modalDescription = document.getElementById('modalDescription');

// 状态变量
let itemsPerLoad = 4;
let currentItems = 0;
let filteredAlbum = [...photoAlbum];
let currentYearFilter = 'all';

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

// 获取年份
function getYearFromDate(dateString) {
    return new Date(dateString).getFullYear().toString();
}

// 生成时间轴项目
function generateTimelineItem(photo, index) {
    const formattedDate = formatDate(photo.date);
    const year = getYearFromDate(photo.date);
    
    return `
        <div class="timeline-item" data-year="${year}" data-index="${index}">
            <div class="timeline-date">
                <div class="date-content">
                    <h3>${formattedDate}</h3>
                    <p>${photo.location}</p>
                </div>
            </div>
            
            <div class="timeline-node">
                <div class="node-circle"></div>
            </div>
            
            <div class="timeline-content">
                <div class="timeline-card">
                    <div class="card-image">
                        <img src="${photo.image}" alt="${photo.title}" loading="lazy">
                    </div>
                    <div class="card-info">
                        <h3><i class="fas fa-heart"></i> ${photo.title}</h3>
                        <div class="card-meta">
                            <span><i class="far fa-calendar"></i> ${formattedDate}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${photo.location}</span>
                        </div>
                        <p>${photo.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 加载更多项目
function loadMoreItems() {
    const itemsToLoad = Math.min(itemsPerLoad, filteredAlbum.length - currentItems);
    
    for (let i = 0; i < itemsToLoad; i++) {
        const photoIndex = currentItems + i;
        const photo = filteredAlbum[photoIndex];
        const itemHTML = generateTimelineItem(photo, photoIndex);
        timelineItems.insertAdjacentHTML('beforeend', itemHTML);
    }
    
    currentItems += itemsToLoad;
    updateCounters();
    
    // 添加滚动动画
    setTimeout(() => {
        const newItems = document.querySelectorAll('.timeline-item');
        newItems.forEach((item, index) => {
            if (index >= currentItems - itemsToLoad) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            }
        });
    }, 50);
    
    // 如果已加载所有项目，隐藏加载更多按钮
    if (currentItems >= filteredAlbum.length) {
        loadMoreBtn.style.display = 'none';
    }
    
    // 添加点击事件到新项目
    addItemClickEvents();
}

// 更新计数器
function updateCounters() {
    shownCount.textContent = currentItems;
    totalCount.textContent = filteredAlbum.length;
}

// 添加项目点击事件
function addItemClickEvents() {
    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const item = this.closest('.timeline-item');
            const index = parseInt(item.dataset.index);
            const photo = filteredAlbum[index];
            
            // 更新模态框内容
            modalPhoto.src = photo.image;
            modalPhoto.alt = photo.title;
            modalTitle.textContent = photo.title;
            modalDate.textContent = formatDate(photo.date);
            modalLocation.textContent = photo.location;
            modalDescription.textContent = photo.description;
            
            // 显示模态框
            photoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

// 按年份筛选
function filterByYear(year) {
    currentYearFilter = year;
    currentItems = 0;
    timelineItems.innerHTML = '';
    
    if (year === 'all') {
        filteredAlbum = [...photoAlbum];
    } else {
        filteredAlbum = photoAlbum.filter(photo => getYearFromDate(photo.date) === year);
    }
    
    // 更新活动筛选按钮
    yearFilters.forEach(btn => {
        if (btn.dataset.year === year) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 重置加载更多按钮
    loadMoreBtn.style.display = 'block';
    
    // 加载初始项目
    loadMoreItems();
}

// 初始化时间轴
function initTimeline() {
    // 按日期排序（从最早到最新）
    photoAlbum.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // 设置初始筛选
    filteredAlbum = [...photoAlbum];
    
    // 更新总数
    totalCount.textContent = filteredAlbum.length;
    
    // 加载初始项目
    loadMoreItems();
    
    // 添加事件监听器
    setupEventListeners();
    
    // 初始滚动动画
    setTimeout(() => {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }, 300);
}

// 设置事件监听器
function setupEventListeners() {
    // 加载更多按钮
    loadMoreBtn.addEventListener('click', loadMoreItems);
    
    // 返回按钮
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // 回到顶部按钮
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 年份筛选按钮
    yearFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            filterByYear(btn.dataset.year);
        });
    });
    
    // 模态框关闭按钮
    modalClose.addEventListener('click', () => {
        photoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框背景关闭
    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            photoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && photoModal.classList.contains('active')) {
            photoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // 滚动显示/隐藏回到顶部按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 滚动触发动画
    window.addEventListener('scroll', () => {
        const items = document.querySelectorAll('.timeline-item:not(.visible)');
        const windowHeight = window.innerHeight;
        
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < windowHeight - 100) {
                item.classList.add('visible');
            }
        });
    });
}

// 页面加载完成后初始化时间轴
document.addEventListener('DOMContentLoaded', initTimeline);

// 随机图片分配（每次刷新页面时重新分配）
function randomizeImages() {
    photoAlbum.forEach(photo => {
        photo.image = Math.random() > 0.5 ? "123.jpg" : "bbb.jpg";
    });
}

// 页面加载时随机分配图片
window.addEventListener('load', randomizeImages);
