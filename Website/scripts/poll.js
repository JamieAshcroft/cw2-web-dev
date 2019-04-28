'use strict'

const castVote = (vote) => {
  $('.vote').remove();
  /**
   * Conditional (ternary) operator
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
   * This will help you explain what I've used below. Its like an if statement just short hand.
   */
  const castVoted = vote ? 'yes' : 'no';
  const notVoted = !vote ? 'no' : 'yes';

  /**
   * Get the values from localStorage and parseInt to make sure that its a number
   * and have an or '||' incase is returns false or null or 0
   */
  let yesVotes = parseInt(localStorage.getItem('yesVote')) || 0;
  let noVotes = parseInt(localStorage.getItem('noVote')) || 0;

  /**
   * Depending on the casted Vote it will change your localStorage with the latest
   */
  if (castVoted === 'yes') {
    yesVotes = yesVotes + 1;
    localStorage.setItem('yesVote', yesVotes); // 13
  }
  if (castVoted === 'no') {
    noVotes = noVotes + 1;
    localStorage.setItem('noVote', noVotes); // 9
  }

  // Get total votes
  const Voted = yesVotes + noVotes; // 22

  // Add Value to bars
  $('#yesVotes').html(yesVotes);
  $('#noVotes').html(noVotes);

  // Set Width lengths
  const yesWidth = Math.round(100/Voted*yesVotes)-1;
  const noWidth = Math.round(100/Voted*noVotes)-1;

  $('#yesVotes').css('width', `${yesWidth}%`);
  $('#noVotes').css('width', `${noWidth}%`);

  $('.votes').removeClass('hidden');
}