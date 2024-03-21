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
export async function getWCData() {
    try {
        const response = await fetch('./WC/WordCloud1.json');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// 读取力导向图的数据
export async function getFGData() {
    try {
        const response = await fetch('./ForceGraph.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}