import { useEffect, useRef, useState } from "react"
import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';
import { getOriginNotifications, updateReadNotifications } from "../../api/memberApi/notify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_PREFIX_DOCKER } from "../../utils/globalVariable";

const NotificationItem = ({ name,sender, content, date, postId }) => {

    // 알람 종류 텍스트 변환
    const convertMessage = () => {
        return content === "NOTICE" ? content = "공지" : content === "TASK" ? content = "과제" : content
    }
    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", margin: "5px 0" }}>
            <p>{sender + "님이＂" + convertMessage() + "＂를 작성하였습니다."}</p>
            <p>{date}</p>
            <Link to={`/view/${postId}`}>
                <button className="text-blue-500">자세히 보기</button>
            </Link>
        </div>
    );
};

const AlertPop = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const popupRef = useRef(null);
    const member = useSelector(state => state.loginSlicer.initState)

    let stompClient = null;

    // 실시간 알람 수신 
    useEffect(() => {
        if (!userEmail) return;
        const socket = new SockJS(`http://${API_PREFIX_DOCKER}/ws`);
        stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str), // 연결 상태 디버그 정보 출력
            reconnectDelay: 5000, // 자동 재연결 5초
        })
        stompClient.activate(); // WebSocket 클라이언트 활성화
        stompClient.onConnect = () => {
            console.log("Success Connet")
            // 최근 14일 이내 알람 조회 요청
            getOriginNotifications(userEmail).then(data => {
                console.log(data)
                setNotifications([...data].sort((a, b) => b.id - a.id));
            }).catch(e => {
                console.log("Error Get Notifications! : " + e)
            })
            // 웹소캣 구독 (실시간 알람)
            stompClient.subscribe(`/api/v1/alert/${userEmail}`, (msg) => {
                console.log("msg : " + msg);
                try {
                    const newNotification = JSON.parse(msg.body);
                    setNotifications((prev) => [...prev, newNotification].sort((a, b) => b.id - a.id));
                }
                catch (e) {
                    console.error("메시지 오류 : ", e);
                }
            })
        }
        stompClient.onWebSocketClose = () => {
            console.log("WebSocket 연결이 종료되었습니다.");
        };

        stompClient.onStompError = (frame) => {
            console.error("STOMP 오류:", frame);
        };
    }, [userEmail])

    // 팝업 밖 클릭시 팝업 꺼지게
    useEffect(() => {
        if (!member) return;
        setUserEmail(member.email);
        const handleClickOutsie = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target))
                setIsOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutsie);
        return () => document.removeEventListener("mousedown", handleClickOutsie);
    }, []);

    // 팝업 띄울때 알람 전부 읽음 처리
    const handleOnClickPopUp = (e) => {
        setIsOpen(true)
        if (notifications.filter(notify => !notify.isRead).length > 0)
            updateReadNotifications(userEmail).then(data => {
                notifications.filter(notify => notify.isRead = true)
            }).catch(e => {
                console.error("update Notification Failed : " + e)
            })

    }
    return (
        <div className="relative">
            <button
                className={`relative p-2 text-2xl rounded-full transition-transform ${isOpen
                    ? "bg-blue-500 text-white scale-95"
                    : "bg-transparent hover:bg-blue-300"
                    }`}
                type="button"
                onClick={handleOnClickPopUp}>
                <img src="/alert_red.png" className="w-8 h-8" />
                {notifications.filter(notify => !notify.isRead).length > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                        {notifications.filter(notify => !notify.isRead).length}
                    </span>
                )}
            </button>

            {/* 알림 팝업 */}
            {isOpen && (
                <div ref={popupRef} className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-4"
                    style={{
                        maxHeight: "500px", // 팝업 최대 높이
                        overflowY: "auto", // 수직 스크롤 활성화
                    }}>
                    <h3 className="text-lg font-bold mb-2 text-green-800">알림</h3>
                    <ul>
                        <div>
                            <div>
                                <p className="text-md font-bold mb-2 text-green-500">새로운 알림</p>
                            </div>
                            {
                                notifications.filter(notify => !notify.isRead).length > 0 ?
                                    notifications.filter(notify => !notify.isRead).map((noti) => {
                                        if (!noti.isRead)
                                            return (
                                                (<NotificationItem
                                                    key={noti.id}
                                                    sender={noti.sender}
                                                    name={noti.memberName}
                                                    content={noti.content}
                                                    date={noti.regDate}
                                                    postId={noti.postId} />)
                                            )
                                    })
                                    : <p className="text-gray-500 ">새로운 알림이 없습니다.</p>
                            }
                            <div>
                                <p className="text-md font-bold mb-2 text-green-500">이전 알림</p>
                                {
                                    notifications.filter(notify => notify.isRead).length > 0 ?
                                        notifications.filter(notify => notify.isRead).map((noti) => {
                                            return (
                                                (<NotificationItem
                                                    key={noti.id}
                                                    sender={noti.sender}
                                                    name={noti.memberName}
                                                    content={noti.content}
                                                    date={noti.regDate}
                                                    postId={noti.postId} />)
                                            )
                                        })
                                        : <p className="text-gray-500">알림이 없습니다.</p>
                                }
                            </div>
                        </div>
                    </ul>

                </div>
            )}
        </div>
    );
}

export default AlertPop;