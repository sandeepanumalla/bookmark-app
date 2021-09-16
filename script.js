const addBookmark = document.querySelector("#bookmark");
const bodyContainer = document.querySelector(".body_container");
const modal_popup = document.querySelector(".modal_popup");
const bookmarkBlock = document.querySelector(".bookmark_blocks");
const submitButton = document.querySelector(".submit_button");
const overlay = document.querySelector(".overlay");
const titleInput = document.querySelector("#title_input");
const urlInput = document.querySelector("#url_input");

let storedData = [];

let sdfsdf = [{}];

if (localStorage.getItem("book_keeper")) {
  storedData = JSON.parse(localStorage.getItem("book_keeper"));

  //show UI data

  if (storedData.length != 0) {
    console.log(storedData);

    for (let i = 0; i < storedData.length; i++) {
      createElements(storedData[i].title, storedData[i].url);
    }
  }
}

function openModal() {
  overlay.classList.remove("inactive");
  modal_popup.classList.remove("inactive");
}

function closeModal() {
  overlay.classList.add("inactive");
  modal_popup.classList.add("inactive");
  console.log("hello");
}

function submitData() {
  console.log("your title input is ", titleInput.value);
  console.log("your url input is ", urlInput.value);

  if (titleInput.value === "") {
    alert("please give the title");
  } else if (urlInput.value === "") {
    alert("please provide the url");
  } else {
    createElements(titleInput.value, urlInput.value);

    modal_popup.classList.add("inactive");
    overlay.classList.add("inactive");

    const tempObj = {
      title: titleInput.value,
      url: urlInput.value,
    };
    storedData.push(tempObj);

    localStorage.setItem("book_keeper", JSON.stringify(storedData));
  }
}

function createElements(title, url) {
  const newBookmark = document.createElement("div");
  newBookmark.className = "bookmark_blocks";
  const anchorElement = document.createElement("a");
  anchorElement.href = url;
  anchorElement.textContent = title;
  const icon = document.createElement("i");
  icon.classList = "fas fa-times";

  newBookmark.appendChild(icon);
  newBookmark.appendChild(anchorElement);
  bodyContainer.appendChild(newBookmark);
}

addBookmark.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
submitButton.addEventListener("click", submitData);
