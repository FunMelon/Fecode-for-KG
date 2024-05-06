const url = "http://127.0.0.1:8000";

// 读取表的数据`
export async function getTlbData(round) {
    try {
        const response = await fetch(url + '/get_table_data/?round=' + round);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getSimData(id) {
    try {
        const response = await fetch(url + '/get_sim_data/?ID1=' + id);
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