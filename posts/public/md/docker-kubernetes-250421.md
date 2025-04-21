### Section 3. 데이터 관리 및 볼륨으로 작업하기

- 다양한 종류의 데이터 이해하기

  - 우리 앱이 있음(내가 작성한 코드+환경)
  - 임시 어플리케이션 데이터(앱이 실행되는 동안 생성된 데이터)
    - 웹사이트라면 사용자 입력 폼에 입력된 무언가.. 그것을 통해 서버에서 실행 중인 컨테이너로 처리하는데 입력된 데이터가 임시 데이터.
    - 코드의 변수에 저장할 수 있으므로 메모리나 데이터베이스, 파일에 저장됨. 컨테이너가 종료될 때 그 데이터를 잃어도 상관 없음.
    - read + write, hence stored in Containers.
  - 영구 어플리케이션 데이터
    - 사용자 계정(파일에 저장, 데이터베이스에 저장, ..지속 필요)
    - read + write, permanent, stored with containers & volumes
  - Dockerfile 작성

    ```docker
    FROM node:14

    WORKDIR /app

    COPY package.json .

    RUN npm install

    COPY . .

    EXPOSE 80

    CMD ["node", "server.js"]
    ```

  - `docker build -t feedback-node .`
  - `docker run -p 3000:80 -d --name feedback-app —-rm feedback-node`
  - `docker stop feedback-app`
  - 멈춘 뒤에 다시 컨테이너를 실행하면.. 아까 /create API 를 통해 작성한 파일이 사라져 있음.
  - 이미지에는 자체 내부 파일 시스템이 있다
  - 이걸 기반으로 컨테이너를 만들면 얇은 read-write 컨테이너 레이어가 추가된다. 그러므로 이미지의 파일시스템에 엑세스 가능함. 하지만 파일 자체는 컨테이너 레이어에 추가되므로 제거된다면 이미지만 남음.

- 데이터를 유지하도록 돕는 것이 바로 볼륨
  - 볼륨은 호스트 기기의 폴더임. 컨테이너나 이미지에 있지 않고 호스트의 하드 드라이브에 존재하여 사용되거나 컨테이너로 매핑되는 것.
  - 볼륨은 도커가 인식하는 호스트 머신인 내 컴퓨터에 있는 폴더로서 도커 컨테이너 내부의 폴더에 매핑된다.
  - 컨테이너가 종료된 경우에도 지속되며 계속 존재한다.
  - 컨테이너에 볼륨을 추가하면 볼륨은 제거되지 않고 컨테이너가 제거되어도 볼륨이 유지되므로 데이터가 영속적임.
  - 컨테이너는 볼륨에 데이터를 읽고 쓸 수 있다.
- 컨테이너에 볼륨 추가하기

  - Dockerfile

  ```docker
  ...

  EXPOSE 80

  # anonymous: 이 이미지에 익명의 볼륨을 추가하고 이걸 기반으로 실행되는 컨테이너에 데이터를 추가한다. 내 기기의 경로를 지정하지 않았지만 어딘가 몰래 잘 뚫어뒀음. 미러링된 폴더가 어디 있는지 나도 모름.
  # VOLUME ["/app/feedback"]

  CMD ["node", "server.js"]
  ```

- 도커의 외부 데이터 저장 메커니즘
  - 둘 다 하나의 핵심 개념을 공유한다.
    - 컨테이너에 정의된 경로는 생성된 어떤 볼륨에 매핑된다. 내 기기에 생성된 경로랑 연결되지.
  - 볼륨
    - managed by Docker
    - 아까 우리는 익명 볼륨을 사용했음.
      - 익명 볼륨은 컨테이너가 존재하는 동안에만 실제로 존재함.
      - —rm 옵션으로 컨테이너를 실행하면 제거될 때 자동으로 익명 볼륨이 제거된다. 이 옵션 없이 컨테이너를 만들면 새 익명 볼륨이 생성되기 때문에 쌓이기 시작한다.
      - 이것은 docker volume rm VOL_NAME 혹은 docker volume prune 으로 정리할 수 있다.
      - 그럼 뭐 때문에 이 기능이 필요?
    - 또는 named 볼륨을 할당할 수 있음.
      - 컨테이너가 죽어도 살아 있다.
      - 새 컨테이너가 시작되어도 볼륨이 복구되고 폴더도 복구되어 모든 데이터를 계속 사용할 수 있다.
      - 영구적 데이터나 편집, 직접 볼 필요가 없는 중요한 데이터에게 적합하다.
      - `docker run -p 3000:80 -d --name feedback-app -v feedback:/app/feedback —-rm feedback-node`
    - 도커는 일부 폴더와 경로를 호스트 머신에 설정한다. 내가 모르는 경로에 몰래..
    - 액세스할 유일한 방법은 docker volume
  - 바인드 마운트 - managed by me - 여러 컨테이너와도 연결할 수 있음 - 볼륨과 비슷한 점이 있지만 차이점이 있음. - 바인드 마운트는 내 로컬 머신에 매핑될 경로를 직접 설정하는 것. - 코드를 스냅샷에서 복사하는 것이 아닌 바인드 마운트에서 복사한다. 컨테이너는 항상 최신 코드에 접근할 수 있음. - 영구, 편집 가능한 데이터에 적합하다. - 내 로컬 머신의 절대경로를 지정해줘야 한다. - `docker run -d -p 3000:80 —rm —name feedback-app -v feedback:/app/feedback -v "ABSOLUTE_PATH:/app"
feedback-node:volumes` - 굳이 이렇게 번거롭게 할 필요는 없음.. - `-v $(pwd):/app` 이렇게 지정하여도 됨. - 하지만 컨테이너를 실행하면 바로 뻗는다.. 왜 그럴가? - 로그를 확인하면 종속성이 없음 - 이미지 생성을 위해 수행한 종속성 설치 단계가 무의미해졌음. 바인드 마운트 하면서 컨테이너 내부를 내 로컬 경로로 전부 덮어씌워버렸기 때문. - 익명 볼륨: `-v /app/node_modules` - 혹은 Dockerfile에서 `VOLUME [”/app/node_modules”]` - 도커는 항상 컨테이너에 설정하는 모든 볼륨을 평가하기 때문에 볼륨 디렉토리에 충돌이 있다면 (/app/node_modules vs. /app) 더 긴 내부 경로를 우선한다.
  - 컨테이너에서 nodemon 사용하기
    - server.js 에서 변경 사항이 생기면 문제가 생김.
- read-only 볼륨
  - 볼륨은 기본적으로 read-write
  - 읽기 전용으로 바꾸기 위해서는 volume:/app:ro
    - 이렇게 하면 Docker가 폴더 혹은 하위 폴더에 쓸 수 없게 된다
    - 내 머신에서는 문제 없음.
- 볼륨 관리하기
  - docker volume —help
  - docker volume ls : 바인드 마운트는 표시되지 않는다.
  - docker volume create : 볼륨을 만들 수도 있음.
    - docker volume create feedback-files
  - docker volume inspect VOL_NAME
  - docker volume rm VOL_NAME
- dockerignore
  - COPY 로 복사해서 안 되는 파일들.
  ```
  Dockerfile
  .git
  node_modules
  ```
- ARG & ENV
  - ARG : 빌드 타임 인수
    - Dockerfile에서 특정 Dockerfile 명령으로 다른 값을 추출하는데 사용할 수 있는 변수
    - CMD에서는 사용 불가
    ```
    ARG DEFAULT_PORT=80

    ENV PORT=$DEFAULT_PORT
    ```
    - `docker build -t feedback-node:dev --build-arg DEFAULT_PORT=8000 .`
  - ENV : 런타임 환경 변수
    - ENV 옵션으로 설정하여 런타임 어플리케이션에서 사용할 수 있는 변수
    ```docker
    ENV PORT=80
    EXPOSE $PORT
    ```
    - `docker run -d --rm -p 3000:8000 --env PORT=8000 --name feedback-app -v feedback:/app/feedback -v /Users/yangban/Desktop/study/docker-kubernetes/data-volumes-01-starting-setup:/app -v /app/node_modules feedback-node:env`
    - 파일로 제공해도 됨.
      ```
      PORT=8000
      ```
      - `--env-file .env`
    - docker histoy IMAGE 를 통해 값을 읽을 수 있기 때문에 Credentials나 개인 키를 run command에 작성하지 않도록 하자. env-file 은 상관 없음
