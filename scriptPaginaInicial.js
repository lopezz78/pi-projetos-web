const boxes = document.querySelectorAll('.box');

const checkBoxes = () => {
  const triggerBottom = window.innerHeight * 0.8;

  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add('show');
    }
  });
};

window.addEventListener('scroll', checkBoxes);
checkBoxes();