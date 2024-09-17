  
# 1. 소켓서버 정보
**Description**: 소켓 서버에 연결하기 위한 세부 정보를 제공합니다.  
**Note**: 웹소켓서버에서 받는 모든 메시지는 수신 후 비동기 처리 후 result : **ack/nack** 응답합니다.

- **Socket Server URL**: `ws://15.164.99.232:3000`
- **Port**: `3000`
- **Protocol**: `WebSocket`
- **Supported Json Methods**: 
  - `send_get_{function}`
  - `send_send_{function}`
- **요청 payload 예시**: 
```json
{
  "action": "send_trainData",
  "data": {
    "train_Id": "ex_01",
    "lat": 37.000,
    "lng": 127.000,
    "speed": 80,
    "order": 1,
    "interval": 5
  }
}
```

# 2. 토큰 발급 API 서버정보
**Description**: 에코트래인 소켓서버와 연결하기 위한 JWT토큰 정보를 제공합니다. 토큰은 현재 24시간 / HS256으로 해싱

- **Socket Server URL**: `http://15.164.99.232:3000`
- **Port**: `3000`
- **Protocol**: `HTTP`

Method: POST /api/getToken

	•	Endpoint: http://15.164.99.232:3000/api/getToken
	•	Method: POST


Request Headers:

	•	Content-Type: application/json | www-form-urlencoded
Response Headers:

	•	Content-Type: application/json; charset=utf-8

Request Body or Header:
```json
{
  "username" : "",
  "password" : "".
}

```
Request Response Body:
```
{
  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpYXQiOjE3MjY1NzQwNjMsImV4cCI6MTcyNjY2MDQ2M30.VCLL86I37BDoGairgAlH3c1domrO8EweTwVnjMTZwWI"
}

	•	401 Invalid credentials
```

# 3. WebSocket에게 정보 전달 send_{function}


function: **send_trainData**  
**Description**: 기차 데이터를 수집하여 서버로 전송합니다.
```json
**요청**
{
  "action": "send_trainData",
  "data": {
    "train_Id": "ex_01",
    "lat": 37.000,
    "lng": 127.000,
    "speed": 80,
    "order": 1,
    "interval": 5
  }
}
**응답**
{
  "result": "ack",
  "seq":"1"
}
```






# 4. WebSocket에게 정보 수집 get_{function}

function: **get_train**  
**Description**: 현재 운행중인 기차정보 전달받습니다.
```json
**요청**
{
  "action": "get_RunningTrains",
}

**응답**
{
  "result": "ack",
  "seq": "1",
  "response": {
    "trainCount": 2,
    "trainData": [
      {
        "trainId": "T1234",
        "lat": "37.123456",
        "lng": "127.654321"
      },
      {
        "trainId": "T5678",
        "lat": "37.223456",
        "lng": "127.754321"
      }
    ]
  }
}
