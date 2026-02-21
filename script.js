console.log('Pastel Finance Script Loaded');

// ==================== APP STATE ====================
let transactions = [];
let currentType = 'expense';
let currentChartType = 'doughnut';

try {
    const saved = localStorage.getItem('transactions');
    transactions = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(transactions)) transactions = [];
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
} catch (e) {
    console.error('Error loading transactions:', e);
    transactions = [];
}

// ==================== HELPERS ====================
function formatAmount(amount) {
    return amount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// custom alert/confirm dialog (non-blocking)
function showDialog({ message, showCancel = false, okText = 'ตกลง', cancelText = 'ยกเลิก' }) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('dialog-overlay');
        const msgEl = document.getElementById('dialog-message');
        const okBtn = document.getElementById('dialog-ok');
        const cancelBtn = document.getElementById('dialog-cancel');

        msgEl.textContent = message;
        okBtn.textContent = okText;
        cancelBtn.textContent = cancelText;
        cancelBtn.style.display = showCancel ? '' : 'none';

        function cleanup() {
            overlay.classList.remove('active');
            okBtn.removeEventListener('click', okHandler);
            cancelBtn.removeEventListener('click', cancelHandler);
        }
        function okHandler() {
            cleanup();
            resolve(true);
        }
        function cancelHandler() {
            cleanup();
            resolve(false);
        }

        okBtn.addEventListener('click', okHandler);
        cancelBtn.addEventListener('click', cancelHandler);
        overlay.classList.add('active');
    });
}

function showAlert(msg) {
    return showDialog({ message: msg, showCancel: false });
}

function showConfirm(msg) {
    return showDialog({ message: msg, showCancel: true });
}

// close dialog when tapping overlay itself
const dialogOverlay = document.getElementById('dialog-overlay');
if (dialogOverlay) {
    dialogOverlay.addEventListener('click', (e) => {
        if (e.target === dialogOverlay) {
            const cancelBtn = document.getElementById('dialog-cancel');
            const okBtn = document.getElementById('dialog-ok');
            if (cancelBtn && cancelBtn.style.display !== 'none') {
                cancelBtn.click();
            } else if (okBtn) {
                okBtn.click();
            }
        }
    });
}

function getThaiDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getThaiMonth(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { month: 'short', year: 'numeric' });
}

// ==================== CATEGORIES ====================
const categories = {
    expense: [
        { id: 'food', name: '🍽️ อาหาร', icon: 'fa-utensils', color: '#FFD6EC' },
        { id: 'transport', name: '🚗 เดินทาง', icon: 'fa-car', color: '#D0E8FF' },
        { id: 'shopping', name: '🛍️ ช้อปปิ้ง', icon: 'fa-bag-shopping', color: '#FFF2CC' },
        { id: 'home', name: '🏠 บ้าน', icon: 'fa-house', color: '#EADCF8' },
        { id: 'health', name: '💚 สุขภาพ', icon: 'fa-heart-pulse', color: '#B9F3E4' },
        { id: 'entertainment', name: '🎮 บันเทิง', icon: 'fa-film', color: '#FFE0B5' },
        { id: 'other', name: '📌 อื่นๆ', icon: 'fa-ellipsis', color: '#F8FAFC' }
    ],
    income: [
        { id: 'salary', name: '💼 เงินเดือน', icon: 'fa-money-bill-wave', color: '#B9F3E4' },
        { id: 'bonus', name: '🎁 โบนัส', icon: 'fa-gift', color: '#FFD6EC' },
        { id: 'investment', name: '📈 ลงทุน', icon: 'fa-chart-line', color: '#D0E8FF' },
        { id: 'freelance', name: '💻 งานเสริม', icon: 'fa-laptop', color: '#EADCF8' },
        { id: 'other-income', name: '💰 อื่นๆ', icon: 'fa-coins', color: '#FFF2CC' }
    ]
};

// ==================== DOM ELEMENTS ====================
const balanceEl = document.getElementById('total-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expense');
const transactionListEl = document.getElementById('transaction-list');
const fullTransactionListEl = document.getElementById('full-transaction-list');
const transactionForm = document.getElementById('transaction-form');
const modalOverlay = document.getElementById('modal-overlay');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const categorySelect = document.getElementById('category');
const typeTabs = document.querySelectorAll('.tab-btn');
const navItems = document.querySelectorAll('.nav-item');
const chartTypeButtons = document.querySelectorAll('.chart-type-btn');

// ==================== CHARTS ====================
let expenseChart;
let analyticsChart;

function initChart() {
    const chartEl = document.getElementById('expenseChart');
    if (!chartEl) return;

    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded');
        chartEl.parentElement.innerHTML = '<p style="text-align:center; padding:20px; color:#999;">Loading...</p>';
        return;
    }

    try {
        const ctx = chartEl.getContext('2d');
        expenseChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 16,
                            font: { family: 'Prompt', size: 12, weight: '600' },
                            color: '#2D3436'
                        }
                    }
                }
            }
        });
    } catch (e) {
        console.error('Chart init failed:', e);
    }
}

function initAnalyticsChart() {
    const chartEl = document.getElementById('analyticsChart');
    if (!chartEl) return;

    if (typeof Chart === 'undefined') return;

    try {
        const ctx = chartEl.getContext('2d');
        if (analyticsChart) analyticsChart.destroy();

        analyticsChart = new Chart(ctx, {
            type: currentChartType,
            data: {
                labels: [],
                datasets: [{
                    label: 'รายจ่าย',
                    data: [],
                    backgroundColor: [],
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 8,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: currentChartType !== 'line',
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 16,
                            font: { family: 'Prompt', size: 12, weight: '600' }
                        }
                    }
                },
                scales: currentChartType === 'bar' || currentChartType === 'line' ? {
                    y: { beginAtZero: true }
                } : {}
            }
        });
    } catch (e) {
        console.error('Analytics chart init failed:', e);
    }
}

// ==================== PAGE NAVIGATION ====================
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }

    navItems.forEach(item => item.classList.remove('active'));
    const activeNav = document.querySelector(`[data-page="${pageId}"]`);
    if (activeNav) activeNav.classList.add('active');

    if (pageId === 'page-reports') {
        initAnalyticsChart();
        updateAnalytics();
    }
}

navItems.forEach(item => {
    const handler = (e) => {
        e.preventDefault();
        const pageId = item.getAttribute('data-page');
        switchPage(pageId);
    };
    item.addEventListener('click', handler);
    item.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        handler(e);
    });
});

// ==================== CATEGORY MANAGEMENT ====================
function updateCategoryOptions() {
    categorySelect.innerHTML = categories[currentType].map(cat =>
        `<option value="${cat.id}">${cat.name}</option>`
    ).join('');
}

typeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        typeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentType = tab.dataset.type;
        updateCategoryOptions();
    });
});

// ==================== MODAL CONTROLS ====================
window.showModal = function () {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = categories[currentType][0].id;
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('amount').focus();
};

window.hideModal = function () {
    document.getElementById('modal-overlay').classList.remove('active');
    transactionForm.reset();
};

if (openModalBtn) {
    // support both click and touch/pointer for reliability on mobile/installed PWAs
    openModalBtn.addEventListener('click', window.showModal);
    openModalBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.showModal();
    });
} else {
    console.warn('Open modal button not found');
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', window.hideModal);
    closeModalBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.hideModal();
    });
} else {
    console.warn('Close modal button not found');
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) window.hideModal();
});

// ==================== TRANSACTIONS ====================
function updateUI() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    balanceEl.textContent = `฿${formatAmount(balance)}`;
    incomeEl.textContent = `฿${formatAmount(income)}`;
    expenseEl.textContent = `฿${formatAmount(expense)}`;

    renderTransactions();
    renderFullTransactions();
    updateChartData();
    updateDashboardStats();
}

function renderTransactions() {
    const recentTransactions = transactions.slice(0, 5);
    
    if (recentTransactions.length === 0) {
        transactionListEl.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>ยังไม่มีรายการจดบันทึก</p>
                <small>กดปุ่ม + เพื่อเพิ่มรายการใหม่</small>
            </div>`;
        return;
    }

    transactionListEl.innerHTML = recentTransactions.map((t, index) => {
        const cat = [...categories.expense, ...categories.income].find(c => c.id === t.category);
        const isIncome = t.type === 'income';
        return `
            <div class="transaction-item" onclick="deleteTransaction(${transactions.indexOf(t)})">
                <div class="category-icon" style="background-color: ${cat?.color || '#eee'}">
                    <i class="fas ${cat?.icon || 'fa-question'}"></i>
                </div>
                <div class="item-info">
                    <h4>${t.description}</h4>
                    <p>${getThaiDate(t.date)}</p>
                </div>
                <div class="item-amount amount-${t.type}">
                    ${isIncome ? '+' : '-'}฿${formatAmount(t.amount)}
                </div>
                <div class="delete-indicator">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        `;
    }).join('');
}

function renderFullTransactions() {
    if (transactions.length === 0) {
        fullTransactionListEl.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>ยังไม่มีรายการจดบันทึก</p>
            </div>`;
        return;
    }

    fullTransactionListEl.innerHTML = transactions.map((t) => {
        const cat = [...categories.expense, ...categories.income].find(c => c.id === t.category);
        const isIncome = t.type === 'income';
        const index = transactions.indexOf(t);
        return `
            <div class="transaction-item" onclick="deleteTransaction(${index})">
                <div class="category-icon" style="background-color: ${cat?.color || '#eee'}">
                    <i class="fas ${cat?.icon || 'fa-question'}"></i>
                </div>
                <div class="item-info">
                    <h4>${t.description}</h4>
                    <p>${getThaiDate(t.date)}</p>
                </div>
                <div class="item-amount amount-${t.type}">
                    ${isIncome ? '+' : '-'}฿${formatAmount(t.amount)}
                </div>
                <div class="delete-indicator">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        `;
    }).join('');
}

async function deleteTransaction(index) {
    if (await showConfirm('ต้องการลบรายการนี้ใช่หรือไม่?')) {
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        updateUI();
    }
}

if (transactionForm) {
    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const amount = parseFloat(document.getElementById('amount').value);
        const description = document.getElementById('description').value.trim();
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        if (!amount || amount <= 0) {
            await showAlert('กรุณาใส่จำนวนเงินที่ถูกต้อง');
            return;
        }
        if (!description) {
            await showAlert('กรุณาใส่คำอธิบาย');
            return;
        }
        if (!date) {
            await showAlert('กรุณาเลือกวันที่');
            return;
        }

        const newTransaction = {
            amount: amount,
            description: description,
            category: category,
            date: date,
            type: currentType,
            id: Date.now()
        };

        transactions.unshift(newTransaction);
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        localStorage.setItem('transactions', JSON.stringify(transactions));

        updateUI();
        window.hideModal();
        console.log('✅ บันทึกรายการสำเร็จ');
    });
} else {
    console.error('Transaction form element not found');
}

// ==================== CHART DATA ====================
function updateChartData() {
    if (!expenseChart) return;

    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};

    expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    const labels = Object.keys(categoryTotals).map(id => {
        const cat = categories.expense.find(c => c.id === id);
        return cat ? cat.name : id;
    });

    const colors = Object.keys(categoryTotals).map(id => {
        const cat = categories.expense.find(c => c.id === id);
        return cat?.color || '#F8FAFC';
    });

    expenseChart.data.labels = labels;
    expenseChart.data.datasets[0].data = Object.values(categoryTotals);
    expenseChart.data.datasets[0].backgroundColor = colors;
    expenseChart.update();
}

// ==================== ANALYTICS ====================
function getExpensesByMonth() {
    const monthData = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        const month = getThaiMonth(t.date);
        monthData[month] = (monthData[month] || 0) + t.amount;
    });
    return monthData;
}

function getCategoryBreakdown() {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};

    expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    return Object.entries(categoryTotals)
        .map(([id, amount]) => {
            const cat = categories.expense.find(c => c.id === id);
            return { id, name: cat?.name || id, amount, color: cat?.color || '#F8FAFC', icon: cat?.icon || 'fa-question' };
        })
        .sort((a, b) => b.amount - a.amount);
}

function updateDashboardStats() {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    document.getElementById('stat-total-income').textContent = `฿${formatAmount(income)}`;
    document.getElementById('stat-total-expense').textContent = `฿${formatAmount(expense)}`;
    document.getElementById('stat-balance').textContent = `฿${formatAmount(balance)}`;
    document.getElementById('stat-count').textContent = transactions.length;

    updateCategoryBreakdown();
}

function updateCategoryBreakdown() {
    const breakdown = getCategoryBreakdown();
    const container = document.getElementById('category-breakdown');

    if (breakdown.length === 0) {
        container.innerHTML = '<p style="text-align:center; color: #999; padding: 20px;">ยังไม่มีข้อมูล</p>';
        return;
    }

    container.innerHTML = breakdown.map(cat => `
        <div class="category-item">
            <div class="category-item-left">
                <div class="category-item-icon" style="background-color: ${cat.color}">
                    <i class="fas ${cat.icon}"></i>
                </div>
                <div class="category-item-name">${cat.name}</div>
            </div>
            <div class="category-item-amount">฿${formatAmount(cat.amount)}</div>
        </div>
    `).join('');
}

function updateAnalytics() {
    if (!analyticsChart) return;

    const monthData = getExpensesByMonth();
    const labels = Object.keys(monthData);
    const data = Object.values(monthData);

    const colors = ['#FFD6EC', '#D0E8FF', '#FFF2CC', '#EADCF8', '#B9F3E4', '#FFE0B5'];

    analyticsChart.data.labels = labels;
    analyticsChart.data.datasets[0].data = data;
    analyticsChart.data.datasets[0].backgroundColor = colors.slice(0, labels.length);

    if (currentChartType === 'line') {
        analyticsChart.data.datasets[0].fill = false;
        analyticsChart.data.datasets[0].borderColor = '#A29BDA';
        analyticsChart.data.datasets[0].borderWidth = 3;
        analyticsChart.data.datasets[0].tension = 0.4;
        analyticsChart.data.datasets[0].backgroundColor = 'transparent';
        analyticsChart.data.datasets[0].pointBackgroundColor = '#A29BDA';
        analyticsChart.data.datasets[0].pointRadius = 5;
    }

    analyticsChart.update();
}

// ==================== CHART TYPE SELECTOR ====================
chartTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        chartTypeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentChartType = btn.getAttribute('data-chart');
        initAnalyticsChart();
        updateAnalytics();
    });
});

// ==================== SETTINGS ====================
document.getElementById('clear-data-btn')?.addEventListener('click', async () => {
        if (await showConfirm('คุณแน่ใจหรือไม่? ข้อมูลจะถูกลบและไม่สามารถกู้คืนได้')) {
            transactions = [];
            localStorage.removeItem('transactions');
            updateUI();
            await showAlert('ข้อมูลทั้งหมดถูกลบแล้ว');
    }
});

document.getElementById('export-data-btn')?.addEventListener('click', async () => {
        const dataStr = JSON.stringify(transactions, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pastel-finance-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        await showAlert('ดาวน์โหลดสำเร็จ');
});

document.getElementById('import-data-btn')?.addEventListener('click', () => {
    document.getElementById('import-file').click();
});

document.getElementById('import-file')?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                if (!Array.isArray(imported)) throw new Error('Invalid format');
                
                if (await showConfirm('นำเข้าข้อมูลนี้? (ข้อมูลเดิมจะถูกแทนที่)')) {
                    transactions = imported;
                    localStorage.setItem('transactions', JSON.stringify(transactions));
                    updateUI();
                    await showAlert('นำเข้าสำเร็จ');
                }
            } catch (err) {
                await showAlert('ไฟล์ไม่ถูกต้อง: ' + err.message);
        }
    };
    reader.readAsText(file);
    e.target.value = '';
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    updateCategoryOptions();
    updateUI();
    console.log('✅ App initialized');

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js', { scope: './' })
                .then(reg => {
                    console.log('✅ Service Worker registered:', reg);
                    // Check for updates periodically
                    setInterval(() => reg.update(), 60000);
                })
                .catch(err => console.error('❌ Service Worker registration failed:', err));
        });
    }

    // Detect install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        console.log('📱 Install prompt event detected');
        
        const installPrompt = e;
        const installButton = document.createElement('div');
        installButton.id = 'install-prompt';
        installButton.style.cssText = `
            position: fixed;
            bottom: 90px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #A29BDA 0%, #957DAD 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(162, 155, 218, 0.4);
            z-index: 999;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            white-space: nowrap;
            animation: slideUp 0.3s ease-out;
            font-family: 'Prompt', sans-serif;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        installButton.innerHTML = '📲 ติดตั้งแอป';
        
        installButton.addEventListener('click', () => {
            installPrompt.prompt();
            installPrompt.userChoice.then(async result => {
                console.log('User response:', result.outcome);
                if (result.outcome === 'accepted') {
                    await showAlert('🎉 กำลังติดตั้ง Pastel Finance...');
                }
                installButton.remove();
            });
        });

        document.body.appendChild(installButton);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (installButton.parentNode) {
                installButton.remove();
            }
        }, 10000);
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
        console.log('✅ App successfully installed!');
    });

    // Detect when app is launched from home screen
    window.addEventListener('load', () => {
        if (window.navigator.standalone === true) {
            console.log('📱 App is running in standalone mode (installed)');
            document.body.classList.add('standalone');
        }
    });

    // Handle visibility change to sync data
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            console.log('📱 App came to foreground - refreshing data');
            updateUI();
        }
    });
