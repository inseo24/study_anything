# OSI 7 계층

### OSI 7 계층이 사용되는 네트워크 정의

통신 매체의 링크를 통해 연결된 Node들의 집합

OSI(Open Systems Interconnection)

### 네트워크 구성 요소

1. Server
    1. Data 또는 Resource를 제공하는 System
2. Client
    1. Data 또는 Resource를 제공받는 System
3. 매체
    1. Cable, 전파
4. Message
    1. 보내고 받는 모든 Data
5. Protocol
    1. 통신 규약
    

### OSI Model이란?

- 컴퓨터 네트워크를 설계하거나 네트워크 프로토콜을 설계하기 위한 지침
- 1947년에 ISO(International Organization for Standardization)에서 제안
- 개방형 시스템(네트워크에서 노드를 만들 수 있는 모든 시스템)의 통신을 위해 7개의 계층을 제안 → OSI 7 layer
- 각 계층별로 고유한 기능을 가지고 있음, 각 계층은 독립적으로 움직임
- 계층화된 구조를 사용해 데이터 통신이 이뤄짐
- 표준화 모델 사용으로 인한 이기종과 데이터 통신 가능

4계층~7계층 : Software 계층 ← 프로토콜이 주로 적용되는 부분

1계층~3계층 : Hardware 계층 ← 여기서도 적용되긴 함

네트워크 장치를 통해 Data 전송 및 수신 : Router, Switch, NIC, Cable ... (Hardware)

### OSI 7 layer

각 계층이 독립적으로 움직임

1. 물리 계층(Physical Layer)
    
    사용자 데이터를 물리 매체(전기 통신) 상에서 소통이 가능한 통신 신호로 변환해 전송하는 계층
    
    NIC(Network Interface Card, LAN Card) : 데이터를 전송 가능한 신호로 변환하는 역할
    
    물리 계층에서 데이터 송수신에 오류가 발생하더라도 복구하지 않음
    
    신호 전송을 위한 4가지 특성을 포함
    
    - 전기적 특성 : 전압 레벨과 전압이 변하게 되는 시점
    - 기능적 특성 : 케이블의 기능적 특성을 정의
    - 절차적 특성 : 데이터 전송 절차 규정(프로토콜)
    - 물리적 특성 : 표준 케이블 간의 물리적 연결 정의
    
    구리선 매체가 전도율이 우수하고 부식에 대한 특성이 좋으며, 유연성이 뛰어나고 강성이 좋음(현재는 구리선을 광섬유가 대체하고 있음)
    
    구리선 매체의 대표적 케이블로 UTP 케이블이 있음
    
    → RJ-45를 사용해 구리선이 연결된다.
    
    UTP 케이블은 Direct와 Cross 케이블로 나눠진다.
    
    Direct : 서로 다른 계층 장치 연결 시 사용
    
    Cross : 서로 동일한 계층 장치 연결 시 사용(스위치와 스위치의 연결 등)
    
    UTP 케이블 제작 및 설치가 쉬우나 잡음, 간섭에 약함
    
    네트워크 구성 시, UTP 케이블의 최대 전송 길이 및 설치 환경에 유의할 필요가 있음
    
    허브, 리피터, NIC가 1계층 장비에 속한다.
    
    물리 계층에 전송되는 데이터를 비트(bit)라고 한다.
    
2. 데이터링크 계층(Datalink Layer)
    
    서로 다른 네트워크 장치 간의 데이터 전송을 담당
    
    데이터링크 계층에서 전송되는 데이터를 프레임(Frame)이라고 한다.
    
    MAC(Media Access Control) 매체 접근 제어 및 48bit의 16진수 주소를 사용한다.
    
    데이터링크 계층의 대표적 장치로 스위치와 브리지가 있으나 현재는 브리지 기능이 스위치에 포함됨
    
    스위치는 프레임 전송을 위한 MAC Table을 사용한다.
    
    MAC Address
    
    - 물리 주소 또는 하드웨어 주소, Burned-in Address(구워진 주소)로 불림
    - 우리가 할당할 수 있는게 아니라, LAN 카드 만드는 회사에서 생산 시점에 ROM에 영구적으로 기입되어 나옴
    - H/W 적으로 주소 변경 불가, 그러나 S/W적으로 변경 가능(일반적으로 변경하진 않음)
    - 48bit의 16진수 주소로 표현됨(E0-3F-43-EA-59-B7)
    - Frame Control, L2 보안을 위해 사용됨
    
    데이터링크 계층의 5가지 주요 기능
    
    1. 프레이밍(Framing)
        
        물리 계층에서 수신한 신호를 조합해 프레임 단위의 정해진 크기의 데이터로 만듦
        
    2. 흐름 제어(Flow Control)
        
        송신 측과 수신 측 간에 데이터 흐름을 제어
        
    3. 오류 제어(Error Control)
        
        프레임 전송 시 발생한 오류를 복원하거나 재전송
        
    4. 접근 제어(Access Control)
        
        매체 상의 장치가 여럿 존재할 때, 통신 장치의 활동 상황을 고려해 데이터 전송 가능 여부 결정
        
    5. 동기화(synchronization)
        
        프레임 헤더에 전송된 프레임의 타이밍 정보를 맞추기 위한 특별한 비트 패턴을 제공
        
        Frame header에는 송신 및 수신 장치의 주소가 포함(MAC 주소 포함)
        
        트레일러에는 오류 검출을 위한 오류 검출 코드를 포함
        
3. 네트워크 계층(Network Layer)
    
    네트워크 계층의 데이터를 패킷(Packet)이라 함
    
    IP 주소를 기반으로 패킷을 전달하는 계층
    
    3계층의 대표적인 장치는 Router(라우터)
    
    라우터가 패킷을 수신하면 어떤 경로로 패킷을 전송할 것인지 라우팅 프로토콜에 따라 판단함
    
    라우터는 LAN 구간의 통신을 위해 MAC 주소 보유
    
    LAN 구간과 WAN 구간을 연결시켜주는 계층
    
    네트워크 계층의 3가지 주요 기능
    
    1. 패킷 전달(Packet Forwarding)
        
        종단 간의 패킷 전달 수행
        
    2. Routing
        
        라우팅 프로토콜 기반으로 효율적인 경로 선택
        
    3. Logical Address 사용
        
        IP 프로토콜 헤더를 붙여 캡슐화를 수행
        
        IP 주소를 사용해 사용자 데이터를 목적지로 전달
        
    
    논리적 링크와 물리적 링크를 함께 사용해 패킷을 전달함
    
    네트워크 계층의 프로토콜
    
    - IP : Internet Protocol로 v4, v6이 있음
    - ARP: Address Resolution Protocol로 IP 주소를 기반으로 MAC 주소를 찾을 때 사용
    - RARP : Reverse ARP로 MAC 주소를 기반으로 사용
    
4. 전송 계층(Transport Layer)
    
    전송 계층 데이터를 segment라고 함
    
    세그먼트 헤더에는 포트 주소(포트 번호) 또는 소켓 주소가 포함됨
    
    상위 3개 계층과 하위 3개 계층의 중간에 위치
    
    종단 간(end-to-end) 데이터 통신 보장
    
    흐름 제어와 오류 제어 등을 통해 데이터 통신 보장
    
    지연에 따른 왜곡 및 대역폭 부족 문제 해결
    
    동시에 여러개의 논리적 연결 지원
    
    사용자 데이터 분할과 재조립
    

1. 세션 계층(Session Layer)
    
    세션 계층 데이터를 message라고 함
    
    통신의 시작과 종료를 정의
    
    표현계층 데이터 + 동기화, 세션 정보 + 헤더 → 4계층으로 보내게 됨
    
2. 표현 계층(Presentation Layer)
    
    데이터를 어떻게 표현하는지를 정의하는 계층
    
    응용 계층에서 생성된 데이터는 컴퓨터에서 만들어진 데이터이고, 이 데이터를 다른 컴퓨터가 이해할 수 있는 형태로 변환
    
3. 응용 계층
    
    응용 프로그램과 통신 프로그램 사이를 연결하는 역할
    
    OSI 최상위 계층, 사용자가 가장 가까운 계층
    
    응용 계층의 프로토콜 예시
    
    FTP(File Transfer Protocol) : 파일 전송 프로토콜
    
    SMTP(Simple Mail Transfer Protocol) : 메일 전송 프로토콜
    
    SNMP(Simple Network Management Protocol) : 모니터링
    
    Telnet: 원격접속
    
    SSH(Secure Shell) : 암호화 원격접속
    
    http: www 이용 시 사용
    
    https: http의 보안이 강화된 프로토콜
    

### OSI 7계층 캡슐화

1. 계층별 캡슐화
    - OSI 참조 모델은 각 계층별로 고유 기능과 역할 존재
    - 각 계층의 고유 기능만을 수행, 계층간 독립성 유지
    - 계층별 헤더는 각 프로토콜의 동작에 필요한 요소 기록
    - 헤더는 데이터 유닛의 맨 앞에 붙음
    - 데이터를 하위 계층으로 전송할 경우 헤더를 추가
    - 데이터를 상위 계층으로 전송할 경우 헤더를 제거
    
    캡슐화 : 헤더나 트레일러를 추가하는 과정
    
    역캡슐화 : 헤더나 트레일러를 제거하는 과정
    
    OSI 참조 모델을 기반으로 하는 통신 프로토콜은 계층간의 캡슐화 및 역캡슐화라는 과정을 통해 데이터를 주고 받는다. 
    
    ### Q. 운영체제가 다름에도 서로 데이터 주고 받기에 문제가 없는 이유가 뭘까
    
    A.
    
    운영체제가 다르더라도 국제 표준화 기구(ISO)에서 개발한 OSI 7계층 모델 등에 맞게 데이터를 주고 받고 있어서 문제가 없다.