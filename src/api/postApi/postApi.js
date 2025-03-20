import jwtAxios from "../../utils/jwtUtils";


const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/v1`;


// 게시글 목록 조회
export const getPostBoard = async (limit) => { // { page: 1, size: 10, keyfield: 'title', keyword: '제목' }

    

    console.log('limit : ', limit);

    const res = await jwtAxios.get(`${prefix}/posts`, { params: {limit} });  //posts?limit=5

    return res.data;
}

