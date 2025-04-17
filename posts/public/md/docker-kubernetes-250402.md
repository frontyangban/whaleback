<!-- ---
title: 'Docker & Kubernetes (2)'
date: '2025-04-02'
description: 'Docker 이미지와 컨테이너'
---

# Docker & Kubernetes -->

### Docker Image & Container: Core building block

- two core concepts: images & containers
  - 도커를 작업할 때 컨테이너뿐 이미지도 있다.
  - 왜 둘 다 필요함?
  - 컨테이너: 어플리케이션, 웹사이트, 노드 서버, 전체 환경 등 무엇이든 포함하는 작은 패키지 (소프트웨어 실행 유닛이 존재) 구체적인 실행 인스턴스. 이미지를 기반으로 한느 컨테이너를 실행하는 것임.
  - 이미지: dissolver 컨셉. 컨테이너의 청사진이 되기 때문. 실제로 코드와 코드 실행에 필요한 도구를 포함한다. (Nodejs App Code, NodeJs Environment) 이걸 기반으로 컨테이너들을 만들 수 있음.
  - finding / creating images
    - 존재하는 Prebuilt 이미지를 이용한다.
    - docker hub에서도 찾을 수 있다. [hub.docker.com](http://hub.docker.com)
    - docker run “node” (node 이미지의 인스턴스를 만든다)
    - 하지만 컨테이너는 기본적으로 주변 환경과 격리되어 있다. 컨테이너 내부에서 실행 중인 쉘이 있다고 해서 우리에게 노출되거나 하진 않는다.
    - `docker ps -a` (all processes)
    - `docker run -it node` (컨테이너 내부에서 대화형 세션을 노출하고 싶다)
  - creating image
    - 커스텀 이미지를 빌드하려면 디렉토리에서 Dockerfile을 생성하자.
    - 도커에 의해 식별되는 특별한 이름.
    - 쉽게 가독하고 작성하려면 Vs code Docker Extension을 설치하자.
- pre-built vs. custom images

```docker
  # 일반적으로 FROM 으로 시작. 이미지 이름으로 환경을 세팅. 로컬이나 도커 허브에 있는 이미지 사용 가능
  FROM node

  # 작업 명령이 실행될 디렉토리 설정.
  WORKDIR /app

  # 어떤 파일이 도커 이미지 안에 들어가야 하는지. COPY 이미지로 복사되어야 할 파일(excluding Dockerfile) 이미지 내부의 경로
  COPY . /app

  # 모든 종속성을 설치하기 위해. 이미지의 작업 디렉토리에서 실행되기 때문에, npm install도 /app 에서 실행하고 싶다.
  RUN npm install

  # 컨테이너가 시작될떄 우리 로컬 시스템에 특정 포트를 노출시키고 싶다
  EXPOSE 80

  # 이미지를 기반으로 컨테이너를 실행하는 것이다. 이미지를 실행하는 것이 아님.
  # RUN node server.js
  # 컨테이너가 시작될 때 실행할 명령어를 지정하는 것.
  CMD ["node", "server.js"]
```

- 도커파일을 만들고 이것을 이미지로 변환한 다음 궁극적으로 컨테이너화하려면?
- `docker build {PATH*도커파일*위치}`: 도커파일의 명령에 따라 이미지를 만들고 싶다.
- writing image sha256:{IMAGE_ID}
- `docker run IMAGE_ID`
- 하지만 포트를 expose했음에도 로컬호스트에 웹사이트가 표시되지 않는다…
- `docker ps` 로 확인해보자. (-a가 없다면 실행 중인 프로세스만 표시)
- `docker stop CONTAINER_NAME`
- 도커파일에 expose 명령이 있지만.. 이것은 실제로 도큐먼테이션 목적으로만 추가되었기 때문. 아무것도 안 하는 명령어임.
- `docker run -p` (publish) 도커에게 어떤 로컬 포트가 있는지 알려줄 수 있다. 로컬 머신의 어ㄸ너 포트가 내부의 도커 특정 포트에 액세스할 수 있는지. 로컬 포트(애플리케이션에 엑세스하려는) 3000: 내부 도커 컨테이너 노출 포트 80

- EXPOSE
  - EXPOSE 는 선택 사항임. 컨테이너의 프로세스가 이 포트를 노출할 것임을 문서화하는 것. 하지만 이 동작을 문서화하는 것이 모범적인 사용법이다.
  - 따라서 컨테이너를 실행할 때 -p 를 사용해 실제로 노출을 해야 한다.
- 추가 팁
  - ID 를 사용할 수 있는 모든 docker 명령의 경우, 항상 전체 ID를 사용할 필요는 없다. 첫 번째 (또는 몇 개) 문자를 사용할 수도 있다. 고유 식별자를 갖는 것만으로도 충분함.
- docker 하위 명령을 더 배우기 위해서.
- 노드 어플리케이션 코드베이스에서, 코드를 변경하고 싶다.
  - html 마크업을 변경했고, 실행 중인 어플리케이션에 반영하고 싶어.
  - 하지만 다시 `docker run ~~~` 을 해도 반영되지 않는다.
  - 어째서 그럴까?
  - 소스 코드를 이미지에 복사하고 복사한 시점에 소스코드의 스냅샷을 만든다. 소스코드를 변경하면 이것은 이미지의 소스 코드에 포함되지 않는다. 업데이트된 소스 코드를 새 이미지로 복사하려면 다시 빌드해야 한다.
  - 이미지는 읽기 전용이고 과거에 이 코드를 복사했으므로 일단 빌드되면 끝이다.
- 이미지 레이어 이해하기

  - 이미지를 빌드하면 명령이 실행되고 이미지가 닫힌다.
  - 이미지는 레이어 기반이다.
  - 이미지를 빌드하거나 다시 빌드할 때 변경된 부분의 명령과 그 이후의 모든 명령이 재평가된다.
  - 도커는 모든 명령어를 다시 실행했을 때의 결과가 이전과 동일하다는 걸 인식했기 때문 (using cache) 다시 실행해도 변경된 것이 없으므로 그 명령을 다시 거칠 필요가 없다고 추론한 것.
  - 모든 도커파일의 명령은 레이어
  - COPY 하며 코드베이스가 변경되었다면, 이후 npm install이 이전과 동일한 결과를 가져올 지 알 수 없기 때문에.. 후속 레이어가 모두 다시 실행된다.
  - 최적화를 위해, 종속성 부분을 따로 분리한다.

  ```docker
  FROM node

  WORKDIR /app

  # package.json 을 먼저 복사하여, 의존성 설치 레이어를 앞쪽에 둔다면
  # 소스 코드만 변경되었을 때 npm install 레이어가 다시 실행되는 것을 방지한다.
  COPY package.json /app

  RUN npm install

  COPY . /app

  EXPOSE 80

  CMD ["node", "server.js"]
  ```

- 요약
  - 도커는 우리의 어플리케이션에 대한 모든 것
  - 앱을 구성하는 코드를 도커파일을 생성하여 이미지에 무엇을 넣을 건지, 베이스 이미지를 사용할 것인지, 어떤 종속성이 복사될 것인지.. 이미지에 위치시킨다. 실행 환경도 위치시킨다.
  - 그리고 이미지에 기반한 컨테이너를 실행할 수 있다. 이미지 위에 추가된 얇은 레이어이다. 실행 중인 다른 컨테이너와는 독립적인 스탠드얼론 환경이다.
- 이미지 & 컨테이너 관리
  - 모든 도커 명령에 —help 추가해서 사용가능한 옵션을 확인할 수 있다.
  - tag (naming)
  - list images
  - analyze image
  - remove image
  - name container
  - configure container
  - list containers
  - remove container
- 컨테이너 중지 & 재시작
  - `docker ps`
    - 실행 중인 모든 컨테이너를 리스팅
    - -a: 실행되지 않는 중지된 것을 포함하여 과거 까지 모두 리스팅
  - `docker start ID or NAME`
    - run과 다르다. (run은 컨테이너가 foreground에서 실행됨)
    - detached 모드로 실행된다 (run은 attached mode)
    - 터미널의 프로세스가 바로 완료된다. 백그라운드에서 실행됨.
    - 그래서 왜 필요함?
    - detached 모드는 콘솔에 아무것도 표시되지 않는다.
    - attached 모드는 콘솔에 로깅이 표시된다. 컨테이너의 출력결과를 수신한다. 원하든, 원하지 않든 간.
    - detached 모드로 메시지를 수신하기 위해서는.. docker logs.
      - `docker logs NAME or ID`
      - 컨테이너에 의해 출력된 과거 로그를 볼 수 있다.
      - -f 옵션으로 keep listen도 할 수 있다.
- 인터랙티브 모드로 들어가기.
  - 항상 웹서버를 가동시키는 nodeJS 서버를 살펴봤다.. 가장 많은 유즈케이스.
  - `docker run sdjlfjskdlfjkl` : 디폴트로 컨테이너에 연결된다.
  - 컨테이너나 컨테이너로 실행되는 앱에서는 어떤 것도 입력할 수 없으므로.
  - -i: 인터랙티브 모드로 실행한다.
  - -t: 터미널을 생성한다.
  - 실제로 입력을 받는 장치가 되는 것.
- 이미지 & 컨테이너 삭제하기
  - `docker rm CONTAINER_NAME1 CONTAINER_NAME2`
  - `docker container prune` 으로 중단된 컨테이너를 모두 날릴 수 있음.
  - `docker images`: 이미지 리스팅
  - `docker rmi IMAGE_ID` : 이미지 제거
  - 이미지를 기반으로 생성된 컨테이너가 존재할 때는 제거 불가
  - `docker image prune` : 사용되지 않는 모든 이미지 제거
    - -a 옵션을 쓰면 태그가 있는 이미지도 다 날린다.
- 중지된 컨테이너 자동으로 제거하기
  - —rm option: 중지된 컨테이너를 자동으로 제거.
  - 컨테이너에 노드 서버같은 것이 포함된 경우, 코드가 변경된 경우에만 컨테이너를 중지하는 경우가 많으며 이미지를 다시 빌드해야 함을 의미. (새 컨테이너를 시작 필요)
- 이미지 검사
  - `docker image inspect IMAGE_ID`
  - 레이어를 보면 dockerfile에 정의하지 않은 레이어도 있다. 기본 이미지에 의해 제공되는 레이어들도 제공되기 때문.
  - 이미지를 기반으로 구성될 컨테이너에 대한 정보도 흥미.
- 컨테이너에서 파일 복사하기
  - `docker cp` : 실행 중인 컨테이너로, 실행 중인 컨테이너 밖으로 파일이나 폴더 복사할 수 있다.
  - `docker cp dummy/. CONTAINER_NAME:/test`
  - 컨테이너의 블랙박스를 볼 수 있는 용도로 사용하기도 함.
  - 로컬호스트로 로그를 복사한다거나.
- 컨테이너나 이미지에 이름 지정 & 태그 지정하기
  - 지금까지 이미지 리스팅할때 이미지 ID를 이용했다. 컨테이너도 마찬가지.
  - 태그를 설정하지 않았기 때문…
  - 태그와 레포지토리가 있다.
  - `docker run —name` : 컨테이너에 원하는 이름을 제공한다
  - 이미지 네임: 이미지 레포지토리라고도 함, 일반적인 그룹.
  - name : tag 형식으로 되어 잇음. 태그는 옵셔널. 보다 특정화된 버전을 정의할 수 있다.
  - `docker build -t goals:latest .`
- 이미지 공유하기
  - 두 가지 방식
    - 도커파일과 소스 코드를 제공하면 자체 이미지를 빌드하고 컨테이너 실행
      - 도커 빌드 필요.
    - 빌드된 전체 이미지를 공유하는 방식
      - 이미지 받아서 즉시 실행하면 됨.
  - 이미지를 푸시하는 두 가지 주요 위치
    - 도커 허브
      - 공식 도커 이미지 레지스트리
      - 무료로 시작 가능.
      - public, private, official 이미지 푸시 가능.
    - 개인 레지스트리
      - 보통 이쪽을 많이 쓸 것임
  - `docker push IMAGE_NAME`
    - 레포지토리의 이름으로 이미지를 빌드하고 푸시하면 그대로 올라간다.
  - docker pull IMAGE_NAME
  - `docker tag node-demo:latest yangban2/node-hello-world`
    - 존재하는 이미지의 태그를 바꾼다.
  - docker login / logout
- 공유 이미지 사용하기
  - `docker pull IMAGE_NAME`
    - 컨테이너 레지스트리에서 최신 이미지를 가져온다.
  - `docker run dsldkjfs` : 로컬 머신에서 찾은 뒤 없으면 이미지 이름이 사용된 컨테이너 히스토리에 자동으로 접근. 이 경우는 docker hub이므로 거기서 이미지를 확인한다.
