const url = "http://127.0.0.1:8000";

// 读取表的数据`
export async function getTlbData(round) {
    try {
        // console.log(url + '/get_table_data/?round=' + round)
        // const response = await fetch(url + '/get_table_data/?round=' + round);
        const response = await fetch('./data/tlb.json');
        console.log(round);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getSimData(id) {
    try {
        const response = await fetch(url + '/get_sim_data/?ID1=' + id);
        // const response = await fetch('./data/sim.json');
        const data = await response.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// 读取力导向图的数据
export async function getFGData(id1, id2) {
    try {
        const response = await fetch(url + '/get_force_graph_data/?ID1=' + id1 + '&ID2=' + id2);
        const data = await response.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// // 读取力导向图的数据
// export async function getFGData(file) {
//     try {
//         const response = await fetch('./FG/' + file);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }
