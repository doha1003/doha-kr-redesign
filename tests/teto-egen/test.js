// 테토-에겐 테스트 로직

// 카카오 SDK 초기화
document.addEventListener('DOMContentLoaded', function() {
    // SDK 로드 대기
    setTimeout(function() {
        if (typeof Kakao !== 'undefined') {
            if (!Kakao.isInitialized()) {
                try {
                    // JavaScript 키 사용 (REST API 키가 아님)
                    Kakao.init('19d8ba832f94d513957adc17883c1282');
                    console.log('Kakao SDK initialized:', Kakao.isInitialized());
                    
                    // 초기화 확인
                    if (Kakao.isInitialized()) {
                        console.log('Kakao SDK Version:', Kakao.VERSION);
                    }
                } catch (e) {
                    console.error('Kakao SDK initialization failed:', e);
                    console.error('Error details:', e.message);
                }
            } else {
                console.log('Kakao SDK already initialized');
            }
        } else {
            console.error('Kakao SDK not loaded');
        }
    }, 500);
});

// 테스트 데이터
const questions = [
    {
        question: "주말에 친구들이 갑자기 모임을 제안했을 때, 당신의 반응은?",
        options: [
            { text: "좋아! 바로 준비하고 나갈게!", score: 2 },
            { text: "누가 오는지 확인하고 결정할게", score: 0 },
            { text: "이미 집에서 쉬기로 했는데... 다음에 만나자", score: -2 }
        ]
    },
    {
        question: "새로운 프로젝트를 시작할 때, 당신의 접근 방식은?",
        options: [
            { text: "일단 시작하고 진행하면서 수정해나간다", score: 2 },
            { text: "대략적인 계획을 세우고 유연하게 진행한다", score: 0 },
            { text: "철저한 계획을 세운 후에 시작한다", score: -2 }
        ]
    },
    {
        question: "갈등 상황이 발생했을 때, 당신의 대처 방식은?",
        options: [
            { text: "직접적으로 문제를 제기하고 해결한다", score: 2 },
            { text: "상황을 보며 적절한 타이밍을 기다린다", score: 0 },
            { text: "가능한 갈등을 피하고 조용히 넘어간다", score: -2 }
        ]
    },
    {
        question: "여행을 계획할 때, 당신의 스타일은?",
        options: [
            { text: "즉흥적으로 떠나는 것을 선호한다", score: 2 },
            { text: "큰 틀만 정하고 세부사항은 현지에서 결정한다", score: 0 },
            { text: "일정을 세세하게 계획하고 준비한다", score: -2 }
        ]
    },
    {
        question: "팀 프로젝트에서 당신이 선호하는 역할은?",
        options: [
            { text: "팀을 이끌고 방향을 제시하는 리더", score: 2 },
            { text: "의견을 조율하고 중재하는 역할", score: 0 },
            { text: "맡은 업무를 완벽하게 수행하는 실무자", score: -2 }
        ]
    },
    {
        question: "스트레스를 받을 때, 당신의 해소 방법은?",
        options: [
            { text: "운동이나 활동적인 취미로 해소한다", score: 2 },
            { text: "친한 사람과 대화하며 풀어낸다", score: 0 },
            { text: "혼자만의 시간을 가지며 재충전한다", score: -2 }
        ]
    },
    {
        question: "새로운 사람을 만났을 때, 당신의 태도는?",
        options: [
            { text: "먼저 다가가서 대화를 시작한다", score: 2 },
            { text: "상대방의 반응을 보며 천천히 친해진다", score: 0 },
            { text: "상대방이 먼저 다가올 때까지 기다린다", score: -2 }
        ]
    },
    {
        question: "중요한 결정을 내려야 할 때, 당신의 방식은?",
        options: [
            { text: "직감을 믿고 빠르게 결정한다", score: 2 },
            { text: "여러 의견을 들어보고 결정한다", score: 0 },
            { text: "충분한 시간을 갖고 신중하게 결정한다", score: -2 }
        ]
    },
    {
        question: "파티나 모임에서 당신의 모습은?",
        options: [
            { text: "분위기를 주도하며 즐긴다", score: 2 },
            { text: "적당히 어울리며 참여한다", score: 0 },
            { text: "조용히 관찰하며 필요할 때만 참여한다", score: -2 }
        ]
    },
    {
        question: "일상생활에서 당신이 선호하는 것은?",
        options: [
            { text: "매일 새로운 경험과 변화", score: 2 },
            { text: "적당한 변화와 안정의 균형", score: 0 },
            { text: "예측 가능한 루틴과 안정감", score: -2 }
        ]
    }
];

// 상태 관리
let currentQuestion = 0;
let totalScore = 0;
let selectedGender = '';
let answers = [];

// 성별 선택
function selectGender(gender) {
    selectedGender = gender;
    document.getElementById('gender-selection').classList.add('hidden');
    document.getElementById('test-container').classList.remove('hidden');
    showQuestion();
}

// 질문 표시
function showQuestion() {
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progressPercent + '%';
    
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const currentQ = questions[currentQuestion];
    
    document.getElementById('question-number').textContent = `질문 ${currentQuestion + 1}/${questions.length}`;
    questionElement.textContent = currentQ.question;
    
    optionsElement.innerHTML = '';
    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });
    
    // 이전 버튼 표시/숨김
    const prevButton = document.getElementById('prev-button');
    if (currentQuestion > 0) {
        prevButton.style.display = 'inline-block';
    } else {
        prevButton.style.display = 'none';
    }
}

// 옵션 선택
function selectOption(optionIndex) {
    const selectedOption = questions[currentQuestion].options[optionIndex];
    answers[currentQuestion] = optionIndex;
    totalScore += selectedOption.score;
    
    setTimeout(() => {
        nextQuestion();
    }, 300);
}

// 다음 질문
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

// 이전 질문
function previousQuestion() {
    if (currentQuestion > 0) {
        // 이전 답변의 점수를 빼고
        const previousAnswer = answers[currentQuestion - 1];
        if (previousAnswer !== undefined) {
            totalScore -= questions[currentQuestion - 1].options[previousAnswer].score;
        }
        currentQuestion--;
        showQuestion();
    }
}

// 결과 표시
function showResult() {
    const testContainer = document.getElementById('test-container');
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resultImage = document.getElementById('result-image');
    const shareButton = document.getElementById('share-button');
    
    testContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    let resultType, title, description, imageUrl;
    
    if (totalScore >= 8) {
        resultType = 'teto';
        title = '당신은 테토형!';
        description = `활발하고 외향적인 성격의 소유자입니다. 새로운 도전을 즐기고, 사람들과 함께 있을 때 에너지를 얻습니다. 리더십이 강하고 즉흥적인 면이 있어 주변 사람들에게 활력을 불어넣습니다.`;
        imageUrl = '/images/teto-result.png';
    } else if (totalScore >= -7) {
        resultType = 'balance';
        title = '당신은 균형잡힌 중간형!';
        description = `상황에 따라 유연하게 대처하는 균형잡힌 성격입니다. 때로는 활발하게, 때로는 차분하게 행동할 수 있는 능력이 있습니다. 다양한 사람들과 잘 어울리며 적응력이 뛰어납니다.`;
        imageUrl = '/images/balance-result.png';
    } else {
        resultType = 'egen';
        title = '당신은 에겐형!';
        description = `차분하고 신중한 성격의 소유자입니다. 깊이 있는 사고를 즐기고, 혼자만의 시간을 통해 재충전합니다. 계획적이고 체계적인 면이 있어 맡은 일을 완벽하게 수행합니다.`;
        imageUrl = '/images/egen-result.png';
    }
    
    resultTitle.textContent = title;
    resultDescription.textContent = description;
    resultImage.src = imageUrl;
    resultImage.alt = title;
    
    // 공유 버튼에 결과 타입 저장
    shareButton.dataset.resultType = resultType;
    
    // 결과를 로컬 스토리지에 저장
    const testResult = {
        type: resultType,
        title: title,
        description: description,
        score: totalScore,
        gender: selectedGender,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('tetoEgenResult', JSON.stringify(testResult));
}

// 카카오톡 공유
function shareKakao() {
    const shareButton = document.getElementById('share-button');
    const resultType = shareButton.dataset.resultType;
    const resultTitle = document.getElementById('result-title').textContent;
    const resultDescription = document.getElementById('result-description').textContent;
    
    // Kakao SDK가 로드되었는지 확인
    if (typeof Kakao === 'undefined') {
        console.error('Kakao SDK not loaded');
        alert('카카오톡 공유 기능을 사용할 수 없습니다.');
        return;
    }
    
    // Kakao가 초기화되었는지 확인
    if (!Kakao.isInitialized()) {
        console.error('Kakao SDK not initialized');
        alert('카카오톡 공유 기능을 사용할 수 없습니다.');
        return;
    }
    
    try {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: resultTitle,
                description: resultDescription,
                imageUrl: `https://doha.kr/images/${resultType}-result.png`,
                link: {
                    mobileWebUrl: 'https://doha.kr/tests/teto-egen/',
                    webUrl: 'https://doha.kr/tests/teto-egen/'
                }
            },
            buttons: [
                {
                    title: '나도 테스트하기',
                    link: {
                        mobileWebUrl: 'https://doha.kr/tests/teto-egen/',
                        webUrl: 'https://doha.kr/tests/teto-egen/'
                    }
                }
            ]
        });
    } catch (error) {
        console.error('Kakao share error:', error);
        alert('공유하기에 실패했습니다.');
    }
}

// 테스트 다시하기
function restartTest() {
    currentQuestion = 0;
    totalScore = 0;
    selectedGender = '';
    answers = [];
    
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('gender-selection').classList.remove('hidden');
    document.getElementById('test-container').classList.add('hidden');
}

// 테스트 시작 (start.html에서 사용)
function startTest() {
    window.location.href = '/tests/teto-egen/test.html';
}

// 전역 함수로 내보내기
window.startTest = startTest;
window.selectGender = selectGender;
window.selectOption = selectOption;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.shareKakao = shareKakao;
window.restartTest = restartTest;