$(document).ready(() => {
  let feedback = new Feedback('feedback.json');
  $('#addFeedback').click(e => {
    feedback._addFeedback();
    e.preventDefault();
  });
  $('#feedback').click(e => {
    feedback._deleteFeedback(e.target);
    e.preventDefault();
  });
});