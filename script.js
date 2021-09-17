const addBookmark = document.querySelector("#bookmark");
const bodyContainer = document.querySelector(".body_container");
const modal_popup = document.querySelector(".modal_popup");
const bookmarkBlock = document.querySelector(".bookmark_blocks");
const submitButton = document.querySelector(".submit_button");
const overlay = document.querySelector(".overlay");
const titleInput = document.querySelector("#title_input");
const urlInput = document.querySelector("#url_input");
const closeBtn = document.querySelector(".modal_header").children[1];

let deleteBtn;

let storedData = [];

let sdfsdf = [{}];

function load() {
  if (localStorage.getItem("book_keeper")) {
    storedData = JSON.parse(localStorage.getItem("book_keeper"));

    if (storedData.length != 0) {
      console.log(storedData);

      for (let i = 0; i < storedData.length; i++) {
        createElements(storedData[i].title, storedData[i].url, i);
      }
    }
  }
}
load();
closeButtons();

function openModal() {
  overlay.classList.remove("inactive");
  modal_popup.classList.remove("inactive");
}

function closeModal() {
  overlay.classList.add("inactive");
  modal_popup.classList.add("inactive");
  console.log("hello");
}

function isValidAddress() {}

function submitData() {
  console.log("your title input is ", titleInput.value);
  console.log("your url input is ", urlInput.value);

  if (titleInput.value === "") {
    alert("please give the title");
  } else if (urlInput.value === "") {
    alert("please provide the url");
  } else {
    if (
      storedData.find(
        (e) => e.title === titleInput.value || e.url === urlInput.value,
      )
    ) {
      alert("same detail already been saved");
    } else if (titleInput.value === urlInput.value) {
      alert(" title and url cannot be same");
    } else if (!urlInput.value.includes(".")) {
      alert("invalid url provided");
    } else {
      createElements(titleInput.value, urlInput.value, storedData.length);
      modal_popup.classList.add("inactive");
      overlay.classList.add("inactive");

      const tempObj = {
        title: titleInput.value,
        url: urlInput.value,
      };
      storedData.push(tempObj);

      localStorage.setItem("book_keeper", JSON.stringify(storedData));
      closeButtons();
    }
  }
}

function closeButtons() {
  deleteBtn = document.querySelectorAll(".fas");

  Array.from(deleteBtn).forEach((e) => {
    e.addEventListener("click", (e) => deleteBookmark(e));
  });
}

function createElements(title, url, index) {
  const newBookmark = document.createElement("div");
  newBookmark.className = "bookmark_blocks";
  const anchorElement = document.createElement("a");
  anchorElement.href = url;
  anchorElement.textContent = title;
  const icon = document.createElement("i");
  icon.setAttribute("data-value", index);
  icon.classList = "fas fa-times";

  newBookmark.appendChild(icon);
  newBookmark.appendChild(anchorElement);
  bodyContainer.appendChild(newBookmark);
}

function deleteBookmark(e) {
  const parentElement = e.target.parentElement;

  const filteredItem = storedData.filter((e, i) => {
    return i != parseInt(parentElement.children[0].getAttribute("data-value"));
  });

  parentElement.remove();

  localStorage.removeItem("book_keeper");
  console.log(JSON.stringify(filteredItem));
  if (filteredItem.length == 0) {
    return;
  } else {
    localStorage.setItem("book_keeper", JSON.stringify(filteredItem));
  }

  closeButtons();
}

addBookmark.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
submitButton.addEventListener("click", submitData);
