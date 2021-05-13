# :muscle: 홈피트

안녕하세요 :raised_hand: 저희는 **소프트웨어 마에스트로 12기** 연수생들로 이루어진 해커톤 참가팀 **BaloCoding** 입니다 :smiley:   
저희는 해당 프로젝트를 공공데이터를 활용한 사회 문제 해결이라는 주제로
2021-05-13 ~ 2021-05-14 까지 진행된 소마 해커톤에서 만들었습니다. 

## 어떤 것을 제공하나요?

![KakaoTalk_20210513_223631415](https://user-images.githubusercontent.com/38045080/118143606-81017980-b446-11eb-907f-8c37191c576b.png)
저희는 **홈피트** 라는 웹 사이트로, 다양한 운동 자세를 사용하여 점수를 얻는 간단한 운동 게임 프로그램을 제공합니다. **운동이 익숙해도, 그렇지 않아도 모두 즐길 수 있습니다!**

## 왜 만들었나요?
![photo-1517836357463-d25dfeac3438](https://user-images.githubusercontent.com/38045080/118144776-cbcfc100-b447-11eb-9602-07494eb5a6bd.jpg)

COVID-19로 인한 국민들의 신체적인 운동 부족 현상이 심화가 되고 있습니다. 운동 부족을 집에서 해결할 수 있도록, 쉽고(?) 재밌는 게임으로 제공하기 위해 만들었습니다.


## 어떻게 사용하나요?

예제

## 어떤 기술로 만들었나요?
- JS
- Kakao API
- Tensorflow Lite

## 어떤 데이터를 사용했나요?
국민체육진흥공단의 국민 체력 100 동영상을 사용하였습니다.
일부의 영상 데이터와 직접 촬영한 포즈 데이터를 합쳐서 구글에서 제공하는 [Teachable Machine](https://teachablemachine.withgoogle.com/train/pose) 을 이용하여 Pose Estimation Model을 학습시켜서 사용하였습니다.
- [국민체육진흥공단 영상 데이터](https://nfa.kspo.or.kr/front/movie/movieTypeList.do)

<details>
공공데이터에 직접 촬영한 데이터를 추가하여 각 클래스 총 100장씩을 훈련시켰습니다.

![image](https://user-images.githubusercontent.com/38045080/118151361-8236a480-b44e-11eb-9764-c8a8edc7c0dc.png)
</details>

## 팀원 소개

소프트웨어 마에스트로 12th 연수생
- BaloCoding
-- [정원영](https://github.com/WonyJeong)
-- [김영배](https://github.com/canoe726)
-- [이태민](https://github.com/koalakid1)
-- [강하림](https://github.com/harimkang)
-- [이주원](https://github.com/wndnjs9878)
-- [서청운](https://github.com/newdeal123)
