# Process Synchronization

### Process Synchronization

| 연산 | 저장 |
| --- | --- |
| CPU | Memory |
| 컴퓨터 내부 | 디스크 |
| 프로세스 | 그 프로세스의 주소 공간 |

메모리(Address Space)를 공유하는 프로세스(CPU)가 여럿 있다면 Race Condition(경쟁 상태)의 가능성이 있다.

→ Multiprocessor system

→ 공유 메모리를 사용하는 프로세스들, 커널 내부 데이터를 접근하는 루틴들 간

(ex: 커널모드 수행 중 인터럽트로 커널모드 다른 루틴 수행 시)

### Race condition은 언제 발생할까

1. kernel 수행 중 인터럽트 발생 시
    1. 일반적으로 고급 언어의 실행은 CPU 내에서 load → 수행 → store 작업을 거침
    2. 수행 중간에 interrupt가 발생해 인터럽트 처리 루틴이 수행될 수 있음
    3. 이 둘은 모두 커널 모드로 kernel address space를 공유함
    4. 해결 : 수행 중에는 disable interrupt
2. 프로세스가 시스템 콜을 해 커널 모드로 수행 중인데 context switch가 일어나는 경우
    1. 커널 모드 수행중일 때는 CPU를 preempt하지 않음
    2. 커널 → 사용자 모드로 돌아가면 preempt
3. multiprocessor에서 shared memory 내의 커널 데이터
    1. 방법 1 : 1번에 1개의 CPU만 커널에 들어갈 수 있게 함
    2. 방법 2 : 커널 내부에 있는 각 공유 데이터에 접근할 때마다 그 데이터에 대한 lock/unlock을 하는 방법
    

## Process Synchronization 문제

- 공유 데이터(shared data)의 동시 접근(concurrent access)은 데이터의 불일치 문제(inconsistency)를 발생시킬 수 있다
- 일관성 유지를 위해서 협력 프로세스(cooperating process) 간의 실행 순서(orderly execution)를 정해주는 메커니즘이 필요

- Race condition
    - 여러 프로세스들이 동시에 공유 데이터를 접근하는 상황
    - 데이터의 최종 연산 결과는 마지막에 그 데이터를 다룬 프로세스에 따라 달라짐
    - race condition을 막기 위해 concurrent process는 동기화(synchronize)되어야 한다.

### The Critical-Section Problem

- n개의 프로세스가 공유 데이터를 동시에 사용하기를 원하는 경우
- 각 프로세스의 code segment에는 공유 데이터를 접근하는 코드인 critical section이 존재
- 문제
    - 하나의 프로세스가 critical section에 있을 때 다른 모든 프로세스는 critical section에 들어갈 수 없어야 한다.
    

### 프로그램적 해결법의 충족 조건

1. Mutual Exclusion(상호배제)
    1. 프로세스가 critical section 부분을 수행중이면 다른 프로세스는 자기의 critical section에 들어가면 안됨
2. Progress
    1. 아무도 critical section에 들어있지 않고 어떤 프로세스가 들어가길 원하면 들어갈 수 있어야 함
3. Bounded waiting(유한 대기)
    1. 대기하는 시간이 유한함

가정

- 모든 프로세스의 수행 속도는 0보다 크다
- 프로세스들 간의 상대적인 수행 속도는 가정하지 않음

### Algorithm 1

```c
do {
		while (turn != 0);
		**critical section**
		turn = 1;
		remainder section
} while (1);
```

- critical section에 있으면 다른 프로세스는 while문에서 돌고 있다가 critical section에 있던 프로세스가 끝나면 턴이 넘어간다.
- progress 조건을 만족하지 못함 → 반드시 교대로 들어가야 함

→ 특정 프로세스가 더 빈번히 critical section을 들어가야할 수도 있음

### Algorithm 2

```c
do {
			flag[i] = true;
			while (flag [j]); 
			critical section
			flag [i] = false;
			remainder section
		} while (1);
```

- flag → critical section에 들어가고자 하는 상태(true로 만들면 critical section에 들어가려는 표시하는 것)
- 상대방이 들고 있다면 기다리고 해당 프로세스가 끝나면 자기 flag를 false

- 둘 다 끊임없이 true로 양보하는 상황 발생 가능 → progress 조건 불만족

### Algorithm3 (Peterson’s Algorithm)

```c
do {
			flag[i] = true;
			turn = j;
			while (flag [j] && turn == j); 
			critical section
			flag [i] = false;
			remainder section
		} while (1);
```

- turn과 flag 모두 사용함
- flag = true, turn을 상대방 턴으로 표시
- 두 조건 모두 만족하면 critical section에 들어갈 수 있음
- 모든 경우의 수를 따져도 3가지 조건을 만족함
- Busy Waiting(== spin lock) : 계속 CPU와 메모리를 쓰면서 wait, 본인 할당 시간을 기다리는데 거진 다 쓰게 될 수 있음

### Synchronoization Hardware

하드웨어적으로 Test & modify를 atomic하게 수행할 수 있도록 지원하면 문제를 간단히 해결할 수 있음

즉, 읽고 쓰기가 동시에 가능하다면 발생하지 않을 문제

1. READ
2. Test_and_set (1)
3. TRUE

```c
Synchronization varable:
				boolean lock = false;

do {
			while (Test_and_Set(lock)); 
			critical section
			lock = false;
			remainder section
		}
```

### Semaphores

- 추상 자료형의 일종으로 앞의 방식들을 추상화시킴
- Semaphore S
    - integer variable
    - 아래 2가지 atomic 연산에 의해서만 접근 가능
    
    P(S) : while (S ≤ 0) do no-op; S—; // S가 양수가 되면(누군가 자원을 다 쓰면) 자원 획득해 사용
    
    V(S) : S++; // 자원 다 사용하면 V연산을 통해 S값을 증가시켜 반납
    

발생할 수 있는 문제는 busy waiting(기다리다가 시간을 다 쓰게 될 수 있음)

```c
Synchronization varable
semaphore mutex; /* initially 1 */

do {
			P(mutex); 
			critical section
			V(mutex);
			remainder section
		} while (1);
```

### Block / Wakeup Implementatino

- Semaphore를 다음과 같이 정의

```c
typedef struct
{ int value;
	struct process *L;
} semaphore;
```

- block과 wakeup을 다음과 같이 가정
    - block : 커널은 block을 호출한 프로세스를 suspend 시킴, 이 프로세스의 PCB를 semaphore에 대한 wait queue에 넣음
    - wakeup(P) : block된 프로세스 P를 wakeup시킴, 이 프로세스의 PCB를 ready queue로 옮김

### Implementation - block/wakeup version of P() & V()

- Semaphore 연산이 이제 다음과 같이 정의됨
- P(S)

```c
S.value--;
if (S.value <0)
{
	add this process to S.L;
	block();
}
```

- V(S)

```c
S.value++;
if (S.value <= 0) {
		remove a process P from S.L;
		wakeup(P);
}
```

### Busy-wait vs Block/wakeup

Block/wakeup에도 오버헤드가 있음

- Critical section의 길이가 긴 경우 Block/wakeup이 적당
- critical section의 길이가 매우 짧다면 blcok/wakeup 오버헤드가 busy-wait 오버헤드보다 더 커질 수 있음
- 일반적으로는 block/wakeup이 더 좋음

### Deadlock and Starvation

Deadlock

- 둘 이상의 프로세스가 서로 상대방에 의해 충족될 수 있는 event를 무한히 기다리는 현상
- 하나씩 차지한 상황에서 상대방 것을 요구

Starvation

- indefinite blocking
    - 프로세스가 suspend된 이유에 해당하는 세마포어 큐에서 바져나갈 수 없는 현상


# Process Synchronization - 2

### 고전적인 Process Synchronization 문제점들

1. Bounded-Buffer Problem(Producer-Consumer Problem)
    
    producer 스레드와 consumer 스레드가 있고, 사이에 shared buffer가 있다고 가정
    
    producer : empty buffer에 데이터를 넣음, 둘 이상의 producer가 비어있는 버퍼에 동시 접근할 수 없게 락을 걸어줌
    
    consumer : full buffer에서 데이터를 꺼냄, 둘 이상의 consumer가 동일한 버퍼 데이터를 사용하려하면 락을 걸어줌
    
    synchronization variables(**락을 걸고 푸는 용, 자원 개수 카운팅하는 용으로 세마포어 변수 사용**)
    
    - mutex(mutual exclusion) → binary semaphore가 필요(shared data의 mutual execlusion을 위함)
    - resource count → integer semaphore가 필요(남은 full/empty buffer 수 표시)
    
    Producer
    
    ```c
    do {
    		produce an item in x
    		P(empty);
    		P(mutex);
    		...
    		add x to buffer
    		...
    
    		V(mutext);
    		V(full);
    } while(1);
    ```
    
    Comsumer
    
    ```c
    do {
    		P(full);
    		P(mutex);
    		...
    		remove an item from buffer to y
    
    		V(mutext);
    		V(empty);
    		...
    		comsume the item in y
    		...
    } while(1);
    ```
    
2. Readers-Writers Problem
    - 한 프로세스가 DB에 write 중일 때 다른 프로세스가 접근하면 안됨. (read는 동시 접근 가능)
    - writer는 대기 중인 reader가 1개도 없을 때 DB 접근 허용됨
    - writer가 DB 접근 허가를 얻지 못한 상태에서 reader는 모두 DB 접근 가능
    - 일단 writer가 DB에 접근 중이면 reader는 접근이 금지됨
    - writer가 DB에서 빠져나가야 reader 접근 허용
    
    Shared Data → DB 자체를 의미, readcount(현재 DB에 접근 중인 reader 수)
    
    변수 - DB 접근을 위한 db, 공유 변수 readcount를 접근하는 코드의 mutal exclusion 보장을 위한 mutex
    
    하나의 lock을 사용하면 데이터 일관성을 지킬 수 있지만, 여러 프로세스를 동시에 읽을 수 있음에도 한 프로세스만 읽도록 강제하는 것은 비효율적임
    
    → 현재 수정이 필요한 프로세스가 없다면 모든 대기중인 reader 접근이 가능하고, writer는 reader가 하나도 없는 경우 접근가능함.
    
    이 해결책은 starvation 가능성이 있는데, 계속해서 reader가 들어오거나, writer가 들어올 경우 한 쪽이 계속 수행되지 않을 가능성이 있다.
    
    → 큐에 우선순위를 부여하거나, 일정 시간이 지나면 자동으로 write or read 되게 해서 해결할 수 있음
    

3. Dining-Philosophers Problem
    
    철학자들은 밥을 먹거나, 생각을 하거나 둘 중 하나를 함
    
    젓가락은 공유자원이고, 최초에 모든 값은 1로 한 개 씩 갖고 있음
    
    모든 철학자가 동시에 젓가락을 들 경우, 데드락 상태가 발생할 수 있음(circle wait)

    
    → 4명의 철학자만 테이블에 동시에 앉거나
    
    → 젓가락을 두 개 잡을 수 있을 때만 젓가락을 집을 수 있게 함
    
    → 비대칭으로 (짝수-왼쪽 젓가락, 홀수 - 오른쪽 젓가락부터 잡을 수 있게 제한)
    

### Monitor

세마포어의 문제는 1) 코딩이 힘들어 실수하기 쉽고, 2) 정확성 입증이 어려움

 V(mutex)와 P(mutex)의 순서에 따라 데드락이 발생하거나 mutual exclusion이 깨질 수 있다. 이 단점을 보완하는 구조가 모니터다.

모니터는 동시 수행중인 프로세스 사이에서 추상 데이터의 안전한 공유를 보장한다. high-level 동기화 구조로 공유 데이터를 접근하기 위해선 모니터 내부의 procedure를 통해서만 접근할 수 있다.

세마포어와 가장 큰 차이점은 모니터는 락을 걸어줄 필요가 없다는 점

세마포어는 프로그래머가 직접 wait, signal을 사용해 race condition을 해결하나, 모니터는 자체 기능으로 해결할 수 있다. 프로세스가 공유 데이터를 사용하려면 반드시 모니터 내의 procedure를 통해야 하고, 동일한 시간에 오직 1개의 프로세스나 스레드만 모니터에 들어갈 수 있다.

모니터에 진입하려 할 때, 내부에 이미 프로세스가 있으면 진입하지 못하고 모니터 큐에 들어간다. condition variable을 사용해 wait, signal 연산을 위해 사용될 수 있다. 변수가 어떤 값을 갖진 않으면서 자기 큐에 프로세스를 매달아 sleep 시키거나 큐에서 프로세스를 깨우는 역할을 한다.