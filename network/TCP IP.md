# TCP/IP 계층 구조 및 역할

### 1. TCP/IP 란?

- 인터넷을 사용하는 모든 통신의 기본적인 프로토콜
- 한 개의 프로토콜이 아닌 여러가지 프로토콜 조합
- TCP/IP 기반 BAN, PAN, LAN, MAN, WAN 구간의 장치들이 원활히 데이터를 주고 받을 수 있음
- OSI 7 계층과 달리 4개의 계층으로 표현됨
- TCP는 서비스를, IP는 주소를 의미함
- 수많은 프로토콜들이 IP 주소를 기반으로 동작함

### 2. TCP/IP 계층

**네트워크 접속 계층**

- OSI 참조 모델의 물리 계층과 데이터링크 계층의 역할을 수행
- 프레임의 송신과 수신을 담당

ARP(Address Resolution Protocol)

: 목적지의 MAC 주소를 모를 경우 이를 알아내기 위해서 사용하는 프로토콜

: 모든 호스트들에게 데이터를 보냄

RARP(Reverse Address)

: 목적지의 IP 주소를 모를 경우 이를 알아내기 위해 사용하는 프로토콜

: 목적지 호스트에만 데이터를 보냄

- ARP는 Broadcase, RARP는 Unicast를 수행
- NIC, 스위치와 허브는 네트워크 접속을 대표하는 네트워크 장치
- 에러 검출 기능이 있으며, 패킷을 프레임화
- ARP는 Broadcast, ARP의 응답은 Unicast를 수행

**인터넷 계층**

IP(Internet Protocol)

: 컴퓨터 네트워크에서 장치들을 나타내는 수단이며, v4(32 bit)와 v6(128bit) 2가지가 존재함

ICMP(Internet Control Message Protocol)

: 인터넷 제어 메시지 프로토콜이며, 장치 간의 통신 가능 여부를 확인할 때 사용(ex. Ping)

ICMP는 Echo Request(요청) 및 Echo Reply(응답)로 구성됨

**전송계층(Transport Layer)**

- 종단 간의 통신이 완성되는 계층이며, TCP(HTTP), UDP가 대표적이다.
- TCP와 UDP는 포트번호를 사용해 통신함
- TCP는 신뢰성 있는 통신을 제공하지만, UDP는 TCP에 비해 신뢰성 있는 통신을 제공하지 않음
- UDP는 TCP보다 통신 데이터 처리 속도가 빠름
    - TCP는 신뢰성 있는 통신을 위해 ACK 응답이 필요한데 UDP는 이게 필요 없음
- UDP를 이용하는 응용 프로그램에서 어느 정도의 신뢰성 있는 통신을 해야 할 경우 다른 프로토콜을 함께 사용해 신뢰성을 제공할 수 있음
- TCP와 UDP의 정의는 RFC1700 문서에 정확하게 제공되고 있음
    - https://www.ietf.org/rfc/rfc1700.txt
- Well-Known 포트란 대부분의 시스템 간에 널리 이용되는 애플리케이션을 위해 기본값으로 설정되어 있는 포트 번호를 의미함
    - http → TCP 80
        
        port 7 → Echo protocol
        
        port 22 → SSH(원격 접속이면서 암호화되어 있음, telnet도 원격 접속이나 암호화가 안되어 있음)
        
        port 53 → domain (domain name server, DNS Server)
        

**응용계층(Application Layer)**

- OSI 참조 모델의 세션, 표현, 응용 계층의 역할을 수행하는 계층
- 네트워크를 통한 실제 사용자 데이터를 처리하는 계층
- HTTP, HTTPS, FTP, SMTP, POP3, DNS 등이 계층에 해당함

### 3. TCP, UDP 헤더

1. TCP 헤더
    1. TCP는 연결지향형 서비스를 제공하고 신뢰성 있는 데이터 전송을 보장함
    2. 이런 기능은 TCP 헤더에 의해...
    
    | 출발지 포트번호 16bit | 목적지 포트번호 16bit |
    | --- | --- |
    | 순서 번호 32bit | 순서 번호 32bit |
    | 확인응답 번호 32bit | 확인응답 번호 32bit |
    | 헤더길이
    예약
    URG
    ACK
    PSH
    RST
    SYN
    FIN | 윈도우 크기 16bit |
    - 출발지 포트 번호(source port number)
        - 출발지 호스트의 포트 번호를 정의한 16비트 필드이며 임의 번호를 사용
    - 목적지 포트 번호(destination port number)
        - 목적지 호스트의 포트 번호를 정의한 16비트 필드이며 대부분 well-known port number 이용
    - 순서 번호(sequence number)
        - TCP 세그먼트들에 대한 순서 번호를 표시
        - 목적지에서 재조립할 때 사용
    - 수신 확인 응답 번호(ack number)
        - 수신 장치에서 발신 장치로 세그먼트 전송 성공 여부를 알려주기 위해 사용
    - 헤더 길이(header length)
        - 최소 20바이트에서 최대 60바이트이며 이를 표시
    - 예약 비트(reserved)
        - 현재는 사용하지 않으며, 추후 다른 목적을 위해 예약된 필드
    - URG(Urgent)
        - 긴급 데이터가 포함되어 있음을 알리는 필드. 1이면 우선 처리
    - ACK
        - tcp 세그먼트들에 대한 수신 확인을 알리기 위해 사용, 1이면 수신 확인 응답 번호 이전까지의 모든 세그먼트들을 잘 받았음을 의미함
    - PSH(Push)
        - 푸시 요청으로 긴급 데이터가 아닌 데이터를 빨리 처리하도록 요청하는 제어 비트
    - RST(Reset)
        - TCP 세션을 리셋하기 위한 제어 비트
    - SYN
        - 통신을 개시하고자 하는 두 호스트 간의 세션을 초기화하고 순서 번호를 동기화 하기 위한 제어비트
    - FIN(Final)
        - Tcp 세션의 전송 종료 시 사용하는 제어 비트
    - 윈도우 크기
        - 상대측으로부터 수신 확인 응답 번호의 수신 없이 전송할 수 있는 데이터 양을 지정하는 필드
    - TCP 체크섬
        - 헤더와 세그먼트에 의해 전송되는 데이터에 대한 오류 검사를 하기 위한 필드
    - 긴급 포인터
        - 페이로드 내에 어떤 곳에 긴급한 데이터가 있음을 명시하기 위한 필드, 1이면 윻
    - 옵션
        - 최대 40바이트까지 옵션 정보가 있을 수 있음
    
2. UDP 헤더
    1. 전송 계층에서 동작, 포트 번호를 기반으로 통신
    2. 수신 데이터에 대해 수신확인 응답을 하지 않음(tcp와 다름)
    3. tcp보다 헤더가 간단하고, tcp에서 지원하는 다양한 데이터 흐름 제어 기능을 수행하지 않음
    4. 송수신 절차가 비교적 간단하고, 오류 제어 기능은 제공하고 있으므로 소량의 데이터 전송이나 실시간 데이터 전송에 효과적으로 사용되고 있음
    5. 비연결형 서비스를 지원
    6. 데이터그램 간의 전후 관계를 고려하지 않고 전송
    7. well-known port 기반으로 통신
    
    UDP 헤더
    
    - 출발지 포트번호 16bit
        - 출발지 호스트의 포트번호를 정의한 16비트의 필드이며 임의 번호 사용
        - 0부터 65535 범위 내
    - 목적지 포트번호 16bit
        - 대부분 웰노운 포트 번호 사용
        - 일반적으로 서비스에 따라 미리 정해진 번호
    - 길이 16bit
        - 헤더와 데이터를 포함한 UDP 데이터 그램의 전체 길이를 나타냄
    - 검사합 16bit
        - 헤더와 데이터를 포함한 사용자의 데이터 그램에 ㄷ한 오류 검사를 하기 위한 필드
        
3. IP 헤더
    1. 네트워크 계층에 사용되고, 패킷을 출발지에서 목적지까지 전달하는데 사용됨
    2. Best Effort 최선형 서비스를 이용해 패킷을 전달하지만 목적까지 확실히 패킷이 도착하는 것은 보증하지 않음
    3. 그렇기 때문에 도중에 패킷이 손실될 수 있음
    4. 최선형 서비스의 단점을 보완하기 위해 상위 계층인 TCP 같은 신뢰성 있는 프로토콜의 도움을 받음
    5. IP는 네트워크 사정상 목적지 장치에 도착한 패킷들이 순서대로 도착하지 않을 수 있음 - 시퀀스 정보 사용
    6. V4(32bit, 10진수)가 사용되었다가 주소 부족 문제로 인해 V6(128bit, 16진수)가 대안으로 제시되었음
    7. IP는 비신뢰성을 가져 데이터 흐름에는 전혀 관여하지 않음
    8. 현재 인터넷에서 주로 사용되는 표준 프로토콜은 IPv4이다.
    
    ip 헤더
    
    - 버전 4bit
        - 어떤 버전을 사용하는지 나타냄
    - 헤더 길이 4
        - 옵션을 포함할 경우 최대 60바이트까지 최소 단위는 20바이트
    - TOS(Type of service)
        - 우선순위를 나타내는 필드로 3비트의 Precedence 값 4비트의 서비스 유형 지정 비트, 그리고 사용되지 않는 1비트가 합쳐 8로 구성되어 있음
    - 전체 길이(Total Length)
        - 헤더와 데이터를 포함한 패킷의 전체 길이를 나타냄
    - 식별자(Identification)
        - 생성되는 패킷마다 부여되는 고유 번호
        - 패킷은 2계층 프로토콜의 최대 전송 단위(MTU) 값에 따라 여러 개의 Fragment로 분할하고, 원래의 패킷으로 재조립하고자 할 경우 이 식별자 값을 기준으로 사용
    - 플래그(flag)
        - ip 패킷의 분할 가능 여부와 마지막 프래그먼트인지 표시
    - 분할 위치(fragment offset)
        - 하나의 패킷이 여러 개의 프래그먼트로 분할될 때 원래 패킷 어디에 있었는지 명시
        - 이 값을 이용해 원래의 패킷으로 재조립
    - TTL(Time-to-live)
        - 패킷의 루핑 현상을 막기 위해 사용, 패킷의 수명을 나타냄
        - 라우터를 지날 때마다 1씩 감소, 0이되면 패킷 폐기
    - 프로토콜
        - 패킷에 캡슐화된 상위 계층 PDU가 어떤 프로토콜을 사용하는지 명시하는 필드
        - TCP 세그먼트이면 6을, UDP 세그먼트이면 17의 값을 가짐
    - 헤더 체크섬
        - IP 헤더의 오류 여부를 검사하기 위한 필드
    - 출발지 ip 주소
    - 목적지 ip 주소
    - 옵션
        - 패킷의 전송 경로를 포함한 ip 프로토콜의 동작 옵션을 정의하는 필드
        

### Q. 자주 사용하는 컴퓨터나 스마트폰 운영체제에서 사용하는 주소는 어떤 주소일까요?

2가지 주소를 사용할 수 있는데 첫 번째로 현재 가장 많이 사용되는 IPv4는 32비트의 10진수를 사용해 주소를 표현한다. 그러나 주소 부족 문제로 다음 대안으로 IPv6가 나왔고 이 주소는 128비트의 16진수를 사용해 사실상 주소가 무한대로 봐도 무방하다. 점점 IPv6로 넘어가는 추세다. 

각 계층에서 사용되는 장비도 숙지할 것.