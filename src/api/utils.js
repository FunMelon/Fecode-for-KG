// 读取表的数据
export async function getTlbData() {
    try {
        const response = await fetch('./Tlb.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// 读取词云的数据
export async function getWCData(file) {
    try {
        const response = await fetch('./WC/' + file);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// 读取力导向图的数据
export async function getFGData(file) {
    try {
        const response = await fetch('./FG/' + file);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// 读取列表的数据（读取边和节点复用，需外部指定路径）
export async function getLiData(file) {
    try {
        const response = await fetch(file);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}