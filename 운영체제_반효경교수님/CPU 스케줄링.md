# CPU Scheduling

### CPU-burst Time의 분포


- 여러 종류의 job(process)이 섞여 있기 때문에 CPU 스케줄링이 필요함
    - Interactive job(사람)에게 적절한 response 제공 요망
    - CPU와 I/O 장치 등 시스템 자원을 골고루 효율적으로 사용
    - CPU는 CPU bound job이 많고 I/O bound job은 빈도는 적은데 시간이 김

### 프로세스의 특성 분류

- 프로세스는 그 특성에 따라 다음 두 가지로 나뉨
    - I/O bound process
        - CPU를 잡고 계산하는 시간보다 I/O에 많은 시간이 필요한 job
        - (many short CPU bursts)
    - CPU-bound process
        - 계산 위주의 job
        - (few very long CPU bursts)

### CPU Scheduler & Dispatcher

- CPU Scheduler ← 운영체제 안에 일부 코드(기능)
    - Ready 상태의 프로세스 중에서 이번에 CPU를 줄 프로세스를 고른다.
- Dispatcher ← 위와 동일
    - CPU의 제어권을 CPU Scheduler에 의해 선택된 프로세스를 고름
    - 이 과정을 context switch라 함

⇒ CPU 스케줄링이 필요한 경우는 프로세스에 다음 같은 상태 변화가 있을 때

1. Running → Blocked(ex: I/O 요청 system call)
2. Running → Ready(ex: time interrupt)
3. Blocked → Ready(ex: I/O 요청 후 interrupt)
4. Terminate

- 1, 4에서의 스케줄링은 nonpreemptive(=강제로 빼앗지 않고 자진 반납)
- 그 외 모든 다른 경우는 preemptive(=강제로 빼앗음)