# :muscle: 홈피트

안녕하세요 :raised_hand: 저희는 **소프트웨어 마에스트로 12기** 연수생들로 이루어진 해커톤 참가팀 **BaloCoding** 입니다 :smiley:   
저희는 해당 프로젝트를 공공데이터를 활용한 사회 문제 해결이라는 주제로
2021-05-13 ~ 2021-05-14 까지 진행된 SW maestro 12기 해커톤에서 **홈피트**라는 웹 사이트를 제작하였습니다. 

## 🤔 어떤 것을 제공하나요?

![KakaoTalk_20210513_223631415](https://user-images.githubusercontent.com/38045080/118143606-81017980-b446-11eb-907f-8c37191c576b.png)
저희는 **홈피트** 라는 웹 사이트로, 3가지 버전의 스쿼트 자세, 2가지 버전의 런지 자세를 포함한 총 6개의 다양한 운동 자세를 사용하여 점수를 얻는 간단한 운동 게임 프로그램을 제공합니다. **운동이 익숙해도, 그렇지 않아도 모두 즐길 수 있습니다!**   

## 🙋 왜 만들었나요?

COVID-19로 인한 국민들의 신체적인 운동 부족 현상이 심화가 되고 있습니다. 실내 체육시설은 불안하고, 미세먼지로 산책도 꺼려지는 요즘, 그 어느때보다 홈트레이닝이 절실한 상황입니다. 운동 부족을 집에서 해결할 수 있도록, 쉽고(?) 재밌는 게임으로 여러분들에게 홈트레이닝을 제공합니다.


## 🤷 어떻게 사용하나요?

1. 먼저, 시작하기 버튼을 누릅니다!
![Animation](https://user-images.githubusercontent.com/38045080/118203211-8d152780-b496-11eb-8833-04cd328e141c.gif)
2. 웹캠이 시작되며, 시간 초도 점점 내려가는 것을 볼 수 있습니다.
3. 우선 화면에 전신이 보이도록 서주세요.
4. 화면에 나타난 자세를 따라해 주세요.
5. 다시 똑바로 선 자세를 취해주시면, 점수를 획득하면서 다음 자세로 넘어갈 수 있습니다!
![Animation4](https://user-images.githubusercontent.com/38045080/118203385-e8dfb080-b496-11eb-92b5-1dfc0401faa3.gif)
6. 결과를 확인해 보세요!

## 🧑‍💻 어떤 기술로 만들었나요?
- JS
- Kakao API
- Tensorflow Lite

## 🖥 어떤 데이터를 사용했나요?
국민체육진흥공단의 국민 체력 100 동영상을 사용하였습니다.
일부의 영상 데이터와 직접 촬영한 포즈 데이터를 합쳐서 구글에서 제공하는 [Teachable Machine](https://teachablemachine.withgoogle.com/train/pose) 을 이용하여 Pose Estimation Model을 학습시켜서 사용하였습니다.
- [국민체육진흥공단 영상 데이터](https://nfa.kspo.or.kr/front/movie/movieTypeList.do)

<details>
공공데이터에 직접 촬영한 데이터를 추가하여 각 클래스 총 100장씩을 훈련시켰습니다.

![image](https://user-images.githubusercontent.com/38045080/118151361-8236a480-b44e-11eb-9764-c8a8edc7c0dc.png)
</details>

## 🥇 팀원 소개

소프트웨어 마에스트로 12th 연수생 Team BaloCoding
|팀원|
|---|
|[정원영](https://github.com/WonyJeong)|
|[김영배](https://github.com/canoe726)|
|[이태민](https://github.com/koalakid1)|
|[강하림](https://github.com/harimkang)|
|[이주원](https://github.com/wndnjs9878)|
|[서청운](https://github.com/newdeal123)|
