import axios from "axios";
import { API_PREFIX_DOCKER } from "../../utils/globalVariable";

const API_SERVER_HOST = `http://${API_PREFIX_DOCKER}/api/v1`;

// 로그인 요청 (로그인슬라이스에서 사용)
export const postLogin = async (form) => {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams();
    body.append('username', form.id);
    body.append('password', form.password);

    return (await axios.post(`${API_SERVER_HOST}/login`, body, { headers })).data;
};

// 카카오 로그인
export const postKakaoLogin = async (code) => {

    console.log("code : ", code);

    try {
        const response = await axios.get(`http://${API_PREFIX_DOCKER}/api/v1/login/kakao?code=${code}`);
        return response.data;  // 서버에서 반환한 데이터를 리턴
    } catch (error) {
        console.error("로그인 요청 실패:", error);
        throw error;  // 오류 발생 시, 호출한 곳에서 처리하도록 예외를 던짐
    }

};
// 회원가입
export const postSignUp = async(form)=>{
    const headers = {'Content-Type': 'application/JSON'};
    
    return (await axios.post(`${API_SERVER_HOST}/signup`, form, {headers})).data;
}

// 토큰 갱신 (리덕스에서 응답 받을때 자동으로 호출)
export const getRefresh = async(accessToken, refreshToken)=>{
    const header = {headers:{'Authorization': `Bearer ${accessToken}`}};
    const res = await axios.get(`${API_SERVER_HOST}/refresh?refreshToken=${refreshToken}`, header);
    return res.data;
}

// 중복검사
export const checkOverlap = async(field,value)=>{
    const headers = {'Content-Type': 'application/json'};
    console.log(`${API_SERVER_HOST}/signup/check?field=${field}&value=${value}`)
    return (await axios.get(`${API_SERVER_HOST}/signup/check?field=${field}&value=${value}`)).data;
}
