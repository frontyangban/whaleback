### Section 4. 컨테이너 교차 통신

- node 어플리케이션 예제
  - GET favorites - 즐겨찾기한 아이템들 가져오기.
  - POST favorites - 아이템을 즐겨찾기에 넣기.
  - GET movies - 영화 목록 가져오기.
  - GET people - 영화 출연진 가져오기.

1. WWW 통신 컨테이너
   - 컨테이너에서 외부로 HTTP 통신 요청을 하는 것이 가능하다.
2. 컨테이너에서 로컬 호스트로의 통신
   - 특수 도메인으로 변경하라. host.docker.internal
3. 컨테이너 간 통신
   1. docker run mongo
   2. docker container inspect mongodb
      - 컨테이너를 검사하여 IP 주소를 찾을 수 있음.
   3. Docker Container Networks
      1. docker run —network my_network …
         - 모든 컨테이너를 하나의 동일한 네트워크에 밀어넣을 수 있다
         - 도커는 이전에 수동으로 했던 Ip 조회 및 해결 작업을 자동으로 수행함
           - docker run -d --name mongodb --network favorites-net mongo
      - 네트워크는 볼륨처럼 없는 경우 자동으로 생성해주지 않는다.
        - docker network create NAME : 새로운 도커 네트워크 생성
      - 두 개의 컨테이너가 동일한 네트워크의 일부인 경우 다른 컨테이너 이름을 도메인 주소로 쓸 수 있음.
      - mongodb 컨테이너를 실행할 때 포트를 게시할 필요가 없음. 컨테이너 외부에서 그 컨테이너에 접근할 때만 필요하기 때문.

- Docker가 IP 주소를 해결하는 방법
  - 로컬호스트라면 host.docker.internal
  - 같은 네트워크라면 컨테이너 이름으로 컨테이너에 접근할 수 있게 한다.
  - request가 있을 때 도커가 그것을 보고 실제 주소로 바꿔준다. 주변 컨테이너나 호스트 머신을 알고 있기 때문에.
- Docker 네트워크 드라이버
  - 도커 네트워크는 동작에 영향을 미치는 다양한 종류의 드라이버를 지원함.
  - 기본값은 bridge 드라이버. —driver bridge 옵션으로도 설정할 수 있음.
  - host: 스탠드얼론 컨테이너의 경우, 컨테이너와 호스트 시스템 간의 격리가 제거됨 (즉, localhost를 네트워크로 공유함).
  - overlay: 여러 Docker 데몬 (즉, 서로 다른 머신에서 실행되는 Docker)이 서로 연결될 수 있음. 잘 사용하지 않는 'Swarm' 모드에서만 동작
  - macvlan: 컨테이너에 커스텀 MAC 주소를 설정 가능. 그러면 이 주소를 해당 컨테이너와 통신하는데 사용할 수 있음
  - none: 모든 네트워킹이 비활성화
  - 써드파티 플러그인
