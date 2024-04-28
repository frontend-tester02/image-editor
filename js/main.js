const filterToolBtn = document.querySelectorAll('.filter-tool');
const filterName = document.querySelector('.filter-name');
const filterValue = document.querySelector('.filter-value');
const filterInput = document.querySelector('.filter-input')



let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, vertical = 1, horizontal = 1;


const applyFilter = () => {
  previewImage.style.transform = `rotate(${rotate}deg) scale(${horizontal}, ${vertical})`;
  previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

function deactiveBtn() {
  filterToolBtn.forEach((item) => {
    item.classList.remove('filter-tool-active')
  })
}

filterToolBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    deactiveBtn()
    btn.classList.add('filter-tool-active');
    filterName.textContent = btn.textContent;

    if(btn.classList.contains('filter-brightness')) {

    }
  })
})

// Filter value
  filterValue.textContent = filterInput.value;

  filterInput.addEventListener('input', (e) => {
    filterValue.textContent = `${e.target.value}%`;
    updateFilter()
  });

  // Update filter
  function updateFilter() {
    const selectedItem = document.querySelector('.filter-tool-active');
    if(selectedItem.classList === 'filter-brightness') {
      brightness = filterInput.value;
    } else if (selectedItem.classList === 'filter-saturation') {
      saturation = filterInput.value;
    } else if(selectedItem.classList === 'filter-inversion') {
      inversion = filterInput.value;
    } else {
      grayscale = filterInput.value;
    }
    applyFilter()
  }



// Image choose
const inputFile = document.getElementById('input-file');
const previewImage = document.querySelector('.image-editor-file');

inputFile.addEventListener('change', () => {
  const reader = new FileReader();
  reader.readAsDataURL(inputFile.files[0]);
  reader.onload = () => {
    previewImage.src = reader.result

  }
});


// Rotate image
const rotateBtn = document.querySelectorAll('.rotate-btn');

rotateBtn.forEach((item) => {
  item.addEventListener('click', () => {
    if(item.classList.contains('left')) {
      rotate -= 90;
    } else if(item.classList.contains('right')) {
      rotate += 90;
    } else if (item.classList.contains('horizontal')) {
      horizontal = horizontal === 1 ? -1 : 1;
    } else if(item.classList.contains('vertical')) {
      vertical = vertical === 1 ? -1 : 1;
    }
    applyFilter()
  });
});


// Reset filter image
const resetBtn = document.querySelector('.reset-filter');

function resetFilter() {
  brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
  rotate = 0, vertical = 1, horizontal = 1;
  applyFilter()

}

resetBtn.addEventListener('click', () => {
  resetFilter()
})
