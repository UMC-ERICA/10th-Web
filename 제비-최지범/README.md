# 💚 UMC 10th ERICA Web 💚

### 🚀 Git 작업 순서

1. **저장소 복제 (clone)**
   ```bash
   git clone https://github.com/UMC-ERICA/10th-Web.git
   ```

2. 본인 브랜치로 이동

   ```bash
   git checkout [가든/최정원]
   ```

3. 워크북 주차별 디렉토리 생성 후 미션 수행
   
   <img width="345" alt="스크린샷 2025-03-16 오후 2 25 11" src="https://github.com/user-attachments/assets/17399cfb-65ea-4f23-8be2-306d78df1027" />

   ❗ 반드시 본인 이름으로 된 브랜치 `가든/최정원`의 디렉토리 `가든-최정원` 내에서 작업해주세요!

4. `Commit Convention`을 준수하여 작업 코드 커밋 및 푸시

   ```bash
   git add .
   git commit -m "[커밋 메세지]"
   git push
   ```

5.  PR 생성 및 코드 리뷰 요청

   - 미션 수행 후 **스터디 전까지** `PR Convention` 준수하여 Pull Request 오픈
   - 파트장에게 리뷰 요청 진행

6.  파트장의 코드 리뷰 반영 후 작업 내용 main 브랜치로 merge(병합)

---

<br>
<br>
<br>

## 📌 Commit Convention

| 타입       | 의미                                      |
| ---------- | ----------------------------------------- |
| `feat`     | 기능 구현, 추가                           |
| `setting`  | 빌드 수행, 패키지 설치, 환경 설정 수정 등 |
| `fix`      | 버그 및 오류 수정                         |
| `style`    | CSS 파일 UI 작업                          |
| `docs`     | README.md 작성, 주석 작성                 |
| `refactor` | 코드 리팩토링                             |
| `chore`    | 기타 작업                                 |

> 예시 : feat: 회원가입 로직 구현

<br>
<br>
<br>

## 📥 Pull Reqeust Convention

✔️ PR 요청 시, 다음 양식을 준수해주세요!

> PR 제목 : N주차 미션_닉네임 (예: 1주차 미션_후이)

<img width="1020" alt="스크린샷 2025-03-16 오후 2 59 37" src="https://github.com/user-attachments/assets/f069f50e-96c5-4265-b909-56a73d506965" />

<br>
<br>
<br>

## 📚 스터디 진행 규칙

- 스터디 시작 전, 워크북의 **키워드와 미션을 모두 수행**해야 합니다

  - 스터디에서는 **이슈사항 및 트러블 슈팅** 공유를 위주로 진행할 예정입니다
  - 워크북을 수행해오지 않으면 스터디 진행이 어려워요ㅠㅠ <br>
    정 시간이 부족하다면 **키워드 < 미션**을 우선으로 진행해주세요!
  - 미션 수행 시에는 **미션 수행 결과를 녹화**해서 PR에 올려주세요

- 워크북 수행 시에 어려웠던 점과 해결 과정을
  그때그때 기록해두면 나중에 도움 많이 되실겁니다 😄

- **코드리뷰**는 파트장이 주도적으로 진행하겠습니다.

  이유는 우선은 각자의 코드에 더 집중하기 위함입니다

  - 각자 워크북을 수행한 후, 다른 스터디의 코드 리뷰는 언제든지 환영입니다 😎

- PR 요청 시, Reviewers는 파트장으로 설정해주세요.

- 파트장들의 코드 리뷰 및 approve 후에 main 브랜치로 merge 가능합니다.

  - 반영이 완료되거나 끝난 리뷰이면 `Resolve Conversation`을 눌러 처리해주세요
    ![img](https://github.com/user-attachments/assets/df70680c-32a0-47be-8731-5e6b3076c4be)

<br>

### ❓ 궁금한 점 있으시면 언제든 편하게 말씀해주세요!
