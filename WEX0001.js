/**
 * webex
 */
/* jshint esversion: 6 */		// 이 주석 지우면 이클립스에서 es6문법 에러남ㅡㅡ


/**
 * webex ~~~
 */

const MANUAL_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndWVzdC0xMXkzMTAwOSIsIm5hbWUiOiIxMXkzMTAwOSIsImlzcyI6IlkybHpZMjl6Y0dGeWF6b3ZMM1Z5YmpwVVJVRk5PblZ6TFhkbGMzUXRNbDl5TDA5U1IwRk9TVnBCVkVsUFRpOHlNRGRsWlRVNU9TMDVZVGd3TFRReE1EUXRZbUUwTWkwMFpHWmtNR1V5TVdVMU9HTSIsImV4cCI6IjE2MDMyMjExMzcifQ.fIYXqzX-Vb663CTL-LQp1HASpMkUSJQRXVeHTbIRlc4";
let isUseConsoleLog = true;

let jwt = undefined;
let webex;
let sipUrl;
let currentMediaStreams = [];
let meetingStreamsLocalVideo;
let meetingStreamsRemotelVideo;
let meetingStreamsRemoteAudio;
let meetingStreamsLocalShare;
let meetingStreamsRemoteShare;
let htmlMediaElements = [];
let mediaStatus = {
	"receiveAudio" : true,
	"receiveVideo" : true,
	"receiveShare" : true,
	"sendAudio" : true,
	"sendVideo" : true,
	"sendShare" : false
};

let interval_screenId = undefined;
let interval_screenCurrentTime = 0;

//Separate logic for Safari enables video playback after previously
//setting the srcObject to null regardless if autoplay is set.
window.onload = function() {
	htmlMediaElements = [
    	document.querySelector('#local-video'),
    	document.querySelector('#local-screenshare'),
    	document.querySelector('#remote-video'),
    	document.querySelector('#remote-screenshare'),
    	document.querySelector('#remote-audio')
    ];
	
	addPlayIfPausedEvents(htmlMediaElements);
}

/*
 * Fixes a safari related video playback issue where the autoplay
 * attribute does not play the video stream after the srcObject
 * has been previously set to null.
 *
 * The canplaythrough event is fired when the user agent can play the media,
 * and estimates that enough data has been loaded to play the media. When this
 * event is fired we then manually play the video if paused. This fixes the Safari
 * play issue above, allowing the video to play when new stream is added.
 */
function addPlayIfPausedEvents(mediaElements) {
	mediaElements.forEach(function(elem) {
		elem.addEventListener('canplaythrough', function(event) {
			console.log('playVideoIfPaused#canplaythrough :: Play started', elem);
			if (elem.paused) elem.play();
		});
	});
}

/**
 * ~~~ webex
 */

/**
 * rocket chat ~~~
 */

let socket;
let connectSocketAddr = 'ws://218.55.79.233:3000/websocket';
let sendMsg_reqAddr = "http://218.55.79.233:3000/api/v1/chat.sendMessage";
let username = "11Y31009_CSL";
let password = "503d8bfc1e907f84984308971ddd0239d1b31341e182ce65e15909ec6bb9881f"; // amorepacific

/**
 * ~~~ rocket chat
 */

var page = {
	title : "webex test",
	orientation : '',
	oriCount : 0,
	detailMeeting : {
		accessToken : "MzI0ODRiNTQtYzE1ZC00YzY2LWIyZDUtOGE2OGVmZjA4MzA4OTM2YzA0NGMtMzE2_P0A1_016d0fc1-159f-4dd9-bf04-6edb988e7cef",
//		accessToken : "OGRlMzdiM2MtYjE0Mi00YjMyLWI3ZDUtOGUyZDMwZmQ2MDUwNDRhZmNjNDUtMTc5_P0A1_207ee599-9a80-4104-ba42-4dfd0e21e58c",
		sipUrl : "1760018213@amoreapi.webex.com",
		chatToken : "",
		rocketId : "",
		roomId : "WhTqi5HLA9xcSqQzp",
		roomPassword : "12"
	},
	
	t1 : 0,
	t2 : 0,
	
	init : function(){
		page.initData();
		page.initInterface();
		page.initLayout();
	},
	
	initData : function(data){
		if (!bizMOB.detectAndroid()) {
			mediaStatus = {
				"receiveAudio" : true,
				"receiveVideo" : true,
				"receiveShare" : true,
				"sendAudio" : false,
				"sendVideo" : false,
				"sendShare" : false
			};
		}
		
		const prompt = window.prompt(
			'webex 자동 진행 : 0 \n'
			+ '채팅만 진행 : 1 \n'
			+ 'webex만 직접 입력(공백사이에 두고 복붙) : 0 [accesstoken] [sipaddress] \n'
			+ '채팅까지 직접 입력(공백사이에 두고 복붙) : 1 [accesstoken] [sipaddress] [username] [password] \n'
			+ '받고 채팅방정보까지 직접 입력(공백사이에 두고 복붙) : 2 [accesstoken] [sipaddress] [username] [password] [roomId] [roomPassword] \n'
			+ '아무것도 안함 : 취소 선택'
		);
//		const prompt = "0 MDk2YmY5NjMtYTZmYS00ZWI0LTllODUtODUzN2IyM2Q5Y2ZkNmU2YzliMmItMjFm_P0A1_016d0fc1-159f-4dd9-bf04-6edb988e7cef 1707897869@amoreapi.webex.com";
//		let prompt = "p";
		
		if (prompt === "p") {
			var param = new Object;
			param.mainUrl = "https://js.samples.s4d.io/browser-plugin-meetings/";
			param.queryString = "";
			bsUtil.openInternalBrowser(param);
		}
		else if (prompt === "0") {
			printLog('start', '');
			page.displayLoading();
			setWebex()
				.then(function(accessToken) {
					printLog('setWebex', 'then accessToken : ' + accessToken);
//					page.hideLoading();
				})
				.catch(function(e) {
					printLog('setWebex', '>>> catch : \n' + e.message, true);
					page.hideLoading();
				});
		} else  if (prompt === "1") {
			webSocket();
		} else if (prompt !== null) {
			const getData = prompt.split(" ");
			if (getData.length === 3 && getData[0] === "0") {
				page.detailMeeting.accessToken = getData[1];
				page.detailMeeting.sipUrl = getData[2];
				
				printLog('start', '');
				page.displayLoading();
				setWebex()
					.then(function(accessToken) {
						printLog('setWebex', 'then accessToken : ' + accessToken);
//						page.hideLoading();
					})
					.catch(function(e) {
						printLog('setWebex', '>>> catch : \n' + e.message, true);
						page.hideLoading();
					});
			} else if (getData.length === 5 && getData[0] === "1") {
				page.detailMeeting.accessToken = getData[1];
				page.detailMeeting.sipUrl = getData[2];
				username = getData[3];
				password = getData[4];
				
				printLog('start', '');
				page.displayLoading();
				setWebex()
					.then(function(accessToken) {
						printLog('setWebex', 'then accessToken : ' + accessToken);
//						page.hideLoading();
					})
					.catch(function(e) {
						printLog('setWebex', '>>> catch : \n' + e.message, true);
						page.hideLoading();
					});
			} else if (getData.length === 7 && getData[0] === "2") {
				page.detailMeeting.accessToken = getData[1];
				page.detailMeeting.sipUrl = getData[2];
				username = getData[3];
				password = getData[4];
				page.detailMeeting.roomId = getData[5];
				page.detailMeeting.roomPassword = getData[6];
				
				printLog('start', '');
				page.displayLoading();
				setWebex()
					.then(function(accessToken) {
						printLog('setWebex', 'then accessToken : ' + accessToken);
//						page.hideLoading();
					})
					.catch(function(e) {
						printLog('setWebex', '>>> catch : \n' + e.message, true);
						page.hideLoading();
					});
			}
		}
	},
	
	initInterface : function(){
		$("#init").click(function(){
			webex = window.webex = Webex.init({
				config: {
					logger: {
						level: 'debug'
					},
					meetings: {
						reconnection: {
							enabled: true
						}
					}
					// Any other sdk config we need
				},
				credentials: {
					access_token: document.querySelector('#accessToken').value
				}
			});

			webex.once('ready', () => {
				console.log('Authentication#initWebex() :: Webex Ready');
				document.querySelector('#init').innerText = 'saved';
			});
		});
		
		$("#register").click(function(){
			webex.meetings.register()
				.then(() => {
					console.log('Authentication#register() :: successfully registered');
				})
				.catch((error) => {
					console.warn('Authentication#register() :: error registering', error);
				})
				.finally(() => {
					document.querySelector('#register').innerText = webex.meetings.registered ? 'Registered' : 'Not Registered';
				});
			
			reserveMeetingEvents();
		});
		
		$("#create").click(function(){
			webex.meetings.create(document.querySelector("#sipUrl").value)
				.then((meeting) => {
					document.querySelector('.list__meeting').append(generateMeetingsListItem(meeting));
				});
		});
		
		$(".list__meeting").on("click", ".joinMeeting", function(e){
			joinMeeting(e.currentTarget.value);
		});
		
		$("#getMediaStreams").click(function(){
			getMediaStreams(mediaStatus, {});
		});
		
		$("#addMedia").click(function(){
			addMedia();
		});
		
		$("#leaveMeeting").click(function(){
			leaveMeeting();
		});
		
		$("#setLocalMeetingQuality").click(function(){
			setLocalMeetingQuality();
		});
		
		$("#setRemoteMeetingQuality").click(function(){
			setRemoteMeetingQuality();
		});
		
		$("#setMeetingQuality").click(function(){
			setMeetingQuality();
		});
		
		$("#ts-toggle-audio").click(function(){
			toggleSendAudio();
		});
		
		$("#ts-toggle-video").click(function(){
			toggleSendVideo();
		});
		
		/*$("#full-remote-video").click(function(){
			if (document.fullscreenEnabled) {
				meetingStreamsRemotelVideo.requestFullscreen();
				
				setTimeout(()=>{
					var param = {
							text : "asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>",
							button : 1
					};
					page.displayAlertPopup(param);
					alert('hi');
//					 alert 뜨면 어차피 전체화면 풀리네
					if (window.confirm('y or n')) {
						// safari가 이걸 지원 안하네...
						document.exitFullscreen()
							.then(() => console.log('hihi'));
					}
				}, 5000);
			} else {
				alert('fullscreenEnabled is false');
			}
		});*/
		
		// 채팅을 해야해서 전체화면은 사용 안할듯
		/*$("#remote-video").click(function(){
			if (document.fullscreenEnabled) {
				meetingStreamsRemotelVideo.requestFullscreen();
				
				setTimeout(()=>{
					var param = {
							text : "asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>asdfasdfasdf<br/>",
							button : 1
					};
					page.displayAlertPopup(param);
//					alert('hi');
					// alert 뜨면 어차피 전체화면 풀리네
//					if (window.confirm('y or n')) {
//						// safari가 이걸 지원 안하네...
//						document.exitFullscreen()
//							.then(() => console.log('hihi'));
//					}
				}, 5000);
			} else {
				alert('fullscreenEnabled is false');
			}
		});*/
		
		$("#load-remote-video").click(function(){
			document.querySelector('#remote-video').load();
		});
		
		$("#load-remote-screen").click(function(){
			document.querySelector('#remote-screenshare').load();
		});
		
		$("#inputMessage").keypress(function(event){
			var thisVal = $(this).val().trim();
			
			if (thisVal.length < 1) {
				return;
			}
			
			if(event.which && (event.which == 13)) {
				page.sendMsg(thisVal);
			}
		});
		
		// 전송 버튼
		$("#enter").click(function(){
			var thisVal = $("#inputMessage").val().trim();
			
			if (thisVal.length < 1) {
				return;
			}
			
			page.sendMsg(thisVal);
		});
		
		$(window).resize(function(){
			if (window.matchMedia('(orientation: portrait)').matches) {
				// 세로모드
//				alert('세로');
				/*page.t1 = page.t1 + 1;
				let temp = $("#someone").find(".wrap__message-content").text();
				$("#someone").find(".wrap__message-content").html(temp + " 세로");
				$("#someone").find(".wrap__message-time").text(page.t1);
				
				titleBar = bsResource.makeBackTitleBar(page.title, function(){
					bizMOB.Web.close({
						callback : "leaveMeeting"
					});
				});
		        bsResource.setLayout(titleBar);*/
				
				if (page.oritation !== 'portrait') {
					page.oritation = 'portrait';
					page.t1 = page.t1 + 1;
					let temp = $("#someone").find(".wrap__message-content").text();
					$("#someone").find(".wrap__message-content").html(temp + " 세로");
					$("#someone").find(".wrap__message-time").text(page.t1);
					
					titleBar = bsResource.makeBackTitleBar(page.title, function(){
						bizMOB.Web.close({
							callback : "leaveMeeting"
						});
					});
			        bsResource.setLayout(titleBar);
				}
			} else {
				// 가로모드
//				alert('가로');
				/*page.t2 = page.t2 + 1;
				let temp = $("#self").find(".wrap__message-content").text();
				$("#self").find(".wrap__message-content").html(temp + " 가로");
				$("#self").find(".wrap__message-time").text(page.t2);
				
				bsResource.setLayout(undefined, undefined);*/
				
				if (page.oritation !== 'land') {
					page.oritation = 'land';
					page.t2 = page.t2 + 1;
					let temp = $("#self").find(".wrap__message-content").text();
					$("#self").find(".wrap__message-content").html(temp + " 가로");
					$("#self").find(".wrap__message-time").text(page.t2);
					
					bsResource.setLayout(undefined, undefined);
				}
			}
		});
		
		$("#alertLoading").click(function(){
			page.hideLoading();
		});
	},
	
	initLayout : function(){
		titleBar = bsResource.makeBackTitleBar(page.title, function(){
			bizMOB.Web.close({
				callback : "leaveMeeting"
			});
		});
        bsResource.setLayout(titleBar);
	},
	
	sendMsg : function(msg) {
		const reqAddr = sendMsg_reqAddr;
		const header = {
			"X-Auth-Token" : page.detailMeeting.chatToken, 
			"X-User-Id":page.detailMeeting.rocketId, 
			"Content-Type" : "application/json",
//			"Access-Control-Allow-Origin" : "http://218.55.79.233:3000"
		}
		const type = "post";
		
		page.reqAjax(
			reqAddr, 
			type, 
			{"message": { "rid": page.detailMeeting.roomId, "msg": msg }}, 
			header, 
			function(data) {});
	},
	
	renderedMsg : function(data) {
		let messageNode = undefined;
		
		if (page.detailMeeting.rocketId === data[0].u._id) {
			messageNode = document.querySelector('#self').cloneNode(true);
			messageNode.querySelector('.message-name').innerText = '';
			
			document.querySelector('#inputMessage').value = '';
		} else {
			messageNode = document.querySelector('#someone').cloneNode(true);
			messageNode.querySelector('.message-name').innerText = data[0].u.username + ' / ' + data[0].u.name;
		}
		
		messageNode.setAttribute('id', data[0]._id);
		messageNode.querySelector('.wrap__message-content').innerText = data[0].msg;
		const time = new Date(data[0].ts.$date);
		const hour = time.getHours() < 10 ? '0' + String(time.getHours()) : String(time.getHours());
		const minutes = time.getMinutes() < 10 ? '0' + String(time.getMinutes()) : String(time.getMinutes());
		messageNode.querySelector('.wrap__message-time').innerText = hour + ':' + minutes;
		
		const chatListNode = document.querySelector('.chat__list');
		chatListNode.appendChild(messageNode);
		chatListNode.scrollTop = chatListNode.scrollHeight;
	},
	
	reqAjax : function(url, type, data, header, callback) {
		$.ajax({
		    url: url,
		    type: type,
		    data: JSON.stringify(data),
		    headers: header,
		    dataType: "json",
		    contentType: "application/json",
		    success: function (data) {
		        console.info(JSON.stringify(data));
		        callback(data);
		    },
		    error: function (data) {
		        console.info(JSON.stringify(data));
		        callback({success : false});
		    }
		});
	},
	
	/**
	 * <p> Title : Display Alert Popup <p>
	 * <p> Desc : 알림팝업창 노출 </p>
	 * @param {Object} 		param		text	알림창 텍스트
	 * 									button	버튼 개수(1/2)
	 * @param {function}	callback			콜백함수
	 * @return 
	 */
	displayAlertPopup : function(param, callback) {
		// 팝업창 세팅
		var newCallback = undefined;
		if(callback == undefined || callback == "") {
			newCallback = function() {
				$("#dimmed, #alertPopupWrap").addClass('hide');
			}
		} else {
			newCallback = function() {
				callback();
				$("#dimmed, #alertPopupWrap").addClass('hide');
			}
		}
		
		$("#popText").html(param.text);
		$("#popBtnType").attr('class', 'popup_btn type0'+param.button);
		(param.button=="1") ? $("#btnCancel").addClass('hide') : $("#btnCancel").removeClass('hide');
		$("#btnOk").unbind('click').bind('click', newCallback);
		$("#btnCancel").unbind('click').bind('click', function() {
			$("#dimmed, #alertPopupWrap").addClass('hide');
		});
		
		// 알림팝업창 노출
		$("#dimmed, #alertPopupWrap").removeClass('hide');
	},
	
	displayLoading : function() {
		$("#dimmed, #alertLoading").removeClass('hide');
	},
	
	hideLoading : function() {
		$("#dimmed, #alertLoading").addClass('hide');
	}
}

/**
 * webex ~~~
 */

function printLog(functionName, content, doAlert) {
	if (!isUseConsoleLog) {
		return;
	}
	
	let log = '\n\n[WEX]\n▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼\n\n';
	log += 'function : ' + functionName + '\n';
	log += 'content ▶▶▶ \n';
	log += content;
	log += '\n\n▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲\n\n';
	
	console.log(log);
	
	if (doAlert) {
		alert(content);
	}
}

async function setWebex() {
	printLog('setWebex', '');
	
	/**
	 * jwt, accesstoken 직접 받을 때 사용
	 * jwt는 응답이 토큰은 내려오는데 실패로 떠있어서 사용한다면 해결 필요
	 * 
	 * 서버에서 토큰까지 주기로해서 사용 안함
	 */
//	jwt = await getJwt();
//	const accessToken = await getAccessToken(jwt);
//	await initWebex(accessToken);

	await initWebex(page.detailMeeting.accessToken);
	
	await registerWebex();
	
	return page.detailMeeting.accessToken;
}

async function getJwt() {
	printLog('getJwt', '');
	
	let tempJwt = undefined;
	try {
		tempJwt = await sendRequestBS_getJwt();
		return tempJwt; 
	} catch(e) {
		throw new Error("fail getJwt");
	}
}
async function sendRequestBS_getJwt() {
	printLog('sendRequestBS_getJwt', '');
	
	return new Promise(function(resolve, reject) {
		printLog('sendRequestBS_getJwt', '>>> promise');
		
		jwt = MANUAL_JWT;
		setTimeout(resolve, 3000);
//		setTimeout(reject, 3000);
	});
}

async function getAccessToken(jwt) {
	printLog('getAccessToken', '');
	
	return new Promise(function(resolve, reject){
		const onceWebex = Webex.init();
		
		onceWebex.once(`ready`, function() {
			onceWebex.authorization.requestAccessTokenFromJwt({jwt: jwt})
			.then((res) => {
				printLog('getAccessToken', '>>> then');
			})
	      .catch((e) => {
	    	  printLog('getAccessToken', '>>> catch' + e.message);
//	    	  reject(new Error("fail getAccessToken"));
	    	  //일단 실패해도 성공으로 처주고
	    	  resolve(page.detailMeeting.accessToken);
	      })
		});
	});
}

async function initWebex(accessToken) {
	printLog('initWebex', '');
	
	return new Promise((resolve, reject) => {
		webex = window.webex = Webex.init({
			config: {
				logger: {
					level: 'debug'
				},
				meetings: {
					reconnection: {
						enabled: true
					}
				}
				// Any other sdk config we need
			},
			credentials: {
				access_token: accessToken
			}
		});

		webex.once('ready', () => {
			console.log('Authentication#initWebex() :: Webex Ready');
			document.querySelector('#accessToken').value = accessToken;
			document.querySelector('#init').innerText = 'saved';
		});
		
		resolve();
	});
}

async function registerWebex() {
	printLog('registerWebex', '');
	
	let errorMessage = undefined;
	
	webex.meetings.register()
		.then(() => {
			console.log('Authentication#register() :: successfully registered');
		})
		.catch((error) => {
//			console.warn('Authentication#register() :: error registering', error);
			errorMessage = error.message;
		})
		.finally(() => {
			if (webex.meetings.registered) {
				document.querySelector('#register').innerText = 'Registered';
			} else {
				document.querySelector('#register').innerText = 'Not Registered';
				printLog('registerWebex', 'webex.meetings.register >>> Not Registered \n' + errorMessage);
			}
		});
	
	reserveMeetingEvents();
}

function reserveMeetingEvents() {
	printLog('reserveMeetingEvents', '');
	
	webex.meetings.on('meetings:ready', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'meetings:ready');
	});
	webex.meetings.on('network:disconnected', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'meetings:disconnected');
	});
	webex.meetings.on('meetings:registered', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'meetings:registered');
		
		setMeeting()
			.then(function(res) {
				printLog('setMeeting', 'then');
				
				setMedia()
					.then(function(res) {
						printLog('setMedia', 'then');
						page.hideLoading();
					})
					.catch(function(e) {
						printLog('setMedia', 'catch \n' + e.message, true);
						page.hideLoading();
					});
			})
			.catch(function(e) {
				printLog('setMeeting', 'catch \n' + e.message, true);
			});
	});
	webex.meetings.on('meeting:removed', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'meetings:removed'); //종료(나가기는 감지 안됨)
	});
	webex.meetings.on('meeting:added', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'meetings:added');
		
		const {type} = m;

		if (type === 'INCOMING') {
			const newMeeting = m.meeting;

			newMeeting.acknowledge(type);
		}
	});
	webex.meetings.on('members:host:update', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'meetings:update');
	});
	webex.meetings.on('meeting:stateChange', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'meetings:stateChange');
	});
	webex.meetings.on('media:ready', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'media:ready');
	});
	webex.meetings.on('media:stopped', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'media:stopped');
	});
	webex.meetings.on('meeting:startedSharingLocal', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'meetings:startedSharingLocal');
	});
	webex.meetings.on('meeting:stoppedSharingLocal', (m) => {
		printLog('reserveMeetingEvents >>> trigger', 'meetings:stoppedSharingLocal');
	});
}

async function setMeeting() {
	printLog('setMeeting', 'webex.meetings.registered : ' + webex.meetings.registered);
	
	let meetingId = ''; 
		
	await createMeeting()
		.then((res) => {
			meetingId = res;
		})
		.catch((e) => {
			// 여기 안타고 바로 setMeeting 호출한 부분의 catch로 감. 일단 정의는 해둠
			printLog('setMeeting catch', e.message, true);
			page.hideLoading();
		});
	
	await joinMeeting(meetingId)
	
	// webex.meetings.registered >> false긴한데 미팅 등록은 됨. 이 시점엔 미팅 등록은 됐지만 registered가 바뀌지 않은 시점인건가??
	/*if (webex.meetings.registered) {
		await createMeeting();
	} else {
		throw new Error("error initWebex or registerWebex!!");
	}*/
}

async function createMeeting() {
	printLog('createMeeting', 'sipUrl : ' + page.detailMeeting.sipUrl);

	return new Promise((resolve, reject) => {
		const sipUrl = page.detailMeeting.sipUrl;
		
		webex.meetings.create(sipUrl)
			.then((meeting) => {
				document.querySelector('#sipUrl').value = page.detailMeeting.sipUrl;
				document.querySelector('.list__meeting').append(generateMeetingsListItem(meeting));
				
				resolve(meeting.id);
			})
			.catch(function(e) {
				reject(new Error("fail createMeeting"));
			});
	});
}

function generateMeetingsListItem(meeting) {
	const itemElm = document.createElement('div');
	const joinElm = document.createElement('button');
	const detailsElm = document.createElement('label');
	
	itemElm.id = `meeting-list-item-${meeting.id}`;
	itemElm.key = meeting.id;
	
	joinElm.type = 'button';
	joinElm.value = meeting.id;
	joinElm.classList.add('joinMeeting');
	joinElm.innerHTML = 'join';
	
	detailsElm.innerHTML = meeting.destination || meeting.sipUri || meeting.id;
	
	itemElm.appendChild(joinElm);
	itemElm.appendChild(detailsElm);
	
	return itemElm;
}

async function joinMeeting(meetingId) {
	printLog('joinMeeting', '');
	
	return new Promise((resolve, reject) => {
		const meeting = webex.meetings.getAllMeetings()[meetingId];
		
		if (!meeting) {
			reject(new Error(`meeting ${meetingId} is invalid or no longer exists`));
		}
		const resourceId = webex.devicemanager._pairedDevice ? webex.devicemanager._pairedDevice.identity.id : undefined;
		
		meeting.join({
			pin: '',
			moderator: false,
			moveToResource: false,
			resourceId
		})
		.then(() => {
			printLog('joinMeeting', 'then');
			
			document.querySelector('#meetings-current-details').innerHTML = meeting.destination || meeting.sipUri || meeting.id;
			resolve();
		})
		.catch(function(e) {
			console.log(e.message);
			console.log(e);
			console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
			printLog('joinMeeting', 'catch ' + e.message);
			
			reject(new Error('fail joinMeeting'));
		});
	});
}

async function setMedia() {
	printLog('setMedia', '');
	
	// 컴퓨터에서 웹엑스 프로그램이 캠 쓰고 있을 때 스퀘어 에뮬에서 캠 쓰려고 요청하면 에러남, 
	// 폰에서 웹모드도 안됨 (이건 안막혀 있으니 참고!!)
	if (bizMOB.detectAndroid() && location.origin === 'file://') {
		await getMediaStreams(mediaStatus, {});
	}
	
	await addMedia();
}

function getCurrentMeeting() {
	const meetings = webex.meetings.getAllMeetings();

	return meetings[Object.keys(meetings)[0]];
}

async function getMediaStreams(mediaSettings, audioVideoInputDevices = {}) {
	printLog('getMediaStreams', '');
	
	return new Promise((resolve, reject) => {
		const meeting = getCurrentMeeting();
		
		console.log('MeetingControls#getMediaStreams()');
		
		if (!meeting) {
			console.log('MeetingControls#getMediaStreams() :: no valid meeting object!');
			
			reject(new Error('No valid meeting object.'));
		}
		
		// Get local media streams
		return meeting.getMediaStreams(mediaSettings, audioVideoInputDevices)
			.then(([localStream, localShare]) => {
				console.log('MeetingControls#getMediaStreams() :: Successfully got following streams', localStream, localShare);
				// Keep track of current stream in order to addMedia later.
				const [currLocalStream, currLocalShare] = currentMediaStreams;
				
				/*
				 * In the event of updating only a particular stream, other streams return as
				 * undefined. We default back to previous stream in this case.
				 */
				currentMediaStreams = [localStream || currLocalStream, localShare || currLocalShare];
				
				return currentMediaStreams;
			})
			.then(([localStream]) => {
				if (localStream && mediaSettings.sendVideo) {
					const meetingStreamsLocalVideo = document.querySelector('#local-video');
					meetingStreamsLocalVideo.srcObject = localStream;
					document.querySelector('#remote-video').load();
				}
				
				resolve({localStream});
			})
			.catch((error) => {
				console.log('MeetingControls#getMediaStreams() :: Error getting streams!');
//				console.error();
				
				reject(new Error('fail getMediaStreams catch'));
			});
	});
}

function addMedia() {
	printLog('addMedia', '');
	
	return new Promise((resolve, reject) => {
		const meeting = getCurrentMeeting();
		const [localStream, localShare] = currentMediaStreams;
		meetingStreamsLocalVideo = document.querySelector('#local-video');
		meetingStreamsRemotelVideo = document.querySelector('#remote-video');
		meetingStreamsRemoteAudio = document.querySelector('#remote-audio');
		meetingStreamsLocalShare = document.querySelector('#local-screenshare');
		meetingStreamsRemoteShare = document.querySelector('#remote-screenshare');
		
		console.log('MeetingStreams#addMedia()');
		
		if (!meeting) {
			console.log('MeetingStreams#addMedia() :: no valid meeting object!');
			reject(new Error('No valid meeting object.'));
		}
		
		meeting.addMedia({
				localShare,
				localStream,
				mediaSettings: mediaStatus
			})
			.then(() => {
				console.log('MeetingStreams#addMedia() :: successfully added media!');
				
				alert("successfully added media");
				webSocket();
				page.hideLoading();
				// Wait for media in order to show video/share
				meeting.on('media:ready', (media) => {
					alert(JSON.stringify(media));
					// eslint-disable-next-line default-case
					switch (media.type) {
						case 'remoteVideo':
							meetingStreamsRemotelVideo.srcObject = media.stream;
//							$("#remote-video").get(0).load();
							document.querySelector('#remote-video').load();
							break;
						case 'remoteAudio':
							meetingStreamsRemoteAudio.srcObject = media.stream;
							toggleSendAudio();
							break;
						case 'remoteShare':
							meetingStreamsRemoteShare.srcObject = media.stream;
//							$("#remote-screenshare").get(0).load();
							document.querySelector('remote-screenshare').load();
							
							startInterval();
							break;
						case 'localShare':
							meetingStreamsLocalShare.srcObject = media.stream;
//							$("#local-screenshare").get(0).load();
							document.querySelector('local-screenshare').load();
							break;
					}
				});
			})
			.catch((error) => {
				console.log('MeetingStreams#addMedia() :: Error adding media!');
				reject(new Error('fail addMedia'));
			});
	});
}

function startInterval() {
	interval_screenId = setInterval(function() {
		let screenshare = document.querySelector("#remote-screenshare");
		let currentTime = Number(screenshare.currentTime);
		
		if (currentTime == 0) {
			return;
		}
		
		if (currentTime > interval_screenCurrentTime) {
			// playing
			document.querySelector("#remote-screenshare-text").innerText = `remote screen : sharing(${screenshare.currentTime})`;
			interval_screenCurrentTime = Number(screenshare.currentTime);
		} else {
			// stop
			document.querySelector("#remote-screenshare-text").innerText = `remote screen : stop sharing`;
		}
	}, 1000);
}

function leaveMeeting() {
	printLog('leaveMeeting', '');
	
	return new Promise((resolve, reject) => {
		const checkMeeting = webex && webex.meetings && getCurrentMeeting();
		
		if (!checkMeeting) {
			return;
		}
		
		const meeting = webex.meetings.getAllMeetings()[(getCurrentMeeting()).id];
		
		if (!meeting) {
			reject(new Error(`meeting ${meetingId} is invalid or no longer exists`));
		}
		
		meeting.leave()
			.then(() => {
				document.querySelector('#meetings-current-details').innerHTML = 'Not currently in a meeting';
				// eslint-disable-next-line no-use-before-define
				cleanUpMedia(htmlMediaElements);
				
				resolve();
			})
			.catch((e) => {
				reject(new Error('fail leaveMeeting'));
			});
	})
	.then(function() {
		printLog('leaveMeeting', 'then');
	})
	.catch(function(e) {
		printLog('leaveMeeting', 'catch \n' + e.message, true);
	});
}

function cleanUpMedia(mediaElements) {
	clearInterval(interval_screenId);
	
	mediaElements.forEach((elem) => {
		if (elem.srcObject) {
			elem.srcObject.getTracks().forEach((track) => track.stop());
			// eslint-disable-next-line no-param-reassign
			elem.srcObject = null;
		}
	});
}

function setLocalMeetingQuality() {
	const toggleSourcesQualityStatus = document.querySelector('#ts-sending-quality-status');
	const toggleSourcesMeetingLevel = document.querySelector('#ts-sending-qualities-list');
	
	const meeting = getCurrentMeeting();
	const level = getOptionValue(toggleSourcesMeetingLevel);
	
	meeting.setLocalVideoQuality(level)
		.then(() => {
			toggleSourcesQualityStatus.innerText = `Local meeting quality level set to ${level}!`;
			console.log('MeetingControls#setLocalMeetingQuality() :: Meeting quality level set successfully!');
		})
		.catch((error) => {
			toggleSourcesQualityStatus.innerText = 'MeetingControls#setLocalMeetingQuality() :: Error setting quality level!';
			console.log('MeetingControls#setLocalMeetingQuality() :: Error meeting quality!');
			console.error(error);
		});
}


function setRemoteMeetingQuality() {
	const toggleSourcesQualityStatus = document.querySelector('#ts-sending-quality-status');
	const toggleSourcesMeetingLevel = document.querySelector('#ts-sending-qualities-list');
	
	const meeting = getCurrentMeeting();
	const level = getOptionValue(toggleSourcesMeetingLevel);
	
	meeting.setRemoteQualityLevel(level)
		.then(() => {
			toggleSourcesQualityStatus.innerText = `Remote meeting quality level set to ${level}!`;
			console.log('MeetingControls#setRemoteMeetingQuality :: Meeting quality level set successfully!');
		})
		.catch((error) => {
			toggleSourcesQualityStatus.innerText = 'MeetingControls#setRemoteMeetingQuality :: Error setting quality level!';
			console.log('MeetingControls#setRemoteMeetingQuality :: Error meeting quality!');
			console.error(error);
		});
}


function setMeetingQuality() {
	const toggleSourcesQualityStatus = document.querySelector('#ts-sending-quality-status');
	const toggleSourcesMeetingLevel = document.querySelector('#ts-sending-qualities-list');
	
	const meeting = getCurrentMeeting();
	const level = getOptionValue(toggleSourcesMeetingLevel);
	
	meeting.setMeetingQuality(level)
		.then(() => {
			toggleSourcesQualityStatus.innerText = `Meeting quality level set to ${level}!`;
			console.log('MeetingControls#setMeetingQuality :: Meeting quality level set successfully!');
		})
		.catch((error) => {
			toggleSourcesQualityStatus.innerText = 'MeetingControls#setMeetingQuality() :: Error setting quality level!';
			console.log('MeetingControls#setMeetingQuality :: Error meeting quality!');
			console.error(error);
		});
}

const getOptionValue = (select) => {
	const selected = select.options[select.options.selectedIndex];

	return selected ? selected.value : undefined;
};

function toggleSendAudio() {
	printLog('toggleSendAudio', '');
	
	const toggleSourcesSendAudioStatus = document.querySelector('#ts-toggle-audio-status');
	const meeting = getCurrentMeeting();
	
	const handleError = (error) => {
		toggleSourcesSendAudioStatus.innerText = 'Error! See console for details.';
		console.log('MeetingControls#toggleSendAudio() :: Error toggling audio!');
//		console.error(error);
		
		printLog('toggleSendAudio', 'handleError', true);
		page.hideLoading();
	};
	
	console.log('MeetingControls#toggleSendAudio()');
	if (!meeting) {
		console.log('MeetingControls#toggleSendAudio() :: no valid meeting object!');
		
		return;
	}
	
	if (meeting.isAudioMuted()) {
		meeting.unmuteAudio()
			.then(() => {
				printLog('toggleSendAudio', 'Toggled audio on');
				
				toggleSourcesSendAudioStatus.innerText = 'Toggled audio on!';
				console.log('MeetingControls#toggleSendAudio() :: Successfully unmuted audio!');
			})
			.catch(handleError);
	} else {
		meeting.muteAudio()
			.then(() => {
				printLog('toggleSendAudio', 'Toggled audio off');
				
				toggleSourcesSendAudioStatus.innerText = 'Toggled audio off!';
				console.log('MeetingControls#toggleSendAudio() :: Successfully muted audio!');
			})
			.catch(handleError);
	}
}


function toggleSendVideo() {
	const toggleSourcesSendVideoStatus = document.querySelector('#ts-toggle-video-status');
	const meeting = getCurrentMeeting();
	
	const handleError = (error) => {
		toggleSourcesSendVideoStatus.innerText = 'Error! See console for details.';
		console.log('MeetingControls#toggleSendVideo() :: Error toggling video!');
		console.error(error);
	};
	
	console.log('MeetingControls#toggleSendVideo()');
	if (!meeting) {
		console.log('MeetingControls#toggleSendVideo() :: no valid meeting object!');
		
		return;
	}
	
	if (meeting.isVideoMuted()) {
		meeting.unmuteVideo()
			.then(() => {
				toggleSourcesSendVideoStatus.innerText = 'Toggled video on!';
				console.log('MeetingControls#toggleSendVideo() :: Successfully unmuted video!');
			})
			.catch(handleError);
	} else {
		meeting.muteVideo()
		.then(() => {
			toggleSourcesSendVideoStatus.innerText = 'Toggled video off!';
			console.log('MeetingControls#toggleSendVideo() :: Successfully muted video!');
		})
		.catch(handleError);
	}
}

/**
 * ~~~ webex
 */

/**
 * rocket chat ~~~
 */

function printLogChat(functionName, content, doAlert) {
	if (!isUseConsoleLog) {
		return;
	}
	
	let log = '\n\n[CHT]\n▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽\n\n';
	log += 'function : ' + functionName + '\n';
	log += 'content ▷▷▷ \n';
	log += content;
	log += '\n\n△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△\n\n';
	
	console.log(log);
	
	if (doAlert) {
		alert(content);
	}
}

function webSocket() {
	socket = new WebSocket(connectSocketAddr);

	socket.onmessage = function(e) {
		const response = JSON.parse(e.data);
		
		printLogChat('webSocket - response', JSON.stringify(e.data));
		switch (response.msg || undefined) {
			case 'connected' : 
				printLogChat('webSocket - response', 'connected done');
				
				setLogin();
				
				break;
			case 'added' :
				printLogChat('webSocket - response', 'added done');
				
				break;
			case 'result' :
				printLogChat('webSocket - response', 'result ' + response.id + ' done');
				
				if (response.error) {
					bizMOB.Ui.alert("알림", response.error.message);
				} else if (response.id == 'login') {
					printLogChat('webSocket - response', 'run joinRoom');
					
					page.detailMeeting.chatToken = response.result.token;
					page.detailMeeting.rocketId = response.result.id;
					
					setJoinRoom();
				} else if (response.id == 'joinRoom') {
					printLogChat('webSocket - response', 'run streamRoomMessages and streamNotifyRoom');
					
					setStreamRoomMessages();
					setStreamNotifyRoom();
				}
				
				break;
			case 'updated' :
				printLogChat('webSocket - response', 'updated ' + response.methods[0] + ' done');
				
				break;
			case 'ready' :
				printLogChat('webSocket - response', 'ready ' + response.subs[0] + ' done');
				
				break;
			case 'changed' :
				printLogChat('webSocket - response', 'changed ' + response.collection + ' done');
				
				if (response.collection == 'stream-room-messages') {
					page.renderedMsg(response.fields.args);
				} else if (response.collection == 'stream-notify-room') {
					document.getElementById(response.fields.args[0]._id).remove();
				}
				
				break;
			case 'ping' :
				printLogChat('webSocket - response', 'ping done');
				
				sendPong();
				
				break;
			default : 
				printLogChat('webSocket - response', 'switch default');
			
				break;
		}
	}
	
	socket.onopen = function(event) {
		setConnect();
	}
};

function setConnect() {
	const connectObject = {
		msg: 'connect',
		version: '1',
		support: ['1', 'pre2', 'pre1']
	};
	
	printLogChat('setConnect', 'connection');
	socket.send(JSON.stringify(connectObject));
}

function setLogin() {
	const login = {
	    "msg": "method",
	    "method": "login",
	    "id":'login',
	    "params":[
	        {
	            "user": { "username": username },
	            "password": {
	                "digest": password,
	                "algorithm":"sha-256"
	            }
	        }
	    ]
	};
	
	printLogChat('setLogin', 'login');
	socket.send(JSON.stringify(login));
}

function setJoinRoom() {
	const joinRoom = {
		"msg" : "method",
		"method" : "joinRoom",
		"id" : 'joinRoom',
		"params" : [ page.detailMeeting.roomId, page.detailMeeting.roomPassword ]	//roomId, joinCode
	};

	printLogChat('setJoinRoom', 'joinRoom');
	socket.send(JSON.stringify(joinRoom));
}

function setStreamRoomMessages() {
	const messages = {
		"msg" : "sub",
		"id" : 'stream-room-messages',
		"name" : "stream-room-messages",
		"params" : [ page.detailMeeting.roomId, false ]
	};

	printLogChat('setStreamRoomMessages', 'stream-room-messages');
	socket.send(JSON.stringify(messages));
}

function setStreamNotifyRoom() {
	const notify = {
	    "msg": "sub",
	    "id": 'stream-notify-room',
	    "name": "stream-notify-room",
	    "params":[
	        page.detailMeeting.roomId + "/deleteMessage",
	        false
	    ]
	};

	printLogChat('setStreamNotifyRoom', 'stream-notify-room');
	socket.send(JSON.stringify(notify));
}

function sendPong() {
	printLogChat('sendPong', 'pong');
	socket.send(JSON.stringify({
		msg : 'pong'
	}));
}

/**
 * ~~~ rocket chat
 */