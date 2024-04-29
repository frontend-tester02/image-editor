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
      filterInput.max = '200';
      filterInput.value = brightness;
    } else if(btn.classList.contains('filter-saturation')) {
      filterInput.max = '200';
      filterInput.value = saturation;
    } else if(btn.classList.contains('filter-inversion')) {
      filterInput.max = '100';
      filterInput.value = inversion
    } else {
      filterInput.max = '100';
      filterInput.value = grayscale
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
    if(selectedItem.classList.contains('filter-brightness')) {
      brightness = filterInput.value;
    } else if (selectedItem.classList.contains('filter-saturation')) {
      saturation = filterInput.value;
    } else if(selectedItem.classList.contains('filter-inversion')) {
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
  filterValue.textContent= 100
  filterToolBtn[0].click()
  applyFilter()

}

resetBtn.addEventListener('click', () => {
  resetFilter()
})

// Save image

const saveBtn = document.querySelector('.save-image');

saveBtn.addEventListener('click', () => {

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = previewImage.width
  canvas.height = previewImage.height;
  context.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  context.translate(canvas.width / 2, canvas.height / 2);
  if(rotate !== 0) {
    context.rotate(rotate * Math.PI / 100);
  }

  context.scale(horizontal, vertical);
  context.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

  const link = document.createElement('a');
  link.download = 'image.jpg';
  link.href = canvas.toDataURL();
  link.click()
})
