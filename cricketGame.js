let scoreStr = localStorage.getItem('Score');
let score;

resetScore(scoreStr);

function resetScore(scoreStr) {
  score = scoreStr ? JSON.parse(scoreStr) : {
    win: 0,
    lost: 0,
    tie: 0
  };

  score.displayScore = function () {
    return `Won: ${score.win} | Lost: ${score.lost} | Tie: ${score.tie}`;
  };

  showResult();
}

function resetGame() {
  localStorage.clear();
  resetScore();
}

function playGame(userMove) {
  const computerMove = generateComputerChoice();
  const resultMsg = getResult(userMove, computerMove);
  showResult(userMove, computerMove, resultMsg);
}

function generateComputerChoice() {
  const random = Math.random() * 3;
  if (random <= 1) return 'Bat';
  if (random <= 2) return 'Ball';
  return 'Stump';
}

function getResult(user, computer) {
  if (user === computer) {
    score.tie++;
    return "It's a Tie!";
  }

  if (
    (user === 'Bat' && computer === 'Ball') ||
    (user === 'Ball' && computer === 'Stump') ||
    (user === 'Stump' && computer === 'Bat')
  ) {
    score.win++;
    return "🎉 You Won!";
  } else {
    score.lost++;
    return "😢 Computer Won!";
  }
}

function showResult(userMove, computerMove, result) {
  localStorage.setItem('Score', JSON.stringify(score));

  document.querySelector('#user-move').innerText =
    userMove ? `You chose: ${userMove}` : '';

  document.querySelector('#computer-move').innerText =
    computerMove ? `Computer chose: ${computerMove}` : '';

  document.querySelector('#result').innerText = result || '';
  document.querySelector('#score').innerText = score.displayScore();
}
