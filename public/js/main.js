

$(document).ready(() => {
// handle the deletion of a task when the button is pressed
  $('.delete-task').click((event) => {
    const $target = $(event.target);
    $.ajax({
      type: 'DELETE',
      url: `/task/${$target.data('task')}`,
      success: () => {
        $target.parent().remove();
      },
      error: (err) => {
        console.error('Erreur ajax : ', err);
      },
    });
  });

  // Function completing a task when the button is pressed
  $('.complete-task').click((event) => {
    const $target = $(event.target);
    $.ajax({
      type: 'PUT',
      url: `/task/${$target.data('task')}`,
      data: 'status=completed',
      success: () => {
        $target.parent().prependTo('.list-task-complete');
        $target.remove();
      },
      error: (err) => {
        console.error('Erreur ajax : ', err);
      },
    });
  });

  // update the name of the task when the input lose focus
  $('.task-name').blur((event) => {
    const $target = $(event.target);
    $.ajax({
      type: 'PUT',
      url: `/task/${$target.data('task')}`,
      data: `name=${$target.text()}`,
      error: (err) => {
        console.error('Erreur ajax :', err);
      },
    });
  });


  // handle the enter key to validate change
  $('.task-name').keypress((event) => {
    if (event.which === 13) {
      $(event.target).blur();
      $(event.target).find('br').remove();
    }
  });
});
